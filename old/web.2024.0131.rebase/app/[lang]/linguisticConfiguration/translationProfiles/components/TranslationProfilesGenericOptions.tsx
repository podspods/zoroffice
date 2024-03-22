import {ChangeEvent, useState} from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import {SecondaryButton} from '@systran/react-components/lib/atoms/Buttons/Secondary';
import TextField from '@systran/react-components/lib/atoms/TextField';
import CancelIcon from '@systran/react-components/lib/atoms/Icons/CancelIcon';
import PlusIcon from '@systran/react-components/lib/atoms/Icons/PlusIcon';
import {useTranslation} from 'react-i18next';
import lodashGet from 'lodash/get';
import uniqueId from 'lodash/uniqueId';
import update from 'immutability-helper';

type GenericItem = {id: string; name: string; value?: string};
type Props = {
  id: string;
  disabled: boolean;
  list?: Array<GenericItem>;
  maxOptions?: number;
  onChange: (e: any) => void;
};

function addId(array: Array<GenericItem>) {
  return array.map((option: GenericItem) => {
    option.id = uniqueId();
    return option;
  });
}

function buildInitialList(props: Props): GenericItem[] {
  return props.list || [{name: '', value: '', id: uniqueId()}];
}

export default function TranslationProfilesGenericOptions(props: Props) {
  const {t} = useTranslation();
  const [list, setList] = useState(addId(buildInitialList(props)));

  const getOptions = (newList: Array<GenericItem>) => {
    return newList.map(function(item: GenericItem) {
      return {name: item.name, value: item.value};
    });
  };

  const addOption = () => {
    const newList = update([...list], {$push: [{name: '', value: '', id: uniqueId()}]});
    setList(newList);
    props.onChange({genericOptions: getOptions(newList)});
  };

  const deleteOption = (id: string) => () => {
    const newList = list.filter((item: {id: string}) => {
      return item.id !== id;
    });
    setList(newList);
    props.onChange({genericOptions: getOptions(newList)});
  };

  const onInputChange = (id: string, event: {name: string; value: string}) => {
    const newList = list.map((item: GenericItem) => {
      if (item.id === id) {
        const key = event.name === 'keyName' ? 'name' : 'value';
        item[key] = event.value;
      }
      return item;
    });
    setList(newList);
    props.onChange({genericOptions: getOptions(newList)});
  };

  const onTextInputChangeWrapper = (optionId: string) => (event: ChangeEvent<HTMLInputElement>) => {
    const newEvent = {
      name: event.target.name,
      value: event.target.value
    };
    onInputChange(optionId, newEvent);
  };

  const buildKeyFormInput = (option: GenericItem) => {
    return (
      <TextField
        style={{width: '100%'}}
        placeholder={t('key')}
        aria-label={t('key')}
        name='keyName'
        onChange={onTextInputChangeWrapper(option.id)}
        value={option.name}
        key={option.id}
        disabled={props.disabled}
      />
    );
  };

  const buildValueFormInput = (option: GenericItem) => {
    return (
      <TextField
        style={{width: '100%'}}
        placeholder={t('value')}
        aria-label={t('value')}
        name='valueName'
        onChange={onTextInputChangeWrapper(option.id)}
        value={option.value}
        key={option.id}
        disabled={props.disabled}
      />
    );
  };

  const genericOption = (option: GenericItem) => {
    return (
      <Grid container spacing={2} mt={0} className='profileOption' key={option.id}>
        <Grid item md={4} xs={12}>
          {buildKeyFormInput(option)}
        </Grid>
        <Grid item md={4} xs={12}>
          {buildValueFormInput(option)}
        </Grid>
        <Grid item md={4} xs={12}>
          <SecondaryButton startIcon={<CancelIcon />} onClick={deleteOption(option.id)} key={option.id} disabled={props.disabled} style={{height: '34px', color: '#333'}}>
            {t(lodashGet(props, 'text.removeOptionButton') || 'Delete Option')}
          </SecondaryButton>
        </Grid>
      </Grid>
    );
  };

  return (
    <Box id={'genericOptions' + props.id}>
      {list.map(genericOption)}
      {(!props.maxOptions || list.length < props.maxOptions) && (
        <Box>
          <SecondaryButton startIcon={<PlusIcon />} style={{height: 'auto', color: '#333', marginTop: '16px'}} onClick={addOption} disabled={props.disabled}>
            {t(lodashGet(props, 'text.addOptionButton') || 'Add another Option')}
          </SecondaryButton>
        </Box>
      )}
    </Box>
  );
}
