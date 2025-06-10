import { IconName, meta as iconMeta } from '@bspk/icons/meta';
import { CheckboxGroup } from '@bspk/ui/CheckboxGroup';
import { NumberInput } from '@bspk/ui/NumberInput';
import { RadioGroup } from '@bspk/ui/RadioGroup';
import { Select } from '@bspk/ui/Select';
import { Switch } from '@bspk/ui/Switch';
import { TextInput } from '@bspk/ui/TextInput';
import { Textarea } from '@bspk/ui/Textarea';
import { TypePropertyDemoWithControls } from '@bspk/ui/demo/examples';

const IconNameOptions = Object.keys(iconMeta) as IconName[];

export function TypePropControl({
    prop,
    value,
    onChange,
}: {
    value: any;
    onChange: (nextValue: any) => void;
    prop: TypePropertyDemoWithControls;
}) {
    if (!prop) return null;

    const type = prop.type;

    const controlProps = {
        'aria-label': prop.name,
        name: prop.name,
        value,
        onChange,
    };

    if (prop.multiline) return <Textarea id="" {...controlProps} textSize="small" />;

    if (type === 'number')
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

    if (type === 'string' || (Array.isArray(type) && type.join() === 'string,boolean'))
        return <TextInput data-testid={`${prop.name}-Input`} id="" size="small" type="text" {...controlProps} />;

    const controlOptions: string[] =
        type === 'BspkIcon' ? IconNameOptions : prop.options?.map((o) => o.toString()) || [];

    const options =
        controlOptions?.map((option) => ({
            value: option,
            label: option,
        })) || [];

    if (!prop.required && !prop.default) options.unshift({ value: undefined as unknown as string, label: 'None' });

    if (type === 'checkboxes') {
        return (
            <CheckboxGroup
                data-testid={`${prop.name}-CheckboxGroup`}
                options={options}
                {...controlProps}
                values={controlProps.value}
            />
        );
    }

    if (controlOptions.length > 0) {
        if (controlOptions.length > 5 || type === 'select')
            return (
                <>
                    <Select
                        data-testid={`${prop.name}-Dropdown`}
                        id=""
                        options={options}
                        size="small"
                        {...controlProps}
                        onChange={(next) => onChange(next[0])}
                        value={[controlProps.value].filter((v) => v !== undefined)}
                    />
                </>
            );

        return (
            <RadioGroup
                data-testid={`${prop.name}-RadioGroup`}
                label={prop.name}
                options={options}
                showLabel={false}
                {...controlProps}
            />
        );
    }

    if (type === 'boolean')
        return (
            <label data-testid={`${prop.name}-Switch`}>
                <Switch checked={!!controlProps.value} {...controlProps} />
            </label>
        );

    return null;
}

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
