module.exports = {
  env: {
    node: true
  },
  parser: 'vue-eslint-parser',
  plugins: ['vuejs-accessibility', '@typescript-eslint', 'simple-import-sort'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:vue/vue3-recommended',
    'plugin:vuejs-accessibility/recommended',
    'prettier'
  ],
  ignorePatterns: ['*d.ts', '*.min.js'],
  rules: {
    'simple-import-sort/imports': [
      'error',
      {
        groups: [
          // Side effect imports.
          ['^\\u0000'],
          // Node.js builtins prefixed with `node:`.
          ['^node:'],
          // Packages.
          // Things that start with a letter (or digit or underscore), or `@` followed by a letter.
          // Or nuxt '#app' like imports
          ['^@?\\w', '^#'],

          // Imports specific to the project folder structure.
          ['^@/constants', '^~/constants'],
          ['^@/store', '^~/store'],
          ['^@/utils', '^~/utils'],
          ['^@/components', '^~/components'],

          // Absolute imports and other imports such as Vue-style `@/foo`.
          // Anything not matched in another group.
          ['^'],
          // Relative imports.
          // Anything that starts with a dot.
          ['^\\.']
        ]
      }
    ],
    'simple-import-sort/exports': 'error',
    'vue/html-closing-bracket-newline': [
      'error',
      {
        singleline: 'never',
        multiline: 'never'
      }
    ],
    'vue/attributes-order': [
      'error',
      {
        alphabetical: true
      }
    ],
    'vue/component-tags-order': [
      'error',
      {
        order: ['script', 'template', 'style']
      }
    ],
    'vue/define-macros-order': [
      'error',
      {
        order: ['defineProps', 'defineEmits'],
        defineExposeLast: true
      }
    ],
    'vue/no-empty-component-block': 'error',
    'vue/multi-word-component-names': 'off',
    'vue/no-template-shadow': 'off',
    'no-undef': 'off',
    'vue/no-unused-vars': 'error',
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': 'error',
    'prefer-const': 'error',
    '@typescript-eslint/no-explicit-any': 'off',
    'vue/html-self-closing': [
      'error',
      {
        html: {
          void: 'always',
          normal: 'always',
          component: 'always'
        },
        svg: 'always',
        math: 'always'
      }
    ],
    'vue/match-component-import-name': 'error',
    'vuejs-accessibility/label-has-for': [
      'error',
      {
        controlComponents: ['Field'],
        required: {
          every: ['id']
        },
        allowChildren: false
      }
    ],
    'vuejs-accessibility/heading-has-content': [
      'error',
      {
        accessibleChildren: ['span'],
        accessibleDirectives: ['dompurify-html']
      }
    ],
    'vue/block-order': [
      'error',
      {
        order: ['script', 'template', 'style']
      }
    ],
    'vue/no-potential-component-option-typo': [
      'error',
      {
        presets: ['all'],
        custom: ['test']
      }
    ],
    'vue/no-unused-emit-declarations': 'error',
    'vue/no-useless-mustaches': 'error',
    'vue/padding-line-between-blocks': 'error',
    'vue/no-useless-v-bind': [
      'error',
      {
        ignoreIncludesComment: false,
        ignoreStringEscape: false
      }
    ],
    'vue/require-macro-variable-name': [
      'error',
      {
        defineProps: 'props',
        defineEmits: 'emit',
        defineSlots: 'slots',
        useSlots: 'slots',
        useAttrs: 'attrs'
      }
    ]
  },
  parserOptions: {
    parser: '@typescript-eslint/parser',
    ecmaVersion: 'latest',
    sourceType: 'module'
  }
};
