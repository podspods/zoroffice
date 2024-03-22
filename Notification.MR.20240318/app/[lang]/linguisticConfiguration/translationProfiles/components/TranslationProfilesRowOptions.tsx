import CollapseItem from '@systran/react-components/lib/atoms/CollapseItem';
import Switch from '@systran/react-components/lib/atoms/ButtonsSpecial/Switch';
import {Box, Checkbox, FormControlLabel, Grid, Typography} from '@mui/material';
import {LinkInternal} from '@systran/react-components/lib/atoms/Link';
import {SecondaryButton} from '@systran/react-components/lib/atoms/Buttons/Secondary';
import PlusIcon from '@systran/react-components/lib/atoms/Icons/PlusIcon';
import {useTranslation} from 'react-i18next';
import AppAutoComplete from '@systran/react-components/lib/atoms/AppAutocomplete';
import TextField from '@systran/react-components/lib/atoms/TextField';
import TranslationProfilesNFAOptions from './TranslationProfilesNFAOptions';
import {ChangeEvent, useEffect, useState} from 'react';
import TranslationProfilesMultiSelectValuesOption, {OptionsList} from './TranslationProfilesMultiSelectValuesOption';
import {ResourcesOptionsListsType, ResourcesOptionsRowsResultsKey} from './TranslationProfilesAdvancedOptions';
import {ProfileOnChangeOptionsType} from '../context/TranslationProfilesAddContext';

export type TemplateRows = {
  type?: string;
  hasSwitch?: boolean;
  name: string;
  enabled?: boolean;
  values?: Array<any>;
  defaultValue?: string;
  value?: any;
  showNFAToogle?: boolean;
  mainOption?: unknown;
  label?: string;
};
type Props = {
  type: string;
  title: string;
  id: string;
  resourceType: string;
  canCreateResource: boolean;
  disabled: boolean;
  formatResourceId: (id: string) => string;
  templateRows: Array<TemplateRows>;
  dataRows?: ResourcesOptionsListsType;
  onChange: (value: ProfileOnChangeOptionsType) => void;
  connectedUserId: string;
  profileName?: string;
  source: string;
  target: string | string[];
  link: string;
  key: string;
  enabledNFA?: boolean;
  onProfileOptionsChange: (value: any) => void;
};

const initRowsData = (templateRows: Array<TemplateRows>, dataRows: ResourcesOptionsListsType) => {
  return templateRows.map((row: TemplateRows) => {
    const newRow = {...row};
    const rowValue = dataRows[newRow?.name as ResourcesOptionsRowsResultsKey];
    if (rowValue !== undefined) {
      newRow.value = rowValue;
      newRow.enabled = true;
    }
    else {
      newRow.enabled = !row.hasSwitch;
      newRow.value = newRow.defaultValue || newRow.values?.[0]?.value;
    }
    return newRow;
  });
};

export default function TranslationProfilesRowOptions(props: Props) {
  const {t} = useTranslation();

  const templateRows: Array<TemplateRows> = props.templateRows || [];
  const dataRows: ResourcesOptionsListsType = props.dataRows || {};
  const [rows, setRows] = useState(initRowsData(templateRows, dataRows));

  useEffect(() => {
    setRows(initRowsData(templateRows, dataRows));
  }, [props.templateRows, props.dataRows]);

  const onToogleNFA = (value: boolean) => {
    props.onProfileOptionsChange({enabledNFA: value});
  };

  const getOptions = (newRows: TemplateRows[]) => {
    const options: {[key: string]: boolean | string | null} = {};
    newRows
      .filter((row: TemplateRows) => row.enabled)
      .forEach((row: TemplateRows) => {
        if (row.type === 'checkbox' && !row.value) {
          options[row.name] = false;
        }
        else {
          options[row.name] = row.value || null;
        }
      });
    return options;
  };

  const onChange = (name: string, newRow: any) => {
    const newRows = rows.map((row: {name: string}) => {
      if (row.name === name) {
        return {...row, ...newRow};
      }
      return row;
    });
    setRows(newRows);
    props.onChange({[props.type]: getOptions(newRows)});
  };

  const onSwitchChange = (name: string) => (switchValue: boolean) => {
    onChange(name, {enabled: switchValue});
  };

  const onAutocompleteChange = (name: string) => (e?: {value: string}) => {
    onChange(name, {value: e?.value ?? ''});
  };

  const onMultiValuesOptionChange = (optionValues: {[key: string]: any}) => {
    const keys = Object.keys(optionValues);
    if (keys.length === 0) {
      return;
    }
    onChange(keys[0], {value: optionValues[keys[0]]});
  };

  const onInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    onChange(name, {value: value});
  };

  const renderRow = ({type, label = '', name, value, values, enabled = false, hasSwitch, mainOption, showNFAToogle}: TemplateRows, index: number) => {
    if (type === 'select' && !values) {
      return null;
    }
    if (type === 'multiValuesOption') {
      return (
        <Box key={index}>
          <Grid container>
            {/* 32px is 50% width and 16px is padding */}
            <Grid item display='inline-flex' alignItems='center' width={'calc(50% + 32px + 16px)'}>
              {Boolean(showNFAToogle) && <TranslationProfilesNFAOptions data={props.enabledNFA} onChange={onToogleNFA} />}
            </Grid>
            {props.canCreateResource && (
              <Grid mb={1} item>
                <LinkInternal href={props.link}>
                  <SecondaryButton
                    startIcon={<PlusIcon />}
                    title={t(`Create ${props.type}`)}
                    disabled={props.disabled}
                  >
                    <Box component='span'>{t('Create')}</Box>
                  </SecondaryButton>
                </LinkInternal>
              </Grid>
            )}
          </Grid>
          <TranslationProfilesMultiSelectValuesOption
            id={`${type}_${index}`}
            type={name}
            mainOption={mainOption}
            list={values as OptionsList}
            checkedList={value as OptionsList}
            onChange={onMultiValuesOptionChange}
            disabled={props.disabled}
          />
          {hasSwitch && <Switch style={{marginLeft: '10px', marginRight: '10px'}} onChange={onSwitchChange(name)} value={enabled} />}
        </Box>
      );
    }

    return (
      <Grid container alignItems='center' className='form-group' key={index} mb='4px'>
        {type !== 'checkbox' && (
          <Grid item md={4}>
            <Typography component='label' fontSize='13px' fontWeight='bold' id={`${props.type}_${props.id}_label${index}`}>
              {t(label)}
            </Typography>
          </Grid>
        )}
        <Grid item md={type === 'checkbox' ? 8 : 4}>
          {type === 'select' && Array.isArray(values) && (
            <AppAutoComplete disabled={!enabled} aria-labelledby={`${props.type}_${props.id}_label${index}`} value={value || ''} options={values} onChange={onAutocompleteChange(name)} />
          )}
          {type === 'text' && (
            <TextField
              InputProps={{readOnly: !enabled}}
              fullWidth
              disabled={!enabled}
              aria-labelledby={`${props.type}_${props.id}_label${index}`}
              name={name}
              value={value || ''}
              onChange={onInputChange}
            />
          )}
          {type === 'checkbox' && <FormControlLabel control={<Checkbox name={name} disabled={!enabled} checked={Boolean(value)} onChange={onInputChange} />} label={t(label)} />}
        </Grid>
        {hasSwitch && (
          <Grid item md={type === 'checkbox' ? 2 : 4}>
            <Switch style={{marginLeft: '10px', marginRight: '10px'}} onChange={onSwitchChange(name)} value={enabled} />
          </Grid>
        )}
      </Grid>
    );
  };

  const renderedRows = rows.map(renderRow);

  return <CollapseItem title={props.title}>{renderedRows}</CollapseItem>;
}
