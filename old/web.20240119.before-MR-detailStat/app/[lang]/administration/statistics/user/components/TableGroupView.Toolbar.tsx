/* eslint-disable no-console */
import { GridToolbarContainer } from '@systran/react-components/lib/organisms/Table/Table';

import {
  LeftToolbarContainer,
  RightToolbarContainer
} from '@systran/react-components/lib/organisms/RowAction/RowActionToolbar';
import TextField from '@systran/react-components/lib/atoms/TextField';
import { useTranslation } from 'react-i18next';

import SelectBox from '@/components/SelectBox';
import SelectTypeStat from './SelectTypeStat';
import { statCategory } from './statisticsType';
import SelectLastPeriod from './SelectLastPeriod';
import ExportCsvButton from '@/components/fromReact/ExportCsvButton';

type GroupToolbarProps = {
  totalChar: number;
  totalGroup: number;
  onChangeGroup: (groupId: string) => void;
  onChangePeriod: (period: string) => void;
  groupList: string[];
  onChangeTypeStat: (typeStat: string) => void;
  periodList: string[];
  period: string;
  typeStat: number;
  group: string;
};

export default function UserViewToolbar({ ...props }: GroupToolbarProps) {
  const { t } = useTranslation();

  return (
    <>
      <GridToolbarContainer
        sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
      >
        <LeftToolbarContainer
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <SelectLastPeriod
            onChange={props.onChangePeriod}
            value={props.period}
            lastPeriodList={props.periodList}
          />
          <SelectTypeStat
            onChange={props.onChangeTypeStat}
            value={statCategory[props.typeStat]}
          />
          <SelectBox
            defaultValue={props.groupList.length > 0 ? props.groupList[0] : ''}
            value={props.group}
            itemList={props.groupList}
            onChange={(event) => props.onChangeGroup(event.target.value)}
          />
        </LeftToolbarContainer>
        <RightToolbarContainer style={{ paddingRight: '3rem' }}>
          <TextField
            id='outlined-read-only-input'
            label={t('Total Characters')}
            value={props.totalChar}
            InputProps={{
              readOnly: true
            }}
          />
          <TextField
            id='outlined-read-only-input'
            label={t('Total Group')}
            value={props.totalGroup}
            InputProps={{
              readOnly: true
            }}
          />
          <ExportCsvButton />
        </RightToolbarContainer>
      </GridToolbarContainer>
    </>
  );
}
