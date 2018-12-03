var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import * as React from 'react';
import { Image } from 'react-native';
import XmlDom from 'xmldom';
import { Elements } from './Shared/Elements';
import { safe } from './Shared/Safe';
import { UrlUtils } from './Utils/Url';
import { XmlUtils } from './Utils/Xml';
let Svg = class Svg extends React.Component {
    constructor(props) {
        super(props);
        this.fetchFromSource = () => {
            const { source } = this.props;
            if (source) {
                let uri = source.uri;
                if (uri) {
                    if (UrlUtils.isSvgXml(uri)) {
                        this.setState({
                            data: this.extractSvgXml(uri),
                        });
                    }
                    else {
                        let resolved = Image.resolveAssetSource(source);
                        if (resolved && resolved.uri) {
                            fetch(resolved.uri).then(response => {
                                response.text().then(value => {
                                    this.setState({
                                        data: this.extractSvgXml(value),
                                    });
                                }).catch(err => {
                                    console.log(`SVG >> Get response text error >> ${err}`);
                                });
                            }).catch(err => {
                                console.log(`SVG >> Fetch error >> ${err}`);
                            });
                        }
                    }
                }
            }
        };
        this.state = {
            data: undefined
        };
    }
    componentDidMount() {
        this.fetchFromSource();
    }
    render() {
        if (this.state.data) {
            console.log(this.state.data);
            return this.createSvgFromXml(this.state.data);
        }
        return null;
    }
    createSvgFromXml(xml) {
        if (xml) {
            let doc = new XmlDom.DOMParser().parseFromString(xml);
            let root = doc.childNodes[0];
            if (root) {
                return this.createSvgElement(root, 0, {
                    accessibilityRole: 'image',
                    accessibilityLabel: this.props.alt,
                    style: [
                        {
                            width: this.props.width,
                            height: this.props.height
                        },
                        this.props.style
                    ]
                });
            }
        }
        return null;
    }
    createSvgElement(node, key, props) {
        if (node && node.nodeName) {
            let Component = Elements[node.nodeName];
            if (Component) {
                let children = Array.from(node.childNodes).map((childNode, index) => this.createSvgElement(childNode, index));
                let extraProps = props ? props : {};
                return React.createElement(Component, Object.assign({}, this.extractPropsFromXmlNode(node), { key: key }, extraProps), children);
            }
        }
        return null;
    }
    extractPropsFromXmlNode(node) {
        let result = {};
        if (node && node.attributes) {
            Array.from(node.attributes)
                .map(XmlUtils.camelizeNodeName)
                .map(XmlUtils.removeCssUnit)
                .filter(current => XmlUtils.isActiveAttribute(node.nodeName, current))
                .forEach(attr => {
                if (attr.nodeName === 'style') {
                    Object.assign(result, XmlUtils.extractCssRules(attr));
                }
                else {
                    result[XmlUtils.camelize(attr.nodeName)] = attr.nodeValue;
                }
            });
        }
        return result;
    }
    extractSvgXml(xml) {
        if (xml) {
            let decoded = decodeURIComponent(xml);
            return decoded.substring(decoded.indexOf('<svg '), decoded.indexOf('</svg>') + 6);
        }
        return xml;
    }
};
Svg = __decorate([
    safe
], Svg);
export { Svg };
