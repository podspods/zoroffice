import { USER_NAME } from './statisticsConstant';
import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import TextField from '@systran/react-components/lib/atoms/TextField';
import SelectBox from '@/components/SelectBox';

export type storytestProps = {};
export default function storytest({ ...props }: storytestProps) {
  const [age, setAge] = React.useState('');
  const [toto, setToto] = React.useState('');

  const handleChange = (event: SelectChangeEvent) => {
    setAge(event.target.value);
  };

  const handleOnchange = (event: SelectChangeEvent) => {
    console.log('handleOnchange ==>', event);
    setToto(event.target.value);
  };

  return (
    <>
      <p>storytest</p>
      <p>{USER_NAME}</p>
      <Box sx={{ minWidth: 120, border: 'none', display: 'flex' }}>
        <FormControl fullWidth>
          <InputLabel id='demo-simple-select-label'>AgeInputLable</InputLabel>
          <Select
            labelId='demo-simple-select-label'
            placeholder='place-holder'
          
            id='demo-simple-select'
            value={age}
            label='AgeLabel'
            onChange={handleChange}
            MenuProps={{
              style: {
                paddingTop: 9,
                paddingBottom: 8,
                maxHeight: 400,
                minWidth: 1,
                border: 'none'
              }
            }}
            
            sx={{ paddingTop: '9px', paddingBottom: '8px', maxHeight: 40 }}
          >
            <MenuItem value={10}>Ten</MenuItem>
            <MenuItem value={20}>Twenty</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem>
          </Select>
        </FormControl>
        <TextField
          id='outlined-read-only-input'
          label={'textField label'}
          value={100}
          InputProps={{
            readOnly: true,
            style: {
              padding: '9px 0 8px 0'
            }
          }}
          style={{ width: 200 }}
        />
        <SelectBox
          label={'select box label'}
          value={toto}
          name={'titiiti'}
          // placeholder={'User'}
          itemList={['un', 'deux', 'trois']}
          // onChange={(event) => props.onChangeAccount(event.target.value)}
          onChange={handleOnchange}
          // sx?: SxProps;
        />
      </Box>
    </>
  );
}
