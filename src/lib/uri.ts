export function addQueryStringIfNonEmpty(params: URLSearchParams): string {
  const query = params.toString();
  if (query.length === 0) {
    return "";
  }

  return "?" + query;
}
