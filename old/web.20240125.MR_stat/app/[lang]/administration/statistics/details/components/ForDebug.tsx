import { Button } from '@mui/material';
import BaseButton from '@systran/react-components/lib/atoms/Buttons/Base';
import { DateTime } from 'luxon';

export type ForDebugProps = {
  name?: string;
  dateRange?: { startDate: DateTime; endDate: DateTime };
  onClick?: () => void;
};
export default function ForDebug({ ...props }: ForDebugProps) {
  return (
    <>
      <p>{props.name && props.name}</p>
      <p>
        startDate :{' '}
        {props.dateRange?.startDate &&
          props.dateRange.startDate.toLocaleString({
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
          })}
        {' => '}
        {props.dateRange?.startDate && props.dateRange.startDate.valueOf()}
      </p>
      <p>
        endDate :{' '}
        {props.dateRange?.endDate &&
          props.dateRange.endDate.toLocaleString({
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
          })}
        {' => '}
        {props.dateRange?.endDate && props.dateRange.endDate.valueOf()}
      </p>
      <BaseButton onClick={props.onClick}>Mutate data</BaseButton>
    </>
  );
}
