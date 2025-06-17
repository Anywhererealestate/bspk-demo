import { Table, TableColumn } from '@bspk/ui/Table';
import { Tag } from '@bspk/ui/Tag';
import { Txt } from '@bspk/ui/Txt';
import { TypePropertyDemo, TypePropertyDemoWithControls } from '@bspk/ui/demo/utils';
import { updateComponentContext } from 'components/ComponentProvider';
import { Markup } from 'components/Markup';
import { TypePropControl } from 'components/TypePropControl';
import { useMemo } from 'react';
import { PROPERTY_NAME_CUSTOM_SORT } from 'src/config';

const hasPropTypeControl = (prop: TypePropertyDemo) =>
    Boolean(
        prop.type === 'icon' ||
            prop.type === 'multiline' ||
            prop.type === 'string' ||
            prop.type === 'string,boolean' ||
            prop.type === 'number' ||
            prop.type === 'boolean' ||
            (Array.isArray(prop.type) && prop.type.join() === 'string,boolean') ||
            prop.options,
    );

const propsWithControls = (prop: TypePropertyDemo) => {
    const nextProp: TypePropertyDemoWithControls = {
        ...prop,
        typeOptions: [],
        haveControl: hasPropTypeControl(prop),
        multiline: prop.type === 'multiline',
        libraryDefault: prop.default,
    };
    if (nextProp.type === 'multiline') nextProp.type = 'string';
    if (nextProp.type === 'string,boolean') nextProp.type = ['string', 'boolean'];

    nextProp.typeOptions = nextProp.type ? [nextProp.type].flat() : nextProp.options;

    return nextProp;
};

export function TypeProps({ props, state }: { props: TypePropertyDemo[]; state?: Record<string, any> }) {
    const showControls = !!state;

    const propsWithControl = useMemo(() => props.map(propsWithControls), [props]);

    // Sort props by
    // 1. whether they are editable (have a control)
    // 2. whether they are required
    // 3. alphabetically
    propsWithControl.sort((a, b) => {
        if (!a.haveControl !== !b.haveControl) return !a.haveControl > !b.haveControl ? 1 : -1;

        if (!a.required !== !b.required) return !a.required > !b.required ? 1 : -1;

        const propertyNameSort = PROPERTY_NAME_CUSTOM_SORT.find((arr) => arr.includes(a.name) && arr.includes(b.name));

        if (propertyNameSort) {
            const aIndex = propertyNameSort.indexOf(a.name);
            const bIndex = propertyNameSort.indexOf(b.name);
            return aIndex - bIndex;
        }

        return a.name.localeCompare(b.name);
    });

    const columns: TableColumn[] = useMemo(
        // auto 1fr auto 180px
        () => [
            {
                key: 'name',
                label: 'Name',
                width: 'auto',
            },
            {
                key: 'description-type',
                label: 'Description / Type',
                width: '1fr',
            },
            {
                key: 'default',
                label: 'Default',
                width: 'auto',
            },
            ...(showControls
                ? [
                      {
                          key: 'controls',
                          label: 'Controls',
                          width: '180px',
                      },
                  ]
                : []),
        ],
        [showControls],
    );

    return (
        <>
            <Table
                columns={columns}
                data-hide-controls={!showControls}
                data-props
                data-type-props
                rows={propsWithControl.map((prop) => {
                    return {
                        name: (
                            <>
                                <Txt as="div" variant="labels-small">
                                    {prop.name}
                                </Txt>
                                {prop.required && (
                                    <Tag color="red" size="x-small">
                                        required
                                    </Tag>
                                )}
                            </>
                        ),
                        'description-type': (
                            <>
                                <Markup data-description>{prop.description}</Markup>
                                <div data-type-options>
                                    {prop.typeOptions?.map((o) => (
                                        <Tag
                                            color="grey"
                                            key={`${o}1`}
                                            size="x-small"
                                            variant="flat"
                                            wrap={typeof o === 'string' && o?.includes('=>')}
                                        >
                                            {o.toString()}
                                        </Tag>
                                    ))}
                                </div>
                                {'minimum' in prop && (
                                    <Txt
                                        as="div"
                                        style={{
                                            fontStyle: 'italic',
                                            color: 'var(--foreground-neutral-on-surface-variant-02)',
                                        }}
                                        variant="labels-small"
                                    >{`Minimum: ${prop.minimum}`}</Txt>
                                )}
                                {'maximum' in prop && (
                                    <Txt
                                        as="div"
                                        style={{
                                            fontStyle: 'italic',
                                            color: 'var(--foreground-neutral-on-surface-variant-02)',
                                        }}
                                        variant="labels-small"
                                    >{`Maximum: ${prop.maximum}`}</Txt>
                                )}
                            </>
                        ),
                        default: (
                            <>
                                {typeof prop.libraryDefault === 'undefined' ? (
                                    <Tag color="grey" size="x-small" variant="flat">
                                        None
                                    </Tag>
                                ) : (
                                    <Tag color="primary" size="x-small" variant="flat">
                                        {prop.libraryDefault?.toString()}
                                    </Tag>
                                )}
                            </>
                        ),
                        controls: showControls && (
                            <TypePropControl
                                onChange={(nextValue) => updateComponentContext({ [prop.name]: nextValue })}
                                prop={prop}
                                value={state[prop.name]}
                            />
                        ),
                    };
                })}
            />
        </>
    );
}

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
