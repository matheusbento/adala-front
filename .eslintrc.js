module.exports = {
  env: {
    browser: true,
    es2021: true,
    jest: true,
    'cypress/globals': true,
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
    'plugin:cypress/recommended',
    'plugin:chai-friendly/recommended',
    'plugin:prettier/recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: [
    'react',
    'react-hooks',
    'prettier',
    'eslint-plugin-import-helpers',
    'unused-imports',
    'cypress',
    'chai-friendly',
  ],
  rules: {
    'import-helpers/order-imports': [
      'warn',
      {
        newlinesBetween: 'ignore',
        groups: [
          '/^react$/',
          'module',
          '/^components/',
          '/^constants/',
          '/^helpers/',
          '/^hooks/',
          '/^processes/',
          '/^reducers/',
          '/^routers/',
          '/^selectors/',
          '/^services/',
          '/^types/',
          '/^utils/',
          '/^views/',
          [('parent', 'sibling', 'index')],
        ],
        alphabetize: {
          order: 'asc',
          ignoreCase: true,
        },
      },
    ],
    'jsx-a11y/label-has-associated-control': [
      'warn',
      {
        labelComponents: [],
        labelAttributes: [],
        controlComponents: ['Field'],
        assert: 'either',
        depth: 3,
      },
    ],
    // using warnings because it has some bugs
    'max-len': 'warn',
    'no-underscore-dangle': [
      'error',
      {
        allow: ['__REDUX_DEVTOOLS_EXTENSION__'],
      },
    ],
    'no-unused-expressions': [
      'error',
      {
        allowShortCircuit: true,
      },
    ],
    'import/no-unresolved': 'off',
    'object-curly-newline': 'off',
    'prettier/prettier': 'error',
    'react/jsx-filename-extension': [
      1,
      {
        extensions: ['.js', '.jsx', '.tsx'],
      },
    ],
    'react/sort-comp': 'off',
    'react/jsx-props-no-spreading': 'off',
    'react/jsx-uses-react': 'off',
    'react/react-in-jsx-scope': 'off',
    'react-hooks/exhaustive-deps': 'warn',
    'react-hooks/rules-of-hooks': 'error',
    'unused-imports/no-unused-imports': 'warn',
    'valid-typeof': 'off',
    'no-use-before-define': 'off',
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        ts: 'never',
        tsx: 'never',
        js: 'never',
        jsx: 'never',
      },
    ],
    '@typescript-eslint/no-use-before-define': ['error'],
    '@typescript-eslint/naming-convention': [
      'error',
      {
        selector: 'interface',
        format: ['PascalCase'],
        prefix: ['I'],
      },
      {
        selector: 'typeAlias',
        format: ['PascalCase'],
        suffix: ['Type'],
      },
    ],
    'import/no-extraneous-dependencies': 'off',
    'cypress/no-assigning-return-values': 'error',
    'cypress/no-unnecessary-waiting': 'error',
    'cypress/assertion-before-screenshot': 'warn',
    'cypress/no-force': 'warn',
    'cypress/no-async-tests': 'error',
    'cypress/no-pause': 'error',
    'chai-friendly/no-unused-expressions': [
      'error',
      {
        allowShortCircuit: true,
      },
    ],
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
    },
  },
  overrides: [
    {
      files: [
        '*.test.js',
        '*.stories.js',
        '*.test.tsx',
        '*.stories.tsx',
        '*.test.ts',
        '*.stories.ts',
      ],
      rules: {
        'react/jsx-uses-react': 'error',
        'unused-imports/no-unused-imports': 'off',
        'react/prop-types': 'off',
        camelcase: 'off',
        'no-alert': 'off',
      },
    },
    {
      files: ['*.ts', '*.tsx'],
      extends: ['plugin:@typescript-eslint/recommended'],
      plugins: ['@typescript-eslint'],
      rules: {
        'react/prop-types': 'off',
      },
    },
    {
      files: ['*.stories.js'],
      rules: {
        'no-console': 'off',
        'no-alert': 'off',
      },
    },
  ],
};
