export function keyToBytes(e: KeyboardEvent): Uint8Array | null {
  const enc = new TextEncoder();

  if (e.ctrlKey && !e.altKey) {
    const k = e.key.toLowerCase();
    if (k.length === 1 && k >= "a" && k <= "z") return new Uint8Array([k.charCodeAt(0) - 96]);
    if (e.key === "[")  return new Uint8Array([27]);
    if (e.key === "\\") return new Uint8Array([28]);
    if (e.key === "]")  return new Uint8Array([29]);
    if (e.key === "_" || e.key === "/") return new Uint8Array([31]);
    if (e.key === "Backspace") return new Uint8Array([8]);
  }

  if (e.altKey && !e.ctrlKey && e.key.length === 1) {
    return new Uint8Array([27, e.key.charCodeAt(0)]);
  }

  switch (e.key) {
    case "ArrowUp":    return new Uint8Array([27, 91, 65]);
    case "ArrowDown":  return new Uint8Array([27, 91, 66]);
    case "ArrowRight": return new Uint8Array([27, 91, 67]);
    case "ArrowLeft":  return new Uint8Array([27, 91, 68]);
    case "Home":       return new Uint8Array([27, 91, 72]);
    case "End":        return new Uint8Array([27, 91, 70]);
    case "PageUp":     return new Uint8Array([27, 91, 53, 126]);
    case "PageDown":   return new Uint8Array([27, 91, 54, 126]);
    case "Delete":     return new Uint8Array([27, 91, 51, 126]);
    case "Insert":     return new Uint8Array([27, 91, 50, 126]);
    case "F1":         return new Uint8Array([27, 79, 80]);
    case "F2":         return new Uint8Array([27, 79, 81]);
    case "F3":         return new Uint8Array([27, 79, 82]);
    case "F4":         return new Uint8Array([27, 79, 83]);
    case "Backspace":  return new Uint8Array([127]);
    case "Enter":      return new Uint8Array([13]);
    case "Tab":        return new Uint8Array([9]);
    case "Escape":     return new Uint8Array([27]);
    default:
      if (e.key.length === 1 && !e.ctrlKey && !e.metaKey) {
        return enc.encode(e.key);
      }
      return null;
  }
}
