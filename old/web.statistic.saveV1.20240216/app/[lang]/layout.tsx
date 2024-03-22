import React from 'react';
import MenuDiscovery from '@/components/Discovery/MenuDiscovery';
import '../../public/fonts/quicksand.css'; // When babel is removed, use 'next/font/google' and change the value of spnsTheme.typography.fontFamily
import {ClientLayout} from '@/components/ClientLayout';
import CustomScripts from '@/components/CustomScripts';
import {fetchCustomConfig, fetchTheme} from '../config';


export default async function RootLayout({children, params}: React.PropsWithChildren<{params: {lang: string}}>) {

  const customConfig: {
    embeddedScripts: string[],
    externalScripts: string[],
    icon: string,
    logo: string,
    theme: string,
    hideSystranLogo: boolean,
    onlineDocumentation?: string
  } = await fetchCustomConfig();

  const MenuLogo = (<img
    src={`/custom/logo/${customConfig.logo || 'translate_server_logo.svg'}`}
    alt='application logo'
    style={{height: '65%', width: '100%'}}
  />);

  const theme = await fetchTheme(customConfig.theme);

  return (
    <html lang='en'>
      <head>
        {customConfig.embeddedScripts && CustomScripts(customConfig.embeddedScripts, '/custom/script/')}
        {customConfig.externalScripts && CustomScripts(customConfig.externalScripts)}
        <link rel='icon' href={`/custom/icon/${customConfig.icon || 'systran.ico'}`} />
      </head>
      <body style={{display: 'flex', fontFamily: 'Quicksand'}}>
        <ClientLayout theme={theme}>
          <MenuDiscovery lang={params.lang} MenuLogo={MenuLogo} hideSystranLogoNavBar={customConfig.hideSystranLogo} documentationLink={customConfig.onlineDocumentation}>
            {children}
          </MenuDiscovery>
        </ClientLayout>
      </body>
    </html>
  );
}
