import { GridToolbarContainer, useGridApiContext } from '@systran/react-components/lib/organisms/Table/Table';
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
import {useContext} from 'react';
import {ToastMessageContext} from '@/components/contexts/ToastMessageContext';
import {FilePostEditorMessages} from './Messages';

export type PostEditorToolBarProps = {
  actions: RowAction<Sentence>[]
  setOpenedModal?: (openedModal: OpenedModal) => void
  loading: boolean | undefined
  isValidating: boolean
  refreshRate: RefreshRate,
  setRefreshRate: (value: RefreshRate) => void
  mutate: () => Promise<Sentence[] | undefined>
  fileInformations: FileInformations
}

export default function Toolbar({ actions, loading, isValidating, refreshRate, setRefreshRate, mutate, fileInformations }: PostEditorToolBarProps) {
  const gridApiRef = useGridApiContext();
  const dataRowIdToModelLookup = gridApiRef?.current.state.rows.dataRowIdToModelLookup as Record<string, Sentence>;
  const rowSelection = gridApiRef?.current.state.rowSelection as string[];
  const selectedRows = values(pick(dataRowIdToModelLookup, rowSelection));
  const params = useParams();
  const {updateToastMessage} = useContext(ToastMessageContext);

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
      updateToastMessage({
        label: FilePostEditorMessages.error.downloadingFile,
        status: 'error'
      });
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
        <RefreshRateButton
          isLoading={loading || isValidating}
          onRefresh={mutate}
          refreshRate={refreshRate}
          onRefreshChange={setRefreshRate}
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
