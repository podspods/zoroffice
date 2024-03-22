import { Meta, StoryObj } from '@storybook/react';
import ModalRegister from './ModalRegister';
import { action } from '@storybook/addon-actions';
import { REGISTER_NEW_SERVICE, SERVICE_TYPE } from '../constant';
import { serviceList } from '../utils';

const meta = {
  // eslint-disable-next-line storybook/no-title-property-in-meta
  title: 'Services/modal register',
  component: ModalRegister,
  args: {
    open: true,
    secureService: true,
    switchDisabled: true,
    title: 'modal titleZZzzzzzz',
    hostnameValue: 'hostname value',
    nameList: 'service name',
    serviceList: ['un', 'deux', 'trois', 'quatre'],
    serviceSelected: 'service selected ',
    onConfirm: () => action('onConfirm: ')(),
    onClose: () => action('onClose: ')(),
    onChange: (event) => action('onChange: ')(event.target.value),
    toogleSecureService: () => action('toogleSecureService: ')()

  }
}satisfies Meta<typeof ModalRegister>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: 'default modal title zzz'
  }
} satisfies Story;


export const OnPage: Story = {
  args: {
    title: REGISTER_NEW_SERVICE,
    nameList: SERVICE_TYPE,
    serviceList: serviceList(),
    switchDisabled: false
  }
} satisfies Story;


