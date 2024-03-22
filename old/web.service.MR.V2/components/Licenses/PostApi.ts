import Apis from '../../utils/apis';
import { commonFetch } from '@/utils/fetcher';
import { License } from './LicensesTable';

export const PostApi = {
  addProductKey: async (productKey: string) => {
    const options = {
      method: 'POST',
      body: JSON.stringify({productKey})
    };
    return await commonFetch(Apis.license.add, options);
  },

  deleteLicense: async (license: License) => {
    const options = {
      method: 'POST',
      body: JSON.stringify({ productKey: license.productKey })
    };
    return await commonFetch(Apis.license.delete, options);
  },

  deleteLicenses: async (licenses: License[]) => {
    return await Promise.allSettled(licenses.map(PostApi.deleteLicense));
  },

  activateLicense: async (method: 'online' | 'offline' | 'phone', productKey: string, activationCode: string) => {
    const actionForMethod = {
      online: 'online/secure',
      offline: 'offline/secure',
      phone: 'offline/phone'
    };

    const options = {
      method: 'POST',
      body: JSON.stringify({
        productKey: productKey,
        activationCode: activationCode
      })
    };
    return await commonFetch(Apis.license.activate(actionForMethod[method]), options);
  }
};
