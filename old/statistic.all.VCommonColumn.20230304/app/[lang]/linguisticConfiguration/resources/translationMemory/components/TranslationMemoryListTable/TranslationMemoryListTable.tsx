import useModals from './useModals';
import useRowActions from './useRowActions';
import useColumns from './useColumns';
import { RefreshRate } from '@systran/react-components/lib/atoms/ButtonsSpecial/RefreshRateButton';
import Table from '@systran/react-components/lib/organisms/Table/Table';
import { transformApiResponse } from '../../lib/TranslationMemory';
import useSelectableRows from '@/components/hooks/useSelectableRows';
import Toolbar, { Props as ToolbarProps } from './Toolbar';
import { useMemo, useState } from 'react';
import useSWR from 'swr';
import Apis from '@/utils/apis';
import PageTitle from '@/components/PageTitle';
import { useTranslation } from 'react-i18next';
import {TemporaryPageBox} from '@/components/TemporaryPageBox';

const slots = {
  toolbar: Toolbar
};

export type Props = {
  currentDirectory: string
}

export default function TranslationMemoryListTable({currentDirectory}: Props) {
  const [refreshInterval, setRefreshInterval] = useState<RefreshRate>(10);
  const { data, isLoading, isValidating, mutate } = useSWR<{files: unknown[]}>(
    Apis.corpus.list({directory: currentDirectory}),
    {
      refreshInterval: (refreshInterval === 'Never') ? 0 : (refreshInterval * 1000)
    }
  );

  const rows = useMemo(() => (data?.files || []).map(transformApiResponse), [data]);

  const [modal, setOpenedModal] = useModals(mutate);
  const actions = useRowActions(setOpenedModal);
  const columns = useColumns(actions);
  const isRowSelectable = useSelectableRows(rows, ({type}) => type !== 'file');

  const slotProps = useMemo(() => (
    {
      toolbar: {
        currentDirectory,
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
    currentDirectory,
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
      <PageTitle> {t('Translation Memories')} </PageTitle>
      <Table
        loading={isLoading}
        rows={rows}
        columns={columns as any}
        checkboxSelection
        isRowSelectable={isRowSelectable}
        slots={slots}
        slotProps={slotProps}
      />
    </TemporaryPageBox>
  );
}
