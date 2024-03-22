export default function normalizeLocale(locale: string | null) {
  return (locale || '').replace('-', '_'); // Backend wants only '_'
}
