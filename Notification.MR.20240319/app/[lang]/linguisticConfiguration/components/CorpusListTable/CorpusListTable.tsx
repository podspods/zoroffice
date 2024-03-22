import Table from '@systran/react-components/lib/organisms/Table/Table';
import { useColumns } from './useColumns';
import { useModals } from './useModals';
import useRowActions from './useRowActions';
import { useMemo, useState } from 'react';
import { RefreshRate } from '@systran/react-components/lib/atoms/ButtonsSpecial/RefreshRateButton';
import useSWR from 'swr';
import Apis from '@/utils/apis';
import Toolbar, { Props as ToolbarProps } from './Toolbar';
import { transformApiResponse } from './Corpus';
import PageTitle from '@/components/PageTitle';
import { useTranslation } from 'react-i18next';
import {TemporaryPageBox} from '@/components/TemporaryPageBox';

const slots = {
  toolbar: Toolbar
};

export type Props = {
  type: 'UD' | 'NORM'
}

export default function CorpusListTable({type}: Props) {
  const [refreshInterval, setRefreshInterval] = useState<RefreshRate>(10);
  const { data, isLoading, isValidating, mutate } = useSWR<{data: unknown[]}>(
    Apis.dictionary.list({type}),
    {
      refreshInterval: (refreshInterval === 'Never') ? 0 : (refreshInterval * 1000)
    }
  );

  const rows = useMemo(() => (data?.data || []).map(transformApiResponse), [data]);

  const [modal, setOpenedModal] = useModals(type, mutate);
  const actions = useRowActions(setOpenedModal);
  const columns = useColumns(actions, type);

  const slotProps = useMemo(() => (
    {
      toolbar: {
        isLoading,
        isValidating,
        refreshInterval,
        setRefreshInterval,
        actions,
        setOpenedModal,
        mutate
      } satisfies ToolbarProps
    }
  ), [
    isLoading,
    isValidating,
    refreshInterval,
    setRefreshInterval,
    actions,
    setOpenedModal,
    mutate
  ]);

  const { t } = useTranslation();

  return (
    <TemporaryPageBox>
      {modal}
      <PageTitle> {type === 'UD' ? t('Dictionaries') : t('Normalizations')} </PageTitle>
      <Table
        loading={isLoading}
        rows={rows}
        columns={columns as any}
        checkboxSelection
        slots={slots}
        slotProps={slotProps}
      />
    </TemporaryPageBox>
  );
}
