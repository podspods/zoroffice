import { LinkInternal } from '@systran/react-components/lib/atoms/Link';
import { Str } from './NotificationsType';
import InternalRoutes from '@/utils/internalRoutes';

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

    const route = findRoute(myData.type);

    if (!route) return myData.value;
    const hrefValue = `${route}${myData.value}`;
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

function findRoute(typeRoute: string): string {
  switch (typeRoute) {
    case 'profiler':
      return InternalRoutes.profiler;
    case 'tm':
      return InternalRoutes.tm;
    case 'tr':
      return InternalRoutes.tr;
    case 'fileTranslation':
      return InternalRoutes.fileTranslation;
    case 'node':
      return InternalRoutes.node;
    case 'nodeView':
      return InternalRoutes.nodeView;

    default:
      return '';
  }
}
