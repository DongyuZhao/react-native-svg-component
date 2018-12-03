import * as React from 'react';
import { Image, ImageSourcePropType, StyleProp, ViewProps, ViewStyle } from 'react-native';

import XmlDom from 'xmldom';
import { Elements } from './Shared/Elements';
import { safe } from './Shared/Safe';
import { UrlUtils } from './Utils/Url';
import { XmlUtils } from './Utils/Xml';

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

@safe
export class Svg extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);

        this.state = {
            data: undefined
        };
    }

    public componentDidMount() {
        this.fetchFromSource();
    }

    public render() {
        if (this.state.data) {
            console.log(this.state.data);
            return this.createSvgFromXml(this.state.data);
        }
        return null;
    }

    private createSvgFromXml(xml: string) {
        if (xml) {
            let doc = new XmlDom.DOMParser().parseFromString(xml);
            let root = doc.childNodes[0];
            if (root) {
                return this.createSvgElement(
                    root as Element,
                    0,
                    {
                        accessibilityRole: 'image',
                        accessibilityLabel: this.props.alt,
                        style: [
                            {
                                width: this.props.width,
                                height: this.props.height
                            },
                            this.props.style
                        ]
                    }
                );
            }
        }
        return null;
    }

    private createSvgElement(node: Element, key: string | number, props?: ViewProps): React.ComponentElement<any, any> {
        if (node && node.nodeName) {
            let Component = Elements[node.nodeName];
            if (Component) {
                let children = Array.from(node.childNodes).map((childNode, index) => this.createSvgElement(childNode as Element, index));
                let extraProps = props ? props : {};
                return React.createElement(Component, { ...this.extractPropsFromXmlNode(node), key: key, ...extraProps }, children);
            }
        }
        return null;
    }

    private extractPropsFromXmlNode(node: Element) {
        let result: any = {};
        if (node && node.attributes) {
            Array.from(node.attributes)
                .map(XmlUtils.camelizeNodeName)
                .map(XmlUtils.removeCssUnit)
                .filter(current => XmlUtils.isActiveAttribute(node.nodeName, current))
                .forEach(attr => {
                    if (attr.nodeName === 'style') {
                        Object.assign(result, XmlUtils.extractCssRules(attr));
                    } else {
                        result[XmlUtils.camelize(attr.nodeName)] = attr.nodeValue;
                    }
                });
        }
        return result;
    }

    private extractSvgXml(xml: string) {
        if (xml) {
            let decoded = decodeURIComponent(xml);
            return decoded.substring(decoded.indexOf('<svg '), decoded.indexOf('</svg>') + 6);
        }
        return xml;
    }

    private fetchFromSource = () => {
        const { source } = this.props;
        if (source) {
            let uri = (source as any).uri as string;
            if (uri) {
                if (UrlUtils.isSvgXml(uri)) {
                    this.setState({
                        data: this.extractSvgXml(uri),
                    });
                } else {
                    let resolved = Image.resolveAssetSource(source);
                    if (resolved && resolved.uri) {
                        fetch(resolved.uri).then(response => {
                            response.text().then(
                                value => {
                                    this.setState({
                                        data: this.extractSvgXml(value),
                                    });
                                }
                            ).catch(err => {
                                console.log(`SVG >> Get response text error >> ${err}`);
                            });
                        }).catch(err => {
                            console.log(`SVG >> Fetch error >> ${err}`);
                        });
                    }
                }
            }
        }
    }
}
