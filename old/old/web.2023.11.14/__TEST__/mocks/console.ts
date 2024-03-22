const originalConsole = global.console

const blackListedWarnings = [
  'MUI: The `anchorEl` prop provided to the component is invalid',
  'MUI: The value provided to Autocomplete is invalid',
  'componentWillReceiveProps',
  'componentWillMount'
]

const blackListedErrors = [
  'MUI: The contrast ratio of',
  'Warning: Failed %s type: %s%spropMUI: The `anchorEl` prop provided to the component is invalid.',
  'Warning: React does not recognize the `%s` prop on a DOM element. If you intentionally want it to appear in the DOM as a custom attribute, spell it as lowercase `%s` instead. If you accidentally passed it from a parent component, remove it from the DOM element.%shoverStylehoverstyle',
  'Warning: React does not recognize the `%s` prop on a DOM element. If you intentionally want it to appear in the DOM as a custom attribute, spell it as lowercase `%s` instead. If you accidentally passed it from a parent component, remove it from the DOM element.%spressedStylepressedstyle',
  'Warning: The current testing environment is not configured to support act',
  'Warning: An update to %s inside a test was not wrapped in act'
]

export const filteredConsole = {
  ...originalConsole,
  warn: (...args: any[]) => {
    if (
      typeof args[0] === 'string' && blackListedWarnings.some((value, index, array) => {
        return args[0].includes(value)
      })
    ) {
      return;
    }
    originalConsole.warn(...args)
  },
  error: (...args: any[]) => {
    // originalConsole.log('catch error', args.join(''))
    if (
      typeof args[0] === 'string' && blackListedErrors.some((value, index, array) => {
        return args.join('').includes(value)
      })
    ) {
      return;
    }
    originalConsole.error(...args)
  }
}
