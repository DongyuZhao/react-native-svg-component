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
                            `<svg width="48" height="48"><path d="M1024 2023Q1165 2023 1296 1987T1540 1883T1747 1723T1908 1516T2011 1271T2048 999Q2048 834 1998 681T1855 400T1634 176T1348 27Q1345 26 1339 26T1330 25Q1306 25 1292 39T1278 76Q1278 147 1278 216T1279 357Q1279 408 1264 460T1210 547Q1326 560 1413 594T1559 690T1647 840T1677 1052Q1677 1130 1651 1199T1572 1327Q1583 1355 1588 1385T1593 1445Q1593 1484 1585 1522T1562 1598Q1557 1600 1551 1600T1540 1600Q1508 1600 1473 1590T1404 1564T1337 1529T1280 1493Q1155 1528 1024 1528Q893 1528 768 1493Q743 1510 711 1529T645 1563T575 1589T508 1600Q503 1600 497 1600T486 1598Q472 1561 464 1523T455 1445Q455 1415 460 1385T476 1327Q423 1269 397 1200T371 1052Q371 930 400 841T488 691T634 594T837 546Q808 520 793 484T772 409Q745 396 715 389T655 382Q591 382 549 412T474 494Q462 513 445 532T408 566T365 590T317 600Q313 600 305 600T290 597T276 591T270 581Q270 569 284 558T307 540L310 538Q332 521 348 506T378 473T401 435T424 388Q458 310 519 275T666 239Q692 239 718 242T770 251V77Q770 53 756 39T717 25Q714 25 709 25T700 27Q543 78 414 174T193 399T51 681T0 999Q0 1140 36 1271T140 1515T300 1722T507 1883T752 1986T1024 2023Z" transform="scale(0.02,0.02)"></path></svg>`
                    }}
                    width={100}
                    height={100}
                />
            </View>
        );
    }
}
