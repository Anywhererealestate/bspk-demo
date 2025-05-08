import whyDidYouRender from '@welldone-software/why-did-you-render';
import React from 'react';

if (process.env.NODE_ENV === 'development') {
    console.info('whyDidYouRender enabled');
    whyDidYouRender(React, {
        trackAllPureComponents: true,
    });
}

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
