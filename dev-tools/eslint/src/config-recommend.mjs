// For more info, see https://github.com/storybookjs/eslint-plugin-storybook#configuration-flat-config-format

import js from '@eslint/js';
import prettier from 'eslint-plugin-prettier/recommended';
import { configs as tsConfigs } from 'typescript-eslint';
import { commons } from './common.mjs';
import importEslint from './import.mjs';

/**
 * @type {import('eslint').Linter.Config[]}
 */
const eslintConfig = [
	js.configs.recommended,
	...tsConfigs.recommended,
	prettier,
	...importEslint,
	...commons,
];

export default eslintConfig;
