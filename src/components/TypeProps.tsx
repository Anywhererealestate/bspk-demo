import { Table, TableColumn } from '@bspk/ui/Table';
import { Tag } from '@bspk/ui/Tag';
import { Txt } from '@bspk/ui/Txt';
import { css } from '@emotion/react';
import { Fragment, useCallback, useMemo } from 'react';

import { PROPERTY_NAME_CUSTOM_SORT } from '../config';
import { TypePropertyExample, TypePropertyExampleWithControls } from '../types';

import { updateComponentState } from './ComponentStateProvider';
import { LinkUp } from './LinkUp';
import { Markup } from './Markup';
import { TypePropControl } from './TypePropControl';

export function hasPropTypeControl(prop: TypePropertyExample) {
    const type = prop.controlType || prop.type;

    return Boolean(
        prop.properties ||
            type === 'icon' ||
            type === 'multiline' ||
            type === 'string' ||
            type === 'number' ||
            type === 'boolean' ||
            prop.options,
    );
}

export function TypeProps({ props, state }: { props: TypePropertyExample[]; state?: Record<string, any> }) {
    const showControls = !!state;

    const propsWithControls = useCallback((prop: TypePropertyExample) => {
        const nextProp: TypePropertyExampleWithControls = {
            ...prop,
            typeOptions: [],
            haveControl: hasPropTypeControl(prop),
            multiline: prop.type === 'multiline',
            properties: prop.properties?.map(propsWithControls),
        };
        if (nextProp.type === 'multiline') nextProp.type = 'string';

        nextProp.typeOptions = nextProp.type ? [nextProp.type].flat() : nextProp.options;

        return nextProp;
    }, []);

    const propsWithControl = useMemo(() => props.map(propsWithControls), [props, propsWithControls]);

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
                label: 'Type / Description',
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
                css={style}
                data-hide-controls={!showControls}
                data-props
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
                                <div data-type-options>
                                    {prop.typeOptions?.map((o) => (
                                        <Tag
                                            color="grey"
                                            key={`${o}1`}
                                            size="x-small"
                                            variant="flat"
                                            wrap={typeof o === 'string' && o?.includes('=>')}
                                        >
                                            <LinkUp>{o.toString()}</LinkUp>
                                        </Tag>
                                    ))}
                                </div>
                                <Markup data-description>{prop.description}</Markup>
                                {'minimum' in prop && (
                                    <Txt
                                        as="div"
                                        color="neutral-low-contrast"
                                        variant="labels-small"
                                    >{`Minimum: ${prop.minimum}`}</Txt>
                                )}
                                {'maximum' in prop && (
                                    <Txt
                                        as="div"
                                        color="neutral-low-contrast"
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
                            <>
                                {prop.properties ? (
                                    (prop.properties as TypePropertyExampleWithControls[]).map(
                                        (childProp) =>
                                            childProp?.haveControl && (
                                                <Fragment key={childProp.name}>
                                                    {/* {!childProp.type?.endsWith('Field') && <Txt variant="labels-small">{childProp.name}</Txt>} */}
                                                    <TypePropControl
                                                        onChange={(nextValue) =>
                                                            updateComponentState({
                                                                ...state,
                                                                [prop.name]: {
                                                                    ...state[prop.name],
                                                                    [childProp.name]: nextValue,
                                                                },
                                                            })
                                                        }
                                                        prop={childProp}
                                                        value={state[prop.name]?.[childProp.name]}
                                                    />
                                                </Fragment>
                                            ),
                                    )
                                ) : (
                                    <TypePropControl
                                        onChange={(nextValue) => updateComponentState({ [prop.name]: nextValue })}
                                        prop={prop}
                                        value={state[prop.name]}
                                    />
                                )}
                            </>
                        ),
                    };
                })}
            />
        </>
    );
}

export const style = css`
    //grid-template-columns: ;

    &[data-hide-controls='true'] {
        grid-template-columns: auto 1fr;
    }

    > div {
        padding: var(--spacing-sizing-04) var(--spacing-sizing-02);

        &:not([data-row-last]) {
            border-bottom: var(--stroke-neutral-low-contrast) solid 1px;
        }
    }

    /* [data-cell='default'] {
    &[data-none] {
      > [data-txt] {
        color: var(--foreground-neutral-disabled-on-surface);
      }
    }
  } */

    /* [data-cell='name'] {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;

    [data-txt] {
      color: var(--foreground-neutral-on-surface);
      font-weight: 500;
    }
  } */

    [data-cell='controls'] {
        display: flex;
        flex-direction: column;
        gap: var(--spacing-sizing-02);
        padding-bottom: var(--spacing-sizing-04);
        position: relative;

        label:empty {
            display: none;
        }
    }

    [data-type-options] {
        display: flex;
        flex-direction: row;
        gap: 0.5rem;
        flex-wrap: wrap;
        max-width: 300px;
    }
`;

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
