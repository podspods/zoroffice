import {useState, useMemo, useContext} from 'react';
import RefreshRateButton, { RefreshRate } from '@systran/react-components/lib/atoms/ButtonsSpecial/RefreshRateButton';
import RowActionToolbar from '@systran/react-components/lib/organisms/RowAction/RowActionToolbar';
import {RowAction} from '@systran/react-components/lib/organisms/RowAction/RowAction';
import RowActionMenu from '@systran/react-components/lib/organisms/RowAction/RowActionMenu';
import Table from '@systran/react-components/lib/organisms/Table/Table';
import StatusBadge from '@systran/react-components/lib/atoms/StatusBadge';
import {displayExpiration} from '@systran/react-components/lib/atoms/utils';
import {Box, Toolbar} from '@mui/material';
import DeleteIcon from '@systran/react-components/lib/atoms/Icons/DeleteIcon';
import PlusIcon from '@systran/react-components/lib/atoms/Icons/PlusIcon';
import PlayIcon from '@systran/react-components/lib/atoms/Icons/PlayIcon';
import ActivateLicenseForm from './ActivateLicenseForm';
import AddProductKeyForm from './AddProductKeyForm';
import DeleteLicensesForm from './DeleteLicensesForm';
import LicenseBox from './LicenseBox';
import PageTitle from '../PageTitle';
import {PostApi} from './PostApi';
import {SettingsContext} from '../SettingProvider';
import {useTranslation} from 'react-i18next';
import { GridColDef, GridRowParams } from '@mui/x-data-grid-pro';
import { PrimaryButton } from '@systran/react-components/lib/atoms/Buttons/Primary';

export function transformApiResponse(license: any): License {
  return {
    ...license,
    key: license.productKey,
    id: license.productKey
  };
}

export type License = {
  id: string | number;
  key: string;
  productKey: string;
  product: string;
  expiration: string;
  expireAt: string;
  valid: boolean;
  activated: boolean;
  activation: string;
  edition: string;
  coresLimit: string;
  customerType: string;
  usage: string;
  upgrade: string;
  hosted: string;
  item: string[];
};

function useSelectedRows<License extends {id: string | number}>(rows: readonly License[]) {
  const [selectedRowIds, setSelectedRowIds] = useState<(string | number)[]>([]);
  const selectedRows = useMemo(() => {
    const selectedRowIdsMap = new Set(selectedRowIds);
    return rows.filter((row) => selectedRowIdsMap.has(row.id));
  }, [rows, selectedRowIds]);
  return [selectedRows, setSelectedRowIds] as const;
}

export type OpenedModal = {
  modalType: 'activate' | 'add' | 'delete'
  selectedLicenses: License[]
} | {
  modalType: 'add'
} | undefined

const initialState = {
  sorting: {
    sortModel: [{field: 'product', sort: 'desc' as const}]
  }
};

function useLicenseModals({mutate}: {mutate: () => Promise<void>}) {
  const { settings } = useContext(SettingsContext);
  const [openedModal, setOpenedModal] = useState<OpenedModal>();

  const activateLicense = async (activationMethod: 'online' | 'offline' | 'phone', productKey: string, activationCode: string) => {
    try {
      const result = await PostApi.activateLicense(activationMethod, productKey, activationCode);
      if (result?.error)
        throw new Error(result.error);
    }
    finally {
      await mutate();
    }
  };

  const addProductKey = async (productKey: string) => {
    try {
      const result = await PostApi.addProductKey(productKey);
      if (result?.error)
        throw new Error(result.error);
    }
    finally {
      await mutate();
    }
  };

  const deleteLicenses = async (licenses: License[]) => {
    try {
      await PostApi.deleteLicenses(licenses);
    }
    finally {
      await mutate();
    }
  };

  let modal: JSX.Element | null;
  switch (openedModal?.modalType) {
    case 'activate':
      modal = (
        <ActivateLicenseForm
          open
          license={openedModal.selectedLicenses[0]}
          installationId={settings?.installationId || ''}
          onClose={() => setOpenedModal(undefined)}
          onConfirm={activateLicense}
        />
      );
      break;
    case 'add':
      modal = (
        <AddProductKeyForm
          open
          onClose={() => setOpenedModal(undefined)}
          onConfirm={addProductKey}
        />
      );
      break;
    case 'delete':
      modal = (
        <DeleteLicensesForm
          open
          licensesToDelete={openedModal.selectedLicenses}
          onConfirm={deleteLicenses}
          onClose={() => setOpenedModal(undefined)}
        />
      );
      break;
    default:
      modal = null;
  }

  return [modal, setOpenedModal] as const;
}

function useActions(setOpenedModal: (openedModal: OpenedModal) => void) {
  return useMemo(() => [
    {
      label: 'Activate',
      icon: <PlayIcon paused={false} />,
      disable: function(selectedLicenses) {
        return selectedLicenses.length !== 1 || !selectedLicenses[0].valid || selectedLicenses[0].activated;
      },
      onClick: (selectedLicenses) => {
        setOpenedModal({modalType: 'activate', selectedLicenses});
      }
    },
    {
      label: 'Delete',
      icon: <DeleteIcon />,
      disable: (selectedLicenses) => selectedLicenses.length < 1,
      onClick: (selectedLicenses) => {
        setOpenedModal({modalType: 'delete', selectedLicenses});
      }
    }
  ] satisfies RowAction<License>[], []);
}

type LicenseStatus = 'success' | 'error' | 'warning';

function renderStatusBadge(activated: boolean, row: License) {
  const {t} = useTranslation();

  let text: string;
  if (!row.valid) {
    text = 'Invalid license';
  }
  else if (activated) {
    const isExpired = row.expiration !== 'perpetual' ? new Date(row.expireAt) < new Date() : false;
    text = isExpired ? 'License expired' : 'License activated';
  }
  else {
    text = 'License not yet activated';
  }

  let status: LicenseStatus = 'success';
  if (!row.valid) {
    status = 'error';
  }
  else if (!activated) {
    status = 'warning';
  }
  else if (row.expiration !== 'perpetual') {
    const dateExpired = new Date(row.expireAt) >= new Date();
    if (!dateExpired) {
      status = 'error';
    }
  }
  return (
    <StatusBadge title={t(text)} status={status}>
      {t(text)}
    </StatusBadge>
  );
}

function useColumns(actions: RowAction<License>[]) {
  const {t} = useTranslation();

  return useMemo(() => [
    {
      field: 'activated',
      flex: 0.7,
      renderCell: ({row}) => renderStatusBadge(row.activated, row),
      editable: false,
      sortable: true,
      type: 'singleSelect',
      headerName: t('Status')
    },
    {
      field: 'product',
      flex: 1,
      sortable: true,
      editable: false,
      headerName: t('Product')
    },
    {
      field: 'activation',
      flex: 1,
      sortable: true,
      editable: false,
      headerName: t('Activation Mode')
    },
    {
      field: 'expiration',
      flex: 1,
      sortable: true,
      editable: false,
      renderCell: ({row}) => displayExpiration(row.expiration),
      headerName: t('Expiration')
    },
    {
      field: '',
      width: 60,
      sortable: false,
      editable: false,
      renderCell: ({row}) => <RowActionMenu actions={actions} selectedRow={row} />,
      headerName: ''
    }
  ] satisfies GridColDef<License>[], [renderStatusBadge, actions, displayExpiration]);
}

export type Props = {
  refreshInterval: RefreshRate
  setRefreshInterval: (refreshInterval: RefreshRate) => void
  isLoading: boolean
  isValidating: boolean
  licenses: License[]
  mutate: () => Promise<void>
}

const expandComponent = ({row}: GridRowParams<License>) => {
  return <LicenseBox {...row} />;
};

export default function LicensesTable({refreshInterval, setRefreshInterval, isLoading, isValidating, licenses, mutate}: Props) {
  const {t} = useTranslation();

  const [modal, setOpenedModal] = useLicenseModals({mutate});
  const actions = useActions(setOpenedModal);
  const columns = useColumns(actions);
  const [selectedRows, setSelectedRowIds] = useSelectedRows(licenses);

  return (
    <>
      {modal}
      <Box style={{width: '100%'}}>
        <PageTitle> {t('Licenses')} </PageTitle>
        <Toolbar disableGutters sx={{justifyContent: 'space-between'}}>
          <div style={{display: 'inline-flex'}}>
            <RefreshRateButton
              isLoading={isLoading || isValidating}
              onRefresh={mutate}
              refreshRate={refreshInterval}
              onRefreshChange={setRefreshInterval}
            />
            <RowActionToolbar
              actions={actions}
              selectedRows={selectedRows}
            />
          </div>
          <PrimaryButton
            onClick={() => setOpenedModal({modalType: 'add'})}
            endIcon={<PlusIcon />}
          >
            {t('Add Product Key')}
          </PrimaryButton>
        </Toolbar>
        <Table
          loading={isLoading}
          rows={licenses}
          columns={columns as any}
          initialState={initialState}
          checkboxSelection
          onRowSelectionModelChange={setSelectedRowIds}
          pagination
          getDetailPanelContent={expandComponent as any}
        />
      </Box>
    </>
  );
}
