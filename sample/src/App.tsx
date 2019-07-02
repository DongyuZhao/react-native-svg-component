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
                    source={{ uri: "data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px' viewBox='0 0 32 32' enable-background='new 0 0 32 32' xml:space='preserve' id='' focusable='false' role='presentation' tabindex='-1' aria-hidden='true'%3e%3ctitle%3e%3c/title%3e%3cpath class='hcFill1 hcStroke1 hpFill1 hpStroke2 thFill1 thStroke1' fill='%23FBE000' stroke='%23666666' stroke-width='1.5' stroke-linecap='round' stroke-miterlimit='10' d='M16 9.06 c-3.83 0-6.94 3.11-6.94 6.94c0 3.83 3.11 6.94 6.94 6.94s6.94-3.11 6.94-6.94C22.94 12.17 19.83 9.06 16 9.06z' /%3e%3cline class='hcStroke1 hpStroke2 thStroke1' fill='none' stroke='%23666666' stroke-width='1.5' stroke-linecap='round' stroke-miterlimit='10' x1='16' y1='1.25' x2='16' y2='5.75' /%3e%3cline class='hcStroke1 hpStroke2 thStroke1' fill='none' stroke='%23666666' stroke-width='1.5' stroke-linecap='round' stroke-miterlimit='10' x1='16' y1='26.25' x2='16' y2='30.75' /%3e%3cline class='hcStroke1 hpStroke2 thStroke1' fill='none' stroke='%23666666' stroke-width='1.5' stroke-linecap='round' stroke-miterlimit='10' x1='5.52' y1='5.52' x2='8.7' y2='8.7' /%3e%3cline class='hcStroke1 hpStroke2 thStroke1' fill='none' stroke='%23666666' stroke-width='1.5' stroke-linecap='round' stroke-miterlimit='10' x1='23.3' y1='23.3' x2='26.48' y2='26.48' /%3e%3cline class='hcStroke1 hpStroke2 thStroke1' fill='none' stroke='%23666666' stroke-width='1.5' stroke-linecap='round' stroke-miterlimit='10' x1='1.25' y1='16' x2='5.75' y2='16' /%3e%3cline class='hcStroke1 hpStroke2 thStroke1' fill='none' stroke='%23666666' stroke-width='1.5' stroke-linecap='round' stroke-miterlimit='10' x1='26.25' y1='16' x2='30.75' y2='16' /%3e%3cline class='hcStroke1 hpStroke2 thStroke1' fill='none' stroke='%23666666' stroke-width='1.5' stroke-linecap='round' stroke-miterlimit='10' x1='5.52' y1='26.48' x2='8.7' y2='23.3' /%3e%3cline class='hcStroke1 hpStroke2 thStroke1' fill='none' stroke='%23666666' stroke-width='1.5' stroke-linecap='round' stroke-miterlimit='10' x1='23.3' y1='8.7' x2='26.48' y2='5.52' /%3e%3c/svg%3e" }}
                    width={100}
                    height={100}
                />
            </View>
        );
    }
}
