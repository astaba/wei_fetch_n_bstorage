# Locale storage and data fetching

## Local Storage

### Typing `JSON.parse()` input

Don't feed as input an empty string to `JASON.parse()`.

❌ **Wrong**

```typescript
// WRONG
JSON.parse(localStorage.getItem("isOpen")) || false;
// WRONG
JSON.parse(localStorage.getItem("isOpen") || "") || false;
```

✅ **Good**

```typescript
JSON.parse(localStorage.getItem("isOpen") || "false");
```

### Create generic local storage hook

```typescript
import { useEffect, useState } from "react";

const useLocalStorage = <T extends string | object | boolean | null | number>(
  storageKey: string,
  defaulValue: T,
): [T, React.Dispatch<React.SetStateAction<T>>] => {
  const initialValue = JSON.stringify(defaulValue);

  const [value, setValue] = useState<T>(
    JSON.parse(localStorage.getItem(storageKey) || initialValue),
  );

  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(value));
  }, [storageKey, value]);

  return [value, setValue];
};

export default useLocalStorage;
```

## Powered by

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

### Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default {
  // other rules...
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    project: ["./tsconfig.json", "./tsconfig.node.json"],
    tsconfigRootDir: __dirname,
  },
};
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list
