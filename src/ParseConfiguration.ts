import BlockParser from "./extend/BlockParser.js";

export const defaultParseConfiguration: ParseConfiguration = {
    blocks: {
        parsers: [],
    },
    elements: {
        allowed: ["div", "aside", "section", "article", "header", "footer", "nav", "main", "figure", "figcaption"],
    },
    attributes: {
        allowed: ["style", /^data-.+/, /^aria-.+/],
    }
};

export interface ParseConfiguration {
    blocks: {
        parsers: BlockParser[];
    },
    elements: {
        allowed: (string|RegExp)[];
    },
    attributes: {
        allowed: (string|RegExp)[];
    },
}