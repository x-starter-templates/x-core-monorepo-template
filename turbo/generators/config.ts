import type { PlopTypes } from '@turbo/gen';
import { createNewPackageGenerator } from './generate';

export default function generate(plop: PlopTypes.NodePlopAPI) {
	//

	createNewPackageGenerator(plop);
}
