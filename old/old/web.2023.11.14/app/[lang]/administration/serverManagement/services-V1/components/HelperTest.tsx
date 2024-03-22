/* eslint-disable @typescript-eslint/no-unsafe-call */
import React, { useState } from 'react';
import { ServiceName, TypeAction } from '../services.type';
import { convertStatus, endPoint } from '../services';
import StatusBadge from '@systran/react-components/lib/atoms/StatusBadge';
import { useTranslation } from 'react-i18next';
import { columnList } from '../services.column';
import Data from '../data/MOCK_DATA.json';
export type HelperTestProps = {
  serviceInput: any;
  testEndPoint: boolean;
  testStatusBadge: boolean;
  testNode: boolean;
  testColumn: boolean;
  testSearch: boolean;
};
const HelperTest = ({ ...props }: HelperTestProps) => {
  const { t } = useTranslation();
  const [query, setQuery] = useState('');
  const id = ServiceName['Broker'];
  const lulu = columnList.map((oneColumn) => ({
    ...oneColumn,
    headerName: t(oneColumn.headerName)
  }));

  const dataFilter = Data.filter((post) => {
    if (query === '') {
      return post;
    } else if (post.title.toLowerCase().includes(query.toLowerCase())) {
      return post;
    }
    return null;
  });
  console.log('dataFilter query  ==>', dataFilter, query);

  return (
    <React.Fragment>
      <p>Helper Service</p>
      {props.testEndPoint && (
        <React.Fragment>
          <p>{endPoint(ServiceName.BROKER, TypeAction.DEREGISTER)} </p>
          <p>{endPoint('Broker', TypeAction.REGISTER)} </p>
        </React.Fragment>
      )}
      {props.testNode && (
        <React.Fragment>
          <p>[{id}]</p>
          <p>[{ServiceName.COMPUTING_NODE}]</p>
          <p>total: {props.serviceInput.total}</p>
          <p>running: {props.serviceInput.running}</p>
          <p>failed: {props.serviceInput.failed}</p>
        </React.Fragment>
      )}
      {props.testStatusBadge && (
        <React.Fragment>
          <p>status: [{convertStatus(props.serviceInput.services[0].status)}]</p>
          <StatusBadge
            title={'test badge'}
            type={convertStatus(props.serviceInput.services[0].status)}
            text={t(props.serviceInput.services[0].status)}
          />
        </React.Fragment>
      )}
      {props.testColumn && (
        <React.Fragment>
          <ul>
            {lulu.map((oneColumn) => (
              <li>{oneColumn.headerName}</li>
            ))}
          </ul>
        </React.Fragment>
      )}
      {props.testSearch && (
        <React.Fragment>
          <div>
            <input
              placeholder='Enter Post Title'
              onChange={(event) => setQuery(event.target.value)}
            />
            <p>{query}</p>
            {dataFilter.map((post) => (
              <div className='box' key={`${post.title}_${post.author}`}>
                <p>
                  [{post.title}] [{post.author}]
                </p>
              </div>
            ))}
          </div>
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

export default HelperTest;
