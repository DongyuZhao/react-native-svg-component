import React from 'react';
import { Image, ImageSourcePropType, ViewProps } from 'react-native';
import XmlDom from 'xmldom';

import { elements } from '../Shared/Elements';

import { UrlUtils } from './Url';
import { XmlUtils } from './Xml';

export class SvgUtils {
    public static fetch(source: ImageSourcePropType, onSuccess: (svg: string) => void, onError: (error: any) => void) {
        if (source) {
            const uri = (source as any).uri as string;
            if (uri) {
                if (UrlUtils.needFetch(uri)) {
                    const resolved = Image.resolveAssetSource(source);
                    if (resolved && resolved.uri) {
                        fetch(resolved.uri).then(response => {
                            response.text().then(value => {
                                if (onSuccess) {
                                    onSuccess(value);
                                }
                            }).catch(err => {
                                if (onError) {
                                    onSuccess(err);
                                }
                            });
                        }).catch(err => {
                            if (onError) {
                                onSuccess(err);
                            }
                        });
                    }
                } else {
                    if (onSuccess) {
                        onSuccess(uri);
                    }
                }
            }
        }
    }

    public static extractSvgXml(xml: string) {
        if (xml) {
            const decoded = decodeURIComponent(xml);

            return decoded.substring(decoded.indexOf('<svg '), decoded.indexOf('</svg>') + 6);
        }

        return xml;
    }

    public static createSvgFromXml(xml: string) {
        if (xml) {
            const doc = new XmlDom.DOMParser().parseFromString(xml);
            const root = doc.childNodes[0];
            if (root) {
                return SvgUtils.createSvgElement(
                    root as Element,
                    0,
                    {
                        accessibilityRole: 'image',
                    }
                );
            }
        }

        return null;
    }

    public static createSvgElement(node: Element, key: string | number, props?: ViewProps): React.ComponentElement<any, any> {
        if (node && node.nodeName) {
            const component = elements[node.nodeName];
            if (component) {
                const children = Array.from(node.childNodes).map((childNode, index) => this.createSvgElement(childNode as Element, index));
                const extraProps = props ? props : {};

                return React.createElement(component, { ...XmlUtils.extractProps(node), key: key, ...extraProps }, children);
            }
        }

        return null;
    }
}
