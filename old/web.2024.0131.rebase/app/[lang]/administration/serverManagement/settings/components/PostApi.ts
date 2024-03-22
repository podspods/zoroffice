import Apis from '@/utils/apis';
import { commonFetch } from '@/utils/fetcher';

export const PostApi = {
  saveSettings: async (settingsTg: object) => {
    const options = {
      method: 'POST',
      body: JSON.stringify({settings: settingsTg})
    };
    return await commonFetch(Apis.setting.save, options);
  }
};
