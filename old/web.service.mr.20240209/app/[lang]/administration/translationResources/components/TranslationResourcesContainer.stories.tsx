import {Meta, StoryObj} from '@storybook/react';
import {rest} from 'msw';
import Apis from '@/utils/apis';
import userAuthorizations from '../../../../../../lib/userAuthorizations';
import TranslationResourcesContainer from './TranslationResourcesContainer';

// TODO remove when all components switched to useTranslation
const fakei18n = {
  t: function(text: string) {
    return text || '';
  },
  language: ''
};
(global as any).i18n = fakei18n;

const meta = {
  title: 'pages/TranslationResources',
  parameters: {
    msw: {
      handlers: [
        rest.get(Apis.translationResources.getComputingNodesLight, async (req, res, ctx) => {
          return res(ctx.delay(2000), ctx.json([{hostname: 'trm', _id: '65a8c8e41b005da2793008c5'}]));
        }),
        rest.get(Apis.translationResources.getStatus, async (req, res, ctx) => {
          return res(ctx.delay(2000), ctx.json({types: ['downloaded', 'installed', 'running', 'not installed']}));
        }),
        rest.get(Apis.translationResources.getDomains, async (req, res, ctx) => {
          return res(ctx.delay(2000), ctx.json({types: ['ATT', 'Adobe', 'Adobe$v', 'AdobeTM', 'Adobe_DMA_DOCS', 'Adobe_DMA_DOCS_TW', 'Adobe_DMA_DOCS_ZT']}));
        }),
        rest.get(Apis.translationResources.getOwners, async (req, res, ctx) => {
          return res(ctx.delay(2000), ctx.json({types: ['AFNOR', 'AFP', 'ATT', 'Adidas', 'Adobe', 'AeriaGames', 'Aglatech14', 'AiLingGo', 'Ariel_Corporation']}));
        }),
        rest.get(Apis.translationResources.getTechnos, async (req, res, ctx) => {
          return res(ctx.delay(2000), ctx.json({types: ['NMT', 'RBMT', 'RBMT+SPE', 'SMT', 'SPE']}));
        }),
        rest.get(Apis.translationResources.getList, async (req, res, ctx) => {
          return res(ctx.delay(2000), ctx.json(listData));
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
  component: TranslationResourcesContainer
} satisfies Meta<typeof TranslationResourcesContainer>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default = {} satisfies Story;

const listData = {
  total: 3077,
  offset: 0,
  translationResources: [
    {
      id: 'df2d1937-cb20-4ef4-bce5-4815946ece37',
      insertedAt: '2024-01-09T16:09:00.619Z',
      updatedAt: '2024-01-11T10:06:25.452Z',
      computingNodes: [
        {
          id: 'trm',
          hostname: 'trm',
          lastUpdate: '2024-01-18T07:31:09.697Z',
          nodeStatus: 'running',
          nbInstances: 1,
          status: 'running',
          expectedStatus: 'running',
          convergenceState: 'ok',
          instances: [
            {
              id: '8efc87c3-49f8-473a-86d5-c999b36805d6',
              memory: 286168,
              nbRestart: 0,
              pid: 1328,
              status: 'started'
            }
          ],
          statusFailed: false
        }
      ],
      expectedStatus: 'running',
      installableComputingNodes: [],
      lastUpdate: '2024-01-18T07:31:09.703Z',
      nbInstances: 1,
      nbInstancesRequested: 1,
      role: 'SystranFilterEngine',
      status: 'running',
      defaultDowngradeTr: {
        _id: '65a8d3305c67f6ab55c97807',
        id: '6b7c67c7-17ad-46da-a248-bcac75afc0db',
        dependencies: {},
        description: {
          name: 'Filter',
          service: 'Filter',
          version: '24.2.0'
        },
        insertedAt: '2023-12-28T13:58:08.827Z',
        packageDependencies: {
          'systran-translation-dispatcher': '^8.14'
        },
        rejected: false,
        defaultDowngrade: true
      },
      defaultUpgradeTr: null,
      downgradeable: true,
      upgradeable: false,
      activatedProfiles: 1,
      profiles: 1,
      routes: [
        {
          comment: {
            serviceName: 'Filter',
            translationResourceId: 'df2d1937-cb20-4ef4-bce5-4815946ece37',
            translationResourceName: 'Filter'
          },
          deactivated: false,
          insertionTime: '1705562969095',
          internal: false,
          priority: 0,
          profileId: 'ee8f69b3-be63-4183-a375-6ddfa440ac59',
          public: true,
          queue: 'df2d1937-cb20-4ef4-bce5-4815946ece37',
          running: true,
          service: 'Filter',
          version: '2.0',
          serverVersion: '551f5d1e-fa05-41ca-8005-67eaa462a738_8.23.1-0.el7',
          insertedAt: '2024-01-18T07:30:09.537Z',
          sharingStatus: 'public',
          serviceName: 'Filter'
        }
      ],
      runningProfiles: 1,
      name: 'Filter',
      description: 'filter engine for all, with pdf idrs',
      version: '24.2.2',
      runnable: true,
      service: 'Filter',
      distrib: 'redhat-7',
      architecture: 'x86_64',
      versionObj: {
        major: 24,
        minor: 2,
        patch: 2
      },
      selectors: {},
      master: true,
      installBodyOptions: {},
      packageDependencies: {
        'systran-translation-dispatcher': '^8.14'
      },
      statusFailed: true
    },
    {
      id: 'b7f98ea6-8717-4669-909e-2612256334c5',
      insertedAt: '2023-07-24T16:45:00.441Z',
      updatedAt: '2023-07-25T21:34:14.439Z',
      computingNodes: [
        {
          id: 'trm',
          hostname: 'trm',
          lastUpdate: '2024-01-18T07:31:09.697Z',
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
                  id: 'c690fb3c-b48e-41f3-9ba2-e0e34fe9a6c3',
                  role: 'TranslatorInternalContainerData_enja_Generic_L',
                  status: 'downloaded'
                },
                {
                  convergenceState: 'ok',
                  id: '56c641c6-530d-4fdb-9162-19bd55543270',
                  role: 'CommonImageCTranslate',
                  status: 'downloaded'
                }
              ],
              description: 'enja Generic (L)  - Container Part',
              distrib: 'all',
              expectedInstanceCount: 1,
              expectedStatus: 'running',
              id: 'efac2e24-7d72-4919-a8cd-3f91b2ce8507',
              instanceCount: 1,
              instances: [
                {
                  id: 'x6m8uufoui7x',
                  image: 'systran/pn9_ctranslate_gpu:v1.80.5',
                  name: 'trm_efac2e24-7d72-4919-a8cd-3f91b2ce8507.1',
                  status: 'Running about a minute ago'
                }
              ],
              internal: 'true',
              isContainerTR: 'true',
              name: 'Container Generic (L) enja',
              role: 'TranslatorInternalContainer_enja_Generic_L',
              runnable: 'true',
              sourceLanguage: 'en',
              status: 'running',
              targetLanguage: 'ja',
              type: 'container profile',
              version_pushProfile: '3.4.0'
            },
            {
              architecture: 'x86_64',
              convergenceState: 'ok',
              dependencies: [
                {
                  convergenceState: 'ok',
                  id: 'af186cea-f2c4-45e1-8c08-5ab9411d9cef',
                  role: 'TranslatorInternalPTEData_enja_Generic_L',
                  status: 'downloaded'
                },
                {
                  convergenceState: 'ok',
                  id: 'f7628897-ec21-466a-aa6f-78dc8f8170a2',
                  role: 'CommonPTE',
                  status: 'downloaded'
                }
              ],
              description: 'enja Generic (L) - PTE Part',
              distrib: 'all',
              expectedInstanceCount: 1,
              expectedStatus: 'running',
              id: '9deccef4-d0b1-4cc5-8022-e8638a369a89',
              instanceCount: 1,
              instances: [
                {
                  id: 'a8b6b368-0c76-4d47-a9c2-1dbb8706ee27',
                  memory: 25156,
                  nbRestart: 0,
                  pid: 1333,
                  status: 'started'
                }
              ],
              internal: 'true',
              isCompatibleWithRabbitmqCA: 'true',
              isCompatibleWithRedisClusterAndRedisSentinel: 'true',
              isPTETR: 'true',
              name: 'PTE Generic (L) enja',
              role: 'TranslatorInternalPTE_enja_Generic_L',
              runVersion: '9.6',
              runnable: 'true',
              service: 'Translate_en_ja',
              sourceLanguage: 'en',
              status: 'running',
              targetLanguage: 'ja',
              type: 'PTE profile',
              version_pushProfile: '3.4.0'
            }
          ],
          status: 'running',
          expectedStatus: 'running',
          convergenceState: 'ok',
          statusFailed: false
        }
      ],
      expectedStatus: 'running',
      installableComputingNodes: [],
      lastUpdate: '2024-01-18T07:31:10.517Z',
      nbInstances: 1,
      nbInstancesRequested: 1,
      status: 'running',
      flow: [
        {
          depId: 'efac2e24-7d72-4919-a8cd-3f91b2ce8507',
          nbInstances: 1,
          nbInstancesRequested: 1,
          status: 'running',
          expectedStatus: 'running'
        },
        {
          depId: '9deccef4-d0b1-4cc5-8022-e8638a369a89',
          nbInstances: 1,
          nbInstancesRequested: 1,
          status: 'running',
          expectedStatus: 'running'
        }
      ],
      pivot: null,
      activatedProfiles: 1,
      profiles: 1,
      routes: [
        {
          comment: {
            profileId: '65a8d359d8f67e743460b916',
            serviceName: 'Translator NMT Generic (L) - ENJA',
            translationResourceId: 'b7f98ea6-8717-4669-909e-2612256334c5',
            translationResourceName: 'Translator NMT Generic (L) - ENJA'
          },
          deactivated: false,
          flow: [
            {
              options: [
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
              profileId: '0452402f-1d8d-4f42-a91d-400591366bce',
              serviceName: 'Translate_en_ja'
            }
          ],
          insertionTime: '1705562969748',
          internal: false,
          json_schema: {
            additionalProperties: false,
            properties: {
              'latin full width': {
                default: 'no-full-width',
                enum: ['no-full-width', 'full-width'],
                title: 'Latin Full Width',
                type: 'string'
              },
              'latin space': {
                default: 'no-space',
                enum: ['space', 'no-space'],
                title: 'Latin Space',
                type: 'string'
              }
            },
            title: 'Inference options : Locale, Latin Space, Latin Full Width',
            type: 'object'
          },
          options: [
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
          priority: 0,
          profileId: 'b5aa6e72-7a13-40b2-80ee-c51e32ea5519',
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
          service: 'Translate_en_ja',
          version: '2.0',
          serverVersion: '551f5d1e-fa05-41ca-8005-67eaa462a738_8.23.1-0.el7',
          insertedAt: '2024-01-18T07:30:09.538Z',
          source: 'en',
          target: 'ja',
          sharingStatus: 'public',
          serviceName: 'Translator NMT Generic (L) - ENJA'
        }
      ],
      runningProfiles: 1,
      source: 'en',
      target: 'ja',
      name: 'Translator NMT Generic (L) - ENJA',
      role: 'TranslatorNMT_enja_Generic_L',
      description: 'enja NMT Generic (L) - Master',
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
      version: '9.3.7',
      runnable: true,
      service: 'Translate_en_ja',
      distrib: 'all',
      architecture: 'x86_64',
      versionObj: {
        major: 9,
        minor: 3,
        patch: 7
      },
      selectors: {
        owner: 'Systran',
        domain: 'Generic',
        languagePair: 'enja',
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
      master: true,
      installBodyOptions: {},
      packageDependencies: {
        'systran-translation-dispatcher': '^8.14'
      },
      statusFailed: true
    },
    {
      id: 'fb8cc1e6-9876-49d0-b906-c8b3cc5dfd62',
      insertedAt: '2023-03-27T19:19:04.523Z',
      updatedAt: '2023-03-29T21:06:25.098Z',
      computingNodes: [
        {
          id: 'trm',
          hostname: 'trm',
          lastUpdate: '2024-01-18T07:31:09.697Z',
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
                  id: 'd394e2c4-830f-474e-b918-4247f8ca0eab',
                  role: 'TranslatorInternalContainerData_zhen_Generic_L',
                  status: 'downloaded'
                },
                {
                  convergenceState: 'ok',
                  id: '56c641c6-530d-4fdb-9162-19bd55543270',
                  role: 'CommonImageCTranslate',
                  status: 'downloaded'
                }
              ],
              description: 'zhen Generic (L) - Container Part',
              distrib: 'all',
              expectedInstanceCount: 1,
              expectedStatus: 'running',
              id: '24daa535-f29b-48f1-8184-2ecd93ca3f7e',
              instanceCount: 1,
              instances: [
                {
                  id: 'jbyg0sxgwnsb',
                  image: 'systran/pn9_ctranslate_gpu:v1.80.5',
                  name: 'trm_24daa535-f29b-48f1-8184-2ecd93ca3f7e.1',
                  status: 'Running about a minute ago'
                }
              ],
              internal: 'true',
              isContainerTR: 'true',
              name: 'Container Generic (L) zhen',
              role: 'TranslatorInternalContainer_zhen_Generic_L',
              runnable: 'true',
              sourceLanguage: 'zh',
              status: 'running',
              targetLanguage: 'en',
              type: 'container profile',
              version_pushProfile: '3.2.10'
            },
            {
              architecture: 'x86_64',
              convergenceState: 'ok',
              dependencies: [
                {
                  convergenceState: 'ok',
                  id: 'ab36139c-9347-4e53-97e4-051addbf16ef',
                  role: 'TranslatorInternalPTEData_zhen_Generic_L',
                  status: 'downloaded'
                },
                {
                  convergenceState: 'ok',
                  id: 'f7628897-ec21-466a-aa6f-78dc8f8170a2',
                  role: 'CommonPTE',
                  status: 'downloaded'
                }
              ],
              description: 'zhen Generic (L) - PTE Part',
              distrib: 'all',
              expectedInstanceCount: 1,
              expectedStatus: 'running',
              id: 'd45a105b-8407-48da-99f3-6a8f23c0cbb6',
              instanceCount: 1,
              instances: [
                {
                  id: '3bc81928-6a92-4ca5-9bff-696452bd21c4',
                  memory: 25160,
                  nbRestart: 0,
                  pid: 1348,
                  status: 'started'
                }
              ],
              internal: 'true',
              isCompatibleWithRabbitmqCA: 'true',
              isCompatibleWithRedisClusterAndRedisSentinel: 'true',
              isPTETR: 'true',
              name: 'PTE Generic (L) zhen',
              role: 'TranslatorInternalPTE_zhen_Generic_L',
              runVersion: '9.5',
              runnable: 'true',
              service: 'Translate_zh_en',
              sourceLanguage: 'zh',
              status: 'running',
              targetLanguage: 'en',
              type: 'PTE profile',
              version_pushProfile: '3.2.10'
            }
          ],
          status: 'running',
          expectedStatus: 'running',
          convergenceState: 'ok',
          statusFailed: false
        }
      ],
      expectedStatus: 'running',
      installableComputingNodes: [],
      lastUpdate: '2024-01-18T07:31:10.517Z',
      nbInstances: 1,
      nbInstancesRequested: 1,
      status: 'running',
      flow: [
        {
          depId: '24daa535-f29b-48f1-8184-2ecd93ca3f7e',
          nbInstances: 1,
          nbInstancesRequested: 1,
          status: 'running',
          expectedStatus: 'running'
        },
        {
          depId: 'd45a105b-8407-48da-99f3-6a8f23c0cbb6',
          nbInstances: 1,
          nbInstancesRequested: 1,
          status: 'running',
          expectedStatus: 'running'
        }
      ],
      pivot: null,
      activatedProfiles: 1,
      profiles: 1,
      routes: [
        {
          comment: {
            profileId: '65a8d359d8f67e476a60b91e',
            serviceName: 'Translator NMT Generic (L) - ZHEN',
            translationResourceId: 'fb8cc1e6-9876-49d0-b906-c8b3cc5dfd62',
            translationResourceName: 'Translator NMT Generic (L) - ZHEN'
          },
          deactivated: false,
          flow: [
            {
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
              profileId: '3f6c82cc-b6cf-48c8-a2b1-717b7995373b',
              serviceName: 'Translate_zh_en'
            }
          ],
          insertionTime: '1705562969838',
          internal: false,
          json_schema: {
            additionalProperties: false,
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
          },
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
          priority: 0,
          profileId: '07e1c1c6-315b-4c18-b4c1-6b19158c4be8',
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
          service: 'Translate_zh_en',
          version: '2.0',
          serverVersion: '551f5d1e-fa05-41ca-8005-67eaa462a738_8.23.1-0.el7',
          insertedAt: '2024-01-18T07:30:09.540Z',
          source: 'zh',
          target: 'en',
          sharingStatus: 'public',
          serviceName: 'Translator NMT Generic (L) - ZHEN'
        }
      ],
      runningProfiles: 1,
      source: 'zh',
      target: 'en',
      name: 'Translator NMT Generic (L) - ZHEN',
      role: 'TranslatorNMT_zhen_Generic_L',
      description: 'zhen NMT Generic (L) - Master',
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
      version: '9.3.4',
      runnable: true,
      service: 'Translate_zh_en',
      distrib: 'all',
      architecture: 'x86_64',
      versionObj: {
        major: 9,
        minor: 3,
        patch: 4
      },
      selectors: {
        owner: 'Systran',
        domain: 'Generic',
        languagePair: 'zhen',
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
      master: true,
      installBodyOptions: {},
      packageDependencies: {
        'systran-translation-dispatcher': '^8.14'
      },
      statusFailed: true
    },
    {
      id: '548b59bd-4a81-4743-ba4c-a0c0768c9acc',
      insertedAt: '2023-01-11T13:15:39.637Z',
      updatedAt: '2023-01-11T13:16:57.786Z',
      computingNodes: [
        {
          id: 'trm',
          hostname: 'trm',
          lastUpdate: '2024-01-18T07:31:09.697Z',
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
                  id: '8f9edd6e-065d-4f15-bf8f-5384d9de3e4f',
                  memory: 25172,
                  nbRestart: 0,
                  pid: 1341,
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
            },
            {
              architecture: 'x86_64',
              convergenceState: 'ok',
              dependencies: [
                {
                  convergenceState: 'ok',
                  id: 'b0b85d25-694c-4d66-85a0-3988055d511b',
                  role: 'TranslatorInternalContainerData_enfr_Generic_L',
                  status: 'downloaded'
                },
                {
                  convergenceState: 'ok',
                  id: '56c641c6-530d-4fdb-9162-19bd55543270',
                  role: 'CommonImageCTranslate',
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
                  id: 'srogs6k2q6p3',
                  image: 'systran/pn9_ctranslate_gpu:v1.80.5',
                  name: 'trm_9c33a332-8d74-47a9-b4ed-729594a2828d.1',
                  status: 'Running about a minute ago'
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
            }
          ],
          status: 'running',
          expectedStatus: 'running',
          convergenceState: 'ok',
          statusFailed: false
        }
      ],
      expectedStatus: 'running',
      installableComputingNodes: [],
      lastUpdate: '2024-01-18T07:31:10.518Z',
      nbInstances: 1,
      nbInstancesRequested: 1,
      status: 'running',
      flow: [
        {
          depId: '7ea61879-12a4-4433-a9e9-e6ac1ab14345',
          nbInstances: 1,
          nbInstancesRequested: 1,
          status: 'running',
          expectedStatus: 'running'
        },
        {
          depId: '9c33a332-8d74-47a9-b4ed-729594a2828d',
          nbInstances: 1,
          nbInstancesRequested: 1,
          status: 'running',
          expectedStatus: 'running'
        }
      ],
      pivot: null,
      activatedProfiles: 1,
      profiles: 1,
      routes: [
        {
          comment: {
            profileId: '65a8d359d8f67e1d3060b91c',
            serviceName: 'Translator NMT Generic (L) - ENFR',
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
              profileId: '143120ec-7f90-42e5-8041-09c3aa968096',
              serviceName: 'Translate_en_fr'
            }
          ],
          insertionTime: '1705562969787',
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
          profileId: '32d46c77-1ecf-4528-9a86-8bc1e2daa7b2',
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
          serverVersion: '551f5d1e-fa05-41ca-8005-67eaa462a738_8.23.1-0.el7',
          insertedAt: '2024-01-18T07:30:09.539Z',
          source: 'en',
          target: 'fr',
          sharingStatus: 'public',
          serviceName: 'Translator NMT Generic (L) - ENFR'
        }
      ],
      runningProfiles: 1,
      source: 'en',
      target: 'fr',
      name: 'Translator NMT Generic (L) - ENFR',
      role: 'TranslatorNMT_enfr_Generic_L',
      description: 'enfr NMT Generic (L) - Master',
      modelOptions: {
        supported_features: {
          ND: true,
          UD: true,
          TM: true,
          NFA: true
        }
      },
      version: '9.3.4',
      runnable: true,
      service: 'Translate_en_fr',
      distrib: 'all',
      architecture: 'x86_64',
      versionObj: {
        major: 9,
        minor: 3,
        patch: 4
      },
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
      master: true,
      installBodyOptions: {},
      packageDependencies: {
        'systran-translation-dispatcher': '^8.14'
      },
      statusFailed: true
    },
    {
      id: 'c1659c3e-83d9-4252-a759-2b894d2fabfb',
      insertedAt: '2022-12-05T15:50:38.756Z',
      updatedAt: '2022-12-08T08:28:15.365Z',
      computingNodes: [
        {
          id: 'trm',
          hostname: 'trm',
          lastUpdate: '2024-01-18T07:31:09.697Z',
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
                  id: '1d046c5e-748d-4ae9-a826-65d0756cbd43',
                  role: 'TranslatorInternalContainerData_fren_Generic_L',
                  status: 'downloaded'
                },
                {
                  convergenceState: 'ok',
                  id: '56c641c6-530d-4fdb-9162-19bd55543270',
                  role: 'CommonImageCTranslate',
                  status: 'downloaded'
                }
              ],
              description: 'fren Generic (L) - Container Part',
              distrib: 'all',
              expectedInstanceCount: 1,
              expectedStatus: 'running',
              id: 'ce4a521a-6ab5-4c00-91f0-15cdc943c771',
              instanceCount: 1,
              instances: [
                {
                  id: 'bhpgwurmf7zs',
                  image: 'systran/pn9_ctranslate_gpu:v1.80.5',
                  name: 'trm_ce4a521a-6ab5-4c00-91f0-15cdc943c771.1',
                  status: 'Running about a minute ago'
                }
              ],
              internal: 'true',
              isContainerTR: 'true',
              name: 'Container Generic (L) fren',
              role: 'TranslatorInternalContainer_fren_Generic_L',
              runnable: 'true',
              sourceLanguage: 'fr',
              status: 'running',
              targetLanguage: 'en',
              type: 'container profile',
              version_pushProfile: '3.2.10'
            },
            {
              architecture: 'x86_64',
              convergenceState: 'ok',
              dependencies: [
                {
                  convergenceState: 'ok',
                  id: '2b7126af-991f-41ac-ae27-80f956bc8a53',
                  role: 'TranslatorInternalPTEData_fren_Generic_L',
                  status: 'downloaded'
                },
                {
                  convergenceState: 'ok',
                  id: 'f7628897-ec21-466a-aa6f-78dc8f8170a2',
                  role: 'CommonPTE',
                  status: 'downloaded'
                }
              ],
              description: 'fren Generic (L) - PTE Part',
              distrib: 'all',
              expectedInstanceCount: 1,
              expectedStatus: 'running',
              id: '6baabe22-19fa-4a24-be92-f31263b57f70',
              instanceCount: 1,
              instances: [
                {
                  id: '775766f9-8432-4db0-b497-a32f5131d559',
                  memory: 25088,
                  nbRestart: 0,
                  pid: 1340,
                  status: 'started'
                }
              ],
              internal: 'true',
              isCompatibleWithRabbitmqCA: 'true',
              isCompatibleWithRedisClusterAndRedisSentinel: 'true',
              isPTETR: 'true',
              name: 'PTE Generic (L) fren',
              role: 'TranslatorInternalPTE_fren_Generic_L',
              runVersion: '9.5',
              runnable: 'true',
              service: 'Translate_fr_en',
              sourceLanguage: 'fr',
              status: 'running',
              targetLanguage: 'en',
              type: 'PTE profile',
              version_pushProfile: '3.2.10'
            }
          ],
          status: 'running',
          expectedStatus: 'running',
          convergenceState: 'ok',
          statusFailed: false
        }
      ],
      expectedStatus: 'running',
      installableComputingNodes: [],
      lastUpdate: '2024-01-18T07:31:10.518Z',
      nbInstances: 1,
      nbInstancesRequested: 1,
      status: 'running',
      flow: [
        {
          depId: 'ce4a521a-6ab5-4c00-91f0-15cdc943c771',
          nbInstances: 1,
          nbInstancesRequested: 1,
          status: 'running',
          expectedStatus: 'running'
        },
        {
          depId: '6baabe22-19fa-4a24-be92-f31263b57f70',
          nbInstances: 1,
          nbInstancesRequested: 1,
          status: 'running',
          expectedStatus: 'running'
        }
      ],
      pivot: null,
      activatedProfiles: 1,
      profiles: 1,
      routes: [
        {
          comment: {
            profileId: '65a8d359d8f67e104a60b91a',
            serviceName: 'Translator NMT Generic (L) - FREN',
            translationResourceId: 'c1659c3e-83d9-4252-a759-2b894d2fabfb',
            translationResourceName: 'Translator NMT Generic (L) - FREN'
          },
          deactivated: false,
          flow: [
            {
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
              profileId: 'acdf24a9-ecb9-4db9-9d81-1f56d88fb898',
              serviceName: 'Translate_fr_en'
            }
          ],
          insertionTime: '1705562969787',
          internal: false,
          json_schema: {
            additionalProperties: false,
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
          },
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
          priority: 0,
          profileId: 'e904826c-fbc4-4525-b2a6-47a504ab0d14',
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
          service: 'Translate_fr_en',
          version: '2.0',
          serverVersion: '551f5d1e-fa05-41ca-8005-67eaa462a738_8.23.1-0.el7',
          insertedAt: '2024-01-18T07:30:09.539Z',
          source: 'fr',
          target: 'en',
          sharingStatus: 'public',
          serviceName: 'Translator NMT Generic (L) - FREN'
        }
      ],
      runningProfiles: 1,
      source: 'fr',
      target: 'en',
      name: 'Translator NMT Generic (L) - FREN',
      role: 'TranslatorNMT_fren_Generic_L',
      description: 'fren NMT Generic (L) - Master',
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
      version: '9.3.3',
      runnable: true,
      service: 'Translate_fr_en',
      distrib: 'all',
      architecture: 'x86_64',
      versionObj: {
        major: 9,
        minor: 3,
        patch: 3
      },
      selectors: {
        owner: 'Systran',
        domain: 'Generic',
        languagePair: 'fren',
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
      master: true,
      installBodyOptions: {},
      packageDependencies: {
        'systran-translation-dispatcher': '^8.14'
      },
      statusFailed: true
    },
    {
      id: 'f4d6b5fc-db45-4898-9f0c-86842eb2d5e3',
      insertedAt: '2022-07-04T06:21:07.061Z',
      updatedAt: '2022-07-04T07:12:56.125Z',
      computingNodes: [
        {
          id: 'trm',
          hostname: 'trm',
          lastUpdate: '2024-01-18T07:31:09.697Z',
          nodeStatus: 'running',
          nbInstances: 0,
          nbInstancesRequested: 1,
          dependencies: [
            {
              architecture: 'x86_64',
              convergenceState: 'busy',
              dependencies: [
                {
                  convergenceState: 'ok',
                  id: '2de613a4-06f3-4bf7-a60f-1f889c959110',
                  role: 'TranslatorInternalContainerData_enes_Generic_L',
                  status: 'downloaded'
                },
                {
                  convergenceState: 'ok',
                  id: '56c641c6-530d-4fdb-9162-19bd55543270',
                  role: 'CommonImageCTranslate',
                  status: 'downloaded'
                }
              ],
              description: 'enes Generic (L) - Container Part',
              distrib: 'all',
              expectedInstanceCount: 1,
              expectedStatus: 'installed',
              id: '96b74bbd-102a-4aa4-87a9-adffbbdf688b',
              instanceCount: 0,
              internal: 'true',
              isContainerTR: 'true',
              name: 'Container Generic (L) enes',
              role: 'TranslatorInternalContainer_enes_Generic_L',
              runnable: 'true',
              sourceLanguage: 'en',
              status: 'installed',
              targetLanguage: 'es',
              type: 'container profile',
              version_pushProfile: '3.2.10'
            },
            {
              architecture: 'x86_64',
              convergenceState: 'ok',
              dependencies: [
                {
                  convergenceState: 'ok',
                  id: 'c9317a87-9157-494f-9a34-2df3b8015056',
                  role: 'TranslatorInternalPTEData_enes_Generic_L',
                  status: 'downloaded'
                },
                {
                  convergenceState: 'ok',
                  id: 'f7628897-ec21-466a-aa6f-78dc8f8170a2',
                  role: 'CommonPTE',
                  status: 'downloaded'
                }
              ],
              description: 'enes Generic (L) - PTE Part',
              distrib: 'all',
              expectedInstanceCount: 1,
              expectedStatus: 'running',
              id: '83428294-77bb-4ff6-8398-98de0888f09c',
              instanceCount: 1,
              instances: [
                {
                  id: '024bf866-bcb8-448b-8a3b-7375e897432a',
                  memory: 25240,
                  nbRestart: 0,
                  pid: 1342,
                  status: 'started'
                }
              ],
              internal: 'true',
              isCompatibleWithRabbitmqCA: 'true',
              isCompatibleWithRedisClusterAndRedisSentinel: 'true',
              isPTETR: 'true',
              name: 'PTE Generic (L) enes',
              role: 'TranslatorInternalPTE_enes_Generic_L',
              runVersion: '9.5',
              runnable: 'true',
              service: 'Translate_en_es',
              sourceLanguage: 'en',
              status: 'running',
              targetLanguage: 'es',
              type: 'PTE profile',
              version_pushProfile: '3.2.10'
            }
          ],
          status: 'installed',
          expectedStatus: 'installed',
          convergenceState: 'busy',
          statusFailed: false
        }
      ],
      expectedStatus: 'installed',
      installableComputingNodes: [],
      lastUpdate: '2024-01-18T07:31:10.518Z',
      nbInstances: 0,
      nbInstancesRequested: 1,
      status: 'installed',
      flow: [
        {
          depId: '96b74bbd-102a-4aa4-87a9-adffbbdf688b',
          nbInstances: 0,
          nbInstancesRequested: 1,
          status: 'installed',
          expectedStatus: 'installed'
        },
        {
          depId: '83428294-77bb-4ff6-8398-98de0888f09c',
          nbInstances: 1,
          nbInstancesRequested: 1,
          status: 'running',
          expectedStatus: 'running'
        }
      ],
      pivot: null,
      activatedProfiles: 1,
      profiles: 1,
      routes: [
        {
          comment: {
            profileId: '65a8d359d8f67ed01b60b918',
            serviceName: 'Translator NMT Generic (L) - ENES',
            translationResourceId: 'f4d6b5fc-db45-4898-9f0c-86842eb2d5e3',
            translationResourceName: 'Translator NMT Generic (L) - ENES'
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
                  value: '{"ND":true,"TM":true,"UD":true,"NFA":true}'
                }
              ],
              profileId: 'a21d1818-e359-498e-bf82-ad570be6fa69',
              serviceName: 'Translate_en_es'
            }
          ],
          insertionTime: '1705562969789',
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
              value: '{"ND":true,"TM":true,"UD":true,"NFA":true}'
            }
          ],
          priority: 0,
          profileId: '6590271f-5879-4fd8-b995-f74e6b7585b1',
          public: true,
          queue: 'flow',
          running: false,
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
          version: '2.0',
          serverVersion: '551f5d1e-fa05-41ca-8005-67eaa462a738_8.23.1-0.el7',
          insertedAt: '2024-01-18T07:30:09.540Z',
          source: 'en',
          target: 'es',
          sharingStatus: 'public',
          serviceName: 'Translator NMT Generic (L) - ENES'
        }
      ],
      runningProfiles: 0,
      source: 'en',
      target: 'es',
      name: 'Translator NMT Generic (L) - ENES',
      role: 'TranslatorNMT_enes_Generic_L',
      description: 'enes NMT Generic (L) - Master',
      modelOptions: {
        supported_features: {
          ND: true,
          TM: true,
          UD: true,
          NFA: true
        }
      },
      version: '9.3.1',
      runnable: true,
      service: 'Translate_en_es',
      distrib: 'all',
      architecture: 'x86_64',
      versionObj: {
        major: 9,
        minor: 3,
        patch: 1
      },
      selectors: {
        owner: 'Systran',
        domain: 'Generic',
        languagePair: 'enes',
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
      master: true,
      installBodyOptions: {},
      packageDependencies: {
        'systran-translation-dispatcher': '^8.14'
      },
      statusFailed: true
    },
    {
      id: '4d48a8bb-c9a6-47b1-8cae-32a56aee0d84',
      insertedAt: '2019-08-14T14:07:12.255Z',
      updatedAt: '2019-08-14T17:39:30.902Z',
      computingNodes: [
        {
          id: 'trm',
          hostname: 'trm',
          lastUpdate: '2024-01-18T07:31:09.697Z',
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
                  id: 'ef7b6686-2586-488e-9e3b-6f21f7855266',
                  role: 'TranslatorInternalPTEData_fren_IT',
                  status: 'downloaded'
                },
                {
                  convergenceState: 'ok',
                  id: 'f7628897-ec21-466a-aa6f-78dc8f8170a2',
                  role: 'CommonPTE',
                  status: 'downloaded'
                }
              ],
              description: 'fren IT (M) - PTE Part',
              distrib: 'redhat-7',
              expectedInstanceCount: 1,
              expectedStatus: 'running',
              id: '99f42b38-0a0d-4ec9-9f43-2950b182e09d',
              instanceCount: 1,
              instances: [
                {
                  id: '2e9ca881-14b6-4134-b110-38dfeccef179',
                  memory: 25144,
                  nbRestart: 0,
                  pid: 1334,
                  status: 'started'
                }
              ],
              internal: 'true',
              isPTETR: 'true',
              name: 'PTE IT (M) fren',
              role: 'TranslatorInternalPTE_fren_IT',
              runVersion: '9.3',
              runnable: 'true',
              service: 'Translate_fr_en',
              sourceLanguage: 'fr',
              status: 'running',
              targetLanguage: 'en',
              type: 'PTE profile',
              version_pushProfile: '3.1.0'
            },
            {
              architecture: 'x86_64',
              convergenceState: 'ok',
              dependencies: [
                {
                  convergenceState: 'ok',
                  id: '4db1eb95-2f7f-4e9a-9bc2-0859939bb48c',
                  role: 'TranslatorInternalContainerData_fren_IT',
                  status: 'downloaded'
                },
                {
                  convergenceState: 'ok',
                  id: '56c641c6-530d-4fdb-9162-19bd55543270',
                  role: 'CommonImageCTranslate',
                  status: 'downloaded'
                }
              ],
              description: 'fren IT (M) - Container Part',
              distrib: 'redhat-7',
              expectedInstanceCount: 1,
              expectedStatus: 'running',
              id: '96c9af1f-a582-4c61-931c-86b69a5dd6f0',
              instanceCount: 1,
              instances: [
                {
                  id: '3t6kbcxcu1s6',
                  image: 'systran/pn9_ctranslate_gpu:v1.80.5',
                  name: 'trm_96c9af1f-a582-4c61-931c-86b69a5dd6f0.1',
                  status: 'Running about a minute ago'
                }
              ],
              internal: 'true',
              isContainerTR: 'true',
              name: 'Container IT (M) fren',
              role: 'TranslatorInternalContainer_fren_IT',
              runnable: 'true',
              sourceLanguage: 'fr',
              status: 'running',
              targetLanguage: 'en',
              type: 'container profile',
              version_pushProfile: '3.1.0'
            }
          ],
          status: 'running',
          expectedStatus: 'running',
          convergenceState: 'ok',
          statusFailed: false
        }
      ],
      expectedStatus: 'running',
      installableComputingNodes: [],
      lastUpdate: '2024-01-18T07:31:10.518Z',
      nbInstances: 1,
      nbInstancesRequested: 1,
      status: 'running',
      flow: [
        {
          depId: '99f42b38-0a0d-4ec9-9f43-2950b182e09d',
          nbInstances: 1,
          nbInstancesRequested: 1,
          status: 'running',
          expectedStatus: 'running'
        },
        {
          depId: '96c9af1f-a582-4c61-931c-86b69a5dd6f0',
          nbInstances: 1,
          nbInstancesRequested: 1,
          status: 'running',
          expectedStatus: 'running'
        }
      ],
      pivot: null,
      activatedProfiles: 1,
      profiles: 1,
      routes: [
        {
          comment: {
            profileId: '65a8d359d8f67e44c560b920',
            serviceName: 'Translator NMT IT (M) - FREN',
            translationResourceId: '4d48a8bb-c9a6-47b1-8cae-32a56aee0d84',
            translationResourceName: 'Translator NMT IT (M) - FREN'
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
                  value: '{}'
                }
              ],
              profileId: 'a44339d4-a7d7-4b24-9d76-74f77147a24e',
              serviceName: 'Translate_fr_en'
            }
          ],
          insertionTime: '1705562969787',
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
              value: '{}'
            }
          ],
          priority: 0,
          profileId: 'be6d95dc-8add-4614-a38a-f82262109523',
          public: true,
          queue: 'flow',
          running: true,
          selectors: {
            domain: 'IT',
            owner: 'Systran',
            size: 'M',
            tech: {
              name: 'Docker-OpenNMT-ctranslate',
              type: 'NMT'
            }
          },
          service: 'Translate_fr_en',
          version: '2.0',
          serverVersion: '551f5d1e-fa05-41ca-8005-67eaa462a738_8.23.1-0.el7',
          insertedAt: '2024-01-18T07:30:09.539Z',
          source: 'fr',
          target: 'en',
          sharingStatus: 'public',
          serviceName: 'Translator NMT IT (M) - FREN'
        }
      ],
      runningProfiles: 1,
      source: 'fr',
      target: 'en',
      name: 'Translator NMT IT (M) - FREN',
      role: 'TranslatorNMT_fren_IT',
      description: 'fren NMT IT (M) - Master',
      version: '9.2.1',
      runnable: true,
      service: 'Translate_fr_en',
      distrib: 'all',
      architecture: 'x86_64',
      versionObj: {
        major: 9,
        minor: 2,
        patch: 1
      },
      selectors: {
        owner: 'Systran',
        domain: 'IT',
        languagePair: 'fren',
        size: 'M',
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
      master: true,
      installBodyOptions: {},
      packageDependencies: {
        'systran-translation-dispatcher': '^8.12'
      },
      statusFailed: true
    },
    {
      id: '2bbe14f0-5c7f-45fd-8617-96326b652bed',
      insertedAt: '2024-01-16T17:35:24.798Z',
      updatedAt: '2024-01-16T17:44:15.668Z',
      computingNodes: [],
      expectedStatus: 'not installed',
      installableComputingNodes: [
        {
          hostname: 'trm'
        }
      ],
      lastUpdate: '2024-01-18T07:31:05.417Z',
      nbInstances: 0,
      nbInstancesRequested: 0,
      status: 'not installed',
      source: 'en',
      target: 'ru',
      name: 'Translator NMT Energy_Gas (L) - ENRU',
      role: 'TranslatorNMT_enru_Ariel_Corporation_Energy_Gas_L',
      description: 'enru NMT Energy_Gas (L) - Master',
      modelOptions: {
        supported_features: {
          TM: true,
          ND: true,
          UD: true,
          NFA: true
        }
      },
      version: '9.3.1',
      runnable: true,
      service: 'Translate_en_ru',
      distrib: 'all',
      architecture: 'x86_64',
      flow: ['TranslatorInternalContainer_enru_Ariel_Corporation_Energy_Gas_L', 'TranslatorInternalPTE_enru_Ariel_Corporation_Energy_Gas_L'],
      versionObj: {
        major: 9,
        minor: 3,
        patch: 1
      },
      selectors: {
        owner: 'Ariel_Corporation',
        domain: 'Energy_Gas',
        languagePair: 'enru',
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
      master: true,
      packageDependencies: {
        'systran-translation-dispatcher': '^8.14'
      },
      statusFailed: true
    },
    {
      id: 'f9cb063f-88cc-44fe-96b7-785f6185ea27',
      insertedAt: '2024-01-16T17:32:58.092Z',
      updatedAt: '2024-01-16T17:44:12.373Z',
      computingNodes: [],
      expectedStatus: 'not installed',
      installableComputingNodes: [
        {
          hostname: 'trm'
        }
      ],
      lastUpdate: '2024-01-18T07:31:05.417Z',
      nbInstances: 0,
      nbInstancesRequested: 0,
      status: 'not installed',
      source: 'en',
      target: 'es',
      name: 'Translator NMT Energy_Gas (L) - ENES',
      role: 'TranslatorNMT_enes_Ariel_Corporation_Energy_Gas_L',
      description: 'enes NMT Energy_Gas (L) - Master',
      modelOptions: {
        supported_features: {
          ND: true,
          TM: true,
          UD: true,
          NFA: true
        }
      },
      version: '9.3.1',
      runnable: true,
      service: 'Translate_en_es',
      distrib: 'all',
      architecture: 'x86_64',
      flow: ['TranslatorInternalContainer_enes_Ariel_Corporation_Energy_Gas_L', 'TranslatorInternalPTE_enes_Ariel_Corporation_Energy_Gas_L'],
      versionObj: {
        major: 9,
        minor: 3,
        patch: 1
      },
      selectors: {
        owner: 'Ariel_Corporation',
        domain: 'Energy_Gas',
        languagePair: 'enes',
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
      master: true,
      packageDependencies: {
        'systran-translation-dispatcher': '^8.14'
      },
      statusFailed: true
    },
    {
      id: 'e3be07c6-21fc-4734-bf85-00a914d95ae6',
      insertedAt: '2024-01-16T17:30:31.732Z',
      updatedAt: '2024-01-16T17:44:00.224Z',
      computingNodes: [],
      expectedStatus: 'not installed',
      installableComputingNodes: [
        {
          hostname: 'trm'
        }
      ],
      lastUpdate: '2024-01-18T07:31:05.417Z',
      nbInstances: 0,
      nbInstancesRequested: 0,
      status: 'not installed',
      source: 'en',
      target: 'zh',
      name: 'Translator NMT Energy_Gas (L) - ENZH',
      role: 'TranslatorNMT_enzh_Ariel_Corporation_Energy_Gas_L',
      description: 'enzh NMT Energy_Gas (L) - Master',
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
              default: 'zh-CN',
              enum: ['zh-CN', 'zh-TW', 'zh-HK'],
              title: 'Locale',
              type: 'string'
            },
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
      version: '9.3.3',
      runnable: true,
      service: 'Translate_en_zh',
      distrib: 'all',
      architecture: 'x86_64',
      flow: ['TranslatorInternalContainer_enzh_Ariel_Corporation_Energy_Gas_L', 'TranslatorInternalPTE_enzh_Ariel_Corporation_Energy_Gas_L'],
      versionObj: {
        major: 9,
        minor: 3,
        patch: 3
      },
      selectors: {
        owner: 'Ariel_Corporation',
        domain: 'Energy_Gas',
        languagePair: 'enzh',
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
      master: true,
      packageDependencies: {
        'systran-translation-dispatcher': '^8.14'
      },
      statusFailed: true
    }
  ]
};
