import 'src/utils/wydr';

import { Root } from 'components/Root';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { routes } from 'src/routes';

const router = createBrowserRouter([{ Component: Root, children: routes }]);

const root = document.getElementById('root')!;

createRoot(root).render(
    <StrictMode>
        <RouterProvider router={router} />
    </StrictMode>,
);

setTimeout(() => {
    /* This is used to help make F.O.U.C. less noticeable */
    root.classList.add('loaded');
}, 500);

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
