import { StatisticsGroups } from '../groups/components/StatisticType';
import { typeTable } from '../profiles/components/statisticTable';

export function formatData(countedRawData: any, uncountedRawData: any) {
  /*
  const data1: StatisticsGroups[] = countedRawData.groups;
  const data2: StatisticsGroups[] = uncountedRawData.groups;
  const dataSource1: StatisticsGroups[] = countedRawData.source;
  const dataSource2: StatisticsGroups[] = uncountedRawData.source;

  const dataTarget1: StatisticsGroups[] = countedRawData.target;
  const dataTarget2: StatisticsGroups[] = uncountedRawData.target;

  const dataTarget1Remap: StatisticsGroups[] = Object.entries(dataTarget1).map(
    (target) => ({
      ...target[1],
      id: target[0] + '_1',
      target: target[0],
      isCounted: true
    })
  );
  const dataTarget2Remap: StatisticsGroups[] = Object.entries(dataTarget1).map(
    (target) => ({
      ...target[1],
      id: target[0] + '_0',
      target: target[0],
      isCounted: false
    })
  );

  const dataSource1Remap: StatisticsGroups[] = Object.entries(dataSource1).map(
    (source) => ({
      ...source[1],
      id: source[0] + '_1',
      source: source[0],
      isCounted: true
    })
  );
  const dataSource2Remap: StatisticsGroups[] = Object.entries(dataSource2).map(
    (source) => ({
      ...source[1],
      id: source[0] + '_0',
      source: source[0],
      isCounted: false
    })
  );

  const data1Remap: StatisticsGroups[] = Object.entries(data1).map((group) => ({
    ...group[1],
    id: group[0] + '_1',
    isCounted: true
  }));
  const data2Remap: StatisticsGroups[] = Object.entries(data2).map((group) => ({
    ...group[1],
    id: group[0] + '_0',
    isCounted: false
  }));

  const statisticsGlobalRowList = [
    {
      id: 1,
      isCounted: true,
      elapsedTime: countedRawData.elapsedTime,
      groupName: countedRawData.groupName,
      nbCacheHits: countedRawData.nbCacheHits,
      nbCharacters: countedRawData.nbCharacters,
      nbCharactersCacheHits: countedRawData.nbCharactersCacheHits,
      nbSegments: countedRawData.nbSegments,
      nbTokens: countedRawData.nbTokens,
      nbTus: countedRawData.nbTus,
      nbTusFailed: countedRawData.nbTusFailed,
      request: countedRawData.request,
      success: countedRawData.success
    },
    {
      id: 2,
      isCounted: false,
      elapsedTime: uncountedRawData.elapsedTime,
      groupName: uncountedRawData.groupName,
      nbCacheHits: uncountedRawData.nbCacheHits,
      nbCharacters: uncountedRawData.nbCharacters,
      nbCharactersCacheHits: uncountedRawData.nbCharactersCacheHits,
      nbSegments: uncountedRawData.nbSegments,
      nbTokens: uncountedRawData.nbTokens,
      nbTus: uncountedRawData.nbTus,
      nbTusFailed: uncountedRawData.nbTusFailed,
      request: uncountedRawData.request,
      success: uncountedRawData.success
    }
  ];
  const statisticsGroupRowList = [...data1Remap, ...data2Remap];
  const statisticsSource = [...dataSource1Remap, ...dataSource2Remap];
  const statisticsTarget = [...dataTarget1Remap, ...dataTarget2Remap];

  let returnValue: StatisticsGroups[] = [];
  const labelList = Object.entries(typeTable);
  const result = labelList.map(([key, label]) => {
    const dataCounted = countedRawData[label];
    const dataUnCounted = uncountedRawData[label];

    const data1Remap: StatisticsGroups[] = Object.entries(dataCounted).map(
      ([key, value]: [string, StatisticsGroups]) => ({
        ...value,  ??????????????????????????????????????????????????????
        id: key + '_1',
        label: key,
        isCounted: true
      })
    );
    const data2Remap: StatisticsGroups[] = Object.entries(dataUnCounted).map(
      (value) => ({
        ...value[1],
        id: value[0] + '_0',
        label: value[0],
        isCounted: false
      })
    );

    const result: StatisticsGroups[] = [...data1Remap, ...data2Remap];

    returnValue[label] = result;
    return;
  });

  return {
    statisticsGroupRowList: statisticsGroupRowList,
    statisticsGlobalRowList: statisticsGlobalRowList,
    statisticsSource: statisticsSource,
    statisticsTarget: statisticsTarget
  };
}

export function usePeriode(): string[] {
  return [
    '2013-12',
    '2013-11',
    '2013-10',
    '2013-09',
    '2013-08',
    '2013-07',
    '2013-06',
    '2013-05',
    '2013-04',
    '2013-03',
    '2013-02',
    '2013-01'
  ];
  */
}
