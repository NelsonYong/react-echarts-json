import { Button, Col, Row } from 'antd'
import * as monaco from 'monaco-editor'
import { useEffect, useRef } from 'react'
import { useCreateEditor } from './utils'

const Editor = ({ activeId }: { activeId?: string }) => {
	const mainRef = useRef<HTMLDivElement>(null)
	const container = useRef<HTMLDivElement>(null)
	const editor = useRef<monaco.editor.IStandaloneCodeEditor>()
	useEffect(() => {
		if (container.current)
			editor.current = monaco.editor.create(container.current, {
				value: 'const chartInstance = instance',
				language: 'javascript',
				theme: 'vs-dark',
				roundedSelection: true,
				scrollBeyondLastLine: true,
				tabSize: 2, // tab缩进长度
				autoIndent: 'full', // 自动布局
				cursorStyle: 'line', // 光标样式
				automaticLayout: true, // 自动布局
				fontSize: 14, // 字体大小
			})
	}, [])

	// monaco.editor.defineTheme()

	const { run } = useCreateEditor({
		domElement: mainRef.current,
		activeId,
	})

	const codeRun = () => {
		const code = editor.current?.getValue()
		run(code)
	}

	return (
		<div ref={mainRef}>
			<Row>
				<Col span={20}></Col>
				<Col
					span={4}
					style={{
						display: 'flex',
						justifyContent: 'end',
					}}
				>
					<Button type="primary" onClick={() => codeRun()}>
						运行
					</Button>
				</Col>
			</Row>
			<div
				ref={container}
				style={{
					height: 800,
					marginTop: 32,
				}}
			></div>
		</div>
	)
}

export default Editor
