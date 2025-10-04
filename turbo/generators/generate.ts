import type { PlopTypes } from '@turbo/gen';
import path from 'path';

type Answers = {
	/**
	 * package type，
	 */
	readonly type: 'packaage' | 'app' | 'feature';
	/**
	 * package name, in kebab-case (e.g., my-package)
	 */
	readonly name: string;

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
					{ name: 'Standard Package(common ui or tools)', value: 'packaage' },
					{ name: 'Application', value: 'app' },
					{
						name: "Feature Module(app's feature module, like auth, analysics, team etc)",
						value: 'feature',
					},
				],
				default: 'packaage',
			},
		],
		actions(data) {
			const answers = data as Answers;

			let scope = '';
			let packageFolder = '';
			switch (answers.type) {
				case 'app':
					scope = '@x-apps';
					packageFolder = 'apps';
					break;
				case 'feature':
					scope = '@x-features';
					packageFolder = 'features';
					break;
				case 'packaage':
				default:
					scope = '@x-pkg';
					packageFolder = 'packages';
					break;
			}

			const name = path.basename(answers.name);
			const fullPackageName = `${scope}/${name}`;

			answers.packageName = fullPackageName;

			return [
				{
					type: 'add',
					path: `${packageFolder}/${name}/.gitignore`,
					templateFile: '.gitignore.hbs',
				},
				{
					type: 'addMany',
					destination: `${packageFolder}/${name}`,
					templateFiles: 'templates/basic/**',
					base: 'templates/basic',
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
