export declare class XmlUtils {
    static camelize(str: string): string;
    static camelizeNodeName(attr: {
        nodeName: string;
        nodeValue: string;
    }): {
        nodeName: string;
        nodeValue: string;
    };
    static removeCssUnit(attr: {
        nodeName: string;
        nodeValue: string;
    }): {
        nodeName: string;
        nodeValue: string;
    };
    static extractCssRules(css: {
        nodeName: string;
        nodeValue: string;
    }): any;
    static isActiveAttribute(elementName: string, attr: {
        nodeName: string;
        nodeValue: string;
    }): boolean;
}
