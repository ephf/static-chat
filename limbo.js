window.limbo = async function (callback) {
  const script = document.currentScript;
  script.replaceWith(await callback());
};
