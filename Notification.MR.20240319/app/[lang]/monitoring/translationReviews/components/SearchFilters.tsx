import { FormControlLabel, Box, Checkbox, Grid} from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useTranslation } from 'react-i18next';
import {Dispatch, SetStateAction} from 'react';

export type SearchFiltersProps = {
  startDate: ((prevState: null) => null) | null | undefined,
  endDate: ((prevState: null) => null) | null | undefined,
  addToUD: boolean,
  addToTM: boolean,
  handleStartDateChange: Dispatch<SetStateAction<null>>;
  handleEndDateChange: Dispatch<SetStateAction<null>>;
  handleAddToUDChange: (value: boolean) => void;
  handleAddToTMChange: (value: boolean) => void;
}

export default function SearchFilters({startDate, endDate, addToUD, addToTM, handleStartDateChange, handleEndDateChange, handleAddToUDChange, handleAddToTMChange}: SearchFiltersProps) {
  const {t} = useTranslation();

  return (
    <Grid container md={12} sx={{width: '100%'}}>
      <Grid md={4} />
      <Grid md={3}>
        <Box sx={{marginBottom: '10px'}}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              sx={{width: '400px'}}
              label={t('Start date')}
              slotProps={{textField: {size: 'small'}}}
              value={startDate}
              onChange={handleStartDateChange}
            />
          </LocalizationProvider>
        </Box>
        <Box>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              sx={{width: '400px'}}
              label={t('End date')}
              slotProps={{textField: {size: 'small'}}}
              value={endDate}
              onChange={handleEndDateChange}
            />
          </LocalizationProvider>
        </Box>
      </Grid>
      <Grid md={4}>
        <Box>
          <FormControlLabel
            label={t('Show only "Added to TM"')}
            control={<Checkbox value={addToTM} onChange={(e) => handleAddToTMChange(e.target.checked)} />}
          />
        </Box>
        <Box>
          <FormControlLabel
            label={t('Show only "Added to UD"')}
            control={<Checkbox value={addToUD} onChange={(e) => handleAddToUDChange(e.target.checked)} />}
          />
        </Box>
      </Grid>
    </Grid>
  );
}
