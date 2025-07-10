import anywhereCss from '@bspk/styles/anywhere.css?raw';
import betterHomesGardensCss from '@bspk/styles/better-homes-gardens.css?raw';
import cartusCss from '@bspk/styles/cartus.css?raw';
import century21Css from '@bspk/styles/century-21.css?raw';
import coldwellBankerCss from '@bspk/styles/coldwell-banker.css?raw';
import corcoranCss from '@bspk/styles/corcoran.css?raw';
import denaliBossCss from '@bspk/styles/denali-boss.css?raw';
import eraCss from '@bspk/styles/era.css?raw';
import sothebysCss from '@bspk/styles/sothebys.css?raw';
import { Brand } from '@bspk/ui/types/common';
import { useEffect, useRef } from 'react';

import baseCss from '-/styles/base.scss?raw';

const BRAND_STYLES: Record<Brand, string> = {
    anywhere: anywhereCss,
    'better-homes-gardens': betterHomesGardensCss,
    'century-21': century21Css,
    'coldwell-banker': coldwellBankerCss,
    corcoran: corcoranCss,
    'denali-boss': denaliBossCss,
    cartus: cartusCss,
    era: eraCss,
    sothebys: sothebysCss,
};

/**
 * Utility to provide the brand agnostic styles to the application.
 *
 * @name StylesProvider
 */
function StylesProvider({ brand = 'anywhere' }: { brand: Brand }) {
    const styleElement = useRef<HTMLStyleElement | null>(null);

    useEffect(() => {
        // add baseCss
        const baseStyleElement = document.createElement('style');
        baseStyleElement.textContent = baseCss;
        baseStyleElement.setAttribute('data-bspk-base', 'true');
        document.head.appendChild(baseStyleElement);
    });

    useEffect(() => {
        if (!styleElement.current) {
            styleElement.current = document.createElement('style');
            document.head.appendChild(styleElement.current);
        }

        if (styleElement.current) {
            styleElement.current.textContent = BRAND_STYLES[brand] || BRAND_STYLES.anywhere;
        }

        console.log(brand);

        return () => {
            if (styleElement.current) {
                document.head.removeChild(styleElement.current);
                styleElement.current = null;
            }
        };
    }, [brand]);
}

StylesProvider.bspkName = 'StylesProvider';

export { StylesProvider };

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
