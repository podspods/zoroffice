import {IconButton} from '@mui/material';
import {ReactNode} from 'react';

type TProps = {Icon?: ReactNode; value?: string; title?: string};

const CopyToClipboardButton = ({Icon, value, title = ''}: TProps) => {
  const handleClick = () => {
    if (value) {
      navigator.clipboard.writeText(value.toString());
    }
  };

  return (
    <IconButton onClick={handleClick} color='primary' title={title}>
      {Icon}
    </IconButton>
  );
};

export default CopyToClipboardButton;
