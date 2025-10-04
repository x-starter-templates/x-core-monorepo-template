import type { PlopTypes } from '@turbo/gen';
import { createNewPackageGenerator } from './new-pkg/generator';
import { registerAndOrLogicHelper } from './helper/and-or-logic';
import { registerCompareHelper } from './helper/compare';

export default function generate(plop: PlopTypes.NodePlopAPI) {
	// registry helper
	registerAndOrLogicHelper(plop);
	registerCompareHelper(plop);

	createNewPackageGenerator(plop);
}
