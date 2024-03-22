import InformativeModal from '@systran/react-components/lib/molecules/InformativeModal';
import { Grid } from '@mui/material';
import { map } from 'lodash';
import useSWR from 'swr';
import Apis from '@/utils/apis';
import { TranslationMemory } from '../../../lib/TranslationMemory';

export type Props = {
  open: boolean
  corpusId: string
  onClose: () => void
}

function formatDetails(details: any) {
  return {
    ...details,
    key: `${details.filename}_${details.DT_RowId || details.id}`,
    id: details.DT_RowId || details.id,
    source: details.sourceLanguage,
    targets: details.targetLanguages
  } as TranslationMemory;
}

export default function DetailsTranslationMemoryModal({open, corpusId, onClose}: Props) {
  const { data } = useSWR(
    Apis.corpus.details({id: corpusId}),
    {
      shouldRetryOnError: false, revalidateOnFocus: false
    }
  );

  return (
    <InformativeModal
      open={open}
      title={'Corpus Details'}
      onClose={onClose}
      width={'large'}
    >
      <Grid container spacing={2} style={{ paddingLeft: '15px' }}>
        {data && map(formatDetails(data), (value, key) => (
          <>
            <Grid xs={6} md={4}>
              {key.toString()}
            </Grid>
            <Grid xs={6} md={8}>
              {(typeof value === 'string') ? value : JSON.stringify(value)}
            </Grid>
          </>
        ))}
      </Grid>
    </InformativeModal>
  );
}
