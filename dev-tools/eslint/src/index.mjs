// config配置
// import { default as nextjs } from './config-nextjs.mjs';
import { default as recommend } from './config-recommend.mjs';

// 环境
import { default as envBrowser } from './env-browser.mjs';
import { default as envNode } from './env-node.mjs';

// plugin
import { default as importRecommend } from './import.mjs';
// import { default as storybook } from './storybook.mjs';
// import { default as svelte } from './svelte.mjs';

export {
	envBrowser,
	envNode,
	importRecommend,
	// nextjs,
	recommend,
	// storybook,
	// svelte,
};
