
module.exports = {
  env: {
    es6: true,
    browser: true
  },
  parser: "babel-eslint",
  parserOptions: {
    ecmaVersion: 6,
    sourceType: "module",
    ecmaFeatures: {
      jsx: true,
      experimentalObjectRestSpread: true
    }
  },
  ignorePatterns: ['tools/**', '.eslintrc.js', 'babel.config.js', 'postcss.config.js'],
  extends: [
    "eslint:recommended",
    "plugin:react/recommended"
  ],
  settings: {
    react: {
      version: 'detect'
    }
  },
  plugins: [
    "react",
    "react-hooks"
  ],
  overrides: [
    {
      files: [
        "*.ts",
        "*.tsx"
      ],
      parser: "@typescript-eslint/parser",
      parserOptions: {
        project: "tsconfig.json",
        tsconfigRootDir: __dirname,
        sourceType: "module",
        ecmaFeatures: {
          jsx: true
        }
      },
      plugins: [
        "@typescript-eslint"
      ],
      extends: [
        "plugin:@typescript-eslint/eslint-recommended",
        "plugin:@typescript-eslint/recommended"
      ],
      rules: { }
    }
  ],
  rules: {
    "no-console": 1,
    "react/prop-types": 0,
    "react/react-in-jsx-scope": 0
  }
}