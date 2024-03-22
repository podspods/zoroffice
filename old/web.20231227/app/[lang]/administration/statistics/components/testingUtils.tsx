import countedRawData from '../data/Counted-sample.json';
import uncountedRawData from '../data/encounted-sample.json';
import { globalStatistic, indicatorStatistic } from './StatisticUtils';

export type testingUtilsProps = {
  name: string;
};
export default function testingUtils({ ...props }: testingUtilsProps) {
  const dataEntries = Object.entries(countedRawData);
  const statGlobal = globalStatistic(countedRawData);
  const statIndocator = indicatorStatistic(countedRawData, uncountedRawData);
  const { accountId } = indicatorStatistic(countedRawData, uncountedRawData);
  // console.log(' statGlobal==>', statGlobal);
  // console.log(' statIndocator==>', statIndocator);
  // console.log(' accountId==>', accountId);

  return (
    <>
      <p>testingUtils : {props.name}</p>
      <ul>
        {Object.entries(statGlobal).map(([key, value]) => (
          <li key={key}>
            [{key}]:[{JSON.stringify(value)}]
          </li>
        ))}
      </ul>
      <ul>
        {accountId.map((item) => (
          <li key={item.id}>[{JSON.stringify(item)}]</li>
        ))}
      </ul>
    </>
  );
}
