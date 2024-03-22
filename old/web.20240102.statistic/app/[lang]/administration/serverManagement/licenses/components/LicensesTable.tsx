import { useState, useMemo, useContext } from 'react';
import { RefreshRate } from '@systran/react-components/lib/atoms/ButtonsSpecial/RefreshRateButton';
import { RowAction } from '@systran/react-components/lib/organisms/RowAction/RowAction';
import Table, { GridColDef, GridRowParams } from '@systran/react-components/lib/organisms/Table/Table';
import StatusBadge from '@systran/react-components/lib/atoms/StatusBadge';
import { displayExpiration } from '@systran/react-components/lib/atoms/utils';
import DeleteIcon from '@systran/react-components/lib/atoms/Icons/DeleteIcon';
import PlayIcon from '@systran/react-components/lib/atoms/Icons/PlayIcon';
import { Box } from '@mui/material';
import PageTitle from '@/components/PageTitle';
import { SettingsContext } from '@/components/SettingProvider';
import { useTranslation } from 'react-i18next';
import ActivateLicenseForm from './ActivateLicenseForm';
import AddProductKeyForm from './AddProductKeyForm';
import DeleteLicensesForm from './DeleteLicensesForm';
import { PostApi } from './PostApi';
import LicenseBox from './LicenseBox';
import Toolbar, { Props as ToolbarProps } from './Toolbar';
import useSWR from 'swr';
import Apis from '@/utils/apis';
import { actionColumn } from '@/components/Columns';


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

export type OpenedModal = {
  modalType: 'activate' | 'add' | 'delete'
  selectedLicenses: License[]
} | {
  modalType: 'add'
} | undefined

const initialState = {
  sorting: {
    sortModel: [{field: 'product', sort: 'asc' as const}]
  },
  pagination: { paginationModel: { pageSize: 10} }
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
    text = 'Invalid';
  }
  else if (activated) {
    const isExpired = row.expiration !== 'perpetual' ? new Date(row.expireAt) < new Date() : false;
    text = isExpired ? 'Expired' : 'Activated';
  }
  else {
    text = 'Not yet activated';
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
    actionColumn({t, actions})
  ] satisfies GridColDef<License>[], [renderStatusBadge, actions, displayExpiration]);
}

const expandComponent = ({row}: GridRowParams<License>) => {
  return <LicenseBox {...row} />;
};

export default function LicensesTable() {
  const [refreshInterval, setRefreshInterval] = useState<RefreshRate>(10);

  const { data, isLoading, isValidating, mutate } = useSWR(Apis.license.list, {
    shouldRetryOnError: false,
    revalidateOnFocus: false,
    refreshInterval: (refreshInterval === 'Never') ? 0 : (refreshInterval * 1000),
    onError: (err) => console.error('Error fetching licenses:', err) // eslint-disable-line
  });

  const licenses = useMemo(() => {
    return (data?.licenses || []).map(transformApiResponse);
  }, [data]);

  const [modal, setOpenedModal] = useLicenseModals({mutate});
  const actions = useActions(setOpenedModal);
  const columns = useColumns(actions);

  const slots = {
    toolbar: Toolbar
  };

  const slotProps = useMemo(() => (
    {
      toolbar: {
        isLoading,
        isValidating,
        refreshInterval,
        setRefreshInterval,
        actions,
        setOpenedModal,
        mutate
      } satisfies ToolbarProps
    }
  ), [
    isLoading,
    isValidating,
    refreshInterval,
    setRefreshInterval,
    actions,
    setOpenedModal,
    mutate
  ]);

  const {t} = useTranslation();

  return (
    <Box sx={{width: '100%', margin: '2rem'}}>
      {modal}
      <PageTitle> {t('Licenses')} </PageTitle>
      <Table
        loading={isLoading}
        rows={licenses}
        columns={columns as any}
        initialState={initialState}
        checkboxSelection
        pagination
        pageSizeOptions={[10, 25, 50, 100]}
        getDetailPanelContent={expandComponent as any}
        slots={slots}
        slotProps={slotProps}
      />
    </Box>
  );
}
