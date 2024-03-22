import { styled, Theme } from '@mui/system';
import { GridToolbarExport } from '@mui/x-data-grid-pro';
import DownloadIcon from '@systran/react-components/lib/atoms/Icons/DownloadIcon';

const StyledGridToolbarExport = styled(GridToolbarExport)<{ theme?: Theme }>`
  && {
    color: ${({ theme }) => theme.palette.offGrey.light};
    background-color: ${({ theme }) => theme.palette.primary.main};
    margin-inline: 0.1rem;

    &:hover {
      background-color: ${({ theme }) => theme.palette.primary.dark};
    }
    &:active {
      background-color: ${({ theme }) => theme.palette.primary.main};
      color: ${({ theme }) => theme.palette.offGrey.light};
    }
    .MuiTouchRipple-child {
      background-color: ${({ theme }) => theme.palette.primary.main};
    }
  }
`;

export default function ExportCsvButton() {
  return (
    <StyledGridToolbarExport
      startIcon={false}
      // endIcon={<BellIcon />}
      endIcon={<DownloadIcon type={'upload'} />}
      printOptions={{ disableToolbarButton: true }}
      csvOptions={{ allColumns: true }}
    />
  );
}
