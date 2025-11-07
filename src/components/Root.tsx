import { SnackbarManager } from '@bspk/ui/Snackbar/Manager';
import { UIProvider } from '@bspk/ui/UIProvider';
import { ErrorBoundary } from 'components/ErrorBoundary';
import { Nav } from 'components/Nav';
import { NavContents } from 'components/NavContents';
import { Outlet } from 'react-router';
import { GlobalStateProvider } from 'src/components/GlobalStateProvider';

import 'src/components/root.scss';

export function Root() {
    return (
        <>
            <UIProvider>
                <GlobalStateProvider>
                    <Nav />
                    <main data-main>
                        <ErrorBoundary>
                            <Outlet />
                        </ErrorBoundary>
                        <NavContents />
                    </main>
                    <SnackbarManager defaultTimeout={5000} />
                </GlobalStateProvider>
            </UIProvider>
        </>
    );
}

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
