const visit = require('unist-util-visit');

module.exports = function rehypeEqNums() {
  return (tree) => {
    let counter = 0;
    visit(tree, 'element', (node) => {
      if (!node.properties) return;
      const label = node.properties['data-eq-label'] || node.properties['data-eq_label'] || node.properties['data-eqlabel'];
      if (label) {
        counter += 1;
        // set id
        node.properties.id = `eq:${label}`;
        node.properties['data-eq-number'] = String(counter);

        // append an eqnum span to the element children
        const span = {
          type: 'element',
          tagName: 'span',
          properties: { className: ['eqnum'] },
          children: [{ type: 'text', value: `(${counter})` }],
        };

        // If the outer element is a block (e.g., display math), append the eqnum
        node.children = node.children || [];
        node.children.push(span);
      }
    });
  };
};
