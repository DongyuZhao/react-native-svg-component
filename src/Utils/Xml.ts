import { Attributes } from '../Shared/Attributes';

export class XmlUtils {
    public static camelize(str: string) {
        if (str) {
            return str.replace(/-([a-z])/g, g => g[1].toUpperCase());
        }
        return str;
    }

    public static camelizeNodeName(attr: { nodeName: string, nodeValue: string }) {
        if (attr) {
            return {
                nodeName: XmlUtils.camelize(attr.nodeName),
                nodeValue: attr.nodeValue
            };
        }
        return attr;
    }

    public static removeCssUnit(attr: { nodeName: string, nodeValue: string}) {
        if (attr) {
            return {
                nodeName: attr.nodeName,
                nodeValue: attr.nodeValue.replace('px', ''),
            };
        }
        return attr;
    }

    public static extractCssRules(css: { nodeName: string, nodeValue: string}) {
        if (css && css.nodeName === 'style') {
            return css.nodeValue.split(';').reduce((prev, rule) => {
                let [name, value] = rule.split(':');
                name = name.trim();
                value = value.trim();
                if (name !== '') {
                    prev[XmlUtils.camelize(name)] = value;
                }
                return prev;
            }, {} as any);
        }
        return {};
    }

    public static isActiveAttribute(elementName: string, attr: { nodeName: string, nodeValue: string}) {
        if (elementName && attr) {
            let common = Attributes['common'];
            let accepts = (Attributes as any)[elementName] as string[];
            return common.includes(attr.nodeName) || (accepts && accepts.includes(attr.nodeName));
        }
        return false;
    }
}
