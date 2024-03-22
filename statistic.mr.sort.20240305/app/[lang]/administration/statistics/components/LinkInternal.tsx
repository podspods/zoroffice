import CustomCell from '@/components/CustomCell';
import { LinkInternal as LinkInternalReact } from '@systran/react-components/lib/atoms/Link';

export type LinkInternalProps = {
  url: string;
  label: string;
};
export default function LinkInternal({ ...props }: LinkInternalProps) {
  return (
    <CustomCell>
      <LinkInternalReact href={props.url} key={`${props.url}_${props.label}`}>
        {props.label}
      </LinkInternalReact>
    </CustomCell>
  );
}
