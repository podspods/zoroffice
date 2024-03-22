const LOCALES = require('./locales/languages.json').Available;
const regex = LOCALES.map(({locale}) => locale).join('|');
module.exports = {
  async redirects() {
    return [
      {
        source: `/:lang(${regex})`,
        destination: '/:lang/translationTools/text',
        permanent: true,
      },
      {
        source: `/:lang(${regex})/administration`,
        destination: '/:lang/administration/translationResources',
        permanent: true,
      },
      {
        source: `/:lang(${regex})/translationTools`,
        destination: '/:lang/translationTools/text',
        permanent: true,
      },
      {
        source: `/:lang(${regex})/administration`,
        destination: '/:lang/administration/userManagement/users',
        permanent: true,
      },
      {
        source: `/:lang(${regex})/administration/userManagement`,
        destination: '/:lang/administration/userManagement/users',
        permanent: true,
      },
      {
        source: `/:lang(${regex})/administration/statistics`,
        destination: '/:lang/administration/statistics/user',
        permanent: true,
      },
      {
        source: `/:lang(${regex})/linguisticConfiguration/resources`,
        destination: '/:lang/linguisticConfiguration/resources/dictionary',
        permanent: true,
      },
      {
        source: `/:lang(${regex})/linguisticConfiguration`,
        destination: '/:lang/linguisticConfiguration/resources/dictionary',
        permanent: true,
      }
    ]
  },
  exclude: ["../components/**/*.mdx", "../components/**/*.stories.tsx", "../app/**/*.stories.tsx"]
}
