window.html = (s, ...n) =>
  html.collect(
    Object.assign(document.createElement("div"), {
      innerHTML: s.map((s, i) => (i ? n[i - 1] + s : s)).join(""),
    }).children
  );
window.html.collect = (e) => {
  if (e.length == 1) return e[0];
  const fragment = document.createDocumentFragment();
  fragment.append(...e);
  return fragment;
};
