import {useTranslation} from 'react-i18next';
import React, {useContext} from 'react';
import {PostEditorContext} from './context/PostEditorContext';
import Typography from '@mui/material/Typography';
import LanguagePairsRender from '@systran/react-components/lib/molecules/LanguagePairsRender';
import {RenderProfileCell} from '@/utils/findProfileName';
import {FileInformations} from './types';
import {Profile} from '../UploadedFilesTable';
import {Theme, styled } from '@systran/react-components/lib/Theme';


type TooltipTitleContentProps = {
  fileInformations: FileInformations;
  profilesData: {profiles: Profile[]} | undefined
}

const TooltipTitleContent = ({fileInformations, profilesData}: TooltipTitleContentProps) => {
  const {t} = useTranslation();
  const {mode} = useContext(PostEditorContext);
  return (
    <div style={{width: 'fit-content'}}>
      <div style={{display: 'flex'}}>
        <MyTypography>{t('Languages')}: </MyTypography>
        <Typography sx={{color: 'inherit'}}>
          <LanguagePairsRender
            source={fileInformations.source || ''}
            target={fileInformations.modelOptions?.locale || fileInformations.target || ''}
            localized
          />
        </Typography>
      </div>
      <div style={{display: 'flex'}}>
        <MyTypography>{t('Profile')}: </MyTypography>
        <Typography sx={{color: 'inherit'}}>
          {profilesData ? RenderProfileCell(profilesData.profiles, fileInformations.detectedSelectors.detectedProfileId) : ''}
        </Typography>
      </div>
      {
        mode === 'speech' &&
          <div style={{display: 'flex'}}>
            <MyTypography>{t('Speech Provider')}: </MyTypography>
            <Typography sx={{color: 'inherit'}}>
              {fileInformations.speechProvider || ''}
            </Typography>
          </div>
      }
    </div>
  );
};

const MyTypography = styled(Typography)<{theme?: Theme}>`
  color: inherit;
  margin-right: 0.2rem;
  font-weight: 700;
`;

export {TooltipTitleContent as default};
