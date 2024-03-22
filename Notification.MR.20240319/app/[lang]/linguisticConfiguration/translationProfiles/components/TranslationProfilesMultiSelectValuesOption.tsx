import {useEffect, useState} from 'react';
import Grid from '@mui/material/Grid';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import Paper from '@mui/material/Paper';
import differenceBy from 'lodash/differenceBy';
import ChevronIcon from '@systran/react-components/lib/atoms/Icons/ChevronIcon';
import {SecondaryButton} from '@systran/react-components/lib/atoms/Buttons/Secondary';

type OptionsListItem = {
  name: string;
  id: string;
  value: string;
  dictName: string;
  label: string;
  checked: boolean;
};
export type OptionsList = Array<OptionsListItem>;

type Props = {
  checkedList: OptionsList;
  list: OptionsList;
  type: string;
  mainOption: any; // TODO: recheck the type
  onChange: (event: any) => void;
  disabled: boolean;
  id: string;
};

function formatDualList(list: OptionsList, checkedList: OptionsList) {
  return differenceBy(list, checkedList, 'id');
}
function formatCheckedList(list: OptionsList = [], checkedList: OptionsList = []) {
  return (
    checkedList.map((item) => {
      return list.find((itm) => itm.id === item.id) || {};
    }) || []
  );
}

export default function TranslationProfilesMultiSelectValuesOption({checkedList: checkedListProp = [], ...props}: Props) {
  const [checked, setChecked] = useState<string[]>([]);
  const [list, setList] = useState<OptionsList>(formatDualList(props.list, checkedListProp));
  const [checkedList, setCheckedList] = useState<OptionsList>(checkedListProp);

  useEffect(() => {
    setList(formatDualList(props.list, checkedListProp));
  }, [props.list]);

  useEffect(() => {
    const newCheckedList = [...checkedList];
    if (props.mainOption) {
      if (newCheckedList.includes(props.mainOption)) {
        const mainOptionIndex = newCheckedList.indexOf(props.mainOption);
        if (mainOptionIndex !== newCheckedList.length - 1) {
          newCheckedList.splice(mainOptionIndex, 1);
          newCheckedList.push(props.mainOption);
        }
      }
      else {
        newCheckedList.push(props.mainOption);
      }
    }
    props.onChange({[props.type]: newCheckedList});
  }, [checkedList]);

  const handleToggle = (value: string) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    }
    else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  const handleAllRight = () => {
    setCheckedList([...checkedList, ...list]);
    setList([]);
    setChecked([]);
  };

  const handleCheckedRight = () => {
    setCheckedList([...checkedList, ...leftChecked.map((id) => list.find((item) => item.id === id))] as OptionsList);
    setList(list.filter((item) => !leftChecked.includes(item.id)));
    setChecked([]);
  };

  const handleCheckedLeft = () => {
    setList([...list, ...rightChecked.map((id) => checkedList.find((item) => item.id === id))] as OptionsList);
    setCheckedList(checkedList.filter((item) => !rightChecked.includes(item.id)));
    setChecked([]);
  };

  const handleAllLeft = () => {
    setList([...list, ...checkedList]);
    setCheckedList([]);
    setChecked([]);
  };

  const leftChecked = checked.filter((value) => list.map((item) => item.id).includes(value));
  const rightChecked = checked.filter((value) => checkedList.map((item) => item.id).includes(value));
  const checkedListConvert = formatCheckedList(props.list, checkedList) as OptionsList;

  return (
    <Grid container spacing={2} justifyContent='center' alignItems='center'>
      <Grid item flex={1} alignSelf={'stretch'}>
        {customList(list, handleToggle, leftChecked)}
      </Grid>
      <Grid item>
        <Grid container direction='column' alignItems='center'>
          <SecondaryButton onClick={handleAllRight} disabled={list.length === 0} aria-label='move all checkedList'>
            <ChevronIcon direction='right' />
            <ChevronIcon direction='right' />
          </SecondaryButton>
          <SecondaryButton onClick={handleCheckedRight} disabled={leftChecked.length === 0} aria-label='move selected checkedList'>
            <ChevronIcon direction='right' />
          </SecondaryButton>
          <SecondaryButton onClick={handleCheckedLeft} disabled={rightChecked.length === 0} aria-label='move selected list'>
            <ChevronIcon direction='left' />
          </SecondaryButton>
          <SecondaryButton onClick={handleAllLeft} disabled={checkedList.length === 0} aria-label='move all list'>
            <ChevronIcon direction='left' />
            <ChevronIcon direction='left' />
          </SecondaryButton>
        </Grid>
      </Grid>
      <Grid item flex={1} alignSelf={'stretch'}>
        {customList(checkedListConvert, handleToggle, rightChecked)}
      </Grid>
    </Grid>
  );
}

const customList = (items: OptionsList, handleToggle: (value: string) => () => void, checked: readonly string[]) => (
  <Paper style={{display: 'flex', flexDirection: 'column', height: '100%'}}>
    <List dense component='div' role='list'>
      {items.map((item) => {
        const labelId = `transfer-list-item-${item.id}-label`;

        return (
          <ListItem key={item.id} role='listitem' onClick={handleToggle(item.id)}>
            <ListItemIcon>
              <Checkbox
                checked={checked.indexOf(item.id) !== -1}
                tabIndex={-1}
                disableRipple
                inputProps={{
                  'aria-labelledby': labelId
                }}
              />
            </ListItemIcon>
            <ListItemText id={labelId} primary={item.name || item.dictName} />
          </ListItem>
        );
      })}
    </List>
  </Paper>
);
