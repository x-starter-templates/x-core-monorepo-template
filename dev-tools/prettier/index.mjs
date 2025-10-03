import oxc from '@prettier/plugin-oxc';

/** @typedef  {import("prettier").Config} PrettierConfig */

/** @type { PrettierConfig } */
const config = {
	tabWidth: 2,
	useTabs: true,
	semi: true,
	printWidth: 80,
	singleQuote: true,
	trailingComma: 'all',
	arrowParens: 'always',
	// use oxc to parse code
	plugins: [oxc],
};

export default config;
