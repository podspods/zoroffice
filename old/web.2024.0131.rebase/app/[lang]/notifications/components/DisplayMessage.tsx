import { LinkInternal } from '@systran/react-components/lib/atoms/Link';
import { Str, TypeRoute, typeRoute } from './NotificationsType';

type DisplayMessageProps = {
  str: Str;
};
export default function DisplayMessage({ ...props }: DisplayMessageProps) {
  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
  };
  const splittedString = props.str.display.match(/\$\{.*?\}|[^${}]+/g);
  const arrayOfMessage: string[] = splittedString ? splittedString : [];
  if (arrayOfMessage.length <= 0) return '';
  return arrayOfMessage.map((oneCell: string) => {
    const value: RegExpMatchArray | null = oneCell.match(/\$\{([^}]+)\}/);
    if (!value) return oneCell;
    const myData = props.str.data[value[1]];
    if (!myData) return oneCell;
    if (myData.type === 'string') return myData.value;
    const route: TypeRoute | undefined = typeRoute.find(
      (route) => route.tag === myData.type
    );
    if (!route) return myData.value;
    const hrefValue = `${route.value}${myData.value}`;
    return (
      hrefValue && (
        <div onClick={handleClick}>
          <LinkInternal href={hrefValue}>
            &nbsp;{myData.label}&nbsp;
          </LinkInternal>
        </div>
      )
    );
  });
}
