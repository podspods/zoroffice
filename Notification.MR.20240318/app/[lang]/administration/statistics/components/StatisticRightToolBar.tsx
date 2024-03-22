import ExportCsvButton from '@systran/react-components/lib/atoms/ButtonsSpecial/ExportCsvButton';
import TextField from '@systran/react-components/lib/atoms/TextField';
import { RightToolbarContainer } from '@systran/react-components/lib/organisms/RowAction/RowActionToolbar';
import { useTranslation } from 'react-i18next';

export type StatisticRightToolBarProps = {
  totalChar: number;
  totalUsers?: number;
};
export default function StatisticRightToolBar({
  ...props
}: StatisticRightToolBarProps) {
  const { t } = useTranslation();
  const readOnly = {
    readOnly: true
  };
  return (
    <RightToolbarContainer>
      <TextField
        label={t('Total Characters')}
        value={props.totalChar}
        InputProps={readOnly}
        sx={{ minWidth: '6rem' }}
      />
      {(props.totalUsers !== undefined) && (
        <TextField
          label={t('Total Users')}
          value={props.totalUsers}
          InputProps={readOnly}
          sx={{ minWidth: '6rem' }}
        />
      )}
      <ExportCsvButton />
    </RightToolbarContainer>
  );
}
