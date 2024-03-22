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
import {PostEditorContext} from './context/PostEditorContext';

export type PostEditorToolBarProps = {
  actions: RowAction<Sentence>[]
  setOpenedModal: (openedModal: OpenedModal) => void
  fileInformations: FileInformations
}

export default function Toolbar({ actions, setOpenedModal, fileInformations }: PostEditorToolBarProps) {
  const gridApiRef = useGridApiContext();
  const dataRowIdToModelLookup = gridApiRef?.current.state.rows.dataRowIdToModelLookup as Record<string, Sentence>;
  const rowSelection = gridApiRef?.current.state.rowSelection as string[];
  const selectedRows = values(pick(dataRowIdToModelLookup, rowSelection));
  const params = useParams();
  const {updateToastMessage} = useContext(ToastMessageContext);
  const {mode} = useContext(PostEditorContext);

  const {t} = useTranslation();

  const handleDownload = () => {
    if (mode === 'file') {
      downloadFile();
    }
    else if (mode === 'speech') {
      setOpenedModal({modalType: 'downloadSpeechTrans', fileInformations});
    }
  };

  const downloadFile = async () => {
    const downloadResponse = await fetch(Apis.fileTranslation.downloadFile(params?.id.toString()));
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
        <PrimaryButton
          onClick={handleDownload}
          endIcon={<DownloadIcon />}
        >
          {t('Download')}
        </PrimaryButton>
      </RightToolbarContainer>
    </GridToolbarContainer>
  );
}
