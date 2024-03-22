import useSWR from 'swr';

type Props = {api: string};

export default function useGetUpgradeList({api}: Props) {
  const {data: enginesData = [], ...result} = useSWR(api);

  return {...result, data: enginesData.translationResources};
}
