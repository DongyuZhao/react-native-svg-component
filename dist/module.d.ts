declare module 'Svg' {
    import React from 'react';
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
  
    export const Svg: React.ComponentClass<IProps, IState>;
}
