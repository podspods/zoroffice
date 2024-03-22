import { useTranslation } from 'react-i18next';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { SxProps } from '@mui/material';
export type selectBoxProps = {
  defaultValue?: string;
  value?: string;
  name?: string;
  placeholder?: string;
  itemList: string[];
  onChange: (event: SelectChangeEvent<string>) => void;
  sx?: SxProps;
};

export default function SelectBox({ ...props }: selectBoxProps) {
  const { t } = useTranslation();
  props.defaultValue = props.defaultValue
    ? props.defaultValue
    : props.itemList[0];
  return (
    <>
      {props.name && <InputLabel id={props.name}>{t(props.name)}</InputLabel>}
      <Select
        labelId={props.name}
        sx={props.sx}
        id={props.name}
        onChange={props.onChange}
        defaultValue={props.defaultValue}
        value={props.value}
        MenuProps={{
          style: {
            maxHeight: 400,
            minWidth: 1,
            border: 'none'
          }
        }}
      >
        {props.placeholder && (
          <MenuItem key={props.placeholder} value='' disabled>
            {t(props.placeholder)}
          </MenuItem>
        )}
        {props.itemList.map((item) => {
          return (
            <MenuItem key={item} value={item}>
              {t(item)}
            </MenuItem>
          );
        })}
      </Select>
    </>
  );
}
