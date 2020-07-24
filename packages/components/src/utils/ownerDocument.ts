export default function ownerDocument(node: HTMLElement) {
  return (node && node.ownerDocument) || document;
}
