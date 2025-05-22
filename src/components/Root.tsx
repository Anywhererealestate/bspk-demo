import { Outlet } from 'react-router';
import 'src/components/root.scss';
import { ErrorBoundary } from 'src/components/ErrorBoundary';
import { Nav } from 'src/components/Nav';
import { GlobalStateProvider } from 'src/utils/globalState';

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
