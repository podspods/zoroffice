import {useState} from 'react';
import {useTranslation} from 'react-i18next';
import {useSearchParams} from 'next/navigation';

import {PrimaryButton} from '@systran/react-components/lib/atoms/Buttons/Primary';
import {SecondaryButton} from '@systran/react-components/lib/atoms/Buttons/Secondary';
import FileUploadCore, {SystranFile, type CoreProps} from '@systran/react-components/lib/organisms/FileUploadCore';
import useFileUploadCore from '@systran/react-components/lib/organisms/useFileUploadCore';
import {CallbackFormData} from '@systran/react-components/lib/organisms/TranslateBox/TranslationFormV4/useTranslationForm';
import {extractFormDataFromSearchParams} from '@systran/react-components/lib/organisms/TranslateBox/TranslationFormV4/query';

import {commonFetch} from '@/utils/fetcher';
import * as S from './FilesBox.styled';
import Apis from '@/utils/apis';
import Preferences from '@systran/react-components/lib/organisms/TranslateBox/TranslationForm/Preferences';

export type FormProps = {
  disableAutodetect?: boolean,
  sessionType: string,
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

export default function FilesBox({slots = {}, ...props}: Props) {
  const {t} = useTranslation();
  const query = useSearchParams();
  const [formData, setFormData] = useState<CallbackFormData>();

  const uploadFile = formData ? async (file: SystranFile) => {
    const body = new FormData();
    try {
      const params = {
        ...formData,
        sourceLanguage: formData.source,
        targetLanguage: formData.target,
        profile: formData.profileId,
        selectors: JSON.stringify({
          owner: formData.owner,
          domain: formData.domain,
          size: formData.size
        }),
        modelOptions: JSON.stringify(formData.modelOptions)
      };

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
  } : async () => {};
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
              languageDetected={null}
              getSupportedLanguages={async () => await commonFetch(Apis.fileTranslation.lps) || []}
              cache={{
                getItem: (key) => {
                  const value = localStorage.getItem(key);
                  return value ? JSON.parse(value) : value;
                },
                setItem: (key, value) => {
                  localStorage.setItem(key, JSON.stringify(value));
                }
              }}
              getFeatures={(params: {source?: string, target?: string, profileId?: string}) => commonFetch(Apis.fileTranslation.features(params))}
              getProfiles={(params) => commonFetch(Apis.fileTranslation.profiles(params))}
              onFormUpdate={setFormData}
              settings={{
                disableAutoDetect: props.translationFormProps.disableAutodetect,
                locales: true,
                formality: true,
                profiles: true,
                previousLanguages: false
              }}
              initialFormData={extractFormDataFromSearchParams(query)}
              getLanguagesFromSession={() => {
                const formData = localStorage.getItem(`TRANSLATION_FORM_LANGUAGE_${props.translationFormProps.sessionType}`);
                return formData ? JSON.parse(formData) : null;
              }}
              saveLanguagesToSession={async (formData) => {
                localStorage.setItem(`TRANSLATION_FORM_LANGUAGE_${props.translationFormProps.sessionType}`, JSON.stringify(formData));
              }}
              preferences={new Preferences({
                getPreferences: () => commonFetch(Apis.user.preferences),
                setPreferences: (params) => commonFetch(Apis.user.preferences, {method: 'POST', body: JSON.stringify(params)})
              })}
              learnMoreLink={'https://docs.systran.net/translate/en/user-guide/customizing-translation/profiles.html'}
              createProfileLink={'../linguisticConfiguration/translationProfiles'}
              noProfileImage={'/images/profile_placeholder.png'}
            />
            <S.ActionButtons>
              <SecondaryButton onClick={() => deleteFiles()}>{t('Cancel')}</SecondaryButton>
              <S.TranslateButton>
                <PrimaryButton onClick={handleUploadClick} disabled={!formData} >{t('Translate')}</PrimaryButton>
              </S.TranslateButton>
            </S.ActionButtons>
          </S.Row>
        </>)
        : <S.TableContainer>{slots.UploadedFilesTable}</S.TableContainer>
      }
    </S.Container>
  );
}
