import { useTranslation } from 'react-i18next';
import { pick, values } from 'lodash';
import {
  gridRowSelectionStateSelector, gridRowsLookupSelector,
  GridToolbarContainer,
  GridToolbarQuickFilter,
  useGridApiContext, useGridSelector
} from '@systran/react-components/lib/organisms/Table/Table';
import RefreshRateButton, {
  RefreshRate
} from '@systran/react-components/lib/atoms/ButtonsSpecial/RefreshRateButton';
import { RowAction } from '@systran/react-components/lib/organisms/RowAction/RowAction';
import RowActionToolbar, {
  LeftToolbarContainer,
  RightToolbarContainer
} from '@systran/react-components/lib/organisms/RowAction/RowActionToolbar';
import PlusIcon from '@systran/react-components/lib/atoms/Icons/PlusIcon';
import { PrimaryButton } from '@systran/react-components/lib/atoms/Buttons/Primary';
import { Service } from './serviceType';

export type ServiceToolBarProps = {
  actions: RowAction<Service>[];
  isLoading: boolean;
  refreshRate: RefreshRate;
  setRefreshInterval: (value: RefreshRate) => void;
  mutate: () => void;
  registerNewService: () => void;
};
export default function ServiceToolBar({ ...props }: ServiceToolBarProps) {
  const { t } = useTranslation();
  function useActions(
    actions: RowAction<Service>[],
    rowSelected: Service[]
  ): RowAction<Service>[] {
    const isDisable: boolean = rowSelected.length !== 1;
    return actions.map((oneAction) => ({
      ...oneAction,
      disable: () => isDisable
    }));
  }

  const gridApiRef = useGridApiContext();
  const rowSelectionModel = useGridSelector(gridApiRef, gridRowSelectionStateSelector) as unknown as number[];
  const files = useGridSelector(gridApiRef, gridRowsLookupSelector) as unknown as Service[];
  const selectedRows = values(pick(files, rowSelectionModel));

  return (
    <GridToolbarContainer>
      <LeftToolbarContainer>
        <RowActionToolbar
          actions={useActions(props.actions, selectedRows)}
          selectedRows={selectedRows}
        />
        <GridToolbarQuickFilter />
      </LeftToolbarContainer>
      <RightToolbarContainer>
        <RefreshRateButton
          isLoading={props.isLoading}
          onRefresh={props.mutate}
          refreshRate={props.refreshRate}
          onRefreshChange={(value) => {
            props.setRefreshInterval(value);
          }}
        />
        <PrimaryButton
          title={t('Register new service')}
          endIcon={<PlusIcon />}
          onClick={props.registerNewService}
        >
          {t('Register new service')}
        </PrimaryButton>
      </RightToolbarContainer>
    </GridToolbarContainer>
  );
}
