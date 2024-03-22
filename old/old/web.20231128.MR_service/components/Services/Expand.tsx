import React from 'react';
import { GridRowParams } from '@mui/x-data-grid-pro';
import { Service, ServiceName } from '@/components/Services/type';
import DisplayLine, {
  DisplayLineProps
} from '@/components/Services/components/DisplayLine';
import expandMongoDb from '@/components/Services/expandMongoDb';
import expandRabbitMQ from '@/components/Services/expandRabbitMQ';
import expandRedis from '@/components/Services/expandRedisItem';
import expandComputingNode from '@/components/Services/expandComputingNode';
import expandDefault from '@/components/Services/expandDefault';

export default function Expand(params: GridRowParams<Service>): React.ReactNode {
  const lineList = expandText(params.row);
  if (lineList && lineList.length > 0) {
    return (
      <React.Fragment>
        {lineList.map((oneLine, index) => {
          const lineKey = `${oneLine.label ? oneLine.label : index}_${
            oneLine.value ? oneLine.value : index
          }`;
          return (
            <DisplayLine
              key={lineKey}
              label={oneLine.label}
              status={oneLine.status}
              innerHtml={oneLine.innerHtml}
              value={oneLine.value}
              column={oneLine.column}
              leading={oneLine.leading}
            />
          );
        })}
      </React.Fragment>
    );
  }
  return null;
}

function expandText(props: Service): DisplayLineProps[] {
  if (!props || !props.name) return [];
  let itemList: DisplayLineProps[] = [];

  switch (props.name) {
    case ServiceName.MONGO_DB:
      itemList = expandMongoDb(props);
      break;
    case ServiceName.RABIT_MQ:
      itemList = expandRabbitMQ(props);
      break;
    case ServiceName.REDIS:
    case ServiceName.REDIS_NODE:
      itemList = expandRedis(props);
      break;
    case ServiceName.COMPUTING_NODE:
      itemList = expandComputingNode(props);
      break;
    case ServiceName.TRS_POLLER:
    case ServiceName.TRS_CONSOLE:
    case ServiceName.SES_CONSOLE:
    case ServiceName.ELASTIC_SEARCH:
    case ServiceName.TM_INDEXER:
    case ServiceName.GATEWAY:
    case ServiceName.LOOKUP_SERVER:
    case ServiceName.DCT_INDEXER:
    case ServiceName.GDICT:
    case ServiceName.DISPATCHER:
    case ServiceName.ROUTING_SERVER:
    case ServiceName.CORPUS_MANAGER:
    case ServiceName.BROKER:
    case ServiceName.ACTIVITY_SERVER:
    default:
      itemList = expandDefault(props);
      break;
  }
  return itemList;
}
