import React, { useState } from 'react';
import { ServiceName, TypeAction, deregisterableList } from '../type';
import { endPoint, roundOneDigit, uniqueId } from '../utils';
import Data from '../storybook.data/MOCK_DATA.json';
export type HelperTestProps = {
  serviceInput: any;
  testEndPoint: boolean;
  testNode: boolean;
  testColumn: boolean;
  testSearch: boolean;
};
const HelperTest = ({ ...props }: HelperTestProps) => {
  const [query, setQuery] = useState('');
  const id = 'TRS Poller';
  const idok = 'Broker';

  const dataFilter = Data.filter((post) => {
    if (query === '') {
      return post;
    }
    else if (post.title.toLowerCase().includes(query.toLowerCase())) {
      return post;
    }
    return null;
  });
  return (
    <React.Fragment>
      <p>Helper Service</p>
      {props.testEndPoint && (
        <React.Fragment>
          <p>{endPoint(ServiceName.BROKER, TypeAction.DEREGISTER)} </p>
          <p>{endPoint('Broker', TypeAction.REGISTER)} </p>
          <p>{roundOneDigit('0.5', '%')}</p>
          <p>{uniqueId(props.serviceInput.services[0])}</p>
          <p>{uniqueId(props.serviceInput.services[1])}</p>
        </React.Fragment>
      )}
      {props.testNode && (
        <React.Fragment>
          <p>id [{id}]</p>
          <p>serviceName [{ServiceName.COMPUTING_NODE}]</p>
          <p>id: {id} {deregisterableList.includes(ServiceName[id]) ? 'yes' : 'no'}</p>
          <p>idok: {idok} {deregisterableList.includes(ServiceName[idok]) ? 'yes' : 'no'}</p>
          <p>id: {id} {deregisterableList.includes(ServiceName[id]) ? 'yes' : 'no'}</p>
          <p>id: {id} {ServiceName[id]}</p>
          <p>idokzz: {idok} {deregisterableList.includes(idok) ? 'yes' : 'no'}</p>
          <p>total: {props.serviceInput.total}</p>
          <p>running: {props.serviceInput.running}</p>
          <p>failed: {props.serviceInput.failed}</p>
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
