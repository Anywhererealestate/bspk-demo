import { Layout } from '@bspk/ui/Layout';
import { Txt } from '@bspk/ui/Txt';
import { Block, BlockExample } from 'src/utils/blocks';

export const example = (
    <Block
        description="Headers are used to introduce sections and pages. They help users understand the content and context of the page."
        name="Page Headers"
    >
        <BlockExample name="Default">
            <Layout direction="column" gap="8" style={{ padding: '16px' }}>
                <Txt variant="heading-h3">Dashboard</Txt>
                <Txt variant="body-base">Welcome back, here is an overview of your activity.</Txt>
            </Layout>
        </BlockExample>
        <BlockExample description="A page header with a subheader to provide additional context." name="With Subheader">
            <Layout direction="column" gap="8" style={{ padding: '16px' }}>
                <Txt variant="heading-h3">Projects</Txt>
                <Txt variant="body-base">Here are the projects you are currently working on.</Txt>
            </Layout>
        </BlockExample>
    </Block>
);
