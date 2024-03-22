import {FileInformations, Sentence} from './types';
import Apis from '@/utils/apis';
import useSWR from 'swr';
import useSWRImmutable from 'swr/immutable';
import {Profile} from '../../../UploadedFilesTable';
import SkeletonContent from '@/components/IframeLoader';
import Typography from '@mui/material/Typography';
import {RenderProfileCell} from '@/utils/findProfileName';
import {TitleTooltip} from '@/components/PageTitle';
import PostEditorTable from './PostEditorTable';
import useRefreshBuilder from '@systran/react-components/lib/organisms/Table/hooks/useRefresh';
import {useRemoteHooks} from '@systran/react-components/lib/organisms/Table/hooks/useRemoteHooks';
import LanguagePairsRender from '@systran/react-components/lib/molecules/LanguagePairsRender';
import {useTranslation} from 'react-i18next';
import {TemporaryPageBox} from '@/components/TemporaryPageBox';
import useModals from './useModals';


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

  const [modal, setOpenedModal] = useModals();

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
    <TemporaryPageBox>
      {modal}
      <TitleTooltip
        titleName={fileInformations.fileName}
        tooltipContent={<TooltipTitleContent fileInformations={fileInformations} profilesData={profilesData} />}
      />
      <PostEditorTable
        remoteHooksData={remoteHooksData}
        fileInformations={fileInformations}
        setOpenedModal={setOpenedModal}
      />
    </TemporaryPageBox>
  );
}
