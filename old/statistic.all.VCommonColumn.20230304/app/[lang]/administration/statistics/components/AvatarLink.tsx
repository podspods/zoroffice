import CustomCell from '@/components/CustomCell';
import { LinkInternal as LinkInternalReact } from '@systran/react-components/lib/atoms/Link';
import { Avatar } from '@mui/material';
import { stringAvatar } from '@systran/react-components/lib/userManagement/utils';

export type AvatarLinkProps = {
  url: string;
  label: string;
};
export default function AvatarLink({ ...props }: AvatarLinkProps) {
  return (
    <CustomCell>
      <LinkInternalReact href={props.url} key={`${props.url}_${props.label}`}>
        <Avatar {...stringAvatar(props.label)} />
      </LinkInternalReact>
    </CustomCell>
  );
}
