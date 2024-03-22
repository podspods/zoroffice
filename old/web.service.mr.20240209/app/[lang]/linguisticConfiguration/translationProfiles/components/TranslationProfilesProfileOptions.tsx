import {ChangeEvent, ReactNode, useRef, useState} from 'react';
import {Alert, Box, FormGroup, Grid, Typography} from '@mui/material';
import Form from '@rjsf/mui';
import validator from '@rjsf/validator-ajv8';
import {useTranslation} from 'react-i18next';
import TextField from '@systran/react-components/lib/atoms/TextField';
import CopyIcon from '@systran/react-components/lib/atoms/Icons/CopyIcon';
import uniqueId from 'lodash/uniqueId';
import CollapseItem from '@systran/react-components/lib/atoms/CollapseItem';
import PropertyLine from '@systran/react-components/lib/atoms/PropertyLine';
import {styled} from '@mui/material/styles';

import useGetDictionaries from '../hooks/useGetDictionaries';
import useGetTranslationMemories from '../hooks/useGetTranslationMemories';
import TranslationProfilesPivot from './TranslationProfilesPivot';
import TranslationProfilesEngineList from './TranslationProfilesEngineList';
import TranslationProfilesSelectors from './TranslationProfilesSelectors';
import {FilterOptions, LinguisticOptions, ResourcesOptions} from './TranslationProfilesAdvancedOptions';
import TranslationProfilesGenericOptions from './TranslationProfilesGenericOptions';
import TranslationProfileCacheOptions from './TranslationProfileCacheOptions';
import {Dictionaries, Normalizations, OptionsType, ProfileOnChangeOptionsType, SupportedFeature, TranslationMemories} from '../context/TranslationProfilesAddContext';
import CopyToClipboardButton from './ClipboardButton';

type Props = {
  data: OptionsType;
  profileId?: string;
  disabled?: boolean;
  onChange: (value: ProfileOnChangeOptionsType) => void;
  disableEngineList?: boolean;
};

const InputLabel = (props: {children: ReactNode; id?: string}) => {
  return (
    <Typography variant='body1' component='label' fontWeight='bold' id={props.id}>
      {props.children}
    </Typography>
  );
};

type SelectorsType = {profileData: OptionsType; onInputChange: (event: ChangeEvent<HTMLInputElement>) => void; disabled?: boolean};

const Selectors = ({profileData, onInputChange, disabled}: SelectorsType) => {
  const {t} = useTranslation();
  const [domain, setDomain] = useState(profileData.selectors?.domain || '');
  const selectors = profileData.selectors;
  if (selectors) {
    delete selectors.domain;
  }

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    setDomain(event.target.value);
    onInputChange(event);
  };
  return (
    <TranslationProfilesSelectors selectors={profileData.selectors}>
      <PropertyLine label={t('Domain')}>
        <TextField placeholder={t('Domain')} aria-label={t('Domain')} name='domain' value={domain} onChange={onChange} disabled={disabled} />
      </PropertyLine>
    </TranslationProfilesSelectors>
  );
};

export default function TranslationProfilesProfileOptions({data: profileData, disabled, disableEngineList, profileId, onChange}: Props) {
  const {t} = useTranslation();
  const {data: dictionaries} = useGetDictionaries({source: profileData.source, target: profileData.target});
  const {data: translationMemories} = useGetTranslationMemories({source: profileData.source, target: profileData.target});
  const id = useRef(uniqueId());

  const isRbmtEngine = profileData.engineSelected !== 'v7' && profileData.engineSelected?.type === 'rbmt';

  const isNmtEngine = profileData.engineSelected !== 'v7' && profileData.engineSelected?.type === 'nmt';

  const isModelSchema = Boolean(profileData.engineSelected !== 'v7' && profileData.engineSelected?.modelOptions?.json_schema);

  const isSupportedFeature = (type: string) => {
    if (profileData.engineSelected !== 'v7' && profileData.engineSelected?.modelOptions?.supported_features) {
      return profileData.engineSelected?.modelOptions?.supported_features[type as keyof SupportedFeature] || false;
    }
    return true;
  };

  const getJsonSchema = () => {
    return isModelSchema && profileData.engineSelected !== 'v7' ? profileData.engineSelected?.modelOptions?.json_schema : (undefined as any);
  };

  // have to add @rjsf/utils library for importing the types
  const ObjectFieldTemplate = ({properties}: {properties: Array<{content: ReactNode}>}) =>
    properties.map((element) => <ObjectFieldTemplateStyled>{element.content}</ObjectFieldTemplateStyled>);

  const onModelsOptionsChange = (value: any) => {
    onChange({modelOptions: value.formData});
  };

  const onInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name as 'domain' | 'profileName';
    onChange({[name]: value});
  };

  const onOptionsChange = (options: ProfileOnChangeOptionsType) => {
    onChange({...profileData, ...options});
  };

  return (
    <Box>
      {Boolean(profileId) && ( // if there is no id yet, it is a creation form and there is no id to show
        <Grid container spacing={2} className='form-group' alignItems='center' mb='15px'>
          <Grid item md={2} display='flex' justifyContent='flex-end'>
            <InputLabel id='createProfileForm_profileId'>{t('Profile ID')}</InputLabel>
          </Grid>
          <Grid item md={5}>
            <FormGroup row style={{height: '34px'}}>
              <TextField style={{flex: 1}} InputProps={{readOnly: true}} placeholder={t('Profile ID')} aria-labelledby='createProfileForm_profileIdLabel' name='profileId' value={profileId} disabled />
              <CopyToClipboardButton value={profileId} title={t('copy to clipboard')} Icon={<CopyIcon />} />
            </FormGroup>
          </Grid>
        </Grid>
      )}

      <Grid container spacing={2} alignItems='center' mb='15px'>
        <Grid item md={2} display='flex' justifyContent='flex-end'>
          <InputLabel id='createProfileForm_profileNameLabel'>{t('Profile Name')}</InputLabel>
        </Grid>
        <Grid item md={5}>
          <TextField
            placeholder={t('Profile name')}
            aria-labelledby='createProfileForm_profileNameLabel'
            name='profileName'
            value={profileData.profileName}
            onChange={onInputChange}
            disabled={disabled}
          />
        </Grid>
      </Grid>

      <Box style={{marginBottom: '15px'}}>
        {!!profileData.flowProfile && <TranslationProfilesPivot source={profileData.source} target={profileData.target} flowProfile={profileData.flowProfile} />}
        {!profileData.flowProfile && (
          <Grid container spacing={2} alignItems='center'>
            <Grid item md={2} display='flex' justifyContent='flex-end'>
              <InputLabel id='createProfileForm_translationResource'>{t('Translation Resource')}</InputLabel>
            </Grid>
            <Grid item md={5}>
              <TranslationProfilesEngineList
                source={profileData.source}
                target={profileData.target}
                onChange={onOptionsChange}
                disabled={disableEngineList}
                engineSelected={profileData.engineSelected}
              />
            </Grid>
          </Grid>
        )}
      </Box>

      <Alert icon={false} style={{backgroundColor: '#00aeef', color: 'white', fontSize: '14px', marginBottom: '20px', padding: '7px 15px'}}>
        <Typography component='strong' color='white'>
          {t('Options Configuration! ')}
        </Typography>
        {t('Some options below are not active by default, you can activate and modify them by using "Unlock" buttons. Note that, these current values are used as examples but NOT as default value!')}
      </Alert>

      <CollapseItem title={'Profile Selection'}>
        <Selectors profileData={profileData} onInputChange={onInputChange} disabled={disabled} />
      </CollapseItem>
      <CollapseItem title={'Resources'}>
        <ResourcesOptions
          id={id.current}
          onChange={onOptionsChange}
          supportDictionaries={isSupportedFeature('UD')}
          supportNormalization={isSupportedFeature('ND')}
          supportTranslationMemories={isSupportedFeature('TM')}
          dataRow={profileData.resourcesOptions}
          enabledNFA={profileData.enabledNFA}
          lists={{
            dictionaries: dictionaries.dictsList as Dictionaries,
            normalizations: dictionaries.normsList as Normalizations,
            translationMemories: translationMemories.tmList as TranslationMemories
          }}
          source={profileData.source}
          target={profileData.target}
        />
      </CollapseItem>

      {isModelSchema && (
        <CollapseItem title={t('Model Schema')}>
          <Form
            uiSchema={{'ui:ObjectFieldTemplate': ObjectFieldTemplate, 'ui:submitButtonOptions': {norender: true}}} // The uiSchema object for this array field
            onChange={onModelsOptionsChange}
            schema={getJsonSchema()} // The schema object for this array
            formData={profileData.modelOptions}
            validator={validator}
          />
        </CollapseItem>
      )}

      <CollapseItem title={'Filter Options'}>
        <FilterOptions id={id.current} dataRow={profileData.filterOptions} onChange={onOptionsChange} />
      </CollapseItem>

      {isRbmtEngine && (
        <CollapseItem title={'Linguistic Options'}>
          <LinguisticOptions id={id.current} onChange={onOptionsChange} source={profileData.source} target={profileData.target} />
        </CollapseItem>
      )}
      {isNmtEngine && (
        <CollapseItem title={t('Cache Options')}>
          <TranslationProfileCacheOptions id={id.current} data={Boolean(profileData.noCache)} onChange={onOptionsChange} />
        </CollapseItem>
      )}

      <CollapseItem title={'More Options'}>
        <TranslationProfilesGenericOptions id={id.current} list={profileData.genericOptions} onChange={onOptionsChange} disabled={disabled || false} />
      </CollapseItem>
    </Box>
  );
}

const ObjectFieldTemplateStyled = styled(Box)`
  margin-bottom: 16px;
  width: 50%;
  .MuiInputBase-root {
    height: 40px;
  }
`;
