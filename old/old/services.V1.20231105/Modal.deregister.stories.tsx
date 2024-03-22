import { Meta, StoryObj } from '@storybook/react';
import { fakei18n } from '__TEST__/mocks/i18n';
import { action } from '@storybook/addon-actions';
import { DEREGISTER, SURE_TO_DEREGISTER } from './services.constant';
import ModalDeRegister from './Modal.deregister';
import { ServiceName } from './services.type';
global.i18n = fakei18n;


const meta = {
  // eslint-disable-next-line storybook/no-title-property-in-meta
  title: 'perso/modal deregister',
  component: ModalDeRegister,
  args: {
    open: true,
    title: 'modal deregister',
    serviceName: 'service name',
    message: SURE_TO_DEREGISTER,
    onConfirm: () => action('onConfirm: ')(),
    onClose: (event) => action('onClose: ')(event.target.value)
  }


}satisfies Meta<typeof ModalDeRegister>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: 'default modal title '
  }
} satisfies Story;


export const OnPage: Story = {
  args: {
    title: DEREGISTER,
    serviceName: ServiceName.BROKER
  }
} satisfies Story;


