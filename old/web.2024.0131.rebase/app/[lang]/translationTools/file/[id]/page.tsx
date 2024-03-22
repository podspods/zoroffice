'use client';

import useSWR from 'swr';
import useSWRImmutable from 'swr/immutable';
import userAuthorizations from '../../../../../../lib/userAuthorizations';
import {actions} from '../../../../../../lib/permissionsList';
import PostEditorTable from './components/PostEditorTable';
import Apis from '@/utils/apis';
import SkeletonContent from '@/components/IframeLoader';
import {PageTitleContainer, TypographyStyled} from '@/components/PageTitle';
import Tooltip from '@systran/react-components/lib/atoms/Tooltip';
import InfoIcon from '@systran/react-components/lib/atoms/Icons/InfoIcon';
import {Box} from '@mui/material';
import styled from '@systran/react-components/lib/Theme/styled';
import {Theme} from '@systran/react-components/lib/Theme';
import Typography from '@mui/material/Typography';
import LanguagePairsRender from '@systran/react-components/lib/molecules/LanguagePairsRender';
import {RenderProfileCell} from '@/utils/findProfileName';
import {useTranslation} from 'react-i18next';
import useRefreshBuilder from '@systran/react-components/lib/organisms/Table/hooks/useRefresh';
import {Sentence} from './components/types';
import {useRemoteHooks} from '@systran/react-components/lib/organisms/Table/hooks/useRemoteHooks';
import {Profile} from '../../UploadedFilesTable';


export default function TranslationToolFileId({params}: {params: {id: string, lang: string}}) {
  const {t} = useTranslation();
  const hasFilePostEditorPermission = userAuthorizations.check((actions as any).TRSL_FILE_PE);

  if (!hasFilePostEditorPermission)
    return null;


  const useRefresh = useRefreshBuilder<Sentence>({
    route: Apis.filePostEditor.translation(params.id),
    useSWR,
    adaptParamsOpts: {
      paginationParamsFields: {
        limit: 'iDisplayLength',
        skip: 'iDisplayStart'
      },
      sortParamsField: {
        sortName: '_id',
        sortOrder: 'desc'
      }
    },
    adaptResponseOpts: {
      validateRowFct: () => true,
      rowsField: 'sentences',
      totalRowCountField: 'iTotalDisplayRecords'
    }
  });

  const remoteHooksData = useRemoteHooks({useRefresh, refreshRate: 10});

  const { data: fileInformations, isLoading: infosIsLoading } = useSWRImmutable(
    Apis.filePostEditor.fileInfo(params.id),
    {
      refreshInterval: 0
    }
  );
  const {data: profilesData} = useSWR<{profiles: Profile[]}>(
    Apis.fileTranslation.profiles,
    null,
    {
      refreshInterval: 0
    }
  );

  if (infosIsLoading)
    return <SkeletonContent />;

  const tooltipTitleContent = () => {
    return (
      <div>
        <Typography sx={{color: 'inherit', display: 'flex'}}>
          <b>{t('Languages')}:</b>
          <LanguagePairsRender source={fileInformations.source || ''} target={fileInformations.modelOptions?.locale || fileInformations.target || ''} />
        </Typography>
        <Typography sx={{color: 'inherit', display: 'flex'}}>
          <b>{t('Profile')}:</b>
          {profilesData ? RenderProfileCell(profilesData.profiles, fileInformations.detectedSelectors.detectedProfileId) : ''}
        </Typography>
      </div>
    );
  };

  return (
    <Box sx={{width: '100%', margin: '2rem'}}>
      <TitleContainer>
        <TypographyStyled>{fileInformations.fileName}</TypographyStyled>
        <Tooltip title={tooltipTitleContent()} placement={'right'}>
          <ColoredIcon><InfoIcon shape={'solid'} size={'lg'} /></ColoredIcon>
        </Tooltip>
      </TitleContainer>
      <PostEditorTable
        remoteHooksData={remoteHooksData}
        fileInformations={fileInformations}
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
