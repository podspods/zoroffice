import useSWR from 'swr';
import uniqueId from 'lodash/uniqueId';
import Apis from '@/utils/apis';

type TData = {files?: Array<{filename: string; id: string}>};

export default function useGetTranslationMemories(props: {source: string; target: string}) {
  const {data: translationMemoriesData = {}, ...result} = useSWR<TData>(Apis.profiles.getTranslationMemories(props));
  const tmList = {
    tmList: translationMemoriesData.files?.map((tm) => {
      const name = tm.filename.split('/');
      name.splice(0, 1);
      if (name.length > 1) {
        return {
          name: name.join('/'),
          id: tm.id,
          type: 'folder',
          key: uniqueId()
        };
      }
      return {
        name: name[0],
        id: tm.id,
        type: 'file',
        key: uniqueId()
      };
    })
  };
  return {
    ...result,
    data: tmList
  };
}