import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import {useContext} from 'react';
import {useTranslation} from 'react-i18next';
import {CheckboxKeys, TranslationResourcesContext} from '../context/TranslationResourcesContext';
import {GridStyled} from './TranslationResourcesElement';

export default function TranslationResourcesHeader() {
  const {t} = useTranslation();
  const {
    data: {filteringData},
    setData: setContextData
  } = useContext(TranslationResourcesContext);

  return (
    <GridStyled container justifyContent='center'>
      <FormGroup style={{width: 'fit-content'}}>
        {Object.keys(filteringData.checkbox).map((checkBoxItem) => {
          return (
            <FormControlLabel
              key={checkBoxItem}
              style={{width: 'fit-content'}}
              control={
                <Checkbox
                  id={checkBoxItem}
                  checked={filteringData.checkbox[checkBoxItem as CheckboxKeys].checked}
                  onChange={(event) => {
                    setContextData((prev) => {
                      const newCheckBoxList = {...prev};
                      newCheckBoxList.filteringData.checkbox[checkBoxItem as CheckboxKeys].checked = event.target.checked;
                      return newCheckBoxList;
                    });
                  }}
                />
              }
              label={t(filteringData.checkbox[checkBoxItem as CheckboxKeys].label)}
            />
          );
        })}
      </FormGroup>
    </GridStyled>
  );
}
