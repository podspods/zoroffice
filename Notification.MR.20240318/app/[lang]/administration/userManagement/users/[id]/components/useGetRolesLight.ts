import {useTranslation} from 'react-i18next';
import useSWR from 'swr';
import Apis from '@/utils/apis';

type Role = {id: string, name: string};

export default function useGetRoleListLight() {
  const { t } = useTranslation();
  const { data, ...response } = useSWR(Apis.group.getRoleListLight({ limit: 50 }));

  let convertedData: { value: string; label: string }[] = [];
  if (data && Array.isArray(data)) {
    convertedData = data.map(({ id, name }: Role) => ({ value: id, label: t(name) }));
  }
  return { ...response, data: convertedData };
}
