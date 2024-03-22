import React from 'react';
import { DisplayLine, DisplayLineProps } from './components/DisplayLine';
import { Service, ServiceName } from './services.type';
import { expandDefault } from './expand.default';
import { expandMongoDb } from './expand.mongoDb';
import { expandRabbitMQ } from './expand.rabbitMQ';
import { expandRedis } from './expand.redisItem';
import { expandComputingNode } from './expand.computingNode';
import { GridRowParams } from '@mui/x-data-grid-pro';

export type expandComponentProps = Service;

export function Expand({ row }: GridRowParams): React.ReactNode {
  const readRow: Service = row;

  const lineList = expandText(readRow);
  if (lineList && lineList.length > 0) {
    return (
      <React.Fragment>
        {lineList.map((oneLine) => {
          return (
            <DisplayLine
              key={oneLine.label + oneLine.value}
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

export function expandText(props: Service): DisplayLineProps[] {
  if (!props || !props.name) return null;
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
