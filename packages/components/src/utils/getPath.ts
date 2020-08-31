export default function getPath(obj: object, path: string) {
  if (!path || typeof path !== 'string') {
    return null;
  }
  return path
    .split(/[\[\]\.]/)
    .filter(Boolean)
    .reduce((acc, item) => (acc && acc[item] ? acc[item] : null), obj);
}
