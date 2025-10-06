import type { PlopTypes } from '@turbo/gen';
import { createBasicPkgGenerator } from './gen-basic-pkg/generator';
import { registerAndOrLogicHelper } from './helper/and-or-logic';
import { registerCompareHelper } from './helper/compare';
import { createNextjsAppGenerator } from './gen-nextjs-app/generators';
import { createRemixAppGenerator } from './gen-remix-app/generators';

export default function generate(plop: PlopTypes.NodePlopAPI) {
	// registry helper
	registerAndOrLogicHelper(plop);
	registerCompareHelper(plop);

	// regist generator
	createBasicPkgGenerator(plop);
	createNextjsAppGenerator(plop);
	createRemixAppGenerator(plop);
}
