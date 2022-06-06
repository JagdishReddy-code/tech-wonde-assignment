module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    tsconfigRootDir : __dirname, 
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint/eslint-plugin'],
  extends: [
    'plugin:@typescript-eslint/recommended'
  ],
  root: true,
  env: {
    node: true,
    jest: true,
  },
  ignorePatterns: ['.eslintrc.js'],
  rules: {
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/explicit-function-return-type': [
      'error',
      {
          'allowExpressions': true,
          'allowTypedFunctionExpressions': true,
          'allowHigherOrderFunctions': true,
          'allowDirectConstAssertionInArrowFunctions': true,
          'allowConciseArrowFunctionExpressionsStartingWithVoid': false
      }
    ],
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    'no-unused-vars': 'off',
        '@typescript-eslint/no-unused-vars': ['error'],
        'require-await': 'off',
        '@typescript-eslint/require-await': 'error',
        'space-infix-ops': ['error'],
        '@typescript-eslint/naming-convention': [
            'error',
            {
                'selector': ['variable', 'property', 'classProperty'],
                'format': ['UPPER_CASE'],
                'modifiers': ['static', 'readonly']
            },
            {
                'selector': ['enumMember'],
                'format': ['UPPER_CASE'],
            },
            {
                'selector': ['variableLike', 'memberLike', 'property', 'method'],
                'format': ['camelCase', 'strictCamelCase'],
                'filter': {
                    // Exclude defining NestJS Schema
                    'regex': '.*Schema$',
                    'match': false
                },
            },
            {
                'selector': ['class', 'interface', 'enum'],
                'format': ['PascalCase', 'StrictPascalCase'],
            }
        ],
        indent: 'off',
        '@typescript-eslint/indent': ['error', 4, {
            'FunctionDeclaration': {
                'body': 1,
                'parameters': 'first',
            },
            'FunctionExpression': {
                'body': 1,
                'parameters': 'first',
            },
            'ignoredNodes': ['Decorator']
        }],
        camelcase: 'error',
        curly: 'error',
        'quote-props': [
            'error',
            'consistent'
        ],
        'quotes': [
            'error',
            'single'
        ],
        'brace-style': ['error', '1tbs', {allowSingleLine: false}],
        'keyword-spacing': ['error', {before: true, after: true}],
        'linebreak-style': ['error', 'unix'],
        'object-curly-spacing': 'off',
        'object-curly-newline': [
            'error',
            {
                ObjectExpression: {consistent: true},
                ObjectPattern: {multiline: true},
                ImportDeclaration: {multiline: true},
                ExportDeclaration: {multiline: true, minProperties: 3}
            }
        ],
        /*'require-jsdoc': ['error', {
            require: {
                FunctionDeclaration: true,
                MethodDefinition: true,
                ClassDeclaration: true,
            },
        }],*/
        'max-len': ['error', {'code': 120}],
        'padded-blocks': ['error', {'classes': 'always', 'blocks': 'never'}],
        'no-multiple-empty-lines': ['error', {max: 1, maxEOF: 0}],
        'valid-jsdoc': ['error', {
            requireParamDescription: false,
            requireReturnDescription: false,
            requireReturn: false,
            requireParamType: false,
            requireReturnType: false,
            prefer: {returns: 'return'},
        }],
  },
};
