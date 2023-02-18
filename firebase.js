window.firebase = new Proxy(
  {},
  {
    get: (_target, prop) => (path, body) =>
      fetch(`https://static-chat-default-rtdb.firebaseio.com/${path}.json`, {
        method: prop.toUpperCase(),
        body: body && JSON.stringify(body),
      }).then((res) => res.json()),
  }
);
