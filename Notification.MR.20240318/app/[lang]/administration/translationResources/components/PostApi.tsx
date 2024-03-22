import Apis from 'utils/apis';
import {commonFetch} from 'utils/fetcher';

export const PostApi = {
  activeResource: async (id: string) => {
    const header = {
      method: 'POST'
    };
    return await commonFetch(Apis.translationResources.activeResources(id), header);
  },
  deactivateResource: async (id: string) => {
    const header = {
      method: 'POST'
    };
    return await commonFetch(Apis.translationResources.deactivateResources(id), header);
  },
  deleteResource: async (id: string) => {
    const header = {
      method: 'POST'
    };
    return await commonFetch(Apis.translationResources.deleteResources(id), header);
  },
  upgradeResource: async (currentId: string, upgradeId: string) => {
    const header = {
      method: 'POST',
      body: JSON.stringify({upgradeId})
    };
    return await commonFetch(Apis.translationResources.upgradeResource(currentId), header);
  },
  downgradeResource: async (currentId: string, downgradeId: string) => {
    const header = {
      method: 'POST',
      body: JSON.stringify({downgradeId})
    };
    return await commonFetch(Apis.translationResources.downgradeResource(currentId), header);
  },
  addRoute: async (requestBody: any) => {
    const header = {
      method: 'POST',
      body: JSON.stringify(requestBody)
    };
    return await commonFetch(Apis.translationResources.addRoute, header);
  },
  installFollowingNode: async (id: string, requestBody: any) => {
    const header = {
      method: 'POST',
      body: JSON.stringify(requestBody)
    };
    return await commonFetch(Apis.translationResources.installFollowingNode(id), header);
  },
  uninstallFollowingNode: async (id: string) => {
    const header = {
      method: 'POST'
    };
    return await commonFetch(Apis.translationResources.uninstallFollowingNode(id), header);
  },
  updateInstance: async (id: string, requestBody: any) => {
    const header = {
      method: 'POST',
      body: JSON.stringify(requestBody)
    };
    return await commonFetch(Apis.translationResources.updateInstance(id), header);
  }
};
