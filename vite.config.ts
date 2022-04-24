import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'
import dts from 'vite-plugin-dts'

import { createStyleImportPlugin } from 'vite-plugin-style-import'

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		react(),
		createStyleImportPlugin({
			libs: [
				{
					libraryName: 'antd',
					esModule: true,
					resolveStyle: (name) => {
						return `antd/es/${name}/style/index`
					},
				},
			],
		}),
		dts(),
	],
	resolve: {
		alias: [
			{ find: /^~/, replacement: '' },
			{ find: '@', replacement: '/src' },
		],
	},
	css: {
		preprocessorOptions: {
			less: {
				javascriptEnabled: true,
			},
		},
	},
	build: {
		lib: {
			entry: resolve(__dirname, 'src/packages/index.tsx'),
			name: 'react-echarts-json',
			formats: ['es', 'cjs'],
			fileName: (format) => `react-echarts-json.${format}.js`,
		},
		rollupOptions: {
			// 确保外部化处理那些你不想打包进库的依赖
			external: ['react'],
			output: {
				// 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
				globals: {
					react: 'React',
				},
			},
		},
		outDir: 'dist',
	},
})
