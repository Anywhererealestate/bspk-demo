import { Tag } from '@bspk/ui/Tag/Tag';
import { COMPONENT_PHASE_COLORS as color } from '@bspk/ui/constants/phases';
import { type ComponentMeta } from '@bspk/ui/types/meta';
import { Link } from 'react-router-dom';

export function TagComponent({
    component: { name, slug, phase },
}: {
    component: Partial<Pick<ComponentMeta, 'slug'>> & Pick<ComponentMeta, 'name' | 'phase'>;
}) {
    if (phase === 'Backlog' || !slug) return <Tag color={color[phase]} label={name} />;

    return (
        <Link
            title={name}
            to={{
                pathname: `/${slug}`,
            }}
        >
            <Tag color={color[phase]} label={name} />
        </Link>
    );
}
