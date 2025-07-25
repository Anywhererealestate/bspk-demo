import { CheckboxGroup } from '@bspk/ui/CheckboxGroup';
import { ListboxItemProps } from '@bspk/ui/Listbox/Listbox';
import { NumberInput } from '@bspk/ui/NumberInput';
import { RadioGroup } from '@bspk/ui/RadioGroup';
import { SearchBar } from '@bspk/ui/SearchBar/SearchBar';
import { Select } from '@bspk/ui/Select';
import { Switch } from '@bspk/ui/Switch';
import { TextInput } from '@bspk/ui/TextInput';
import { Textarea } from '@bspk/ui/Textarea';
import { TypePropertyDemoWithControls } from '@bspk/ui/utils/demo';
import { useId, useState } from 'react';
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
                        data-testid={`${prop.name}-Input`}
                        disabled={prop.disabled}
                        size="small"
                        {...controlProps}
                        readOnly={readOnly}
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
                data-testid={`${prop.name}-Input`}
                disabled={prop.disabled}
                id=""
                size="small"
                type="text"
                {...controlProps}
                readOnly={readOnly}
            />
        );

    const controlOptions: string[] = prop.options?.map((o) => o.toString()) || [];

    const options =
        controlOptions?.map((option) => ({
            value: option,
            label: option,
        })) || [];

    if (!prop.required && !prop.default) options.unshift({ value: undefined as unknown as string, label: 'None' });

    if (type === 'BspkIcon') return <BspkIconSelect onChange={onChange} value={controlProps.value} />;

    if (type === 'checkboxes') {
        return (
            <CheckboxGroup
                data-testid={`${prop.name}-CheckboxGroup`}
                disabled={prop.disabled}
                options={options}
                {...controlProps}
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
                        onChange={(next) => onChange(next[0])}
                        readOnly={readOnly}
                        value={[controlProps.value].filter((v) => v !== undefined)}
                    />
                </>
            );

        return (
            <RadioGroup data-testid={`${prop.name}-RadioGroup`} options={options} showLabel={false} {...controlProps} />
        );
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
            aria-label=""
            items={ICONS.filter((icon) => {
                return !searchValue || `${icon.name} ${icon.type} ${icon.alias}`.includes(searchValue);
            })
                .filter((icon, index) => index < 10)
                .map((icon) => ({
                    value: icon.name,
                    label: icon.name,
                }))}
            name=""
            onChange={setSearchValue}
            onSelect={function (item?: ListboxItemProps): void {
                onChange(item?.value || '');
                setSearchValue(item?.label || '');
            }}
            placeholder=""
            size="small"
            value={searchValue}
        />
    );
}

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
