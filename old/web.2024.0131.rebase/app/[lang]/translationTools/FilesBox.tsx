import {useState} from 'react';
import {useTranslation} from 'react-i18next';
import {useSearchParams} from 'next/navigation';

import {PrimaryButton} from '@systran/react-components/lib/atoms/Buttons/Primary';
import {SecondaryButton} from '@systran/react-components/lib/atoms/Buttons/Secondary';
import TranslationProfileSettings from '@systran/react-components/lib/organisms/TranslateBox/SettingExpansion/items/TranslationProfileSettings';
import GeneralLanguagePreferences from '@systran/react-components/lib/organisms/TranslateBox/SettingExpansion/items/GeneralLanguagePreferences';
import FileUploadCore, {SystranFile, type CoreProps} from '@systran/react-components/lib/organisms/FileUploadCore';
import useFileUploadCore from '@systran/react-components/lib/organisms/useFileUploadCore';

import {commonFetch} from '@/utils/fetcher';
import * as S from './FilesBox.styled';
import Apis from '@/utils/apis';

export type FormProps = {
  disableAutodetect?: boolean,
  sessionType: unknown,
  cache: unknown,
  learnMoreProfileLink?: string
}

type Props = {
  slots?: {
    UploadedFilesTable?: JSX.Element,
  }
  fileUploadCoreProps: CoreProps
  translationFormProps: FormProps
}

type Params = {
  sourceLanguage?: string | null,
  targetLanguage?: string | null,
  profile?: string,
  selectors?: string,
  modelOptions?: string
}

export default function FilesBox({slots = {}, ...props}: Props) {
  const {t} = useTranslation();
  const query = useSearchParams();
  const updateState = (values: {source: string, target: string, profileId: string, owner: string, domain: string, size: string, modelOptions: {[key: string]: unknown}}) => {
    setParams({
      ...params,
      sourceLanguage: values.source,
      targetLanguage: values.target,
      profile: values.profileId,
      selectors: JSON.stringify({
        owner: values.owner,
        domain: values.domain,
        size: values.size
      }),
      modelOptions: JSON.stringify(values.modelOptions)
    });
  };
  const [params, setParams] = useState<Params>({});

  const SettingsBuilder = () => {
    return [
      {
        label: 'Translation Profile Settings',
        component: TranslationProfileSettings,
        props
      },
      {
        label: 'General Language Preferences',
        component: GeneralLanguagePreferences,
        props
      }
    ];
  };

  const uploadFile = async (file: SystranFile) => {
    const body = new FormData();
    try {
      Object.entries(params).forEach(([key, value]) => value && body.append(key, value));
      if (file.sysContentType) {
        body.append('sysContentType', file.sysContentType);
      }
      body.append('files[]', file.rawFile);
      return await commonFetch(Apis.fileTranslation.upload, {
        headers: {
          'x-file-size': file.size.toString(),
          'Content-Type': null
        },
        method: 'POST',
        body
      });
    }
    catch (err) {
      if (err instanceof Error) {
        return {error: {type: err.cause, message: err.message}};
      }
      return {error: {type: 'request', message: t('Unknown error')}};
    }
  };
  const hookProps = useFileUploadCore({uploadFile});
  const {files, deleteFiles, uploadFiles} = hookProps;

  const handleUploadClick = async () => {
    await uploadFiles();
    deleteFiles();
  };

  return (
    <S.Container>
      <FileUploadCore
        {...hookProps}
        {...props.fileUploadCoreProps}
      />
      {files.length > 0
        ? (<>
          <div style={{marginTop: '40px'}}>
            <S.Title>{t('Select Languages')}</S.Title>
          </div>
          <div style={{marginTop: '8px'}}>
            <S.Instructions>
              {t(`Choose translation settings, select source and target languages, 
                and click on 'Translation' to translate the selected files. 
                Once translation is finished, click on the download button to retrieve your translated file.`
              )}
            </S.Instructions>
          </div>
          <S.Row>
            <S.Form
              args={query as any}
              profileId={params.profile}
              onFormUpdate={updateState as any}
              onSwitchLanguages={() => {}}
              settingsExpansionBuilder={SettingsBuilder as any}
              updateSettingsPermission
              getSupportedLanguages={fetchLps}
              getProfiles={fetchProfiles}
              getLanguagesFromSession={fetchCache}
              saveLanguagesToSession={updateCache}
              getFeatures={fetchFeatures}
              getSelectors={fetchSelectors}
              imagePaths={{}}
              {...props.translationFormProps as any}
            />
            <S.ActionButtons>
              <SecondaryButton onClick={() => deleteFiles()}>{t('Cancel')}</SecondaryButton>
              <S.TranslateButton>
                <PrimaryButton onClick={handleUploadClick} disabled={props.translationFormProps.disableAutodetect && (params.sourceLanguage === null || params.sourceLanguage === undefined)} >{t('Translate')}</PrimaryButton>
              </S.TranslateButton>
            </S.ActionButtons>
          </S.Row>
        </>)
        : <S.TableContainer>{slots.UploadedFilesTable}</S.TableContainer>
      }
    </S.Container>
  );
}

const fetchLps = () => commonFetch(Apis.fileTranslation.lps);
const fetchProfiles = () => commonFetch(Apis.fileTranslation.profiles);
const fetchFeatures = () => commonFetch(Apis.fileTranslation.features);
const fetchSelectors = () => commonFetch(Apis.fileTranslation.selectors);
const fetchCache = () => commonFetch(Apis.fileTranslation.cache('file'));
const updateCache = () => commonFetch(
  Apis.fileTranslation.cache(),
  {method: 'POST', body: JSON.stringify({type: 'file'})} // todo change this body when migrating form
);
