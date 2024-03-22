import { useTranslation } from 'react-i18next';
import { pick, values } from 'lodash';
import {
  GridToolbarContainer,
  GridToolbarQuickFilter,
  useGridApiContext
} from '@systran/react-components/lib/organisms/Table/Table';
import RefreshRateButton, {
  RefreshRate
} from '@systran/react-components/lib/atoms/ButtonsSpecial/RefreshRateButton';
import { RowAction } from '@systran/react-components/lib/organisms/RowAction/RowAction';
import PlusIcon from '@systran/react-components/lib/atoms/Icons/PlusIcon';
import RowActionToolbar from '@systran/react-components/lib/organisms/RowAction/RowActionToolbar';
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
  const dataRowIdToModelLookup = gridApiRef?.current.state.rows
    .dataRowIdToModelLookup as Record<string, Service>;
  const rowSelection = gridApiRef?.current.state.rowSelection as string[];
  const selectedRows = values(pick(dataRowIdToModelLookup, rowSelection));

  return (
    <GridToolbarContainer style={{ justifyContent: 'space-between' }}>
      <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
        <RowActionToolbar
          actions={useActions(props.actions, selectedRows)}
          selectedRows={selectedRows}
        />
        <GridToolbarQuickFilter />
      </div>
      <div>
        <RefreshRateButton
          isLoading={props.isLoading}
          onRefresh={props.mutate}
          refreshRate={props.refreshRate}
          onRefreshChange={(value) => {
            props.setRefreshInterval(value);
          }}
        />
        <PrimaryButton
          style={{
            marginRight: '10px'
          }}
          title={t('Register new service')}
          endIcon={<PlusIcon />}
          onClick={props.registerNewService}
        >
          {t('Register new service')}
        </PrimaryButton>
      </div>
    </GridToolbarContainer>
  );
}
