import { InlineAlert } from '@bspk/ui/InlineAlert';
import { useErrorLog } from '@bspk/ui/utils/errors';

import { useActionLog } from '../utils/actions';

export default function ComponentLogs() {
    const { errors } = useErrorLog();
    const { actions } = useActionLog();

    if (!(errors.length + actions.length)) return <></>;

    return (
        <div data-actions-errors>
            {errors.map((error, index) => (
                <InlineAlert key={index} variant="error">
                    {error.message}
                </InlineAlert>
            ))}
            {actions.map(({ key, message }) => (
                <InlineAlert id={key} key={key}>
                    {message}
                </InlineAlert>
            ))}
        </div>
    );
}

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
