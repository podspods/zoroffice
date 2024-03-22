import moment from 'moment';
import LanguagePairsRender from '@systran/react-components/lib/molecules/LanguagePairsRender';

type StatusLabel = {
  label: string;
  value: string;
};

type Labels = {
  status: {
    [key: string]: StatusLabel;
  };
  problemSeverity: {
    [key: string]: StatusLabel;
  };
  translationRating: {
    [key: string]: StatusLabel;
  };
};

const LABELS = {
  status: {
    new: {label: 'New', value: 'new'},
    'in-progress': {label: 'In-Progress', value: 'in-progress'},
    resolved: {label: 'Resolved', value: 'resolved'},
    closed: {label: 'Closed', value: 'closed'},
    rejected: {label: 'Rejected', value: 'rejected'}
  },
  problemSeverity: {
    trivial: {label: 'Trivial', value: 'trivial'},
    minor: {label: 'Minor', value: 'minor'},
    normal: {label: 'Normal', value: 'normal'},
    major: {label: 'Major', value: 'major'},
    critical: {label: 'Critical', value: 'critical'},
    blocker: {label: 'Blocker', value: 'blocker'}
  },
  translationRating: {
    incomprehensible: {label: 'Incomprehensible', value: 'incomprehensible'},
    disfluent: {label: 'Disfluent', value: 'disfluent'},
    'non-native': {label: 'Non-Native', value: 'non-native'},
    good: {label: 'Good', value: 'good'},
    flawless: {label: 'Flawless', value: 'flawless'}
  }
};

export function getSelectOptions(type: keyof Labels): StatusLabel[] {
  return Object.values(LABELS[type]);
}

export function getSelectedLabel(field: string, type: string) {
  return (LABELS as any)[type] && (LABELS as any)[type][field] && (LABELS as any)[type][field].label && ((LABELS as any)[type][field].label) || '';
}


export function getCreatorLink({accountId, creatorName, isAdmin}: {accountId: string, creatorName: string, isAdmin: boolean}) {
  if (accountId && creatorName) {
    if (isAdmin) {
      return <span title={accountId}><a href={'/users/' + accountId} referrerPolicy='no-referrer' target='_parent'>{creatorName}</a></span>;
    }
    return <span title={accountId}>{creatorName}</span>;
  }
  return null;
}

export function getDate(date: Date) {
  const m = moment(date);
  return <span title={m.format('LLLL')}>{m.fromNow().toString()}</span>;
}

export type LanguagePair = {
  source: string,
  target: string
}
export function getSourceTargetFromLp(languagePair: string): LanguagePair | undefined {
  if (languagePair.length >= 4) {
    return {
      source: languagePair?.substring(0, 2),
      target: languagePair?.substring(2, 4)
    };
  }
  return undefined;
}

export function languageRender(source: string, target: string, localized = false) {
  return source && target && {
    value: `${source}${target}`,
    label: LanguagePairsRender({ source, target, localized })
  };
}
