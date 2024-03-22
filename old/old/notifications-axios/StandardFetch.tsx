'use client';

import React, { useEffect, useState } from 'react';
import TodoList from './features/todos/TodoList';
import { todosApi } from './api/todosApi';
import { todosUrlEndpoint } from './api/notificationApi';

// const myUrl = 'http://localhost:3500/notifications';
const myUrl = '/node/notifications/list';
export default function StandardFetch() {
  const [data, setData] = useState(null);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    fetch(myUrl)
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setLoading(false);
      });
  }, []);

  if (isLoading) return <p>Loading...</p>;
  if (!data) return <p>No profile data</p>;
  console.log('StandardFetch data 47 ==>', data);
  const notificationList = [...data.notifications];

  return (
    <React.Fragment>
      <h1>StandardFetch</h1>
      <ul>
        {notificationList.map((notification, index: number) => (
          <li key={index}>
            {notification.id}-{notification.read ? 'true' : 'false'}
          </li>
        ))}
      </ul>
    </React.Fragment>
  );
}
