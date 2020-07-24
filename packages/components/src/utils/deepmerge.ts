export function isPlainObect(item) {
  return item && typeof item === 'object' && item.constructor === Object;
}

export default function deepmerge(target: Object, source: Object, options = { clone: true }) {
  const output = options.clone ? { ...target } : target;
  Object.keys(source).forEach(key => {
    if (key === '__proto__') {
      return;
    }
    if (isPlainObect(source[key]) && key in target) {
      output[key] = deepmerge(target[key], source[key], options);
    } else {
      output[key] = source[key];
    }
  });
  return output;
}
