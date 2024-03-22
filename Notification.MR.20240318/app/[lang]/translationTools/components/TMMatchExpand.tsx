import styled from '@systran/react-components/lib/Theme/styled';
import {Theme} from '@systran/react-components/lib/Theme';
import {ExpandProps, Sentence, TmSentenceObject} from './types';
import {Divider} from '@mui/material';
import Typography from '@mui/material/Typography';
import BaseButton from '@systran/react-components/lib/atoms/Buttons/Base';
import ArrowIcon from '@systran/react-components/lib/atoms/Icons/ArrowIcon';
import saveSentences from './SaveSentences';
import {FilePostEditorMessages} from './Messages';
import {useTranslation} from 'react-i18next';
import {useContext} from 'react';
import {PostEditorContext} from './context/PostEditorContext';

const DrawerRowHeader = ({title, replaceFunction}: {title: string; replaceFunction: () => void;}) => {
  const {t} = useTranslation();
  return (
    <DrawerRowHeaderContainer>
      <Typography variant={'body1'} fontWeight={600} alignSelf={'center'} marginRight={'auto'} lineHeight={'1.75rem'} fontSize={'1rem'}>
        {title}
      </Typography>
      <BaseButton variant={'hybrid'} endIcon={<ArrowIcon direction={'right'} />} onClick={() => replaceFunction()} >
        {t('Replace')}
      </BaseButton>
    </DrawerRowHeaderContainer>
  );
};

const SegmentBuilder = ({segment, title}: {segment: string; title?: string;}) => {
  const {t} = useTranslation();

  return (
    <FuzzyMatchContentContainer>
      {title &&
        <FuzzyMatchSubtitle variant={'body1'} fontWeight={600} fontSize={'0.875rem'}>
          {t(title)}
        </FuzzyMatchSubtitle>
      }
      <Typography variant={'body1'} fontSize={'0.875rem'}>
        {segment}
      </Typography>
    </FuzzyMatchContentContainer>
  );
};

const FuzzyMatchRow = ({TmMatch, replaceFunction}: {TmMatch: TmSentenceObject, replaceFunction: (newTarget: string, newSource?: string) => void}) => {
  const {t} = useTranslation();
  const fuzzyMatchTitle = `${t('Fuzzy Match')} ${Math.round(TmMatch.score * 100)}%`;
  const replaceSegment = () => replaceFunction(TmMatch.target);
  return (
    <>
      <Divider orientation={'horizontal'} sx={{margin: '8px 0'}} />
      <DrawerRowHeader title={fuzzyMatchTitle} replaceFunction={replaceSegment} />
      <SegmentBuilder segment={TmMatch.source} title={'TM Source'} />
      <SegmentBuilder segment={TmMatch.target} title={'TM Target'} />
    </>
  );
};

type MachineTranslationRowProps = {
  originalTarget: string;
  originalSource: string;
  replaceFunction: (newTarget: string, newSource?: string) => void;
}

const MachineTranslationRow = ({originalTarget, originalSource, replaceFunction}: MachineTranslationRowProps) => {
  const {t} = useTranslation();
  const {mode} = useContext(PostEditorContext);
  const replaceSegment = () => replaceFunction(originalTarget, originalSource);
  return (
    <>
      <DrawerRowHeader title={t('Machine Translation')} replaceFunction={replaceSegment} />
      {mode === 'file'
        ? <SegmentBuilder segment={originalTarget} />
        : <>
          <SegmentBuilder segment={originalSource} title={'MT Source'} />
          <SegmentBuilder segment={originalTarget} title={'MT Target'} />
        </>
      }
    </>
  );
};

export default function TMMatchExpand({sentence, mutate, updateToastMessage}: ExpandProps) {
  const replaceSegment = (newTarget: string, newSource?: string) => {
    sentence.targetSentence = newTarget;
    if (newSource)
      sentence.sourceSentence = newSource;
    const sentencesModifications = {
      fileId: sentence.fileId,
      sentences: [sentence]
    } as {fileId: string, sentences: Sentence[]};
    saveSentences(sentencesModifications, mutate, updateToastMessage).catch((err) => {
      // eslint-disable-next-line no-console
      console.error(err);
      updateToastMessage({
        label: FilePostEditorMessages.error.editing,
        status: 'error'
      });
    });
  };

  return (
    <DrawerContent>
      <MachineTranslationRow originalTarget={sentence.originalTargetSentence} originalSource={sentence.originalSourceSentence} replaceFunction={replaceSegment} />
      {sentence.tmSentence && <FuzzyMatchRow TmMatch={sentence.tmSentence[0]} replaceFunction={replaceSegment} />}
    </DrawerContent>
  );
}


const DrawerContent = styled('div')<{theme?: Theme}>`
  display: flex;
  padding: 0.5rem 1rem;
  flex-direction: column;
  border-radius: 0.75rem;
  background-color: ${({theme}) => theme.palette.greyScale.extraLight};
`;

const FuzzyMatchContentContainer = styled('div')<{theme?: Theme}>`
  padding: 0.5rem 0;
`;

const DrawerRowHeaderContainer = styled('div')<{theme?: Theme}>`
  display: flex;
  flex-direction: row;
`;

const FuzzyMatchSubtitle = styled(Typography)<{theme?: Theme}>`
  color: ${({theme}) => theme.palette.offGrey.extraDark};
`;
