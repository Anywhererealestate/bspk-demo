/**
 * Prompt: Generate metadata for all blocks in the demo system looking for files in the src/blocks folders Each block
 * should have a name, description, and examples with label and code
 *
 * Should parse this:
 *
 * <Block description="Headers are used to introduce sections and pages. They help users understand the content and
 * context of the page." name="Page Headers" > <BlockExample name="Default"> <Layout direction="column" gap="8" style={{
 * padding: '16px' }}> <Txt variant="heading-h3">Dashboard</Txt> <Txt variant="body-base">Welcome back, here is an
 * overview of your activity.</Txt> </Layout> </BlockExample> </Block>
 *
 * As this:
 *
 * { name: 'Page Headers', description: 'Headers are used to introduce sections and pages. They help users understand
 * the content and context of the page.', examples: [ { label: "Default", code: `<Layout direction="column" gap="8"
 * style={{ padding: '16px' }}> <Txt variant="heading-h3">Dashboard</Txt> <Txt variant="body-base">Welcome back, here is
 * an overview of your activity.</Txt> </Layout>` } }
 *
 *     $ npx vite-node .scripts/tasks/generateBlocksMeta.ts
 */

import fs from 'fs';
import path from 'path';

type Block = {
    name: string;
    description?: string;
    examples: { name: string; description?: string; code: string }[];
};

const blocksDir = path.join(__dirname, '../../src/blocks');
const outputFilePath = path.join(__dirname, '../../src/meta/blocks-meta.json');

const blocks: Block[] = fs.readdirSync(blocksDir).map((file): Block => {
    const blockPath = path.join(blocksDir, file);
    const blockFileContent = fs
        .readFileSync(blockPath, 'utf-8')
        .replace(/>[\s|\n]+</g, '><')
        .split('\n')
        .map((line) => line.trim())
        .join(' '); // Remove newlines between tags for easier parsing');
    // get only area between <Block ...>...</Block>

    const blockContent = blockFileContent.match(/<Block\s([\s\S]*?)<\/Block>/)?.[0];
    if (!blockContent) {
        console.error(`No <Block> found in ${file}`);

        return { name: 'Unknown', examples: [] };
    }

    // parse the blockContent like XML to get name and description from <Block ...> and examples from <BlockExample ...>
    const nameMatch = blockContent.match(/name=["|']([\s\S]*?)["|']/);
    const descriptionMatch = blockContent.match(/description=["|']([\s\S]*?)["|']/);
    const name = nameMatch ? nameMatch[1] : 'Unknown';
    const description = descriptionMatch ? descriptionMatch[1] : undefined;

    const exampleMatches = Array.from(blockContent.matchAll(/<BlockExample\s([\s\S]*?)<\/BlockExample>/g));
    const examples = exampleMatches.map((exampleMatch) => {
        const exampleContent = exampleMatch[0];
        const exampleNameMatch = exampleContent.match(/name=["|']([\s\S]*?)["|']/);
        const exampleDescriptionMatch = exampleContent.match(/description=["|']([\s\S]*?)["|']/);
        const exampleName = exampleNameMatch ? exampleNameMatch[1] : 'Unknown';
        const exampleDescription = exampleDescriptionMatch ? exampleDescriptionMatch[1] : undefined;

        // get the inner code of the BlockExample
        const codeMatch = exampleContent.match(/<BlockExample\s[\s\S]*?>([\s\S]*?)<\/BlockExample>/);
        const code = codeMatch ? codeMatch[1].trim() : '';

        return {
            name: exampleName,
            description: exampleDescription,
            code,
        };
    });

    return {
        name,
        description,
        examples,
    };
});

fs.writeFileSync(outputFilePath, JSON.stringify(blocks, null, 4), 'utf-8');

console.log(`Generated blocks metadata for ${blocks.length} blocks at ${outputFilePath}`);
