import ModalListBody from '@systran/react-components/lib/atoms/ModalListBody';
import ConfirmModal from '@systran/react-components/lib/molecules/ConfirmModal';
import Typography from '@mui/material/Typography';
import {Profile} from './TranslationProfilesTable';

type Props = {
  title: string;
  subTitle: string;
  onConfirm: () => void;
  selectedProfiles: Profile[];
  onClose: () => void;
};

function format(profile: Profile) {
  return profile.profileId + ' (' + (profile.serviceName || profile.service) + ')';
}

function TranslationProfilesActiveModal({onConfirm, title, subTitle, selectedProfiles, onClose}: Props) {
  return (
    <ConfirmModal width='large' title={title} open onConfirm={onConfirm} onClose={onClose}>
      {subTitle && (
        <Typography variant='h6' style={{marginBottom: '15px'}}>
          {subTitle}
        </Typography>
      )}
      <ModalListBody list={selectedProfiles.map((profile) => format(profile))} />
    </ConfirmModal>
  );
}

export default TranslationProfilesActiveModal;
