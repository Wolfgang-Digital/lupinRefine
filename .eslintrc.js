module.exports = {
	env: {
		es2021: true,
		node: true,
		commonjs: true,
	},
	extends: [
		'eslint:recommended',
		// 'plugin:@typescript-eslint/recommended',
		// 'plugin:react/recommended',
	],
	overrides: [
		{
			env: {
				node: true,
			},
			files: ['.eslintrc.{js,cjs}'],
			parserOptions: {
				sourceType: 'script',
			},
		},
	],
	parser: '@typescript-eslint/parser',
	parserOptions: {
		ecmaVersion: 'latest',
		sourceType: 'module',
	},
	//plugins: ['@typescript-eslint', 'react'],
	rules: {
		indent: ['error', 'tab', { SwitchCase: 1 }],
	},
};
