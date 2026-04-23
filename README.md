<p align="center">
    <img src="img/icon.png" alt="GUI 4 Vega"/>
</p>

**GUI 4 Vega** is a React component library that provides a user-friendly interface for creating and customizing [Vega](https://vega.github.io/vega/) visualizations.

Refer either to this README or [GUI 4 Vega Documentation](https://relisa.github.io/Vega-GUI/).

## Features
- **React Component**: Easy integration into any React project via `@relisa/gui4vega` package hosted on GitHub Packages registry.
- **UI Frameworks Integration**: Examples provided for [Ant Design](https://ant.design/) (`demo_antd`) and [Bootstrap](https://react-bootstrap.netlify.app/) (`demo_bootstrap`).
- **Embedded Text Editor**: Interactive JSON editor powered by [CodeMirror](https://codemirror.net/).
- **Wizard Tab**: Step-by-step interface to easily generate sample visualizations and configure simple graphs.
- **Data and Signals Editors**: Panels to visually manage, inspect, and tweak Vega data sources and signals without writing JSON manually.
- **Spec Import and Export**: Load existing Vega JSON specifications or export your creations for use in other projects.
- **Data Import**: Built-in support for CSV and JSON data import via [Papa Parse](https://www.papaparse.com/).
- **Customizable Layout**: Layout with resizable panels for the editor and visualization, supporting light and dark themes via Ant Design GlobalToken.

![GUI 4 Vega](img/intro.gif)

## Requirements
- Node.js >= 18.x
- React >= 18.2.0, 19.0.0
- React DOM >= 18.2.0, 19.0.0

## Run demo applications
Since the demo applications are linked locally to the library, you need to build the library first before running the demos:

```bash
# from root of the repository
cd gui4vega
npm install
npm run build
```

After building the library, you can run either of the demo applications (you dont need to link the library to the demo applications, since they are already linked locally in the repository):

```bash
# from root of the repository
cd demo_antd    # or demo_bootstrap
npm install
npm run dev
```

The applications will be available at `http://localhost:5173` or `http://localhost:5174` respectively.

## Installation
These steps will guide you through the installation of the GUI 4 Vega package in order to include it in your React project.

### Local Installation
To install the package locally, you can clone the repository and build it from source:

```bash
# from root of the repository
cd gui4vega
npm install
npm run build
```

After that you can install the package to your React project:

```bash
cd path/to/your/project
npm install /path/to/gui4vega
```

You should notice in the `package.json` of your project that the dependency is added as a local file path:

```json
"dependencies": {
  "@relisa/gui4vega": "file:../path/to/gui4vega"
}
```

---
You can also consider using `npm link` to link the package globally and then link it to your project, but this approach can be more complex and may lead to issues with dependencies and versioning. For more details refer to the [npm documentation](https://docs.npmjs.com/cli/v9/commands/npm-link).

For local development purposes, consider using Vite and its `alias`. You can refer to the [Vite documentation](https://vite.dev/config/shared-options#resolve-alias) for more details or see the implementation of `vite.config.ts` of both demo applications in the repository.

### GitHub Packages
To install the package, you need access to the GitHub Packages registry.

1. You must request permission from the owner or contributor of the ReliSA GitHub repository hosting GUI 4 Vega package.
2. Create a GitHub Personal Access Token (classic) with the `read:package` scope (no other privileges are required).
3. Create a `.npmrc` file in your project root with the following content (replace the placeholder with your actual token):
   - The `.npmrc` file is also present in the repository.
   - You can also refer to the [GitHub documentation](https://docs.github.com/en/packages/working-with-a-github-packages-registry/working-with-the-npm-registry) for more details about GitHub Packages.

```
@relisa:registry=https://npm.pkg.github.com/
//npm.pkg.github.com/:_authToken=YOUR_GITHUB_TOKEN_WITH_PACKAGE_READ_PERMISSION
```

4. Then, you can install the package in your React project directly using npm:

```bash
npm install @relisa/gui4vega
```

## Importing the Component
To use GUI 4 Vega in your application, simply import the component `VegaEditor` from the package. To access its code via `getCode()` method, you should provide it with a React reference (`ref`).

```typescript
import React, { useRef } from 'react';
import { VegaEditor } from '@relisa/gui4vega';
import type { VegaEditorRef } from '@relisa/gui4vega';

const App = () => {
   // Create a ref to interact with the VegaEditor instance
   // You can access the getCode() method through this ref
   const editorRef = useRef<VegaEditorRef>(null);

   return (
       <VegaEditor ref={editorRef} height='700px' />
   );
};

export default App;
```

---

If you would like to access exported data from the editor in your code, consider using the `ExternalSelectionExporter` component. For its usage, refer to the [GUI 4 Vega Documentation](https://relisa.github.io/Vega-GUI/) or implementation of [demo_antd](https://github.com/ReliSA/Vega-GUI/blob/master/demo_antd/src/pages/EditorPage.tsx), which includes an example of how to use it.