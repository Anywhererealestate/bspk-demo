import { IconName, meta as iconMeta } from '@bspk/icons/meta';
import { CheckboxGroup } from '@bspk/ui/CheckboxGroup';
import { Dropdown } from '@bspk/ui/Dropdown';
import { NumberInput } from '@bspk/ui/NumberInput';
import { RadioGroup } from '@bspk/ui/RadioGroup';
import { Switch } from '@bspk/ui/Switch';
import { TextInput } from '@bspk/ui/TextInput';
import { Textarea } from '@bspk/ui/Textarea';

import { TypePropertyExampleWithControls } from '../types';

const IconNameOptions = Object.keys(iconMeta) as IconName[];

export function TypePropControl({
    prop,
    value,
    onChange,
}: {
    value: any;
    onChange: (nextValue: any) => void;
    prop: TypePropertyExampleWithControls;
}) {
    if (!prop) return null;

    const controlType = prop.controlType || prop.type;

    const controlProps = {
        'aria-label': prop.name,
        name: prop.name,
        value,
        onChange,
    };

    if (prop.multiline) return <Textarea id="" {...controlProps} size="small" />;

    if (controlType === 'number')
        return (
            <NumberInput
                data-testid={`${prop.name}-Input`}
                id=""
                max={prop.maximum}
                min={prop.minimum}
                size="small"
                {...controlProps}
            />
        );

    if (controlType === 'string')
        return <TextInput data-testid={`${prop.name}-Input`} id="" size="small" type="text" {...controlProps} />;

    const controlOptions: string[] =
        controlType === 'icon' ? IconNameOptions : prop.options?.map((o) => o.toString()) || [];

    if (controlType === 'checkboxes') {
        return (
            <CheckboxGroup
                data-testid={`${prop.name}-CheckboxGroup`}
                options={
                    controlOptions.map((option) => ({
                        value: option,
                        label: option,
                    })) || []
                }
                {...controlProps}
                values={controlProps.value}
            />
        );
    }

    if (controlOptions.length > 0) {
        if (controlOptions.length > 5 || controlType === 'select')
            return (
                <>
                    <Dropdown
                        data-testid={`${prop.name}-Dropdown`}
                        id=""
                        options={
                            controlOptions?.map((option) => ({
                                label: option,
                                value: option,
                            })) || []
                        }
                        size="small"
                        {...controlProps}
                    />
                </>
            );

        return (
            <RadioGroup
                data-testid={`${prop.name}-RadioGroup`}
                options={
                    controlOptions.map((option) => ({
                        value: option,
                        label: option,
                    })) || []
                }
                size="small"
                {...controlProps}
            />
        );
    }

    if (controlType === 'boolean')
        return (
            <label data-testid={`${prop.name}-Switch`}>
                <Switch checked={!!controlProps.value} {...controlProps} />
            </label>
        );

    return null;
}

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
