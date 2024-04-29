import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { RouterProvider, createBrowserRouter} from 'react-router-dom';
import Root, 
{loader as rootloader,
  action as rootAction,
} from './routes/root';
import Task, {loader as taskLoader,action as taskAction,} from './routes/task';
import ErrorPage from './error-page';
import EditTask, {action as editAction} from "./routes/edit";
import { action as destroyAction, } from "./routes/destroy";
import { getTasks } from './tasks';

const root = ReactDOM.createRoot(document.getElementById('root'));

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root/>,
    errorElement: <ErrorPage/>,
    loader: rootloader,
    action: rootAction,
    children: [
      {
        path: "tasks/:taskId",
        element: <Task />,
        loader: taskLoader,
        action: taskAction,
      },
      {
        path: "tasks/:taskId/edit",
        element: <EditTask />,
        loader: taskLoader,
        action: editAction
      },
      {
        path: "tasks/:taskId/destroy",
        action: destroyAction,
      },
    ]
  },

  
]);


root.render(
  <React.StrictMode>
   <RouterProvider router={router}/>
  </React.StrictMode>
);
