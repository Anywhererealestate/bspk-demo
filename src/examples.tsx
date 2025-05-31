import { examples } from '@bspk/ui/demo/examples';
import { updateComponentContext } from 'src/components/ComponentProvider';
import { action } from 'src/utils/actions';

export const componentExamples = examples(updateComponentContext, action);
