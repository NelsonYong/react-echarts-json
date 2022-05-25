# react-echarts-json

No-invasive debugging based on Echarts

## 💻 Live

[Live](http://43.138.187.142:9000/react-echarts-json/live/)

## ✨ Features

- Easy to learn and use
- No-invasive
- Dependent on updates
- Log view monitoring
- Visual debugging echarts options
- Support multi-chart
- Can customize the combination views

## 📦 Install

```
$ npm install --save react-echarts-json
# or
$ yarn add react-echarts-json
```

## 🔨 Usage

Use the container that displays the view

```typescript
import { EchartDefaultView } from 'react-echarts-json'
import 'react-echarts-json/dist/style.css'

// view
;<EchartDefaultView />
```

You need to inject messages in the components using echarts(jsx or tsx)

```typescript
import { useInjection } from 'react-echarts-json'

useInjection(
	{
		chart: chart,
		option,
		id: 'demo',
		name: 'demo',
		container: null, // partial
	},
	[deps] // dependent
)
```

## 👨‍💻👩🏻‍💻 Custom view

You can customize your view through the components and hooks provided

```typescript
import {
	useMedia,
	useDarkMode,
	useEcharts,
	useInjection,
	useChartSelect,
	useChartEventEmitter,
	useCreateEditor,
	EchartDefaultView,
	Editor,
	LogView,
	ReactEchartsJson,
} from 'react-echarts-json'

// EchartDefaultView --- Default view component

// components
// Editor --- code Editor Copomponent
// LogView --- echart log
// ReactEchartsJson --- echart option json view

// hooks
// useDarkMode --- dark theme
// useMedia --- media
// useEcharts --- for fast create demo
// useChartSelect --- select active chart
// useCreateEditor --- createEditor and run code # If you don t use the Editor component then you need to use this hook
// useChartEventEmitter --- chart eventBus

// # Can you use hook and component to customize the components you want.The EchartDefaultView component is made up of them.
```

## 🖼 View

<img src="https://github.com/NelsonYong/react-echarts-json/blob/master/src/image/log.png?raw=true" alt="darl" style="zoom: 33%;" />

<img src="https://github.com/NelsonYong/react-echarts-json/blob/master/src/image/code.png?raw=true" alt="darl" style="zoom: 33%;" />

<img src="https://github.com/NelsonYong/react-echarts-json/blob/master/src/image/opt.png?raw=true" alt="log" style="zoom:33%;" />
