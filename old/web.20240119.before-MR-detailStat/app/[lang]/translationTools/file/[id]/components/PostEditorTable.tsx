import { useMemo } from 'react';
import Table, {GridRowModel} from '@systran/react-components/lib/organisms/Table/Table';
import { Box } from '@mui/material';
import {PageTitleContainer, TypographyStyled} from '@/components/PageTitle';
import { useTranslation } from 'react-i18next';
import Toolbar, { Props as ToolbarProps } from './Toolbar';
import PlusIcon from '@systran/react-components/lib/atoms/Icons/PlusIcon';
import DownloadIcon from '@systran/react-components/lib/atoms/Icons/DownloadIcon';
import CheckIcon from '@systran/react-components/lib/atoms/Icons/CheckIcon';
import useColumns from './PostEditorColumns';
import {RowAction} from '@systran/react-components/lib/organisms/RowAction/RowAction';
import {commonFetch} from '@/utils/fetcher';
import Apis from '@/utils/apis';
import styled from '@systran/react-components/lib/Theme/styled';
import {Theme} from '@systran/react-components/lib/Theme';
import InfoIcon from '@systran/react-components/lib/atoms/Icons/InfoIcon';
import TooltipCustom from '@systran/react-components/lib/atoms/TooltipCustom';
import Typography from '@mui/material/Typography';
import LanguagePairsRender from '@systran/react-components/lib/molecules/LanguagePairsRender';
import useSWR from 'swr';
import {Profile} from '../../UploadedFilesTable';
import {RenderProfileCell} from '@/utils/findProfileName';
import {FileInformations, OpenedModal, PostEditorTableProps, Sentence} from './types';
import useModals from './useModals';


const saveSentence = async (newSentences: {fileId: string, sentences: Sentence[]}, mutate: () => Promise<void>) => {
  try {
    const options = {
      method: 'POST',
      body: JSON.stringify(newSentences)
    };
    const response = await commonFetch(Apis.filePostEditor.saveSentence, options);
    if (response?.error) {
      throw new Error(response?.error);
    }
  }
  finally {
    await mutate();
  }
};

const initialState = {
  sorting: {
    sortModel: [{field: 'product', sort: 'desc' as const}]
  },
  pagination: { paginationModel: { pageSize: 10} }
};


function useActions(mutate: () => Promise<void>, setOpenedModal: (openedModal: OpenedModal) => void, fileInformations: FileInformations) {

  const validateSentences = (selectedSentences: Sentence[]) => {
    const validatedSentences = selectedSentences.map((sentence) => {
      sentence.status = 'Validated';
      return sentence;
    });
    const sentencesModifications = {
      fileId: selectedSentences[0].fileId,
      sentences: validatedSentences
    };
    // eslint-disable-next-line no-console
    saveSentence(sentencesModifications, mutate).catch((err) => console.error(err));
  };


  return useMemo(() => [
    {
      label: 'Validate',
      icon: <CheckIcon />,
      disable: (selectedSentences) => {
        return selectedSentences.length === 0 || (selectedSentences.length === 1 && selectedSentences[0].status === 'Validated');
      },
      onClick: (selectedSentences) => {
        validateSentences(selectedSentences);
      }
    },
    {
      label: 'Create a TM',
      icon: <PlusIcon />,
      disable: (selectedSentences) => {
        return selectedSentences.length === 0;
      },
      onClick: (selectedSentences) => {
        setOpenedModal({modalType: 'createTM', selectedSentences, fileInformations});
      }
    },
    {
      label: 'Add to TM',
      icon: <DownloadIcon type={'upload'} />,
      disable: (selectedSentences) => {
        return selectedSentences.length === 0;
      },
      onClick: (selectedSentences) => {
        setOpenedModal({modalType: 'addToTM', selectedSentences: selectedSentences, fileInformations: fileInformations});
      }
    },
    {
      label: 'Download TM',
      icon: <DownloadIcon />,
      disable: (selectedSentences) => selectedSentences.length === 0,
      onClick: (selectedSentences) => {
        setOpenedModal({modalType: 'downloadTM', selectedSentences, fileInformations});
      }
    }
  ] satisfies RowAction<Sentence>[], []);
}

const slots = {
  toolbar: Toolbar
};

export default function PostEditorTable({refreshInterval, setRefreshInterval, isLoading, isValidating, fileTranslated, mutate, fileInformations}: PostEditorTableProps) {
  const {t} = useTranslation();

  const {data: profilesData, mutate: mutateProfiles} = useSWR<{profiles: Profile[]}>(
    Apis.fileTranslation.profiles,
    null,
    {refreshInterval: refreshInterval === 'Never' ? 0 : refreshInterval * 1000}
  );
  const [modal, setOpenedModal] = useModals();
  const actions = useActions(mutate, setOpenedModal, fileInformations);
  const columns = useColumns(actions);

  const tooltipTitleContent = () => {
    return (
      <div>
        <Typography sx={{color: 'inherit'}}>
          <b>{t('Languages')}: </b>
          <LanguagePairsRender source={fileInformations.source} target={fileInformations.modelOptions?.locale || fileInformations.target || ''} />
        </Typography>
        <Typography sx={{color: 'inherit'}}>
          <b>{t('Profile')}: </b>
          {profilesData ? RenderProfileCell(profilesData.profiles, fileInformations.detectedSelectors.detectedProfileId) : ''}
        </Typography>
      </div>
    );
  };

  const modifySentence = (newSentence: GridRowModel) => {
    const sentencesModifications = {
      fileId: newSentence.fileId,
      sentences: [newSentence]
    } as {fileId: string, sentences: Sentence[]};
    saveSentence(sentencesModifications, mutate).catch((err) => {
      // eslint-disable-next-line no-console
      console.log(err) // todo: deal with the exit on enter and the error display
    });
    return newSentence;
  };

  const slotProps = useMemo(() => (
    {
      toolbar: {
        fileInformations,
        isLoading,
        isValidating,
        refreshInterval,
        setRefreshInterval,
        actions,
        mutate
      } satisfies ToolbarProps
    }
  ), [
    isLoading,
    isValidating,
    refreshInterval,
    setRefreshInterval,
    actions,
    mutate
  ]);

  return (
    <Box sx={{width: '100%', margin: '2rem'}}>
      {modal}
      <TitleContainer>
        <TypographyStyled>{fileInformations.fileName}</TypographyStyled>
        <TooltipCustom title={tooltipTitleContent()} placement={'right'}>
          <ColoredIcon><InfoIcon shape={'solid'} size={'lg'} /></ColoredIcon>
        </TooltipCustom>
      </TitleContainer>
      <Table
        editMode={'row'}
        processRowUpdate={modifySentence}
        maxHeight={'60vh'}
        loading={isLoading}
        rows={fileTranslated}
        columns={columns as any}
        initialState={initialState}
        checkboxSelection
        pagination
        pageSizeOptions={[10, 25, 50, 100]}
        slots={slots}
        slotProps={slotProps}
      />
    </Box>
  );
}

const ColoredIcon = styled('div')<{ theme?: Theme }>`
  color: ${({theme}) => theme.palette.primary.main};
`;

const TitleContainer = styled(PageTitleContainer)<{ theme?: Theme }>`
    display: flex;
    gap: 0.5rem;
`;
