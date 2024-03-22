'use client';

import {useContext} from 'react';
import {useTranslation} from 'react-i18next';
import {type CoreProps} from '@systran/react-components/lib/organisms/FileUploadCore';
import {buildGetters} from '@systran/react-components/lib/organisms/utils';
import {SettingsContext} from '@/components/SettingProvider';
import FilesBox, {FormProps} from '../FilesBox';
import UploadedFileTable from '../UploadedFilesTable/UploadedFilesTable';
import styled from '@systran/react-components/lib/Theme/styled';
import Typography from '@mui/material/Typography';
import {type Theme} from '@systran/react-components/lib/Theme';
import useActions from './useActions';
import {TemporaryPageBox} from '@/components/TemporaryPageBox';

export default function TranslationToolFile() {

  const {t} = useTranslation();
  const {
    precisePDF = 0,
    uploadWhiteList = {fileTranslation: []},
    maxUploadFileTranslationNumber = 0,
    uploadFileSizeLimit = 0,
    uploadFileSizeLimitByExtension = []
  } = useContext(SettingsContext).settings || {};

  const withPrecisePDF = precisePDF === 1 ? true : undefined;
  const coreProps = {
    tableTitle: t('Files to translate'),
    whiteList: uploadWhiteList.fileTranslation,
    uploadFilesLimit: maxUploadFileTranslationNumber,
    uploadFileSizeLimit: uploadFileSizeLimit,
    uploadFileSizeLimitByExtension: uploadFileSizeLimitByExtension,
    optionHeader: 'File Type',
    getOptions: buildGetters({withPrecisePDF}).getFileTypeOptions,
    getFileType: buildGetters({withPrecisePDF}).getFileType
  } satisfies CoreProps;

  const formProps = {
    disableAutodetect: false,
    sessionType: 'file',
    cache: undefined,
    learnMoreProfileLink: undefined
  } satisfies FormProps;

  return (
    <TemporaryPageBox>
      <Title>{t('File Translation')}</Title>
      <FilesBox
        slots={{
          UploadedFilesTable: <UploadedFileTable useActions={useActions} mode='file' />
        }}
        fileUploadCoreProps={coreProps}
        translationFormProps={formProps}
      />
    </TemporaryPageBox>
  );
}

const Title = styled(Typography) <{theme?: Theme}>`
  font-size: 24px;
  font-weight: 600;
  color: ${({theme}) => theme.palette.offGrey.extraDark};

`;
