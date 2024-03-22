import toast, { Toaster } from 'react-hot-toast';

export type NewDataProps = {
  status: boolean;
  messageFetching?: string;
  messageDone?: string;
};

// add toast here to display message

export default function RefreshingStatus({
  messageFetching = 'message fetching',
  messageDone = 'message done',
  status
}: NewDataProps) {
  if (status) {
    toast(messageFetching);
  }
  else toast(messageDone);

  return <Toaster />;
}
