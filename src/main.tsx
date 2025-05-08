import './utils/wydr';

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import { Root } from './components/Root';
import { routes } from './routes';

const router = createBrowserRouter([{ Component: Root, children: routes }]);

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <RouterProvider router={router} />
    </StrictMode>,
);

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
