import { useState } from 'react';
import SubmitFeedback from '@/components/SubmitFeedback';
import StatusBadge from '@systran/react-components/lib/atoms/StatusBadge';
import { PostApi } from './PostApis';
import { useTranslation } from 'react-i18next';
import { PrimaryButton } from '@systran/react-components/lib/atoms/Buttons/Primary';
import { Box } from '@mui/material';
import {Feedback, ExpandPayload, UpdatePayloads, AddToUD} from './FeedbackType';

export type Props = {
  feedback: Feedback,
  hideTitle: boolean,
  displayStatus: boolean,
  mutate: () => Promise<unknown>;
}
export type State = {
  message?: string,
  error?: any,
}
export default function ViewFeedbackDetails({feedback, hideTitle, displayStatus, mutate}: Props) {
  const {t} = useTranslation();
  const [suggestedTranslation, setSuggestedTranslation] = useState(feedback.suggestedTranslation);
  const [problemSeverity, setProblemSeverity] = useState(feedback.problemSeverity);
  const [description, setDescription] = useState(feedback.description);
  const [translationRating, setTranslationRating] = useState(feedback.translationRating);
  const [status, setStatus] = useState(feedback.status);
  const [state, setState] = useState<State>({
    message: '',
    error: ''
  });

  const handleFormSubmit = async (event: { preventDefault: () => void; stopPropagation: () => void; }) => {
    event.preventDefault();
    event.stopPropagation();
    try {
      const updatePayloads = {
        id: feedback._id,
        payload: {
          expandPayload: {
            suggestedTranslation, problemSeverity, description, translationRating, status
          }
        }
      };
      await PostApi.updateFeedback(updatePayloads);
      setState({ message: t('Feedback updated') });
    }
    catch (err) {
      setState({ error: err, message: '' });
    }
    finally {
      await mutate();
    }
  };
  return (
    <Box>
      <form>
        {state.message &&
        <StatusBadge title={t(state.message)} status={'success'}>
          {t(state.message)}
        </StatusBadge>
        }
        {state.error &&
        <StatusBadge title={t(state.error)} status={'error'}>
          {t(state.error)}
        </StatusBadge>
        }
        <SubmitFeedback
          feedback={feedback}
          hideTitle={hideTitle}
          displayStatus={displayStatus}
          suggestedTranslation={suggestedTranslation}
          problemSeverity={problemSeverity}
          description={description}
          translationRating={translationRating}
          status={status}
          setProblemSeverity={setProblemSeverity}
          setDescription={setDescription}
          setTranslationRating={setTranslationRating}
          setStatus={setStatus}
          setSuggestedTranslation={setSuggestedTranslation}
        />
        <PrimaryButton
          type='submit'
          disabled={!suggestedTranslation}
          onClick={handleFormSubmit}
        >
          {t('Submit')}
        </PrimaryButton>
      </form>
    </Box>
  );
}
