import {Sentence} from './types';
import Apis from '@/utils/apis';
import useSWR from 'swr';
import useSWRImmutable from 'swr/immutable';
import {Profile} from '../UploadedFilesTable';
import SkeletonContent from '@/components/IframeLoader';
import {TitleTooltip} from '@/components/PageTitle';
import PostEditorTable from './PostEditorTable';
import useRefreshBuilder from '@systran/react-components/lib/organisms/Table/hooks/useRefresh';
import {useRemoteHooks} from '@systran/react-components/lib/organisms/Table/hooks/useRemoteHooks';
import {TemporaryPageBox} from '@/components/TemporaryPageBox';
import useModals from './useModals';
import TooltipTitleContent from './TitleTooltipContent';
import {MutableRefObject, useContext, useRef, useState} from 'react';
import {PostEditorContext} from './context/PostEditorContext';
import AudioPlayer from '../speech/[id]/components/AudioPlayer';


export default function FilePostEditorLayout({params}: { params: { id: string, lang: string } }) {
  const [timeMedia, setTimeMedia] = useState(0);
  const {mode} = useContext(PostEditorContext);
  const mediaPlayerRef: MutableRefObject<null | HTMLMediaElement> = useRef(null);

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
    Apis.fileTranslation.profiles(),
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
      {mode === 'speech' && <AudioPlayer id={params.id} contentType={fileInformations.sysContentType} setTimeMedia={setTimeMedia} mediaPlayerRef={mediaPlayerRef} />}
      <PostEditorTable
        remoteHooksData={remoteHooksData}
        fileInformations={fileInformations}
        setOpenedModal={setOpenedModal}
        timeMedia={timeMedia}
        mediaPlayerRef={mediaPlayerRef}
      />
    </TemporaryPageBox>
  );
}
