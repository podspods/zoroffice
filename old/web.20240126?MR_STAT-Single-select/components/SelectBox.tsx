import { useTranslation } from 'react-i18next';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { FormControl, SxProps } from '@mui/material';
export type selectBoxProps = {
  label?: string;
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

  const idSelect = props.label
    ? props.label.trim().replace(/\s/g, '_')
    : 'no-id';
  const idLabelSelect = `idLabelSelect_${idSelect}`;

  return (
    <>
      <FormControl >
        {props.label && (
          <InputLabel id={idLabelSelect}>{t(props.label)}</InputLabel>
        )}
        <Select
          labelId={idLabelSelect}
          sx={props.sx ? props.sx : undefined}
          id={idSelect}
          name={props.name}
          onChange={props.onChange}
          defaultValue={props.defaultValue}
          value={props.value}
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
      </FormControl>
    </>
  );
}
