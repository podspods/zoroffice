import { Meta, StoryObj } from '@storybook/react';
import {fakei18n} from '../../../../../__TEST__/mocks/i18n';
import jsonDataDefault from './data/activityServer.json'; // fake data for testing
import jsonDataComputingNode from './data/computingNode.json'; // fake data for testing
import jsonDataMongoDb from './data/mongo.json'; // fake data for testing
import jsonDataRabbitMq from './data/rabbitMq.json'; // fake data for testing
import jsonDataRedis from './data/redis.json'; // fake data for testing
import { Expand } from './expand';
import { convertService } from './services';
// import jsonData from '../data/redis.json'; // fake data for testing
global.i18n = fakei18n;

const defaultService = convertService(jsonDataDefault);
const computingNode = convertService(jsonDataComputingNode);
const mongoDb = convertService(jsonDataMongoDb);
const rabbitMq = convertService(jsonDataRabbitMq);
const redis = convertService(jsonDataRedis);
const meta = {
  // eslint-disable-next-line storybook/no-title-property-in-meta
  title: 'perso/Expand',
  component: Expand,
  args: {
    service: defaultService
  }
} satisfies Meta<typeof Expand>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {}

}satisfies Story;

export const ComputingNode: Story = {

  args: {
    service: computingNode

  }

}satisfies Story;

export const Mongodb: Story = {
  args: {
    service: mongoDb
  }
}satisfies Story;
export const RabbitMq: Story = {
  args: {
    service: rabbitMq
  }
}satisfies Story;
export const Redis: Story = {
  args: {
    service: redis
  }
}satisfies Story;
