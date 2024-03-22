import { useTranslation } from 'react-i18next';
import { pick, values } from 'lodash';
import RefreshRateButton, {
  RefreshRate
} from '@systran/react-components/lib/atoms/ButtonsSpecial/RefreshRateButton';
import { RowAction } from '@systran/react-components/lib/organisms/RowAction/RowAction';
import PlusIcon from '@systran/react-components/lib/atoms/Icons/PlusIcon';
import RowActionToolbar, {
  LeftToolbarContainer,
  RightToolbarContainer
} from '@systran/react-components/lib/organisms/RowAction/RowActionToolbar';
import { PrimaryButton } from '@systran/react-components/lib/atoms/Buttons/Primary';
import {
  gridRowSelectionStateSelector, gridRowsLookupSelector,
  GridToolbarContainer,
  useGridApiContext, useGridSelector
} from '@systran/react-components/lib/organisms/Table/Table';
import { markAllAsRead } from './NotificationUtils';
import { Notification } from './NotificationsType';

export type NotificationToolbarProps = {
  actions: RowAction<Notification>[];
  isLoading: boolean;
  isValidating: boolean;
  refreshRate: RefreshRate;
  setRefreshInterval: (value: RefreshRate) => void;
  mutate: () => Promise<unknown> ;
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
  const rowSelectionModel = useGridSelector(gridApiRef, gridRowSelectionStateSelector) as unknown as number[];
  const files = useGridSelector(gridApiRef, gridRowsLookupSelector) as unknown as Notification[];
  const selectedRows = values(pick(files, rowSelectionModel));

  return (
    <GridToolbarContainer>
      <LeftToolbarContainer>
        <RowActionToolbar
          actions={useActions(props.actions, selectedRows)}
          selectedRows={selectedRows}
        />
      </LeftToolbarContainer>
      <RightToolbarContainer>
        <RefreshRateButton
          isLoading={props.isLoading || props.isValidating}
          onRefresh={() => void props.mutate()}
          refreshRate={props.refreshRate}
          onRefreshChange={props.setRefreshInterval}
        />
        <PrimaryButton
          title={t('Mark all as read')}
          endIcon={<PlusIcon />}
          onClick={() => void markAllAsRead(props.mutate)}
        >
          {t('Mark all as read')}
        </PrimaryButton>
      </RightToolbarContainer>
    </GridToolbarContainer>
  );
}
