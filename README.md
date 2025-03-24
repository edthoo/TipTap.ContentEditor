# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default tseslint.config({
  extends: [
    // Remove ...tseslint.configs.recommended and replace with this
    ...tseslint.configs.recommendedTypeChecked,
    // Alternatively, use this for stricter rules
    ...tseslint.configs.strictTypeChecked,
    // Optionally, add this for stylistic rules
    ...tseslint.configs.stylisticTypeChecked,
  ],
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default tseslint.config({
  plugins: {
    // Add the react-x and react-dom plugins
    'react-x': reactX,
    'react-dom': reactDom,
  },
  rules: {
    // other rules...
    // Enable its recommended typescript rules
    ...reactX.configs['recommended-typescript'].rules,
    ...reactDom.configs.recommended.rules,
  },
})
```

## New Editor

**Overview**

The editor is primarily built with TipTap react which itself integrates ProseMirror. On top of the main editor, MUI and ShadCN UI components were used and styled with a combination of inline css, css files and tailwind. The complexity of this tech stack is mainly due to the legacy codebase and need to implement updated libraries to improve developer experience and meet the new requirements of the editor.

The editor visibly consists of 2 main parts, the Menu Bar and the Editor itself.

Functions available within the editor includes :
- Font type 
- Font size
- Font style
- Hyper links
- Images
- Youtube embedding
- Text alignment
- Lists

**Menu Bar**

Font Type
- Currently only 3 fonts, Ariel, Inter & Monospace
- Default font is Ariel, Click dropdown to select

Font Size
- Limited font size available for now, hence not able to input custom sizes
- Sizes can be selected in the dropdown menu or using the plus/minus button

Font Style
- Available font style are Bold, Italic, Underline , Strike Through
- Each has it's own toggle button and styles can be merged

Hyper Links
- Usage requires to highlight text and then enter the link in the dropdown menu
- To remove hyper link, click or highlight the text which will update the hyper link button icon to the unlink icon

Images
- Use urls or upload images
- Images cannot be resized
- Uploaded images will be stored as a base64 string

Youtube Embedding
- To embed youtube video, click on the video icon button
- Use ONLY the Youtube video's actual url, do not use the embedded url provided in Youtube's own embed script.

Text Alignment
- The available options are Left, Center, Right & Justify

List
- Only list available are bullet or numbered.
- Lists are only rendered with Left Text Alignment
