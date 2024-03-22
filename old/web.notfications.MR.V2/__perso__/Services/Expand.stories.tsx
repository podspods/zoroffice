import { Meta, StoryObj } from '@storybook/react';
import jsonDataDefault from './storybook.data/activityServer.json'; // fake data for testing
import jsonDataComputingNode from './storybook.data/computingNode.json'; // fake data for testing
import jsonDataMongoDb from './storybook.data/mongo.json'; // fake data for testing
import jsonDataRabbitMq from './storybook.data/rabbitMq.json'; // fake data for testing
import jsonDataRedis from './storybook.data/redis.json'; // fake data for testing
import { adaptator } from './utils';
import Expand from './Expand';

const defaultService = adaptator(jsonDataDefault);
const computingNode = adaptator(jsonDataComputingNode);
const mongoDb = adaptator(jsonDataMongoDb);
const rabbitMq = adaptator(jsonDataRabbitMq);
const redis = adaptator(jsonDataRedis);
const meta: Meta<typeof Expand> = {
  // eslint-disable-next-line storybook/no-title-property-in-meta
  title: 'Services/Expand',
  component: Expand,
  args: {
    row: defaultService
  }
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {}
};

export const ComputingNode: Story = {
  args: {
    row: computingNode
  }
};

export const Mongodb: Story = {
  args: {
    row: mongoDb
  }
};
export const RabbitMq: Story = {
  args: {
    row: rabbitMq
  }
};

export const Redis: Story = {
  args: {
    row: redis
  }
};
