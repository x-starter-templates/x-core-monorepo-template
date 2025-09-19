import storybook from 'eslint-plugin-storybook';

/**
 * @type {import('eslint').Linter.Config[]}
 */
const eslintConfig = [...storybook.configs['flat/recommended']];
export default eslintConfig;
