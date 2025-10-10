import { CheckboxGroup, CheckboxGroupOption } from '@bspk/ui/CheckboxGroup';
import { MenuListItem } from '@bspk/ui/ListItemMenu/ListItemMenu';
import { NumberInput } from '@bspk/ui/NumberInput';
import { RadioGroup, RadioGroupOption } from '@bspk/ui/RadioGroup';
import { SearchBar } from '@bspk/ui/SearchBar/SearchBar';
import { Select } from '@bspk/ui/Select';
import { Switch } from '@bspk/ui/Switch';
import { TextInput } from '@bspk/ui/TextInput';
import { Textarea } from '@bspk/ui/Textarea';
import { useId } from '@bspk/ui/hooks/useId';
import { TypePropertyDemoWithControls } from '@bspk/ui/utils/demo';
import { useState } from 'react';
import { ICONS } from 'src/utils/icons';

export function TypePropControl({
    prop,
    value,
    onChange,
    readOnly = false,
}: {
    value: any;
    onChange: (nextValue: any) => void;
    prop: TypePropertyDemoWithControls;
    readOnly?: boolean;
}) {
    const baseId = useId();

    if (!prop) return null;

    // id props should not be in state as we need to generate a random id when the component is rendered
    if (prop.type === 'string' && (prop.name === 'id' || prop.name.endsWith('Id'))) return null;

    const type = prop.exampleType || prop.type;

    const controlProps = {
        label: prop.name,
        'aria-label': prop.name,
        name: prop.name,
        value,
        onChange,
        readOnly,
    };

    if (prop.multiline) return <Textarea id="" {...controlProps} textSize="small" />;

    if (type === 'number')
        return (
            <NumberInput
                data-testid={`${prop.name}-Input`}
                disabled={prop.disabled}
                id=""
                max={prop.maximum}
                min={prop.minimum}
                size="small"
                {...controlProps}
            />
        );

    if (Array.isArray(type) && type.sort().join() === 'boolean,string') {
        return (
            <label data-testid={`${prop.name}-Switch`}>
                <Switch checked={!!controlProps.value} {...controlProps} />
                {!!controlProps.value && (
                    <TextInput
                        {...controlProps}
                        data-testid={`${prop.name}-Input`}
                        disabled={prop.disabled}
                        readOnly={readOnly}
                        size="small"
                        style={{ marginTop: '10px' }}
                        value={typeof controlProps.value === 'string' ? controlProps.value : ''}
                    />
                )}
            </label>
        );
    }

    if (type === 'string')
        return (
            <TextInput
                {...controlProps}
                data-testid={`${prop.name}-Input`}
                disabled={prop.disabled}
                id={`${baseId}-Input-${prop.name}`}
                readOnly={readOnly}
                size="small"
                type="text"
            />
        );

    const controlOptions: string[] = prop.options?.map((o) => o.toString()) || [];

    const options: (CheckboxGroupOption & MenuListItem & RadioGroupOption)[] =
        controlOptions?.map((option) => ({
            id: option,
            label: option,
            value: option,
            name: option,
        })) || [];

    if (!prop.required && !prop.default)
        options.unshift({ id: undefined as unknown as string, label: 'None', value: '', name: 'None' });

    if (type === 'BspkIcon') return <BspkIconSelect onChange={onChange} value={controlProps.value} />;

    if (type === 'checkboxes') {
        return (
            <CheckboxGroup
                {...controlProps}
                data-testid={`${prop.name}-CheckboxGroup`}
                disabled={prop.disabled}
                options={options}
                readOnly={readOnly}
                values={controlProps.value}
            />
        );
    }

    if (controlOptions.length > 0) {
        if (controlOptions.length > 3 || type === 'select')
            return (
                <>
                    <Select
                        data-testid={`${prop.name}-Select`}
                        disabled={prop.disabled}
                        id={`${baseId}-Select-${prop.name}`}
                        options={options}
                        size="small"
                        {...controlProps}
                        onChange={onChange}
                        readOnly={readOnly}
                        value={controlProps.value}
                    />
                </>
            );

        return <RadioGroup data-testid={`${prop.name}-RadioGroup`} hideLabel options={options} {...controlProps} />;
    }

    if (type === 'boolean')
        return (
            <label data-testid={`${prop.name}-Switch`}>
                <Switch checked={!!controlProps.value} {...controlProps} disabled={readOnly || prop.disabled} />
            </label>
        );

    return null;
}

// eslint-disable-next-line react/no-multi-comp
function BspkIconSelect({ onChange, value }: { onChange: (next: string) => void; value?: string }) {
    const [searchValue, setSearchValue] = useState<string>(value || '');

    return (
        <SearchBar
            aria-label="icon search"
            items={ICONS.filter((icon) => {
                return !searchValue || icon.name.toLowerCase().includes(searchValue.toLowerCase());
            })
                .filter((_, index) => index < 10)
                .map((icon) => ({
                    id: icon.name,
                    value: icon.name,
                    label: icon.name,
                }))}
            name="icon"
            onChange={(next, item) => {
                if (item) onChange(item.label);
                setSearchValue(next);
            }}
            placeholder=""
            size="small"
            value={searchValue}
        />
    );
}

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
