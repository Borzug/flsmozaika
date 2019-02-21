import DOMPurify from "dompurify";

export const configureDOMPurify = () => {
    DOMPurify.addHook("afterSanitizeAttributes", (node: any) => {
        if ("target" in node) {
            node.setAttribute("target", "_blank");
        }

        if (!node.hasAttribute("target")
            && (node.hasAttribute("xlink:href")
                || node.hasAttribute("href"))) {
            node.setAttribute("xlink:show", "new");
        }
    });
};
