import { useTranslation } from 'react-i18next';
import InformativeModal from '@systran/react-components/lib/molecules/InformativeModal';
import ModalListBody from '@systran/react-components/lib/atoms/ModalListBody';
import { Box, Grid } from '@mui/material';
import Apis from '@/utils/apis';

function DownloadRow({format, corpusId, ownerId}: {format: 'text/bitext' | 'application/x-tmx+xml', corpusId: string, ownerId?: string}) {
  const { t } = useTranslation();

  return (
    <>
      <Grid item xs={6} style={{textAlign: 'left'}}>
        {format}
      </Grid>
      <Grid item xs={6} style={{textAlign: 'right'}}>
        <a href={Apis.corpus.download({corpusId, format, ownerId})}>{t('Download')}</a>
      </Grid>
    </>
  );
}

export type Props = {
  open: boolean
  selectedRow: {filename: string, id: string, ownerId?: string}
  onClose: () => void
}

export default function DownloadTranslationMemoryModal({open, selectedRow, onClose}: Props) {
  const { t } = useTranslation();

  return (
    <InformativeModal
      title={t('Download Corpus')}
      open={open}
      onClose={onClose}
    >
      <ModalListBody
        list={[selectedRow.filename]}
      />
      <Box sx={{ width: '90%', marginTop: '15px' }}>
        <Grid container spacing={1} >
          {(['text/bitext', 'application/x-tmx+xml'] as const).map((format) => (
            <DownloadRow
              corpusId={selectedRow.id}
              ownerId={selectedRow.ownerId}
              format={format}
            />
          ))}
        </Grid>
      </Box>
    </InformativeModal>
  );
}