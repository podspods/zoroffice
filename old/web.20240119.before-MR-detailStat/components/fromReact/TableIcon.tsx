import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {icon} from '@fortawesome/fontawesome-svg-core/import.macro';
import {SizeProp} from '@fortawesome/fontawesome-svg-core';

export type Props = {
  size?: SizeProp
}

export default function TableIcon({size}: Props) {
  return <FontAwesomeIcon icon={icon({name: 'table', style: 'regular'})} size={size} />;
}
