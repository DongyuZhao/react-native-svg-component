import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';

import { name, Svg } from 'react-native-svg-component';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
});

const instructions = Platform.select({
    ios:
        `Press Cmd+R to reload,
  Cmd+D or shake for dev menu`,
    android:
        `Double tap R on your keyboard to reload,
    'Shake or press menu button for dev menu'`
});

// tslint:disable: max-line-length
// tslint:disable: quotemark
// tslint:disable: no-magic-numbers
export class App extends Component {
    public render() {
        return (
            <View style={styles.container}>
                <Text style={styles.welcome}>Welcome to {name}!</Text>
                <Text style={styles.instructions}>To get started, edit App.js</Text>
                <Text style={styles.instructions}>{instructions}</Text>
                <Svg
                    source={{
                        uri:
                            `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M0 0h24v24H0z" fill="none"/><path d="M5 16c0 3.87 3.13 7 7 7s7-3.13 7-7v-4H5v4zM16.12 4.37l2.1-2.1-.82-.83-2.3 2.31C14.16 3.28 13.12 3 12 3s-2.16.28-3.09.75L6.6 1.44l-.82.83 2.1 2.1C6.14 5.64 5 7.68 5 10v1h14v-1c0-2.32-1.14-4.36-2.88-5.63zM9 9c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zm6 0c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1z"/></svg>`
                    }}
                    width={100}
                    height={100}
                />
            </View>
        );
    }
}
