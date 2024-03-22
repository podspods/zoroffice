// import cloneDeep from 'lodash/cloneDeep';
import LanguagePairsRender from '@systran/react-components/lib/molecules/LanguagePairsRender';
// import PropertyLine from '@systran/react-components/lib/atoms/PropertyLine';
// import {getDate} from '@systran/react-components/lib/atoms/TableHelper';
import {LinkInternal} from '@systran/react-components/lib/atoms/Link';

// export function pickTargetLanguage(fileTarget, tmTargets) {
//   if (typeof fileTarget !== 'string') {
//     throw new Error('No matching target language');
//   }
//   let targets = cloneDeep(tmTargets);
//   if (!Array.isArray(targets)) {
//     targets = [targets];
//   }
//   const pickedTarget = targets.find((tmTarget) => {
//     return typeof tmTarget === 'string' && tmTarget.length >= fileTarget.length && tmTarget.slice(0, fileTarget.length).toLowerCase() === fileTarget.toLowerCase();
//   });
//   if (!pickedTarget) {
//     throw new Error('No matching target language');
//   }
//   return pickedTarget;
// }

// export function getSourceTargetFromLp(languagePair) {
//   return {source: languagePair.substring(0, 2), target: languagePair.substring(2, 4)};
// }

export function languageRender(source: string, target: string, localized = false) {
  return source && target
    ? {
      value: `${source}${target}`,
      label: LanguagePairsRender({source, target, localized})
    }
    : {};
}

// export function shortList(list, limit = 15) {
//   if (!Array.isArray(list) || list.length === 0) {
//     return [];
//   }
//   const shortedList = list.slice(0, limit);
//   const remainingItems = list.length - shortedList.length;
//   if (remainingItems === 0) {
//     return shortedList;
//   }
//   return shortedList.concat(i18n.t('and %d others...', remainingItems));
// }

// export function makeShortList(values) {
//   if (!values || !Array.isArray(values)) {
//     return null;
//   }
//   const valuesString = values.join(', ');
//   const title = shortList(values).join('\n');
//   return <span title={title}>{valuesString}</span>;
// }

// export function PropertyLineLarge(props = {}) {
//   return (
//     <PropertyLine {...props} offset={3}>
//       {props.children}
//     </PropertyLine>
//   );
// }

// export function formatDate(v) {
//   if (v) {
//     return getDate(new Date(v * 1000));
//   }
//   return 'N/A';
// }

export function getCreatorLink({accountId, creatorName, isAdmin}: {accountId: string; creatorName: string; isAdmin: boolean}) {
  if (accountId && creatorName) {
    if (isAdmin) {
      return (
        <span title={accountId}>
          <LinkInternal href={'/administration/userManagement/users/' + accountId}>{creatorName}</LinkInternal>
        </span>
      );
    }
    return <span title={accountId}>{creatorName}</span>;
  }
  return null;
}
