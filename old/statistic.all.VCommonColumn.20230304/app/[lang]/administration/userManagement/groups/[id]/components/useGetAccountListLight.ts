import {useTranslation} from 'react-i18next';
import useSWR from 'swr';
import Apis from 'utils/apis';

type Account = {id: string; displayName: string};

export default function useGetAccountListLight() {
  const {t} = useTranslation();
  const { data, ...response } = useSWR(Apis.group.getUserListLight({ limit: 50 }));
  const convertedData = (data?.accounts || []).map(({id, displayName}: Account) => ({value: id, label: t(displayName)}));
  return {...response, data: convertedData};
}
