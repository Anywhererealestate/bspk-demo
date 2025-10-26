# Getting Started

This website is built entirely with the components, icons, styles, and utilities from the Bespoke Design System. We proudly "eat our own dogfood"—see what that means [here](https://en.wikipedia.org/wiki/Eating_your_own_dog_food)! 🐶 The site is continuously updated as new features, components, and designs are added to Bespoke.

You can find our repositories at [https://github.com/Anywhererealestate](https://github.com/Anywhererealestate). While they are currently private, we plan to make them public soon.

Interested in contributing to the Bespoke Design System or have feedback about this website or any of our packages? Contact us at <a target="_blank" href="mailto:bspk.dev@anywhere.re">bspk.dev@anywhere.re</a>, or, if you're an internal user, reach out on Teams.

## @bspk/ui

```bash
npm install @bspk/ui
```

The `@bspk/ui` package provides all React components, hooks, and utilities needed for development teams. It automatically includes all styles from `@bspk/styles`, so you don't need to install `@bspk/styles` separately. To apply styles, wrap your app with a <a href="/styles#style-providers">StyleProvider</a>. Explore the available components on the <a data-testid="components-link" href="/components">components page</a>.

## @bspk/icons

```bash
npm install @bspk/icons
```

The `@bspk/icons` package provides a comprehensive set of icons for development teams. Browse the full icon library on the <a data-testid="icons-link" href="/icons">icons page</a>.

## @bspk/styles

```bash
npm install @bspk/styles
```

The `@bspk/styles` package is typically not used directly unless you are building with something other than React or need to access raw stylesheets and utilities. It contains all the foundational styles and utilities, based on the latest Bespoke design tokens from Figma. You can browse the available stylesheets on the <a data-testid="styles-link" href="/style">styles page</a>.

### Versioning

All packages follow [semantic versioning](https://semver.org/) and are published automatically to NPM using [semantic release](https://github.com/semantic-release/semantic-release) via GitHub Actions. This ensures that every change is versioned and released consistently through our CI/CD pipelines.

<!--- Copyright 2025 Anywhere Real Estate - CC BY 4.0 -->
