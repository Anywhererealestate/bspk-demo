import { Outlet } from 'react-router';

import './root.scss';

import { GlobalStateProvider } from '../utils/globalState';

import { ErrorBoundary } from './ErrorBoundary';
import { Nav } from './Nav';

export function Root() {
    return (
        <>
            <GlobalStateProvider>
                <Nav />
                <main data-main>
                    <ErrorBoundary>
                        <Outlet />
                    </ErrorBoundary>
                </main>
            </GlobalStateProvider>
        </>
    );
}

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
