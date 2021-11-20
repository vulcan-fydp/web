export function exhaustiveSwitch<T>(
  _switchVariable: never,
  defaultReturn?: T
): T {
  return defaultReturn as T;
}
