export function stringToNumberOrDefault<T>(str: string, defaultValue: T) {
  const parsedValue = parseInt(str, 10);
  return isNaN(parsedValue) ? defaultValue : parsedValue;
}
