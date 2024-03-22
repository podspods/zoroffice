import { LinkExternal } from '@systran/react-components/lib/atoms/Link';
import { Str } from './NotificationsType';
import Apis from '@/utils/apis';

type DisplayMessageProps = {
  str: Str;
};
export default function DisplayMessage({ ...props }: DisplayMessageProps) {
  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
  };

  const findRoute = (dataType: string): string => {
    switch (dataType) {
      case 'profiler':
        return Apis.notification.profiler;
      case 'tm':
        return Apis.notification.tm;
      case 'tr':
        return Apis.notification.tr;
      case 'node':
        return Apis.notification.node;
      case 'nodeView':
        return Apis.notification.nodeView;
      case 'fileTranslation':
        return Apis.notification.fileTranslation;
      default:
        return '';
    }
  };

  const arrayOfMessage = props.str.display.match(/\$\{.*?\}|[^${}]+/g);

  return arrayOfMessage?.map((oneCel) => {
    const value = oneCel.match(/\$\{([^}]+)\}/);
    if (!value) return oneCel;
    const myData = props.str.data[value[1]];
    if (!myData) return oneCel;
    if (myData.type === 'string') return myData.value;

    if (!Apis.notification.hasOwnProperty(myData.type)) return myData.value;

    const route: string = findRoute(myData.type);

    const hrefValue = `${route}${myData.value}`;
    return (
      hrefValue && (
        <div onClick={handleClick}>
          <LinkExternal href={hrefValue}>
            &nbsp;{myData.label}&nbsp;
          </LinkExternal>
        </div>
      )
    );
  });
}
