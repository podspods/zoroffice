import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Theme, useTheme } from '@systran/react-components/lib/Theme';
import { LinkInternal } from '@systran/react-components/lib/atoms/Link';
import InternalRoutes from '@/utils/internalRoutes';
import { TranslationResources } from './serviceType';
import Table, {
  GridColDef,
  GridRenderCellParams,
  GridValidRowModel
} from '@systran/react-components/lib/organisms/Table/Table';

export type TranslationResourceProps = {
  data: TranslationResources[];
};
export default function TranslationResourceTable({
  ...props
}: TranslationResourceProps) {
  const rowList: GridValidRowModel[] = props.data;
  if (!rowList?.length) return <></>;
  const columns: GridColDef<GridValidRowModel>[] = useColumns();

  const theme: Theme = useTheme();
  const backgrounColor = {
    '& .MuiDataGrid-main': {
      backgroundColor: `${theme.palette.primary.light} !important`
    }
  };

  return (
    <>
      <Table
        rows={rowList}
        columns={columns}
        pagination={false}
        hideFooter
        sx={backgrounColor}
      />
    </>
  );
}

function useColumns(): GridColDef<GridValidRowModel>[] {
  const { t } = useTranslation();
  return useMemo(
    () => [
      {
        headerName: t('Name'),
        field: 'name',
        disableColumnFilter: true,
        disableColumnMenu: true,
        sortable: false,
        flex: 0.1,
        renderCell: ({ row }: GridRenderCellParams) => (
          <LinkInternal href={InternalRoutes.translationResource(row.id)}>
            {row.name}
          </LinkInternal>
        )
      },
      {
        headerName: t('Status'),
        field: 'status',
        disableColumnFilter: true,
        disableColumnMenu: true,
        sortable: false,
        flex: 0.1
      },
      {
        headerName: t('Number of instance'),
        field: 'nbInstances',
        disableColumnFilter: true,
        disableColumnMenu: true,
        sortable: false,
        flex: 0.1
      }
    ],
    [t]
  );
}
