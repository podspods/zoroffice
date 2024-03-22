import React from 'react';
// import semver from 'semver';
import StatusBadge from '@systran/react-components/lib/atoms/StatusBadge';
// import moment from 'moment';
// import map from 'lodash/map';

// function getErrorParsedDetails(details) {
// return map(details, function(msg) {
//   return i18n.t(msg);
// }).join('');
// }

// Build custom data for table cell, it can contain complicated data like html tags ...
// export function getStatus(status) {
// if (status === 'error' || status === 'recovery')
//   return (
//     <span title={i18n.t('Unknown error')}>
//       {i18n.t('error')} <i className='fa fa-warning' />
//     </span>
//     );
//   if (status && status.error) {
//     let errorMsg = status.details && Array.isArray(status.details) && status.details.length > 0 ? getErrorParsedDetails(status.details) : i18n.t(status.error);
//     if (status.translated) {
//       errorMsg += '\n ' + i18n.t('files translated: ') + status.translated.filesTranslated;
//       errorMsg += '\n ' + i18n.t('files not translated: ') + (status.translated.filesError + status.translated.filesCanceled);
//     }
//     return (
//       <span title={errorMsg}>
//         {i18n.t(status.msg || 'error')} <i className='fa fa-warning' />
//       </span>
//     );
//   }
//   if (status && status.translated) return <span title={i18n.t('files translated') + ' : ' + status.translated.filesTranslated}>{i18n.t(status.msg || 'translated')}</span>;
//   return i18n.t(status);
// }

// export function getDate(date) {
// const m = moment(date);
// return <span title={m.format('LLLL')}>{m.fromNow().toString()}</span>;
// }

// export function getLanguages(file) {
//   if (!file.metadata.source || file.metadata.source === '' || file.metadata.source === 'null' || file.metadata.source === 'undefined') file.metadata.source = 'Auto';
//   if (!file.metadata || !file.metadata.target) return null;
//   return (
//     <div>
//       {file.metadata.source.toUpperCase()}
//       <i className='fa fa-long-arrow-right' />
//       {file.metadata.target.toUpperCase()}
//     </div>
//   );
// }

// export function getSize(size) {
//   return window.systranHelpers.displayBytesForHumansHtml(size);
// }

// export function getTIScore(tiScore) {
//   return tiScore ? (tiScore * 1000).toFixed(1) + '%' : '';
// }

// export function isArchive(file) {
//   return file.metadata && file.metadata.isArchive;
// }

// export function isStatus(file, status) {
//   return (file && file.metadata && file.metadata.status === status) || file.metadata.status.msg === status;
// }
// export function isTranslated(file) {
//   return isStatus(file, 'translated');
// }
// export function isErrored(file) {
//   return file && file.status && (file.status.msg === 'error' || file.status === 'error');
// }
// export function isCanceled(file) {
//   return isStatus(file, 'canceled');
// }
// export function isCanceling(file) {
//   return isStatus(file, 'canceling');
// }
// export function isDeleting(file) {
//   return isStatus(file, 'deleting');
// }

// export function isEditable(data) {
//   if (isArchive(data)) {
//     return isTranslated(data) || isStatus(data, 'translating') || isStatus(data, 'canceling') || isStatus(data, 'canceled');
//   }
//   return data && data.metadata && data.metadata.xliffId && (isStatus(data, 'processing') || isStatus(data, 'translated'));
// }

/*
  @data: pre-calculated data (ready to display in table cell)
  use pre-calculated data (instead of doing calculation in this formatter function) to benefit default sort function of react-bs-table
 */
// export function dataFormatter(data) {
//   return data;
// }

// Custom sort function for "Upload Date" column
// export function sortUploadDate(a, b, order) {
//   return order === 'asc' ? a.originUploadDate < b.originUploadDate : b.originUploadDate < a.originUploadDate;
// }

// Custom sort function for "Version" column
// export function sortVersion(a, b, order) {
//   return order === 'asc' ? semver.compare(a.sortableVersion, b.sortableVersion) : semver.compare(b.sortableVersion, a.sortableVersion);
// }

// export function sortSize(a, b, order) {
//   return order === 'asc' ? a.length > b.length : b.length > a.length;
// }

export function getActiveBadge(deactivated: boolean) {
  const title = deactivated ? 'Deactivated' : 'Activated';
  return (
    <StatusBadge status={deactivated ? 'error' : 'success'} title={title}>
      {title}
    </StatusBadge>
  );
}

export function getRunningBadge(running: boolean) {
  const title = running ? 'Running' : 'Not running';
  return (
    <StatusBadge status={running ? 'success' : 'error'} title={title}>
      {title}
    </StatusBadge>
  );
}
