import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import Grid from '@mui/material/Grid';
import AppAutocomplete from '@systran/react-components/lib/atoms/AppAutocomplete';
import {useContext} from 'react';
import {useTranslation} from 'react-i18next';
import useSWR from 'swr';
import Apis from 'utils/apis';
import {CheckboxKeys, TranslationResourcesContext} from '../context/TranslationResourcesContext';
import {GridStyled} from './TranslationResourcesElement';

export default function TranslationResourcesHeader() {
  const {t} = useTranslation();
  const {data: computingNodesLight = []} = useSWR(Apis.translationResources.getComputingNodesLight);
  const {
    data: {filteringData},
    setData: setContextData
  } = useContext(TranslationResourcesContext);

  return (
    <GridStyled container>
      <Grid item xs={12} md={9} display='flex' justifyContent='center'>
        <FormGroup>
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
      </Grid>
      <Grid item xs={12} md={3}>
        <AppAutocomplete
          placeholder={t('Computing node')}
          value={filteringData.autocomplete.computingNode?.value}
          options={computingNodesLight?.map((node: {_id: string; hostname: string}) => ({value: node._id, label: node.hostname}))}
          onChange={(selectedItem) =>
            setContextData((prev) => {
              const newCheckBoxList = {...prev};
              newCheckBoxList.filteringData.autocomplete.computingNode = selectedItem as {label: string; value: string};
              return newCheckBoxList;
            })
          }
        />
      </Grid>
    </GridStyled>
  );
}
