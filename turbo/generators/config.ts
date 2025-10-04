import type { PlopTypes } from '@turbo/gen';
import { createNewPackageGenerator } from './new-pkg/generator';

export default function generate(plop: PlopTypes.NodePlopAPI) {
	//

	createNewPackageGenerator(plop);
}
