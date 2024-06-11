import { createBrowserRouter, Navigate, Outlet } from 'react-router-dom';
// import {SignUp} from '@pages/SignUp';
import React, { Suspense } from 'react';
import { Main } from '@pages/Main';

const router = createBrowserRouter(
  [{
    path: '/',
    element: (<Suspense fallback={<>Loading...</>}> <Outlet /> </Suspense>),
    errorElement: (<h1>ERROR</h1>),
    children: [
      {
        element: <Main />,
        children: [
          {index: true, element: <></>},
          {path: '/home', element: <>home</>},
          {path: '/login', element: <>login</>},
          {path: '/register', element: <></>},
          {path: '/card', element: <>card</>},
          {path: '/profile', element: <>profile</>},
          {path: '/profile/edit', element: <>profile/edit</>},
          {path: '/profile/orders', element: <>profile/orders</>},
          {path: '/deliverer/machines', element: <>deliverer</>},
          {path: '/deliverer/machines/:id', element: <>deliverer/machines</>},
          {path: '/deliverer/statistics', element: <>statistics</>},
          {path: '/404', element: <>404 Not Found</>},
          {
            path: '*', element: <Navigate to={'/404'}/>
          },
        ]
      },
    ]
  }]
)

export { router as Router }