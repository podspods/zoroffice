import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  GridToolbarContainer,
  GridToolbarQuickFilter
} from '@mui/x-data-grid-pro';
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
  selectedRows: Service[];
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
  return (
    <GridToolbarContainer style={{ justifyContent: 'space-between' }}>
      <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
        <RowActionToolbar
          actions={useActions(props.actions, props.selectedRows)}
          selectedRows={props.selectedRows}
        />
      </div>
      <div>
        <GridToolbarQuickFilter />
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
