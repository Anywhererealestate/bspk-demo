import { Brand } from '@bspk/ui/types/common';
import { lazy, LazyExoticComponent, Suspense, ComponentType } from 'react';

const BRAND_STYLES_PROVIDERS: Record<Brand, LazyExoticComponent<ComponentType>> = {
    anywhere: lazy(() =>
        import('@bspk/ui/StylesProviderAnywhere').then(({ StylesProviderAnywhere }) => ({
            default: StylesProviderAnywhere,
        })),
    ),
    'better-homes-gardens': lazy(() =>
        import('@bspk/ui/StylesProviderBetterHomesGardens').then(({ StylesProviderBetterHomesGardens }) => ({
            default: StylesProviderBetterHomesGardens,
        })),
    ),
    'century-21': lazy(() =>
        import('@bspk/ui/StylesProviderCentury21').then(({ StylesProviderCentury21 }) => ({
            default: StylesProviderCentury21,
        })),
    ),
    'coldwell-banker': lazy(() =>
        import('@bspk/ui/StylesProviderColdwellBanker').then(({ StylesProviderColdwellBanker }) => ({
            default: StylesProviderColdwellBanker,
        })),
    ),
    corcoran: lazy(() =>
        import('@bspk/ui/StylesProviderCorcoran').then(({ StylesProviderCorcoran }) => ({
            default: StylesProviderCorcoran,
        })),
    ),
    era: lazy(() =>
        import('@bspk/ui/StylesProviderEra').then(({ StylesProviderEra }) => ({
            default: StylesProviderEra,
        })),
    ),
    'denali-boss': lazy(() =>
        import('@bspk/ui/StylesProviderDenaliBoss').then(({ StylesProviderDenaliBoss }) => ({
            default: StylesProviderDenaliBoss,
        })),
    ),
    cartus: lazy(() =>
        import('@bspk/ui/StylesProviderCartus').then(({ StylesProviderCartus }) => ({
            default: StylesProviderCartus,
        })),
    ),
    sothebys: lazy(() =>
        import('@bspk/ui/StylesProviderSothebys').then(({ StylesProviderSothebys }) => ({
            default: StylesProviderSothebys,
        })),
    ),
};

/**
 * Utility to provide the brand agnostic styles to the application.
 *
 * @name StylesProvider
 */
function StylesProvider({ brand = 'anywhere' }: { brand: Brand }) {
    const LazyLoadedStyleProvider = BRAND_STYLES_PROVIDERS[brand];

    return (
        <Suspense fallback={<></>}>
            <LazyLoadedStyleProvider />
        </Suspense>
    );
}

StylesProvider.bspkName = 'StylesProvider';

export { StylesProvider };

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
