import type { PlopTypes } from '@turbo/gen';
import path from 'path';

type Answers = {
	/**
	 * package type，
	 */
	readonly type: 'package' | 'app' | 'feature';
	/**
	 * package name, in kebab-case (e.g., my-package)
	 */
	readonly name: string;

	/**
	 * confirm to create the package
	 */
	readonly confirm: boolean;

	/**
	 * full package name with scope (e.g., @scope/name)
	 *
	 * dynamically set during generation
	 */
	packageName: string;
};

export function createNewPackageGenerator(plop: PlopTypes.NodePlopAPI) {
	plop.setGenerator('new-package', {
		description: 'Generate a new package',
		prompts: [
			{
				type: 'input',
				name: 'name',
				message:
					'Package name, does not need include the scope (in kebab-case, e.g., my-package, rather than @x-kits/my-package):',
				validate: (value) => {
					if (!value) {
						return 'Package name is required';
					}
					return true;
				},
			},
			{
				type: 'list',
				name: 'type',
				message: 'Select the type of package:',
				choices: [
					{ name: 'Standard Package(common ui or tools)', value: 'package' },
					{ name: 'Application', value: 'app' },
					{
						name: "Feature Module(app's feature module, like auth, analysics, team etc)",
						value: 'feature',
					},
				],
				default: 'package',
			},
			{
				type: 'confirm',
				name: 'confirm',
				message: (answers) => {
					const { packageName, scope, packageFolder } = getInfoFromType(
						answers as Answers,
					);
					return `\nAbout to create a new package:\n\n- Package Name: ${packageName}\n- Scope: ${scope}\n- Folder: ${packageFolder}\n\nContinue?`;
				},
				default: true,
			},
		],
		actions(data) {
			const answers = data as Answers;
			if (!answers.confirm) {
				console.log('Package creation cancelled.');
				return [];
			}

			const { packageName, packageFolder } = getInfoFromType(answers);

			answers.packageName = packageName;

			return [
				{
					type: 'add',
					path: `${packageFolder}/.gitignore`,
					templateFile: 'new-pkg/.gitignore.hbs',
				},
				{
					type: 'addMany',
					destination: `${packageFolder}`,
					templateFiles: 'new-pkg/templates/**',
					base: 'new-pkg/templates',
					abortOnFail: true,
					globOptions: {
						dot: true,
					},
					stripExtensions: ['hbs'],
				},
				async () => {
					// print next steps
					console.log('\n');
					console.log('====================');
					console.log('Package created successfully!');
					console.log(`\nNext steps:`);
					console.log('1. Install dependencies: pnpm install');
					console.log('2. Format: pnpm run format:fix');
					console.log('3. Start coding and happy hacking! 🚀');
					console.log('====================\n');

					return 'Done';
				},
			];
		},
	});
}

/**
 * Returns package information based on the provided type and name.
 *
 * Determines the scope and package folder according to the `type` property of the `answer` object.
 * Supported types are: 'app', 'e2e', 'feature', and 'package' (default).
 * The returned object includes the normalized package name, scope, and folder path.
 *
 * @param answer - An object containing the type and name of the package.
 * @returns An object with the following properties:
 * - `name`: The base name of the package.
 * - `packageName`: The scoped package name (e.g., `@x-apps/my-app`).
 * - `scope`: The scope string (e.g., `@x-apps`).
 * - `packageFolder`: The folder path for the package (e.g., `apps/my-app`).
 */
function getInfoFromType(answer: Answers) {
	let scope = '';
	let packageFolder = '';
	switch (answer.type) {
		case 'app':
			scope = '@x-apps';
			packageFolder = 'apps';
			break;
		case 'feature':
			scope = '@x-features';
			packageFolder = 'features';
			break;
		case 'package':
		default:
			scope = '@x-pkg';
			packageFolder = 'packages';
			break;
	}

	const name = path.basename(answer.name);
	return {
		name,
		packageName: `${scope}/${name}`,
		scope,
		packageFolder: `${packageFolder}/${answer.name}`,
	};
}
