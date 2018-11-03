"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const etch = require("etch");
const utils_1 = require("../utils");
class TooltipView {
    constructor(parent) {
        this.parent = parent;
        this.props = {
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
        };
        etch.initialize(this);
    }
    async destroy() {
        return etch.destroy(this);
    }
    async update(props) {
        this.props = Object.assign({}, this.props, props);
        await etch.update(this);
    }
    writeAfterUpdate() {
        const offset = 10;
        let left = this.props.right;
        let right = false;
        let whiteSpace = "";
        const clientWidth = this.parent.clientWidth;
        const offsetWidth = this.element.offsetWidth;
        const offsetHeight = this.element.offsetHeight;
        let top = this.props.top - offsetHeight;
        // X axis adjust
        if (left + offsetWidth >= clientWidth) {
            left = clientWidth - offsetWidth - offset;
        }
        if (left < 0) {
            whiteSpace = "pre-wrap";
            left = offset;
            right = offset;
        }
        // Y axis adjust
        if (top < 0) {
            top = this.props.bottom;
        }
        this.element.style.left = `${left}px`;
        this.element.style.top = `${top}px`;
        if (right !== false)
            this.element.style.right = `${right}px`;
        if (whiteSpace)
            this.element.style.whiteSpace = whiteSpace;
    }
    render() {
        return (etch.dom("div", { class: "atom-typescript-tooltip tooltip", key: this.sigHelpHash() },
            etch.dom("div", { class: "tooltip-inner" }, this.tooltipContents())));
    }
    sigHelpHash() {
        if (!this.props.sigHelp)
            return undefined;
        const { start, end } = this.props.sigHelp.applicableSpan;
        return `${start.line}:${start.offset}-${end.line}:${end.offset}`;
    }
    tooltipContents() {
        if (!this.props.sigHelp)
            return "…";
        const { sigHelp } = this.props;
        return sigHelp.items.map((sig, idx) => (etch.dom("div", { class: `atom-typescript-tooltip-signature-help${idx === sigHelp.selectedItemIndex
                ? " atom-typescript-tooltip-signature-help-selected"
                : ""}` },
            utils_1.partsToStr(sig.prefixDisplayParts),
            this.renderSigHelpParams(sig.parameters, sigHelp.argumentIndex),
            utils_1.partsToStr(sig.suffixDisplayParts),
            etch.dom("div", { class: "atom-typescript-tooltip-signature-help-documentation" }, utils_1.partsToStr(sig.documentation)))));
    }
    renderSigHelpParams(params, selIdx) {
        return params.map((p, i) => (etch.dom("span", { class: `atom-typescript-tooltip-signature-help-parameter` },
            i > 0 ? ", " : null,
            etch.dom("span", { class: i === selIdx ? "atom-typescript-tooltip-signature-help-selected" : undefined }, utils_1.partsToStr(p.displayParts)))));
    }
}
exports.TooltipView = TooltipView;
//# sourceMappingURL=tooltipView.js.map