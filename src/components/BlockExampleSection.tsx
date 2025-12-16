import { Flex } from '@bspk/ui/Flex';
import { SegmentedControl } from '@bspk/ui/SegmentedControl';
import { BlockExample } from '@bspk/ui/types/meta';
import { kebabCase } from '@bspk/ui/utils/demo';
import { useState } from 'react';
import { CodePlayground } from './CodePlayground';

export function BlockExampleSection({ name, component, pattern }: BlockExample) {
    const [value, setValue] = useState('component' as 'component' | 'pattern');

    return (
        <Flex direction="column" full gap="16" style={{ margin: 'var(--spacing-sizing-10) 0' }}>
            <Flex align="center" full justify="space-between">
                <h3 id={kebabCase(`section-${name}`)}>{name}</h3>
                <SegmentedControl
                    label="Type"
                    onChange={(next) => setValue(next as 'component' | 'pattern')}
                    options={[
                        { label: 'Component', value: 'component' },
                        { label: 'Pattern', value: 'pattern' },
                    ]}
                    value={value}
                />
            </Flex>
            <CodePlayground defaultCode={value === 'component' ? component : pattern} />
        </Flex>
    );
}
