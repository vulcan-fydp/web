export function idify(text: string): string {
  return text.replaceAll(" ", "-").toLowerCase();
}
