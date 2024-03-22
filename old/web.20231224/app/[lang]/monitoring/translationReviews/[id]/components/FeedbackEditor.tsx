'use client';

import {useState} from 'react';
import find from 'lodash/find';
import {PrimaryButton} from '@systran/react-components/lib/atoms/Buttons/Primary';
import {Box, Toolbar, Typography} from '@mui/material';
import SubmitFeedback from '@/components/SubmitFeedback';
import {useTranslation} from 'react-i18next';
import TextField from '@systran/react-components/lib/atoms/TextField';
import {SecondaryButton} from '@systran/react-components/lib/atoms/Buttons/Secondary';
import SkeletonContent from '@/components/IframeLoader';
import DownloadIcon from '@systran/react-components/lib/atoms/Icons/DownloadIcon';
import ErrorCard from '@systran/react-components/lib/atoms/ErrorCard';
import {styled} from '@systran/react-components/lib/Theme';
import moment from 'moment';
import useSWR from 'swr';
import Apis from '@/utils/apis';
import PageTitle from '@/components/PageTitle';
import {pickTargetLanguage} from '../../../../linguisticConfiguration/resources/translationMemory/components/TranslationMemoryListTable/useRowActions';
import {PostApi} from '../../components/PostApis';
import {AddToUD, Data, Dict, PayloadsEntry, Tm} from '../../components/FeedbackType';
import {State} from '../../components/ViewFeedbackDetails';
import TmList from '../../components/Modals/TmList';
import AddToUdModal from '../../components/Modals/AddToUdModal';
import AccountAvatar from './AccountAvatar';
import {LinkInternal} from '@systran/react-components/lib/atoms/Link';

export type Update = {
  [key: string]: string | undefined;
}

export default function MonitoringTranslationReviewsId({params}: {params: {id: string, lang: string}}) {
  const { id } = params;
  const {data: feedback, isLoading: isFeedbackLoading, error: feedbackError, mutate: feedbackMutate} = useSWR(Apis.feedback.getFeedback(id));
  const {data: accounts, isLoading: isAccountsLoading} = useSWR(Apis.feedback.getAccounts);

  const [suggestedTranslation, setSuggestedTranslation] = useState(feedback?.suggestedTranslation);
  const [problemSeverity, setProblemSeverity] = useState(feedback?.problemSeverity);
  const [description, setDescription] = useState(feedback?.description);
  const [translationRating, setTranslationRating] = useState(feedback?.translationRating);
  const [status, setStatus] = useState(feedback?.status);
  const [comment, setComment] = useState('');
  const [tmModalOpen, setTmModalOpen] = useState(false);
  const [udModalOpen, setUdModalOpen] = useState(false);
  const [state, setState] = useState<State>({
    message: '',
    error: ''
  });
  const {t} = useTranslation();

  const handleAppendToTM = async (tm: Tm) => {
    const {id, sourceLanguage, targetLanguages} = tm;
    const {_id, targetLanguage, source, target, suggestedTranslation} = feedback;
    try {
      const appendToTmPayload = {
        corpusId: id,
        sourceLanguage,
        targetLanguage: pickTargetLanguage(targetLanguage, targetLanguages),
        sourceSentence: source,
        targetSentence: suggestedTranslation || target
      };
      const updateFeedbackPayload = {
        id: _id,
        payload: {
          addToTM: {
            corpusId: id,
            sourceSentence: source,
            targetSentence: suggestedTranslation || target
          }
        }
      };
      await PostApi.addToTM(appendToTmPayload);
      await PostApi.updateFeedback(updateFeedbackPayload);
    }
    finally {
      await feedbackMutate();
    }
  };

  const handleAppendToUD = async (data: Data) => {
    const {_id, targetLanguage, source, target, suggestedTranslation} = feedback;
    const {dictId, ownerId, srcLang, tgtLangs} = data.dict;
    try {
      const appendToUdPayload: {dict: Dict, entry: PayloadsEntry} = {
        dict: {
          dictId,
          srcLang,
          tgtLang: pickTargetLanguage(targetLanguage, tgtLangs)
        },
        entry: {
          src: source,
          srcPos: data.pos,
          tgtPos: data.pos,
          priority: data.priority,
          comments: data.comments
        }
      };
      const updateFeedbackPayload: {id: string, payload: {addToUD: AddToUD}} = {
        id: _id,
        payload: {
          addToUD: {
            ownerId,
            dictId,
            source
          }
        }
      };
      if (data.dnt) {
        appendToUdPayload.entry.type = 'dnt';
        updateFeedbackPayload.payload.addToUD.type = 'dnt';
      }
      else {
        appendToUdPayload.entry.tgt = suggestedTranslation || target;
        updateFeedbackPayload.payload.addToUD.target = suggestedTranslation || target;
      }

      await PostApi.addToUD(appendToUdPayload);
      await PostApi.updateFeedback(updateFeedbackPayload);

    }
    finally {
      await feedbackMutate();
    }
  };

  const getAccount = (id: string | undefined) => {
    return find(accounts, (account) => account.id === id);
  };

  const handleFormSubmit = async (event: { preventDefault: () => void; stopPropagation: () => void; }) => {
    event.preventDefault();
    event.stopPropagation();
    try {
      const updatePayloads = {
        id: feedback._id,
        payload: {
          expandPayload: {suggestedTranslation, problemSeverity, description, translationRating, status, comment}
        }
      };
      await PostApi.updateFeedback(updatePayloads);
      setComment('');
      setState({ message: t('Feedback updated') });
    }
    catch (err) {
      setState({ error: err, message: '' });
    }
    finally {
      await feedbackMutate();
    }
  };

  const author = getAccount(feedback?.createdBy) || {};
  const createdAtMoment = moment(new Date(feedback?.insertedAt));
  const updatedAtMoment = moment(new Date(feedback?.updatedAt));

  const bodyFields = [
    { label: 'Suggested Translation', oldKey: 'oldSuggestedTranslation', newKey: 'suggestedTranslation' },
    { label: 'Status', oldKey: 'oldStatus', newKey: 'status' },
    { label: 'Problem Severity', oldKey: 'oldProblemSeverity', newKey: 'problemSeverity' },
    { label: 'Translation Rating', oldKey: 'oldTranslationRating', newKey: 'translationRating' },
    { label: 'Added to TM', key: 'addToTM' },
    { label: 'Added to UD', key: 'addToUD' }
  ];

  const updates = feedback?.updates?.filter((update: Update) => update.updatedBy) || [];

  if (isFeedbackLoading || isAccountsLoading) {
    return <SkeletonContent />;
  }

  return (
    <Box sx={{width: '100%', padding: '2rem'}}>
      {state.error &&
      <Box sx={{marginBottom: '20px'}}>
        <ErrorCard errorMessage={state.error || feedbackError} />
      </Box>
      }
      <PageTitle>{t('Feedback Description')}</PageTitle>
      <Toolbar style={{paddingLeft: '0px'}}>
        <div style={{display: 'flex'}}>
          <SecondaryButton
            style={{marginRight: '10px'}}
            type='button'
            onClick={() => setTmModalOpen(true)}
            endIcon={<DownloadIcon type='upload' />}
          >
            {t('Append to TM')}
          </SecondaryButton>
          <SecondaryButton
            type='button'
            onClick={() => setUdModalOpen(true)}
            endIcon={<DownloadIcon type='upload' />}
          >
            {t('Append to UD')}
          </SecondaryButton>
        </div>
      </Toolbar>
      {tmModalOpen && (
        <TmList
          open={tmModalOpen}
          onConfirm={handleAppendToTM}
          onClose={() => setTmModalOpen(false)}
        />
      )}
      {udModalOpen && (
        <AddToUdModal
          open={udModalOpen}
          onConfirm={handleAppendToUD}
          onClose={() => setUdModalOpen(false)}
        />
      )}
      <Box>
        <form>
          <CustomBox>
            <Box sx={{marginBottom: '10px'}}>
              <AccountAvatar hash={author?.hash} /> {t('Added by')}{' '}
              <LinkInternal href={`administration/userManagement/users/${author?.id}`} target='_blank' key={author?.id}>
                {author?.accountName}
              </LinkInternal>
              <span>
                {' '}
                {createdAtMoment?.isValid() && createdAtMoment?.fromNow()}. {updatedAtMoment?.isValid() && `Updated ${updatedAtMoment?.fromNow()}`}
              </span>
            </Box>
            <SubmitFeedback
              feedback={feedback}
              hideTitle={false}
              suggestedTranslation={suggestedTranslation}
              problemSeverity={problemSeverity}
              displayDescription={false}
              description={description}
              translationRating={translationRating}
              displayStatus
              status={status}
              setProblemSeverity={setProblemSeverity}
              setDescription={setDescription}
              setTranslationRating={setTranslationRating}
              setStatus={setStatus}
              setSuggestedTranslation={setSuggestedTranslation}
            />
          </CustomBox>
          <Box>
            {updates.length > 0 &&
            <Typography sx={{fontSize: '15px', fontWeight: 400, marginTop: '20px', marginBottom: '20px'}}>
              {t('History')}
            </Typography>}
            {updates.map((update: Update, i: number) => {
              const account = getAccount(update.updatedBy) || {};
              return (
                <div key={i}>
                  <CustomHeaderBox>
                    <AccountAvatar hash={account.hash} /> {t('Updated by ')}
                    <LinkInternal href={`administration/userManagement/users/${author?.id}`} key={author?.id}>
                      {author?.accountName}
                    </LinkInternal>
                    {t(' on')} {moment(new Date(update.updatedAt!)).format('LLLL')}
                  </CustomHeaderBox>
                  <Box>
                    {bodyFields.map(({ label, key, oldKey, newKey }, i) => (
                      (oldKey !== undefined && newKey !== undefined && update[oldKey] !== undefined && update[newKey] !== undefined) ? (
                        <ul key={i}>
                          <li>
                            <strong>{t(label)}</strong> {t('changed from')} <i>{update[oldKey] as string}</i> {t('to')} <i>{update[newKey]}</i>
                          </li>
                        </ul>
                      ) : (key !== undefined && update[key] ? (
                        <ul key={i}>
                          <li>
                            <strong>{t(label)}</strong>
                          </li>
                        </ul>
                      ) : null)
                    ))}
                    {update.comment && <div style={{margin: '15px 0px 10px 5px'}}>{update.comment}</div>}
                  </Box>
                </div>
              );
            })}
            <TextField
              style={{width: '100%'}}
              placeholder={t('Write your comment')}
              fullWidth
              multiline
              rows={3}
              disabled={false}
              value={comment}
              onChange={(event) => {
                setComment(event.target.value);
              }}
            />
          </Box>
          <div style={{marginTop: '20px', marginBottom: '20px'}}>
            <PrimaryButton
              type='submit'
              onClick={handleFormSubmit}
            >
              {t('Submit')}
            </PrimaryButton>
          </div>
        </form>
      </Box>
    </Box>
  );
}

const CustomBox = styled(Box)`
  background-color: #FFFFFF;
  margin: 2px;
  padding: 10px;
  border: 1px solid #DCDCDC
`;
const CustomHeaderBox = styled(Box)`
  background-color: #E5F1F8;
  margin: 2px;
  padding: 10px;
  border-left: 3px solid #8CA8CE;
`;
