# BSPK Demo Site

Demonstration application for the BSPK design system built with React & Vite. The app is itself built with BSPK components and provides an example of the components and documentation of their interfaces.

See the other BSPK repos this demo site relies on:

 - [BSPK UI](https://github.com/Anywhererealestate/bspk-ui): The main repo for BSPK Design System.
 - [BSPK Icons](https://github.com/Anywhererealestate/bspk-icons): Contains all the icons that are available for Anywhere Real Estate development teams.
 - [BSPK Styles](https://github.com/Anywhererealestate/bspk-styles):  Contains all the styles that are available for Anywhere Real Estate development teams.

## Development

### Local Setup

To run the app locally:
1. Ensure you have `node` installed by running `node -v`.
2. Pull down the repo and run `npm i` from the repo root.
3. Run `npm run dev` to start the application in dev mode.

### Developing dependencies locally
It's useful to be able to make changes to `@bspk/ui` components and see them live in the demo app. To do this we need to replace the `@bspk/ui` folder in the application's `node_modules` with our local copy:

1. Create a `package.json` file in your local `bspk-ui/src` folder 
```
{
    "name": "@bspk/ui"
}
```
2. run `npm link` in the same folder `bspk-ui/src`
3. run `npm link @bspk/ui` in the root of your `bspk-demo/` folder.
4. run `npm run dev`

### Building

To build the application for deployment run `npm run build`. The application will be built to the `./dist` folder.

### Deployment

The app is deployed via Github Actions to Github pages. See [the deployment workflow](.github/workflows/deploy.yml) for details.

### Contribuiting
See the [Contribuiting Guide](src/docs/CONTRIBUTING.md) and [Code of Conduct](src/docs/CODE_OF_CONDUCT.md).

<!--- Copyright 2025 Anywhere Real Estate - CC BY 4.0 -->