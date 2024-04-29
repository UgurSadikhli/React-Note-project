import React, { useState, useEffect } from 'react';
import { Form, useLoaderData, useSubmit, NavLink, useNavigation } from 'react-router-dom'; // Import useNavigation
import { getTasks, createTask } from '../tasks';
import FilterButton from '../Components/Button/Button';
import { redirect } from 'react-router-dom';
import { Outlet } from 'react-router-dom';



export async function loader({ request }) {
  const url = new URL(request.url);
  const q = url.searchParams.get('q');
  const tasks = await getTasks(q);
  return { tasks, q };
}

export async function action() {
  const task = await createTask();
  return redirect(`/tasks/${task.id}/edit`);
}

function Root() {
  const { tasks, q } = useLoaderData();
  const [filterType, setFilterType] = useState('all');
  const submit = useSubmit();
  const navigation = useNavigation();
  const searching = new URLSearchParams(q).has('q');

  useEffect(() => {
    document.getElementById('q').value = q;
  }, [q]);

  const toggleFilter = () => {
    switch (filterType) {
      case 'all':
        setFilterType('favorites');
        break;
      case 'favorites':
        setFilterType('notFavorites');
        break;
      case 'notFavorites':
        setFilterType('all');
        break;
      default:
        setFilterType('all');
    }
  };

  const filteredTasks = tasks.filter(task => {
    if (filterType === 'all') return true;
    if (filterType === 'favorites' && task.favorite) return true;
    if (filterType === 'notFavorites' && !task.favorite) return true;
    return false;
  });

  return (
    <>
      <div id="sidebar">
        
        <div>
          <Form id="search-form" role="search">
            <input
              id="q"
              className={searching ? 'loading' : ''}
              aria-label="Search tasks"
              placeholder="Search"
              type="search"
              name="q"
              defaultValue={q}
              onChange={event => {
                submit(event.currentTarget.form);
              }}
            />
            <div id="search-spinner" aria-hidden hidden={!searching} />
            <div className="sr-only" aria-live="polite"></div>
          </Form>
          <FilterButton
            filterType={filterType}
            onClick={toggleFilter}
          />
          <Form method="post">
            <button className="New_task_button" type="submit">New</button>
          </Form>
        </div>
        <nav>
          {filteredTasks.length ? (
            <ul>
              {filteredTasks.map(task => (
                <NavLink to={`tasks/${task.id}`} key={task.id}>
                  {task.first || task.last ? (
                    <>
                      {task.first} {task.last}
                    </>
                  ) : (
                    <i>No Name</i>
                  )}{' '}
                  {task.favorite && <span>☑</span>}
                </NavLink>
              ))}
            </ul>
          ) : (
            <p>
              <i>No tasks</i>
            </p>
          )}
        </nav>
      </div>
      <div id="detail" className={navigation.state === 'loading' ? 'loading' : ''}>
        <Outlet />
      </div>
    </>
  );
}

export default Root;