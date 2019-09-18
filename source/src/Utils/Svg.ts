import React from 'react';
import { Image, ImageSourcePropType } from 'react-native';

import { elements } from '../Shared/Elements';

import { Parser } from './Parser';
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

    public static createSvgFromXml(xml: string, props?: any) {
        const obj = Parser.parse(xml);

        if (obj && obj.svg) {
            return SvgUtils.createSvgFromObject('svg', obj.svg, 0, props);
        }

        return null;
    }

    public static createSvgFromObject(tag: string, obj: any, index: number, props?: any) {
        const attr = obj['#attr'];
        const text = obj['#text'];

        const filtered = XmlUtils.filterAttributes(tag, XmlUtils.extractAttributes(attr));

        let children: React.ReactNode;

        if (text && typeof text === 'string') {
            children = text;
        } else {
            children = [];
            Object.entries(obj).filter(entry => entry[0] !== '#attr' && entry[0] !== '#text').forEach((entry, key) => {
                if (Array.isArray(entry[1])) {
                    // if it is an array, we need to flatten it for correct render
                    children = (children as Array<any>).concat(
                        (entry[1] as Array<any>).map((val, k) =>
                            SvgUtils.createSvgFromObject(entry[0], val, k + key * 10)
                        )
                    );
                } else {
                    (children as Array<any>).push(SvgUtils.createSvgFromObject(entry[0], entry[1], key * 10));
                }
            });
        }

        const component = elements[tag];
        if (component) {
            const extra = props ? props : {};

            return React.createElement(component, { ...filtered, ...extra, key: index }, children);
        }

        return null;
    }
}
