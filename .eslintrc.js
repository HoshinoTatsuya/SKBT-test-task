module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    sourceType: 'module',
  },
  plugins: [
    '@typescript-eslint/eslint-plugin',
    // "eslint-plugin-tsdoc"
  ],
  extends: [
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
    'airbnb-typescript/base',
    'prettier',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:import/recommended',
    'plugin:import/typescript',
  ],
  root: true,
  env: {
    node: true,
    jest: true,
  },
  ignorePatterns: ['.eslintrc.js'],
  // rules: {
  //   "@typescript-eslint/interface-name-prefix": "off",
  //   "@typescript-eslint/explicit-function-return-type": "off",
  //   "@typescript-eslint/explicit-module-boundary-types": "off",
  //   "@typescript-eslint/no-explicit-any": "off",
  //   "prettier/prettier": ["error", { endOfLine: "auto" }],
  //   "max-len": ["error", { "code": 120, "tabWidth": 2, "ignoreUrls": true }]
  //
  // },
  rules: {
    // "tsdoc/syntax": "warn",
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-useless-constructor': 'off',
    camelcase: 'off',
    'no-unsafe-finally': 'off',
    'import/no-extraneous-dependencies': 'off',
    'import/no-cycle': [
      'error',
      {
        maxDepth: 10,
        ignoreExternal: true,
      },
    ],
    'prettier/prettier': [
      0,
      {
        printWidth: 120,
      },
    ],
    'max-len': [
      1,
      {
        code: 120,
        ignorePattern: '^import .*',
      },
    ],
    'import/no-unresolved': [
      2,
      {
        ignore: ['src/', '@lave/', '@libs/', 'data/'],
        commonjs: true,
        amd: true,
        caseSensitiveStrict: true,
        caseSensitive: true,
      },
    ],
    '@typescript-eslint/lines-between-class-members': 'off',
    'max-classes-per-file': 'off',
    semi: 'off',
    'no-underscore-dangle': 'off',
    'class-methods-use-this': 'off',
    curly: ['error', 'all'],
    'import/prefer-default-export': 'off',
    'array-callback-return': 'error',
    'brace-style': ['error', '1tbs', { allowSingleLine: false }],
    'no-return-await': 'off',
    'no-invalid-this': 'off',
    'no-empty-pattern': 'error',
    'no-magic-numbers': 'off',
    '@typescript-eslint/no-unused-vars': 'error',
    'object-shorthand': ['error', 'always'],
    'space-before-blocks': 'error',
    '@typescript-eslint/array-type': 'off',
    '@typescript-eslint/explicit-function-return-type': 'error',
    '@typescript-eslint/explicit-member-accessibility': ['error', { accessibility: 'explicit' }],
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/naming-convention': [
      'warn',
      {
        selector: 'default',
        format: ['camelCase'],
      },
      {
        selector: 'variable',
        types: ['function'],
        format: ['camelCase', 'PascalCase'],
      },
      {
        selector: 'variable',
        format: ['camelCase', 'UPPER_CASE', 'PascalCase'],
        filter: {
          regex: '^(.*-.*)$',
          match: false,
        },
        leadingUnderscore: 'allow',
      },
      {
        selector: 'enumMember',
        format: ['camelCase', 'PascalCase', 'UPPER_CASE'],
      },
      {
        selector: 'parameter',
        format: ['camelCase'],
        leadingUnderscore: 'allow',
      },
      {
        selector: 'memberLike',
        format: ['camelCase'],
        leadingUnderscore: 'allow',
      },
      {
        selector: 'memberLike',
        format: null,
        filter: {
          regex: '[- ]',
          match: true,
        },
      },
      {
        selector: 'memberLike',
        modifiers: ['private'],
        format: ['camelCase'],
        leadingUnderscore: 'require',
      },
      {
        selector: 'typeLike',
        format: ['PascalCase'],
      },
    ],
    '@typescript-eslint/no-explicit-any': ['error', { ignoreRestArgs: true }],
    '@typescript-eslint/no-invalid-this': 'error',
    '@typescript-eslint/no-require-imports': 'error',
    '@typescript-eslint/no-for-in-array': 'error',
    '@typescript-eslint/no-misused-promises': 'error',
    '@typescript-eslint/no-magic-numbers': [
      'error',
      {
        ignoreEnums: true,
        ignoreArrayIndexes: true,
        ignoreNumericLiteralTypes: true,
        ignoreReadonlyClassProperties: true,
        ignore: [0, 1, -1, 2],
      },
    ],
    '@typescript-eslint/return-await': ['error', 'always'],
    '@typescript-eslint/semi': ['error', 'never'],
    'import/order': [
      'error',
      {
        alphabetize: { order: 'asc' },
        'newlines-between': 'always',
        groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index', 'object'],
      },
    ],
    'no-restricted-syntax': 'off',
    'dot-notation': 'off',
    '@typescript-eslint/dot-notation': 'off',
  },
  overrides: [
    {
      // enable the rule specifically for TypeScript files
      files: ['src/**/*.ts'],
      rules: {
        '@typescript-eslint/explicit-module-boundary-types': ['error'],
      },
    },
  ],
}
