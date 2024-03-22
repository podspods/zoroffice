import { SelectChangeEvent } from '@mui/material/Select';

import {
  GridToolbarContainer,
  GridToolbarExport
} from '@systran/react-components/lib/organisms/Table/Table';

import {
  LeftToolbarContainer,
  RightToolbarContainer
} from '@systran/react-components/lib/organisms/RowAction/RowActionToolbar';
import SelectBox from '@/components/SelectBox';
import { usePeriode } from '../../components/StatisticUtils';

type CustomToolbarProps = {
  onChange: (event: SelectChangeEvent<string>) => void;
};

export default function CustomToolbar({ onChange }: CustomToolbarProps) {
  return (
    <GridToolbarContainer>
      <LeftToolbarContainer>
        <SelectBox
          itemList={usePeriode()}
          onChange={onChange}
          // defaultValue={usePeriode()[0]}
        />
      </LeftToolbarContainer>
      <RightToolbarContainer style={{ paddingRight: '3rem' }}>
        <GridToolbarExport />
      </RightToolbarContainer>
    </GridToolbarContainer>
  );
}
