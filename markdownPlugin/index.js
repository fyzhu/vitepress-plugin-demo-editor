const container = require("markdown-it-container");
const markDownPlugin = function (md) {
  md.use(container, "demo", {
    validate(params) {
      return params.trim().match(/^demo\s*(.*)$/);
    },
    render(tokens, idx) {
      if (tokens[idx].nesting === 1) {
        // const description = m && m.length > 1 ? m[1] : ''
        const content =
          tokens[idx + 1].type === "fence" ? tokens[idx + 1].content : "";

        const lang = tokens[idx + 1].info;
        const props = tokens[idx].info + " ";
        const hasColumn = props.includes("column");
        const heightRes = /height\:(.*?)\s/.exec(props);
        const height = heightRes ? heightRes[1] : undefined;

        return `
        <clientOnly>
        <demo initial-value="${md.utils.escapeHtml(content)}" 
        direction="${hasColumn ? "column" : ""}"
        lang="${lang}"
        height="${height}"
        >
        `;
      }
      return "</demo></clientOnly>";
    },
  });
};
module.exports = markDownPlugin;
