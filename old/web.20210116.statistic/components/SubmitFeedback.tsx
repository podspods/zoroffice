import FormEntry from '@systran/react-components/lib/atoms/FormEntry';
import LanguagePairsRender from '@systran/react-components/lib/molecules/LanguagePairsRender';
import TextField from '@systran/react-components/lib/atoms/TextField';
import { MenuItem, Select, Box} from '@mui/material';
import { getSelectOptions } from '../app/[lang]/monitoring/translationReviews/components/utils';
import { useTranslation } from 'react-i18next';
import { Feedback } from '../app/[lang]/monitoring/translationReviews/components/FeedbackType';

export type Props = {
  feedback: Feedback,
  displayStatus: boolean,
  suggestedTranslation: string,
  problemSeverity: string,
  description: string | undefined,
  translationRating: string,
  status: string,
  hideTitle: boolean,
  setProblemSeverity: (value: string) => void,
  setDescription: (value: string) => void,
  setTranslationRating: (value: string) => void,
  setStatus: (value: string) => void,
  setSuggestedTranslation: (value: string) => void,
  displayDescription?: boolean
}

export default function SubmitFeedback({feedback, displayStatus, suggestedTranslation, problemSeverity, displayDescription = true, description, translationRating, status, setProblemSeverity, setDescription, setTranslationRating, setStatus, setSuggestedTranslation, hideTitle}: Props) {
  const {t} = useTranslation();

  if (!feedback) {
    return null;
  }

  return (
    <>
      <FormEntry label={t('Language Pair')}>
        {LanguagePairsRender({
          source: feedback.sourceLanguage,
          target: feedback.targetLanguage
        })}
      </FormEntry>
      <FormEntry label={t('Profile / Corpus')}>
        {feedback.profileName}
      </FormEntry>
      <FormEntry label={t('Source')}>
        {<strong>{feedback.source}</strong>}
      </FormEntry>
      <FormEntry label={t('Suggested Translation')}>
        <TextField
          placeholder={t('Indicate your suggested translation')}
          style={{width: '100%'}}
          fullWidth
          multiline
          rows={2}
          disabled={false}
          value={suggestedTranslation || feedback.suggestedTranslation}
          onChange={(event) => {
            setSuggestedTranslation(event.target.value);
          }}
        />
      </FormEntry>
      {displayStatus && (
        <FormEntry label={t('Status')}>
          <Select
            sx={{width: '50%'}}
            size='small'
            placeholder={t('Status')}
            onChange={(event) => {
              setStatus(event.target.value);
            }}
            value={status || feedback.status}
          >
            {getSelectOptions('status').map(({ value, label }: { value: any; label: any }) => (
              <MenuItem key={value} value={value}>
                {label}
              </MenuItem>
            ))}

          </Select>
        </FormEntry>
      )}
      <FormEntry label={t('Problem Severity')}>
        <Select
          sx={{width: '50%'}}
          size='small'
          placeholder={t('Problem Severity')}
          onChange={(event) => {
            setProblemSeverity(event.target.value);
          }}
          value={problemSeverity || feedback.problemSeverity || 'normal'}
        >
          {getSelectOptions('problemSeverity').map(({ value, label }: { value: any; label: any }) => (
            <MenuItem key={value} value={value}>
              {label}
            </MenuItem>
          ))}
        </Select>
      </FormEntry>
      <FormEntry label={t('Translation Rating')}>
        <Select
          sx={{width: '50%'}}
          size='small'
          placeholder={t('Translation Rating')}
          onChange={(event) => {
            setTranslationRating(event.target.value);
          }}
          value={translationRating || feedback.translationRating}
        >
          {getSelectOptions('translationRating').map(({ value, label }: { value: any; label: any }) => (
            <MenuItem key={value} value={value}>
              {label}
            </MenuItem>
          ))}
        </Select>
      </FormEntry>
      {displayDescription && (
        <FormEntry label={t('Description')}>
          <TextField
            placeholder={t('Add any additional description on this translation that may help with context')}
            style={{width: '100%'}}
            fullWidth
            multiline
            rows={3}
            disabled={false}
            value={description}
            onChange={(event) => {
              setDescription(event.target.value);
            }}
          />
        </FormEntry>
      )}
    </>
  );
}

