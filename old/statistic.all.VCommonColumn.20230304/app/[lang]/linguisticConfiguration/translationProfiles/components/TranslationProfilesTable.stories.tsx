import {Meta, StoryObj} from '@storybook/react';
import {rest} from 'msw';
import Apis from '@/utils/apis';
import TranslationProfilesContainer from './TranslationProfilesContainer';
import userAuthorizations from '../../../../../../lib/userAuthorizations';

// TODO remove when all components switched to useTranslation
const fakei18n = {
  t: function(text: string) {
    return text || '';
  },
  language: ''
};
(global as any).i18n = fakei18n;

const meta = {
  title: 'pages/Profiles',
  parameters: {
    msw: {
      handlers: [
        rest.get(
          Apis.profiles.getListActivedProfile(
            new URLSearchParams({
              limit: '100',
              skip: '0',
              sortName: 'insertionTime',
              sortOrder: 'desc'
            })
          ),
          async (req, res, ctx) => {
            return res(ctx.delay(2000), ctx.json(profilesData));
          }
        ),
        rest.get(Apis.profiles.profilesLps, async (req, res, ctx) => {
          return res(ctx.delay(2000), ctx.json({types: ['Translate_en_es', 'Translate_en_fr', 'Translate_en_ja', 'Translate_fr_en', 'Translate_zh_en']}));
        }),
        rest.get(Apis.profiles.profilesDomain, async (req, res, ctx) => {
          return res(ctx.delay(2000), ctx.json({types: ['Generic', 'IT']}));
        }),
        rest.get(Apis.profiles.profilesOwner, async (req, res, ctx) => {
          return res(ctx.delay(2000), ctx.json({types: ['Self', 'Systran']}));
        }),
        rest.get(Apis.profiles.profilesSize, async (req, res, ctx) => {
          return res(ctx.delay(2000), ctx.json({types: ['L', 'M']}));
        }),
        rest.get(Apis.profiles.profilesTechno, async (req, res, ctx) => {
          return res(ctx.delay(2000), ctx.json({types: ['NMT']}));
        }),
        rest.get(Apis.profiles.getCoversPivotProfile, async (req, res, ctx) => {
          return res(ctx.delay(2000), ctx.json(1));
        }),
        rest.get(Apis.profiles.getEnabledProfilesNFA, async (req, res, ctx) => {
          return res(ctx.delay(2000), ctx.json(true));
        }),
        rest.get(Apis.userRoles, async (req, res, ctx) => {
          return res(ctx.delay(2000), ctx.json(roles));
        }),
        rest.get(Apis.lps + '?onlyRunning=true', async (req, res, ctx) => {
          return res(ctx.delay(2000), ctx.json([{source: 'en', target: 'fr'}]));
        }),
        rest.get(Apis.profiles.getEngines({source: 'en', target: 'fr', onlyLastVersion: true}), async (req, res, ctx) => {
          return res(ctx.delay(2000), ctx.json(engine));
        }),
        rest.get(Apis.profiles.getDictionaries({source: 'en', target: 'fr'}), async (req, res, ctx) => {
          return res(ctx.delay(2000), ctx.json({dictionaries: []}));
        })
      ]
    }
  },
  loaders: () => {
    userAuthorizations.init({
      isSuper: true,
      permissions: {
        user: true,
        'user self update': true,
        'user personal statistics': true,
        notifications: true,
        information: true,
        help: true,
        'feedback submit': true,
        'translation box': true,
        'translation box settings': true,
        'translation concordance': true,
        'translation file': true,
        'translation file postedit': true,
        'translation file PDF': true,
        labs: true,
        'user api keys': true,
        'user api credentials': true,
        'user active applications': true
      },
      userId: '65703698600719000c6640f3'
    });
  },
  component: TranslationProfilesContainer
} satisfies Meta<typeof TranslationProfilesContainer>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default = {} satisfies Story;


const profilesData = {
  services: [
    {
      profileId: 'ee806156-0f31-4202-b620-727e93393cb1',
      selectors: {
        domain: 'IT',
        owner: 'Self',
        size: 'M',
        tech: {
          name: 'Docker-OpenNMT-ctranslate',
          type: 'NMT'
        }
      },
      service: 'Translate_fr_en',
      deactivated: false,
      running: true,
      public: true,
      options: [
        {
          name: 'modelOptions',
          value: '{"locale":"en-US"}'
        },
        {
          name: 'json_schema',
          value: '{}'
        },
        {
          name: 'test2321',
          value: 'test'
        },
        {
          name: 'supported_features',
          value: '{}'
        },
        {
          name: 'formatting_spaces',
          value: 'segmenting'
        },
        {
          name: 'text_filter_pars',
          value: 'auto_detection'
        },
        {
          name: 'no_cache',
          value: '1'
        }
      ],
      version: '2.0',
      errors: [],
      insertionTime: '1702894355070',
      sharingStatus: 'public',
      access: {
        list: true,
        delete: true,
        erase: true,
        update: true
      },
      serviceName: 'Translator NMT IT (M) - FREN',
      sesProfileId: '65703754384b1e8e8a8cd515',
      source: 'fr',
      target: 'en',
      translationResource: {
        name: 'Translator NMT IT (M) - FREN',
        id: '4d48a8bb-c9a6-47b1-8cae-32a56aee0d84'
      },
      profileOptions: {
        _id: '65703754384b1e8e8a8cd515',
        resources: {
          userDict: [],
          normalization: [],
          translationChoice: {},
          translationMemory: {
            corpusIds: []
          },
          engine: {
            id: '4d48a8bb-c9a6-47b1-8cae-32a56aee0d84',
            name: 'Translator NMT IT (M) - FREN',
            type: 'nmt'
          }
        },
        filterOptions: {
          formatting: {
            textualFormattingName: 'segmenting',
            feedDefinitionName: 'auto_detection'
          },
          noTranslateOptions: {}
        },
        linguisticOptions: {
          sourceAnalysis: {
            tmMatchThresholdName: null
          },
          countryLocalization: {},
          rendering: {},
          imperative: {},
          pronouns: {},
          styleParameters: {}
        },
        profileId: 'ee806156-0f31-4202-b620-727e93393cb1',
        profileName: 'Translator NMT IT (M) - FREN',
        source: 'fr',
        target: 'en',
        selectors: {
          domain: 'IT',
          size: 'M',
          owner: 'Self',
          tech: {
            details: [
              {
                type: 'NMT',
                name: 'Docker-OpenNMT-ctranslate'
              }
            ],
            type: 'NMT',
            name: 'Docker-OpenNMT-ctranslate'
          }
        },
        noCache: true,
        enabledNFA: false,
        submittedAt: '2023-12-06T08:56:52.338Z',
        accountId: null,
        creatorName: null,
        genericOptions: [
          {
            name: 'test2321',
            value: 'test',
            id: '24'
          }
        ],
        updateAt: '2023-12-18T10:12:34.536Z',
        modelOptions: {
          locale: 'en-US'
        },
        dependentProfiles: []
      }
    },
    {
      profileId: '7690c047-c36a-4615-a118-be683e91ebec',
      selectors: {
        domain: 'Generic',
        owner: 'Self',
        size: 'L',
        tech: {
          name: 'Docker-OpenNMT-ctranslate',
          type: 'NMT'
        }
      },
      service: 'Translate_en_fr',
      deactivated: false,
      running: true,
      public: true,
      options: [
        {
          name: 'tm_corpus_ids',
          value: '657a660c70d82e8c5c05b567'
        },
        {
          name: 'tm_server_host',
          value: '192.168.20.43'
        },
        {
          name: 'tm_server_port',
          value: '8889'
        },
        {
          name: 'tm_server_with_https',
          value: 'false'
        },
        {
          name: 'json_schema',
          value: '{}'
        },
        {
          name: 'supported_features',
          value: '{"ND":true,"UD":true,"TM":true,"NFA":true}'
        }
      ],
      version: '2.0',
      errors: [],
      insertionTime: '1702542460749',
      sharingStatus: 'public',
      access: {
        list: true,
        delete: true,
        erase: true,
        update: true
      },
      serviceName: 'Translator NMT Generic (L) - ENFR',
      sesProfileId: '65703754384b1e0b6e8cd513',
      source: 'en',
      target: 'fr',
      translationResource: {
        name: 'Translator NMT Generic (L) - ENFR',
        id: '548b59bd-4a81-4743-ba4c-a0c0768c9acc'
      },
      profileOptions: {
        _id: '65703754384b1e0b6e8cd513',
        resources: {
          userDict: [],
          normalization: [],
          translationChoice: {},
          translationMemory: {
            corpusIds: ['657a660c70d82e8c5c05b567'],
            host: '192.168.20.43',
            port: '8889',
            withHttps: false
          },
          engine: {
            id: '548b59bd-4a81-4743-ba4c-a0c0768c9acc',
            name: 'Translator NMT Generic (L) - ENFR',
            modelOptions: {
              supported_features: {
                ND: true,
                UD: true,
                TM: true,
                NFA: true
              }
            },
            type: 'nmt'
          }
        },
        filterOptions: {
          formatting: {},
          noTranslateOptions: {}
        },
        linguisticOptions: {
          sourceAnalysis: {
            tmMatchThresholdName: null
          },
          countryLocalization: {},
          rendering: {},
          imperative: {},
          pronouns: {},
          styleParameters: {}
        },
        profileId: '7690c047-c36a-4615-a118-be683e91ebec',
        profileName: 'Translator NMT Generic (L) - ENFR',
        source: 'en',
        target: 'fr',
        selectors: {
          domain: 'Generic',
          size: 'L',
          owner: 'Self',
          tech: {
            details: [
              {
                type: 'NMT',
                name: 'Docker-OpenNMT-ctranslate'
              }
            ],
            type: 'NMT',
            name: 'Docker-OpenNMT-ctranslate'
          }
        },
        noCache: false,
        enabledNFA: false,
        submittedAt: '2023-12-06T08:56:52.336Z',
        accountId: null,
        creatorName: null,
        updateAt: '2023-12-14T08:27:39.898Z',
        dependentProfiles: []
      }
    },
    {
      profileId: '5c60a589-4086-4988-837a-814beb6cce06',
      selectors: {
        domain: 'Generic',
        owner: 'Systran',
        size: 'L',
        tech: {
          name: 'Docker-OpenNMT-ctranslate',
          type: 'NMT'
        }
      },
      service: 'Translate_en_ja',
      deactivated: false,
      running: true,
      public: true,
      options: [
        {
          name: 'modelOptions',
          value: '{"latin space":"no-space","latin full width":"no-full-width"}'
        },
        {
          name: 'json_schema',
          value:
            '{"properties":{"latin space":{"default":"no-space","enum":["space","no-space"],"title":"Latin Space","type":"string"},"latin full width":{"default":"no-full-width","enum":["no-full-width","full-width"],"title":"Latin Full Width","type":"string"}},"title":"Inference options : Locale, Latin Space, Latin Full Width","type":"object"}'
        },
        {
          name: 'supported_features',
          value: '{"TM":true,"ND":true,"UD":true,"NFA":true}'
        }
      ],
      version: '2.0',
      errors: [],
      insertionTime: '1702375361558',
      sharingStatus: 'public',
      access: {
        list: true,
        delete: true,
        erase: true,
        update: true
      },
      serviceName: 'Translator NMT Generic (L) - ENJA',
      sesProfileId: '65703754384b1e0ffe8cd511',
      source: 'en',
      target: 'ja',
      translationResource: {
        name: 'Translator NMT Generic (L) - ENJA',
        id: 'b7f98ea6-8717-4669-909e-2612256334c5'
      },
      profileOptions: {
        _id: '65703754384b1e0ffe8cd511',
        resources: {
          userDict: [],
          normalization: [],
          translationChoice: {},
          translationMemory: {
            corpusIds: []
          },
          engine: {
            id: 'b7f98ea6-8717-4669-909e-2612256334c5',
            name: 'Translator NMT Generic (L) - ENJA',
            modelOptions: {
              supported_features: {
                TM: true,
                ND: true,
                UD: true,
                NFA: true
              },
              json_schema: {
                properties: {
                  'latin space': {
                    default: 'no-space',
                    enum: ['space', 'no-space'],
                    title: 'Latin Space',
                    type: 'string'
                  },
                  'latin full width': {
                    default: 'no-full-width',
                    enum: ['no-full-width', 'full-width'],
                    title: 'Latin Full Width',
                    type: 'string'
                  }
                },
                title: 'Inference options : Locale, Latin Space, Latin Full Width',
                type: 'object'
              }
            },
            type: 'nmt'
          }
        },
        filterOptions: {
          formatting: {},
          noTranslateOptions: {}
        },
        linguisticOptions: {
          sourceAnalysis: {
            tmMatchThresholdName: null
          },
          countryLocalization: {},
          rendering: {},
          imperative: {},
          pronouns: {},
          styleParameters: {}
        },
        profileId: '5c60a589-4086-4988-837a-814beb6cce06',
        profileName: 'Translator NMT Generic (L) - ENJA',
        source: 'en',
        target: 'ja',
        selectors: {
          domain: 'Generic',
          size: 'L',
          owner: 'Systran',
          tech: {
            details: [
              {
                type: 'NMT',
                name: 'Docker-OpenNMT-ctranslate'
              }
            ],
            type: 'NMT',
            name: 'Docker-OpenNMT-ctranslate'
          }
        },
        noCache: false,
        enabledNFA: false,
        submittedAt: '2023-12-06T08:56:52.335Z',
        accountId: null,
        creatorName: null,
        modelOptions: {
          'latin space': 'no-space',
          'latin full width': 'no-full-width'
        },
        updateAt: '2023-12-12T10:02:40.037Z',
        dependentProfiles: []
      }
    },
    {
      profileId: 'ec8722a4-0845-4791-a173-e55d5a4536cd',
      selectors: {
        domain: 'Generic',
        owner: 'Systran',
        size: 'L',
        tech: {
          name: 'Docker-OpenNMT-ctranslate',
          type: 'NMT'
        }
      },
      service: 'Translate_fr_en',
      deactivated: false,
      running: true,
      public: true,
      options: [
        {
          name: 'json_schema',
          value: '{"properties":{"locale":{"default":"en-US","enum":["en-US","en-GB","en-CA"],"title":"Locale","type":"string"}},"title":"Locale","type":"object"}'
        },
        {
          name: 'supported_features',
          value: '{"ND":true,"TM":true,"UD":true,"NFA":true,"Multi-Locale":true}'
        }
      ],
      version: '2.0',
      errors: [],
      insertionTime: '1702350677833',
      sharingStatus: 'public',
      access: {
        list: true,
        delete: true,
        erase: true,
        update: true
      },
      serviceName: 'Translator NMT Generic (L) - FREN',
      sesProfileId: '65703754384b1e2cc78cd512',
      source: 'fr',
      target: 'en',
      translationResource: {
        name: 'Translator NMT Generic (L) - FREN',
        id: 'c1659c3e-83d9-4252-a759-2b894d2fabfb'
      },
      profileOptions: {
        _id: '65703754384b1e2cc78cd512',
        resources: {
          userDict: [],
          normalization: [],
          translationChoice: {},
          translationMemory: {
            corpusIds: []
          },
          engine: {
            id: 'c1659c3e-83d9-4252-a759-2b894d2fabfb',
            name: 'Translator NMT Generic (L) - FREN',
            modelOptions: {
              supported_features: {
                ND: true,
                TM: true,
                UD: true,
                NFA: true,
                'Multi-Locale': true
              },
              json_schema: {
                properties: {
                  locale: {
                    default: 'en-US',
                    enum: ['en-US', 'en-GB', 'en-CA'],
                    title: 'Locale',
                    type: 'string'
                  }
                },
                title: 'Locale',
                type: 'object'
              }
            },
            type: 'nmt'
          }
        },
        filterOptions: {
          formatting: {},
          noTranslateOptions: {}
        },
        linguisticOptions: {
          sourceAnalysis: {
            tmMatchThresholdName: null
          },
          countryLocalization: {},
          rendering: {},
          imperative: {},
          pronouns: {},
          styleParameters: {}
        },
        profileId: 'ec8722a4-0845-4791-a173-e55d5a4536cd',
        profileName: 'Translator NMT Generic (L) - FREN',
        source: 'fr',
        target: 'en',
        selectors: {
          domain: 'Generic',
          size: 'L',
          owner: 'Systran',
          tech: {
            details: [
              {
                type: 'NMT',
                name: 'Docker-OpenNMT-ctranslate'
              }
            ],
            type: 'NMT',
            name: 'Docker-OpenNMT-ctranslate'
          }
        },
        noCache: false,
        enabledNFA: false,
        submittedAt: '2023-12-06T08:56:52.336Z',
        accountId: null,
        creatorName: null,
        updateAt: '2023-12-12T03:11:17.573Z',
        dependentProfiles: []
      }
    },
    {
      profileId: '3dc9f185-9304-4136-94c4-54b54ba6da7c',
      selectors: {
        domain: 'Generic',
        owner: 'Systran',
        size: 'L',
        tech: {
          name: 'Docker-OpenNMT-ctranslate',
          type: 'NMT'
        }
      },
      service: 'Translate_en_es',
      deactivated: false,
      running: true,
      public: true,
      options: [
        {
          name: 'json_schema',
          value: '{}'
        },
        {
          name: 'supported_features',
          value: '{"ND":true,"TM":true,"UD":true,"NFA":true}'
        }
      ],
      version: '2.0',
      errors: [],
      insertionTime: '1701853012482',
      sharingStatus: 'public',
      access: {
        list: true,
        delete: true,
        erase: true,
        update: true
      },
      serviceName: 'Translator NMT Generic (L) - ENES',
      sesProfileId: '65703754384b1e60e48cd514',
      source: 'en',
      target: 'es',
      translationResource: {
        name: 'Translator NMT Generic (L) - ENES',
        id: 'f4d6b5fc-db45-4898-9f0c-86842eb2d5e3'
      },
      profileOptions: {
        _id: '65703754384b1e60e48cd514',
        resources: {
          userDict: [],
          normalization: [],
          translationChoice: {},
          translationMemory: {
            corpusIds: []
          },
          engine: {
            id: 'f4d6b5fc-db45-4898-9f0c-86842eb2d5e3',
            name: 'Translator NMT Generic (L) - ENES',
            modelOptions: {
              supported_features: {
                ND: true,
                TM: true,
                UD: true,
                NFA: true
              }
            },
            type: 'nmt'
          }
        },
        filterOptions: {
          formatting: {},
          noTranslateOptions: {}
        },
        linguisticOptions: {
          sourceAnalysis: {
            tmMatchThresholdName: null
          },
          countryLocalization: {},
          rendering: {},
          imperative: {},
          pronouns: {},
          styleParameters: {}
        },
        profileId: '3dc9f185-9304-4136-94c4-54b54ba6da7c',
        profileName: 'Translator NMT Generic (L) - ENES',
        source: 'en',
        target: 'es',
        selectors: {
          domain: 'Generic',
          size: 'L',
          owner: 'Systran',
          tech: {
            details: [
              {
                type: 'NMT',
                name: 'Docker-OpenNMT-ctranslate'
              }
            ],
            type: 'NMT',
            name: 'Docker-OpenNMT-ctranslate'
          }
        },
        noCache: false,
        enabledNFA: false,
        submittedAt: '2023-12-06T08:56:52.337Z',
        accountId: null,
        creatorName: null,
        dependentProfiles: []
      }
    },
    {
      profileId: '30dd2515-3213-41d4-b4e7-ab307cf7dc40',
      selectors: {
        domain: 'Generic',
        owner: 'Systran',
        size: 'L',
        tech: {
          name: 'Docker-OpenNMT-ctranslate',
          type: 'NMT'
        }
      },
      service: 'Translate_zh_en',
      deactivated: false,
      running: true,
      public: true,
      options: [
        {
          name: 'json_schema',
          value: '{"properties":{"locale":{"default":"en-US","enum":["en-US","en-CA","en-GB"],"title":"Locale","type":"string"}},"title":"Locale","type":"object"}'
        },
        {
          name: 'supported_features',
          value: '{"ND":true,"TM":true,"UD":true,"Multi-Locale":true,"NFA":true}'
        }
      ],
      version: '2.0',
      errors: [],
      insertionTime: '1701853012482',
      sharingStatus: 'public',
      access: {
        list: true,
        delete: true,
        erase: true,
        update: true
      },
      serviceName: 'Translator NMT Generic (L) - ZHEN',
      sesProfileId: '65703754384b1eda7e8cd510',
      source: 'zh',
      target: 'en',
      translationResource: {
        name: 'Translator NMT Generic (L) - ZHEN',
        id: 'fb8cc1e6-9876-49d0-b906-c8b3cc5dfd62'
      },
      profileOptions: {
        _id: '65703754384b1eda7e8cd510',
        resources: {
          userDict: [],
          normalization: [],
          translationChoice: {},
          translationMemory: {
            corpusIds: []
          },
          engine: {
            id: 'fb8cc1e6-9876-49d0-b906-c8b3cc5dfd62',
            name: 'Translator NMT Generic (L) - ZHEN',
            modelOptions: {
              supported_features: {
                ND: true,
                TM: true,
                UD: true,
                'Multi-Locale': true,
                NFA: true
              },
              json_schema: {
                properties: {
                  locale: {
                    default: 'en-US',
                    enum: ['en-US', 'en-CA', 'en-GB'],
                    title: 'Locale',
                    type: 'string'
                  }
                },
                title: 'Locale',
                type: 'object'
              }
            },
            type: 'nmt'
          }
        },
        filterOptions: {
          formatting: {},
          noTranslateOptions: {}
        },
        linguisticOptions: {
          sourceAnalysis: {
            tmMatchThresholdName: null
          },
          countryLocalization: {},
          rendering: {},
          imperative: {},
          pronouns: {},
          styleParameters: {}
        },
        profileId: '30dd2515-3213-41d4-b4e7-ab307cf7dc40',
        profileName: 'Translator NMT Generic (L) - ZHEN',
        source: 'zh',
        target: 'en',
        selectors: {
          domain: 'Generic',
          size: 'L',
          owner: 'Systran',
          tech: {
            details: [
              {
                type: 'NMT',
                name: 'Docker-OpenNMT-ctranslate'
              }
            ],
            type: 'NMT',
            name: 'Docker-OpenNMT-ctranslate'
          }
        },
        noCache: false,
        enabledNFA: false,
        submittedAt: '2023-12-06T08:56:52.335Z',
        accountId: null,
        creatorName: null,
        dependentProfiles: []
      }
    }
  ],
  total: 7,
  offset: 0
};
const roles = {
  name: {
    familyName: 'Administrator'
  },
  provider: 'local',
  enable: true,
  email: 'admin@systran.fr',
  groups: [],
  roles: [
    {
      id: '65703698600719000c6640ed',
      name: 'Default User'
    },
    {
      id: '65703692600719000c6640cd',
      name: 'super'
    }
  ],
  displayName: 'Administrator',
  groupRoles: [],
  id: '65703698600719000c6640f3',
  authorizations: {
    isSuper: true,
    permissions: {
      user: true,
      'user self update': true,
      'user personal statistics': true,
      notifications: true,
      information: true,
      help: true,
      'feedback submit': true,
      'translation box': true,
      'translation box settings': true,
      'translation concordance': true,
      'translation file': true,
      'translation file postedit': true,
      'translation file PDF': true,
      labs: true,
      'user api keys': true,
      'user api credentials': true,
      'user active applications': true
    },
    userId: '65703698600719000c6640f3'
  },
  preferences: {
    notificationLevel: 'info',
    localizationLanguage: 'auto'
  }
};
const engine = {
  engines: [
    {
      _id: '657037305b356adc08e6e425',
      id: '548b59bd-4a81-4743-ba4c-a0c0768c9acc',
      configuration: {
        dependencies: {
          names: ['TranslatorInternalContainer_enfr_Generic_L', 'TranslatorInternalPTE_enfr_Generic_L']
        }
      },
      dependencies: {
        TranslatorInternalContainer_enfr_Generic_L: '9.3.4',
        TranslatorInternalPTE_enfr_Generic_L: '9.3.4'
      },
      description: {
        distrib: 'all',
        architecture: 'x86_64',
        description: 'enfr NMT Generic (L) - Master',
        key: '548b59bd-4a81-4743-ba4c-a0c0768c9acc',
        name: 'Translator NMT Generic (L) - ENFR',
        role: 'TranslatorNMT_enfr_Generic_L',
        runnable: true,
        model: 'CLKVW_enfr_CigaleExtatiquev2_394_1b52e043-813d5_release',
        service: 'Translate_en_fr',
        sourceLanguage: 'en',
        targetLanguage: 'fr',
        type: 'flow translator nmt',
        flow: ['TranslatorInternalContainer_enfr_Generic_L', 'TranslatorInternalPTE_enfr_Generic_L'],
        modelOptions: {
          supported_features: {
            ND: true,
            UD: true,
            TM: true,
            NFA: true
          }
        },
        version: '9.3.4'
      },
      insertedAt: '2023-01-11T13:15:39.637Z',
      linguisticProfileSchema: '3.0.0',
      local: {
        insertedAt: '2023-12-06T08:54:29.216Z',
        insertedBy: 'poller',
        insertedByParameters: {
          after: null
        },
        updatedAt: '2023-12-06T08:54:29.216Z'
      },
      master: true,
      packageDependencies: {
        'systran-translation-dispatcher': '^8.14'
      },
      rejected: true,
      selectors: {
        owner: 'Systran',
        domain: 'Generic',
        languagePair: 'enfr',
        size: 'L',
        tech: {
          details: [
            {
              type: 'NMT',
              name: 'Docker-OpenNMT-ctranslate'
            }
          ],
          type: 'NMT',
          name: 'Docker-OpenNMT-ctranslate'
        }
      },
      stages: ['testing'],
      updatedAt: '2023-01-11T13:16:57.786Z',
      version: {
        major: 9,
        minor: 3,
        patch: 4
      },
      list: {
        computingNodes: [
          {
            id: 'trm',
            hostname: 'trm',
            lastUpdate: '2023-12-23T07:00:07.821Z',
            nodeStatus: 'running',
            nbInstances: 1,
            nbInstancesRequested: 1,
            dependencies: [
              {
                architecture: 'x86_64',
                convergenceState: 'ok',
                dependencies: [
                  {
                    convergenceState: 'ok',
                    id: '92a3d8d9-aa32-4e51-89f9-f9ae1e4e8d1f',
                    role: 'CommonImageCTranslate',
                    status: 'downloaded'
                  },
                  {
                    convergenceState: 'ok',
                    id: 'b0b85d25-694c-4d66-85a0-3988055d511b',
                    role: 'TranslatorInternalContainerData_enfr_Generic_L',
                    status: 'downloaded'
                  }
                ],
                description: 'enfr Generic (L) - Container Part',
                distrib: 'all',
                expectedInstanceCount: 1,
                expectedStatus: 'running',
                id: '9c33a332-8d74-47a9-b4ed-729594a2828d',
                instanceCount: 1,
                instances: [
                  {
                    id: 'lxqnopq6inlg',
                    image: 'systran/pn9_ctranslate_gpu:v1.80.1-beta1',
                    name: 'trm_9c33a332-8d74-47a9-b4ed-729594a2828d.1',
                    status: 'Running 2 weeks ago'
                  }
                ],
                internal: 'true',
                isContainerTR: 'true',
                name: 'Container Generic (L) enfr',
                role: 'TranslatorInternalContainer_enfr_Generic_L',
                runnable: 'true',
                sourceLanguage: 'en',
                status: 'running',
                targetLanguage: 'fr',
                type: 'container profile',
                version_pushProfile: '3.2.10'
              },
              {
                architecture: 'x86_64',
                convergenceState: 'ok',
                dependencies: [
                  {
                    convergenceState: 'ok',
                    id: '2239b878-f944-46d7-be5f-6846baaa7eac',
                    role: 'TranslatorInternalPTEData_enfr_Generic_L',
                    status: 'downloaded'
                  },
                  {
                    convergenceState: 'ok',
                    id: 'f7628897-ec21-466a-aa6f-78dc8f8170a2',
                    role: 'CommonPTE',
                    status: 'downloaded'
                  }
                ],
                description: 'enfr Generic (L) - PTE Part',
                distrib: 'all',
                expectedInstanceCount: 1,
                expectedStatus: 'running',
                id: '7ea61879-12a4-4433-a9e9-e6ac1ab14345',
                instanceCount: 1,
                instances: [
                  {
                    id: '6e6b7e76-4bed-48df-ba60-340d3dff9207',
                    memory: 19712,
                    nbRestart: 0,
                    pid: 1205,
                    status: 'started'
                  }
                ],
                internal: 'true',
                isCompatibleWithRabbitmqCA: 'true',
                isCompatibleWithRedisClusterAndRedisSentinel: 'true',
                isPTETR: 'true',
                name: 'PTE Generic (L) enfr',
                role: 'TranslatorInternalPTE_enfr_Generic_L',
                runVersion: '9.5',
                runnable: 'true',
                service: 'Translate_en_fr',
                sourceLanguage: 'en',
                status: 'running',
                targetLanguage: 'fr',
                type: 'PTE profile',
                version_pushProfile: '3.2.10'
              }
            ],
            status: 'running',
            expectedStatus: 'running',
            convergenceState: 'ok'
          }
        ],
        expectedStatus: 'running',
        installableComputingNodes: [],
        lastUpdate: '2023-12-23T07:00:08.725Z',
        nbInstances: 1,
        nbInstancesRequested: 1,
        status: 'running',
        flow: [
          {
            depId: '9c33a332-8d74-47a9-b4ed-729594a2828d',
            nbInstances: 1,
            nbInstancesRequested: 1,
            status: 'running',
            expectedStatus: 'running'
          },
          {
            depId: '7ea61879-12a4-4433-a9e9-e6ac1ab14345',
            nbInstances: 1,
            nbInstancesRequested: 1,
            status: 'running',
            expectedStatus: 'running'
          }
        ],
        id: '548b59bd-4a81-4743-ba4c-a0c0768c9acc',
        pivot: null,
        activatedProfiles: 2,
        profiles: 2,
        routes: [
          {
            comment: {
              profileId: '65703754384b1e0b6e8cd513',
              serviceName: 'Translator NMT Generic (L) - ENFR',
              tm_corpus_ids: ['657a660c70d82e8c5c05b567'],
              translationResourceId: '548b59bd-4a81-4743-ba4c-a0c0768c9acc',
              translationResourceName: 'Translator NMT Generic (L) - ENFR'
            },
            deactivated: false,
            flow: [
              {
                options: [
                  {
                    name: 'tm_corpus_ids',
                    value: '657a660c70d82e8c5c05b567'
                  },
                  {
                    name: 'tm_server_host',
                    value: '192.168.20.43'
                  },
                  {
                    name: 'tm_server_port',
                    value: '8889'
                  },
                  {
                    name: 'tm_server_with_https',
                    value: 'false'
                  },
                  {
                    name: 'json_schema',
                    value: '{}'
                  },
                  {
                    name: 'supported_features',
                    value: '{"ND":true,"UD":true,"TM":true,"NFA":true}'
                  }
                ],
                profileId: 'b291b5e7-bb5d-4662-ba28-a7ce33c9b637',
                serviceName: 'Translate_en_fr'
              }
            ],
            insertionTime: '1702542460749',
            internal: false,
            json_schema: {
              additionalProperties: false
            },
            options: [
              {
                name: 'tm_corpus_ids',
                value: '657a660c70d82e8c5c05b567'
              },
              {
                name: 'tm_server_host',
                value: '192.168.20.43'
              },
              {
                name: 'tm_server_port',
                value: '8889'
              },
              {
                name: 'tm_server_with_https',
                value: 'false'
              },
              {
                name: 'json_schema',
                value: '{}'
              },
              {
                name: 'supported_features',
                value: '{"ND":true,"UD":true,"TM":true,"NFA":true}'
              }
            ],
            priority: 0,
            profileId: '7690c047-c36a-4615-a118-be683e91ebec',
            public: true,
            queue: 'flow',
            running: true,
            selectors: {
              domain: 'Generic',
              owner: 'Self',
              size: 'L',
              tech: {
                name: 'Docker-OpenNMT-ctranslate',
                type: 'NMT'
              }
            },
            service: 'Translate_en_fr',
            version: '2.0',
            serverVersion: '9ec80aee-5c54-4ea3-8123-14a4169d66f0_8.23.1-0.el7',
            insertedAt: '2023-12-19T04:56:00.435Z',
            source: 'en',
            target: 'fr',
            sharingStatus: 'public',
            serviceName: 'Translator NMT Generic (L) - ENFR'
          },
          {
            comment: {
              profileId: '65811dde3e39d91aea51bc5a',
              serviceName: 'testsa',
              translationResourceId: '548b59bd-4a81-4743-ba4c-a0c0768c9acc',
              translationResourceName: 'Translator NMT Generic (L) - ENFR'
            },
            deactivated: false,
            flow: [
              {
                options: [
                  {
                    name: 'json_schema',
                    value: '{}'
                  },
                  {
                    name: 'supported_features',
                    value: '{"ND":true,"UD":true,"TM":true,"NFA":true}'
                  }
                ],
                profileId: '6c549cd2-e247-4bd4-a753-66754fb6c0f4',
                serviceName: 'Translate_en_fr'
              }
            ],
            insertionTime: '1702961755770',
            internal: false,
            json_schema: {
              additionalProperties: false
            },
            options: [
              {
                name: 'json_schema',
                value: '{}'
              },
              {
                name: 'supported_features',
                value: '{"ND":true,"UD":true,"TM":true,"NFA":true}'
              }
            ],
            priority: 0,
            profileId: '814a835d-2441-46a2-bf09-01f26c6c67b4',
            public: true,
            queue: 'flow',
            running: true,
            selectors: {
              domain: 'Generic',
              owner: 'Systran',
              size: 'L',
              tech: {
                name: 'Docker-OpenNMT-ctranslate',
                type: 'NMT'
              }
            },
            service: 'Translate_en_fr',
            version: '2.0',
            serverVersion: '9ec80aee-5c54-4ea3-8123-14a4169d66f0_8.23.1-0.el7',
            insertedAt: '2023-12-19T04:56:00.436Z',
            source: 'en',
            target: 'fr',
            sharingStatus: 'public',
            serviceName: 'testsa'
          }
        ],
        runningProfiles: 2,
        defaultDowngradeTr: {
          _id: '657037305b356adc08e6e6dd',
          id: '422fa011-5a0b-4922-ae6e-99dbae47f772',
          dependencies: {
            TranslatorInternalContainer_enfr_Generic_L: '9.3.3',
            TranslatorInternalPTE_enfr_Generic_L: '9.3.3'
          },
          description: {
            name: 'Translator NMT Generic (L) - ENFR',
            service: 'Translate_en_fr',
            version: '9.3.3'
          },
          insertedAt: '2022-12-07T11:43:42.824Z',
          packageDependencies: {
            'systran-translation-dispatcher': '^8.14'
          },
          rejected: false,
          defaultDowngrade: true
        },
        defaultUpgradeTr: {
          id: '548b59bd-4a81-4743-ba4c-a0c0768c9acc',
          defaultUpgrade: true,
          upgradeableDependency: true,
          insertedAt: '2023-01-11T13:15:32.272Z',
          dependencies: {
            TranslatorInternalContainer_enfr_Generic_L: '9.3.4',
            TranslatorInternalPTE_enfr_Generic_L: '9.3.4'
          },
          description: {
            id: 'fb61d28d-5f4a-4c1a-aeb3-475040a5035c',
            name: 'Common Image',
            version: '9.5.22'
          }
        },
        downgradeable: true,
        upgradeable: true
      },
      installBody: {
        dependencies: {
          TranslatorInternalContainer_enfr_Generic_L: '9c33a332-8d74-47a9-b4ed-729594a2828d',
          TranslatorInternalPTE_enfr_Generic_L: '7ea61879-12a4-4433-a9e9-e6ac1ab14345'
        },
        options: {}
      }
    }
  ]
};
