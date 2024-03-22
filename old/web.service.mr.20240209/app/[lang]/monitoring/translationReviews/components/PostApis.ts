import Apis from '@/utils/apis';
import { commonFetch } from '@/utils/fetcher';
import { AppendPayloads, AppendTmPayloads, UpdatePayloads, Feedback } from './FeedbackType';

export const PostApi = {
  deleteFeedback: async (feedback: Feedback) => {
    const options = {
      method: 'POST',
      body: JSON.stringify({ id: feedback._id })
    };
    return await commonFetch(Apis.feedback.delete(feedback._id), options);
  },

  deleteFeedbacks: async (feedbacks: Feedback[]) => {
    return await Promise.allSettled(feedbacks?.map(PostApi.deleteFeedback));
  },

  addToUD: async (payload: AppendPayloads) => {
    const options = {
      method: 'POST',
      body: JSON.stringify(payload)
    };
    return await commonFetch(Apis.dictionary.addToUD, options);
  },

  addAllToUD: async (payloads: AppendPayloads[]) => {
    return await Promise.allSettled(payloads?.map(PostApi.addToUD));
  },

  addToTM: async (payload: AppendTmPayloads) => {
    const options = {
      method: 'POST',
      body: JSON.stringify(payload)
    };
    return await commonFetch(Apis.feedback.addToTM, options);
  },

  addAllToTM: async (payloads: AppendTmPayloads[]) => {
    return await Promise.allSettled(payloads?.map(PostApi.addToTM));
  },

  updateFeedback: async (data: UpdatePayloads) => {
    const id = data.id;
    const options = {
      method: 'POST',
      body: JSON.stringify({addToUD: data.payload?.addToUD, addToTM: data.payload?.addToTM, ...data.payload?.expandPayload})
    };
    return await commonFetch(Apis.feedback.update(id), options);
  },

  updateFeedbacks: async (payloads: UpdatePayloads[]) => {
    return await Promise.allSettled(payloads?.map(PostApi.updateFeedback));
  }
};
