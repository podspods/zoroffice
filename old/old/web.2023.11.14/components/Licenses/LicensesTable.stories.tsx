import {Meta, StoryObj} from '@storybook/react';
import LicensesTable, {transformApiResponse} from './LicensesTable';
import {action} from '@storybook/addon-actions';

// TODO remove when all components switched to useTranslation
const fakei18n = {
  t: function(text: string) {
    return text || '';
  },
  language: ''
};

global.i18n = fakei18n;

// Same as what could be returned by /node/admin/licenses/list
const data = {
  licenses: [
    {
      valid: true,
      productKey: 'CjSLjAcSMDip76FuU6uZVdbKMZS8gPq5gmpUHLfdk7mAShBHU6kEFyZ8FvKWfX8BvZRYbtp1VP7kUUthEPExFUQZmUxw4Z2zjcK2hLhDhe1LribvEH54J8RrSQmEepxEkdHr9KjEFUNWVtKmSCZR9fwWdQa2BCGA58L4ZK8bvUxXPcFiTW9hfL6Ejyx8tYuuHyNX6L3cTwp98HyK7EC4neBapJQNbdZa35t1YU7mLiME8iMAdXiELJ22Qy8nNVprL9tMbdBbSqczhxRT3pucahS2khKzPX5fhqJXwCeKYtZApYhaX0fUrL8cD5Kj60Av0zeJi4TnG5eT9Sykf17W1R5eri6KnQv2HBFiUFDVY8KyzKRQVL95wPFuTNtxEy8xPuQP6AHv59TkYN7wBcgaTvL4eDfBc8XRERkEiBmyAReRbh2YqfJvaf94idii5PEWRhRiRmNjDYQ9J5RwJ8jS9nCSXd9pAPJJ1iLwxfb5J1GM8DYEBtMp5e3ZtLyTcC6YHcXrvBcYaKk0h1uGKbD8HSGNLJ7w53SW22q2HYYNkSknLKT6mGcXaTJemPUvH3rbx0QmxewPLVVM1vRJTNXRG7AFTi56exprN0K3vnYu3mt0Bwja2dr2pgSzeeaigXb9NK8iMh1UrN1rFS2PeX7tSHiB2ZL3831aengpSkV0kd0uhbY98B6Yy7k4LviLpc2U6V4aEmvgN3AKWwSCJP85ARuiZ7RqczLkNBRziJ5JwC49BLg8jemnbWVK1QxbcbELPKP3ixv',
      activated: true,
      phoneActivationSupported: false,
      secureActivationSupported: true,
      user: '149313',
      product: 'Enterprise Server 10',
      coresLimit: '',
      edition: 'Level 1',
      customerType: 'Commercial',
      usage: 'Production',
      upgrade: 'Full',
      hosted: 'false',
      expiration: 'perpetual',
      activation: 'secure'
    },
    {
      valid: true,
      productKey: '6azZQ9hztVtJuxvGkjPRwcU4MkPngkhDRTRGLmr59nJfPYNuvq64bepiny758R6HS97ijdrKQPDmXc0WzaWDC2j83Nz9cXhTAMa5ePtXBABhNZVfT7xGB4uUUAZm0habUYXUM8k7jJEEid32zARuj2tCxJG0EDcCrmdTB1CD36bfByXJHhGaX98mHztXyniRY5YzE0YrUQ0MCkQaBega3d4CQ5BFBFZz0iQYhjWp3p2PSXSvYgLDt0EiCjw264d0mnfD3xx8EQir3xcb396jScH8G6nS2RiBcrz732Z3i9X3F6fNqMxbnBkpYgc4X7Xqy1H2B59VzP9rjXK5ipeM5NikhyftGpkUHxbc59zNCKwGY5S1PdXTywxRtGJYGFcWmBpT7jRpXe2p7zRX8EXiyiFX3HWyeVDVcLxtU5XDt4pyEx03XJ1PbFfmcchDgXx6pPhpAcAvP3uccNWFw9CJbXk3Pn5gauE39JWpqNqHeezFeYYwNJWGHLrAG9zx6bvnchymkT3B4EGv9RMwSzL27VeceBNKY65nZiQDk0NNEfuHKcnYeHqkrxqANruU9xiE3rcWp6kPdDMuugwfCJWWntXQ9AA83aDGLY3qEkLZiWeBuuiu4jhA9ewgdicaXYDYyfd74Axh66nniekVkT5KGaZUmZN6kehQc6ZzUTuk5G0z76yxQy52cfEGjQUtmbRux8kmy0npZRcM7pdKpwQ6zNJcU4BBpNe5DQNyvnxFxFR4agAT3LWga0FSLKRxBNHwM5gCDXZ',
      activated: true,
      phoneActivationSupported: false,
      secureActivationSupported: true,
      user: '149313',
      product: 'Enterprise Server 10',
      coresLimit: '',
      edition: 'Level 4',
      customerType: 'Commercial',
      usage: 'Production',
      upgrade: 'Full',
      hosted: 'false',
      expiration: '1m',
      activation: 'none',
      expired: true,
      expireAt: '2023-09-01T17:58:00.000Z'
    },
    {
      valid: true,
      productKey: '2TkTPH56ugC3h25Gv2Pa1JRwtibbuy99fA3a3WkG9770fYHtqmKwFRRmhYv2Pzezm7yxtFGKZbynKdnHVTrqJrUm0K3YrT1LCjPhdmAR7cuBiEG12xy9dp6tUTkwTiZvfhjgFuQ0d5xQkc5hHM9eBGjh5ptQKBH4XwEuj636KbN7YtmJXfU4UwnvgAmqmen47nHSFjydpE7GqvxcxWqiwbB6SgtUYFC6jVMHZ7AYpjB8fPtXX7Z0vjzKwTwdi6i3pU6N9xEKBYywJPeiWiCP2GW5pbUjfeRhG7zZbRCPEVT7kGfmvYMBSU01F4hE3WxmJJ2HDJdqRPJ4dVXacwaRAgkqZV2rL5FZJZenJzYnLtEc6uzXyycKALY4Rj1Hk64EdYhht3vgNKSmzz9wJFu0HWwNxgZK5jTFh40ARi2H16KnN93VvWAXCy19p6UNkSkkXHNQMnDzndm1gPrUBr21eyPpTtZeVWzHXjJXa9AHXqPKht2xEtFbv2hxT9weYMXFcrwgtZDQa54E8BbrFEJvwe6BKNDwLa9uwtGYwGcagTbT9j40Ww0Vc8aAh2GcWWtZrFFu1K1BxbYC2FR7QBd6CGrMzXMB77QGRbQLaZuBz6be8LSyTh9hzVRSXvW9fJQcgiCmb8J3udP5CgrCKcDWuHCTmbaF9tBRXfXUckKuG76eLFa9hRD9hGdqmumUQYSP0Eh6rjME1BnknrFRMiAxhBEmg16jiZHkucE3X5nFgzWHAnDubbzQc2ejJKfu6Dc0JAwPaAU',
      activated: false,
      phoneActivationSupported: false,
      secureActivationSupported: true,
      user: '149313',
      product: 'Enterprise Server 9',
      coresLimit: '',
      edition: 'Level 4',
      customerType: 'Commercial',
      usage: 'Production',
      upgrade: 'Full',
      hosted: 'false',
      expiration: 'perpetual',
      activation: 'secure'
    },
    {
      valid: false,
      productKey: 'test'
    }
  ],
  total: 4,
  offset: 0
};

const meta = {
  args: {
    refreshInterval: 'Never',
    setRefreshInterval: action('setRefreshInterval'),
    isLoading: false,
    isValidating: false,
    licenses: [],
    mutate: async () => action('mutate')()
  },
  component: LicensesTable
} satisfies Meta<typeof LicensesTable>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Empty = {} satisfies Story;

export const Loading = {
  args: {
    isLoading: true
  }
} satisfies Story;

export const LoadedWithLicenses = {
  args: {
    licenses: data.licenses.map(transformApiResponse)
  }
} satisfies Story;
