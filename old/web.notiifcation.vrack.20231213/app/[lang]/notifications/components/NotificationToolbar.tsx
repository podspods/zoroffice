import { useTranslation } from 'react-i18next';
import { pick, values } from 'lodash';
import RefreshRateButton, {
  RefreshRate
} from '@systran/react-components/lib/atoms/ButtonsSpecial/RefreshRateButton';
import { RowAction } from '@systran/react-components/lib/organisms/RowAction/RowAction';
import PlusIcon from '@systran/react-components/lib/atoms/Icons/PlusIcon';
import RowActionToolbar from '@systran/react-components/lib/organisms/RowAction/RowActionToolbar';
import { PrimaryButton } from '@systran/react-components/lib/atoms/Buttons/Primary';
import {
  GridToolbarContainer,
  useGridApiContext
} from '@systran/react-components/lib/organisms/Table/Table';
import { Notification } from './NotificationsType';
import { markAllAsRead } from './NotificationUtils';

export type NotificationToolbarProps = {
  actions: RowAction<Notification>[];
  isLoading: boolean;
  isValidating: boolean;
  refreshRate: RefreshRate;
  setRefreshInterval: (value: RefreshRate) => void;
  mutate: () => Promise<void>;
};

export default function NotificationToolbar({
  ...props
}: NotificationToolbarProps) {
  const { t } = useTranslation();
  function useActions(
    actions: RowAction<Notification>[],
    rowSelected: Notification[]
  ): RowAction<Notification>[] {
    const isDisable: boolean = rowSelected.length <= 0;
    return actions.map((oneAction) => ({
      ...oneAction,
      disable: () => isDisable
    }));
  }

  const gridApiRef = useGridApiContext();
  const dataRowIdToModelLookup = gridApiRef?.current.state.rows
    .dataRowIdToModelLookup as Record<string, Notification>;
  const rowSelection = gridApiRef?.current.state.rowSelection as string[];
  const selectedRows = values(pick(dataRowIdToModelLookup, rowSelection));

  return (
    <GridToolbarContainer style={{ justifyContent: 'space-between' }}>
      <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
        <RowActionToolbar
          actions={useActions(props.actions, selectedRows)}
          selectedRows={selectedRows}
        />
      </div>
      <div>
        <RefreshRateButton
          isLoading={props.isLoading || props.isValidating}
          onRefresh={() => void props.mutate()}
          refreshRate={props.refreshRate}
          onRefreshChange={props.setRefreshInterval}
        />
        <PrimaryButton
          style={{
            marginRight: '10px'
          }}
          title={t('Mark all as read')}
          endIcon={<PlusIcon />}
          onClick={() => void markAllAsRead(props.mutate)}

        >
          {t('Mark all as read')}
        </PrimaryButton>
      </div>
    </GridToolbarContainer>
  );
}
