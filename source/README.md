# react-native-svg-component

React Native SVG renderer using [react-native-svg](https://github.com/react-native-community/react-native-svg).

## Getting Started

### Installation

* add package

  ```bash
    yarn add react-native-svg-component
  ```

* link native files
  We are using [react-native-svg](https://github.com/react-native-community/react-native-svg) to render SVG. Please follow the its doc to finish setup.

### Usage

* Import to the component where you want to show an SVG

```ts
import { Svg } from 'react-native-svg-component';
```

* Send initial props

```tsx
    <Svg
        source={{ uri: data }}
        alt={`react native svg component example`}
        width={160}
        height={160}
        style={{}}
    />
```

### Properties

| Prop | default | Type | Description |
| --:| --:| --:| --:|
| source  | - | ImageSourcePropType | A source object the same with what Image component will accept. |
| alt  | - | string | Alt text which will be used as accessibility label for Svg |
| width | - | number | Width of the Svg. |
| height | - | number | Height of the Svg. |
| style | - | StyleProp&lt;ViewStyle&gt; | Style for this component. |

### Develop

```bash
brew install watchman
yarn global add gulp-cli
yarn all
yarn run-ios
```

### Examples

```bash
yarn run-ios
yarn run-android
```
