import { Meta, StoryObj } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { DEREGISTER, SURE_TO_DEREGISTER } from '@/components/Services/constant';
import ModalDeRegister from '@/components/Services/modal/ModalDeRegister';
import { ServiceName } from '@/components/Services/type';

const meta: Meta<typeof ModalDeRegister> = {
  // eslint-disable-next-line storybook/no-title-property-in-meta
  title: 'Services/modal deregister',
  component: ModalDeRegister,
  args: {
    open: true,
    title: 'modal deregister',
    serviceName: 'service name',
    message: SURE_TO_DEREGISTER,
    onConfirm: () => action('onConfirm: ')(),
    onClose: () => action('onClose: ')()
  }
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: 'default modal title '
  }
};

export const OnPage: Story = {
  args: {
    title: DEREGISTER,
    serviceName: ServiceName.BROKER
  }
};
