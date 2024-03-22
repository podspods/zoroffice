import { GridToolbarContainer, GridToolbarQuickFilter, useGridApiContext } from '@systran/react-components/lib/organisms/Table/Table';
import { RowAction } from '@systran/react-components/lib/organisms/RowAction/RowAction';
import RefreshRateButton, { RefreshRate } from '@systran/react-components/lib/atoms/ButtonsSpecial/RefreshRateButton';
import RowActionToolbar, {
  LeftToolbarContainer, RightToolbarContainer
} from '@systran/react-components/lib/organisms/RowAction/RowActionToolbar';
import { PrimaryButton } from '@systran/react-components/lib/atoms/Buttons/Primary';
import { useTranslation } from 'react-i18next';
import { pick, values } from 'lodash';
import {Sentence, OpenedModal, FileInformations} from './types';
import DownloadIcon from '@systran/react-components/lib/atoms/Icons/DownloadIcon';
import Apis from '@/utils/apis';
import {useParams} from 'next/navigation';

export type Props = {
  actions: RowAction<Sentence>[]
  setOpenedModal?: (openedModal: OpenedModal) => void
  isLoading: boolean
  isValidating: boolean
  refreshInterval: RefreshRate,
  setRefreshInterval: (value: RefreshRate) => void
  mutate: () => Promise<void>
  fileInformations: FileInformations
}

export default function Toolbar({ actions, isLoading, isValidating, refreshInterval, setRefreshInterval, mutate, fileInformations }: Props) {
  const gridApiRef = useGridApiContext();
  const dataRowIdToModelLookup = gridApiRef?.current.state.rows.dataRowIdToModelLookup as Record<string, Sentence>;
  const rowSelection = gridApiRef?.current.state.rowSelection as string[];
  const selectedRows = values(pick(dataRowIdToModelLookup, rowSelection));
  const params = useParams();

  const {t} = useTranslation();

  const downloadFile = async () => {
    const downloadResponse = await fetch(Apis.filePostEditor.download(params?.id.toString()));
    if (downloadResponse.ok) {
      const blob = await downloadResponse.blob();
      const link = document.createElement('a');
      link.href = window.URL.createObjectURL(blob);
      link.download = fileInformations.fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
    else {
      // eslint-disable-next-line no-console
      console.error('Failed to download');
    }
  };

  return (
    <GridToolbarContainer>
      <LeftToolbarContainer>
        <RowActionToolbar
          actions={actions}
          selectedRows={selectedRows}
        />
      </LeftToolbarContainer>
      <RightToolbarContainer>
        <GridToolbarQuickFilter />
        <RefreshRateButton
          isLoading={isLoading || isValidating}
          onRefresh={mutate}
          refreshRate={refreshInterval}
          onRefreshChange={setRefreshInterval}
        />
        <PrimaryButton
          onClick={downloadFile}
          endIcon={<DownloadIcon />}
        >
          {t('Download')}
        </PrimaryButton>
      </RightToolbarContainer>
    </GridToolbarContainer>
  );
}
