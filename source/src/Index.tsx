import React, { useEffect, useState } from 'react';
import { ImageProps, StyleSheet, View } from 'react-native';

import { SvgUtils } from './Utils/Svg';
import { UrlUtils } from './Utils/Url';

interface State {
    data: string;
}

export const name = 'react-native-svg-component';

export const isSvg = UrlUtils.isSvg;

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

    if (state.data) {
        return SvgUtils.createSvgFromXml(state.data, props);
    } else {
        return (
            <View
                accessibilityRole='image'
                accessibilityLabel={props.accessibilityLabel}
                style={{
                    width: props.width,
                    height: props.height,
                    borderWidth: StyleSheet.hairlineWidth,
                    borderColor: '#aaa',
                }}
            />
        );
    }
};
