import * as React from 'react';
import { ImageSourcePropType, StyleProp, ViewStyle } from 'react-native';
interface IProps {
    source: ImageSourcePropType;
    alt: string;
    width?: number;
    height?: number;
    style?: StyleProp<ViewStyle>;
}
interface IState {
    data: string;
}
export declare class Svg extends React.Component<IProps, IState> {
    constructor(props: IProps);
    componentDidMount(): void;
    componentDidUpdate(prevProps: IProps): void;
    render(): React.ComponentElement<any, any>;
    private createSvgFromXml;
    private createSvgElement;
    private extractPropsFromXmlNode;
    private extractSvgXml;
    private fetchFromSource;
}
export {};
