# react-echarts-json

No-invasive debugging based on Echarts

## 📚 Documentation

writing ✏️

## ✨ Features

- Easy to learn and use
- No-invasive
- Log view monitoring
- Visual debugging echarts options
- Support multi-chart

## 📦 Install

```
$ npm install --save react-echarts-json
# or
$ yarn add react-echarts-json
```

## 🔨 Usage

```typescript
import { EchartDefaultView } from 'react-echarts-json'

// view
;<EchartDefaultView />
```

echarts View

```typescript
import { useInjection } from 'react-echarts-json'

useInjection(
	{
		chart: chart,
		option,
		id: 'demo',
		title: '测试demo',
	},
	[deps]
)
```
