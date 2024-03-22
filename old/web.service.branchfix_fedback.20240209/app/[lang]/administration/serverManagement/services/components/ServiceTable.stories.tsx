import { Meta, StoryObj } from '@storybook/react';
import { rest } from 'msw';
import Apis from '@/utils/apis';
import ServiceTable from './ServiceTable';

const meta: Meta<typeof ServiceTable> = {
  title: 'pages/AdministrationServerManagementServices',
  component: ServiceTable,
  parameters: {
    msw: {
      handlers: [
        rest.get(Apis.service.list, async (req, res, ctx) => {
          return res(ctx.delay(10), ctx.json(serviceStatusList));
        })
      ]
    }
  }
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

/**  ____________________ fake data ___________________________________ */

const serviceStatusList = {
  services: [
    {
      _id: '65bcf0828375e88c08aa9d00',
      type: 'RabbitMQ',
      hostname: 'http://localhost:15672/',
      insertedAt: '2024-02-06T11:22:38.156Z',
      app: {
        version: '3.11.13',
        semverVersion: '3.11.13',
        invalidVersion: false
      },
      data: {
        managementUrl: 'http://localhost:15672/',
        name: 'RabbitMQ',
        hostname: 'http://localhost:15672/',
        displayName: 'RabbitMQ (used by ses-file-translation-consumer)',
        overview: {
          management_version: '3.11.13',
          rates_mode: 'basic',
          sample_retention_policies: {
            global: [600, 3600, 28800, 86400],
            basic: [600, 3600],
            detailed: [600]
          },
          exchange_types: [
            {
              name: 'direct',
              description:
                'AMQP direct exchange, as per the AMQP specification',
              enabled: true
            },
            {
              name: 'fanout',
              description:
                'AMQP fanout exchange, as per the AMQP specification',
              enabled: true
            },
            {
              name: 'headers',
              description:
                'AMQP headers exchange, as per the AMQP specification',
              enabled: true
            },
            {
              name: 'topic',
              description: 'AMQP topic exchange, as per the AMQP specification',
              enabled: true
            },
            {
              name: 'x-delayed-message',
              description: 'Delayed Message Exchange.',
              enabled: true
            }
          ],
          product_version: '3.11.13',
          product_name: 'RabbitMQ',
          rabbitmq_version: '3.11.13',
          cluster_name: 'rabbit@ip107.ip-5-39-40.eu',
          erlang_version: '25.3.2.8',
          erlang_full_version:
            'Erlang/OTP 25 [erts-13.2.2.5] [source] [64-bit] [smp:16:16] [ds:16:16:10] [async-threads:1] [jit:ns]',
          release_series_support_status: 'supported',
          disable_stats: false,
          is_op_policy_updating_enabled: true,
          enable_queue_totals: false,
          message_stats: {
            ack: 105132,
            ack_details: {
              rate: 0
            },
            confirm: 105132,
            confirm_details: {
              rate: 0
            },
            deliver: 105132,
            deliver_details: {
              rate: 0
            },
            deliver_get: 105132,
            deliver_get_details: {
              rate: 0
            },
            deliver_no_ack: 0,
            deliver_no_ack_details: {
              rate: 0
            },
            disk_reads: 0,
            disk_reads_details: {
              rate: 0
            },
            disk_writes: 806,
            disk_writes_details: {
              rate: 0
            },
            drop_unroutable: 0,
            drop_unroutable_details: {
              rate: 0
            },
            get: 0,
            get_details: {
              rate: 0
            },
            get_empty: 0,
            get_empty_details: {
              rate: 0
            },
            get_no_ack: 0,
            get_no_ack_details: {
              rate: 0
            },
            publish: 105132,
            publish_details: {
              rate: 0
            },
            redeliver: 0,
            redeliver_details: {
              rate: 0
            },
            return_unroutable: 0,
            return_unroutable_details: {
              rate: 0
            }
          },
          churn_rates: {
            channel_closed: 3752,
            channel_closed_details: {
              rate: 0
            },
            channel_created: 4449,
            channel_created_details: {
              rate: 0
            },
            connection_closed: 2306,
            connection_closed_details: {
              rate: 0
            },
            connection_created: 2777,
            connection_created_details: {
              rate: 0
            },
            queue_created: 52,
            queue_created_details: {
              rate: 0
            },
            queue_declared: 17420,
            queue_declared_details: {
              rate: 0
            },
            queue_deleted: 5,
            queue_deleted_details: {
              rate: 0
            }
          },
          queue_totals: {
            messages: 0,
            messages_details: {
              rate: 0
            },
            messages_ready: 0,
            messages_ready_details: {
              rate: 0
            },
            messages_unacknowledged: 0,
            messages_unacknowledged_details: {
              rate: 0
            }
          },
          object_totals: {
            channels: 697,
            connections: 471,
            consumers: 377,
            exchanges: 8,
            queues: 47
          },
          statistics_db_event_queue: 0,
          node: 'rabbit@localhost',
          listeners: [
            {
              node: 'rabbit@localhost',
              protocol: 'amqp',
              ip_address: '::',
              port: 5672,
              socket_opts: {
                binary: true,
                packet: 'raw',
                reuseaddr: true,
                backlog: 128,
                nodelay: true,
                exit_on_close: false,
                keepalive: false
              }
            },
            {
              node: 'rabbit@localhost',
              protocol: 'clustering',
              ip_address: '::',
              port: 25672,
              socket_opts: []
            },
            {
              node: 'rabbit@localhost',
              protocol: 'http',
              ip_address: '::',
              port: 15672,
              socket_opts: {
                cowboy_opts: {
                  sendfile: false
                },
                port: 15672
              }
            }
          ],
          contexts: [
            {
              ssl_opts: [],
              node: 'rabbit@localhost',
              description: 'RabbitMQ Management',
              path: '/',
              cowboy_opts: '[{sendfile,false}]',
              port: '15672'
            }
          ]
        },
        nodes: [
          {
            partitions: [],
            os_pid: '10911',
            fd_total: 32768,
            sockets_total: 29401,
            mem_limit: 10040426496,
            mem_alarm: false,
            disk_free_limit: 50000000,
            disk_free_alarm: false,
            proc_total: 1048576,
            rates_mode: 'basic',
            uptime: 504209674,
            run_queue: 1,
            processors: 16,
            exchange_types: [
              {
                name: 'direct',
                description:
                  'AMQP direct exchange, as per the AMQP specification',
                enabled: true
              },
              {
                name: 'x-delayed-message',
                description: 'Delayed Message Exchange.',
                enabled: true
              },
              {
                name: 'fanout',
                description:
                  'AMQP fanout exchange, as per the AMQP specification',
                enabled: true
              },
              {
                name: 'topic',
                description:
                  'AMQP topic exchange, as per the AMQP specification',
                enabled: true
              },
              {
                name: 'headers',
                description:
                  'AMQP headers exchange, as per the AMQP specification',
                enabled: true
              }
            ],
            auth_mechanisms: [
              {
                name: 'AMQPLAIN',
                description: 'QPid AMQPLAIN mechanism',
                enabled: true
              },
              {
                name: 'PLAIN',
                description: 'SASL PLAIN authentication mechanism',
                enabled: true
              },
              {
                name: 'RABBIT-CR-DEMO',
                description:
                  'RabbitMQ Demo challenge-response authentication mechanism',
                enabled: false
              }
            ],
            applications: [
              {
                name: 'amqp10_common',
                description:
                  'Modules shared by rabbitmq-amqp1.0 and rabbitmq-amqp1.0-client',
                version: '3.11.13'
              },
              {
                name: 'amqp_client',
                description: 'RabbitMQ AMQP Client',
                version: '3.11.13'
              },
              {
                name: 'asn1',
                description: 'The Erlang ASN1 compiler version 5.0.21.1',
                version: '5.0.21.1'
              },
              {
                name: 'aten',
                description: 'Erlang node failure detector',
                version: '0.5.8'
              },
              {
                name: 'compiler',
                description: 'ERTS  CXC 138 10',
                version: '8.2.6.3'
              },
              {
                name: 'cowboy',
                description: 'Small, fast, modern HTTP server.',
                version: '2.8.0'
              },
              {
                name: 'cowlib',
                description: 'Support library for manipulating Web protocols.',
                version: '2.9.1'
              },
              {
                name: 'credentials_obfuscation',
                description:
                  'Helper library that obfuscates sensitive values in process state',
                version: '3.2.0'
              },
              {
                name: 'crypto',
                description: 'CRYPTO',
                version: '5.1.4.1'
              },
              {
                name: 'cuttlefish',
                description: 'cuttlefish configuration abstraction',
                version: '3.1.0'
              },
              {
                name: 'enough',
                description:
                  'A gen_server implementation with additional, overload-protected call type',
                version: '0.1.0'
              },
              {
                name: 'gen_batch_server',
                description: 'Generic batching server',
                version: '0.8.8'
              },
              {
                name: 'inets',
                description: 'INETS  CXC 138 49',
                version: '8.3.1.2'
              },
              {
                name: 'kernel',
                description: 'ERTS  CXC 138 10',
                version: '8.5.4.2'
              },
              {
                name: 'mnesia',
                description: 'MNESIA  CXC 138 12',
                version: '4.21.4.2'
              },
              {
                name: 'observer_cli',
                description: 'Visualize Erlang Nodes On The Command Line',
                version: '1.7.3'
              },
              {
                name: 'os_mon',
                description: 'CPO  CXC 138 46',
                version: '2.8.2'
              },
              {
                name: 'osiris',
                description: 'New project',
                version: '1.4.2'
              },
              {
                name: 'public_key',
                description: 'Public key infrastructure',
                version: '1.13.3.2'
              },
              {
                name: 'ra',
                description: 'Raft library',
                version: '2.4.9'
              },
              {
                name: 'rabbit',
                description: 'RabbitMQ',
                version: '3.11.13'
              },
              {
                name: 'rabbit_common',
                description:
                  'Modules shared by rabbitmq-server and rabbitmq-erlang-client',
                version: '3.11.13'
              },
              {
                name: 'rabbitmq_delayed_message_exchange',
                description: 'RabbitMQ Delayed Message Exchange',
                version: '3.11.1'
              },
              {
                name: 'rabbitmq_management',
                description: 'RabbitMQ Management Console',
                version: '3.11.13'
              },
              {
                name: 'rabbitmq_management_agent',
                description: 'RabbitMQ Management Agent',
                version: '3.11.13'
              },
              {
                name: 'rabbitmq_prelaunch',
                description: 'RabbitMQ prelaunch setup',
                version: '3.11.13'
              },
              {
                name: 'rabbitmq_web_dispatch',
                description: 'RabbitMQ Web Dispatcher',
                version: '3.11.13'
              },
              {
                name: 'ranch',
                description: 'Socket acceptor pool for TCP protocols.',
                version: '2.1.0'
              },
              {
                name: 'recon',
                description: 'Diagnostic tools for production use',
                version: '2.5.3'
              },
              {
                name: 'redbug',
                description: 'Erlang Tracing Debugger',
                version: '2.0.7'
              },
              {
                name: 'runtime_tools',
                description: 'RUNTIME_TOOLS',
                version: '1.19'
              },
              {
                name: 'sasl',
                description: 'SASL  CXC 138 11',
                version: '4.2'
              },
              {
                name: 'seshat',
                description: 'Counters registry',
                version: '0.4.0'
              },
              {
                name: 'ssl',
                description: 'Erlang/OTP SSL application',
                version: '10.9.1.3'
              },
              {
                name: 'stdlib',
                description: 'ERTS  CXC 138 10',
                version: '4.3.1.3'
              },
              {
                name: 'stdout_formatter',
                description:
                  'Tools to format paragraphs, lists and tables as plain text',
                version: '0.2.4'
              },
              {
                name: 'syntax_tools',
                description: 'Syntax tools',
                version: '3.0.1'
              },
              {
                name: 'sysmon_handler',
                description: 'Rate-limiting system_monitor event handler',
                version: '1.3.0'
              },
              {
                name: 'systemd',
                description: 'systemd integration for Erlang applications',
                version: '0.6.1'
              },
              {
                name: 'thoas',
                description:
                  'A blazing fast JSON parser and generator in pure Erlang.',
                version: '1.0.0'
              },
              {
                name: 'tools',
                description: 'DEVTOOLS  CXC 138 16',
                version: '3.5.3'
              },
              {
                name: 'xmerl',
                description: 'XML parser',
                version: '1.3.31.1'
              }
            ],
            contexts: [
              {
                description: 'RabbitMQ Management',
                path: '/',
                cowboy_opts: '[{sendfile,false}]',
                port: '15672'
              }
            ],
            log_files: [
              '/var/log/rabbitmq/rabbit@localhost.log',
              '/var/log/rabbitmq/rabbit@localhost_upgrade.log',
              '<stdout>'
            ],
            db_dir: '/var/lib/rabbitmq/mnesia/rabbit@localhost',
            config_files: ['/etc/rabbitmq/rabbitmq.config'],
            net_ticktime: 60,
            enabled_plugins: [
              'rabbitmq_delayed_message_exchange',
              'rabbitmq_management'
            ],
            mem_calculation_strategy: 'rss',
            ra_open_file_metrics: {
              ra_log_wal: 1,
              ra_log_segment_writer: 0
            },
            name: 'rabbit@localhost',
            type: 'disc',
            running: true,
            mem_used: 268288000,
            mem_used_details: {
              rate: 349798.4
            },
            fd_used: 511,
            fd_used_details: {
              rate: 0
            },
            sockets_used: 471,
            sockets_used_details: {
              rate: 0
            },
            proc_used: 6574,
            proc_used_details: {
              rate: 0
            },
            disk_free: 56638480384,
            disk_free_details: {
              rate: 0
            },
            gc_num: 117318662,
            gc_num_details: {
              rate: 219.4
            },
            gc_bytes_reclaimed: 6391169845992,
            gc_bytes_reclaimed_details: {
              rate: 11221297.6
            },
            context_switches: 276741893,
            context_switches_details: {
              rate: 615.2
            },
            io_read_count: 1,
            io_read_count_details: {
              rate: 0
            },
            io_read_bytes: 1,
            io_read_bytes_details: {
              rate: 0
            },
            io_read_avg_time: 0.074,
            io_read_avg_time_details: {
              rate: 0
            },
            io_write_count: 726,
            io_write_count_details: {
              rate: 0
            },
            io_write_bytes: 4010286,
            io_write_bytes_details: {
              rate: 0
            },
            io_write_avg_time: 0.3891804407713499,
            io_write_avg_time_details: {
              rate: 0
            },
            io_sync_count: 726,
            io_sync_count_details: {
              rate: 0
            },
            io_sync_avg_time: 4.326513774104683,
            io_sync_avg_time_details: {
              rate: 0
            },
            io_seek_count: 24,
            io_seek_count_details: {
              rate: 0
            },
            io_seek_avg_time: 0.08695833333333333,
            io_seek_avg_time_details: {
              rate: 0
            },
            io_reopen_count: 0,
            io_reopen_count_details: {
              rate: 0
            },
            mnesia_ram_tx_count: 20559,
            mnesia_ram_tx_count_details: {
              rate: 0
            },
            mnesia_disk_tx_count: 86,
            mnesia_disk_tx_count_details: {
              rate: 0
            },
            msg_store_read_count: 0,
            msg_store_read_count_details: {
              rate: 0
            },
            msg_store_write_count: 30,
            msg_store_write_count_details: {
              rate: 0
            },
            queue_index_write_count: 0,
            queue_index_write_count_details: {
              rate: 0
            },
            queue_index_read_count: 0,
            queue_index_read_count_details: {
              rate: 0
            },
            connection_created: 2777,
            connection_created_details: {
              rate: 0
            },
            connection_closed: 2306,
            connection_closed_details: {
              rate: 0
            },
            channel_created: 4449,
            channel_created_details: {
              rate: 0
            },
            channel_closed: 3752,
            channel_closed_details: {
              rate: 0
            },
            queue_declared: 17420,
            queue_declared_details: {
              rate: 0
            },
            queue_created: 52,
            queue_created_details: {
              rate: 0
            },
            queue_deleted: 5,
            queue_deleted_details: {
              rate: 0
            },
            cluster_links: [],
            metrics_gc_queue_length: {
              connection_closed: 0,
              channel_closed: 0,
              consumer_deleted: 0,
              exchange_deleted: 0,
              queue_deleted: 0,
              vhost_deleted: 0,
              node_node_deleted: 0,
              channel_consumer_deleted: 0
            }
          }
        ],
        queues: [
          {
            arguments: {
              'x-dead-letter-exchange': 'amq.match'
            },
            auto_delete: false,
            backing_queue_status: {
              avg_ack_egress_rate: 0,
              avg_ack_ingress_rate: 0,
              avg_egress_rate: 0,
              avg_ingress_rate: 0,
              delta: ['delta', 'undefined', 0, 0, 'undefined'],
              len: 0,
              mode: 'default',
              next_deliver_seq_id: 4,
              next_seq_id: 4,
              num_pending_acks: 0,
              num_unconfirmed: 0,
              q1: 0,
              q2: 0,
              q3: 0,
              q4: 0,
              target_ram_count: 'infinity',
              version: 1
            },
            consumer_capacity: 1,
            consumer_utilisation: 1,
            consumers: 4,
            durable: false,
            effective_policy_definition: {},
            exclusive: false,
            exclusive_consumer_tag: null,
            garbage_collection: {
              fullsweep_after: 65535,
              max_heap_size: 0,
              min_bin_vheap_size: 46422,
              min_heap_size: 233,
              minor_gcs: 8433
            },
            head_message_timestamp: null,
            idle_since: '2024-02-08T10:31:53.922+01:00',
            memory: 9320,
            message_bytes: 0,
            message_bytes_paged_out: 0,
            message_bytes_persistent: 0,
            message_bytes_ram: 0,
            message_bytes_ready: 0,
            message_bytes_unacknowledged: 0,
            message_stats: {
              ack: 4,
              ack_details: {
                rate: 0
              },
              deliver: 4,
              deliver_details: {
                rate: 0
              },
              deliver_get: 4,
              deliver_get_details: {
                rate: 0
              },
              deliver_no_ack: 0,
              deliver_no_ack_details: {
                rate: 0
              },
              get: 0,
              get_details: {
                rate: 0
              },
              get_empty: 0,
              get_empty_details: {
                rate: 0
              },
              get_no_ack: 0,
              get_no_ack_details: {
                rate: 0
              },
              publish: 4,
              publish_details: {
                rate: 0
              },
              redeliver: 0,
              redeliver_details: {
                rate: 0
              }
            },
            messages: 0,
            messages_details: {
              rate: 0
            },
            messages_paged_out: 0,
            messages_persistent: 0,
            messages_ram: 0,
            messages_ready: 0,
            messages_ready_details: {
              rate: 0
            },
            messages_ready_ram: 0,
            messages_unacknowledged: 0,
            messages_unacknowledged_details: {
              rate: 0
            },
            messages_unacknowledged_ram: 0,
            name: 'CorpusManager.DeferredWork',
            node: 'rabbit@localhost',
            operator_policy: null,
            policy: null,
            recoverable_slaves: null,
            reductions: 5548343,
            reductions_details: {
              rate: 0
            },
            single_active_consumer_tag: null,
            state: 'running',
            type: 'classic',
            vhost: '/'
          },
          {
            arguments: {
              'x-expires': 600000,
              'x-message-ttl': 600000
            },
            auto_delete: false,
            backing_queue_status: {
              avg_ack_egress_rate: 0.09823715730181318,
              avg_ack_ingress_rate: 0.09823715730181318,
              avg_egress_rate: 0.09823715730181318,
              avg_ingress_rate: 0.09823715730181318,
              delta: ['delta', 'undefined', 0, 0, 'undefined'],
              len: 0,
              mode: 'default',
              next_deliver_seq_id: 16612,
              next_seq_id: 16612,
              num_pending_acks: 0,
              num_unconfirmed: 0,
              q1: 0,
              q2: 0,
              q3: 0,
              q4: 0,
              target_ram_count: 'infinity',
              version: 1
            },
            consumer_capacity: 1,
            consumer_utilisation: 1,
            consumers: 100,
            durable: false,
            effective_policy_definition: {},
            exclusive: false,
            exclusive_consumer_tag: null,
            garbage_collection: {
              fullsweep_after: 65535,
              max_heap_size: 0,
              min_bin_vheap_size: 46422,
              min_heap_size: 233,
              minor_gcs: 601
            },
            head_message_timestamp: null,
            memory: 451352,
            message_bytes: 0,
            message_bytes_paged_out: 0,
            message_bytes_persistent: 0,
            message_bytes_ram: 0,
            message_bytes_ready: 0,
            message_bytes_unacknowledged: 0,
            message_stats: {
              ack: 16612,
              ack_details: {
                rate: 0
              },
              deliver: 16612,
              deliver_details: {
                rate: 0
              },
              deliver_get: 16612,
              deliver_get_details: {
                rate: 0
              },
              deliver_no_ack: 0,
              deliver_no_ack_details: {
                rate: 0
              },
              get: 0,
              get_details: {
                rate: 0
              },
              get_empty: 0,
              get_empty_details: {
                rate: 0
              },
              get_no_ack: 0,
              get_no_ack_details: {
                rate: 0
              },
              publish: 16613,
              publish_details: {
                rate: 0.2
              },
              redeliver: 0,
              redeliver_details: {
                rate: 0
              }
            },
            messages: 0,
            messages_details: {
              rate: 0
            },
            messages_paged_out: 0,
            messages_persistent: 0,
            messages_ram: 0,
            messages_ready: 0,
            messages_ready_details: {
              rate: 0
            },
            messages_ready_ram: 0,
            messages_unacknowledged: 0,
            messages_unacknowledged_details: {
              rate: 0
            },
            messages_unacknowledged_ram: 0,
            name: 'Reply.11b249c3-b35b-49c3-a3be-8539901d5c7f',
            node: 'rabbit@localhost',
            operator_policy: null,
            policy: null,
            recoverable_slaves: null,
            reductions: 75317120,
            reductions_details: {
              rate: 891.6
            },
            single_active_consumer_tag: null,
            state: 'running',
            type: 'classic',
            vhost: '/'
          },
          {
            arguments: {},
            auto_delete: false,
            backing_queue_status: {
              avg_ack_egress_rate: 0,
              avg_ack_ingress_rate: 0,
              avg_egress_rate: 0,
              avg_ingress_rate: 0,
              delta: ['delta', 'undefined', 0, 0, 'undefined'],
              len: 0,
              mode: 'default',
              next_deliver_seq_id: 806,
              next_seq_id: 806,
              num_pending_acks: 0,
              num_unconfirmed: 0,
              q1: 0,
              q2: 0,
              q3: 0,
              q4: 0,
              target_ram_count: 'infinity',
              version: 1
            },
            consumer_capacity: 1,
            consumer_utilisation: 1,
            consumers: 100,
            durable: true,
            effective_policy_definition: {},
            exclusive: false,
            exclusive_consumer_tag: null,
            garbage_collection: {
              fullsweep_after: 65535,
              max_heap_size: 0,
              min_bin_vheap_size: 46422,
              min_heap_size: 233,
              minor_gcs: 2772
            },
            head_message_timestamp: null,
            idle_since: '2024-02-08T10:31:54.015+01:00',
            memory: 69752,
            message_bytes: 0,
            message_bytes_paged_out: 0,
            message_bytes_persistent: 0,
            message_bytes_ram: 0,
            message_bytes_ready: 0,
            message_bytes_unacknowledged: 0,
            message_stats: {
              ack: 806,
              ack_details: {
                rate: 0
              },
              deliver: 806,
              deliver_details: {
                rate: 0
              },
              deliver_get: 806,
              deliver_get_details: {
                rate: 0
              },
              deliver_no_ack: 0,
              deliver_no_ack_details: {
                rate: 0
              },
              get: 0,
              get_details: {
                rate: 0
              },
              get_empty: 0,
              get_empty_details: {
                rate: 0
              },
              get_no_ack: 0,
              get_no_ack_details: {
                rate: 0
              },
              publish: 806,
              publish_details: {
                rate: 0
              },
              redeliver: 0,
              redeliver_details: {
                rate: 0
              }
            },
            messages: 0,
            messages_details: {
              rate: 0
            },
            messages_paged_out: 0,
            messages_persistent: 0,
            messages_ram: 0,
            messages_ready: 0,
            messages_ready_details: {
              rate: 0
            },
            messages_ready_ram: 0,
            messages_unacknowledged: 0,
            messages_unacknowledged_details: {
              rate: 0
            },
            messages_unacknowledged_ram: 0,
            name: 'Reply.async.v2',
            node: 'rabbit@localhost',
            operator_policy: null,
            policy: null,
            recoverable_slaves: null,
            reductions: 23435508,
            reductions_details: {
              rate: 0
            },
            single_active_consumer_tag: null,
            state: 'running',
            type: 'classic',
            vhost: '/'
          },
          {
            arguments: {
              'x-dead-letter-exchange': 'amq.match'
            },
            auto_delete: false,
            backing_queue_status: {
              avg_ack_egress_rate: 0.09823644739755127,
              avg_ack_ingress_rate: 0.09823644739755127,
              avg_egress_rate: 0.09823644739755127,
              avg_ingress_rate: 0.09823644739755127,
              delta: ['delta', 'undefined', 0, 0, 'undefined'],
              len: 0,
              mode: 'default',
              next_deliver_seq_id: 50280,
              next_seq_id: 50280,
              num_pending_acks: 0,
              num_unconfirmed: 0,
              q1: 0,
              q2: 0,
              q3: 0,
              q4: 0,
              target_ram_count: 'infinity',
              version: 1
            },
            consumer_capacity: 1,
            consumer_utilisation: 1,
            consumers: 32,
            durable: false,
            effective_policy_definition: {},
            exclusive: false,
            exclusive_consumer_tag: null,
            garbage_collection: {
              fullsweep_after: 65535,
              max_heap_size: 0,
              min_bin_vheap_size: 46422,
              min_heap_size: 233,
              minor_gcs: 400
            },
            head_message_timestamp: null,
            memory: 284448,
            message_bytes: 0,
            message_bytes_paged_out: 0,
            message_bytes_persistent: 0,
            message_bytes_ram: 0,
            message_bytes_ready: 0,
            message_bytes_unacknowledged: 0,
            message_stats: {
              ack: 50280,
              ack_details: {
                rate: 0
              },
              deliver: 50280,
              deliver_details: {
                rate: 0
              },
              deliver_get: 50280,
              deliver_get_details: {
                rate: 0
              },
              deliver_no_ack: 0,
              deliver_no_ack_details: {
                rate: 0
              },
              get: 0,
              get_details: {
                rate: 0
              },
              get_empty: 0,
              get_empty_details: {
                rate: 0
              },
              get_no_ack: 0,
              get_no_ack_details: {
                rate: 0
              },
              publish: 50281,
              publish_details: {
                rate: 0.2
              },
              redeliver: 0,
              redeliver_details: {
                rate: 0
              }
            },
            messages: 0,
            messages_details: {
              rate: 0
            },
            messages_paged_out: 0,
            messages_persistent: 0,
            messages_ram: 0,
            messages_ready: 0,
            messages_ready_details: {
              rate: 0
            },
            messages_ready_ram: 0,
            messages_unacknowledged: 0,
            messages_unacknowledged_details: {
              rate: 0
            },
            messages_unacknowledged_ram: 0,
            name: 'Request.routing-queue',
            node: 'rabbit@localhost',
            operator_policy: null,
            policy: null,
            recoverable_slaves: null,
            reductions: 149531049,
            reductions_details: {
              rate: 585.8
            },
            single_active_consumer_tag: null,
            state: 'running',
            type: 'classic',
            vhost: '/'
          },
          {
            arguments: {
              'x-dead-letter-exchange': 'amq.match',
              'x-max-priority': 9
            },
            auto_delete: false,
            backing_queue_status: {
              avg_ack_egress_rate: 0,
              avg_ack_ingress_rate: 0,
              avg_egress_rate: 0,
              avg_ingress_rate: 0,
              delta: ['delta', 'todo', 'todo', 'todo', 'todo'],
              len: 0,
              mode: 'default',
              next_deliver_seq_id: 4,
              next_seq_id: 4,
              num_pending_acks: 0,
              num_unconfirmed: 0,
              priority_lengths: {
                0: 0,
                1: 0,
                2: 0,
                3: 0,
                4: 0,
                5: 0,
                6: 0,
                7: 0,
                8: 0,
                9: 0
              },
              q1: 0,
              q2: 0,
              q3: 0,
              q4: 0,
              target_ram_count: 'infinity',
              version: 10
            },
            consumer_capacity: 1,
            consumer_utilisation: 1,
            consumers: 2,
            durable: false,
            effective_policy_definition: {},
            exclusive: false,
            exclusive_consumer_tag: null,
            garbage_collection: {
              fullsweep_after: 65535,
              max_heap_size: 0,
              min_bin_vheap_size: 46422,
              min_heap_size: 233,
              minor_gcs: 2337
            },
            head_message_timestamp: null,
            idle_since: '2024-02-08T10:31:54.309+01:00',
            memory: 40008,
            message_bytes: 0,
            message_bytes_paged_out: 0,
            message_bytes_persistent: 0,
            message_bytes_ram: 0,
            message_bytes_ready: 0,
            message_bytes_unacknowledged: 0,
            message_stats: {
              ack: 4,
              ack_details: {
                rate: 0
              },
              deliver: 4,
              deliver_details: {
                rate: 0
              },
              deliver_get: 4,
              deliver_get_details: {
                rate: 0
              },
              deliver_no_ack: 0,
              deliver_no_ack_details: {
                rate: 0
              },
              get: 0,
              get_details: {
                rate: 0
              },
              get_empty: 0,
              get_empty_details: {
                rate: 0
              },
              get_no_ack: 0,
              get_no_ack_details: {
                rate: 0
              },
              publish: 4,
              publish_details: {
                rate: 0
              },
              redeliver: 0,
              redeliver_details: {
                rate: 0
              }
            },
            messages: 0,
            messages_details: {
              rate: 0
            },
            messages_paged_out: 0,
            messages_persistent: 0,
            messages_ram: 0,
            messages_ready: 0,
            messages_ready_details: {
              rate: 0
            },
            messages_ready_ram: 0,
            messages_unacknowledged: 0,
            messages_unacknowledged_details: {
              rate: 0
            },
            messages_unacknowledged_ram: 0,
            name: 'Request.v2.010698a9-1ae8-4c68-9ebf-dc7e1608e426',
            node: 'rabbit@localhost',
            operator_policy: null,
            policy: null,
            recoverable_slaves: null,
            reductions: 15996407,
            reductions_details: {
              rate: 0
            },
            single_active_consumer_tag: null,
            state: 'running',
            type: 'classic',
            vhost: '/'
          },
          {
            arguments: {
              'x-dead-letter-exchange': 'amq.match',
              'x-max-priority': 9
            },
            auto_delete: false,
            backing_queue_status: {
              avg_ack_egress_rate: 0,
              avg_ack_ingress_rate: 0,
              avg_egress_rate: 0,
              avg_ingress_rate: 0,
              delta: ['delta', 'todo', 'todo', 'todo', 'todo'],
              len: 0,
              mode: 'default',
              next_deliver_seq_id: 138,
              next_seq_id: 138,
              num_pending_acks: 0,
              num_unconfirmed: 0,
              priority_lengths: {
                0: 0,
                1: 0,
                2: 0,
                3: 0,
                4: 0,
                5: 0,
                6: 0,
                7: 0,
                8: 0,
                9: 0
              },
              q1: 0,
              q2: 0,
              q3: 0,
              q4: 0,
              target_ram_count: 'infinity',
              version: 10
            },
            consumer_capacity: 1,
            consumer_utilisation: 1,
            consumers: 2,
            durable: false,
            effective_policy_definition: {},
            exclusive: false,
            exclusive_consumer_tag: null,
            garbage_collection: {
              fullsweep_after: 65535,
              max_heap_size: 0,
              min_bin_vheap_size: 46422,
              min_heap_size: 233,
              minor_gcs: 2917
            },
            head_message_timestamp: null,
            idle_since: '2024-02-08T10:31:54.483+01:00',
            memory: 40200,
            message_bytes: 0,
            message_bytes_paged_out: 0,
            message_bytes_persistent: 0,
            message_bytes_ram: 0,
            message_bytes_ready: 0,
            message_bytes_unacknowledged: 0,
            message_stats: {
              ack: 138,
              ack_details: {
                rate: 0
              },
              deliver: 138,
              deliver_details: {
                rate: 0
              },
              deliver_get: 138,
              deliver_get_details: {
                rate: 0
              },
              deliver_no_ack: 0,
              deliver_no_ack_details: {
                rate: 0
              },
              get: 0,
              get_details: {
                rate: 0
              },
              get_empty: 0,
              get_empty_details: {
                rate: 0
              },
              get_no_ack: 0,
              get_no_ack_details: {
                rate: 0
              },
              publish: 138,
              publish_details: {
                rate: 0
              },
              redeliver: 0,
              redeliver_details: {
                rate: 0
              }
            },
            messages: 0,
            messages_details: {
              rate: 0
            },
            messages_paged_out: 0,
            messages_persistent: 0,
            messages_ram: 0,
            messages_ready: 0,
            messages_ready_details: {
              rate: 0
            },
            messages_ready_ram: 0,
            messages_unacknowledged: 0,
            messages_unacknowledged_details: {
              rate: 0
            },
            messages_unacknowledged_ram: 0,
            name: 'Request.v2.1ebe3201-4447-4bc9-827b-c13b65a998d7',
            node: 'rabbit@localhost',
            operator_policy: null,
            policy: null,
            recoverable_slaves: null,
            reductions: 16562674,
            reductions_details: {
              rate: 0
            },
            single_active_consumer_tag: null,
            state: 'running',
            type: 'classic',
            vhost: '/'
          },
          {
            arguments: {
              'x-dead-letter-exchange': 'amq.match',
              'x-max-priority': 9
            },
            auto_delete: false,
            backing_queue_status: {
              avg_ack_egress_rate: 0,
              avg_ack_ingress_rate: 0,
              avg_egress_rate: 0,
              avg_ingress_rate: 0,
              delta: ['delta', 'todo', 'todo', 'todo', 'todo'],
              len: 0,
              mode: 'default',
              next_deliver_seq_id: 38,
              next_seq_id: 38,
              num_pending_acks: 0,
              num_unconfirmed: 0,
              priority_lengths: {
                0: 0,
                1: 0,
                2: 0,
                3: 0,
                4: 0,
                5: 0,
                6: 0,
                7: 0,
                8: 0,
                9: 0
              },
              q1: 0,
              q2: 0,
              q3: 0,
              q4: 0,
              target_ram_count: 'infinity',
              version: 10
            },
            consumer_capacity: 1,
            consumer_utilisation: 1,
            consumers: 2,
            durable: false,
            effective_policy_definition: {},
            exclusive: false,
            exclusive_consumer_tag: null,
            garbage_collection: {
              fullsweep_after: 65535,
              max_heap_size: 0,
              min_bin_vheap_size: 46422,
              min_heap_size: 233,
              minor_gcs: 2308
            },
            head_message_timestamp: null,
            idle_since: '2024-02-08T10:31:54.100+01:00',
            memory: 40184,
            message_bytes: 0,
            message_bytes_paged_out: 0,
            message_bytes_persistent: 0,
            message_bytes_ram: 0,
            message_bytes_ready: 0,
            message_bytes_unacknowledged: 0,
            message_stats: {
              ack: 38,
              ack_details: {
                rate: 0
              },
              deliver: 38,
              deliver_details: {
                rate: 0
              },
              deliver_get: 38,
              deliver_get_details: {
                rate: 0
              },
              deliver_no_ack: 0,
              deliver_no_ack_details: {
                rate: 0
              },
              get: 0,
              get_details: {
                rate: 0
              },
              get_empty: 0,
              get_empty_details: {
                rate: 0
              },
              get_no_ack: 0,
              get_no_ack_details: {
                rate: 0
              },
              publish: 38,
              publish_details: {
                rate: 0
              },
              redeliver: 0,
              redeliver_details: {
                rate: 0
              }
            },
            messages: 0,
            messages_details: {
              rate: 0
            },
            messages_paged_out: 0,
            messages_persistent: 0,
            messages_ram: 0,
            messages_ready: 0,
            messages_ready_details: {
              rate: 0
            },
            messages_ready_ram: 0,
            messages_unacknowledged: 0,
            messages_unacknowledged_details: {
              rate: 0
            },
            messages_unacknowledged_ram: 0,
            name: 'Request.v2.2baaaa49-d6e2-431d-af30-d98dc08183a8',
            node: 'rabbit@localhost',
            operator_policy: null,
            policy: null,
            recoverable_slaves: null,
            reductions: 15894555,
            reductions_details: {
              rate: 0
            },
            single_active_consumer_tag: null,
            state: 'running',
            type: 'classic',
            vhost: '/'
          },
          {
            arguments: {
              'x-dead-letter-exchange': 'amq.match',
              'x-max-priority': 9
            },
            auto_delete: false,
            backing_queue_status: {
              avg_ack_egress_rate: 0,
              avg_ack_ingress_rate: 0,
              avg_egress_rate: 0,
              avg_ingress_rate: 0,
              delta: ['delta', 'todo', 'todo', 'todo', 'todo'],
              len: 0,
              mode: 'default',
              next_deliver_seq_id: 12,
              next_seq_id: 12,
              num_pending_acks: 0,
              num_unconfirmed: 0,
              priority_lengths: {
                0: 0,
                1: 0,
                2: 0,
                3: 0,
                4: 0,
                5: 0,
                6: 0,
                7: 0,
                8: 0,
                9: 0
              },
              q1: 0,
              q2: 0,
              q3: 0,
              q4: 0,
              target_ram_count: 'infinity',
              version: 10
            },
            consumer_capacity: 1,
            consumer_utilisation: 1,
            consumers: 2,
            durable: false,
            effective_policy_definition: {},
            exclusive: false,
            exclusive_consumer_tag: null,
            garbage_collection: {
              fullsweep_after: 65535,
              max_heap_size: 0,
              min_bin_vheap_size: 46422,
              min_heap_size: 233,
              minor_gcs: 2367
            },
            head_message_timestamp: null,
            idle_since: '2024-02-08T10:31:53.987+01:00',
            memory: 40168,
            message_bytes: 0,
            message_bytes_paged_out: 0,
            message_bytes_persistent: 0,
            message_bytes_ram: 0,
            message_bytes_ready: 0,
            message_bytes_unacknowledged: 0,
            message_stats: {
              ack: 12,
              ack_details: {
                rate: 0
              },
              deliver: 12,
              deliver_details: {
                rate: 0
              },
              deliver_get: 12,
              deliver_get_details: {
                rate: 0
              },
              deliver_no_ack: 0,
              deliver_no_ack_details: {
                rate: 0
              },
              get: 0,
              get_details: {
                rate: 0
              },
              get_empty: 0,
              get_empty_details: {
                rate: 0
              },
              get_no_ack: 0,
              get_no_ack_details: {
                rate: 0
              },
              publish: 12,
              publish_details: {
                rate: 0
              },
              redeliver: 0,
              redeliver_details: {
                rate: 0
              }
            },
            messages: 0,
            messages_details: {
              rate: 0
            },
            messages_paged_out: 0,
            messages_persistent: 0,
            messages_ram: 0,
            messages_ready: 0,
            messages_ready_details: {
              rate: 0
            },
            messages_ready_ram: 0,
            messages_unacknowledged: 0,
            messages_unacknowledged_details: {
              rate: 0
            },
            messages_unacknowledged_ram: 0,
            name: 'Request.v2.328a414f-db98-43f9-8155-b822190e2b6b',
            node: 'rabbit@localhost',
            operator_policy: null,
            policy: null,
            recoverable_slaves: null,
            reductions: 16039382,
            reductions_details: {
              rate: 0
            },
            single_active_consumer_tag: null,
            state: 'running',
            type: 'classic',
            vhost: '/'
          },
          {
            arguments: {
              'x-dead-letter-exchange': 'amq.match',
              'x-max-priority': 9
            },
            auto_delete: false,
            backing_queue_status: {
              avg_ack_egress_rate: 0,
              avg_ack_ingress_rate: 0,
              avg_egress_rate: 0,
              avg_ingress_rate: 0,
              delta: ['delta', 'todo', 'todo', 'todo', 'todo'],
              len: 0,
              mode: 'default',
              next_deliver_seq_id: 2,
              next_seq_id: 2,
              num_pending_acks: 0,
              num_unconfirmed: 0,
              priority_lengths: {
                0: 0,
                1: 0,
                2: 0,
                3: 0,
                4: 0,
                5: 0,
                6: 0,
                7: 0,
                8: 0,
                9: 0
              },
              q1: 0,
              q2: 0,
              q3: 0,
              q4: 0,
              target_ram_count: 'infinity',
              version: 10
            },
            consumer_capacity: 1,
            consumer_utilisation: 1,
            consumers: 2,
            durable: false,
            effective_policy_definition: {},
            exclusive: false,
            exclusive_consumer_tag: null,
            garbage_collection: {
              fullsweep_after: 65535,
              max_heap_size: 0,
              min_bin_vheap_size: 46422,
              min_heap_size: 233,
              minor_gcs: 2270
            },
            head_message_timestamp: null,
            idle_since: '2024-02-08T10:31:53.956+01:00',
            memory: 40024,
            message_bytes: 0,
            message_bytes_paged_out: 0,
            message_bytes_persistent: 0,
            message_bytes_ram: 0,
            message_bytes_ready: 0,
            message_bytes_unacknowledged: 0,
            message_stats: {
              ack: 2,
              ack_details: {
                rate: 0
              },
              deliver: 2,
              deliver_details: {
                rate: 0
              },
              deliver_get: 2,
              deliver_get_details: {
                rate: 0
              },
              deliver_no_ack: 0,
              deliver_no_ack_details: {
                rate: 0
              },
              get: 0,
              get_details: {
                rate: 0
              },
              get_empty: 0,
              get_empty_details: {
                rate: 0
              },
              get_no_ack: 0,
              get_no_ack_details: {
                rate: 0
              },
              publish: 2,
              publish_details: {
                rate: 0
              },
              redeliver: 0,
              redeliver_details: {
                rate: 0
              }
            },
            messages: 0,
            messages_details: {
              rate: 0
            },
            messages_paged_out: 0,
            messages_persistent: 0,
            messages_ram: 0,
            messages_ready: 0,
            messages_ready_details: {
              rate: 0
            },
            messages_ready_ram: 0,
            messages_unacknowledged: 0,
            messages_unacknowledged_details: {
              rate: 0
            },
            messages_unacknowledged_ram: 0,
            name: 'Request.v2.451e6e6a-aa90-4565-8ea9-286e392baa3b',
            node: 'rabbit@localhost',
            operator_policy: null,
            policy: null,
            recoverable_slaves: null,
            reductions: 15676000,
            reductions_details: {
              rate: 0
            },
            single_active_consumer_tag: null,
            state: 'running',
            type: 'classic',
            vhost: '/'
          },
          {
            arguments: {
              'x-dead-letter-exchange': 'amq.match',
              'x-max-priority': 9
            },
            auto_delete: false,
            backing_queue_status: {
              avg_ack_egress_rate: 0,
              avg_ack_ingress_rate: 0,
              avg_egress_rate: 0,
              avg_ingress_rate: 0,
              delta: ['delta', 'todo', 'todo', 'todo', 'todo'],
              len: 0,
              mode: 'default',
              next_deliver_seq_id: 10,
              next_seq_id: 10,
              num_pending_acks: 0,
              num_unconfirmed: 0,
              priority_lengths: {
                0: 0,
                1: 0,
                2: 0,
                3: 0,
                4: 0,
                5: 0,
                6: 0,
                7: 0,
                8: 0,
                9: 0
              },
              q1: 0,
              q2: 0,
              q3: 0,
              q4: 0,
              target_ram_count: 'infinity',
              version: 10
            },
            consumer_capacity: 1,
            consumer_utilisation: 1,
            consumers: 2,
            durable: false,
            effective_policy_definition: {},
            exclusive: false,
            exclusive_consumer_tag: null,
            garbage_collection: {
              fullsweep_after: 65535,
              max_heap_size: 0,
              min_bin_vheap_size: 46422,
              min_heap_size: 233,
              minor_gcs: 2342
            },
            head_message_timestamp: null,
            idle_since: '2024-02-08T10:31:53.679+01:00',
            memory: 40184,
            message_bytes: 0,
            message_bytes_paged_out: 0,
            message_bytes_persistent: 0,
            message_bytes_ram: 0,
            message_bytes_ready: 0,
            message_bytes_unacknowledged: 0,
            message_stats: {
              ack: 10,
              ack_details: {
                rate: 0
              },
              deliver: 10,
              deliver_details: {
                rate: 0
              },
              deliver_get: 10,
              deliver_get_details: {
                rate: 0
              },
              deliver_no_ack: 0,
              deliver_no_ack_details: {
                rate: 0
              },
              get: 0,
              get_details: {
                rate: 0
              },
              get_empty: 0,
              get_empty_details: {
                rate: 0
              },
              get_no_ack: 0,
              get_no_ack_details: {
                rate: 0
              },
              publish: 10,
              publish_details: {
                rate: 0
              },
              redeliver: 0,
              redeliver_details: {
                rate: 0
              }
            },
            messages: 0,
            messages_details: {
              rate: 0
            },
            messages_paged_out: 0,
            messages_persistent: 0,
            messages_ram: 0,
            messages_ready: 0,
            messages_ready_details: {
              rate: 0
            },
            messages_ready_ram: 0,
            messages_unacknowledged: 0,
            messages_unacknowledged_details: {
              rate: 0
            },
            messages_unacknowledged_ram: 0,
            name: 'Request.v2.4e88a47a-13a4-4776-a879-b298ac15d300',
            node: 'rabbit@localhost',
            operator_policy: null,
            policy: null,
            recoverable_slaves: null,
            reductions: 15996464,
            reductions_details: {
              rate: 0
            },
            single_active_consumer_tag: null,
            state: 'running',
            type: 'classic',
            vhost: '/'
          },
          {
            arguments: {
              'x-dead-letter-exchange': 'amq.match',
              'x-max-priority': 9
            },
            auto_delete: false,
            backing_queue_status: {
              avg_ack_egress_rate: 0,
              avg_ack_ingress_rate: 0,
              avg_egress_rate: 0,
              avg_ingress_rate: 0,
              delta: ['delta', 'todo', 'todo', 'todo', 'todo'],
              len: 0,
              mode: 'default',
              next_deliver_seq_id: 5,
              next_seq_id: 5,
              num_pending_acks: 0,
              num_unconfirmed: 0,
              priority_lengths: {
                0: 0,
                1: 0,
                2: 0,
                3: 0,
                4: 0,
                5: 0,
                6: 0,
                7: 0,
                8: 0,
                9: 0
              },
              q1: 0,
              q2: 0,
              q3: 0,
              q4: 0,
              target_ram_count: 'infinity',
              version: 10
            },
            consumer_capacity: 1,
            consumer_utilisation: 1,
            consumers: 2,
            durable: false,
            effective_policy_definition: {},
            exclusive: false,
            exclusive_consumer_tag: null,
            garbage_collection: {
              fullsweep_after: 65535,
              max_heap_size: 0,
              min_bin_vheap_size: 46422,
              min_heap_size: 233,
              minor_gcs: 2343
            },
            head_message_timestamp: null,
            idle_since: '2024-02-08T10:31:53.786+01:00',
            memory: 40024,
            message_bytes: 0,
            message_bytes_paged_out: 0,
            message_bytes_persistent: 0,
            message_bytes_ram: 0,
            message_bytes_ready: 0,
            message_bytes_unacknowledged: 0,
            message_stats: {
              ack: 5,
              ack_details: {
                rate: 0
              },
              deliver: 5,
              deliver_details: {
                rate: 0
              },
              deliver_get: 5,
              deliver_get_details: {
                rate: 0
              },
              deliver_no_ack: 0,
              deliver_no_ack_details: {
                rate: 0
              },
              get: 0,
              get_details: {
                rate: 0
              },
              get_empty: 0,
              get_empty_details: {
                rate: 0
              },
              get_no_ack: 0,
              get_no_ack_details: {
                rate: 0
              },
              publish: 5,
              publish_details: {
                rate: 0
              },
              redeliver: 0,
              redeliver_details: {
                rate: 0
              }
            },
            messages: 0,
            messages_details: {
              rate: 0
            },
            messages_paged_out: 0,
            messages_persistent: 0,
            messages_ram: 0,
            messages_ready: 0,
            messages_ready_details: {
              rate: 0
            },
            messages_ready_ram: 0,
            messages_unacknowledged: 0,
            messages_unacknowledged_details: {
              rate: 0
            },
            messages_unacknowledged_ram: 0,
            name: 'Request.v2.4f29bfa4-a0fb-4cc9-82f3-38c81403f419',
            node: 'rabbit@localhost',
            operator_policy: null,
            policy: null,
            recoverable_slaves: null,
            reductions: 16043094,
            reductions_details: {
              rate: 0
            },
            single_active_consumer_tag: null,
            state: 'running',
            type: 'classic',
            vhost: '/'
          },
          {
            arguments: {
              'x-dead-letter-exchange': 'amq.match',
              'x-max-priority': 9
            },
            auto_delete: false,
            backing_queue_status: {
              avg_ack_egress_rate: 0,
              avg_ack_ingress_rate: 0,
              avg_egress_rate: 0,
              avg_ingress_rate: 0,
              delta: ['delta', 'todo', 'todo', 'todo', 'todo'],
              len: 0,
              mode: 'default',
              next_deliver_seq_id: 16,
              next_seq_id: 16,
              num_pending_acks: 0,
              num_unconfirmed: 0,
              priority_lengths: {
                0: 0,
                1: 0,
                2: 0,
                3: 0,
                4: 0,
                5: 0,
                6: 0,
                7: 0,
                8: 0,
                9: 0
              },
              q1: 0,
              q2: 0,
              q3: 0,
              q4: 0,
              target_ram_count: 'infinity',
              version: 10
            },
            consumer_capacity: 1,
            consumer_utilisation: 1,
            consumers: 2,
            durable: false,
            effective_policy_definition: {},
            exclusive: false,
            exclusive_consumer_tag: null,
            garbage_collection: {
              fullsweep_after: 65535,
              max_heap_size: 0,
              min_bin_vheap_size: 46422,
              min_heap_size: 233,
              minor_gcs: 2324
            },
            head_message_timestamp: null,
            idle_since: '2024-02-08T10:31:53.847+01:00',
            memory: 40168,
            message_bytes: 0,
            message_bytes_paged_out: 0,
            message_bytes_persistent: 0,
            message_bytes_ram: 0,
            message_bytes_ready: 0,
            message_bytes_unacknowledged: 0,
            message_stats: {
              ack: 16,
              ack_details: {
                rate: 0
              },
              deliver: 16,
              deliver_details: {
                rate: 0
              },
              deliver_get: 16,
              deliver_get_details: {
                rate: 0
              },
              deliver_no_ack: 0,
              deliver_no_ack_details: {
                rate: 0
              },
              get: 0,
              get_details: {
                rate: 0
              },
              get_empty: 0,
              get_empty_details: {
                rate: 0
              },
              get_no_ack: 0,
              get_no_ack_details: {
                rate: 0
              },
              publish: 16,
              publish_details: {
                rate: 0
              },
              redeliver: 0,
              redeliver_details: {
                rate: 0
              }
            },
            messages: 0,
            messages_details: {
              rate: 0
            },
            messages_paged_out: 0,
            messages_persistent: 0,
            messages_ram: 0,
            messages_ready: 0,
            messages_ready_details: {
              rate: 0
            },
            messages_ready_ram: 0,
            messages_unacknowledged: 0,
            messages_unacknowledged_details: {
              rate: 0
            },
            messages_unacknowledged_ram: 0,
            name: 'Request.v2.527dd9c6-9965-4c24-aaaa-6962125d5f08',
            node: 'rabbit@localhost',
            operator_policy: null,
            policy: null,
            recoverable_slaves: null,
            reductions: 15762074,
            reductions_details: {
              rate: 0
            },
            single_active_consumer_tag: null,
            state: 'running',
            type: 'classic',
            vhost: '/'
          },
          {
            arguments: {
              'x-dead-letter-exchange': 'amq.match',
              'x-max-priority': 9
            },
            auto_delete: false,
            backing_queue_status: {
              avg_ack_egress_rate: 0,
              avg_ack_ingress_rate: 0,
              avg_egress_rate: 0,
              avg_ingress_rate: 0,
              delta: ['delta', 'todo', 'todo', 'todo', 'todo'],
              len: 0,
              mode: 'default',
              next_deliver_seq_id: 12,
              next_seq_id: 12,
              num_pending_acks: 0,
              num_unconfirmed: 0,
              priority_lengths: {
                0: 0,
                1: 0,
                2: 0,
                3: 0,
                4: 0,
                5: 0,
                6: 0,
                7: 0,
                8: 0,
                9: 0
              },
              q1: 0,
              q2: 0,
              q3: 0,
              q4: 0,
              target_ram_count: 'infinity',
              version: 10
            },
            consumer_capacity: 1,
            consumer_utilisation: 1,
            consumers: 2,
            durable: false,
            effective_policy_definition: {},
            exclusive: false,
            exclusive_consumer_tag: null,
            garbage_collection: {
              fullsweep_after: 65535,
              max_heap_size: 0,
              min_bin_vheap_size: 46422,
              min_heap_size: 233,
              minor_gcs: 2380
            },
            head_message_timestamp: null,
            idle_since: '2024-02-08T10:31:54.352+01:00',
            memory: 40184,
            message_bytes: 0,
            message_bytes_paged_out: 0,
            message_bytes_persistent: 0,
            message_bytes_ram: 0,
            message_bytes_ready: 0,
            message_bytes_unacknowledged: 0,
            message_stats: {
              ack: 12,
              ack_details: {
                rate: 0
              },
              deliver: 12,
              deliver_details: {
                rate: 0
              },
              deliver_get: 12,
              deliver_get_details: {
                rate: 0
              },
              deliver_no_ack: 0,
              deliver_no_ack_details: {
                rate: 0
              },
              get: 0,
              get_details: {
                rate: 0
              },
              get_empty: 0,
              get_empty_details: {
                rate: 0
              },
              get_no_ack: 0,
              get_no_ack_details: {
                rate: 0
              },
              publish: 12,
              publish_details: {
                rate: 0
              },
              redeliver: 0,
              redeliver_details: {
                rate: 0
              }
            },
            messages: 0,
            messages_details: {
              rate: 0
            },
            messages_paged_out: 0,
            messages_persistent: 0,
            messages_ram: 0,
            messages_ready: 0,
            messages_ready_details: {
              rate: 0
            },
            messages_ready_ram: 0,
            messages_unacknowledged: 0,
            messages_unacknowledged_details: {
              rate: 0
            },
            messages_unacknowledged_ram: 0,
            name: 'Request.v2.6baabe22-19fa-4a24-be92-f31263b57f70',
            node: 'rabbit@localhost',
            operator_policy: null,
            policy: null,
            recoverable_slaves: null,
            reductions: 16010184,
            reductions_details: {
              rate: 0
            },
            single_active_consumer_tag: null,
            state: 'running',
            type: 'classic',
            vhost: '/'
          },
          {
            arguments: {
              'x-dead-letter-exchange': 'amq.match',
              'x-max-priority': 9
            },
            auto_delete: false,
            backing_queue_status: {
              avg_ack_egress_rate: 0,
              avg_ack_ingress_rate: 0,
              avg_egress_rate: 0,
              avg_ingress_rate: 0,
              delta: ['delta', 'todo', 'todo', 'todo', 'todo'],
              len: 0,
              mode: 'default',
              next_deliver_seq_id: 0,
              next_seq_id: 0,
              num_pending_acks: 0,
              num_unconfirmed: 0,
              priority_lengths: {
                0: 0,
                1: 0,
                2: 0,
                3: 0,
                4: 0,
                5: 0,
                6: 0,
                7: 0,
                8: 0,
                9: 0
              },
              q1: 0,
              q2: 0,
              q3: 0,
              q4: 0,
              target_ram_count: 'infinity',
              version: 10
            },
            consumer_capacity: 1,
            consumer_utilisation: 1,
            consumers: 2,
            durable: false,
            effective_policy_definition: {},
            exclusive: false,
            exclusive_consumer_tag: null,
            garbage_collection: {
              fullsweep_after: 65535,
              max_heap_size: 0,
              min_bin_vheap_size: 46422,
              min_heap_size: 233,
              minor_gcs: 2200
            },
            head_message_timestamp: null,
            idle_since: '2024-02-08T10:31:53.731+01:00',
            memory: 39736,
            message_bytes: 0,
            message_bytes_paged_out: 0,
            message_bytes_persistent: 0,
            message_bytes_ram: 0,
            message_bytes_ready: 0,
            message_bytes_unacknowledged: 0,
            messages: 0,
            messages_details: {
              rate: 0
            },
            messages_paged_out: 0,
            messages_persistent: 0,
            messages_ram: 0,
            messages_ready: 0,
            messages_ready_details: {
              rate: 0
            },
            messages_ready_ram: 0,
            messages_unacknowledged: 0,
            messages_unacknowledged_details: {
              rate: 0
            },
            messages_unacknowledged_ram: 0,
            name: 'Request.v2.798de704-a607-45e3-8ba1-17a2b3ccd5dd',
            node: 'rabbit@localhost',
            operator_policy: null,
            policy: null,
            recoverable_slaves: null,
            reductions: 15499682,
            reductions_details: {
              rate: 0
            },
            single_active_consumer_tag: null,
            state: 'running',
            type: 'classic',
            vhost: '/'
          },
          {
            arguments: {
              'x-dead-letter-exchange': 'amq.match',
              'x-max-priority': 9
            },
            auto_delete: false,
            backing_queue_status: {
              avg_ack_egress_rate: 0,
              avg_ack_ingress_rate: 0,
              avg_egress_rate: 0,
              avg_ingress_rate: 0,
              delta: ['delta', 'todo', 'todo', 'todo', 'todo'],
              len: 0,
              mode: 'default',
              next_deliver_seq_id: 7,
              next_seq_id: 7,
              num_pending_acks: 0,
              num_unconfirmed: 0,
              priority_lengths: {
                0: 0,
                1: 0,
                2: 0,
                3: 0,
                4: 0,
                5: 0,
                6: 0,
                7: 0,
                8: 0,
                9: 0
              },
              q1: 0,
              q2: 0,
              q3: 0,
              q4: 0,
              target_ram_count: 'infinity',
              version: 10
            },
            consumer_capacity: 1,
            consumer_utilisation: 1,
            consumers: 2,
            durable: false,
            effective_policy_definition: {},
            exclusive: false,
            exclusive_consumer_tag: null,
            garbage_collection: {
              fullsweep_after: 65535,
              max_heap_size: 0,
              min_bin_vheap_size: 46422,
              min_heap_size: 233,
              minor_gcs: 2341
            },
            head_message_timestamp: null,
            idle_since: '2024-02-08T10:31:54.019+01:00',
            memory: 40232,
            message_bytes: 0,
            message_bytes_paged_out: 0,
            message_bytes_persistent: 0,
            message_bytes_ram: 0,
            message_bytes_ready: 0,
            message_bytes_unacknowledged: 0,
            message_stats: {
              ack: 7,
              ack_details: {
                rate: 0
              },
              deliver: 7,
              deliver_details: {
                rate: 0
              },
              deliver_get: 7,
              deliver_get_details: {
                rate: 0
              },
              deliver_no_ack: 0,
              deliver_no_ack_details: {
                rate: 0
              },
              get: 0,
              get_details: {
                rate: 0
              },
              get_empty: 0,
              get_empty_details: {
                rate: 0
              },
              get_no_ack: 0,
              get_no_ack_details: {
                rate: 0
              },
              publish: 7,
              publish_details: {
                rate: 0
              },
              redeliver: 0,
              redeliver_details: {
                rate: 0
              }
            },
            messages: 0,
            messages_details: {
              rate: 0
            },
            messages_paged_out: 0,
            messages_persistent: 0,
            messages_ram: 0,
            messages_ready: 0,
            messages_ready_details: {
              rate: 0
            },
            messages_ready_ram: 0,
            messages_unacknowledged: 0,
            messages_unacknowledged_details: {
              rate: 0
            },
            messages_unacknowledged_ram: 0,
            name: 'Request.v2.9d1c204c-97a3-4c4c-a61a-4cd361d0085d',
            node: 'rabbit@localhost',
            operator_policy: null,
            policy: null,
            recoverable_slaves: null,
            reductions: 16033280,
            reductions_details: {
              rate: 0
            },
            single_active_consumer_tag: null,
            state: 'running',
            type: 'classic',
            vhost: '/'
          },
          {
            arguments: {
              'x-dead-letter-exchange': 'amq.match',
              'x-max-priority': 9
            },
            auto_delete: false,
            backing_queue_status: {
              avg_ack_egress_rate: 0,
              avg_ack_ingress_rate: 0,
              avg_egress_rate: 0,
              avg_ingress_rate: 0,
              delta: ['delta', 'todo', 'todo', 'todo', 'todo'],
              len: 0,
              mode: 'default',
              next_deliver_seq_id: 3,
              next_seq_id: 3,
              num_pending_acks: 0,
              num_unconfirmed: 0,
              priority_lengths: {
                0: 0,
                1: 0,
                2: 0,
                3: 0,
                4: 0,
                5: 0,
                6: 0,
                7: 0,
                8: 0,
                9: 0
              },
              q1: 0,
              q2: 0,
              q3: 0,
              q4: 0,
              target_ram_count: 'infinity',
              version: 10
            },
            consumer_capacity: 1,
            consumer_utilisation: 1,
            consumers: 2,
            durable: false,
            effective_policy_definition: {},
            exclusive: false,
            exclusive_consumer_tag: null,
            garbage_collection: {
              fullsweep_after: 65535,
              max_heap_size: 0,
              min_bin_vheap_size: 46422,
              min_heap_size: 233,
              minor_gcs: 2316
            },
            head_message_timestamp: null,
            idle_since: '2024-02-08T10:31:54.505+01:00',
            memory: 40008,
            message_bytes: 0,
            message_bytes_paged_out: 0,
            message_bytes_persistent: 0,
            message_bytes_ram: 0,
            message_bytes_ready: 0,
            message_bytes_unacknowledged: 0,
            message_stats: {
              ack: 3,
              ack_details: {
                rate: 0
              },
              deliver: 3,
              deliver_details: {
                rate: 0
              },
              deliver_get: 3,
              deliver_get_details: {
                rate: 0
              },
              deliver_no_ack: 0,
              deliver_no_ack_details: {
                rate: 0
              },
              get: 0,
              get_details: {
                rate: 0
              },
              get_empty: 0,
              get_empty_details: {
                rate: 0
              },
              get_no_ack: 0,
              get_no_ack_details: {
                rate: 0
              },
              publish: 3,
              publish_details: {
                rate: 0
              },
              redeliver: 0,
              redeliver_details: {
                rate: 0
              }
            },
            messages: 0,
            messages_details: {
              rate: 0
            },
            messages_paged_out: 0,
            messages_persistent: 0,
            messages_ram: 0,
            messages_ready: 0,
            messages_ready_details: {
              rate: 0
            },
            messages_ready_ram: 0,
            messages_unacknowledged: 0,
            messages_unacknowledged_details: {
              rate: 0
            },
            messages_unacknowledged_ram: 0,
            name: 'Request.v2.a93bbfc2-9886-4bfc-9b78-d2eb6e164b97',
            node: 'rabbit@localhost',
            operator_policy: null,
            policy: null,
            recoverable_slaves: null,
            reductions: 15976082,
            reductions_details: {
              rate: 0
            },
            single_active_consumer_tag: null,
            state: 'running',
            type: 'classic',
            vhost: '/'
          },
          {
            arguments: {
              'x-dead-letter-exchange': 'amq.match',
              'x-max-priority': 9
            },
            auto_delete: false,
            backing_queue_status: {
              avg_ack_egress_rate: 0,
              avg_ack_ingress_rate: 0,
              avg_egress_rate: 0,
              avg_ingress_rate: 0,
              delta: ['delta', 'todo', 'todo', 'todo', 'todo'],
              len: 0,
              mode: 'default',
              next_deliver_seq_id: 20,
              next_seq_id: 20,
              num_pending_acks: 0,
              num_unconfirmed: 0,
              priority_lengths: {
                0: 0,
                1: 0,
                2: 0,
                3: 0,
                4: 0,
                5: 0,
                6: 0,
                7: 0,
                8: 0,
                9: 0
              },
              q1: 0,
              q2: 0,
              q3: 0,
              q4: 0,
              target_ram_count: 'infinity',
              version: 10
            },
            consumer_capacity: 1,
            consumer_utilisation: 1,
            consumers: 2,
            durable: false,
            effective_policy_definition: {},
            exclusive: false,
            exclusive_consumer_tag: null,
            garbage_collection: {
              fullsweep_after: 65535,
              max_heap_size: 0,
              min_bin_vheap_size: 46422,
              min_heap_size: 233,
              minor_gcs: 2327
            },
            head_message_timestamp: null,
            idle_since: '2024-02-08T10:31:54.216+01:00',
            memory: 40200,
            message_bytes: 0,
            message_bytes_paged_out: 0,
            message_bytes_persistent: 0,
            message_bytes_ram: 0,
            message_bytes_ready: 0,
            message_bytes_unacknowledged: 0,
            message_stats: {
              ack: 20,
              ack_details: {
                rate: 0
              },
              deliver: 20,
              deliver_details: {
                rate: 0
              },
              deliver_get: 20,
              deliver_get_details: {
                rate: 0
              },
              deliver_no_ack: 0,
              deliver_no_ack_details: {
                rate: 0
              },
              get: 0,
              get_details: {
                rate: 0
              },
              get_empty: 0,
              get_empty_details: {
                rate: 0
              },
              get_no_ack: 0,
              get_no_ack_details: {
                rate: 0
              },
              publish: 20,
              publish_details: {
                rate: 0
              },
              redeliver: 0,
              redeliver_details: {
                rate: 0
              }
            },
            messages: 0,
            messages_details: {
              rate: 0
            },
            messages_paged_out: 0,
            messages_persistent: 0,
            messages_ram: 0,
            messages_ready: 0,
            messages_ready_details: {
              rate: 0
            },
            messages_ready_ram: 0,
            messages_unacknowledged: 0,
            messages_unacknowledged_details: {
              rate: 0
            },
            messages_unacknowledged_ram: 0,
            name: 'Request.v2.b0953f73-fd7d-4b70-a656-2dd944437ef0',
            node: 'rabbit@localhost',
            operator_policy: null,
            policy: null,
            recoverable_slaves: null,
            reductions: 16086261,
            reductions_details: {
              rate: 0
            },
            single_active_consumer_tag: null,
            state: 'running',
            type: 'classic',
            vhost: '/'
          },
          {
            arguments: {
              'x-dead-letter-exchange': 'amq.match',
              'x-max-priority': 9
            },
            auto_delete: false,
            backing_queue_status: {
              avg_ack_egress_rate: 0,
              avg_ack_ingress_rate: 0,
              avg_egress_rate: 0,
              avg_ingress_rate: 0,
              delta: ['delta', 'todo', 'todo', 'todo', 'todo'],
              len: 0,
              mode: 'default',
              next_deliver_seq_id: 1087,
              next_seq_id: 1087,
              num_pending_acks: 0,
              num_unconfirmed: 0,
              priority_lengths: {
                0: 0,
                1: 0,
                2: 0,
                3: 0,
                4: 0,
                5: 0,
                6: 0,
                7: 0,
                8: 0,
                9: 0
              },
              q1: 0,
              q2: 0,
              q3: 0,
              q4: 0,
              target_ram_count: 'infinity',
              version: 10
            },
            consumer_capacity: 1,
            consumer_utilisation: 1,
            consumers: 2,
            durable: false,
            effective_policy_definition: {},
            exclusive: false,
            exclusive_consumer_tag: null,
            garbage_collection: {
              fullsweep_after: 65535,
              max_heap_size: 0,
              min_bin_vheap_size: 46422,
              min_heap_size: 233,
              minor_gcs: 3840
            },
            head_message_timestamp: null,
            idle_since: '2024-02-08T10:31:54.071+01:00',
            memory: 40224,
            message_bytes: 0,
            message_bytes_paged_out: 0,
            message_bytes_persistent: 0,
            message_bytes_ram: 0,
            message_bytes_ready: 0,
            message_bytes_unacknowledged: 0,
            message_stats: {
              ack: 1087,
              ack_details: {
                rate: 0
              },
              deliver: 1087,
              deliver_details: {
                rate: 0
              },
              deliver_get: 1087,
              deliver_get_details: {
                rate: 0
              },
              deliver_no_ack: 0,
              deliver_no_ack_details: {
                rate: 0
              },
              get: 0,
              get_details: {
                rate: 0
              },
              get_empty: 0,
              get_empty_details: {
                rate: 0
              },
              get_no_ack: 0,
              get_no_ack_details: {
                rate: 0
              },
              publish: 1087,
              publish_details: {
                rate: 0
              },
              redeliver: 0,
              redeliver_details: {
                rate: 0
              }
            },
            messages: 0,
            messages_details: {
              rate: 0
            },
            messages_paged_out: 0,
            messages_persistent: 0,
            messages_ram: 0,
            messages_ready: 0,
            messages_ready_details: {
              rate: 0
            },
            messages_ready_ram: 0,
            messages_unacknowledged: 0,
            messages_unacknowledged_details: {
              rate: 0
            },
            messages_unacknowledged_ram: 0,
            name: 'Request.v2.b31eae0b-1db1-433b-a34f-f7ac8a3c8643',
            node: 'rabbit@localhost',
            operator_policy: null,
            policy: null,
            recoverable_slaves: null,
            reductions: 20032413,
            reductions_details: {
              rate: 0
            },
            single_active_consumer_tag: null,
            state: 'running',
            type: 'classic',
            vhost: '/'
          },
          {
            arguments: {
              'x-dead-letter-exchange': 'amq.match',
              'x-max-priority': 9
            },
            auto_delete: false,
            backing_queue_status: {
              avg_ack_egress_rate: 0,
              avg_ack_ingress_rate: 0,
              avg_egress_rate: 0,
              avg_ingress_rate: 0,
              delta: ['delta', 'todo', 'todo', 'todo', 'todo'],
              len: 0,
              mode: 'default',
              next_deliver_seq_id: 930,
              next_seq_id: 930,
              num_pending_acks: 0,
              num_unconfirmed: 0,
              priority_lengths: {
                0: 0,
                1: 0,
                2: 0,
                3: 0,
                4: 0,
                5: 0,
                6: 0,
                7: 0,
                8: 0,
                9: 0
              },
              q1: 0,
              q2: 0,
              q3: 0,
              q4: 0,
              target_ram_count: 'infinity',
              version: 10
            },
            consumer_capacity: 1,
            consumer_utilisation: 1,
            consumers: 1,
            durable: false,
            effective_policy_definition: {},
            exclusive: false,
            exclusive_consumer_tag: null,
            garbage_collection: {
              fullsweep_after: 65535,
              max_heap_size: 0,
              min_bin_vheap_size: 46422,
              min_heap_size: 233,
              minor_gcs: 3790
            },
            head_message_timestamp: null,
            idle_since: '2024-02-08T10:31:54.571+01:00',
            memory: 39616,
            message_bytes: 0,
            message_bytes_paged_out: 0,
            message_bytes_persistent: 0,
            message_bytes_ram: 0,
            message_bytes_ready: 0,
            message_bytes_unacknowledged: 0,
            message_stats: {
              ack: 930,
              ack_details: {
                rate: 0
              },
              deliver: 930,
              deliver_details: {
                rate: 0
              },
              deliver_get: 930,
              deliver_get_details: {
                rate: 0
              },
              deliver_no_ack: 0,
              deliver_no_ack_details: {
                rate: 0
              },
              get: 0,
              get_details: {
                rate: 0
              },
              get_empty: 0,
              get_empty_details: {
                rate: 0
              },
              get_no_ack: 0,
              get_no_ack_details: {
                rate: 0
              },
              publish: 930,
              publish_details: {
                rate: 0
              },
              redeliver: 0,
              redeliver_details: {
                rate: 0
              }
            },
            messages: 0,
            messages_details: {
              rate: 0
            },
            messages_paged_out: 0,
            messages_persistent: 0,
            messages_ram: 0,
            messages_ready: 0,
            messages_ready_details: {
              rate: 0
            },
            messages_ready_ram: 0,
            messages_unacknowledged: 0,
            messages_unacknowledged_details: {
              rate: 0
            },
            messages_unacknowledged_ram: 0,
            name: 'Request.v2.b866d27f-4f16-44b4-b53d-8723ffd5daa8',
            node: 'rabbit@localhost',
            operator_policy: null,
            policy: null,
            recoverable_slaves: null,
            reductions: 33836836,
            reductions_details: {
              rate: 0
            },
            single_active_consumer_tag: null,
            state: 'running',
            type: 'classic',
            vhost: '/'
          },
          {
            arguments: {},
            auto_delete: false,
            backing_queue_status: {
              avg_ack_egress_rate: 0,
              avg_ack_ingress_rate: 0,
              avg_egress_rate: 0,
              avg_ingress_rate: 0,
              delta: ['delta', 'undefined', 0, 0, 'undefined'],
              len: 0,
              mode: 'default',
              next_deliver_seq_id: 0,
              next_seq_id: 0,
              num_pending_acks: 0,
              num_unconfirmed: 0,
              q1: 0,
              q2: 0,
              q3: 0,
              q4: 0,
              target_ram_count: 'infinity',
              version: 1
            },
            consumer_capacity: 1,
            consumer_utilisation: 1,
            consumers: 4,
            durable: true,
            effective_policy_definition: {},
            exclusive: false,
            exclusive_consumer_tag: null,
            garbage_collection: {
              fullsweep_after: 65535,
              max_heap_size: 0,
              min_bin_vheap_size: 46422,
              min_heap_size: 233,
              minor_gcs: 8450
            },
            head_message_timestamp: null,
            idle_since: '2024-02-08T10:31:54.306+01:00',
            memory: 9376,
            message_bytes: 0,
            message_bytes_paged_out: 0,
            message_bytes_persistent: 0,
            message_bytes_ram: 0,
            message_bytes_ready: 0,
            message_bytes_unacknowledged: 0,
            messages: 0,
            messages_details: {
              rate: 0
            },
            messages_paged_out: 0,
            messages_persistent: 0,
            messages_ram: 0,
            messages_ready: 0,
            messages_ready_details: {
              rate: 0
            },
            messages_ready_ram: 0,
            messages_unacknowledged: 0,
            messages_unacknowledged_details: {
              rate: 0
            },
            messages_unacknowledged_ram: 0,
            name: 'SesFileTranslationConsumer.CheckReachedQuota',
            node: 'rabbit@localhost',
            operator_policy: null,
            policy: null,
            recoverable_slaves: null,
            reductions: 5553430,
            reductions_details: {
              rate: 0
            },
            single_active_consumer_tag: null,
            state: 'running',
            type: 'classic',
            vhost: '/'
          },
          {
            arguments: {},
            auto_delete: false,
            backing_queue_status: {
              avg_ack_egress_rate: 0,
              avg_ack_ingress_rate: 0,
              avg_egress_rate: 0,
              avg_ingress_rate: 0,
              delta: ['delta', 'undefined', 0, 0, 'undefined'],
              len: 0,
              mode: 'default',
              next_deliver_seq_id: 0,
              next_seq_id: 0,
              num_pending_acks: 0,
              num_unconfirmed: 0,
              q1: 0,
              q2: 0,
              q3: 0,
              q4: 0,
              target_ram_count: 'infinity',
              version: 1
            },
            consumer_capacity: 1,
            consumer_utilisation: 1,
            consumers: 4,
            durable: true,
            effective_policy_definition: {},
            exclusive: false,
            exclusive_consumer_tag: null,
            garbage_collection: {
              fullsweep_after: 65535,
              max_heap_size: 0,
              min_bin_vheap_size: 46422,
              min_heap_size: 233,
              minor_gcs: 8448
            },
            head_message_timestamp: null,
            idle_since: '2024-02-08T10:31:53.965+01:00',
            memory: 9384,
            message_bytes: 0,
            message_bytes_paged_out: 0,
            message_bytes_persistent: 0,
            message_bytes_ram: 0,
            message_bytes_ready: 0,
            message_bytes_unacknowledged: 0,
            messages: 0,
            messages_details: {
              rate: 0
            },
            messages_paged_out: 0,
            messages_persistent: 0,
            messages_ram: 0,
            messages_ready: 0,
            messages_ready_details: {
              rate: 0
            },
            messages_ready_ram: 0,
            messages_unacknowledged: 0,
            messages_unacknowledged_details: {
              rate: 0
            },
            messages_unacknowledged_ram: 0,
            name: 'SesFileTranslationConsumer.CheckReachedQuota.Error',
            node: 'rabbit@localhost',
            operator_policy: null,
            policy: null,
            recoverable_slaves: null,
            reductions: 5558788,
            reductions_details: {
              rate: 0
            },
            single_active_consumer_tag: null,
            state: 'running',
            type: 'classic',
            vhost: '/'
          },
          {
            arguments: {},
            auto_delete: false,
            backing_queue_status: {
              avg_ack_egress_rate: 0,
              avg_ack_ingress_rate: 0,
              avg_egress_rate: 0,
              avg_ingress_rate: 0,
              delta: ['delta', 'undefined', 0, 0, 'undefined'],
              len: 0,
              mode: 'default',
              next_deliver_seq_id: 0,
              next_seq_id: 0,
              num_pending_acks: 0,
              num_unconfirmed: 0,
              q1: 0,
              q2: 0,
              q3: 0,
              q4: 0,
              target_ram_count: 'infinity',
              version: 1
            },
            consumer_capacity: 1,
            consumer_utilisation: 1,
            consumers: 4,
            durable: true,
            effective_policy_definition: {},
            exclusive: false,
            exclusive_consumer_tag: null,
            garbage_collection: {
              fullsweep_after: 65535,
              max_heap_size: 0,
              min_bin_vheap_size: 46422,
              min_heap_size: 233,
              minor_gcs: 8452
            },
            head_message_timestamp: null,
            idle_since: '2024-02-08T10:31:53.913+01:00',
            memory: 9376,
            message_bytes: 0,
            message_bytes_paged_out: 0,
            message_bytes_persistent: 0,
            message_bytes_ram: 0,
            message_bytes_ready: 0,
            message_bytes_unacknowledged: 0,
            messages: 0,
            messages_details: {
              rate: 0
            },
            messages_paged_out: 0,
            messages_persistent: 0,
            messages_ram: 0,
            messages_ready: 0,
            messages_ready_details: {
              rate: 0
            },
            messages_ready_ram: 0,
            messages_unacknowledged: 0,
            messages_unacknowledged_details: {
              rate: 0
            },
            messages_unacknowledged_ram: 0,
            name: 'SesFileTranslationConsumer.ExtractArchive',
            node: 'rabbit@localhost',
            operator_policy: null,
            policy: null,
            recoverable_slaves: null,
            reductions: 5553468,
            reductions_details: {
              rate: 0
            },
            single_active_consumer_tag: null,
            state: 'running',
            type: 'classic',
            vhost: '/'
          },
          {
            arguments: {},
            auto_delete: false,
            backing_queue_status: {
              avg_ack_egress_rate: 0,
              avg_ack_ingress_rate: 0,
              avg_egress_rate: 0,
              avg_ingress_rate: 0,
              delta: ['delta', 'undefined', 0, 0, 'undefined'],
              len: 0,
              mode: 'default',
              next_deliver_seq_id: 0,
              next_seq_id: 0,
              num_pending_acks: 0,
              num_unconfirmed: 0,
              q1: 0,
              q2: 0,
              q3: 0,
              q4: 0,
              target_ram_count: 'infinity',
              version: 1
            },
            consumer_capacity: 1,
            consumer_utilisation: 1,
            consumers: 4,
            durable: true,
            effective_policy_definition: {},
            exclusive: false,
            exclusive_consumer_tag: null,
            garbage_collection: {
              fullsweep_after: 65535,
              max_heap_size: 0,
              min_bin_vheap_size: 46422,
              min_heap_size: 233,
              minor_gcs: 8446
            },
            head_message_timestamp: null,
            idle_since: '2024-02-08T10:31:54.122+01:00',
            memory: 9376,
            message_bytes: 0,
            message_bytes_paged_out: 0,
            message_bytes_persistent: 0,
            message_bytes_ram: 0,
            message_bytes_ready: 0,
            message_bytes_unacknowledged: 0,
            messages: 0,
            messages_details: {
              rate: 0
            },
            messages_paged_out: 0,
            messages_persistent: 0,
            messages_ram: 0,
            messages_ready: 0,
            messages_ready_details: {
              rate: 0
            },
            messages_ready_ram: 0,
            messages_unacknowledged: 0,
            messages_unacknowledged_details: {
              rate: 0
            },
            messages_unacknowledged_ram: 0,
            name: 'SesFileTranslationConsumer.ExtractArchive.Error',
            node: 'rabbit@localhost',
            operator_policy: null,
            policy: null,
            recoverable_slaves: null,
            reductions: 5553299,
            reductions_details: {
              rate: 0
            },
            single_active_consumer_tag: null,
            state: 'running',
            type: 'classic',
            vhost: '/'
          },
          {
            arguments: {},
            auto_delete: false,
            backing_queue_status: {
              avg_ack_egress_rate: 0,
              avg_ack_ingress_rate: 0,
              avg_egress_rate: 0,
              avg_ingress_rate: 0,
              delta: ['delta', 'undefined', 0, 0, 'undefined'],
              len: 0,
              mode: 'default',
              next_deliver_seq_id: 0,
              next_seq_id: 0,
              num_pending_acks: 0,
              num_unconfirmed: 0,
              q1: 0,
              q2: 0,
              q3: 0,
              q4: 0,
              target_ram_count: 'infinity',
              version: 1
            },
            consumer_capacity: 1,
            consumer_utilisation: 1,
            consumers: 4,
            durable: true,
            effective_policy_definition: {},
            exclusive: false,
            exclusive_consumer_tag: null,
            garbage_collection: {
              fullsweep_after: 65535,
              max_heap_size: 0,
              min_bin_vheap_size: 46422,
              min_heap_size: 233,
              minor_gcs: 8461
            },
            head_message_timestamp: null,
            idle_since: '2024-02-08T10:31:53.881+01:00',
            memory: 9376,
            message_bytes: 0,
            message_bytes_paged_out: 0,
            message_bytes_persistent: 0,
            message_bytes_ram: 0,
            message_bytes_ready: 0,
            message_bytes_unacknowledged: 0,
            messages: 0,
            messages_details: {
              rate: 0
            },
            messages_paged_out: 0,
            messages_persistent: 0,
            messages_ram: 0,
            messages_ready: 0,
            messages_ready_details: {
              rate: 0
            },
            messages_ready_ram: 0,
            messages_unacknowledged: 0,
            messages_unacknowledged_details: {
              rate: 0
            },
            messages_unacknowledged_ram: 0,
            name: 'SesFileTranslationConsumer.FileConsumption',
            node: 'rabbit@localhost',
            operator_policy: null,
            policy: null,
            recoverable_slaves: null,
            reductions: 5561617,
            reductions_details: {
              rate: 0
            },
            single_active_consumer_tag: null,
            state: 'running',
            type: 'classic',
            vhost: '/'
          },
          {
            arguments: {},
            auto_delete: false,
            backing_queue_status: {
              avg_ack_egress_rate: 0,
              avg_ack_ingress_rate: 0,
              avg_egress_rate: 0,
              avg_ingress_rate: 0,
              delta: ['delta', 'undefined', 0, 0, 'undefined'],
              len: 0,
              mode: 'default',
              next_deliver_seq_id: 0,
              next_seq_id: 0,
              num_pending_acks: 0,
              num_unconfirmed: 0,
              q1: 0,
              q2: 0,
              q3: 0,
              q4: 0,
              target_ram_count: 'infinity',
              version: 1
            },
            consumer_capacity: 1,
            consumer_utilisation: 1,
            consumers: 4,
            durable: true,
            effective_policy_definition: {},
            exclusive: false,
            exclusive_consumer_tag: null,
            garbage_collection: {
              fullsweep_after: 65535,
              max_heap_size: 0,
              min_bin_vheap_size: 46422,
              min_heap_size: 233,
              minor_gcs: 8446
            },
            head_message_timestamp: null,
            idle_since: '2024-02-08T10:31:54.359+01:00',
            memory: 9360,
            message_bytes: 0,
            message_bytes_paged_out: 0,
            message_bytes_persistent: 0,
            message_bytes_ram: 0,
            message_bytes_ready: 0,
            message_bytes_unacknowledged: 0,
            messages: 0,
            messages_details: {
              rate: 0
            },
            messages_paged_out: 0,
            messages_persistent: 0,
            messages_ram: 0,
            messages_ready: 0,
            messages_ready_details: {
              rate: 0
            },
            messages_ready_ram: 0,
            messages_unacknowledged: 0,
            messages_unacknowledged_details: {
              rate: 0
            },
            messages_unacknowledged_ram: 0,
            name: 'SesFileTranslationConsumer.FileConsumption.Error',
            node: 'rabbit@localhost',
            operator_policy: null,
            policy: null,
            recoverable_slaves: null,
            reductions: 5553135,
            reductions_details: {
              rate: 0
            },
            single_active_consumer_tag: null,
            state: 'running',
            type: 'classic',
            vhost: '/'
          },
          {
            arguments: {},
            auto_delete: false,
            backing_queue_status: {
              avg_ack_egress_rate: 0,
              avg_ack_ingress_rate: 0,
              avg_egress_rate: 0,
              avg_ingress_rate: 0,
              delta: ['delta', 'undefined', 0, 0, 'undefined'],
              len: 0,
              mode: 'default',
              next_deliver_seq_id: 0,
              next_seq_id: 0,
              num_pending_acks: 0,
              num_unconfirmed: 0,
              q1: 0,
              q2: 0,
              q3: 0,
              q4: 0,
              target_ram_count: 'infinity',
              version: 1
            },
            consumer_capacity: 1,
            consumer_utilisation: 1,
            consumers: 4,
            durable: true,
            effective_policy_definition: {},
            exclusive: false,
            exclusive_consumer_tag: null,
            garbage_collection: {
              fullsweep_after: 65535,
              max_heap_size: 0,
              min_bin_vheap_size: 46422,
              min_heap_size: 233,
              minor_gcs: 8449
            },
            head_message_timestamp: null,
            idle_since: '2024-02-08T10:31:54.116+01:00',
            memory: 9384,
            message_bytes: 0,
            message_bytes_paged_out: 0,
            message_bytes_persistent: 0,
            message_bytes_ram: 0,
            message_bytes_ready: 0,
            message_bytes_unacknowledged: 0,
            messages: 0,
            messages_details: {
              rate: 0
            },
            messages_paged_out: 0,
            messages_persistent: 0,
            messages_ram: 0,
            messages_ready: 0,
            messages_ready_details: {
              rate: 0
            },
            messages_ready_ram: 0,
            messages_unacknowledged: 0,
            messages_unacknowledged_details: {
              rate: 0
            },
            messages_unacknowledged_ram: 0,
            name: 'SesFileTranslationConsumer.FileConsumptionNotifications',
            node: 'rabbit@localhost',
            operator_policy: null,
            policy: null,
            recoverable_slaves: null,
            reductions: 5558894,
            reductions_details: {
              rate: 0
            },
            single_active_consumer_tag: null,
            state: 'running',
            type: 'classic',
            vhost: '/'
          },
          {
            arguments: {},
            auto_delete: false,
            backing_queue_status: {
              avg_ack_egress_rate: 0,
              avg_ack_ingress_rate: 0,
              avg_egress_rate: 0,
              avg_ingress_rate: 0,
              delta: ['delta', 'undefined', 0, 0, 'undefined'],
              len: 0,
              mode: 'default',
              next_deliver_seq_id: 0,
              next_seq_id: 0,
              num_pending_acks: 0,
              num_unconfirmed: 0,
              q1: 0,
              q2: 0,
              q3: 0,
              q4: 0,
              target_ram_count: 'infinity',
              version: 1
            },
            consumer_capacity: 1,
            consumer_utilisation: 1,
            consumers: 4,
            durable: true,
            effective_policy_definition: {},
            exclusive: false,
            exclusive_consumer_tag: null,
            garbage_collection: {
              fullsweep_after: 65535,
              max_heap_size: 0,
              min_bin_vheap_size: 46422,
              min_heap_size: 233,
              minor_gcs: 8446
            },
            head_message_timestamp: null,
            idle_since: '2024-02-08T10:31:53.727+01:00',
            memory: 9392,
            message_bytes: 0,
            message_bytes_paged_out: 0,
            message_bytes_persistent: 0,
            message_bytes_ram: 0,
            message_bytes_ready: 0,
            message_bytes_unacknowledged: 0,
            messages: 0,
            messages_details: {
              rate: 0
            },
            messages_paged_out: 0,
            messages_persistent: 0,
            messages_ram: 0,
            messages_ready: 0,
            messages_ready_details: {
              rate: 0
            },
            messages_ready_ram: 0,
            messages_unacknowledged: 0,
            messages_unacknowledged_details: {
              rate: 0
            },
            messages_unacknowledged_ram: 0,
            name:
              'SesFileTranslationConsumer.FileConsumptionNotifications.Error',
            node: 'rabbit@localhost',
            operator_policy: null,
            policy: null,
            recoverable_slaves: null,
            reductions: 5558768,
            reductions_details: {
              rate: 0
            },
            single_active_consumer_tag: null,
            state: 'running',
            type: 'classic',
            vhost: '/'
          },
          {
            arguments: {},
            auto_delete: false,
            backing_queue_status: {
              avg_ack_egress_rate: 0,
              avg_ack_ingress_rate: 0,
              avg_egress_rate: 0,
              avg_ingress_rate: 0,
              delta: ['delta', 'undefined', 0, 0, 'undefined'],
              len: 0,
              mode: 'default',
              next_deliver_seq_id: 0,
              next_seq_id: 0,
              num_pending_acks: 0,
              num_unconfirmed: 0,
              q1: 0,
              q2: 0,
              q3: 0,
              q4: 0,
              target_ram_count: 'infinity',
              version: 1
            },
            consumer_capacity: 1,
            consumer_utilisation: 1,
            consumers: 4,
            durable: true,
            effective_policy_definition: {},
            exclusive: false,
            exclusive_consumer_tag: null,
            garbage_collection: {
              fullsweep_after: 65535,
              max_heap_size: 0,
              min_bin_vheap_size: 46422,
              min_heap_size: 233,
              minor_gcs: 8450
            },
            head_message_timestamp: null,
            idle_since: '2024-02-08T10:31:53.977+01:00',
            memory: 9376,
            message_bytes: 0,
            message_bytes_paged_out: 0,
            message_bytes_persistent: 0,
            message_bytes_ram: 0,
            message_bytes_ready: 0,
            message_bytes_unacknowledged: 0,
            messages: 0,
            messages_details: {
              rate: 0
            },
            messages_paged_out: 0,
            messages_persistent: 0,
            messages_ram: 0,
            messages_ready: 0,
            messages_ready_details: {
              rate: 0
            },
            messages_ready_ram: 0,
            messages_unacknowledged: 0,
            messages_unacknowledged_details: {
              rate: 0
            },
            messages_unacknowledged_ram: 0,
            name: 'SesFileTranslationConsumer.FileRoutingQueue',
            node: 'rabbit@localhost',
            operator_policy: null,
            policy: null,
            recoverable_slaves: null,
            reductions: 5553322,
            reductions_details: {
              rate: 0
            },
            single_active_consumer_tag: null,
            state: 'running',
            type: 'classic',
            vhost: '/'
          },
          {
            arguments: {},
            auto_delete: false,
            backing_queue_status: {
              avg_ack_egress_rate: 0,
              avg_ack_ingress_rate: 0,
              avg_egress_rate: 0,
              avg_ingress_rate: 0,
              delta: ['delta', 'undefined', 0, 0, 'undefined'],
              len: 0,
              mode: 'default',
              next_deliver_seq_id: 0,
              next_seq_id: 0,
              num_pending_acks: 0,
              num_unconfirmed: 0,
              q1: 0,
              q2: 0,
              q3: 0,
              q4: 0,
              target_ram_count: 'infinity',
              version: 1
            },
            consumer_capacity: 1,
            consumer_utilisation: 1,
            consumers: 4,
            durable: true,
            effective_policy_definition: {},
            exclusive: false,
            exclusive_consumer_tag: null,
            garbage_collection: {
              fullsweep_after: 65535,
              max_heap_size: 0,
              min_bin_vheap_size: 46422,
              min_heap_size: 233,
              minor_gcs: 8449
            },
            head_message_timestamp: null,
            idle_since: '2024-02-08T10:31:53.751+01:00',
            memory: 9384,
            message_bytes: 0,
            message_bytes_paged_out: 0,
            message_bytes_persistent: 0,
            message_bytes_ram: 0,
            message_bytes_ready: 0,
            message_bytes_unacknowledged: 0,
            messages: 0,
            messages_details: {
              rate: 0
            },
            messages_paged_out: 0,
            messages_persistent: 0,
            messages_ram: 0,
            messages_ready: 0,
            messages_ready_details: {
              rate: 0
            },
            messages_ready_ram: 0,
            messages_unacknowledged: 0,
            messages_unacknowledged_details: {
              rate: 0
            },
            messages_unacknowledged_ram: 0,
            name: 'SesFileTranslationConsumer.FileRoutingQueue.Error',
            node: 'rabbit@localhost',
            operator_policy: null,
            policy: null,
            recoverable_slaves: null,
            reductions: 5558695,
            reductions_details: {
              rate: 0
            },
            single_active_consumer_tag: null,
            state: 'running',
            type: 'classic',
            vhost: '/'
          },
          {
            arguments: {},
            auto_delete: false,
            backing_queue_status: {
              avg_ack_egress_rate: 0,
              avg_ack_ingress_rate: 0,
              avg_egress_rate: 0,
              avg_ingress_rate: 0,
              delta: ['delta', 'undefined', 0, 0, 'undefined'],
              len: 0,
              mode: 'default',
              next_deliver_seq_id: 0,
              next_seq_id: 0,
              num_pending_acks: 0,
              num_unconfirmed: 0,
              q1: 0,
              q2: 0,
              q3: 0,
              q4: 0,
              target_ram_count: 'infinity',
              version: 1
            },
            consumer_capacity: 1,
            consumer_utilisation: 1,
            consumers: 4,
            durable: true,
            effective_policy_definition: {},
            exclusive: false,
            exclusive_consumer_tag: null,
            garbage_collection: {
              fullsweep_after: 65535,
              max_heap_size: 0,
              min_bin_vheap_size: 46422,
              min_heap_size: 233,
              minor_gcs: 8447
            },
            head_message_timestamp: null,
            idle_since: '2024-02-08T10:31:54.481+01:00',
            memory: 9376,
            message_bytes: 0,
            message_bytes_paged_out: 0,
            message_bytes_persistent: 0,
            message_bytes_ram: 0,
            message_bytes_ready: 0,
            message_bytes_unacknowledged: 0,
            messages: 0,
            messages_details: {
              rate: 0
            },
            messages_paged_out: 0,
            messages_persistent: 0,
            messages_ram: 0,
            messages_ready: 0,
            messages_ready_details: {
              rate: 0
            },
            messages_ready_ram: 0,
            messages_unacknowledged: 0,
            messages_unacknowledged_details: {
              rate: 0
            },
            messages_unacknowledged_ram: 0,
            name: 'SesFileTranslationConsumer.FilterExporting',
            node: 'rabbit@localhost',
            operator_policy: null,
            policy: null,
            recoverable_slaves: null,
            reductions: 5553297,
            reductions_details: {
              rate: 0
            },
            single_active_consumer_tag: null,
            state: 'running',
            type: 'classic',
            vhost: '/'
          },
          {
            arguments: {},
            auto_delete: false,
            backing_queue_status: {
              avg_ack_egress_rate: 0,
              avg_ack_ingress_rate: 0,
              avg_egress_rate: 0,
              avg_ingress_rate: 0,
              delta: ['delta', 'undefined', 0, 0, 'undefined'],
              len: 0,
              mode: 'default',
              next_deliver_seq_id: 0,
              next_seq_id: 0,
              num_pending_acks: 0,
              num_unconfirmed: 0,
              q1: 0,
              q2: 0,
              q3: 0,
              q4: 0,
              target_ram_count: 'infinity',
              version: 1
            },
            consumer_capacity: 1,
            consumer_utilisation: 1,
            consumers: 4,
            durable: true,
            effective_policy_definition: {},
            exclusive: false,
            exclusive_consumer_tag: null,
            garbage_collection: {
              fullsweep_after: 65535,
              max_heap_size: 0,
              min_bin_vheap_size: 46422,
              min_heap_size: 233,
              minor_gcs: 8447
            },
            head_message_timestamp: null,
            idle_since: '2024-02-08T10:31:54.233+01:00',
            memory: 9376,
            message_bytes: 0,
            message_bytes_paged_out: 0,
            message_bytes_persistent: 0,
            message_bytes_ram: 0,
            message_bytes_ready: 0,
            message_bytes_unacknowledged: 0,
            messages: 0,
            messages_details: {
              rate: 0
            },
            messages_paged_out: 0,
            messages_persistent: 0,
            messages_ram: 0,
            messages_ready: 0,
            messages_ready_details: {
              rate: 0
            },
            messages_ready_ram: 0,
            messages_unacknowledged: 0,
            messages_unacknowledged_details: {
              rate: 0
            },
            messages_unacknowledged_ram: 0,
            name: 'SesFileTranslationConsumer.FilterExporting.Error',
            node: 'rabbit@localhost',
            operator_policy: null,
            policy: null,
            recoverable_slaves: null,
            reductions: 5553331,
            reductions_details: {
              rate: 0
            },
            single_active_consumer_tag: null,
            state: 'running',
            type: 'classic',
            vhost: '/'
          },
          {
            arguments: {},
            auto_delete: false,
            backing_queue_status: {
              avg_ack_egress_rate: 0,
              avg_ack_ingress_rate: 0,
              avg_egress_rate: 0,
              avg_ingress_rate: 0,
              delta: ['delta', 'undefined', 0, 0, 'undefined'],
              len: 0,
              mode: 'default',
              next_deliver_seq_id: 0,
              next_seq_id: 0,
              num_pending_acks: 0,
              num_unconfirmed: 0,
              q1: 0,
              q2: 0,
              q3: 0,
              q4: 0,
              target_ram_count: 'infinity',
              version: 1
            },
            consumer_capacity: 1,
            consumer_utilisation: 1,
            consumers: 4,
            durable: true,
            effective_policy_definition: {},
            exclusive: false,
            exclusive_consumer_tag: null,
            garbage_collection: {
              fullsweep_after: 65535,
              max_heap_size: 0,
              min_bin_vheap_size: 46422,
              min_heap_size: 233,
              minor_gcs: 8452
            },
            head_message_timestamp: null,
            idle_since: '2024-02-08T10:31:53.854+01:00',
            memory: 9368,
            message_bytes: 0,
            message_bytes_paged_out: 0,
            message_bytes_persistent: 0,
            message_bytes_ram: 0,
            message_bytes_ready: 0,
            message_bytes_unacknowledged: 0,
            messages: 0,
            messages_details: {
              rate: 0
            },
            messages_paged_out: 0,
            messages_persistent: 0,
            messages_ram: 0,
            messages_ready: 0,
            messages_ready_details: {
              rate: 0
            },
            messages_ready_ram: 0,
            messages_unacknowledged: 0,
            messages_unacknowledged_details: {
              rate: 0
            },
            messages_unacknowledged_ram: 0,
            name: 'SesFileTranslationConsumer.Notification',
            node: 'rabbit@localhost',
            operator_policy: null,
            policy: null,
            recoverable_slaves: null,
            reductions: 5553388,
            reductions_details: {
              rate: 0
            },
            single_active_consumer_tag: null,
            state: 'running',
            type: 'classic',
            vhost: '/'
          },
          {
            arguments: {},
            auto_delete: false,
            backing_queue_status: {
              avg_ack_egress_rate: 0,
              avg_ack_ingress_rate: 0,
              avg_egress_rate: 0,
              avg_ingress_rate: 0,
              delta: ['delta', 'undefined', 0, 0, 'undefined'],
              len: 0,
              mode: 'default',
              next_deliver_seq_id: 0,
              next_seq_id: 0,
              num_pending_acks: 0,
              num_unconfirmed: 0,
              q1: 0,
              q2: 0,
              q3: 0,
              q4: 0,
              target_ram_count: 'infinity',
              version: 1
            },
            consumer_capacity: 1,
            consumer_utilisation: 1,
            consumers: 4,
            durable: true,
            effective_policy_definition: {},
            exclusive: false,
            exclusive_consumer_tag: null,
            garbage_collection: {
              fullsweep_after: 65535,
              max_heap_size: 0,
              min_bin_vheap_size: 46422,
              min_heap_size: 233,
              minor_gcs: 8447
            },
            head_message_timestamp: null,
            idle_since: '2024-02-08T10:31:53.783+01:00',
            memory: 9376,
            message_bytes: 0,
            message_bytes_paged_out: 0,
            message_bytes_persistent: 0,
            message_bytes_ram: 0,
            message_bytes_ready: 0,
            message_bytes_unacknowledged: 0,
            messages: 0,
            messages_details: {
              rate: 0
            },
            messages_paged_out: 0,
            messages_persistent: 0,
            messages_ram: 0,
            messages_ready: 0,
            messages_ready_details: {
              rate: 0
            },
            messages_ready_ram: 0,
            messages_unacknowledged: 0,
            messages_unacknowledged_details: {
              rate: 0
            },
            messages_unacknowledged_ram: 0,
            name: 'SesFileTranslationConsumer.Notification.Error',
            node: 'rabbit@localhost',
            operator_policy: null,
            policy: null,
            recoverable_slaves: null,
            reductions: 5553385,
            reductions_details: {
              rate: 0
            },
            single_active_consumer_tag: null,
            state: 'running',
            type: 'classic',
            vhost: '/'
          },
          {
            arguments: {},
            auto_delete: false,
            backing_queue_status: {
              avg_ack_egress_rate: 0,
              avg_ack_ingress_rate: 0,
              avg_egress_rate: 0,
              avg_ingress_rate: 0,
              delta: ['delta', 'undefined', 0, 0, 'undefined'],
              len: 0,
              mode: 'default',
              next_deliver_seq_id: 0,
              next_seq_id: 0,
              num_pending_acks: 0,
              num_unconfirmed: 0,
              q1: 0,
              q2: 0,
              q3: 0,
              q4: 0,
              target_ram_count: 'infinity',
              version: 1
            },
            consumer_capacity: 1,
            consumer_utilisation: 1,
            consumers: 4,
            durable: true,
            effective_policy_definition: {},
            exclusive: false,
            exclusive_consumer_tag: null,
            garbage_collection: {
              fullsweep_after: 65535,
              max_heap_size: 0,
              min_bin_vheap_size: 46422,
              min_heap_size: 233,
              minor_gcs: 8451
            },
            head_message_timestamp: null,
            idle_since: '2024-02-08T10:31:54.161+01:00',
            memory: 9360,
            message_bytes: 0,
            message_bytes_paged_out: 0,
            message_bytes_persistent: 0,
            message_bytes_ram: 0,
            message_bytes_ready: 0,
            message_bytes_unacknowledged: 0,
            messages: 0,
            messages_details: {
              rate: 0
            },
            messages_paged_out: 0,
            messages_persistent: 0,
            messages_ram: 0,
            messages_ready: 0,
            messages_ready_details: {
              rate: 0
            },
            messages_ready_ram: 0,
            messages_unacknowledged: 0,
            messages_unacknowledged_details: {
              rate: 0
            },
            messages_unacknowledged_ram: 0,
            name: 'SesFileTranslationConsumer.Ocr',
            node: 'rabbit@localhost',
            operator_policy: null,
            policy: null,
            recoverable_slaves: null,
            reductions: 5553207,
            reductions_details: {
              rate: 0
            },
            single_active_consumer_tag: null,
            state: 'running',
            type: 'classic',
            vhost: '/'
          },
          {
            arguments: {},
            auto_delete: false,
            backing_queue_status: {
              avg_ack_egress_rate: 0,
              avg_ack_ingress_rate: 0,
              avg_egress_rate: 0,
              avg_ingress_rate: 0,
              delta: ['delta', 'undefined', 0, 0, 'undefined'],
              len: 0,
              mode: 'default',
              next_deliver_seq_id: 0,
              next_seq_id: 0,
              num_pending_acks: 0,
              num_unconfirmed: 0,
              q1: 0,
              q2: 0,
              q3: 0,
              q4: 0,
              target_ram_count: 'infinity',
              version: 1
            },
            consumer_capacity: 1,
            consumer_utilisation: 1,
            consumers: 4,
            durable: true,
            effective_policy_definition: {},
            exclusive: false,
            exclusive_consumer_tag: null,
            garbage_collection: {
              fullsweep_after: 65535,
              max_heap_size: 0,
              min_bin_vheap_size: 46422,
              min_heap_size: 233,
              minor_gcs: 8451
            },
            head_message_timestamp: null,
            idle_since: '2024-02-08T10:31:53.961+01:00',
            memory: 9368,
            message_bytes: 0,
            message_bytes_paged_out: 0,
            message_bytes_persistent: 0,
            message_bytes_ram: 0,
            message_bytes_ready: 0,
            message_bytes_unacknowledged: 0,
            messages: 0,
            messages_details: {
              rate: 0
            },
            messages_paged_out: 0,
            messages_persistent: 0,
            messages_ram: 0,
            messages_ready: 0,
            messages_ready_details: {
              rate: 0
            },
            messages_ready_ram: 0,
            messages_unacknowledged: 0,
            messages_unacknowledged_details: {
              rate: 0
            },
            messages_unacknowledged_ram: 0,
            name: 'SesFileTranslationConsumer.Ocr.Error',
            node: 'rabbit@localhost',
            operator_policy: null,
            policy: null,
            recoverable_slaves: null,
            reductions: 5553353,
            reductions_details: {
              rate: 0
            },
            single_active_consumer_tag: null,
            state: 'running',
            type: 'classic',
            vhost: '/'
          },
          {
            arguments: {},
            auto_delete: false,
            backing_queue_status: {
              avg_ack_egress_rate: 0,
              avg_ack_ingress_rate: 0,
              avg_egress_rate: 0,
              avg_ingress_rate: 0,
              delta: ['delta', 'undefined', 0, 0, 'undefined'],
              len: 0,
              mode: 'default',
              next_deliver_seq_id: 0,
              next_seq_id: 0,
              num_pending_acks: 0,
              num_unconfirmed: 0,
              q1: 0,
              q2: 0,
              q3: 0,
              q4: 0,
              target_ram_count: 'infinity',
              version: 1
            },
            consumer_capacity: 1,
            consumer_utilisation: 1,
            consumers: 4,
            durable: true,
            effective_policy_definition: {},
            exclusive: false,
            exclusive_consumer_tag: null,
            garbage_collection: {
              fullsweep_after: 65535,
              max_heap_size: 0,
              min_bin_vheap_size: 46422,
              min_heap_size: 233,
              minor_gcs: 8451
            },
            head_message_timestamp: null,
            idle_since: '2024-02-08T10:31:54.171+01:00',
            memory: 9368,
            message_bytes: 0,
            message_bytes_paged_out: 0,
            message_bytes_persistent: 0,
            message_bytes_ram: 0,
            message_bytes_ready: 0,
            message_bytes_unacknowledged: 0,
            messages: 0,
            messages_details: {
              rate: 0
            },
            messages_paged_out: 0,
            messages_persistent: 0,
            messages_ram: 0,
            messages_ready: 0,
            messages_ready_details: {
              rate: 0
            },
            messages_ready_ram: 0,
            messages_unacknowledged: 0,
            messages_unacknowledged_details: {
              rate: 0
            },
            messages_unacknowledged_ram: 0,
            name: 'SesFileTranslationConsumer.PdfParsing',
            node: 'rabbit@localhost',
            operator_policy: null,
            policy: null,
            recoverable_slaves: null,
            reductions: 5553333,
            reductions_details: {
              rate: 0
            },
            single_active_consumer_tag: null,
            state: 'running',
            type: 'classic',
            vhost: '/'
          },
          {
            arguments: {},
            auto_delete: false,
            backing_queue_status: {
              avg_ack_egress_rate: 0,
              avg_ack_ingress_rate: 0,
              avg_egress_rate: 0,
              avg_ingress_rate: 0,
              delta: ['delta', 'undefined', 0, 0, 'undefined'],
              len: 0,
              mode: 'default',
              next_deliver_seq_id: 0,
              next_seq_id: 0,
              num_pending_acks: 0,
              num_unconfirmed: 0,
              q1: 0,
              q2: 0,
              q3: 0,
              q4: 0,
              target_ram_count: 'infinity',
              version: 1
            },
            consumer_capacity: 1,
            consumer_utilisation: 1,
            consumers: 4,
            durable: true,
            effective_policy_definition: {},
            exclusive: false,
            exclusive_consumer_tag: null,
            garbage_collection: {
              fullsweep_after: 65535,
              max_heap_size: 0,
              min_bin_vheap_size: 46422,
              min_heap_size: 233,
              minor_gcs: 8450
            },
            head_message_timestamp: null,
            idle_since: '2024-02-08T10:31:54.069+01:00',
            memory: 9376,
            message_bytes: 0,
            message_bytes_paged_out: 0,
            message_bytes_persistent: 0,
            message_bytes_ram: 0,
            message_bytes_ready: 0,
            message_bytes_unacknowledged: 0,
            messages: 0,
            messages_details: {
              rate: 0
            },
            messages_paged_out: 0,
            messages_persistent: 0,
            messages_ram: 0,
            messages_ready: 0,
            messages_ready_details: {
              rate: 0
            },
            messages_ready_ram: 0,
            messages_unacknowledged: 0,
            messages_unacknowledged_details: {
              rate: 0
            },
            messages_unacknowledged_ram: 0,
            name: 'SesFileTranslationConsumer.PdfParsing.Error',
            node: 'rabbit@localhost',
            operator_policy: null,
            policy: null,
            recoverable_slaves: null,
            reductions: 5553367,
            reductions_details: {
              rate: 0
            },
            single_active_consumer_tag: null,
            state: 'running',
            type: 'classic',
            vhost: '/'
          },
          {
            arguments: {},
            auto_delete: false,
            backing_queue_status: {
              avg_ack_egress_rate: 0,
              avg_ack_ingress_rate: 0,
              avg_egress_rate: 0,
              avg_ingress_rate: 0,
              delta: ['delta', 'undefined', 0, 0, 'undefined'],
              len: 0,
              mode: 'default',
              next_deliver_seq_id: 0,
              next_seq_id: 0,
              num_pending_acks: 0,
              num_unconfirmed: 0,
              q1: 0,
              q2: 0,
              q3: 0,
              q4: 0,
              target_ram_count: 'infinity',
              version: 1
            },
            consumer_capacity: 1,
            consumer_utilisation: 1,
            consumers: 4,
            durable: true,
            effective_policy_definition: {},
            exclusive: false,
            exclusive_consumer_tag: null,
            garbage_collection: {
              fullsweep_after: 65535,
              max_heap_size: 0,
              min_bin_vheap_size: 46422,
              min_heap_size: 233,
              minor_gcs: 8452
            },
            head_message_timestamp: null,
            idle_since: '2024-02-08T10:31:53.977+01:00',
            memory: 9368,
            message_bytes: 0,
            message_bytes_paged_out: 0,
            message_bytes_persistent: 0,
            message_bytes_ram: 0,
            message_bytes_ready: 0,
            message_bytes_unacknowledged: 0,
            messages: 0,
            messages_details: {
              rate: 0
            },
            messages_paged_out: 0,
            messages_persistent: 0,
            messages_ram: 0,
            messages_ready: 0,
            messages_ready_details: {
              rate: 0
            },
            messages_ready_ram: 0,
            messages_unacknowledged: 0,
            messages_unacknowledged_details: {
              rate: 0
            },
            messages_unacknowledged_ram: 0,
            name: 'SesFileTranslationConsumer.Transcription',
            node: 'rabbit@localhost',
            operator_policy: null,
            policy: null,
            recoverable_slaves: null,
            reductions: 5553448,
            reductions_details: {
              rate: 0
            },
            single_active_consumer_tag: null,
            state: 'running',
            type: 'classic',
            vhost: '/'
          },
          {
            arguments: {},
            auto_delete: false,
            backing_queue_status: {
              avg_ack_egress_rate: 0,
              avg_ack_ingress_rate: 0,
              avg_egress_rate: 0,
              avg_ingress_rate: 0,
              delta: ['delta', 'undefined', 0, 0, 'undefined'],
              len: 0,
              mode: 'default',
              next_deliver_seq_id: 0,
              next_seq_id: 0,
              num_pending_acks: 0,
              num_unconfirmed: 0,
              q1: 0,
              q2: 0,
              q3: 0,
              q4: 0,
              target_ram_count: 'infinity',
              version: 1
            },
            consumer_capacity: 1,
            consumer_utilisation: 1,
            consumers: 4,
            durable: true,
            effective_policy_definition: {},
            exclusive: false,
            exclusive_consumer_tag: null,
            garbage_collection: {
              fullsweep_after: 65535,
              max_heap_size: 0,
              min_bin_vheap_size: 46422,
              min_heap_size: 233,
              minor_gcs: 8450
            },
            head_message_timestamp: null,
            idle_since: '2024-02-08T10:31:54.491+01:00',
            memory: 9376,
            message_bytes: 0,
            message_bytes_paged_out: 0,
            message_bytes_persistent: 0,
            message_bytes_ram: 0,
            message_bytes_ready: 0,
            message_bytes_unacknowledged: 0,
            messages: 0,
            messages_details: {
              rate: 0
            },
            messages_paged_out: 0,
            messages_persistent: 0,
            messages_ram: 0,
            messages_ready: 0,
            messages_ready_details: {
              rate: 0
            },
            messages_ready_ram: 0,
            messages_unacknowledged: 0,
            messages_unacknowledged_details: {
              rate: 0
            },
            messages_unacknowledged_ram: 0,
            name: 'SesFileTranslationConsumer.Transcription.Error',
            node: 'rabbit@localhost',
            operator_policy: null,
            policy: null,
            recoverable_slaves: null,
            reductions: 5553274,
            reductions_details: {
              rate: 0
            },
            single_active_consumer_tag: null,
            state: 'running',
            type: 'classic',
            vhost: '/'
          },
          {
            arguments: {},
            auto_delete: false,
            backing_queue_status: {
              avg_ack_egress_rate: 0,
              avg_ack_ingress_rate: 0,
              avg_egress_rate: 0,
              avg_ingress_rate: 0,
              delta: ['delta', 'undefined', 0, 0, 'undefined'],
              len: 0,
              mode: 'default',
              next_deliver_seq_id: 0,
              next_seq_id: 0,
              num_pending_acks: 0,
              num_unconfirmed: 0,
              q1: 0,
              q2: 0,
              q3: 0,
              q4: 0,
              target_ram_count: 'infinity',
              version: 1
            },
            consumer_capacity: 1,
            consumer_utilisation: 1,
            consumers: 4,
            durable: true,
            effective_policy_definition: {},
            exclusive: false,
            exclusive_consumer_tag: null,
            garbage_collection: {
              fullsweep_after: 65535,
              max_heap_size: 0,
              min_bin_vheap_size: 46422,
              min_heap_size: 233,
              minor_gcs: 8450
            },
            head_message_timestamp: null,
            idle_since: '2024-02-08T10:31:54.093+01:00',
            memory: 9384,
            message_bytes: 0,
            message_bytes_paged_out: 0,
            message_bytes_persistent: 0,
            message_bytes_ram: 0,
            message_bytes_ready: 0,
            message_bytes_unacknowledged: 0,
            messages: 0,
            messages_details: {
              rate: 0
            },
            messages_paged_out: 0,
            messages_persistent: 0,
            messages_ram: 0,
            messages_ready: 0,
            messages_ready_details: {
              rate: 0
            },
            messages_ready_ram: 0,
            messages_unacknowledged: 0,
            messages_unacknowledged_details: {
              rate: 0
            },
            messages_unacknowledged_ram: 0,
            name: 'SesFileTranslationConsumer.TranscriptionStatusMonitoring',
            node: 'rabbit@localhost',
            operator_policy: null,
            policy: null,
            recoverable_slaves: null,
            reductions: 5558748,
            reductions_details: {
              rate: 0
            },
            single_active_consumer_tag: null,
            state: 'running',
            type: 'classic',
            vhost: '/'
          },
          {
            arguments: {},
            auto_delete: false,
            backing_queue_status: {
              avg_ack_egress_rate: 0,
              avg_ack_ingress_rate: 0,
              avg_egress_rate: 0,
              avg_ingress_rate: 0,
              delta: ['delta', 'undefined', 0, 0, 'undefined'],
              len: 0,
              mode: 'default',
              next_deliver_seq_id: 0,
              next_seq_id: 0,
              num_pending_acks: 0,
              num_unconfirmed: 0,
              q1: 0,
              q2: 0,
              q3: 0,
              q4: 0,
              target_ram_count: 'infinity',
              version: 1
            },
            consumer_capacity: 1,
            consumer_utilisation: 1,
            consumers: 4,
            durable: true,
            effective_policy_definition: {},
            exclusive: false,
            exclusive_consumer_tag: null,
            garbage_collection: {
              fullsweep_after: 65535,
              max_heap_size: 0,
              min_bin_vheap_size: 46422,
              min_heap_size: 233,
              minor_gcs: 8449
            },
            head_message_timestamp: null,
            idle_since: '2024-02-08T10:31:54.270+01:00',
            memory: 9392,
            message_bytes: 0,
            message_bytes_paged_out: 0,
            message_bytes_persistent: 0,
            message_bytes_ram: 0,
            message_bytes_ready: 0,
            message_bytes_unacknowledged: 0,
            messages: 0,
            messages_details: {
              rate: 0
            },
            messages_paged_out: 0,
            messages_persistent: 0,
            messages_ram: 0,
            messages_ready: 0,
            messages_ready_details: {
              rate: 0
            },
            messages_ready_ram: 0,
            messages_unacknowledged: 0,
            messages_unacknowledged_details: {
              rate: 0
            },
            messages_unacknowledged_ram: 0,
            name:
              'SesFileTranslationConsumer.TranscriptionStatusMonitoring.Error',
            node: 'rabbit@localhost',
            operator_policy: null,
            policy: null,
            recoverable_slaves: null,
            reductions: 5558845,
            reductions_details: {
              rate: 0
            },
            single_active_consumer_tag: null,
            state: 'running',
            type: 'classic',
            vhost: '/'
          },
          {
            arguments: {},
            auto_delete: false,
            backing_queue_status: {
              avg_ack_egress_rate: 0,
              avg_ack_ingress_rate: 0,
              avg_egress_rate: 0,
              avg_ingress_rate: 0,
              delta: ['delta', 'undefined', 0, 0, 'undefined'],
              len: 0,
              mode: 'default',
              next_deliver_seq_id: 0,
              next_seq_id: 0,
              num_pending_acks: 0,
              num_unconfirmed: 0,
              q1: 0,
              q2: 0,
              q3: 0,
              q4: 0,
              target_ram_count: 'infinity',
              version: 1
            },
            consumer_capacity: 1,
            consumer_utilisation: 1,
            consumers: 4,
            durable: true,
            effective_policy_definition: {},
            exclusive: false,
            exclusive_consumer_tag: null,
            garbage_collection: {
              fullsweep_after: 65535,
              max_heap_size: 0,
              min_bin_vheap_size: 46422,
              min_heap_size: 233,
              minor_gcs: 8451
            },
            head_message_timestamp: null,
            idle_since: '2024-02-08T10:31:54.626+01:00',
            memory: 9368,
            message_bytes: 0,
            message_bytes_paged_out: 0,
            message_bytes_persistent: 0,
            message_bytes_ram: 0,
            message_bytes_ready: 0,
            message_bytes_unacknowledged: 0,
            messages: 0,
            messages_details: {
              rate: 0
            },
            messages_paged_out: 0,
            messages_persistent: 0,
            messages_ram: 0,
            messages_ready: 0,
            messages_ready_details: {
              rate: 0
            },
            messages_ready_ram: 0,
            messages_unacknowledged: 0,
            messages_unacknowledged_details: {
              rate: 0
            },
            messages_unacknowledged_ram: 0,
            name: 'SesFileTranslationConsumer.Translation',
            node: 'rabbit@localhost',
            operator_policy: null,
            policy: null,
            recoverable_slaves: null,
            reductions: 5553282,
            reductions_details: {
              rate: 0
            },
            single_active_consumer_tag: null,
            state: 'running',
            type: 'classic',
            vhost: '/'
          },
          {
            arguments: {},
            auto_delete: false,
            backing_queue_status: {
              avg_ack_egress_rate: 0,
              avg_ack_ingress_rate: 0,
              avg_egress_rate: 0,
              avg_ingress_rate: 0,
              delta: ['delta', 'undefined', 0, 0, 'undefined'],
              len: 0,
              mode: 'default',
              next_deliver_seq_id: 0,
              next_seq_id: 0,
              num_pending_acks: 0,
              num_unconfirmed: 0,
              q1: 0,
              q2: 0,
              q3: 0,
              q4: 0,
              target_ram_count: 'infinity',
              version: 1
            },
            consumer_capacity: 1,
            consumer_utilisation: 1,
            consumers: 4,
            durable: true,
            effective_policy_definition: {},
            exclusive: false,
            exclusive_consumer_tag: null,
            garbage_collection: {
              fullsweep_after: 65535,
              max_heap_size: 0,
              min_bin_vheap_size: 46422,
              min_heap_size: 233,
              minor_gcs: 8446
            },
            head_message_timestamp: null,
            idle_since: '2024-02-08T10:31:53.656+01:00',
            memory: 9376,
            message_bytes: 0,
            message_bytes_paged_out: 0,
            message_bytes_persistent: 0,
            message_bytes_ram: 0,
            message_bytes_ready: 0,
            message_bytes_unacknowledged: 0,
            messages: 0,
            messages_details: {
              rate: 0
            },
            messages_paged_out: 0,
            messages_persistent: 0,
            messages_ram: 0,
            messages_ready: 0,
            messages_ready_details: {
              rate: 0
            },
            messages_ready_ram: 0,
            messages_unacknowledged: 0,
            messages_unacknowledged_details: {
              rate: 0
            },
            messages_unacknowledged_ram: 0,
            name: 'SesFileTranslationConsumer.Translation.Error',
            node: 'rabbit@localhost',
            operator_policy: null,
            policy: null,
            recoverable_slaves: null,
            reductions: 5553296,
            reductions_details: {
              rate: 0
            },
            single_active_consumer_tag: null,
            state: 'running',
            type: 'classic',
            vhost: '/'
          },
          {
            arguments: {},
            auto_delete: false,
            backing_queue_status: {
              avg_ack_egress_rate: 0,
              avg_ack_ingress_rate: 0,
              avg_egress_rate: 0,
              avg_ingress_rate: 0,
              delta: ['delta', 'undefined', 0, 0, 'undefined'],
              len: 0,
              mode: 'default',
              next_deliver_seq_id: 0,
              next_seq_id: 0,
              num_pending_acks: 0,
              num_unconfirmed: 0,
              q1: 0,
              q2: 0,
              q3: 0,
              q4: 0,
              target_ram_count: 'infinity',
              version: 1
            },
            consumer_capacity: 1,
            consumer_utilisation: 1,
            consumers: 4,
            durable: true,
            effective_policy_definition: {},
            exclusive: false,
            exclusive_consumer_tag: null,
            garbage_collection: {
              fullsweep_after: 65535,
              max_heap_size: 0,
              min_bin_vheap_size: 46422,
              min_heap_size: 233,
              minor_gcs: 8450
            },
            head_message_timestamp: null,
            idle_since: '2024-02-08T10:31:54.430+01:00',
            memory: 9384,
            message_bytes: 0,
            message_bytes_paged_out: 0,
            message_bytes_persistent: 0,
            message_bytes_ram: 0,
            message_bytes_ready: 0,
            message_bytes_unacknowledged: 0,
            messages: 0,
            messages_details: {
              rate: 0
            },
            messages_paged_out: 0,
            messages_persistent: 0,
            messages_ram: 0,
            messages_ready: 0,
            messages_ready_details: {
              rate: 0
            },
            messages_ready_ram: 0,
            messages_unacknowledged: 0,
            messages_unacknowledged_details: {
              rate: 0
            },
            messages_unacknowledged_ram: 0,
            name: 'SesFileTranslationConsumer.TranslationStatusMonitoring',
            node: 'rabbit@localhost',
            operator_policy: null,
            policy: null,
            recoverable_slaves: null,
            reductions: 5558781,
            reductions_details: {
              rate: 0
            },
            single_active_consumer_tag: null,
            state: 'running',
            type: 'classic',
            vhost: '/'
          },
          {
            arguments: {},
            auto_delete: false,
            backing_queue_status: {
              avg_ack_egress_rate: 0,
              avg_ack_ingress_rate: 0,
              avg_egress_rate: 0,
              avg_ingress_rate: 0,
              delta: ['delta', 'undefined', 0, 0, 'undefined'],
              len: 0,
              mode: 'default',
              next_deliver_seq_id: 0,
              next_seq_id: 0,
              num_pending_acks: 0,
              num_unconfirmed: 0,
              q1: 0,
              q2: 0,
              q3: 0,
              q4: 0,
              target_ram_count: 'infinity',
              version: 1
            },
            consumer_capacity: 1,
            consumer_utilisation: 1,
            consumers: 4,
            durable: true,
            effective_policy_definition: {},
            exclusive: false,
            exclusive_consumer_tag: null,
            garbage_collection: {
              fullsweep_after: 65535,
              max_heap_size: 0,
              min_bin_vheap_size: 46422,
              min_heap_size: 233,
              minor_gcs: 8448
            },
            head_message_timestamp: null,
            idle_since: '2024-02-08T10:31:54.332+01:00',
            memory: 9392,
            message_bytes: 0,
            message_bytes_paged_out: 0,
            message_bytes_persistent: 0,
            message_bytes_ram: 0,
            message_bytes_ready: 0,
            message_bytes_unacknowledged: 0,
            messages: 0,
            messages_details: {
              rate: 0
            },
            messages_paged_out: 0,
            messages_persistent: 0,
            messages_ram: 0,
            messages_ready: 0,
            messages_ready_details: {
              rate: 0
            },
            messages_ready_ram: 0,
            messages_unacknowledged: 0,
            messages_unacknowledged_details: {
              rate: 0
            },
            messages_unacknowledged_ram: 0,
            name:
              'SesFileTranslationConsumer.TranslationStatusMonitoring.Error',
            node: 'rabbit@localhost',
            operator_policy: null,
            policy: null,
            recoverable_slaves: null,
            reductions: 5558959,
            reductions_details: {
              rate: 0
            },
            single_active_consumer_tag: null,
            state: 'running',
            type: 'classic',
            vhost: '/'
          },
          {
            arguments: {},
            auto_delete: false,
            backing_queue_status: {
              avg_ack_egress_rate: 0,
              avg_ack_ingress_rate: 0,
              avg_egress_rate: 0,
              avg_ingress_rate: 0,
              delta: ['delta', 'undefined', 0, 0, 'undefined'],
              len: 0,
              mode: 'default',
              next_deliver_seq_id: 0,
              next_seq_id: 0,
              num_pending_acks: 0,
              num_unconfirmed: 0,
              q1: 0,
              q2: 0,
              q3: 0,
              q4: 0,
              target_ram_count: 'infinity',
              version: 1
            },
            consumer_capacity: 1,
            consumer_utilisation: 1,
            consumers: 4,
            durable: true,
            effective_policy_definition: {},
            exclusive: false,
            exclusive_consumer_tag: null,
            garbage_collection: {
              fullsweep_after: 65535,
              max_heap_size: 0,
              min_bin_vheap_size: 46422,
              min_heap_size: 233,
              minor_gcs: 8452
            },
            head_message_timestamp: null,
            idle_since: '2024-02-08T10:31:53.758+01:00',
            memory: 9368,
            message_bytes: 0,
            message_bytes_paged_out: 0,
            message_bytes_persistent: 0,
            message_bytes_ram: 0,
            message_bytes_ready: 0,
            message_bytes_unacknowledged: 0,
            messages: 0,
            messages_details: {
              rate: 0
            },
            messages_paged_out: 0,
            messages_persistent: 0,
            messages_ram: 0,
            messages_ready: 0,
            messages_ready_details: {
              rate: 0
            },
            messages_ready_ram: 0,
            messages_unacknowledged: 0,
            messages_unacknowledged_details: {
              rate: 0
            },
            messages_unacknowledged_ram: 0,
            name: 'SesFileTranslationConsumer.XliffParsing',
            node: 'rabbit@localhost',
            operator_policy: null,
            policy: null,
            recoverable_slaves: null,
            reductions: 5553356,
            reductions_details: {
              rate: 0
            },
            single_active_consumer_tag: null,
            state: 'running',
            type: 'classic',
            vhost: '/'
          },
          {
            arguments: {},
            auto_delete: false,
            backing_queue_status: {
              avg_ack_egress_rate: 0,
              avg_ack_ingress_rate: 0,
              avg_egress_rate: 0,
              avg_ingress_rate: 0,
              delta: ['delta', 'undefined', 0, 0, 'undefined'],
              len: 0,
              mode: 'default',
              next_deliver_seq_id: 0,
              next_seq_id: 0,
              num_pending_acks: 0,
              num_unconfirmed: 0,
              q1: 0,
              q2: 0,
              q3: 0,
              q4: 0,
              target_ram_count: 'infinity',
              version: 1
            },
            consumer_capacity: 1,
            consumer_utilisation: 1,
            consumers: 4,
            durable: true,
            effective_policy_definition: {},
            exclusive: false,
            exclusive_consumer_tag: null,
            garbage_collection: {
              fullsweep_after: 65535,
              max_heap_size: 0,
              min_bin_vheap_size: 46422,
              min_heap_size: 233,
              minor_gcs: 8447
            },
            head_message_timestamp: null,
            idle_since: '2024-02-08T10:31:54.451+01:00',
            memory: 9376,
            message_bytes: 0,
            message_bytes_paged_out: 0,
            message_bytes_persistent: 0,
            message_bytes_ram: 0,
            message_bytes_ready: 0,
            message_bytes_unacknowledged: 0,
            messages: 0,
            messages_details: {
              rate: 0
            },
            messages_paged_out: 0,
            messages_persistent: 0,
            messages_ram: 0,
            messages_ready: 0,
            messages_ready_details: {
              rate: 0
            },
            messages_ready_ram: 0,
            messages_unacknowledged: 0,
            messages_unacknowledged_details: {
              rate: 0
            },
            messages_unacknowledged_ram: 0,
            name: 'SesFileTranslationConsumer.XliffParsing.Error',
            node: 'rabbit@localhost',
            operator_policy: null,
            policy: null,
            recoverable_slaves: null,
            reductions: 5553334,
            reductions_details: {
              rate: 0
            },
            single_active_consumer_tag: null,
            state: 'running',
            type: 'classic',
            vhost: '/'
          }
        ],
        app: {
          version: '3.11.13',
          semverVersion: '3.11.13',
          invalidVersion: false
        },
        status: 'running'
      },
      lastSuccessfulUpdate: '2024-02-08T09:32:14.433Z',
      lastUpdate: '2024-02-08T09:32:14.433Z',
      status: 'running',
      name: 'RabbitMQ (used by ses-file-translation-consumer)'
    },
    {
      _id: '65bcf0cb8375e88c08ac5395',
      hostname: 'localhost',
      insertedAt: '2024-02-02T13:40:27.080Z',
      secure: false,
      version: '2024-02-08T09:32:14.261Z',
      app: {
        version: '3.11.13'
      },
      lastSuccessfulUpdate: '2024-02-08T09:32:14.303Z',
      lastUpdate: '2024-02-08T09:32:14.397Z',
      status: 'running',
      name: 'Broker'
    },
    {
      host: 'ip107.ip-5-39-40.eu',
      version: '6.0.13',
      process: 'mongod',
      pid: 7719,
      uptime: 494045,
      uptimeMillis: 494044794,
      uptimeEstimate: 494044,
      localTime: '2024-02-08T09:32:18.345Z',
      activeIndexBuilds: {
        total: 0,
        phases: {
          scanCollection: 0,
          drainSideWritesTable: 0,
          drainSideWritesTablePreCommit: 0,
          waitForCommitQuorum: 0,
          drainSideWritesTableOnCommit: 0,
          processConstraintsViolatonTableOnCommit: 0,
          commit: 0
        }
      },
      asserts: {
        regular: 0,
        warning: 0,
        msg: 0,
        user: 5353,
        tripwire: 0,
        rollovers: 0
      },
      batchedDeletes: {
        batches: 0,
        docs: 0,
        stagedSizeBytes: 0,
        timeMillis: 0
      },
      catalogStats: {
        collections: 68,
        capped: 0,
        clustered: 0,
        timeseries: 0,
        views: 0,
        internalCollections: 20,
        internalViews: 1
      },
      connections: {
        current: 460,
        available: 50740,
        totalCreated: 2451,
        active: 64,
        threaded: 460,
        exhaustIsMaster: 0,
        exhaustHello: 60,
        awaitingTopologyChanges: 60
      },
      defaultRWConcern: {
        defaultReadConcern: {
          level: 'local'
        },
        defaultWriteConcern: {
          w: 'majority',
          wtimeout: 0
        },
        defaultWriteConcernSource: 'implicit',
        defaultReadConcernSource: 'implicit',
        localUpdateWallClockTime: '2024-02-02T16:18:15.739Z'
      },
      electionMetrics: {
        stepUpCmd: {
          called: 0,
          successful: 0
        },
        priorityTakeover: {
          called: 0,
          successful: 0
        },
        catchUpTakeover: {
          called: 0,
          successful: 0
        },
        electionTimeout: {
          called: 1,
          successful: 1
        },
        freezeTimeout: {
          called: 0,
          successful: 0
        },
        numStepDownsCausedByHigherTerm: 0,
        numCatchUps: 0,
        numCatchUpsSucceeded: 0,
        numCatchUpsAlreadyCaughtUp: 0,
        numCatchUpsSkipped: 1,
        numCatchUpsTimedOut: 0,
        numCatchUpsFailedWithError: 0,
        numCatchUpsFailedWithNewTerm: 0,
        numCatchUpsFailedWithReplSetAbortPrimaryCatchUpCmd: 0,
        averageCatchUpOps: 0
      },
      extra_info: {
        note: 'fields vary by platform',
        user_time_us: 502539494026,
        system_time_us: 71998303625,
        maximum_resident_set_kb: 6430824,
        input_blocks: 12681920,
        output_blocks: 5341987024,
        page_reclaims: 26485836,
        page_faults: 9362,
        voluntary_context_switches: 4486323972,
        involuntary_context_switches: 25188663
      },
      featureCompatibilityVersion: {
        major: 6,
        minor: 0,
        transitioning: 0
      },
      flowControl: {
        enabled: true,
        targetRateLimit: 1000000000,
        timeAcquiringMicros: 44727557,
        locksPerKiloOp: 9,
        sustainerRate: 0,
        isLagged: false,
        isLaggedCount: 0,
        isLaggedTimeMicros: 0
      },
      globalLock: {
        totalTime: 494044810000,
        currentQueue: {
          total: 0,
          readers: 0,
          writers: 0
        },
        activeClients: {
          total: 3,
          readers: 2,
          writers: 1
        }
      },
      indexBulkBuilder: {
        count: 1,
        resumed: 0,
        filesOpenedForExternalSort: 0,
        filesClosedForExternalSort: 0,
        spilledRanges: 0,
        bytesSpilledUncompressed: 0,
        bytesSpilled: 0
      },
      indexStats: {
        count: 350,
        features: {
          '2d': {
            count: 0,
            accesses: 0
          },
          '2dsphere': {
            count: 0,
            accesses: 0
          },
          '2dsphere_bucket': {
            count: 0,
            accesses: 0
          },
          collation: {
            count: 0,
            accesses: 0
          },
          compound: {
            count: 34,
            accesses: 104569
          },
          hashed: {
            count: 0,
            accesses: 0
          },
          id: {
            count: 79,
            accesses: 25793
          },
          normal: {
            count: 271,
            accesses: 17174469
          },
          partial: {
            count: 0,
            accesses: 0
          },
          single: {
            count: 237,
            accesses: 17069900
          },
          sparse: {
            count: 11,
            accesses: 98875
          },
          text: {
            count: 0,
            accesses: 0
          },
          ttl: {
            count: 16,
            accesses: 3
          },
          unique: {
            count: 21,
            accesses: 14296544
          },
          wildcard: {
            count: 0,
            accesses: 0
          }
        }
      },
      locks: {
        ParallelBatchWriterMode: {
          acquireCount: {
            r: 46527533
          }
        },
        FeatureCompatibilityVersion: {
          acquireCount: {
            r: 5206324457,
            w: 33077829
          }
        },
        ReplicationStateTransition: {
          acquireCount: {
            w: 89699222,
            W: 2
          },
          acquireWaitCount: {
            w: 1,
            W: 1
          },
          timeAcquiringMicros: {
            w: 18901,
            W: 13978
          }
        },
        Global: {
          acquireCount: {
            r: 5219772727,
            w: 57160454,
            W: 6
          },
          acquireWaitCount: {
            W: 1
          },
          timeAcquiringMicros: {
            W: 94
          }
        },
        Database: {
          acquireCount: {
            r: 40108,
            w: 57084381,
            W: 4
          }
        },
        Collection: {
          acquireCount: {
            r: 40127,
            w: 57087443,
            R: 1,
            W: 641
          },
          acquireWaitCount: {
            r: 5,
            W: 8
          },
          timeAcquiringMicros: {
            r: 631942,
            W: 988754
          }
        },
        Mutex: {
          acquireCount: {
            r: 54527001
          }
        },
        oplog: {
          acquireCount: {
            w: 2
          }
        }
      },
      logicalSessionRecordCache: {
        activeSessionsCount: 93,
        sessionsCollectionJobCount: 1647,
        lastSessionsCollectionJobDurationMillis: 14,
        lastSessionsCollectionJobTimestamp: '2024-02-08T09:28:15.836Z',
        lastSessionsCollectionJobEntriesRefreshed: 67,
        lastSessionsCollectionJobEntriesEnded: 0,
        lastSessionsCollectionJobCursorsClosed: 0,
        transactionReaperJobCount: 1647,
        lastTransactionReaperJobDurationMillis: 1,
        lastTransactionReaperJobTimestamp: '2024-02-08T09:28:15.863Z',
        lastTransactionReaperJobEntriesCleanedUp: 0,
        sessionCatalogSize: 65
      },
      network: {
        bytesIn: 31820034242,
        bytesOut: 31605934284,
        physicalBytesIn: 31100975086,
        physicalBytesOut: 31595298816,
        numSlowDNSOperations: 0,
        numSlowSSLOperations: 0,
        numRequests: 30006937,
        tcpFastOpen: {
          kernelSetting: 0,
          serverSupported: true,
          clientSupported: true,
          accepted: 0
        },
        compression: {
          snappy: {
            compressor: {
              bytesIn: 49034282,
              bytesOut: 37510189
            },
            decompressor: {
              bytesIn: 37510076,
              bytesOut: 49034135
            }
          },
          zstd: {
            compressor: {
              bytesIn: 0,
              bytesOut: 0
            },
            decompressor: {
              bytesIn: 0,
              bytesOut: 0
            }
          },
          zlib: {
            compressor: {
              bytesIn: 0,
              bytesOut: 0
            },
            decompressor: {
              bytesIn: 0,
              bytesOut: 0
            }
          }
        },
        serviceExecutors: {
          passthrough: {
            threadsRunning: 460,
            clientsInTotal: 460,
            clientsRunning: 460,
            clientsWaitingForData: 0
          },
          fixed: {
            threadsRunning: 1,
            clientsInTotal: 0,
            clientsRunning: 0,
            clientsWaitingForData: 0
          }
        }
      },
      opLatencies: {
        reads: {
          latency: 131784401083,
          ops: 12016881
        },
        writes: {
          latency: 220829175936,
          ops: 12055913
        },
        commands: {
          latency: 560147310,
          ops: 5934079
        },
        transactions: {
          latency: 92145,
          ops: 10
        }
      },
      opcounters: {
        insert: 3887953,
        query: 5779907,
        update: 8159004,
        delete: 98676,
        getmore: 990401,
        command: 11205026
      },
      opcountersRepl: {
        insert: 0,
        query: 0,
        update: 0,
        delete: 0,
        getmore: 0,
        command: 0
      },
      oplogTruncation: {
        totalTimeProcessingMicros: 407582,
        processingMethod: 'sampling',
        totalTimeTruncatingMicros: 52603455,
        truncateCount: 10777
      },
      readConcernCounters: {
        nonTransactionOps: {
          none: 11026484,
          noneInfo: {
            CWRC: {
              local: 0,
              available: 0,
              majority: 0
            },
            implicitDefault: {
              local: 11026484,
              available: 0
            }
          },
          local: 0,
          available: 0,
          majority: 0,
          snapshot: {
            withClusterTime: 0,
            withoutClusterTime: 0
          },
          linearizable: 0
        },
        transactionOps: {
          none: 0,
          noneInfo: {
            CWRC: {
              local: 0,
              majority: 0
            },
            implicitDefault: {
              local: 0
            }
          },
          local: 0,
          majority: 0,
          snapshot: {
            withClusterTime: 0,
            withoutClusterTime: 0
          }
        }
      },
      readPreferenceCounters: {
        executedOnPrimary: {
          primary: {
            internal: 0,
            external: 11035241
          },
          primaryPreferred: {
            internal: 0,
            external: 11
          },
          secondary: {
            internal: 0,
            external: 0
          },
          secondaryPreferred: {
            internal: 0,
            external: 0
          },
          nearest: {
            internal: 0,
            external: 5
          },
          tagged: {
            internal: 0,
            external: 0
          }
        },
        executedOnSecondary: {
          primary: {
            internal: 0,
            external: 0
          },
          primaryPreferred: {
            internal: 0,
            external: 0
          },
          secondary: {
            internal: 0,
            external: 0
          },
          secondaryPreferred: {
            internal: 0,
            external: 0
          },
          nearest: {
            internal: 0,
            external: 0
          },
          tagged: {
            internal: 0,
            external: 0
          }
        }
      },
      repl: {
        topologyVersion: {
          processId: '65bd15c527406fee433435c8',
          counter: 6
        },
        hosts: ['127.0.0.1:27017'],
        setName: 'indexers',
        setVersion: 1,
        isWritablePrimary: true,
        secondary: false,
        primary: '127.0.0.1:27017',
        me: '127.0.0.1:27017',
        electionId: '7fffffff0000000000000005',
        lastWrite: {
          opTime: {
            ts: '7333161611399528581',
            t: 5
          },
          lastWriteDate: '2024-02-08T09:32:18.000Z',
          majorityOpTime: {
            ts: '7333161611399528462',
            t: 5
          },
          majorityWriteDate: '2024-02-08T09:32:18.000Z'
        },
        primaryOnlyServices: {
          ShardSplitDonorService: {
            state: 'running',
            numInstances: 0
          },
          TenantMigrationRecipientService: {
            state: 'running',
            numInstances: 0
          },
          TenantMigrationDonorService: {
            state: 'running',
            numInstances: 0
          }
        },
        rbid: 1,
        userWriteBlockMode: 1
      },
      scramCache: {
        'SCRAM-SHA-1': {
          count: 0,
          hits: 0,
          misses: 0
        },
        'SCRAM-SHA-256': {
          count: 1,
          hits: 5,
          misses: 1
        }
      },
      security: {
        authentication: {
          saslSupportedMechsReceived: 1512,
          mechanisms: {
            'MONGODB-X509': {
              speculativeAuthenticate: {
                received: 0,
                successful: 0
              },
              clusterAuthenticate: {
                received: 0,
                successful: 0
              },
              authenticate: {
                received: 0,
                successful: 0
              }
            },
            'SCRAM-SHA-1': {
              speculativeAuthenticate: {
                received: 118,
                successful: 118
              },
              clusterAuthenticate: {
                received: 0,
                successful: 0
              },
              authenticate: {
                received: 118,
                successful: 118
              }
            },
            'SCRAM-SHA-256': {
              speculativeAuthenticate: {
                received: 1510,
                successful: 1510
              },
              clusterAuthenticate: {
                received: 6,
                successful: 6
              },
              authenticate: {
                received: 1512,
                successful: 1512
              }
            }
          }
        }
      },
      storageEngine: {
        name: 'wiredTiger',
        supportsCommittedReads: true,
        oldestRequiredTimestampForCrashRecovery: '7333161345111556156',
        supportsPendingDrops: true,
        dropPendingIdents: 0,
        supportsSnapshotReadConcern: true,
        readOnly: false,
        persistent: true,
        backupCursorOpen: false
      },
      tcmalloc: {
        generic: {
          current_allocated_bytes: 4897387920,
          heap_size: 6611714048
        },
        tcmalloc: {
          pageheap_free_bytes: 1368530944,
          pageheap_unmapped_bytes: 162283520,
          max_total_thread_cache_bytes: 1073741824,
          current_total_thread_cache_bytes: 107066368,
          total_free_bytes: 183507800,
          central_cache_free_bytes: 76414576,
          transfer_cache_free_bytes: 16384,
          thread_cache_free_bytes: 107079216,
          aggressive_memory_decommit: 0,
          pageheap_committed_bytes: 6449430528,
          pageheap_scavenge_count: 325933,
          pageheap_commit_count: 1506793,
          pageheap_total_commit_bytes: 113299984384,
          pageheap_decommit_count: 325933,
          pageheap_total_decommit_bytes: 106850553856,
          pageheap_reserve_count: 6161,
          pageheap_total_reserve_bytes: 6611714048,
          spinlock_total_delay_ns: 163476210201,
          release_rate: 1,
          formattedString:
            '------------------------------------------------\nMALLOC:     4897388896 ( 4670.5 MiB) Bytes in use by application\nMALLOC: +   1368530944 ( 1305.1 MiB) Bytes in page heap freelist\nMALLOC: +     76414576 (   72.9 MiB) Bytes in central cache freelist\nMALLOC: +        16384 (    0.0 MiB) Bytes in transfer cache freelist\nMALLOC: +    107079728 (  102.1 MiB) Bytes in thread cache freelists\nMALLOC: +     28835840 (   27.5 MiB) Bytes in malloc metadata\nMALLOC:   ------------\nMALLOC: =   6478266368 ( 6178.2 MiB) Actual memory used (physical + swap)\nMALLOC: +    162283520 (  154.8 MiB) Bytes released to OS (aka unmapped)\nMALLOC:   ------------\nMALLOC: =   6640549888 ( 6332.9 MiB) Virtual address space used\nMALLOC:\nMALLOC:         139692              Spans in use\nMALLOC:            519              Thread heaps in use\nMALLOC:           4096              Tcmalloc page size\n------------------------------------------------\nCall ReleaseFreeMemory() to release freelist memory to the OS (via madvise()).\nBytes released to the OS take up virtual address space but no physical memory.\n'
        }
      },
      tenantMigrations: {
        currentMigrationsDonating: 0,
        currentMigrationsReceiving: 0,
        totalSuccessfulMigrationsDonated: 0,
        totalSuccessfulMigrationsReceived: 0,
        totalFailedMigrationsDonated: 0,
        totalFailedMigrationsReceived: 0
      },
      trafficRecording: {
        running: false
      },
      transactions: {
        retriedCommandsCount: 0,
        retriedStatementsCount: 0,
        transactionsCollectionWriteCount: 5434416,
        currentActive: 0,
        currentInactive: 0,
        currentOpen: 0,
        totalAborted: 0,
        totalCommitted: 10,
        totalStarted: 10,
        totalPrepared: 0,
        totalPreparedThenCommitted: 0,
        totalPreparedThenAborted: 0,
        currentPrepared: 0,
        lastCommittedTransaction: {
          operationCount: 1,
          oplogOperationBytes: 448,
          writeConcern: {
            w: 'majority',
            wtimeout: 0,
            provenance: 'implicitDefault'
          }
        }
      },
      transportSecurity: {
        1.0: 0,
        1.1: 0,
        1.2: 0,
        1.3: 0,
        unknown: 0
      },
      twoPhaseCommitCoordinator: {
        totalCreated: 0,
        totalStartedTwoPhaseCommit: 0,
        totalAbortedTwoPhaseCommit: 0,
        totalCommittedTwoPhaseCommit: 0,
        currentInSteps: {
          writingParticipantList: 0,
          waitingForVotes: 0,
          writingDecision: 0,
          waitingForDecisionAcks: 0,
          deletingCoordinatorDoc: 0
        }
      },
      wiredTiger: {
        uri: 'statistics:',
        autocommit: {
          'retries for readonly operations': 0,
          'retries for update operations': 0
        },
        'block-cache': {
          'cached blocks updated': 0,
          'cached bytes updated': 0,
          'evicted blocks': 0,
          'file size causing bypass': 0,
          lookups: 0,
          'number of blocks not evicted due to overhead': 0,
          'number of bypasses because no-write-allocate setting was on': 0,
          'number of bypasses due to overhead on put': 0,
          'number of bypasses on get': 0,
          'number of bypasses on put because file is too small': 0,
          'number of eviction passes': 0,
          'number of hits': 0,
          'number of misses': 0,
          'number of put bypasses on checkpoint I/O': 0,
          'removed blocks': 0,
          'total blocks': 0,
          'total blocks inserted on read path': 0,
          'total blocks inserted on write path': 0,
          'total bytes': 0,
          'total bytes inserted on read path': 0,
          'total bytes inserted on write path': 0
        },
        'block-manager': {
          'blocks pre-loaded': 2084,
          'blocks read': 491944611,
          'blocks written': 582219315,
          'bytes read': 4153167941632,
          'bytes read via memory map API': 0,
          'bytes read via system call API': 0,
          'bytes written': 4962689265664,
          'bytes written for checkpoint': 610427797504,
          'bytes written via memory map API': 0,
          'bytes written via system call API': 0,
          'mapped blocks read': 0,
          'mapped bytes read': 0,
          'number of times the file was remapped because it changed size via fallocate or truncate': 0,
          'number of times the region was remapped via write': 0
        },
        cache: {
          'application threads page read from disk to cache count': 92037076,
          'application threads page read from disk to cache time (usecs)': 571368265,
          'application threads page write from cache to disk count': 73854568,
          'application threads page write from cache to disk time (usecs)': 1215496897,
          'bytes allocated for updates': 206431676,
          'bytes belonging to page images in the cache': 4650274903,
          'bytes belonging to the history store table in the cache': 833582884,
          'bytes currently in the cache': 4999502159,
          'bytes dirty in the cache cumulative': 30490046939061,
          'bytes not belonging to page images in the cache': 349227255,
          'bytes read into cache': 23999737590038,
          'bytes written from cache': 26845769238579,
          'checkpoint blocked page eviction': 2455433,
          'checkpoint of history store file blocked non-history store page eviction': 0,
          'eviction calls to get a page': 585648868,
          'eviction calls to get a page found queue empty': 1466395,
          'eviction calls to get a page found queue empty after locking': 27300719,
          'eviction currently operating in aggressive mode': 0,
          'eviction empty score': 0,
          'eviction gave up due to detecting an out of order on disk value behind the last update on the chain': 0,
          'eviction gave up due to detecting an out of order tombstone ahead of the selected on disk update': 0,
          'eviction gave up due to detecting an out of order tombstone ahead of the selected on disk update after validating the update chain': 0,
          'eviction gave up due to detecting out of order timestamps on the update chain after the selected on disk update': 0,
          'eviction gave up due to needing to remove a record from the history store but checkpoint is running': 0,
          'eviction passes of a file': 601127052,
          'eviction server candidate queue empty when topping up': 691393,
          'eviction server candidate queue not empty when topping up': 42688020,
          'eviction server evicting pages': 0,
          'eviction server slept, because we did not make progress with eviction': 33218854,
          'eviction server unable to reach eviction goal': 0,
          'eviction server waiting for a leaf page': 2219,
          'eviction state': 64,
          'eviction walk most recent sleeps for checkpoint handle gathering': 9914,
          'eviction walk target pages histogram - 0-9': 508423903,
          'eviction walk target pages histogram - 10-31': 40844105,
          'eviction walk target pages histogram - 128 and higher': 0,
          'eviction walk target pages histogram - 32-63': 20298207,
          'eviction walk target pages histogram - 64-128': 31560837,
          'eviction walk target pages reduced due to history store cache pressure': 0,
          'eviction walk target strategy both clean and dirty pages': 0,
          'eviction walk target strategy only clean pages': 0,
          'eviction walk target strategy only dirty pages': 601127052,
          'eviction walks abandoned': 1190213,
          'eviction walks gave up because they restarted their walk twice': 509885571,
          'eviction walks gave up because they saw too many pages and found no candidates': 1822772,
          'eviction walks gave up because they saw too many pages and found too few candidates': 546501,
          'eviction walks reached end of tree': 1035771964,
          'eviction walks restarted': 0,
          'eviction walks started from root of tree': 518284395,
          'eviction walks started from saved location in tree': 82842657,
          'eviction worker thread active': 4,
          'eviction worker thread created': 0,
          'eviction worker thread evicting pages': 556812978,
          'eviction worker thread removed': 0,
          'eviction worker thread stable number': 0,
          'files with active eviction walks': 0,
          'files with new eviction walks started': 525886393,
          'force re-tuning of eviction workers once in a while': 0,
          'forced eviction - do not retry count to evict pages selected to evict during reconciliation': 0,
          'forced eviction - history store pages failed to evict while session has history store cursor open': 0,
          'forced eviction - history store pages selected while session has history store cursor open': 2,
          'forced eviction - history store pages successfully evicted while session has history store cursor open': 2,
          'forced eviction - pages evicted that were clean count': 0,
          'forced eviction - pages evicted that were clean time (usecs)': 0,
          'forced eviction - pages evicted that were dirty count': 65064,
          'forced eviction - pages evicted that were dirty time (usecs)': 38373302,
          'forced eviction - pages selected because of a large number of updates to a single item': 5,
          'forced eviction - pages selected because of too many deleted items count': 2481,
          'forced eviction - pages selected count': 119590,
          'forced eviction - pages selected unable to be evicted count': 54526,
          'forced eviction - pages selected unable to be evicted time': 99273,
          'hazard pointer blocked page eviction': 261255,
          'hazard pointer check calls': 560236391,
          'hazard pointer check entries walked': 3910558175,
          'hazard pointer maximum array length': 2,
          'history store table insert calls': 1957945028,
          'history store table insert calls that returned restart': 0,
          'history store table max on-disk size': 0,
          'history store table on-disk size': 498024448,
          'history store table out-of-order resolved updates that lose their durable timestamp': 0,
          'history store table out-of-order updates that were fixed up by reinserting with the fixed timestamp': 0,
          'history store table reads': 11,
          'history store table reads missed': 22,
          'history store table reads requiring squashed modifies': 0,
          'history store table truncation by rollback to stable to remove an unstable update': 0,
          'history store table truncation by rollback to stable to remove an update': 0,
          'history store table truncation to remove an update': 4,
          'history store table truncation to remove range of updates due to key being removed from the data page during reconciliation': 0,
          'history store table truncation to remove range of updates due to out-of-order timestamp update on data page': 0,
          'history store table writes requiring squashed modifies': 880,
          'in-memory page passed criteria to be split': 192859,
          'in-memory page splits': 65158,
          'internal pages evicted': 46428,
          'internal pages queued for eviction': 51870,
          'internal pages seen by eviction walk': 109862504,
          'internal pages seen by eviction walk that are already queued': 12426,
          'internal pages split during eviction': 411,
          'leaf pages split during eviction': 257340,
          'maximum bytes configured': 8589934592,
          'maximum milliseconds spent at a single eviction': 38,
          'maximum page size seen at eviction': 8473570,
          'modified pages evicted': 525135871,
          'modified pages evicted by application threads': 0,
          'operations timed out waiting for space in cache': 0,
          'overflow pages read into cache': 0,
          'page split during eviction deepened the tree': 0,
          'page written requiring history store records': 67548978,
          'pages currently held in the cache': 46600,
          'pages evicted by application threads': 0,
          'pages evicted in parallel with checkpoint': 108715338,
          'pages queued for eviction': 4274928693,
          'pages queued for eviction post lru sorting': 4284893214,
          'pages queued for urgent eviction': 29286334,
          'pages queued for urgent eviction during walk': 35648,
          'pages queued for urgent eviction from history store due to high dirty content': 0,
          'pages read into cache': 491775902,
          'pages read into cache after truncate': 811,
          'pages read into cache after truncate in prepare state': 0,
          'pages removed from the ordinary queue to be queued for urgent eviction': 22,
          'pages requested from the cache': 41925502691,
          'pages seen by eviction walk': 12695996375,
          'pages seen by eviction walk that are already queued': 741511602,
          'pages selected for eviction unable to be evicted': 2795147,
          'pages selected for eviction unable to be evicted because of active children on an internal page': 67350,
          'pages selected for eviction unable to be evicted because of failure in reconciliation': 94,
          'pages selected for eviction unable to be evicted because of race between checkpoint and out of order timestamps handling': 0,
          'pages walked for eviction': 23015800701,
          'pages written from cache': 581881441,
          'pages written requiring in-memory restoration': 62244751,
          'percentage overhead': 8,
          'skip dirty pages during a running checkpoint': 310979143,
          'skip pages that are written with transactions greater than the last running': 2707186,
          'skip pages that previously failed eviction and likely will again': 5676,
          'the number of times full update inserted to history store': 668762100,
          'the number of times reverse modify inserted to history store': 1289182928,
          'total milliseconds spent inside reentrant history store evictions in a reconciliation': 0,
          'tracked bytes belonging to internal pages in the cache': 6638049,
          'tracked bytes belonging to leaf pages in the cache': 4992864110,
          'tracked dirty bytes in the cache': 429880496,
          'tracked dirty pages in the cache': 6018,
          'unmodified pages evicted': 32305384
        },
        capacity: {
          'background fsync file handles considered': 0,
          'background fsync file handles synced': 0,
          'background fsync time (msecs)': 0,
          'bytes read': 4151798386688,
          'bytes written for checkpoint': 397401846286,
          'bytes written for eviction': 3005083778657,
          'bytes written for log': 513388623872,
          'bytes written total': 3915873063372,
          'threshold to call fsync': 0,
          'time waiting due to total capacity (usecs)': 0,
          'time waiting during checkpoint (usecs)': 0,
          'time waiting during eviction (usecs)': 0,
          'time waiting during logging (usecs)': 0,
          'time waiting during read (usecs)': 0
        },
        'checkpoint-cleanup': {
          'pages added for eviction': 30787832,
          'pages removed': 275267,
          'pages skipped during tree walk': 122638578,
          'pages visited': 480411077
        },
        connection: {
          'auto adjusting condition resets': 2767531,
          'auto adjusting condition wait calls': 5932924,
          'auto adjusting condition wait raced to update timeout and skipped updating': 0,
          'detected system time went backwards': 0,
          'files currently open': 352,
          'hash bucket array size for data handles': 512,
          'hash bucket array size general': 512,
          'memory allocations': 30850527462,
          'memory frees': 30850497598,
          'memory re-allocations': 386227431,
          'pthread mutex condition wait calls': 47529120,
          'pthread mutex shared lock read-lock calls': 17902907288,
          'pthread mutex shared lock write-lock calls': 229090749,
          'total fsync I/Os': 10869963,
          'total read I/Os': 491959846,
          'total write I/Os': 597305443
        },
        cursor: {
          'Total number of entries skipped by cursor next calls': 1808240544,
          'Total number of entries skipped by cursor prev calls': 1352761,
          'Total number of entries skipped to position the history store cursor': 0,
          'Total number of times a search near has exited due to prefix config': 810,
          'cached cursor count': 1599,
          'cursor bulk loaded cursor insert calls': 9,
          'cursor close calls that result in cache': 302229777,
          'cursor create calls': 180394,
          'cursor insert calls': 1986094179,
          'cursor insert key and value bytes': 501209541349,
          'cursor modify calls': 3251974086,
          'cursor modify key and value bytes affected': 3329514613288,
          'cursor modify value bytes modified': 20427672310,
          'cursor next calls': 24705958221,
          'cursor next calls that skip due to a globally visible history store tombstone': 0,
          'cursor next calls that skip greater than or equal to 100 entries': 84291,
          'cursor next calls that skip less than 100 entries': 24705722502,
          'cursor operation restarted': 145471,
          'cursor prev calls': 28667120,
          'cursor prev calls that skip due to a globally visible history store tombstone': 0,
          'cursor prev calls that skip greater than or equal to 100 entries': 98,
          'cursor prev calls that skip less than 100 entries': 28666974,
          'cursor remove calls': 19757436,
          'cursor remove key bytes removed': 340788096,
          'cursor reserve calls': 0,
          'cursor reset calls': 17426723029,
          'cursor search calls': 11065457030,
          'cursor search history store calls': 33,
          'cursor search near calls': 3981442329,
          'cursor sweep buckets': 54391649,
          'cursor sweep cursors closed': 416,
          'cursor sweep cursors examined': 6703364,
          'cursor sweeps': 3938135,
          'cursor truncate calls': 10778,
          'cursor update calls': 0,
          'cursor update key and value bytes': 0,
          'cursor update value size change': 728264,
          'cursors reused from cache': 302227745,
          'open cursor count': 31
        },
        'data-handle': {
          'connection data handle size': 440,
          'connection data handles currently active': 697,
          'connection sweep candidate became referenced': 0,
          'connection sweep dhandles closed': 0,
          'connection sweep dhandles removed from hash list': 162732,
          'connection sweep time-of-death sets': 1983236,
          'connection sweeps': 50228,
          'connection sweeps skipped due to checkpoint gathering handles': 3,
          'session dhandles swept': 363743,
          'session sweep attempts': 864179
        },
        lock: {
          'checkpoint lock acquisitions': 7866,
          'checkpoint lock application thread wait time (usecs)': 193,
          'checkpoint lock internal thread wait time (usecs)': 0,
          'dhandle lock application thread time waiting (usecs)': 40897,
          'dhandle lock internal thread time waiting (usecs)': 3025,
          'dhandle read lock acquisitions': 630277680,
          'dhandle write lock acquisitions': 327040,
          'durable timestamp queue lock application thread time waiting (usecs)': 0,
          'durable timestamp queue lock internal thread time waiting (usecs)': 0,
          'durable timestamp queue read lock acquisitions': 0,
          'durable timestamp queue write lock acquisitions': 0,
          'metadata lock acquisitions': 7865,
          'metadata lock application thread wait time (usecs)': 158,
          'metadata lock internal thread wait time (usecs)': 0,
          'read timestamp queue lock application thread time waiting (usecs)': 0,
          'read timestamp queue lock internal thread time waiting (usecs)': 0,
          'read timestamp queue read lock acquisitions': 0,
          'read timestamp queue write lock acquisitions': 0,
          'schema lock acquisitions': 10268,
          'schema lock application thread wait time (usecs)': 7685883,
          'schema lock internal thread wait time (usecs)': 0,
          'table lock application thread time waiting for the table lock (usecs)': 49830,
          'table lock internal thread time waiting for the table lock (usecs)': 1999822,
          'table read lock acquisitions': 0,
          'table write lock acquisitions': 2972,
          'txn global lock application thread time waiting (usecs)': 2872780,
          'txn global lock internal thread time waiting (usecs)': 3076460,
          'txn global read lock acquisitions': 343292390,
          'txn global write lock acquisitions': 228015092
        },
        log: {
          'busy returns attempting to switch slots': 317045,
          'force log remove time sleeping (usecs)': 0,
          'log bytes of payload data': 504828255409,
          'log bytes written': 512129726976,
          'log files manually zero-filled': 0,
          'log flush operations': 13448276,
          'log force write operations': 16912690,
          'log force write operations skipped': 3620547,
          'log records compressed': 1952714279,
          'log records not compressed': 7591838,
          'log records too small to compress': 10682869,
          'log release advances write LSN': 9663,
          'log scan operations': 6,
          'log scan records requiring two reads': 0,
          'log server thread advances write LSN': 15058040,
          'log server thread write LSN walk skipped': 118791592,
          'log sync operations': 10663995,
          'log sync time duration (usecs)': 21274685326,
          'log sync_dir operations': 4894,
          'log sync_dir time duration (usecs)': 12367311,
          'log write operations': 1970988965,
          'logging bytes consolidated': 512128502400,
          'maximum log file size': 104857600,
          'number of pre-allocated log files to create': 2,
          'pre-allocated log files not ready and missed': 1,
          'pre-allocated log files prepared': 4895,
          'pre-allocated log files used': 4893,
          'records processed by log scan': 15,
          'slot close lost race': 0,
          'slot close unbuffered waits': 0,
          'slot closures': 15067703,
          'slot join atomic update races': 11631,
          'slot join calls atomic updates raced': 11628,
          'slot join calls did not yield': 1970939020,
          'slot join calls found active slot closed': 38350,
          'slot join calls slept': 62,
          'slot join calls yielded': 49974,
          'slot join found active slot closed': 616310,
          'slot joins yield time (usecs)': 2472318,
          'slot transitions unable to find free slot': 0,
          'slot unbuffered writes': 8,
          'total in-memory size of compressed records': 537731229125,
          'total log buffer size': 33554432,
          'total size of compressed records': 501852175954,
          'written slots coalesced': 0,
          'yields waiting for previous log file close': 0
        },
        perf: {
          'file system read latency histogram (bucket 1) - 10-49ms': 375,
          'file system read latency histogram (bucket 2) - 50-99ms': 5,
          'file system read latency histogram (bucket 3) - 100-249ms': 6,
          'file system read latency histogram (bucket 4) - 250-499ms': 0,
          'file system read latency histogram (bucket 5) - 500-999ms': 0,
          'file system read latency histogram (bucket 6) - 1000ms+': 0,
          'file system write latency histogram (bucket 1) - 10-49ms': 17013,
          'file system write latency histogram (bucket 2) - 50-99ms': 338,
          'file system write latency histogram (bucket 3) - 100-249ms': 123,
          'file system write latency histogram (bucket 4) - 250-499ms': 11,
          'file system write latency histogram (bucket 5) - 500-999ms': 0,
          'file system write latency histogram (bucket 6) - 1000ms+': 0,
          'operation read latency histogram (bucket 1) - 100-249us': 4789214,
          'operation read latency histogram (bucket 2) - 250-499us': 498103,
          'operation read latency histogram (bucket 3) - 500-999us': 201691,
          'operation read latency histogram (bucket 4) - 1000-9999us': 189293,
          'operation read latency histogram (bucket 5) - 10000us+': 15274,
          'operation write latency histogram (bucket 1) - 100-249us': 206469,
          'operation write latency histogram (bucket 2) - 250-499us': 51225,
          'operation write latency histogram (bucket 3) - 500-999us': 38549,
          'operation write latency histogram (bucket 4) - 1000-9999us': 35396,
          'operation write latency histogram (bucket 5) - 10000us+': 7656
        },
        reconciliation: {
          'approximate byte size of timestamps in pages written': 99154515144,
          'approximate byte size of transaction IDs in pages written': 49809237072,
          'fast-path pages deleted': 4207002,
          'leaf-page overflow keys': 0,
          'maximum milliseconds spent in a reconciliation call': 0,
          'maximum milliseconds spent in building a disk image in a reconciliation': 27,
          'maximum milliseconds spent in moving updates to the history store in a reconciliation': 5,
          'page reconciliation calls': 576993896,
          'page reconciliation calls for eviction': 504601924,
          'page reconciliation calls that resulted in values with prepared transaction metadata': 0,
          'page reconciliation calls that resulted in values with timestamps': 67881540,
          'page reconciliation calls that resulted in values with transaction ids': 67959809,
          'pages deleted': 53454,
          'pages written including an aggregated newest start durable timestamp ': 941671,
          'pages written including an aggregated newest stop durable timestamp ': 845831,
          'pages written including an aggregated newest stop timestamp ': 830151,
          'pages written including an aggregated newest stop transaction ID': 830151,
          'pages written including an aggregated newest transaction ID ': 997874,
          'pages written including an aggregated oldest start timestamp ': 204846,
          'pages written including an aggregated prepare': 0,
          'pages written including at least one prepare state': 0,
          'pages written including at least one start durable timestamp': 575740493,
          'pages written including at least one start timestamp': 575740204,
          'pages written including at least one start transaction ID': 575880184,
          'pages written including at least one stop durable timestamp': 508203759,
          'pages written including at least one stop timestamp': 508205903,
          'pages written including at least one stop transaction ID': 508205903,
          'records written including a prepare state': 0,
          'records written including a start durable timestamp': 3181455886,
          'records written including a start timestamp': 3181453809,
          'records written including a start transaction ID': 3210390691,
          'records written including a stop durable timestamp': 3015643789,
          'records written including a stop timestamp': 3015766783,
          'records written including a stop transaction ID': 3015766783,
          'split bytes currently awaiting free': 0,
          'split objects currently awaiting free': 0
        },
        session: {
          'attempts to remove a local object and the object is in use': 0,
          'flush_tier operation calls': 0,
          'flush_tier tables skipped due to no checkpoint': 0,
          'flush_tier tables switched': 0,
          'local objects removed': 0,
          'open session count': 34,
          'session query timestamp calls': 1,
          'table alter failed calls': 0,
          'table alter successful calls': 0,
          'table alter triggering checkpoint calls': 0,
          'table alter unchanged and skipped': 0,
          'table compact failed calls': 0,
          'table compact failed calls due to cache pressure': 0,
          'table compact running': 0,
          'table compact skipped as process would not reduce file size': 0,
          'table compact successful calls': 0,
          'table compact timeout': 0,
          'table create failed calls': 0,
          'table create successful calls': 923,
          'table drop failed calls': 0,
          'table drop successful calls': 875,
          'table rename failed calls': 0,
          'table rename successful calls': 0,
          'table salvage failed calls': 0,
          'table salvage successful calls': 0,
          'table truncate failed calls': 0,
          'table truncate successful calls': 10778,
          'table verify failed calls': 0,
          'table verify successful calls': 0,
          'tiered operations dequeued and processed': 0,
          'tiered operations scheduled': 0,
          'tiered storage local retention time (secs)': 0
        },
        'thread-state': {
          'active filesystem fsync calls': 0,
          'active filesystem read calls': 0,
          'active filesystem write calls': 0
        },
        'thread-yield': {
          'application thread time evicting (usecs)': 0,
          'application thread time waiting for cache (usecs)': 0,
          'connection close blocked waiting for transaction state stabilization': 0,
          'connection close yielded for lsm manager shutdown': 0,
          'data handle lock yielded': 3970,
          'get reference for page index and slot time sleeping (usecs)': 0,
          'page access yielded due to prepare state change': 0,
          'page acquire busy blocked': 10027,
          'page acquire eviction blocked': 59176,
          'page acquire locked blocked': 1689479,
          'page acquire read blocked': 75449,
          'page acquire time sleeping (usecs)': 640593700,
          'page delete rollback time sleeping for state change (usecs)': 0,
          'page reconciliation yielded due to child modification': 27845
        },
        transaction: {
          'Number of prepared updates': 0,
          'Number of prepared updates committed': 0,
          'Number of prepared updates repeated on the same key': 0,
          'Number of prepared updates rolled back': 0,
          'a reader raced with a prepared transaction commit and skipped an update or updates': 0,
          'checkpoint has acquired a snapshot for its transaction': 0,
          'oldest pinned transaction ID rolled back for eviction': 0,
          'prepared transactions': 0,
          'prepared transactions committed': 0,
          'prepared transactions currently active': 0,
          'prepared transactions rolled back': 0,
          'query timestamp calls': 1683670042,
          'race to read prepared update retry': 0,
          'rollback to stable calls': 0,
          'rollback to stable history store records with stop timestamps older than newer records': 0,
          'rollback to stable inconsistent checkpoint': 0,
          'rollback to stable keys removed': 0,
          'rollback to stable keys restored': 0,
          'rollback to stable pages visited': 0,
          'rollback to stable restored tombstones from history store': 0,
          'rollback to stable restored updates from history store': 0,
          'rollback to stable skipping delete rle': 0,
          'rollback to stable skipping stable rle': 0,
          'rollback to stable sweeping history store keys': 0,
          'rollback to stable tree walk skipping pages': 0,
          'rollback to stable updates aborted': 0,
          'rollback to stable updates removed from history store': 0,
          'sessions scanned in each walk of concurrent sessions': 356799688172,
          'set timestamp calls': 22609095,
          'set timestamp durable calls': 0,
          'set timestamp durable updates': 0,
          'set timestamp oldest calls': 10633574,
          'set timestamp oldest updates': 10633574,
          'set timestamp stable calls': 11975521,
          'set timestamp stable updates': 10633574,
          'transaction begins': 7217952481,
          'transaction checkpoint currently running': 0,
          'transaction checkpoint currently running for history store file': 0,
          'transaction checkpoint generation': 7866,
          'transaction checkpoint history store file duration (usecs)': 1071744,
          'transaction checkpoint max time (msecs)': 9610,
          'transaction checkpoint min time (msecs)': 54,
          'transaction checkpoint most recent duration for gathering all handles (usecs)': 1816,
          'transaction checkpoint most recent duration for gathering applied handles (usecs)': 271,
          'transaction checkpoint most recent duration for gathering skipped handles (usecs)': 679,
          'transaction checkpoint most recent handles applied': 20,
          'transaction checkpoint most recent handles skipped': 328,
          'transaction checkpoint most recent handles walked': 716,
          'transaction checkpoint most recent time (msecs)': 3539,
          'transaction checkpoint prepare currently running': 0,
          'transaction checkpoint prepare max time (msecs)': 53,
          'transaction checkpoint prepare min time (msecs)': 0,
          'transaction checkpoint prepare most recent time (msecs)': 1,
          'transaction checkpoint prepare total time (msecs)': 22993,
          'transaction checkpoint scrub dirty target': 0,
          'transaction checkpoint scrub time (msecs)': 100,
          'transaction checkpoint stop timing stress active': 0,
          'transaction checkpoint total time (msecs)': 22005358,
          'transaction checkpoints': 7865,
          'transaction checkpoints due to obsolete pages': 4076,
          'transaction checkpoints skipped because database was clean': 0,
          'transaction fsync calls for checkpoint after allocating the transaction ID': 7865,
          'transaction fsync duration for checkpoint after allocating the transaction ID (usecs)': 703274,
          'transaction range of IDs currently pinned': 45,
          'transaction range of IDs currently pinned by a checkpoint': 0,
          'transaction range of timestamps currently pinned': 1288490188922,
          'transaction range of timestamps pinned by a checkpoint':
            '7333161611399528584',
          'transaction range of timestamps pinned by the oldest active read timestamp': 0,
          'transaction range of timestamps pinned by the oldest timestamp': 1288490188922,
          'transaction read timestamp of the oldest active reader': 0,
          'transaction rollback to stable currently running': 0,
          'transaction walk of concurrent sessions': 9508786487,
          'transactions committed': 1970940703,
          'transactions rolled back': 5246951124,
          'update conflicts': 429
        },
        concurrentTransactions: {
          write: {
            out: 1,
            available: 127,
            totalTickets: 128
          },
          read: {
            out: 0,
            available: 128,
            totalTickets: 128
          }
        },
        'snapshot-window-settings': {
          'total number of SnapshotTooOld errors': 0,
          'minimum target snapshot window size in seconds': 300,
          'current available snapshot window size in seconds': 300,
          'latest majority snapshot timestamp available': 'Feb  8 10:32:18:14',
          'oldest majority snapshot timestamp available': 'Feb  8 10:27:18:14',
          'pinned timestamp requests': 0,
          'min pinned timestamp': '-1'
        },
        oplog: {
          'visibility timestamp': '7333161611399528586'
        }
      },
      mem: {
        bits: 64,
        resident: 6169,
        virtual: 9543,
        supported: true
      },
      metrics: {
        apiVersions: {
          'SYSTRAN / TRS-Console / user': ['default'],
          'SYSTRAN / SES-Console / information': ['default'],
          'SYSTRAN / SES-Console / feedbacks': ['default'],
          'SYSTRAN / SES-Console / settings': ['default'],
          '': ['default'],
          'SYSTRAN / SES-Console / Resources': ['default'],
          'SYSTRAN / SES-Console / production': ['default'],
          'SYSTRAN / SES-Console / notifications': ['default'],
          'SYSTRAN / SES-Console / user': ['default'],
          'SYSTRAN / SES-Console / translationResource': ['default'],
          'SYSTRAN / SES-Console / Profiles': ['default'],
          'SYSTRAN / SES-Console / stats': ['default'],
          'SYSTRAN / TRS-Console / TRSL': ['default']
        },
        aggStageCounters: {
          $_addReshardingResumeId: 0,
          $_internalAllCollectionStats: 0,
          $_internalApplyOplogUpdate: 0,
          $_internalBoundedSort: 0,
          $_internalChangeStreamAddPostImage: 0,
          $_internalChangeStreamAddPreImage: 0,
          $_internalChangeStreamCheckInvalidate: 0,
          $_internalChangeStreamCheckResumability: 0,
          $_internalChangeStreamCheckTopologyChange: 0,
          $_internalChangeStreamOplogMatch: 0,
          $_internalChangeStreamTransform: 0,
          $_internalChangeStreamUnwindTransaction: 0,
          $_internalComputeGeoNearDistance: 0,
          $_internalConvertBucketIndexStats: 0,
          $_internalDensify: 0,
          $_internalFindAndModifyImageLookup: 0,
          $_internalInhibitOptimization: 0,
          $_internalReshardingIterateTransaction: 0,
          $_internalReshardingOwnershipMatch: 0,
          $_internalSetWindowFields: 0,
          $_internalShredDocuments: 0,
          $_internalSplitPipeline: 0,
          $_internalStreamingGroup: 0,
          $_internalUnpackBucket: 0,
          $_unpackBucket: 0,
          $addFields: 0,
          $bucket: 0,
          $bucketAuto: 0,
          $changeStream: 11,
          $changeStreamSplitLargeEvent: 0,
          $collStats: 0,
          $count: 2,
          $currentOp: 0,
          $densify: 0,
          $documents: 0,
          $facet: 2,
          $fill: 0,
          $geoNear: 0,
          $graphLookup: 0,
          $group: 100375,
          $indexStats: 0,
          $limit: 95488,
          $listCachedAndActiveUsers: 0,
          $listCatalog: 0,
          $listLocalSessions: 0,
          $listSearchIndexes: 0,
          $listSessions: 0,
          $lookup: 0,
          $match: 100384,
          $merge: 0,
          $mergeCursors: 0,
          $operationMetrics: 0,
          $out: 0,
          $planCacheStats: 0,
          $project: 4605,
          $queue: 0,
          $redact: 0,
          $replaceRoot: 0,
          $replaceWith: 0,
          $sample: 0,
          $search: 0,
          $searchMeta: 0,
          $set: 194237,
          $setVariableFromSubPipeline: 0,
          $setWindowFields: 0,
          $shardedDataDistribution: 0,
          $skip: 19,
          $sort: 79,
          $sortByCount: 0,
          $unionWith: 0,
          $unset: 0,
          $unwind: 20,
          $vectorSearch: 0
        },
        changeStreams: {
          largeEventsFailed: 0,
          largeEventsSplit: 0
        },
        commands: {
          '<UNKNOWN>': 1,
          _addShard: {
            failed: 0,
            total: 0
          },
          _configsvrAbortReshardCollection: {
            failed: 0,
            total: 0
          },
          _configsvrAddShard: {
            failed: 0,
            total: 0
          },
          _configsvrAddShardToZone: {
            failed: 0,
            total: 0
          },
          _configsvrBalancerCollectionStatus: {
            failed: 0,
            total: 0
          },
          _configsvrBalancerStart: {
            failed: 0,
            total: 0
          },
          _configsvrBalancerStatus: {
            failed: 0,
            total: 0
          },
          _configsvrBalancerStop: {
            failed: 0,
            total: 0
          },
          _configsvrCleanupReshardCollection: {
            failed: 0,
            total: 0
          },
          _configsvrClearJumboFlag: {
            failed: 0,
            total: 0
          },
          _configsvrCollMod: {
            failed: 0,
            total: 0
          },
          _configsvrCommitChunkMigration: {
            failed: 0,
            total: 0
          },
          _configsvrCommitChunkSplit: {
            failed: 0,
            total: 0
          },
          _configsvrCommitChunksMerge: {
            failed: 0,
            total: 0
          },
          _configsvrCommitMovePrimary: {
            failed: 0,
            total: 0
          },
          _configsvrCommitReshardCollection: {
            failed: 0,
            total: 0
          },
          _configsvrConfigureCollectionBalancing: {
            failed: 0,
            total: 0
          },
          _configsvrCreateDatabase: {
            failed: 0,
            total: 0
          },
          _configsvrEnsureChunkVersionIsGreaterThan: {
            failed: 0,
            total: 0
          },
          _configsvrMoveChunk: {
            failed: 0,
            total: 0
          },
          _configsvrMoveRange: {
            failed: 0,
            total: 0
          },
          _configsvrRefineCollectionShardKey: {
            failed: 0,
            total: 0
          },
          _configsvrRemoveChunks: {
            failed: 0,
            total: 0
          },
          _configsvrRemoveShard: {
            failed: 0,
            total: 0
          },
          _configsvrRemoveShardFromZone: {
            failed: 0,
            total: 0
          },
          _configsvrRemoveTags: {
            failed: 0,
            total: 0
          },
          _configsvrRenameCollectionMetadata: {
            failed: 0,
            total: 0
          },
          _configsvrRepairShardedCollectionChunksHistory: {
            failed: 0,
            total: 0
          },
          _configsvrReshardCollection: {
            failed: 0,
            total: 0
          },
          _configsvrRunRestore: {
            failed: 0,
            total: 0
          },
          _configsvrSetAllowMigrations: {
            failed: 0,
            total: 0
          },
          _configsvrSetClusterParameter: {
            failed: 0,
            total: 0
          },
          _configsvrSetUserWriteBlockMode: {
            failed: 0,
            total: 0
          },
          _configsvrUpdateZoneKeyRange: {
            failed: 0,
            total: 0
          },
          _flushDatabaseCacheUpdates: {
            failed: 0,
            total: 0
          },
          _flushDatabaseCacheUpdatesWithWriteConcern: {
            failed: 0,
            total: 0
          },
          _flushReshardingStateChange: {
            failed: 0,
            total: 0
          },
          _flushRoutingTableCacheUpdates: {
            failed: 0,
            total: 0
          },
          _flushRoutingTableCacheUpdatesWithWriteConcern: {
            failed: 0,
            total: 0
          },
          _getNextSessionMods: {
            failed: 0,
            total: 0
          },
          _getUserCacheGeneration: {
            failed: 0,
            total: 0
          },
          _isSelf: {
            failed: 0,
            total: 0
          },
          _killOperations: {
            failed: 0,
            total: 0
          },
          _mergeAuthzCollections: {
            failed: 0,
            total: 0
          },
          _migrateClone: {
            failed: 0,
            total: 0
          },
          _recvChunkAbort: {
            failed: 0,
            total: 0
          },
          _recvChunkCommit: {
            failed: 0,
            total: 0
          },
          _recvChunkReleaseCritSec: {
            failed: 0,
            total: 0
          },
          _recvChunkStart: {
            failed: 0,
            total: 0
          },
          _recvChunkStatus: {
            failed: 0,
            total: 0
          },
          _shardsvrAbortReshardCollection: {
            failed: 0,
            total: 0
          },
          _shardsvrCleanupReshardCollection: {
            failed: 0,
            total: 0
          },
          _shardsvrCloneCatalogData: {
            failed: 0,
            total: 0
          },
          _shardsvrCollMod: {
            failed: 0,
            total: 0
          },
          _shardsvrCollModParticipant: {
            failed: 0,
            total: 0
          },
          _shardsvrCommitReshardCollection: {
            failed: 0,
            total: 0
          },
          _shardsvrCompactStructuredEncryptionData: {
            failed: 0,
            total: 0
          },
          _shardsvrCreateCollection: {
            failed: 0,
            total: 0
          },
          _shardsvrCreateCollectionParticipant: {
            failed: 0,
            total: 0
          },
          _shardsvrDropCollection: {
            failed: 0,
            total: 0
          },
          _shardsvrDropCollectionIfUUIDNotMatching: {
            failed: 0,
            total: 0
          },
          _shardsvrDropCollectionParticipant: {
            failed: 0,
            total: 0
          },
          _shardsvrDropDatabase: {
            failed: 0,
            total: 0
          },
          _shardsvrDropDatabaseParticipant: {
            failed: 0,
            total: 0
          },
          _shardsvrDropIndexes: {
            failed: 0,
            total: 0
          },
          _shardsvrGetStatsForBalancing: {
            failed: 0,
            total: 0
          },
          _shardsvrJoinMigrations: {
            failed: 0,
            total: 0
          },
          _shardsvrMovePrimary: {
            failed: 0,
            total: 0
          },
          _shardsvrMoveRange: {
            failed: 0,
            total: 0
          },
          _shardsvrParticipantBlock: {
            failed: 0,
            total: 0
          },
          _shardsvrRefineCollectionShardKey: {
            failed: 0,
            total: 0
          },
          _shardsvrRenameCollection: {
            failed: 0,
            total: 0
          },
          _shardsvrRenameCollectionParticipant: {
            failed: 0,
            total: 0
          },
          _shardsvrRenameCollectionParticipantUnblock: {
            failed: 0,
            total: 0
          },
          _shardsvrReshardCollection: {
            failed: 0,
            total: 0
          },
          _shardsvrReshardingOperationTime: {
            failed: 0,
            total: 0
          },
          _shardsvrSetAllowMigrations: {
            failed: 0,
            total: 0
          },
          _shardsvrSetClusterParameter: {
            failed: 0,
            total: 0
          },
          _shardsvrSetUserWriteBlockMode: {
            failed: 0,
            total: 0
          },
          _transferMods: {
            failed: 0,
            total: 0
          },
          abortShardSplit: {
            failed: 0,
            total: 0
          },
          abortTransaction: {
            failed: 0,
            total: 0
          },
          aggregate: {
            failed: 3,
            total: 100365
          },
          appendOplogNote: {
            failed: 0,
            total: 0
          },
          applyOps: {
            failed: 0,
            total: 0
          },
          authenticate: {
            failed: 0,
            total: 0
          },
          autoSplitVector: {
            failed: 0,
            total: 0
          },
          availableQueryOptions: {
            failed: 0,
            total: 0
          },
          buildInfo: {
            failed: 0,
            total: 1
          },
          checkShardingIndex: {
            failed: 0,
            total: 0
          },
          cleanupOrphaned: {
            failed: 0,
            total: 0
          },
          cloneCollectionAsCapped: {
            failed: 0,
            total: 0
          },
          clusterAbortTransaction: {
            failed: 0,
            total: 0
          },
          clusterAggregate: {
            failed: 0,
            total: 0
          },
          clusterCommitTransaction: {
            failed: 0,
            total: 0
          },
          clusterDelete: {
            failed: 0,
            total: 0
          },
          clusterFind: {
            failed: 0,
            total: 0
          },
          clusterGetMore: {
            failed: 0,
            total: 0
          },
          clusterInsert: {
            failed: 0,
            total: 0
          },
          clusterUpdate: {
            arrayFilters: 0,
            failed: 0,
            pipeline: 0,
            total: 0
          },
          collMod: {
            failed: 0,
            total: 0,
            validator: {
              failed: 0,
              jsonSchema: 0,
              total: 0
            }
          },
          collStats: {
            failed: 0,
            total: 0
          },
          commitShardSplit: {
            failed: 0,
            total: 0
          },
          commitTransaction: {
            failed: 0,
            total: 10
          },
          compact: {
            failed: 0,
            total: 0
          },
          compactStructuredEncryptionData: {
            failed: 0,
            total: 0
          },
          connPoolStats: {
            failed: 0,
            total: 0
          },
          connPoolSync: {
            failed: 0,
            total: 0
          },
          connectionStatus: {
            failed: 0,
            total: 0
          },
          convertToCapped: {
            failed: 0,
            total: 0
          },
          coordinateCommitTransaction: {
            failed: 0,
            total: 0
          },
          count: {
            failed: 0,
            total: 4474255
          },
          create: {
            failed: 0,
            total: 0,
            validator: {
              failed: 0,
              jsonSchema: 0,
              total: 0
            }
          },
          createIndexes: {
            failed: 0,
            total: 5584
          },
          createRole: {
            failed: 0,
            total: 0
          },
          createUser: {
            failed: 0,
            total: 1
          },
          currentOp: {
            failed: 0,
            total: 0
          },
          dataSize: {
            failed: 0,
            total: 0
          },
          dbCheck: {
            failed: 0,
            total: 0
          },
          dbHash: {
            failed: 0,
            total: 0
          },
          dbStats: {
            failed: 0,
            total: 0
          },
          delete: {
            failed: 0,
            total: 97069
          },
          distinct: {
            failed: 0,
            total: 680738
          },
          donorAbortMigration: {
            failed: 0,
            total: 0
          },
          donorForgetMigration: {
            failed: 0,
            total: 0
          },
          donorStartMigration: {
            failed: 0,
            total: 0
          },
          driverOIDTest: {
            failed: 0,
            total: 0
          },
          drop: {
            failed: 38,
            total: 156
          },
          dropAllRolesFromDatabase: {
            failed: 0,
            total: 0
          },
          dropAllUsersFromDatabase: {
            failed: 0,
            total: 0
          },
          dropConnections: {
            failed: 0,
            total: 0
          },
          dropDatabase: {
            failed: 0,
            total: 1
          },
          dropIndexes: {
            failed: 0,
            total: 0
          },
          dropRole: {
            failed: 0,
            total: 0
          },
          dropUser: {
            failed: 0,
            total: 1
          },
          endSessions: {
            failed: 0,
            total: 18
          },
          explain: {
            failed: 0,
            total: 0
          },
          features: {
            failed: 0,
            total: 0
          },
          filemd5: {
            failed: 0,
            total: 0
          },
          find: {
            failed: 0,
            total: 5779907
          },
          findAndModify: {
            arrayFilters: 0,
            failed: 2,
            pipeline: 0,
            total: 12232
          },
          flushRouterConfig: {
            failed: 0,
            total: 0
          },
          forgetShardSplit: {
            failed: 0,
            total: 0
          },
          fsync: {
            failed: 0,
            total: 0
          },
          fsyncUnlock: {
            failed: 0,
            total: 0
          },
          getClusterParameter: {
            failed: 0,
            total: 0
          },
          getCmdLineOpts: {
            failed: 0,
            total: 0
          },
          getDatabaseVersion: {
            failed: 0,
            total: 0
          },
          getDefaultRWConcern: {
            failed: 0,
            total: 0
          },
          getDiagnosticData: {
            failed: 0,
            total: 0
          },
          getLastError: {
            failed: 0,
            total: 0
          },
          getLog: {
            failed: 0,
            total: 1
          },
          getMore: {
            failed: 0,
            total: 990401
          },
          getParameter: {
            failed: 0,
            total: 1
          },
          getShardMap: {
            failed: 0,
            total: 0
          },
          getShardVersion: {
            failed: 0,
            total: 0
          },
          getnonce: {
            failed: 0,
            total: 0
          },
          grantPrivilegesToRole: {
            failed: 0,
            total: 0
          },
          grantRolesToRole: {
            failed: 0,
            total: 0
          },
          grantRolesToUser: {
            failed: 0,
            total: 0
          },
          hello: {
            failed: 205,
            total: 3257806
          },
          hostInfo: {
            failed: 0,
            total: 0
          },
          insert: {
            failed: 0,
            total: 3887257
          },
          internalRenameIfOptionsAndIndexesMatch: {
            failed: 0,
            total: 0
          },
          invalidateUserCache: {
            failed: 0,
            total: 0
          },
          isMaster: {
            failed: 0,
            total: 2619130
          },
          killAllSessions: {
            failed: 0,
            total: 0
          },
          killAllSessionsByPattern: {
            failed: 0,
            total: 0
          },
          killCursors: {
            failed: 0,
            total: 6
          },
          killOp: {
            failed: 0,
            total: 0
          },
          killSessions: {
            failed: 0,
            total: 0
          },
          listCollections: {
            failed: 0,
            total: 0
          },
          listCommands: {
            failed: 0,
            total: 0
          },
          listDatabases: {
            failed: 0,
            total: 1
          },
          listIndexes: {
            failed: 0,
            total: 3404
          },
          lockInfo: {
            failed: 0,
            total: 0
          },
          logRotate: {
            failed: 0,
            total: 0
          },
          logout: {
            failed: 0,
            total: 0
          },
          mapReduce: {
            failed: 0,
            total: 0
          },
          mergeChunks: {
            failed: 0,
            total: 0
          },
          ping: {
            failed: 0,
            total: 49669
          },
          planCacheClear: {
            failed: 0,
            total: 0
          },
          planCacheClearFilters: {
            failed: 0,
            total: 0
          },
          planCacheListFilters: {
            failed: 0,
            total: 0
          },
          planCacheSetFilter: {
            failed: 0,
            total: 0
          },
          prepareTransaction: {
            failed: 0,
            total: 0
          },
          profile: {
            failed: 0,
            total: 0
          },
          reIndex: {
            failed: 0,
            total: 0
          },
          recipientForgetMigration: {
            failed: 0,
            total: 0
          },
          recipientSyncData: {
            failed: 0,
            total: 0
          },
          recipientVoteImportedFiles: {
            failed: 0,
            total: 0
          },
          refreshSessions: {
            failed: 0,
            total: 0
          },
          renameCollection: {
            failed: 0,
            total: 0
          },
          replSetAbortPrimaryCatchUp: {
            failed: 0,
            total: 0
          },
          replSetFreeze: {
            failed: 0,
            total: 0
          },
          replSetGetConfig: {
            failed: 0,
            total: 0
          },
          replSetGetRBID: {
            failed: 0,
            total: 0
          },
          replSetGetStatus: {
            failed: 0,
            total: 0
          },
          replSetHeartbeat: {
            failed: 0,
            total: 0
          },
          replSetInitiate: {
            failed: 0,
            total: 0
          },
          replSetMaintenance: {
            failed: 0,
            total: 0
          },
          replSetReconfig: {
            failed: 0,
            total: 0
          },
          replSetRequestVotes: {
            failed: 0,
            total: 0
          },
          replSetResizeOplog: {
            failed: 0,
            total: 0
          },
          replSetStepDown: {
            failed: 0,
            total: 0
          },
          replSetStepDownWithForce: {
            failed: 0,
            total: 0
          },
          replSetStepUp: {
            failed: 0,
            total: 0
          },
          replSetSyncFrom: {
            failed: 0,
            total: 0
          },
          replSetUpdatePosition: {
            failed: 0,
            total: 0
          },
          revokePrivilegesFromRole: {
            failed: 0,
            total: 0
          },
          revokeRolesFromRole: {
            failed: 0,
            total: 0
          },
          revokeRolesFromUser: {
            failed: 0,
            total: 0
          },
          rolesInfo: {
            failed: 0,
            total: 0
          },
          rotateCertificates: {
            failed: 0,
            total: 0
          },
          saslContinue: {
            failed: 0,
            total: 1634
          },
          saslStart: {
            failed: 0,
            total: 2
          },
          serverStatus: {
            failed: 0,
            total: 9
          },
          setClusterParameter: {
            failed: 0,
            total: 0
          },
          setDefaultRWConcern: {
            failed: 0,
            total: 0
          },
          setFeatureCompatibilityVersion: {
            failed: 0,
            total: 0
          },
          setIndexCommitQuorum: {
            failed: 0,
            total: 0
          },
          setParameter: {
            failed: 0,
            total: 0
          },
          setProfilingFilterGlobally: {
            failed: 0,
            total: 0
          },
          setShardVersion: {
            failed: 0,
            total: 0
          },
          setUserWriteBlockMode: {
            failed: 0,
            total: 0
          },
          shardingState: {
            failed: 0,
            total: 0
          },
          shutdown: {
            failed: 0,
            total: 0
          },
          splitChunk: {
            failed: 0,
            total: 0
          },
          splitVector: {
            failed: 0,
            total: 0
          },
          startRecordingTraffic: {
            failed: 0,
            total: 0
          },
          startSession: {
            failed: 0,
            total: 0
          },
          stopRecordingTraffic: {
            failed: 0,
            total: 0
          },
          top: {
            failed: 0,
            total: 0
          },
          update: {
            arrayFilters: 2,
            failed: 0,
            pipeline: 99165,
            total: 8061485
          },
          updateRole: {
            failed: 0,
            total: 0
          },
          updateUser: {
            failed: 0,
            total: 0
          },
          usersInfo: {
            failed: 0,
            total: 0
          },
          validate: {
            failed: 0,
            total: 0
          },
          validateDBMetadata: {
            failed: 0,
            total: 0
          },
          voteCommitIndexBuild: {
            failed: 0,
            total: 1
          },
          waitForFailPoint: {
            failed: 0,
            total: 0
          },
          whatsmyuri: {
            failed: 0,
            total: 0
          }
        },
        cursor: {
          moreThanOneBatch: 173,
          timedOut: 0,
          totalOpened: 100508,
          lifespan: {
            greaterThanOrEqual10Minutes: 4,
            lessThan10Minutes: 2,
            lessThan15Seconds: 0,
            lessThan1Minute: 0,
            lessThan1Second: 100456,
            lessThan30Seconds: 0,
            lessThan5Seconds: 44
          },
          open: {
            noTimeout: 0,
            pinned: 2,
            total: 2
          }
        },
        document: {
          deleted: 3890941,
          inserted: 3887880,
          returned: 7994368,
          updated: 1952506439
        },
        dotsAndDollarsFields: {
          inserts: 0,
          updates: 0
        },
        getLastError: {
          wtime: {
            num: 12061362,
            totalMillis: 49484
          },
          wtimeouts: 0,
          default: {
            unsatisfiable: 0,
            wtimeouts: 0
          }
        },
        mongos: {
          cursor: {
            moreThanOneBatch: 0,
            totalOpened: 0
          }
        },
        operation: {
          scanAndOrder: 4185059,
          temporarilyUnavailableErrors: 0,
          temporarilyUnavailableErrorsConvertedToWriteConflict: 0,
          temporarilyUnavailableErrorsEscaped: 0,
          transactionTooLargeForCacheErrors: 0,
          transactionTooLargeForCacheErrorsConvertedToWriteConflict: 0,
          writeConflicts: 440
        },
        operatorCounters: {
          expressions: {
            $_internalFindAllValuesAtPath: 0,
            $_internalFleEq: 0,
            $_internalJsEmit: 0,
            $abs: 0,
            $acos: 0,
            $acosh: 0,
            $add: 0,
            $allElementsTrue: 0,
            $and: 0,
            $anyElementTrue: 0,
            $arrayElemAt: 0,
            $arrayToObject: 0,
            $asin: 0,
            $asinh: 0,
            $atan: 0,
            $atan2: 0,
            $atanh: 0,
            $avg: 0,
            $binarySize: 0,
            $bsonSize: 0,
            $ceil: 0,
            $cmp: 0,
            $concat: 1,
            $concatArrays: 0,
            $cond: 4751,
            $const: 0,
            $convert: 0,
            $cos: 0,
            $cosh: 0,
            $dateAdd: 0,
            $dateDiff: 0,
            $dateFromParts: 0,
            $dateFromString: 0,
            $dateSubtract: 0,
            $dateToParts: 0,
            $dateToString: 0,
            $dateTrunc: 0,
            $dayOfMonth: 4,
            $dayOfWeek: 0,
            $dayOfYear: 0,
            $degreesToRadians: 0,
            $divide: 0,
            $eq: 96779,
            $exp: 0,
            $filter: 0,
            $first: 0,
            $firstN: 0,
            $floor: 0,
            $function: 0,
            $getField: 0,
            $gt: 0,
            $gte: 4551,
            $hour: 4,
            $ifNull: 34,
            $in: 0,
            $indexOfArray: 0,
            $indexOfBytes: 0,
            $indexOfCP: 0,
            $isArray: 0,
            $isNumber: 0,
            $isoDayOfWeek: 0,
            $isoWeek: 0,
            $isoWeekYear: 0,
            $last: 0,
            $lastN: 0,
            $let: 0,
            $literal: 0,
            $ln: 0,
            $log: 0,
            $log10: 0,
            $lt: 0,
            $lte: 0,
            $ltrim: 0,
            $map: 0,
            $max: 0,
            $maxN: 0,
            $mergeObjects: 0,
            $meta: 0,
            $millisecond: 0,
            $min: 0,
            $minN: 0,
            $minute: 4,
            $mod: 0,
            $month: 4,
            $multiply: 0,
            $ne: 96579,
            $not: 0,
            $objectToArray: 0,
            $or: 0,
            $pow: 0,
            $radiansToDegrees: 0,
            $rand: 0,
            $range: 0,
            $reduce: 0,
            $regexFind: 0,
            $regexFindAll: 0,
            $regexMatch: 0,
            $replaceAll: 0,
            $replaceOne: 0,
            $reverseArray: 0,
            $round: 0,
            $rtrim: 0,
            $second: 0,
            $setDifference: 0,
            $setEquals: 0,
            $setField: 0,
            $setIntersection: 0,
            $setIsSubset: 0,
            $setUnion: 0,
            $sin: 0,
            $sinh: 0,
            $size: 0,
            $slice: 0,
            $sortArray: 0,
            $split: 0,
            $sqrt: 0,
            $stdDevPop: 0,
            $stdDevSamp: 0,
            $strLenBytes: 0,
            $strLenCP: 0,
            $strcasecmp: 0,
            $substr: 0,
            $substrBytes: 0,
            $substrCP: 0,
            $subtract: 0,
            $sum: 0,
            $switch: 0,
            $tan: 0,
            $tanh: 0,
            $toBool: 0,
            $toDate: 0,
            $toDecimal: 0,
            $toDouble: 0,
            $toHashedIndexKey: 0,
            $toInt: 0,
            $toLong: 0,
            $toLower: 0,
            $toObjectId: 0,
            $toString: 0,
            $toUpper: 0,
            $trim: 0,
            $trunc: 0,
            $tsIncrement: 0,
            $tsSecond: 0,
            $type: 0,
            $unsetField: 0,
            $week: 0,
            $year: 4,
            $zip: 0
          },
          groupAccumulators: {
            $_internalJsReduce: 0,
            $accumulator: 0,
            $addToSet: 46,
            $avg: 350,
            $bottom: 0,
            $bottomN: 0,
            $count: 0,
            $first: 206,
            $firstN: 0,
            $last: 0,
            $lastN: 0,
            $max: 4551,
            $maxN: 0,
            $mergeObjects: 0,
            $min: 0,
            $minN: 0,
            $push: 0,
            $stdDevPop: 0,
            $stdDevSamp: 0,
            $sum: 100792,
            $top: 0,
            $topN: 0
          },
          match: {
            $all: 0,
            $alwaysFalse: 0,
            $alwaysTrue: 0,
            $and: 100301,
            $bitsAllClear: 0,
            $bitsAllSet: 0,
            $bitsAnyClear: 0,
            $bitsAnySet: 0,
            $comment: 0,
            $elemMatch: 17,
            $eq: 15498721,
            $exists: 197676,
            $expr: 193158,
            $geoIntersects: 0,
            $geoWithin: 0,
            $gt: 288710,
            $gte: 11,
            $in: 321116,
            $jsonSchema: 0,
            $lt: 1715,
            $lte: 6,
            $mod: 0,
            $ne: 197975,
            $near: 0,
            $nearSphere: 0,
            $nin: 96594,
            $nor: 33,
            $not: 49,
            $or: 198883,
            $regex: 1725,
            $sampleRate: 0,
            $size: 18,
            $text: 0,
            $type: 11,
            $where: 0
          },
          windowAccumulators: {
            $addToSet: 0,
            $avg: 0,
            $bottom: 0,
            $bottomN: 0,
            $count: 0,
            $covariancePop: 0,
            $covarianceSamp: 0,
            $denseRank: 0,
            $derivative: 0,
            $documentNumber: 0,
            $expMovingAvg: 0,
            $first: 0,
            $firstN: 0,
            $integral: 0,
            $last: 0,
            $lastN: 0,
            $linearFill: 0,
            $locf: 0,
            $max: 0,
            $maxN: 0,
            $min: 0,
            $minN: 0,
            $push: 0,
            $rank: 0,
            $shift: 0,
            $stdDevPop: 0,
            $stdDevSamp: 0,
            $sum: 0,
            $top: 0,
            $topN: 0
          }
        },
        query: {
          allowDiskUseFalse: 0,
          deleteManyCount: 96361,
          planCacheTotalSizeEstimateBytes: 806413,
          updateDeleteManyDocumentsMaxCount: 20154,
          updateDeleteManyDocumentsTotalCount: 1954748977,
          updateDeleteManyDurationMaxMs: 3599,
          updateDeleteManyDurationTotalMs: 173400570,
          updateManyCount: 6517195,
          updateOneOpStyleBroadcastWithExactIDCount: 0,
          multiPlanner: {
            classicCount: 252,
            classicMicros: 1406236,
            classicWorks: 173550,
            sbeCount: 17,
            sbeMicros: 67087,
            sbeNumReads: 9170,
            histograms: {
              classicMicros: [
                {
                  lowerBound: 0,
                  count: 176
                },
                {
                  lowerBound: 1024,
                  count: 40
                },
                {
                  lowerBound: 4096,
                  count: 21
                },
                {
                  lowerBound: 16384,
                  count: 9
                },
                {
                  lowerBound: 65536,
                  count: 6
                },
                {
                  lowerBound: 262144,
                  count: 0
                },
                {
                  lowerBound: 1048576,
                  count: 0
                },
                {
                  lowerBound: 4194304,
                  count: 0
                },
                {
                  lowerBound: 16777216,
                  count: 0
                },
                {
                  lowerBound: 67108864,
                  count: 0
                },
                {
                  lowerBound: 268435456,
                  count: 0
                },
                {
                  lowerBound: 1073741824,
                  count: 0
                }
              ],
              classicNumPlans: [
                {
                  lowerBound: 0,
                  count: 0
                },
                {
                  lowerBound: 2,
                  count: 125
                },
                {
                  lowerBound: 4,
                  count: 77
                },
                {
                  lowerBound: 8,
                  count: 50
                },
                {
                  lowerBound: 16,
                  count: 0
                },
                {
                  lowerBound: 32,
                  count: 0
                }
              ],
              classicWorks: [
                {
                  lowerBound: 0,
                  count: 189
                },
                {
                  lowerBound: 128,
                  count: 15
                },
                {
                  lowerBound: 256,
                  count: 29
                },
                {
                  lowerBound: 512,
                  count: 8
                },
                {
                  lowerBound: 1024,
                  count: 5
                },
                {
                  lowerBound: 2048,
                  count: 0
                },
                {
                  lowerBound: 4096,
                  count: 0
                },
                {
                  lowerBound: 8192,
                  count: 0
                },
                {
                  lowerBound: 16384,
                  count: 6
                },
                {
                  lowerBound: 32768,
                  count: 0
                }
              ],
              sbeMicros: [
                {
                  lowerBound: 0,
                  count: 2
                },
                {
                  lowerBound: 1024,
                  count: 12
                },
                {
                  lowerBound: 4096,
                  count: 1
                },
                {
                  lowerBound: 16384,
                  count: 2
                },
                {
                  lowerBound: 65536,
                  count: 0
                },
                {
                  lowerBound: 262144,
                  count: 0
                },
                {
                  lowerBound: 1048576,
                  count: 0
                },
                {
                  lowerBound: 4194304,
                  count: 0
                },
                {
                  lowerBound: 16777216,
                  count: 0
                },
                {
                  lowerBound: 67108864,
                  count: 0
                },
                {
                  lowerBound: 268435456,
                  count: 0
                },
                {
                  lowerBound: 1073741824,
                  count: 0
                }
              ],
              sbeNumPlans: [
                {
                  lowerBound: 0,
                  count: 0
                },
                {
                  lowerBound: 2,
                  count: 13
                },
                {
                  lowerBound: 4,
                  count: 2
                },
                {
                  lowerBound: 8,
                  count: 2
                },
                {
                  lowerBound: 16,
                  count: 0
                },
                {
                  lowerBound: 32,
                  count: 0
                }
              ],
              sbeNumReads: [
                {
                  lowerBound: 0,
                  count: 2
                },
                {
                  lowerBound: 128,
                  count: 0
                },
                {
                  lowerBound: 256,
                  count: 2
                },
                {
                  lowerBound: 512,
                  count: 13
                },
                {
                  lowerBound: 1024,
                  count: 0
                },
                {
                  lowerBound: 2048,
                  count: 0
                },
                {
                  lowerBound: 4096,
                  count: 0
                },
                {
                  lowerBound: 8192,
                  count: 0
                },
                {
                  lowerBound: 16384,
                  count: 0
                },
                {
                  lowerBound: 32768,
                  count: 0
                }
              ]
            }
          },
          queryFramework: {
            aggregate: {
              classicHybrid: 95767,
              classicOnly: 0,
              cqf: 0,
              sbeHybrid: 4575,
              sbeOnly: 23
            },
            find: {
              classic: 5779907,
              cqf: 0,
              sbe: 0
            }
          }
        },
        queryExecutor: {
          scanned: 3920900684,
          scannedObjects: 17558330851,
          collectionScans: {
            nonTailable: 1608423,
            total: 1608434
          }
        },
        repl: {
          executor: {
            pool: {
              inProgressCount: 0
            },
            queues: {
              networkInProgress: 0,
              sleepers: 0
            },
            unsignaledEvents: 0,
            shuttingDown: false,
            networkInterface:
              'DEPRECATED: getDiagnosticString is deprecated in NetworkInterfaceTL'
          },
          apply: {
            attemptsToBecomeSecondary: 1,
            batchSize: 0,
            batches: {
              num: 0,
              totalMillis: 0
            },
            ops: 0
          },
          buffer: {
            count: 0,
            maxSizeBytes: 268435456,
            sizeBytes: 0
          },
          initialSync: {
            completed: 0,
            failedAttempts: 0,
            failures: 0
          },
          network: {
            bytes: 0,
            getmores: {
              num: 0,
              totalMillis: 0,
              numEmptyBatches: 0
            },
            notPrimaryLegacyUnacknowledgedWrites: 0,
            notPrimaryUnacknowledgedWrites: 0,
            oplogGetMoresProcessed: {
              num: 0,
              totalMillis: 0
            },
            ops: 0,
            readersCreated: 0,
            replSetUpdatePosition: {
              num: 0
            }
          },
          reconfig: {
            numAutoReconfigsForRemovalOfNewlyAddedFields: 0
          },
          stateTransition: {
            lastStateTransition: 'stepUp',
            userOperationsKilled: 0,
            userOperationsRunning: 1
          },
          syncSource: {
            numSelections: 1,
            numSyncSourceChangesDueToSignificantlyCloserNode: 0,
            numTimesChoseDifferent: 0,
            numTimesChoseSame: 0,
            numTimesCouldNotFind: 1
          }
        },
        ttl: {
          deletedDocuments: 2609,
          passes: 8233
        }
      },
      ok: 1,
      $clusterTime: {
        clusterTime: '7333161611399528591',
        signature: {
          hash: 'f6cbVr3cmIV55jLMxmHXwPOQ9Tc=',
          keyId: '7330996612874895367'
        }
      },
      operationTime: '7333161611399528591',
      app: {
        version: '6.0.13'
      },
      name: 'MongoDB',
      status: 'running',
      hostname: 'ip107.ip-5-39-40.eu'
    },
    {
      _id: '65bcf0828375e88c08aa9cda',
      type: 'Redis',
      hostname: 'localhost:6379',
      insertedAt: '2024-02-06T11:22:37.670Z',
      app: {
        version: '7.0.12',
        semverVersion: '7.0.12',
        invalidVersion: false
      },
      data: {
        Server: {
          redis_version: '7.0.12',
          redis_git_sha1: '8e73f9d3',
          redis_git_dirty: '1',
          redis_build_id: '1701a0940a42666b',
          redis_mode: 'standalone',
          os: 'Linux 4.18.0-80.el8.x86_64 x86_64',
          arch_bits: '64',
          monotonic_clock: 'POSIX clock_gettime',
          multiplexing_api: 'epoll',
          atomicvar_api: 'c11-builtin',
          gcc_version: '8.5.0',
          process_id: '14393',
          process_supervised: 'no',
          run_id: '97cbcf2e8bbbf71df4b904fc1fa557f9837da3cb',
          tcp_port: '6379',
          server_time_usec: '1707384734402983',
          uptime_in_seconds: '166187',
          uptime_in_days: '1',
          hz: '10',
          configured_hz: '10',
          lru_clock: '12885918',
          executable: '/opt/systran/redis/bin/redis-server',
          config_file: '/opt/systran/redis/etc/redis.conf',
          io_threads_active: '0'
        },
        Clients: {
          connected_clients: '53',
          cluster_connections: '0',
          maxclients: '10000',
          client_recent_max_input_buffer: '20480',
          client_recent_max_output_buffer: '0',
          blocked_clients: '0',
          tracking_clients: '0',
          clients_in_timeout_table: '0'
        },
        Memory: {
          used_memory: '1283960',
          used_memory_human: '1.22M',
          used_memory_rss: '6950912',
          used_memory_rss_human: '6.63M',
          used_memory_peak: '2381568',
          used_memory_peak_human: '2.27M',
          used_memory_peak_perc: '53.91%',
          used_memory_overhead: '973168',
          used_memory_startup: '858720',
          used_memory_dataset: '310792',
          used_memory_dataset_perc: '73.09%',
          allocator_allocated: '1361408',
          allocator_active: '1740800',
          allocator_resident: '6283264',
          total_system_memory: '25101066240',
          total_system_memory_human: '23.38G',
          used_memory_lua: '31744',
          used_memory_vm_eval: '31744',
          used_memory_lua_human: '31.00K',
          used_memory_scripts_eval: '0',
          number_of_cached_scripts: '0',
          number_of_functions: '0',
          number_of_libraries: '0',
          used_memory_vm_functions: '32768',
          used_memory_vm_total: '64512',
          used_memory_vm_total_human: '63.00K',
          used_memory_functions: '184',
          used_memory_scripts: '184',
          used_memory_scripts_human: '184B',
          maxmemory: '1073741824',
          maxmemory_human: '1.00G',
          maxmemory_policy: 'allkeys-lru',
          allocator_frag_ratio: '1.28',
          allocator_frag_bytes: '379392',
          allocator_rss_ratio: '3.61',
          allocator_rss_bytes: '4542464',
          rss_overhead_ratio: '1.11',
          rss_overhead_bytes: '667648',
          mem_fragmentation_ratio: '5.59',
          mem_fragmentation_bytes: '5706984',
          mem_not_counted_for_evict: '0',
          mem_replication_backlog: '0',
          mem_total_replication_buffers: '0',
          mem_clients_slaves: '0',
          mem_clients_normal: '114072',
          mem_cluster_links: '0',
          mem_aof_buffer: '0',
          mem_allocator: 'jemalloc-5.2.1',
          active_defrag_running: '0',
          lazyfree_pending_objects: '0',
          lazyfreed_objects: '0'
        },
        Persistence: {
          loading: '0',
          async_loading: '0',
          current_cow_peak: '0',
          current_cow_size: '0',
          current_cow_size_age: '0',
          current_fork_perc: '0.00',
          current_save_keys_processed: '0',
          current_save_keys_total: '0',
          rdb_changes_since_last_save: '572',
          rdb_bgsave_in_progress: '0',
          rdb_last_save_time: '1707218547',
          rdb_last_bgsave_status: 'ok',
          rdb_last_bgsave_time_sec: '-1',
          rdb_current_bgsave_time_sec: '-1',
          rdb_saves: '0',
          rdb_last_cow_size: '0',
          rdb_last_load_keys_expired: '0',
          rdb_last_load_keys_loaded: '0',
          aof_enabled: '0',
          aof_rewrite_in_progress: '0',
          aof_rewrite_scheduled: '0',
          aof_last_rewrite_time_sec: '-1',
          aof_current_rewrite_time_sec: '-1',
          aof_last_bgrewrite_status: 'ok',
          aof_rewrites: '0',
          aof_rewrites_consecutive_failures: '0',
          aof_last_write_status: 'ok',
          aof_last_cow_size: '0',
          module_fork_in_progress: '0',
          module_fork_last_cow_size: '0'
        },
        Stats: {
          total_connections_received: '32408',
          total_commands_processed: '132579',
          instantaneous_ops_per_sec: '1',
          total_net_input_bytes: '3028735',
          total_net_output_bytes: '355673526',
          total_net_repl_input_bytes: '0',
          total_net_repl_output_bytes: '0',
          instantaneous_input_kbps: '0.33',
          instantaneous_output_kbps: '0.25',
          instantaneous_input_repl_kbps: '0.00',
          instantaneous_output_repl_kbps: '0.00',
          rejected_connections: '0',
          sync_full: '0',
          sync_partial_ok: '0',
          sync_partial_err: '0',
          expired_keys: '34',
          expired_stale_perc: '0.00',
          expired_time_cap_reached_count: '0',
          expire_cycle_cpu_milliseconds: '3750',
          evicted_keys: '0',
          evicted_clients: '0',
          total_eviction_exceeded_time: '0',
          current_eviction_exceeded_time: '0',
          keyspace_hits: '2298',
          keyspace_misses: '255',
          pubsub_channels: '0',
          pubsub_patterns: '0',
          pubsubshard_channels: '0',
          latest_fork_usec: '0',
          total_forks: '0',
          migrate_cached_sockets: '0',
          slave_expires_tracked_keys: '0',
          active_defrag_hits: '0',
          active_defrag_misses: '0',
          active_defrag_key_hits: '0',
          active_defrag_key_misses: '0',
          total_active_defrag_time: '0',
          current_active_defrag_time: '0',
          tracking_total_keys: '0',
          tracking_total_items: '0',
          tracking_total_prefixes: '0',
          unexpected_error_replies: '0',
          total_error_replies: '0',
          dump_payload_sanitizations: '0',
          total_reads_processed: '128529',
          total_writes_processed: '128490',
          io_threaded_reads_processed: '0',
          io_threaded_writes_processed: '0',
          reply_buffer_shrinks: '70',
          reply_buffer_expands: '0'
        },
        Replication: {
          role: 'master',
          connected_slaves: '0',
          master_failover_state: 'no-failover',
          master_replid: '03e2a963c267ce1375baf9270733e73d9c7b271a',
          master_replid2: '0000000000000000000000000000000000000000',
          master_repl_offset: '0',
          second_repl_offset: '-1',
          repl_backlog_active: '0',
          repl_backlog_size: '1048576',
          repl_backlog_first_byte_offset: '0',
          repl_backlog_histlen: '0'
        },
        CPU: {
          used_cpu_sys: '122.840856',
          used_cpu_user: '150.668196',
          used_cpu_sys_children: '0.000000',
          used_cpu_user_children: '0.000000',
          used_cpu_sys_main_thread: '122.834913',
          used_cpu_user_main_thread: '150.666188'
        },
        Modules: {},
        Commandstats: {
          cmdstat_del: [
            'calls=4',
            'usec=26',
            'usec_per_call=6.50',
            'rejected_calls=0',
            'failed_calls=0'
          ],
          cmdstat_set: [
            'calls=566',
            'usec=6515',
            'usec_per_call=11.51',
            'rejected_calls=0',
            'failed_calls=0'
          ],
          cmdstat_expire: [
            'calls=2',
            'usec=2133',
            'usec_per_call=1066.50',
            'rejected_calls=0',
            'failed_calls=0'
          ],
          cmdstat_multi: [
            'calls=2',
            'usec=3',
            'usec_per_call=1.50',
            'rejected_calls=0',
            'failed_calls=0'
          ],
          cmdstat_auth: [
            'calls=32408',
            'usec=236432',
            'usec_per_call=7.30',
            'rejected_calls=0',
            'failed_calls=0'
          ],
          cmdstat_info: [
            'calls=64711',
            'usec=9262759',
            'usec_per_call=143.14',
            'rejected_calls=0',
            'failed_calls=0'
          ],
          cmdstat_exec: [
            'calls=2',
            'usec=5396',
            'usec_per_call=2698.00',
            'rejected_calls=0',
            'failed_calls=0'
          ],
          cmdstat_ping: [
            'calls=14',
            'usec=23',
            'usec_per_call=1.64',
            'rejected_calls=0',
            'failed_calls=0'
          ],
          cmdstat_quit: [
            'calls=32317',
            'usec=59607',
            'usec_per_call=1.84',
            'rejected_calls=0',
            'failed_calls=0'
          ],
          cmdstat_get: [
            'calls=2553',
            'usec=18974',
            'usec_per_call=7.43',
            'rejected_calls=0',
            'failed_calls=0'
          ]
        },
        Errorstats: {},
        Latencystats: {
          latency_percentiles_usec_del: [
            'p50=6.015',
            'p99=8.031',
            'p99.9=8.031'
          ],
          latency_percentiles_usec_set: [
            'p50=9.023',
            'p99=42.239',
            'p99.9=57.087'
          ],
          latency_percentiles_usec_expire: [
            'p50=9.023',
            'p99=2129.919',
            'p99.9=2129.919'
          ],
          latency_percentiles_usec_multi: [
            'p50=1.003',
            'p99=2.007',
            'p99.9=2.007'
          ],
          latency_percentiles_usec_auth: [
            'p50=6.015',
            'p99=22.015',
            'p99.9=43.007'
          ],
          latency_percentiles_usec_info: [
            'p50=135.167',
            'p99=301.055',
            'p99.9=460.799'
          ],
          latency_percentiles_usec_exec: [
            'p50=40.191',
            'p99=5373.951',
            'p99.9=5373.951'
          ],
          latency_percentiles_usec_ping: [
            'p50=1.003',
            'p99=5.023',
            'p99.9=5.023'
          ],
          latency_percentiles_usec_quit: [
            'p50=2.007',
            'p99=5.023',
            'p99.9=24.063'
          ],
          latency_percentiles_usec_get: [
            'p50=7.007',
            'p99=21.119',
            'p99.9=46.079'
          ]
        },
        Cluster: {
          cluster_enabled: '0'
        },
        Keyspace: {
          db0: ['keys=2', 'expires=2', 'avg_ttl=1154501']
        },
        app: {
          version: '7.0.12',
          semverVersion: '7.0.12',
          invalidVersion: false
        },
        name: 'Redis',
        status: 'running',
        hostname: 'localhost:6379'
      },
      lastSuccessfulUpdate: '2024-02-08T09:32:14.411Z',
      lastUpdate: '2024-02-08T09:32:14.411Z',
      status: 'running',
      name: 'Redis'
    },
    {
      _id: '65bcf0828375e88c08aa9ceb',
      type: 'ActivityServer',
      hostname: 'http://localhost:8701',
      insertedAt: '2024-02-06T11:22:37.982Z',
      lastFailedUpdate: '2024-02-06T11:22:24.460Z',
      lastPollingError: 'Error: connect ECONNREFUSED 127.0.0.1:8701',
      lastUpdate: '2024-02-08T09:32:14.403Z',
      status: 'running',
      app: {
        name: 'Activity Server',
        version: '9.11.0-0.el8',
        semverVersion: '9.11.0',
        invalidVersion: false
      },
      data: {
        app: {
          name: 'Activity Server',
          version: '9.11.0-0.el8',
          semverVersion: '9.11.0',
          invalidVersion: false
        },
        status: true
      },
      lastSuccessfulUpdate: '2024-02-08T09:32:14.403Z',
      name: 'Activity Server'
    },
    {
      name: 'SES Console',
      status: 'running',
      hostname: 'https://ssaqa-spot07.systran.dev:3443',
      app: {
        version: '9.11.0-0.el8'
      }
    },
    {
      _id: '65bcf0828375e88c08aa9cf3',
      type: 'Gateway',
      hostname: 'http://localhost:8903',
      insertedAt: '2024-02-06T11:22:38.057Z',
      lastFailedUpdate: '2024-02-06T11:22:37.487Z',
      lastPollingError: 'Error: connect ECONNREFUSED 127.0.0.1:8903',
      lastUpdate: '2024-02-08T09:32:14.405Z',
      status: 'running',
      app: {
        name: 'SYSTRAN REST Gateway',
        version: '9.11.0-0.el8',
        semverVersion: '9.11.0',
        invalidVersion: false
      },
      data: {
        app: {
          name: 'SYSTRAN REST Gateway',
          version: '9.11.0-0.el8',
          semverVersion: '9.11.0',
          invalidVersion: false
        },
        status: true
      },
      lastSuccessfulUpdate: '2024-02-08T09:32:14.405Z',
      name: 'Gateway',
      statusFailed: true
    },
    {
      _id: '65bcf0828375e88c08aa9cf6',
      type: 'TrsConsole',
      hostname: 'https://localhost:3445',
      insertedAt: '2024-02-06T11:22:38.070Z',
      app: {
        name: 'Local TranslationResourceStore console',
        version: '9.11.0-0.el8',
        semverVersion: '9.11.0',
        invalidVersion: false
      },
      data: {
        app: {
          name: 'Local TranslationResourceStore console',
          version: '9.11.0-0.el8',
          semverVersion: '9.11.0',
          invalidVersion: false
        },
        status: true
      },
      lastSuccessfulUpdate: '2024-02-08T09:32:14.412Z',
      lastUpdate: '2024-02-08T09:32:14.412Z',
      status: 'running',
      lastFailedUpdate: '2024-02-06T11:22:37.491Z',
      lastPollingError: 'Error: connect ECONNREFUSED 127.0.0.1:3445',
      name: 'TRS Console'
    },
    {
      _id: '65bcf0cb8375e88c08ac5392',
      hostname: 'localhost',
      insertedAt: '2024-02-02T16:19:12.020Z',
      secure: false,
      app: {
        name: 'SystranTranslationDispatcher',
        version: '8.23.0-1.el8',
        semverVersion: '8.23.0'
      },
      lastSuccessfulUpdate: '2024-02-08T09:32:17.820Z',
      lastUpdate: '2024-02-08T09:32:17.820Z',
      pollingHost: 'localhost:8887',
      status: 'running',
      lastFailedUpdate: '2024-02-06T11:20:22.987Z',
      lastPollingError: 'Error: connect ECONNREFUSED 127.0.0.1:8887',
      name: 'Dispatcher'
    },
    {
      _id: '65bcf0cb8375e88c08ac538f',
      hostname: 'localhost',
      insertedAt: '2024-02-02T13:40:27.062Z',
      secure: false,
      version: '6c0ea6c2-6dfc-47d1-9766-cc10483ab3e6_8.23.0-0.el8',
      app: {
        name: 'RoutingServer',
        version: '8.23.0-0.el8',
        semverVersion: '8.23.0',
        invalidVersion: false
      },
      lastSuccessfulUpdate: '2024-02-08T09:32:15.258Z',
      lastUpdate: '2024-02-08T09:32:15.259Z',
      status: 'running',
      lastFailedUpdate: '2024-02-02T16:09:04.174Z',
      lastPollingError: 'Error: connect ECONNREFUSED 127.0.0.1:9999',
      name: 'Routing Server'
    },
    {
      _id: '65bcf0828375e88c08aa9cfc',
      type: 'GDict',
      hostname: 'http://5.39.40.107:8892',
      insertedAt: '2024-02-06T11:22:38.119Z',
      app: {
        name: 'GDict Mongo',
        version: '8.23.0-0.el8',
        semverVersion: '8.23.0',
        invalidVersion: false
      },
      data: {
        app: {
          name: 'GDict Mongo',
          version: '8.23.0-0.el8',
          semverVersion: '8.23.0',
          invalidVersion: false
        },
        status: true
      },
      lastSuccessfulUpdate: '2024-02-08T09:32:14.408Z',
      lastUpdate: '2024-02-08T09:32:14.409Z',
      status: 'running',
      lastFailedUpdate: '2024-02-06T10:29:23.074Z',
      lastPollingError: 'Error: connect ECONNREFUSED 5.39.40.107:8892',
      name: 'GDict'
    },
    {
      _id: '65bcf0828375e88c08aa9cfe',
      type: 'DctIndexer',
      hostname: 'http://localhost:8893',
      insertedAt: '2024-02-06T11:22:38.135Z',
      app: {
        name: 'DctIndexer',
        version: '8.23.0-0.el8',
        semverVersion: '8.23.0',
        invalidVersion: false
      },
      data: {
        app: {
          name: 'DctIndexer',
          version: '8.23.0-0.el8',
          semverVersion: '8.23.0',
          invalidVersion: false
        },
        status: true
      },
      lastSuccessfulUpdate: '2024-02-08T09:32:14.408Z',
      lastUpdate: '2024-02-08T09:32:14.408Z',
      status: 'running',
      lastFailedUpdate: '2024-02-06T10:29:23.084Z',
      lastPollingError: 'Error: connect ECONNREFUSED 127.0.0.1:8893',
      name: 'DCT Indexer'
    },
    {
      _id: '65bcf0828375e88c08aa9cee',
      type: 'CorpusManager',
      hostname: 'http://localhost:8889',
      insertedAt: '2024-02-06T11:22:38.012Z',
      app: {
        name: 'CorpusManager2',
        version: '8.23.1-2.el8',
        semverVersion: '8.23.1',
        invalidVersion: false
      },
      data: {
        app: {
          name: 'CorpusManager2',
          version: '8.23.1-2.el8',
          semverVersion: '8.23.1',
          invalidVersion: false
        },
        status: true
      },
      lastSuccessfulUpdate: '2024-02-08T09:32:14.404Z',
      lastUpdate: '2024-02-08T09:32:14.404Z',
      status: 'running',
      lastFailedUpdate: '2024-02-02T16:09:04.404Z',
      lastPollingError: 'Error: connect ECONNREFUSED 127.0.0.1:8889',
      name: 'Corpus Manager'
    },
    {
      _id: '65bcf0828375e88c08aa9cf1',
      type: 'TmIndexer',
      hostname: 'http://localhost:8890',
      insertedAt: '2024-02-06T11:22:38.036Z',
      app: {
        name: 'TmIndexer',
        version: '8.23.0-0.el8',
        semverVersion: '8.23.0',
        invalidVersion: false
      },
      data: {
        app: {
          name: 'TmIndexer',
          version: '8.23.0-0.el8',
          semverVersion: '8.23.0',
          invalidVersion: false
        },
        status: true
      },
      lastSuccessfulUpdate: '2024-02-08T09:32:14.404Z',
      lastUpdate: '2024-02-08T09:32:14.404Z',
      status: 'running',
      lastFailedUpdate: '2024-02-02T16:09:04.405Z',
      lastPollingError: 'Error: connect ECONNREFUSED 127.0.0.1:8890',
      name: 'TM Indexer'
    },
    {
      _id: '65bcf0828375e88c08aa9cfa',
      type: 'Lookup',
      hostname: 'http://localhost:8891',
      insertedAt: '2024-02-06T11:22:38.095Z',
      app: {
        name: 'LookupServer',
        version: '8.23.0-0.el8',
        semverVersion: '8.23.0',
        invalidVersion: false
      },
      data: {
        app: {
          name: 'LookupServer',
          version: '8.23.0-0.el8',
          semverVersion: '8.23.0',
          invalidVersion: false
        },
        status: true
      },
      lastSuccessfulUpdate: '2024-02-08T09:32:14.407Z',
      lastUpdate: '2024-02-08T09:32:14.407Z',
      status: 'running',
      lastFailedUpdate: '2024-02-06T11:22:42.529Z',
      lastPollingError: 'Error: connect ECONNREFUSED 127.0.0.1:8891',
      name: 'Lookup Server'
    },
    {
      displayName: 'Computing Node (TRM)',
      id: '65bcf0cb8375e88c08ac5389',
      hostname: 'localhost',
      status: 'running',
      app: {
        name: 'TranslationResourceMonitor',
        version: '8.23.0-3.el8',
        semverVersion: '8.23.0',
        invalidVersion: false
      },
      lastUpdate: '2024-02-08T09:32:17.246Z',
      lastSuccessfulUpdate: '2024-02-08T09:32:17.246Z',
      nbCores: 16,
      loadAverage: '1.85 1.58 1.48',
      totalMemory: '24512760',
      availableMemory: '2573548',
      freeMemory: '282396',
      cachedMemory: '2082948',
      buffersMemory: '528976',
      totalDisk: '102686648',
      availableDisk: '55310704',
      freeDisk: '60569916',
      os: 'Red Hat Enterprise Linux release 8.0 (Ootpa)',
      uptime: '5 days, 20:9:17',
      nbInstances: 29,
      translationResources: [
        {
          id: '090d2efa-2629-4353-96d8-95d9e63b8131',
          name: 'Container Data Generic (L) esfr',
          status: 'downloaded',
          nbInstances: 0,
          routes: []
        },
        {
          id: '6baabe22-19fa-4a24-be92-f31263b57f70',
          name: 'PTE Generic (L) fren',
          status: 'installed',
          nbInstances: 1,
          routes: [
            {
              _id: '65c2174a27406fee43575163',
              profileId: '4f5b110c-ff0b-4d36-9763-471d19cea737',
              queue: '6baabe22-19fa-4a24-be92-f31263b57f70',
              serverVersion:
                '6c0ea6c2-6dfc-47d1-9766-cc10483ab3e6_8.23.0-0.el8',
              service: 'Translate_fr_en',
              comment: {
                serviceName: 'globalActivity_2',
                translationResourceId: '6baabe22-19fa-4a24-be92-f31263b57f70',
                translationResourceName: 'PTE Generic (L) fren'
              },
              deactivated: false,
              insertedAt: '2024-02-06T11:26:02.875Z',
              insertionTime: '1707123367777',
              internal: true,
              priority: 0,
              public: true,
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
              sharingStatus: 'public',
              source: 'fr',
              target: 'en',
              users: ['65bcf062cd62015b0621caa0'],
              version: '2.0'
            }
          ]
        },
        {
          id: 'b31eae0b-1db1-433b-a34f-f7ac8a3c8643',
          name: 'PTE Generic (M) enfr',
          status: 'installed',
          nbInstances: 1,
          routes: [
            {
              _id: '65c2174a27406fee43575166',
              profileId: '3fbccefb-20ef-4979-9072-a545c56298eb',
              queue: 'b31eae0b-1db1-433b-a34f-f7ac8a3c8643',
              serverVersion:
                '6c0ea6c2-6dfc-47d1-9766-cc10483ab3e6_8.23.0-0.el8',
              service: 'Translate_en_fr',
              comment: {
                serviceName: 'permissionsTest_preInstalled_SizeM',
                translationResourceId: 'b31eae0b-1db1-433b-a34f-f7ac8a3c8643',
                translationResourceName: 'PTE Generic (M) enfr'
              },
              deactivated: false,
              insertedAt: '2024-02-06T11:26:02.875Z',
              insertionTime: '1707124629373',
              internal: true,
              priority: 0,
              public: false,
              running: true,
              selectors: {
                domain: 'Generic',
                owner: 'Systran',
                size: 'M',
                tech: {
                  name: 'Docker-OpenNMT-ctranslate',
                  type: 'NMT'
                }
              },
              sharingStatus: 'private',
              source: 'en',
              target: 'fr',
              users: ['65c0a791ca236c210bb244bf'],
              version: '2.0'
            },
            {
              _id: '65c2174a27406fee43575142',
              profileId: '48909ce9-8e32-432c-85f7-71385606cef3',
              queue: 'b31eae0b-1db1-433b-a34f-f7ac8a3c8643',
              serverVersion:
                '6c0ea6c2-6dfc-47d1-9766-cc10483ab3e6_8.23.0-0.el8',
              service: 'Translate_en_fr',
              comment: {
                serviceName: 'autodetect_fileTranslateAsync',
                translationResourceId: 'b31eae0b-1db1-433b-a34f-f7ac8a3c8643',
                translationResourceName: 'PTE Generic (M) enfr'
              },
              deactivated: false,
              insertedAt: '2024-02-06T11:26:02.873Z',
              insertionTime: '1707121573004',
              internal: true,
              priority: 0,
              public: true,
              running: true,
              selectors: {
                domain: 'Generic',
                owner: 'Systran',
                size: 'M',
                tech: {
                  name: 'Docker-OpenNMT-ctranslate',
                  type: 'NMT'
                }
              },
              sharingStatus: 'public',
              source: 'en',
              target: 'fr',
              users: ['65bcf062cd62015b0621caa0'],
              version: '2.0'
            },
            {
              _id: '65c2174a27406fee4357517e',
              profileId: '5edae832-6df1-4144-a17c-77333da05b97',
              queue: 'b31eae0b-1db1-433b-a34f-f7ac8a3c8643',
              serverVersion:
                '6c0ea6c2-6dfc-47d1-9766-cc10483ab3e6_8.23.0-0.el8',
              service: 'Translate_en_fr',
              comment: {
                serviceName: 'permissionsTest_preInstalled_SizeM',
                translationResourceId: 'b31eae0b-1db1-433b-a34f-f7ac8a3c8643',
                translationResourceName: 'PTE Generic (M) enfr'
              },
              deactivated: false,
              insertedAt: '2024-02-06T11:26:02.877Z',
              insertionTime: '1707130653065',
              internal: true,
              priority: 0,
              public: false,
              running: true,
              selectors: {
                domain: 'Generic',
                owner: 'Systran',
                size: 'M',
                tech: {
                  name: 'Docker-OpenNMT-ctranslate',
                  type: 'NMT'
                }
              },
              sharingStatus: 'private',
              source: 'en',
              target: 'fr',
              users: ['65c0bf1cca236c210bb2699a'],
              version: '2.0'
            }
          ]
        },
        {
          id: 'd687d880-62b2-411c-be72-a72910ce81ee',
          name: 'PTE Data Generic (L) enfr',
          status: 'downloaded',
          nbInstances: 0,
          routes: []
        },
        {
          id: '2461cfb8-6489-4ed8-9282-0d0773f5119a',
          name: 'Container Generic (L) enpl',
          status: 'installed',
          nbInstances: 1,
          routes: []
        },
        {
          id: '8822c12b-4c7b-4d15-9351-076d3abb1e51',
          name: 'Container Data Generic (L) enpl',
          status: 'downloaded',
          nbInstances: 0,
          routes: []
        },
        {
          id: 'dff9fcc0-5874-4799-b679-0660fe670ad5',
          name: 'Container Data Generic (L) enfr',
          status: 'downloaded',
          nbInstances: 0,
          routes: []
        },
        {
          id: '888f890a-aba4-4807-9d10-bb7e43179c19',
          name: 'Container Data Generic (L) deen',
          status: 'downloaded',
          nbInstances: 0,
          routes: []
        },
        {
          id: '0064c540-17a8-4727-9be6-fbc1b5f54c31',
          name: 'Container Generic (M) enes',
          status: 'installed',
          nbInstances: 1,
          routes: []
        },
        {
          id: 'b89e68ca-00b1-4af5-8fb5-880ee8292714',
          name: 'Container Generic (M) enfr',
          status: 'installed',
          nbInstances: 1,
          routes: []
        },
        {
          id: '2baaaa49-d6e2-431d-af30-d98dc08183a8',
          name: 'PTE Generic (M) enhi',
          status: 'installed',
          nbInstances: 1,
          routes: [
            {
              _id: '65c2174a27406fee43575187',
              profileId: '9cdec89b-f32f-4ae1-a932-0b1f023f98ff',
              queue: '2baaaa49-d6e2-431d-af30-d98dc08183a8',
              serverVersion:
                '6c0ea6c2-6dfc-47d1-9766-cc10483ab3e6_8.23.0-0.el8',
              service: 'Translate_en_hi',
              comment: {
                serviceName: 'fileTranslateSync',
                translationResourceId: '2baaaa49-d6e2-431d-af30-d98dc08183a8',
                translationResourceName: 'PTE Generic (M) enhi'
              },
              deactivated: false,
              insertedAt: '2024-02-06T11:26:02.877Z',
              insertionTime: '1707131751785',
              internal: true,
              priority: 0,
              public: false,
              running: true,
              selectors: {
                domain: 'Generic',
                owner: 'Systran',
                size: 'M',
                tech: {
                  name: 'Docker-OpenNMT-ctranslate',
                  type: 'NMT'
                }
              },
              sharingStatus: 'private',
              source: 'en',
              target: 'hi',
              users: ['65bcf062cd62015b0621caa0'],
              version: '2.0'
            },
            {
              _id: '65c2174a27406fee4357516e',
              profileId: 'c092dc75-b4d4-4936-9e34-92d61215cf62',
              queue: '2baaaa49-d6e2-431d-af30-d98dc08183a8',
              serverVersion:
                '6c0ea6c2-6dfc-47d1-9766-cc10483ab3e6_8.23.0-0.el8',
              service: 'Translate_en_hi',
              comment: {
                serviceName: 'fileTranslateSync',
                translationResourceId: '2baaaa49-d6e2-431d-af30-d98dc08183a8',
                translationResourceName: 'PTE Generic (M) enhi'
              },
              deactivated: false,
              insertedAt: '2024-02-06T11:26:02.876Z',
              insertionTime: '1707126413860',
              internal: true,
              priority: 0,
              public: false,
              running: true,
              selectors: {
                domain: 'Generic',
                owner: 'Systran',
                size: 'M',
                tech: {
                  name: 'Docker-OpenNMT-ctranslate',
                  type: 'NMT'
                }
              },
              sharingStatus: 'private',
              source: 'en',
              target: 'hi',
              users: ['65bcf062cd62015b0621caa0'],
              version: '2.0'
            }
          ]
        },
        {
          id: '3c3b3a2e-2e9f-4cf6-a4ea-dacc622e666d',
          name: 'PTE Data Generic (M) enes',
          status: 'downloaded',
          nbInstances: 0,
          routes: []
        },
        {
          id: '1ebe3201-4447-4bc9-827b-c13b65a998d7',
          name: 'PTE Generic (M) enfr',
          status: 'installed',
          nbInstances: 1,
          routes: [
            {
              _id: '65c2174a27406fee43575171',
              profileId: '5d785f31-dc68-43bb-aed0-5abcee0906ad',
              queue: '1ebe3201-4447-4bc9-827b-c13b65a998d7',
              serverVersion:
                '6c0ea6c2-6dfc-47d1-9766-cc10483ab3e6_8.23.0-0.el8',
              service: 'Translate_en_fr',
              comment: {
                serviceName: 'fileTranslateSync',
                translationResourceId: '1ebe3201-4447-4bc9-827b-c13b65a998d7',
                translationResourceName: 'PTE Generic (M) enfr'
              },
              deactivated: false,
              insertedAt: '2024-02-06T11:26:02.876Z',
              insertionTime: '1707127036013',
              internal: true,
              priority: 0,
              public: true,
              running: true,
              selectors: {
                domain: 'Generic',
                owner: 'Systran',
                size: 'M',
                tech: {
                  name: 'Docker-OpenNMT-ctranslate',
                  type: 'NMT'
                }
              },
              sharingStatus: 'public',
              source: 'en',
              target: 'fr',
              users: ['65bcf062cd62015b0621caa0'],
              version: '2.0'
            }
          ]
        },
        {
          id: '451e6e6a-aa90-4565-8ea9-286e392baa3b',
          name: 'PTE Generic (L) enpl',
          status: 'installed',
          nbInstances: 1,
          routes: [
            {
              _id: '65c2174a27406fee43575176',
              profileId: '26341013-4bda-4714-bb16-526ec02c1c7d',
              queue: '451e6e6a-aa90-4565-8ea9-286e392baa3b',
              serverVersion:
                '6c0ea6c2-6dfc-47d1-9766-cc10483ab3e6_8.23.0-0.el8',
              service: 'Translate_en_pl',
              comment: {
                serviceName: 'textTranslate_PL',
                translationResourceId: '451e6e6a-aa90-4565-8ea9-286e392baa3b',
                translationResourceName: 'PTE Generic (L) enpl'
              },
              deactivated: false,
              insertedAt: '2024-02-06T11:26:02.876Z',
              insertionTime: '1707127444578',
              internal: true,
              priority: 0,
              public: true,
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
              sharingStatus: 'public',
              source: 'en',
              target: 'pl',
              users: ['65bcf062cd62015b0621caa0'],
              version: '2.0'
            }
          ]
        },
        {
          id: '96d415d9-fddb-46b0-b620-5b4908a8f1b7',
          name: 'Container Generic (M) ende',
          status: 'installed',
          nbInstances: 1,
          routes: []
        },
        {
          id: '0c2a0e66-ef67-4544-b7a6-26262a193ab5',
          name: 'PTE Data Generic (L) enfr',
          status: 'downloaded',
          nbInstances: 0,
          routes: []
        },
        {
          id: '1da5f6f3-6420-4de6-97b4-0cd71bc2e7b3',
          name: 'Container Data Generic (L) enfr',
          status: 'downloaded',
          nbInstances: 0,
          routes: []
        },
        {
          id: 'a5b8c76f-c361-4843-9e61-c88cd7a7f1fd',
          name: 'PTE Data Generic (M) enfr',
          status: 'downloaded',
          nbInstances: 0,
          routes: []
        },
        {
          id: 'a93bbfc2-9886-4bfc-9b78-d2eb6e164b97',
          name: 'PTE Generic (M) ende',
          status: 'installed',
          nbInstances: 1,
          routes: [
            {
              _id: '65c2174a27406fee43575150',
              profileId: 'ec230b69-8621-40cc-9d80-9cdf304d0414',
              queue: 'a93bbfc2-9886-4bfc-9b78-d2eb6e164b97',
              serverVersion:
                '6c0ea6c2-6dfc-47d1-9766-cc10483ab3e6_8.23.0-0.el8',
              service: 'Translate_en_de',
              comment: {
                serviceName: 'aggregatedStatsENDE',
                translationResourceId: 'a93bbfc2-9886-4bfc-9b78-d2eb6e164b97',
                translationResourceName: 'PTE Generic (M) ende'
              },
              deactivated: false,
              insertedAt: '2024-02-06T11:26:02.873Z',
              insertionTime: '1707122587541',
              internal: true,
              priority: 0,
              public: true,
              running: true,
              selectors: {
                domain: 'Generic',
                owner: 'Systran',
                size: 'M',
                tech: {
                  name: 'Docker-OpenNMT-ctranslate',
                  type: 'NMT'
                }
              },
              sharingStatus: 'public',
              source: 'en',
              target: 'de',
              users: ['65bcf062cd62015b0621caa0'],
              version: '2.0'
            }
          ]
        },
        {
          id: 'c9f0eec0-b49b-496c-b6bf-d6293fb2fb5f',
          name: 'Container Data Generic (M) ende',
          status: 'downloaded',
          nbInstances: 0,
          routes: []
        },
        {
          id: 'f1d56a61-7aa8-4767-bae7-05e3300fd372',
          name: 'Container Generic (L) enfr',
          status: 'installed',
          nbInstances: 1,
          routes: []
        },
        {
          id: 'e9a6f5df-b25f-4d05-a3af-33763cfc18e8',
          name: 'Container Data Generic (M) enfr',
          status: 'downloaded',
          nbInstances: 0,
          routes: []
        },
        {
          id: '37b00a0d-2a40-4042-949e-9b7151131768',
          name: 'Container Generic (L) enfr',
          status: 'installed',
          nbInstances: 1,
          routes: []
        },
        {
          id: '25820fa9-93c8-44dd-9a94-b4e459fcdfb4',
          name: 'Container Generic (M) enpl',
          status: 'installed',
          nbInstances: 1,
          routes: []
        },
        {
          id: '522a352b-e1b3-4e3c-ad65-0d1b592f65b7',
          name: 'Container Data Generic (M) enes',
          status: 'downloaded',
          nbInstances: 0,
          routes: []
        },
        {
          id: '8b9e93c8-b885-479b-9873-571d6eaeb2f0',
          name: 'Common PTE',
          status: 'downloaded',
          nbInstances: 0,
          routes: []
        },
        {
          id: 'e232d756-5132-4ddd-baa5-3a4b589eb568',
          name: 'Container Generic (M) enhi',
          status: 'installed',
          nbInstances: 1,
          routes: []
        },
        {
          id: 'e9452122-7249-490a-b5a5-74e19e4fddd4',
          name: 'PTE Data Generic (L) iten',
          status: 'downloaded',
          nbInstances: 0,
          routes: []
        },
        {
          id: '16ccb332-68d2-498d-b3c2-5b497eae9dfd',
          name: 'PTE Data Generic (L) deen',
          status: 'downloaded',
          nbInstances: 0,
          routes: []
        },
        {
          id: 'd22dd44a-9e36-4166-841f-72fbe327bfe3',
          name: 'Container Data Generic (L) enzh',
          status: 'downloaded',
          nbInstances: 0,
          routes: []
        },
        {
          id: '8bfbdcc6-acfd-4837-80d5-79ca2d1c4dab',
          name: 'PTE Data Generic (L) enzh',
          status: 'downloaded',
          nbInstances: 0,
          routes: []
        },
        {
          id: '68a29163-dcaa-4da8-8350-cbe7d4568b8c',
          name: 'Common Image',
          status: 'downloaded',
          nbInstances: 0,
          routes: []
        },
        {
          id: '798de704-a607-45e3-8ba1-17a2b3ccd5dd',
          name: 'PTE Generic (M) enpl',
          status: 'installed',
          nbInstances: 1,
          routes: []
        },
        {
          id: 'dbd5104b-7666-4717-8adc-e8091f82aad2',
          name: 'Container Generic (L) esfr',
          status: 'installed',
          nbInstances: 1,
          routes: []
        },
        {
          id: '9d1c204c-97a3-4c4c-a61a-4cd361d0085d',
          name: 'PTE Generic (L) enfr',
          status: 'installed',
          nbInstances: 1,
          routes: [
            {
              _id: '65c2174a27406fee43575182',
              profileId: '2cf2b832-b38f-4bc5-9845-8b689525a0ee',
              queue: '9d1c204c-97a3-4c4c-a61a-4cd361d0085d',
              serverVersion:
                '6c0ea6c2-6dfc-47d1-9766-cc10483ab3e6_8.23.0-0.el8',
              service: 'Translate_en_fr',
              comment: {
                serviceName: 'permissionsTest_notPreInstalled_SizeL',
                translationResourceId: '9d1c204c-97a3-4c4c-a61a-4cd361d0085d',
                translationResourceName: 'PTE Generic (L) enfr'
              },
              deactivated: false,
              insertedAt: '2024-02-06T11:26:02.877Z',
              insertionTime: '1707130654805',
              internal: true,
              priority: 0,
              public: false,
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
              sharingStatus: 'private',
              source: 'en',
              target: 'fr',
              users: ['65c0bf1cca236c210bb269b7'],
              version: '2.0'
            },
            {
              _id: '65c2174a27406fee4357516a',
              profileId: '8dd2e2ef-011f-4e28-b97d-74115daca626',
              queue: '9d1c204c-97a3-4c4c-a61a-4cd361d0085d',
              serverVersion:
                '6c0ea6c2-6dfc-47d1-9766-cc10483ab3e6_8.23.0-0.el8',
              service: 'Translate_en_fr',
              comment: {
                serviceName: 'permissionsTest_notPreInstalled_SizeL',
                translationResourceId: '9d1c204c-97a3-4c4c-a61a-4cd361d0085d',
                translationResourceName: 'PTE Generic (L) enfr'
              },
              deactivated: false,
              insertedAt: '2024-02-06T11:26:02.875Z',
              insertionTime: '1707124640931',
              internal: true,
              priority: 0,
              public: false,
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
              sharingStatus: 'private',
              source: 'en',
              target: 'fr',
              users: ['65c0a791ca236c210bb244dc'],
              version: '2.0'
            },
            {
              _id: '65c2174a27406fee43575148',
              profileId: 'bb9aa262-15a5-44d9-93ed-9cf875e692fa',
              queue: '9d1c204c-97a3-4c4c-a61a-4cd361d0085d',
              serverVersion:
                '6c0ea6c2-6dfc-47d1-9766-cc10483ab3e6_8.23.0-0.el8',
              service: 'Translate_en_fr',
              comment: {
                serviceName: 'aggregatedStatsENFR',
                translationResourceId: '9d1c204c-97a3-4c4c-a61a-4cd361d0085d',
                translationResourceName: 'PTE Generic (L) enfr'
              },
              deactivated: false,
              insertedAt: '2024-02-06T11:26:02.873Z',
              insertionTime: '1707122587108',
              internal: true,
              priority: 0,
              public: true,
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
              sharingStatus: 'public',
              source: 'en',
              target: 'fr',
              users: ['65bcf062cd62015b0621caa0'],
              version: '2.0'
            }
          ]
        },
        {
          id: '34fcd1b6-f6c1-486e-b7d3-1fed760d44d2',
          name: 'PTE Data Generic (L) enpl',
          status: 'downloaded',
          nbInstances: 0,
          routes: []
        },
        {
          id: '010698a9-1ae8-4c68-9ebf-dc7e1608e426',
          name: 'PTE Generic (L) enfr',
          status: 'installed',
          nbInstances: 1,
          routes: [
            {
              _id: '65c2174a27406fee43575152',
              profileId: '5850a5a0-baec-4e4b-8efb-6206677c71f9',
              queue: '010698a9-1ae8-4c68-9ebf-dc7e1608e426',
              serverVersion:
                '6c0ea6c2-6dfc-47d1-9766-cc10483ab3e6_8.23.0-0.el8',
              service: 'Translate_en_fr',
              comment: {
                serviceName: 'credentialsActivity',
                translationResourceId: '010698a9-1ae8-4c68-9ebf-dc7e1608e426',
                translationResourceName: 'PTE Generic (L) enfr'
              },
              deactivated: false,
              insertedAt: '2024-02-06T11:26:02.874Z',
              insertionTime: '1707122820162',
              internal: true,
              priority: 0,
              public: true,
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
              sharingStatus: 'public',
              source: 'en',
              target: 'fr',
              users: ['65bcf062cd62015b0621caa0'],
              version: '2.0'
            }
          ]
        },
        {
          id: '20c177ec-069b-44b8-9fd9-8b288d7d1afc',
          name: 'Container Generic (L) enzh',
          status: 'installed',
          nbInstances: 1,
          routes: []
        },
        {
          id: '4e88a47a-13a4-4776-a879-b298ac15d300',
          name: 'PTE Generic (L) enzh',
          status: 'installed',
          nbInstances: 1,
          routes: [
            {
              _id: '65c2174a27406fee43575156',
              profileId: '55dc34c6-a78b-484e-bcc3-faab9f7620f6',
              queue: '4e88a47a-13a4-4776-a879-b298ac15d300',
              serverVersion:
                '6c0ea6c2-6dfc-47d1-9766-cc10483ab3e6_8.23.0-0.el8',
              service: 'Translate_en_zh',
              comment: {
                serviceName: 'globalActivity_2',
                translationResourceId: '4e88a47a-13a4-4776-a879-b298ac15d300',
                translationResourceName: 'PTE Generic (L) enzh'
              },
              deactivated: false,
              insertedAt: '2024-02-06T11:26:02.874Z',
              insertionTime: '1707123097841',
              internal: true,
              priority: 0,
              public: true,
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
              sharingStatus: 'public',
              source: 'en',
              target: 'zh',
              users: ['65bcf062cd62015b0621caa0'],
              version: '2.0'
            }
          ]
        },
        {
          id: 'ce4a521a-6ab5-4c00-91f0-15cdc943c771',
          name: 'Container Generic (L) fren',
          status: 'installed',
          nbInstances: 1,
          routes: []
        },
        {
          id: '0290d178-9a08-4155-9389-a76ad0f44f3e',
          name: 'Container Data Generic (M) enpl',
          status: 'downloaded',
          nbInstances: 0,
          routes: []
        },
        {
          id: '01b96095-62cf-4b60-b4c9-843b556ae89c',
          name: 'Container Generic (L) deen',
          status: 'installed',
          nbInstances: 1,
          routes: []
        },
        {
          id: 'be28ee9f-8b9f-485e-a82a-66d0738dbf09',
          name: 'PTE Data Generic (L) esfr',
          status: 'downloaded',
          nbInstances: 0,
          routes: []
        },
        {
          id: 'ad819630-e702-4d94-99a2-b1b4706cd35e',
          name: 'PTE Data Generic (M) ende',
          status: 'downloaded',
          nbInstances: 0,
          routes: []
        },
        {
          id: '328a414f-db98-43f9-8155-b822190e2b6b',
          name: 'PTE Generic (L) iten',
          status: 'installed',
          nbInstances: 1,
          routes: [
            {
              _id: '65c2174a27406fee4357515f',
              profileId: 'ec250803-b06a-4144-a543-09cfad3c4ec0',
              queue: '328a414f-db98-43f9-8155-b822190e2b6b',
              serverVersion:
                '6c0ea6c2-6dfc-47d1-9766-cc10483ab3e6_8.23.0-0.el8',
              service: 'Translate_it_en',
              comment: {
                serviceName: 'globalActivity_4',
                translationResourceId: '328a414f-db98-43f9-8155-b822190e2b6b',
                translationResourceName: 'PTE Generic (L) iten'
              },
              deactivated: false,
              insertedAt: '2024-02-06T11:26:02.875Z',
              insertionTime: '1707123098971',
              internal: true,
              priority: 0,
              public: true,
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
              sharingStatus: 'public',
              source: 'it',
              target: 'en',
              users: ['65bcf062cd62015b0621caa0'],
              version: '2.0'
            }
          ]
        },
        {
          id: '167587d4-4f09-438e-b083-dd5ed5217306',
          name: 'PTE Data Generic (M) enhi',
          status: 'downloaded',
          nbInstances: 0,
          routes: []
        },
        {
          id: '2b7126af-991f-41ac-ae27-80f956bc8a53',
          name: 'PTE Data Generic (L) fren',
          status: 'downloaded',
          nbInstances: 0,
          routes: []
        },
        {
          id: 'e009ea90-a53a-4280-a82f-e6ee8db512a2',
          name: 'Container Data Generic (M) enfr',
          status: 'downloaded',
          nbInstances: 0,
          routes: []
        },
        {
          id: 'b866d27f-4f16-44b4-b53d-8723ffd5daa8',
          name: 'Filter',
          status: 'installed',
          nbInstances: 1,
          routes: [
            {
              _id: '65c2174a27406fee4357514b',
              profileId: '0d2403b6-1eeb-46c5-a33a-289c60eb4767',
              queue: 'b866d27f-4f16-44b4-b53d-8723ffd5daa8',
              serverVersion:
                '6c0ea6c2-6dfc-47d1-9766-cc10483ab3e6_8.23.0-0.el8',
              service: 'Filter',
              comment: {
                serviceName: 'Filter',
                translationResourceId: 'b866d27f-4f16-44b4-b53d-8723ffd5daa8',
                translationResourceName: 'Filter'
              },
              deactivated: false,
              insertedAt: '2024-02-06T11:26:02.873Z',
              insertionTime: '1706890754726',
              internal: false,
              priority: 0,
              public: true,
              running: true,
              sharingStatus: 'public',
              version: '2.0'
            },
            {
              _id: '65c2174a27406fee43575141',
              profileId: '6a0977ef-42d1-4897-b357-cf91df0bc6de',
              queue: 'b866d27f-4f16-44b4-b53d-8723ffd5daa8',
              serverVersion:
                '6c0ea6c2-6dfc-47d1-9766-cc10483ab3e6_8.23.0-0.el8',
              service: 'Filter',
              comment: {
                serviceName: 'Filter',
                translationResourceId: 'b866d27f-4f16-44b4-b53d-8723ffd5daa8',
                translationResourceName: 'Filter'
              },
              deactivated: false,
              insertedAt: '2024-02-06T11:26:02.872Z',
              insertionTime: '1706881303502',
              internal: false,
              priority: 0,
              public: true,
              running: true,
              sharingStatus: 'public',
              version: '2.0'
            }
          ]
        },
        {
          id: '0cb55949-1dd7-4086-963c-086d68acfd72',
          name: 'Container Data Generic (M) enhi',
          status: 'downloaded',
          nbInstances: 0,
          routes: []
        },
        {
          id: '1d046c5e-748d-4ae9-a826-65d0756cbd43',
          name: 'Container Data Generic (L) fren',
          status: 'downloaded',
          nbInstances: 0,
          routes: []
        },
        {
          id: 'c91ca2a6-5a24-40ad-a855-bbdf59ff4351',
          name: 'Container Generic (M) enfr',
          status: 'installed',
          nbInstances: 1,
          routes: []
        },
        {
          id: 'b0953f73-fd7d-4b70-a656-2dd944437ef0',
          name: 'PTE Generic (L) deen',
          status: 'installed',
          nbInstances: 1,
          routes: [
            {
              _id: '65c2174a27406fee4357515a',
              profileId: '4f1bf970-be5d-43a4-971f-e6abeeeaf249',
              queue: 'b0953f73-fd7d-4b70-a656-2dd944437ef0',
              serverVersion:
                '6c0ea6c2-6dfc-47d1-9766-cc10483ab3e6_8.23.0-0.el8',
              service: 'Translate_de_en',
              comment: {
                serviceName: 'globalActivity_3',
                translationResourceId: 'b0953f73-fd7d-4b70-a656-2dd944437ef0',
                translationResourceName: 'PTE Generic (L) deen'
              },
              deactivated: false,
              insertedAt: '2024-02-06T11:26:02.875Z',
              insertionTime: '1707123098281',
              internal: true,
              priority: 0,
              public: true,
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
              sharingStatus: 'public',
              source: 'de',
              target: 'en',
              users: ['65bcf062cd62015b0621caa0'],
              version: '2.0'
            }
          ]
        },
        {
          id: '527dd9c6-9965-4c24-aaaa-6962125d5f08',
          name: 'PTE Generic (L) esfr',
          status: 'installed',
          nbInstances: 1,
          routes: [
            {
              _id: '65c2174a27406fee4357517b',
              profileId: '94af33c6-4195-43da-9d95-3aaa054d8b44',
              queue: '527dd9c6-9965-4c24-aaaa-6962125d5f08',
              serverVersion:
                '6c0ea6c2-6dfc-47d1-9766-cc10483ab3e6_8.23.0-0.el8',
              service: 'Translate_es_fr',
              comment: {
                serviceName: 'textTranslateESFR',
                translationResourceId: '527dd9c6-9965-4c24-aaaa-6962125d5f08',
                translationResourceName: 'PTE Generic (L) esfr'
              },
              deactivated: false,
              insertedAt: '2024-02-06T11:26:02.876Z',
              insertionTime: '1707127614845',
              internal: true,
              priority: 0,
              public: true,
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
              sharingStatus: 'public',
              source: 'es',
              target: 'fr',
              users: ['65bcf062cd62015b0621caa0'],
              version: '2.0'
            }
          ]
        },
        {
          id: '4f29bfa4-a0fb-4cc9-82f3-38c81403f419',
          name: 'PTE Generic (M) enes',
          status: 'installed',
          nbInstances: 1,
          routes: [
            {
              _id: '65c2174a27406fee4357514e',
              profileId: '4f02f553-57aa-4035-a628-291f12e84ad7',
              queue: '4f29bfa4-a0fb-4cc9-82f3-38c81403f419',
              serverVersion:
                '6c0ea6c2-6dfc-47d1-9766-cc10483ab3e6_8.23.0-0.el8',
              service: 'Translate_en_es',
              comment: {
                serviceName: 'aggregatedStatsENES',
                translationResourceId: '4f29bfa4-a0fb-4cc9-82f3-38c81403f419',
                translationResourceName: 'PTE Generic (M) enes'
              },
              deactivated: false,
              insertedAt: '2024-02-06T11:26:02.873Z',
              insertionTime: '1707122588069',
              internal: true,
              priority: 0,
              public: true,
              running: true,
              selectors: {
                domain: 'Generic',
                owner: 'TED',
                size: 'M',
                tech: {
                  name: 'Docker-OpenNMT-ctranslate',
                  type: 'NMT'
                }
              },
              sharingStatus: 'public',
              source: 'en',
              target: 'es',
              users: ['65bcf062cd62015b0621caa0'],
              version: '2.0'
            }
          ]
        },
        {
          id: '4abbab90-fa74-49d3-8f9e-be48997ca345',
          name: 'PTE Data Generic (M) enfr',
          status: 'downloaded',
          nbInstances: 0,
          routes: []
        },
        {
          id: 'c7d8bac5-941a-4f6c-b67b-e18a746f4fab',
          name: 'Container Generic (L) iten',
          status: 'installed',
          nbInstances: 1,
          routes: []
        },
        {
          id: '6b6657e6-f21f-4fce-90f3-e7a818fb96c4',
          name: 'PTE Data Generic (M) enpl',
          status: 'downloaded',
          nbInstances: 0,
          routes: []
        },
        {
          id: '6fc0a22c-4074-4ef7-8f09-83da5cbc8d69',
          name: 'Container Data Generic (L) iten',
          status: 'downloaded',
          nbInstances: 0,
          routes: []
        }
      ],
      name: 'Computing Node'
    },
    {
      name: 'TRS Poller',
      status: 'running',
      lastPollingDate: '2024-02-08T09:31:53.232Z',
      lastTrsUpdate: '2024-02-08T09:31:53.232Z',
      app: {
        version: '9.11.0-0.el8'
      },
      lastUpdate: '2024-02-08T09:32:14.421Z'
    },
    {
      name: 'SES File Translation Consumer',
      app: {
        version: '9.11.0-0.el8'
      },
      status: 'running'
    },
    {
      name: 'SES Poller',
      app: {
        version: '9.11.0-0.el8'
      },
      status: 'running'
    }
  ],
  total: 19,
  running: 19,
  failed: 0
};
