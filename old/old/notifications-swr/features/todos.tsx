import React, { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faUpload } from '@fortawesome/free-solid-svg-icons';

import useSWR from 'swr';

import {
  getTodos,
  addTodo,
  updateTodo,
  deleteTodo,
  todosUrlEndpoint as cacheKey
} from '../api/todosApi';

import {
  addTodoOptions,
  updateTodoOptions,
  deleteTodoOptions
} from '../api/todosSWROptions';

const TodoList = () => {
  const [newTodo, setNewTodo] = useState('');

  const { isLoading, error, data: todos, mutate } = useSWR(cacheKey, getTodos, {
    onSuccess: (data) => data.sort((a, b) => b.id - a.id)
  });

  const addTodoMutation = async (newTodo) => {
    try {
      await mutate(addTodo(newTodo), addTodoOptions(newTodo));

      toast.success('Success! Added new item.', {
        duration: 1000,
        icon: '🎉'
      });
    } catch (err) {
      toast.error('Failed to add the new item.', {
        duration: 1000
      });
    }
  };

  const updateTodoMutation = async (updatedTodo) => {
    try {
      await mutate(updateTodo(updatedTodo), updateTodoOptions(updatedTodo));

      toast.success('Success! Updated item.', {
        duration: 1000,
        icon: '🚀'
      });
    } catch (err) {
      toast.error('Failed to update the item.', {
        duration: 1000
      });
    }
  };

  const deleteTodoMutation = async ({ id }) => {
    try {
      await mutate(deleteTodo({ id }), deleteTodoOptions({ id }));

      toast.success('Success! Deleted item.', {
        duration: 1000
      });
    } catch (err) {
      toast.error('Failed to delete the item.', {
        duration: 1000
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addTodoMutation({ userId: 1, title: newTodo, completed: false, id: 9999 });
    setNewTodo('');
  };

  const newItemSection = (
    <form onSubmit={handleSubmit}>
      <label htmlFor='new-todo'>Enter a new todo item</label>
      <div className='new-todo'>
        <input
          type='text'
          id='new-todo'
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder='Enter new todo'
        />
      </div>
      <button className='submit'>
        <FontAwesomeIcon icon={faUpload} />
      </button>
    </form>
  );

  let content;
  if (isLoading) {
    content = <p>Loading...</p>;
  } else if (error) {
    content = <p>{error.message}</p>;
  } else {
    content = todos.map((todo) => {
      return (
        <article key={todo.id}>
          <div className='todo'>
            <input
              type='checkbox'
              checked={todo.completed}
              id={todo.id}
              onChange={() =>
                updateTodoMutation({ ...todo, completed: !todo.completed })
              }
            />
            <label htmlFor={todo.id}>{todo.title}[{todo.id}]</label>
          </div>
          <button
            className='trash'
            onClick={() => deleteTodoMutation({ id: todo.id })}
          >
            <FontAwesomeIcon icon={faTrash} />
          </button>
        </article>
      );
    });
  }

  return (
    <main>
      <Toaster toastOptions={{ position: 'top-center' }} />
      <h1>Todo List</h1>
      {newItemSection}
      {content}
    </main>
  );
};
export default TodoList;
