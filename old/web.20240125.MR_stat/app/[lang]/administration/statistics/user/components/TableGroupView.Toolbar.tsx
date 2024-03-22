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
import { statCategory } from '../../components/statisticsConstant';

import SelectLastPeriod from './SelectLastPeriod';
import ExportCsvButton from '@/components/fromReact/ExportCsvButton';
import { SelectChangeEvent } from '@mui/material';
import { Group } from '../../components/statisticsType';

type GroupToolbarProps = {
  totalChar: number;
  totalGroup: number;
  onChangeGroup: (group: Group) => void;
  onChangePeriod: (period: string) => void;
  groupList: Group[];
  onChangeTypeStat: (typeStat: string) => void;
  periodList: string[];
  period: string;
  typeStat: number;
  group: Group;
};

export default function UserViewToolbar({ ...props }: GroupToolbarProps) {
  const { t } = useTranslation();
  // const handleOnchange = (groupName: string, groupList: Group[]) => {
  const handleOnchange = (event: SelectChangeEvent) => {
    const groupName = event.target.value;
    const groupFound = props.groupList.find(
      (group) => group.name === groupName
    );
    if (groupFound) props.onChangeGroup(groupFound);
  };
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
            defaultValue={
              props.groupList.length > 0 ? props.groupList[0].name : ''
            }
            value={props.group.name}
            itemList={props.groupList.map((group) => group.name)}
            onChange={handleOnchange}
          />
        </LeftToolbarContainer>
        <RightToolbarContainer>
          <TextField
            id='outlined-read-only-input'
            label={t('Total Characters')}
            value={props.totalChar}
            InputProps={{
              readOnly: true
            }}
            style={{ width: 100 }}
          />

          {/* ??????????  remove  */}
          {/* <TextField
            id='outlined-read-only-input'
            label={t('Total Group')}
            value={props.totalGroup}
            InputProps={{
              readOnly: true
            }}
            style={{ width: 100 }}
          /> */}
          <ExportCsvButton />
        </RightToolbarContainer>
      </GridToolbarContainer>
    </>
  );
}
