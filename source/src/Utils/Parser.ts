import { parse } from 'fast-xml-parser';

export class Parser {
    public static parse(xml: string) {
        if (xml) {
            return parse(xml, {
                attributeNamePrefix : '',
                attrNodeName: '#attr',
                textNodeName : '#text',
                ignoreAttributes : false,
                ignoreNameSpace : false,
                allowBooleanAttributes : false,
                parseNodeValue : true,
                parseAttributeValue : false,
                trimValues: true,
                parseTrueNumberOnly: false,
            });
        }

        return  { };
    }
}
