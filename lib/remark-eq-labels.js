const visit = require('unist-util-visit');

module.exports = function remarkEqLabels() {
  return (tree) => {
    visit(tree, 'math', (node) => {
      if (!node || !node.value) return;
      const m = node.value.match(/\\label\{([^}]+)\}/);
      if (m) {
        const label = m[1];
        // remove the label from the math source
        node.value = node.value.replace(/\\label\{[^}]+\}/, '');
        node.data = node.data || {};
        node.data.hProperties = Object.assign(node.data.hProperties || {}, {
          'data-eq-label': label,
        });
      }
    });
  };
};
