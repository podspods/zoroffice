'use client';

import { BaseButtonColor } from '@systran/react-components/lib/atoms/Buttons/Base';

import i18n from '../../../../i18n';
export const PAGE_NAME = i18n.t('Notification');
export const REFRESH = i18n.t('Refresh');
export const MARK = i18n.t('Mark');
export const MARK_AS_READ = i18n.t('Mark as read');
export const MARK_AS_UNREAD = i18n.t('Mark as unread');
export const MARK_ALL_AS_READ = i18n.t('Mark all as read');
export const LEVEL = i18n.t('Level');
export const READ = i18n.t('Read');
export const NOT_READ = i18n.t('not read');
export const NOTIFICATIONS = i18n.t('Notifications');
export const INSERT_AT = i18n.t('Insert at');
export const SHOWING = i18n.t('Showing');
export const TO = i18n.t('to');
export const OF = i18n.t('of');
export const NEXT = i18n.t('Next');
export const HOURS_AGO = i18n.t('Hours ago');
export const DAYS_AGO = i18n.t('Days ago');

export const SUCCESS_COLOR = 'green';
export const ERROR_COLOR = 'red';
export const INFO_COLOR = 'blue';
export const SUCCESS = 'success';
export const ERROR = 'error';
export const INFO = 'info';

export const SUCCESS_TEXT = i18n.t(SUCCESS);
export const ERROR_TEXT = i18n.t(ERROR);
export const INFO_TEXT = i18n.t(INFO);

export const PAGINATION_STEP = [5, 10, 25, 50, 100];

export const optionList = [MARK_AS_UNREAD, MARK_AS_UNREAD];

export const COLOR_NORMAL: BaseButtonColor = 'primary';
export const COLOR_INFO: BaseButtonColor = 'secondary';
export const COLOR_WARNING: BaseButtonColor = 'error';
export const COLOR_ERROR: BaseButtonColor = 'error';

export const toolbarElement = [
  {
    label: MARK_AS_READ,
    disable: false,
    onClick: () => {
      // eslint-disable-next-line no-alert
      alert(MARK_ALL_AS_READ);
    }
  },
  {
    label: MARK_AS_UNREAD,
    disable: false,
    onClick: () => {
      // eslint-disable-next-line no-alert
      alert(MARK_ALL_AS_READ);
    }
  },
  {
    label: MARK_ALL_AS_READ,
    disable: false,
    onClick: () => {
      // eslint-disable-next-line no-alert
      alert(MARK_ALL_AS_READ);
    }
  }
];