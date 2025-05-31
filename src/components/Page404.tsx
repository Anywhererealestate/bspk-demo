import { Page } from 'components/Page';
import { useLocation } from 'react-router-dom';
import { COMPONENT_PHASE } from 'src/componentPhases';
import { kebabCase } from 'src/utils/kebabCase';

export function Page404() {
    const location = useLocation();

    const componentName = Object.keys(COMPONENT_PHASE).find((name) => `/${kebabCase(name)}` === location.pathname);

    return (
        <Page>
            <h1>404&apos;d</h1>
            <p>Page not found</p>

            {componentName && (
                <p>
                    The <strong>{componentName}</strong> component isn&apos;t quite ready yet. Check back soon!
                </p>
            )}
            <div style={{ marginTop: '100vh' }}>
                <code>Hello.</code>
            </div>
        </Page>
    );
}

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
