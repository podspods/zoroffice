import React from 'react';
import {useSearchParams} from 'next/navigation';
import SkeletonContent from './IframeLoader';

export default function CustomIframe({route, lang}: {route: string, lang: string}) {
  const [iframeIsLoading, setIframeIsLoading] = React.useState(true);
  const searchParams = new URLSearchParams(useSearchParams().toString());

  if (lang)
    searchParams.append('lang', lang);

  const searchQuery = searchParams ? '?' + searchParams.toString() : '';


  const handleIframeLoading = () => {
    setTimeout(() => {
      setIframeIsLoading(false);
    }, 100);
  };

  const deprecated = () => {
    return (<div style={{flex: '1', border: '0px', position: 'absolute', paddingInline: '60px', paddingTop: '10px', fontSize: '2rem', color: 'red'}}>
      Deprecated
    </div>)
  }

  return (
    <div style={{flex: '1', height: '100%', width: '100%', border: '0px'}}>
      {iframeIsLoading && <SkeletonContent /> }
      {deprecated()}
      <iframe
        src={route + searchQuery}
        onLoad={handleIframeLoading}
        style={{flex: '1', width: '100%', border: '0px', height: 'calc(100% - 10px)'}}
      />
    </div>
  );
}
