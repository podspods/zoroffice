import Apis from '@/utils/apis';
import {Dispatch, MutableRefObject, SetStateAction, SyntheticEvent} from 'react';

export default function AudioPlayer({id, contentType, setTimeMedia, mediaPlayerRef}: {id: string, contentType: string, setTimeMedia: Dispatch<SetStateAction<number>>, mediaPlayerRef: MutableRefObject<null | HTMLMediaElement>}) {

  const handleTimeUpdate = (event: SyntheticEvent<HTMLMediaElement, Event>) => {
    setTimeMedia((event.target as HTMLMediaElement).currentTime);
  };

  return (
    <audio
      ref={mediaPlayerRef}
      controls
      controlsList='nodownload'
      preload='auto'
      style={{width: '100%', marginBottom: '10px', marginTop: '0.5rem'}}
      onTimeUpdate={handleTimeUpdate}
    >
      <source src={Apis.speechPostEditor.stream(id)} type={contentType} />
      <em>{i18n.t('Sorry, your browser doesn\'t support HTML5 audio.')}</em>
    </audio>
  );
}
