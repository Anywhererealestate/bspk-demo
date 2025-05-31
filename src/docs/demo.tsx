import { ListItem } from '@bspk/ui/ListItem';
import { Tag } from '@bspk/ui/Tag';
import { Page } from 'components/Page';

export function Demo() {
    return (
        <Page>
            <h1>Demo</h1>
            <ListItem label="hello world" trailing={<Tag>ok</Tag>} />
            <Tag>nope</Tag>
        </Page>
    );
}

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
