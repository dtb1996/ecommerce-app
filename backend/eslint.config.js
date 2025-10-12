import eslintPluginPrettier from 'eslint-plugin-prettier'
import tseslint from 'typescript-eslint'

export default tseslint.config(
    {
        ignores: ['dist', 'node_modules'],
    },
    {
        files: ['**/*.ts'],
        languageOptions: {
            ecmaVersion: 'latest',
            sourceType: 'module',
        },
        plugins: {
            prettier: eslintPluginPrettier,
        },
        rules: {
            ...tseslint.configs.recommended.rules,
            'prettier/prettier': 'error',
            '@typescript-eslint/no-explicit-any': 'off',
        },
    },
)
