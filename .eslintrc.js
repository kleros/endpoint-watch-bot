module.exports = {
  // Plugins
  plugins: ['unicorn'],

  // Extends
  extends: [
    'plugin:unicorn/recommended', // unicorn
    'plugin:prettier/recommended', // prettier overrides,
    "prettier-standard/prettier-file"
  ],

  // Rule Overrides
  rules: {
    // Generic JS
    'no-unused-vars': [
      2,
      {
        vars: 'all',
        args: 'all',
        ignoreRestSiblings: false,
        caughtErrors: 'all',
        varsIgnorePattern: '^_',
        argsIgnorePattern: '^_'
      }
    ],
    'prefer-const': 2,
    'arrow-body-style': [2, 'as-needed'],
    curly: [2, 'multi'],
    'padding-line-between-statements': [
      2,
      { blankLine: 'never', prev: 'import', next: 'import' }
    ],
    'no-useless-concat': 2,
    'prefer-template': 2,

    // unicorn
    'unicorn/no-fn-reference-in-iterator': 0, // Allows [].map(func)
    'unicorn/catch-error-name': 0,
    'unicorn/prevent-abbreviations': 'off',
    'unicorn/no-process-exit': 'off',

    // import
    'import/no-unresolved': 2,
    'import/named': 2,
    'import/default': 2,
    'import/namespace': 2,
    'import/no-named-as-default': 2,
    'import/no-named-as-default-member': 2,
    'import/no-extraneous-dependencies': 2,
    'import/newline-after-import': 2,
    'import/no-named-default': 2,
    'import/no-useless-path-segments': 2,

    // JSDoc
    'require-jsdoc': [
      2,
      {
        require: {
          FunctionDeclaration: true,
          MethodDefinition: false,
          ClassDeclaration: false,
          ArrowFunctionExpression: false,
          FunctionExpression: false
        }
      }
    ],
    'valid-jsdoc': [
      2,
      {
        prefer: {
          arg: 'param',
          argument: 'param',
          class: 'class',
          return: 'returns',
          virtual: 'abstract'
        },
        preferType: {
          Boolean: 'boolean',
          Number: 'number',
          Object: 'object',
          String: 'string'
        },
        requireReturn: false,
        requireReturnType: true,
        matchDescription: '.+',
        requireParamDescription: true,
        requireReturnDescription: true
      }
    ],

    // prettier
    'prettier/prettier': [
      2,
      {
        semi: false,
        singleQuote: true,
        tabWidth: 2
      }
    ]
  }
}
