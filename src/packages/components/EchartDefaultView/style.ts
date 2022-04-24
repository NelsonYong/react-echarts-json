import { CSSProperties } from 'react'

export type ViewStyles = {
	drawerStyle?: CSSProperties
} & CSSProperties

const light: ViewStyles = {
	color: '#000',
	drawerStyle: {
		backgroundColor: '#fff',
		color: '#000',
	},
}

const dark: ViewStyles = {
	color: '#fff',
	drawerStyle: {
		backgroundColor: '#191919',
		color: '#fff',
	},
}

export { light, dark }
