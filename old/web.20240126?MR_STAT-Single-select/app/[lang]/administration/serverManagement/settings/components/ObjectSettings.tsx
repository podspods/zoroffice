import React, {useState, useEffect} from 'react';
import Collapse from '@mui/material/Collapse';
import Box from '@mui/material/Box';
import ListTitle from '@systran/react-components/lib/atoms/ListTitle';
import CaretIcon from '@systran/react-components/lib/atoms/Icons/CaretIcon';
import CreatableSettings, {toReactSelect} from './CreatableSettings';
import {Settings, Template} from './SettingsWrapper';

export type ObjectSettingType = {
  settingValues: Settings
  template: Template
  attribute: string
  search: string
  onSettingsChange: ({attribute, values}: {attribute: string, values: Settings}) => void
  onError: (error: any) => void
  isChild?: boolean,
  title?: string
  readOnly?: boolean
  description?: string
}

export function fromReactSelect(data: string | { value?: any; inputValue?: any}) {
  return typeof data === 'string' ? data : (data?.value || data?.inputValue);
}

export default function ObjectSettings({template, settingValues, attribute, search, onSettingsChange, onError, isChild = false, title = '', readOnly = false}: ObjectSettingType) {
  const [childNb, setChildNb] = useState<number>(0);
  const [expanded, setExpanded] = useState(false);

  const getFilteredTemplate = () => {
    if (template && Object.keys(template).length > 0) {
      return Object.keys(template).filter((e) => !e.startsWith('_'));
    }
    return [];
  };

  const fullTemplate = getFilteredTemplate();

  const _initChildNb = () => {
    if (isNaN(childNb) && template !== undefined) {
      const ChildNbLength = fullTemplate.filter((e) => {
        return template[e]._type === 'object';
      }).length;
      setChildNb(ChildNbLength);
    }
  };

  const onSearch = (search: string) => {
    return (e: string) => {
      if (search.length < 3) {
        return false;
      }
      const _searchBy = (value: string) => {
        return value && value.toLowerCase().includes(search.toLowerCase());
      };
      const {_label, _description} = template[e];
      return _searchBy(_label) || _searchBy(e) || _searchBy(title) || _searchBy(attribute) || _searchBy(_description);
    };
  };

  useEffect(() => {
    _initChildNb();
    if (getFilteredTemplate()?.some(onSearch(search))) {
      setExpanded(true);
    }
    else {
      setExpanded(false);
    }
  }, [search]);

  const _onChange = (newValues: Settings) => {
    onSettingsChange({attribute, values: newValues});
  };

  const _cast = (attribute: string, data: any) => {
    let child = template[attribute];
    child = Object.assign({}, child);
    const childValue = settingValues[attribute];
    if (!child._type) {
      if (Array.isArray(childValue)) {
        child._type = 'array';
      }
    }

    let castedValue;

    switch ((child._type || typeof childValue)) {
      case 'array':
        return (data || []).map(fromReactSelect);
      case 'boolean':
        return data && data.value === 'true';
      case 'number':
        if ((data === undefined || data === null) && !child._required) {
          return undefined;
        }
        castedValue = !data ? undefined : parseFloat(data.inputValue || data.value);
        if (Number.isNaN(castedValue)) {
          return 0;
        }
        return castedValue;
      case 'string':
        return data ? (data.value || data.inputValue) : '';
      default:
        return childValue;
    }
  };

  const handleObjectChange = ({attribute, values}: {attribute: string, values: any}) => {
    const newValues = {...settingValues};
    newValues[attribute] = values;
    _onChange(newValues);
  };

  const handleSelectChange = (key: string) => {
    return (event: React.ChangeEvent<HTMLInputElement>, data: any) => {
      const newValues = {...settingValues};
      try {
        newValues[key] = _cast(key, data);
      }
      catch (error) {
        console.error('handleSelectChange', error); // eslint-disable-line no-console
        onError(error);
        newValues[key] = data && data.value || '';
      }
      _onChange(newValues);
    };
  };

  const factory = (e: string, key: number) => {
    const creatableSettingsProps: any = {};

    let child = template[e];
    child = Object.assign({}, child);
    let childValue = settingValues[e];

    if (child._hidden) {
      return null;
    }

    if (!child._type) {
      if (Array.isArray(childValue)) {
        child._type = 'array';
      }
    }

    switch (child._type || typeof childValue) {
      case 'object':
        return (
          <ObjectSettings
            key={key}
            isChild
            search={search}
            attribute={e}
            title={child._label || e}
            description={child._description}
            template={{...child}}
            settingValues={{...childValue}}
            readOnly={readOnly || child._readOnly}
            onSettingsChange={handleObjectChange}
            onError={onError}
          />
        );
      case 'array':
        creatableSettingsProps.options = {multiple: true, disableClearable: true, size: 'small'};
        break;
      case 'boolean':
        if (childValue === true || childValue === 'true') {
          childValue = toReactSelect('true', 'enabled');
        }
        else {
          childValue = toReactSelect('false', 'disabled');
        }

        if (!child._enum) {
          child._enum = [toReactSelect('true', 'enabled'), toReactSelect('false', 'disabled')];
        }
        creatableSettingsProps.options = {disableClearable: true, isValidNewOption: () => false};
        break;
      case 'number':
        if (!isNaN(childValue)) {
          childValue = Number(childValue).toString();
        }
        if (Array.isArray(child._enum)) {
          child._enum = child._enum.map((value: any) => typeof value === 'number' ? value.toString() : value);
        }
        break;
      case 'string':
        break;
      default:
        break;
    }
    return (
      <CreatableSettings
        key={key}
        name={e}
        child={child}
        childValue={childValue}
        onChange={handleSelectChange(e)}
        readOnly={readOnly}
        {...creatableSettingsProps}
      />
    );
  };

  const onClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Box mb='4px'>
      {isChild &&
      <ListTitle
        title={title}
        icon={<CaretIcon direction={expanded ? 'down' : 'right'} />}
        onClick={onClick}
      />}
      <Collapse in={!isChild || expanded} sx={{pl: '8.33333333%'}}>
        {(fullTemplate || []).map(factory)}
      </Collapse>
    </Box>
  );
}
