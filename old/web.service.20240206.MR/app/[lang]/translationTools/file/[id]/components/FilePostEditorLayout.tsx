import {FileInformations, Sentence} from './types';
import Apis from '@/utils/apis';
import useSWR from 'swr';
import useSWRImmutable from 'swr/immutable';
import {Profile} from '../../../UploadedFilesTable';
import SkeletonContent from '@/components/IframeLoader';
import Typography from '@mui/material/Typography';
import {RenderProfileCell} from '@/utils/findProfileName';
import {Box} from '@mui/material';
import {PageTitleContainer, TypographyStyled} from '@/components/PageTitle';
import InfoIcon from '@systran/react-components/lib/atoms/Icons/InfoIcon';
import PostEditorTable from './PostEditorTable';
import useRefreshBuilder from '@systran/react-components/lib/organisms/Table/hooks/useRefresh';
import {useRemoteHooks} from '@systran/react-components/lib/organisms/Table/hooks/useRemoteHooks';
import LanguagePairsRender from '@systran/react-components/lib/molecules/LanguagePairsRender';
import Tooltip from '@systran/react-components/lib/atoms/Tooltip';
import {useTranslation} from 'react-i18next';
import styled from '@systran/react-components/lib/Theme/styled';
import {Theme} from '@systran/react-components/lib/Theme';


type TooltipTitleContentProps = {
  fileInformations: FileInformations;
  profilesData: {profiles: Profile[]} | undefined
}
const TooltipTitleContent = ({fileInformations, profilesData}: TooltipTitleContentProps) => {
  const {t} = useTranslation();
  return (
    <div>
      <div style={{display: 'flex'}}>
        <Typography sx={{color: 'inherit', marginRight: '0.2rem'}} fontWeight={700}>{t('Languages')}: </Typography>
        <Typography sx={{color: 'inherit'}}>
          <LanguagePairsRender
            source={fileInformations.source || ''}
            target={fileInformations.modelOptions?.locale || fileInformations.target || ''}
            localized
          />
        </Typography>
      </div>
      <div style={{display: 'flex'}}>
        <Typography sx={{color: 'inherit', marginRight: '0.2rem'}} fontWeight={700}>{t('Profile')}: </Typography>
        <Typography sx={{color: 'inherit'}}>
          {profilesData ? RenderProfileCell(profilesData.profiles, fileInformations.detectedSelectors.detectedProfileId) : ''}
        </Typography>
      </div>
    </div>
  );
};

export default function FilePostEditorLayout({params}: { params: { id: string, lang: string } }) {

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


  return (
    <Box sx={{width: '100%', margin: '2rem'}}>
      <TitleContainer>
        <TypographyStyled>{fileInformations.fileName}</TypographyStyled>
        <Tooltip title={<TooltipTitleContent fileInformations={fileInformations} profilesData={profilesData} />} placement={'right'}>
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
