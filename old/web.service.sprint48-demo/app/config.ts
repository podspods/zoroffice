import {promises as fs} from 'fs';

export async function fetchCustomConfig() {
  try {
    const customConfigStr = await fs.readFile(process.cwd() + '/public/custom/customizationConfig.json', 'utf8');
    return JSON.parse(customConfigStr);
  }
  catch (error) {
    // eslint-disable-next-line no-console
    console.error(error); // You might send an exception to your error tracker like AppSignal
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
    // eslint-disable-next-line no-console
    console.error(error); // You might send an exception to your error tracker like AppSignal
    return {};
  }
}
