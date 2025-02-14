import { Meta, StoryObj } from '@storybook/react';
import ModalRegister from './ModalRegister';
import { action } from '@storybook/addon-actions';
import {
  REGISTER_NEW_SERVICE,
  SERVICE_TYPE
} from '@/components/Services/constant';
import { serviceList } from '@/components/Services/utils';

const meta: Meta<typeof ModalRegister> = {
  // eslint-disable-next-line storybook/no-title-property-in-meta
  title: 'Services/modal register',
  component: ModalRegister,
  args: {
    open: true,
    secureService: true,
    switchDisabled: true,
    title: 'modal title',
    hostnameValue: 'hostname value',
    nameList: 'service name',
    serviceList: ['un', 'deux', 'trois', 'quatre'],
    serviceSelected: 'service selected ',
    onConfirm: () => action('onConfirm: ')(),
    onClose: () => action('onClose: ')(),
    onChange: (event) => action('onChange: ')(event.target.value),
    toogleSecureService: () => action('toogleSecureService: ')()
  }
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: 'default modal title zzz'
  }
};

export const OnPage: Story = {
  args: {
    title: REGISTER_NEW_SERVICE,
    nameList: SERVICE_TYPE,
    serviceList: serviceList(),
    switchDisabled: false
  }
};
