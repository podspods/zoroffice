import {useTranslation} from 'react-i18next';
import useSWR from 'swr';
import Apis, {formatEleFilters} from 'utils/apis';

type Props = {
  eleFilters?: {withRoles?: boolean};
};

// type Data = {
//   accounts: Array<{id: string; displayName: string}>;
// };
type Account = {id: string; displayName: string};
type TData = {accounts: Account[]};

export default function useGetAccountListLight({eleFilters = {withRoles: true}}: Props) {
  const {t} = useTranslation();
  const queryParams = formatEleFilters(eleFilters);
  const {data = {accounts: []}, ...response} = useSWR<TData>(Apis.profiles.getAccountListLight(queryParams));

  const convertedData = data.accounts.map(({id, displayName}: Account) => ({value: id, label: t(displayName)}));
  return {...response, data: convertedData};
}
