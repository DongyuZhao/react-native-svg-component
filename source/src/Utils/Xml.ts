import { attributes } from '../Shared/Attributes';

export class XmlUtils {
    public static camelize(str: string) {
        if (str) {
            return str.replace(/-([a-z])/g, g => g[1].toUpperCase());
        }

        return str;
    }

    public static isActiveAttribute(tag: string, attr: string) {
        if (tag && attr) {
            const common = attributes['common'];
            const accepts = (attributes as any)[tag] as string[];

            return common.includes(attr) || (accepts && accepts.includes(attr));
        }

        return false;
    }

    public static extractCssRules(attr: any) {
        if (attr && attr.style && typeof attr.style === 'string') {
            return (attr.style as string).split(';').reduce((prev, rule) => {
                let [name, value] = rule.split(':');
                name = name.trim();
                value = value.trim().replace('px', '');
                if (name !== '') {
                    prev[XmlUtils.camelize(name)] = value;
                }

                return prev;
            }, {} as any);
        }

        return {};
    }

    public static extractAttributes(attr: any) {
        const extracted = {} as any;

        if (attr) {
            if (attr.style && typeof attr.style === 'string') {
                const style = XmlUtils.extractCssRules(attr);
                Object.assign(extracted, style);
            }
            // camelize
            Object.entries(attr).forEach(prop => {
                if (prop[0] !== 'style') {
                    extracted[XmlUtils.camelize(prop[0])] = prop[1];
                }
            });
        }

        return extracted;
    }

    public static filterAttributes(tag: string, attr: any) {
        const filtered = {} as any;

        if (tag && attr) {
            Object.keys(attr).forEach(key => {
                if (XmlUtils.isActiveAttribute(tag, key)) {
                    filtered[key] = attr[key];
                }
            });
        }

        return filtered;
    }
}
