/* eslint-disable max-len */
import React, { useEffect, useRef, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { getTodos } from './api';
import { Todo } from './types/Todo';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';

type TodoFilterType = 'all' | 'active' | 'completed';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [filteredTodos, setFilteredTodos] = useState<Todo[]>(todos);
  const [todoFilterType, setTodoFilterType] = useState<TodoFilterType>('all');
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const updateRef = useRef(false);
  const [todoTitle, setTodoTitle] = useState('');

  const getFilteredByType = (type : TodoFilterType) => {
    const filter = {
      all: todos,
      active: todos.filter(({ completed }) => !completed),
      completed: todos.filter(({ completed }) => completed),
    };

    return filter[type];
  };

  const handleTodos = async () => {
    try {
      setIsLoading(true);
      const res = await getTodos();

      setTodos(res);
      setIsLoading(false);
      setFilteredTodos(res);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
    }
  };

  useEffect(() => {
    handleTodos();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setTodoFilterType(e.target.value as TodoFilterType);
  };

  useEffect(() => {
    if (updateRef.current) {
      setFilteredTodos(getFilteredByType(todoFilterType));
    }

    updateRef.current = true;
  }, [todoFilterType]);

  const handleTodo = (todo: Todo | null) => {
    setSelectedTodo(todo);
  };

  const handleTitleChange = ({ target } : React.ChangeEvent<HTMLInputElement>) => {
    setTodoTitle(target.value);
    const filteredByType = getFilteredByType(todoFilterType);

    const filtered = filteredByType.filter((todo) => todo.title.includes(target.value));

    setFilteredTodos(filtered);
  };

  const handleClear = () => {
    setTodoTitle('');
    setFilteredTodos(getFilteredByType(todoFilterType));
  };

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter handleChange={handleChange} handleTitleChange={handleTitleChange} todoTitle={todoTitle} handleClear={handleClear} />
            </div>

            {isLoading ? (
              <Loader />
            ) : (
              <div className="block">
                <TodoList todos={filteredTodos} handleTodo={handleTodo} />
              </div>
            )}
          </div>
        </div>
      </div>

      {selectedTodo && <TodoModal selectedTodo={selectedTodo} handleTodo={handleTodo} />}
    </>
  );
};
