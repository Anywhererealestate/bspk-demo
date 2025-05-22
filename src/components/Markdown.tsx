import { Syntax } from 'components/Syntax';
import MarkdownBase, { RuleType } from 'markdown-to-jsx';
import { PrettyParser } from 'utils/pretty.ts';

export function Markdown({ md }: { md: string }) {
    return (
        <MarkdownBase
            options={{
                renderRule(next, node, _, state) {
                    if (node.type === RuleType.codeBlock) {
                        let language: PrettyParser | undefined;

                        if (node.lang === 'tsx') language = 'typescript';
                        if (node.lang === 'ts') language = 'typescript';
                        if (node.lang === 'css') language = 'scss';
                        if (node.lang === 'bash') language = 'bash' as unknown as PrettyParser;

                        return <Syntax code={node.text} key={state.key} language={language} />;
                    }
                    return next();
                },
            }}
        >
            {md}
        </MarkdownBase>
    );
}

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
