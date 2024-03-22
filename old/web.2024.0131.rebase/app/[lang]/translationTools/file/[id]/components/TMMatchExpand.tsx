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

type segmentBuilderProps = {
  segment: string;
  type: 'target' | 'source';
}

type buildRowMatchProps = {
  TmMatch: TmSentenceObject;
  index: number;
  replaceFunction: (newTarget: string) => void;
}

const SegmentBuilder = ({segment, type}: segmentBuilderProps) => {
  const {t} = useTranslation();

  return (
    <SourceOrTargetContainer>
      <Typography variant={'body1'} fontWeight={600} lineHeight={'1.2rem'} fontSize={'0.875rem'}>
        {type === 'source' ? t('TM Source') : t('TM Target')}
      </Typography>
      <Typography variant={'body1'} fontSize={'0.875rem'}>
        {segment}
      </Typography>
    </SourceOrTargetContainer>
  );
};

const BuildRowMatch = ({TmMatch, index, replaceFunction}: buildRowMatchProps) => {
  const {t} = useTranslation();

  return (
    <div key={index}>
      {index !== 0 && <Divider orientation={'horizontal'} />}
      <MatchContainer>
        <FuzzyMatchTitleContainer>
          <FuzzyMatchTitle variant={'body1'} fontWeight={600} alignSelf={'center'} marginRight={'auto'} lineHeight={'1.75rem'} fontSize={'0.875rem'}>
            {t('Fuzzy Match')} {Math.round(TmMatch.score * 100)}%
          </FuzzyMatchTitle>
          <BaseButton variant={'hybrid'} endIcon={<ArrowIcon direction={'right'} />} onClick={() => replaceFunction(TmMatch.target)} >
            {t('Replace')}
          </BaseButton>
        </FuzzyMatchTitleContainer>
        <div style={{display: 'flex', flexDirection: 'row'}}>
          <SegmentBuilder segment={TmMatch.source} type={'source'} />
          <SegmentBuilder segment={TmMatch.target} type={'target'} />
        </div>
      </MatchContainer>
    </div>
  );
};

export default function TMMatchExpand({sentence, mutate, updateToastMessage}: ExpandProps) {
  const replaceByTmMatch = (newTarget: string) => {
    sentence.targetSentence = newTarget;
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

  if (sentence.tmSentence) {
    return (
      <ExpandDrawer>
        {sentence.tmSentence.map((match: TmSentenceObject, key: number) => {
          return (<BuildRowMatch TmMatch={match} index={key} replaceFunction={replaceByTmMatch} />);
        })}
      </ExpandDrawer>
    );
  }
  return undefined;
}


const ExpandDrawer = styled('div')<{theme?: Theme}>`
  width: 75%;
  margin: auto;
  display: flex;
  flex-direction: column;
`;

const MatchContainer = styled('div')<{theme?: Theme}>`
  border-top: 1px solid black;
  padding: 0.5rem 0;
  div:first-child > div > & {
      border-top: 0;
  }
`;

const SourceOrTargetContainer = styled('div')<{theme?: Theme}>`
  width: 50%;
  display: flex;
  flex-direction: column;
`;

const FuzzyMatchTitleContainer = styled('div')<{theme?: Theme}>`
  display: flex;
  flex-direction: row;
`;

const FuzzyMatchTitle = styled(Typography)<{theme?: Theme}>`
  color: ${({theme}) => theme.palette.translationFeatures.TM};
`;
