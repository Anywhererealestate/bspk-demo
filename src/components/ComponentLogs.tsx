import { InlineAlert } from '@bspk/ui/InlineAlert';
import { useErrorLog } from '@bspk/ui/utils/errors';
import { useActionLog } from 'utils/actions';

export default function ComponentLogs() {
    const { errors } = useErrorLog();
    const { actions } = useActionLog();

    if (!(errors.length + actions.length)) return null;

    return (
        <div data-actions-errors>
            {errors.map((error, index) => (
                <InlineAlert key={index} label={error.message} variant="error" />
            ))}
            <div data-informational>
                {actions.map(({ key, message, variant }) => (
                    <InlineAlert id={key} key={key} label={message} variant={variant || 'informational'} />
                ))}
            </div>
        </div>
    );
}

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
