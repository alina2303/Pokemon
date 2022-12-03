module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
    "plugin:jsx-a11y/strict",
  ],
  overrides: [
    {
      files: [
        "**/*.test.js",
        "**/*.test.jsx",
        "**/*.test.tsx",
        "**/*.spec.js",
        "**/*.spec.jsx",
        "**/*.spec.tsx",
      ],
      env: {
        jest: true,
      },
    },
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  plugins: [
    "react",
    // 'jsx-a11y', '@typescript-eslint'
  ],
  //   rules: {
  //     'react-hooks/exhaustive-deps': 'error',
  //     'no-var': 'error',
  //     'brace-style': 'error',
  //     'prefer-template': 'error',
  //     radix: 'error',
  //     'space-before-blocks': 'error',
  //     'import/prefer-default-export': 'off',
  //   }
};
