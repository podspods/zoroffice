import {promises as fs} from 'fs';

export async function fetchCustomConfig() {
  try {
    const customConfigStr = await fs.readFile(process.cwd() + '/public/custom/customizationConfig.json', 'utf8');
    return JSON.parse(customConfigStr);
  }
  catch (error) {
    console.error('fetchCustomConfig', error); // eslint-disable-line no-console
    return {
      embeddedScripts: [],
      externalScripts: [],
      icon: 'systran.ico',
      logo: 'translate_server_logo.svg',
      theme: 'translate_server_theme.json',
      hideSystranLogo: false
    };
  }
}

export async function fetchTheme(themeName: string) {
  try {
    const themeStr = await fs.readFile(process.cwd() + `/public/custom/theme/${themeName || 'translate_server_theme.json'}`, 'utf8');
    return JSON.parse(themeStr);
  }
  catch (error) {
    console.error('fetchTheme', error); // eslint-disable-line no-console
    return {};
  }
}
