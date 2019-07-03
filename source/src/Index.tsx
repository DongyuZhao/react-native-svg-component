import React, { useEffect, useState } from 'react';
import { ImageProps, StyleSheet, View } from 'react-native';

import { SvgUtils } from './Utils/Svg';
import { UrlUtils } from './Utils/Url';

interface State {
    data: string;
}

export const name = 'react-native-svg-component';

export const isSvg = (url: string) => {
    return UrlUtils.isSvg(decodeURIComponent(url));
};

export const Svg = (props: ImageProps) => {
    const [state, setState] = useState({ data: undefined } as State);

    const onContentFetched = (svg: string) => {
        setState({
            data: SvgUtils.extractSvgXml(svg)
        });
    };

    const onFetchFailed = (error: any) => {
        console.log(`Svg fetch failed. Error:${error}`);
    };

    useEffect(() => {
        SvgUtils.fetch(props.source, onContentFetched, onFetchFailed);
    }, [props.source]);

    const { width, height, style, ...others } = props;

    if (state.data) {
        return (
            <View
                style={[
                    {
                        width: width,
                        height: height,
                        alignContent: 'center',
                        alignItems: 'center',
                        justifyContent: 'center',
                    },
                    style
                ]}
                {...others}
            >
                {SvgUtils.createSvgFromXml(state.data)}
            </View>
        );
    } else {
        return (
            <View
                accessibilityRole='image'
                accessibilityLabel={props.accessibilityLabel}
                style={[
                    {
                        width: width,
                        height: height,
                        borderWidth: StyleSheet.hairlineWidth,
                        borderColor: '#aaa',
                    },
                    style
                ]}
            />
        );
    }
};
