import { Attributes } from '../Shared/Attributes';
export class XmlUtils {
    static camelize(str) {
        if (str) {
            return str.replace(/-([a-z])/g, g => g[1].toUpperCase());
        }
        return str;
    }
    static camelizeNodeName(attr) {
        if (attr) {
            return {
                nodeName: XmlUtils.camelize(attr.nodeName),
                nodeValue: attr.nodeValue
            };
        }
        return attr;
    }
    static removeCssUnit(attr) {
        if (attr) {
            return {
                nodeName: attr.nodeName,
                nodeValue: attr.nodeValue.replace('px', ''),
            };
        }
        return attr;
    }
    static extractCssRules(css) {
        if (css && css.nodeName === 'style') {
            return css.nodeValue.split(';').reduce((prev, rule) => {
                let [name, value] = rule.split(':');
                name = name.trim();
                value = value.trim();
                if (name !== '') {
                    prev[XmlUtils.camelize(name)] = value;
                }
                return prev;
            }, {});
        }
        return {};
    }
    static isActiveAttribute(elementName, attr) {
        if (elementName && attr) {
            let common = Attributes['common'];
            let accepts = Attributes[elementName];
            return common.includes(attr.nodeName) || (accepts && accepts.includes(attr.nodeName));
        }
        return false;
    }
}
