/*
 * Convert an object with nested keys into a flat list
 * of objects by key
 */
export const toList = (root) => {
  const visitRoute = (key, node, hash={}, prefix=[]) => {
    const keyPrefix = prefix.concat(key);
    const routeNestedKey = keyPrefix.join('.');

    const routeObj = Object.assign({}, node.route || {}, {
      key: routeNestedKey, routeKey: key, keyPrefix
    });
    hash[routeNestedKey] = routeObj;

    if (node.children) {
      prefix.push(key);
      Object.keys(node.children).forEach(childKey => {
        return visitRoute(childKey, node.children[childKey], hash, prefix)
      });
    }

    return hash;
  }

  // Root keys
  let routes = {};
  Object.keys(root).map(key => visitRoute(key, root[key], routes));
  return routes;
}

export default toList
