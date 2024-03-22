import Script from 'next/script';
import React from 'react';


export default function CustomScripts(scriptsList: string[], pathScripts?: string) {
  const pathPrefix = pathScripts ? pathScripts : '';
  return scriptsList.map((scriptName) => {
    return (<Script src={pathPrefix + scriptName} />);
  });
}
