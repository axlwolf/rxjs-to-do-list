const $ = {};

$.el = html => {
  const wrap = document.createElement("div");
  wrap.innerHTML = html.trim();
  return wrap.children[0];
};

export { $ };
