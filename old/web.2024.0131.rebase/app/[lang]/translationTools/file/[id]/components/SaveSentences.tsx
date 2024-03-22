import {Sentence} from './types';
import type {UpdateToastMessage} from '@/components/contexts/ToastMessageContext';
import {commonFetch} from '@/utils/fetcher';
import Apis from '@/utils/apis';
import {FilePostEditorMessages} from './Messages';

const saveSentences = async (newSentences: {fileId: string, sentences: Sentence[]}, mutate: () => Promise<Sentence[] | undefined>, updateToastMessage: UpdateToastMessage) => {
  try {
    const options = {
      method: 'POST',
      body: JSON.stringify(newSentences)
    };
    const response = await commonFetch(Apis.filePostEditor.saveSentence, options);
    if (response?.error) {
      throw new Error(response?.error);
    }
    else {
      updateToastMessage({
        label: FilePostEditorMessages.success.editing,
        status: 'success'
      });
    }
  }
  finally {
    await mutate();
  }
};

export {saveSentences as default};
