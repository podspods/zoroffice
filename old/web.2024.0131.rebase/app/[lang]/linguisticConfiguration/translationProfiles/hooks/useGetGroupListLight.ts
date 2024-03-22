import {useTranslation} from 'react-i18next';
import useSWR from 'swr';
import Apis from '@/utils/apis';

// type Data = {
//   groups: Array<{id: string; name: string}>;
// };
type Group = {id: string; name: string};
export default function useGetGroupListLight() {
  const {t} = useTranslation();
  const {data = {groups: []}, ...response} = useSWR(Apis.profiles.getGroupListLight(true));
  const convertedData = data.groups.map(({id, name}: Group) => ({value: id, label: t(name)}));
  return {...response, data: convertedData};
}
