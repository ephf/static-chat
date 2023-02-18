const parseNode = async function (node, rec) {
  if (
    node.nodeName == "SCRIPT" &&
    !node.hasAttribute("reloaded") &&
    !node.src
  ) {
    const script = document.createElement("script");
    script.textContent = node.innerHTML;
    script.setAttribute("reloaded", "");
    node.replaceWith(script);
    return;
  }

  if (node.nodeName == "COMPONENT") {
    const content = await fetch(
      `/components/${node.getAttribute("from")}`
    ).then((res) => res.text());
    const components = [html`${content}`, ...node.children];
    components.forEach((node) => parseNode(node, true));
    node.replaceWith(html.collect(components));
    return;
  }

  if (rec && node.children)
    [...node.children].forEach((child) => parseNode(child, true));
};

new MutationObserver((mutations) => {
  for (const { addedNodes } of mutations) {
    for (const node of addedNodes) {
      parseNode(node);
    }
  }
}).observe(document, { subtree: true, childList: true });
