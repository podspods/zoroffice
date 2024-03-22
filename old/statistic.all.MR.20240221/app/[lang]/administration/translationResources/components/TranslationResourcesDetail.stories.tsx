import {Meta, StoryObj} from '@storybook/react';
import {rest} from 'msw';
import Apis from '@/utils/apis';
import userAuthorizations from '../../../../../../lib/userAuthorizations';
import AdministrationTranslationResourcesId from '../[id]/page';

// TODO remove when all components switched to useTranslation
const fakei18n = {
  t: function(text: string) {
    return text || '';
  },
  language: ''
};
(global as any).i18n = fakei18n;

const meta = {
  title: 'pages/TranslationResourcesDetail',
  args: {
    params: {
      id: '4d48a8bb-c9a6-47b1-8cae-32a56aee0d84'
    }
  },
  parameters: {
    msw: {
      handlers: [
        rest.get(Apis.translationResources.getAuthorizeConfigTrOption, async (req, res, ctx) => {
          return res(ctx.delay(2000), ctx.json(true));
        }),
        rest.get(Apis.translationResources.getTranslationResourceDetail('4d48a8bb-c9a6-47b1-8cae-32a56aee0d84'), async (req, res, ctx) => {
          return res(ctx.delay(2000), ctx.json(mockData));
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
  component: AdministrationTranslationResourcesId
} satisfies Meta<typeof AdministrationTranslationResourcesId>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default = {} satisfies Story;

const mockData = {
  id: '4d48a8bb-c9a6-47b1-8cae-32a56aee0d84',
  insertedAt: '2019-08-14T14:07:12.255Z',
  updatedAt: '2019-08-14T17:39:30.902Z',
  computingNodes: [
    {
      id: 'trm',
      hostname: 'trm',
      lastUpdate: '2024-01-18T08:19:59.514Z',
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
              status: 'Running 50 minutes ago'
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
  lastUpdate: '2024-01-18T08:20:00.355Z',
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
  activatedProfiles: 2,
  profiles: 2,
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
      serverVersion: '9786ec40-81b9-4d9e-8732-024c1c556aee_8.23.1-0.el7',
      insertedAt: '2024-01-18T08:13:47.280Z',
      source: 'fr',
      target: 'en',
      sharingStatus: 'public',
      serviceName: 'Translator NMT IT (M) - FREN'
    },
    {
      comment: {
        profileId: '65a8dda5a959b6e77b113a25',
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
          profileId: '7dcea06d-09b5-48fb-9e94-088a35b6ed39',
          serviceName: 'Translate_fr_en'
        }
      ],
      insertionTime: '1705565605330',
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
      profileId: '4fb33b35-6976-48d2-9530-0012d542d702',
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
      serverVersion: '9786ec40-81b9-4d9e-8732-024c1c556aee_8.23.1-0.el7',
      insertedAt: '2024-01-18T08:13:47.281Z',
      source: 'fr',
      target: 'en',
      sharingStatus: 'public',
      serviceName: 'Translator NMT IT (M) - FREN'
    }
  ],
  runningProfiles: 2,
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
};
