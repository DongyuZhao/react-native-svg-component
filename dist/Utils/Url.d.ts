export declare class UrlUtils {
    static isRemoteUrl(url: string): boolean;
    static isEncodedData(url: string): boolean;
    static isEncodedSvg(url: string): boolean;
    static isSvgXml(url: string): boolean;
    static isDeepLink(url: string): boolean;
    static isRelativeUrl(url: string): boolean;
    static needFetch(url: string): boolean;
    static composeUrl(base: string, path: string): string;
    static toAbsolute(url: string, host: string): string;
}
