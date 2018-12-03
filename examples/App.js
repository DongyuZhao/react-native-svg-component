import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { Svg } from './react-native-svg-component';

import mockData from './mockData';

const svgGap = 20;

export default class App extends React.Component {
    render() {
        return (
            <View
                style={styles.container}
            >
                {this.renderMockData()}
            </View>
        );
    }

    renderMockData() {
        return Object.keys(mockData).map((key) => {
            console.log(key);
            let data = mockData[key];
            if (data) {
                return (
                    [
                        <Svg
                            key={key}
                            source={{ uri: data }}
                            alt={`react native svg component example ${key}}`}
                            width={160}
                            height={160}
                        />,
                        <View
                            key={`react-native-svg-component - gap - ${key}`}
                            style={{ height: svgGap }}
                        />
                    ]
                );
            }
            return null;
        })
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
