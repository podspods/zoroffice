import React from 'react';
import ModalListBody from '@systran/react-components/lib/atoms/ModalListBody';
import ConfirmModal from '@systran/react-components/lib/molecules/ConfirmModal';
import {License} from './LicensesTable'
import {useTranslation} from 'react-i18next';

type Props = {
  open: boolean;
  onConfirm: (licenses: License[]) => Promise<void>;
  onClose: () => void;
  licensesToDelete: License[];
}


export default function DeleteLicensesForm({open, onClose, onConfirm, licensesToDelete}: Props) {
  const {t} = useTranslation();

  const formatLicenseList = licensesToDelete?.map(
    (elem: License) => (elem.product || t('Unknown product')) + (elem.edition ? ' (' + elem.edition + ')' : '')
  );

  return (
    <ConfirmModal
      open={open}
      title={t('Delete Licenses')}
      width='large'
      onConfirm={() => onConfirm(licensesToDelete)}
      onClose={onClose}
    >
      <ModalListBody
        list={formatLicenseList}
        description={t('Are you sure you want to delete the following licenses ?')}
      />
    </ConfirmModal>
  );
}
