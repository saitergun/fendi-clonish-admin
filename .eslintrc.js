module.exports = {
  extends: 'airbnb',
  parser: '@babel/eslint-parser',

  env: {
    browser: true,
  },

  rules: {
    'no-console': 'off',
    'arrow-body-style': 'off',
    'max-len': 'off',
    'object-curly-newline': 'off',
    'prefer-promise-reject-errors': 'off',
    'no-unused-vars': 'off',

    camelcase: 'off',
    semi: 'off',

    'import/prefer-default-export': 'off',

    'jsx-a11y/anchor-is-valid': 'off',
    'jsx-a11y/label-has-associated-control': 'off',
    'jsx-a11y/control-has-associated-label': 'off',

    'react/no-array-index-key': 'off',
    'react/prop-types': 'off',
    'react/button-has-type': 'off',

    'react/jsx-props-no-spreading': 'off',
    'react/jsx-indent': 'off',
    'react/jsx-closing-tag-location': 'off',
    'react/jsx-props-no-multi-spaces': 'off',
    'react/jsx-one-expression-per-line': 'off',
    'react/jsx-filename-extension': [
      1,
      {
        extensions: [
          '.js',
          '.jsx',
        ],
      },
    ],
  },
};
