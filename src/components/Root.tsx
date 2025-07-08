import { UIProvider } from '@bspk/ui/UIProvider';
import { ErrorBoundary } from 'components/ErrorBoundary';
import { Nav } from 'components/Nav';
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
                    </main>
                </GlobalStateProvider>
            </UIProvider>
        </>
    );
}

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
