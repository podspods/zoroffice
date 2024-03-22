'use client';

import userAuthorizations from '../../../../../lib/userAuthorizations';
import {actions} from '../../../../../lib/permissionsList';
import {Box} from '@mui/material';
import FeedbackContainer from './components/FeedbackContainer';

export default function MonitoringTranslationReviews() {
  const hasFeedbackPermission = userAuthorizations.check((actions as any).FEEDBACK_MGR);
  const hasAdminUserPermission = userAuthorizations.check([(actions as any).ADMIN_USERS, (actions as any).ADMIN_SELF_USERS]);
  if (!hasFeedbackPermission) {
    return null;
  }

  return (
    <Box sx={{width: '100%', padding: '2rem'}}>
      <FeedbackContainer hasAdminUserPermission={hasAdminUserPermission} />
    </Box>
  );
}
