function* compositionFunctionGenerator<T>(
  initialValue: T,
  compositionFn: (t: T) => T
) {
  let value = initialValue;
  while (true) {
    yield value;
    value = compositionFn(value);
  }
}

export function useCompositionFunction<T>(
  initialValue: T,
  compositionFn: (t: T) => T
): () => T {
  const iter = compositionFunctionGenerator(initialValue, compositionFn);

  return () => iter.next().value!;
}
