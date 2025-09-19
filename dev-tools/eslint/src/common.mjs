/**
 * @type {import('eslint').Linter.Config[]}
 */
export const commons = [
	{
		name: 'ignores',
		ignores: [
			'node_modules/',
			'dist/',
			'build/',
			'.next/',
			'.turbo/',
			'coverage/',
		],
	},
	{
		name: 'custom',
		rules: {
			// https://typescript-eslint.io/rules/consistent-type-imports/
			// 自动改为type引用
			'@typescript-eslint/consistent-type-imports': [
				'error',
				{
					// 允许type T = import('Foo').Foo;
					disallowTypeAnnotations: false,
					prefer: 'type-imports',
				},
			],

			// Override or add rule settings here, such as:
			// 'svelte/rule-name': 'error'
			'no-unused-vars': 'off',
			'@typescript-eslint/no-unused-vars': [
				'error',
				{
					args: 'all',
					argsIgnorePattern: '^_',
					caughtErrors: 'all',
					caughtErrorsIgnorePattern: '^_',
					destructuredArrayIgnorePattern: '^_',
					varsIgnorePattern: '^_',
					ignoreRestSiblings: true,
				},
			],
		},
	},
];
