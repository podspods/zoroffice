module.exports = {
  plugins: ['@systran/systran'],
  extends: [
    'plugin:@systran/eslint-plugin-systran/common',
    'plugin:@systran/eslint-plugin-systran/react',
    'plugin:@next/next/recommended',
    'plugin:storybook/recommended'
  ],
  root: true,
  env: {
    node: true,
    es6: true
  },
  overrides: [
    {
      files: ['*.{ts,tsx}'],
      extends: ['plugin:@systran/eslint-plugin-systran/typescript'],
      parserOptions: {
        project: './tsconfig.json',
        tsconfigRootDir: __dirname
      },
      rules: {
        // Rules that we locally want or definitely don't want
        'no-param-reassign': 'off',
        'no-catch-shadow': 'off',
        // Rules that are almost impossible to enable here, but we would like to enable them
        // We may consider activating them in subfolders
        '@typescript-eslint/no-unsafe-assignment': 'off',
        '@typescript-eslint/no-unsafe-member-access': 'off',
        '@typescript-eslint/no-unsafe-return': 'off',
        '@typescript-eslint/no-unsafe-argument': 'off',
        '@typescript-eslint/no-explicit-any': 'off',
        // Rules with many false positives (to be checked before activating)
        'react/no-unused-prop-types': 'off',
        // Rules that should be activated soon after some code changes
        '@typescript-eslint/no-non-null-assertion': 'warn',
        '@typescript-eslint/no-misused-promises': 'warn',
        '@typescript-eslint/unbound-method': 'warn',
        '@typescript-eslint/no-floating-promises': 'warn',
        // Rules to activate as soon as possible
        '@typescript-eslint/ban-types': 'warn',
        '@typescript-eslint/no-unused-expressions': 'warn',
        '@typescript-eslint/no-empty-function': 'warn',
        '@typescript-eslint/restrict-template-expressions': 'warn',
        '@typescript-eslint/no-unsafe-call': 'warn',
        '@typescript-eslint/no-this-alias': 'warn',
        '@typescript-eslint/require-await': 'warn',
        '@typescript-eslint/await-thenable': 'warn',
        '@typescript-eslint/restrict-plus-operands': 'warn',
        'react/no-unknown-property': 'warn',
        'react/no-deprecated': 'warn',
        'react/prop-types': 'warn',
        'react/jsx-fragments': 'warn',
        'react/react-in-jsx-scope': 'warn',
        'react/sort-comp': 'warn',
        'react/no-array-index-key': 'warn',
        'class-methods-use-this': 'warn'
      }
    },
    {
      files: ['*.stories.tsx'],
      extends: ['plugin:storybook/csf-strict'],
      rules: {
        '@typescript-eslint/require-await': 'off',
        '@typescript-eslint/no-empty-function': 'off',
        'storybook/await-interactions': 'error',
        'storybook/context-in-play-function': 'error',
        'storybook/csf-component': 'error',
        'storybook/default-exports': 'error',
        'storybook/hierarchy-separator': 'error',
        'storybook/no-redundant-story-name': 'error',
        'storybook/no-stories-of': 'error',
        'storybook/no-title-property-in-meta': 'error',
        'storybook/no-uninstalled-addons': 'error',
        'storybook/prefer-pascal-case': 'error',
        'storybook/story-exports': 'error',
        'storybook/use-storybook-expect': 'error',
        'storybook/use-storybook-testing-library': 'error'
      }
    }
  ]
};
