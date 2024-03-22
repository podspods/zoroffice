import { Meta, StoryObj } from '@storybook/react';
import { rest } from 'msw';
import Apis from '@/utils/apis';
import AdministrationServerManagementServices from './page';

const meta: Meta<typeof AdministrationServerManagementServices> = {
  title: 'pages/AdministrationServerManagementServices',
  component: AdministrationServerManagementServices,
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
      _id: '659d832c74582a82f94ee569',
      type: 'RabbitMQ',
      hostname: 'http://rabbitmq:15672/',
      insertedAt: '2024-01-17T17:25:12.777Z',
      app: {
        version: '3.9.29',
        semverVersion: '3.9.29',
        invalidVersion: false
      },
      data: {
        managementUrl: 'http://rabbitmq:15672/',
        name: 'RabbitMQ',
        hostname: 'http://rabbitmq:15672/',
        displayName: 'RabbitMQ (used by ses-file-translation-consumer)',
        overview: {
          management_version: '3.9.29',
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
          product_version: '3.9.29',
          product_name: 'RabbitMQ',
          rabbitmq_version: '3.9.29',
          cluster_name: 'rabbit@rabbitmq',
          erlang_version: '25.3',
          erlang_full_version:
            'Erlang/OTP 25 [erts-13.2] [source] [64-bit] [smp:8:8] [ds:8:8:10] [async-threads:1] [jit:ns]',
          release_series_support_status: 'out of support',
          disable_stats: false,
          enable_queue_totals: false,
          message_stats: {
            ack: 526573,
            ack_details: {
              rate: 0
            },
            confirm: 526575,
            confirm_details: {
              rate: 0.4
            },
            deliver: 526573,
            deliver_details: {
              rate: 0
            },
            deliver_get: 526573,
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
            disk_writes: 31457,
            disk_writes_details: {
              rate: 0
            },
            drop_unroutable: 26019,
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
            publish: 526575,
            publish_details: {
              rate: 0.4
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
            channel_closed: 91,
            channel_closed_details: {
              rate: 0
            },
            channel_created: 776,
            channel_created_details: {
              rate: 0
            },
            connection_closed: 1,
            connection_closed_details: {
              rate: 0
            },
            connection_created: 460,
            connection_created_details: {
              rate: 0
            },
            queue_created: 41,
            queue_created_details: {
              rate: 0
            },
            queue_declared: 3479,
            queue_declared_details: {
              rate: 0
            },
            queue_deleted: 0,
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
            channels: 685,
            connections: 459,
            consumers: 365,
            exchanges: 8,
            queues: 41
          },
          statistics_db_event_queue: 0,
          node: 'rabbit@rabbitmq',
          listeners: [
            {
              node: 'rabbit@rabbitmq',
              protocol: 'amqp',
              ip_address: '::',
              port: 5672,
              socket_opts: {
                backlog: 128,
                nodelay: true,
                linger: [true, 0],
                exit_on_close: false
              }
            },
            {
              node: 'rabbit@rabbitmq',
              protocol: 'clustering',
              ip_address: '::',
              port: 25672,
              socket_opts: []
            },
            {
              node: 'rabbit@rabbitmq',
              protocol: 'http',
              ip_address: '::',
              port: 15672,
              socket_opts: {
                cowboy_opts: {
                  sendfile: false
                },
                port: 15672
              }
            },
            {
              node: 'rabbit@rabbitmq',
              protocol: 'http/prometheus',
              ip_address: '::',
              port: 15692,
              socket_opts: {
                cowboy_opts: {
                  sendfile: false
                },
                port: 15692,
                protocol: 'http/prometheus'
              }
            }
          ],
          contexts: [
            {
              ssl_opts: [],
              node: 'rabbit@rabbitmq',
              description: 'RabbitMQ Management',
              path: '/',
              cowboy_opts: '[{sendfile,false}]',
              port: '15672'
            },
            {
              ssl_opts: [],
              node: 'rabbit@rabbitmq',
              description: 'RabbitMQ Prometheus',
              path: '/',
              cowboy_opts: '[{sendfile,false}]',
              port: '15692',
              protocol: 'http/prometheus'
            }
          ]
        },
        nodes: [
          {
            partitions: [],
            os_pid: '22',
            fd_total: 1048576,
            sockets_total: 943629,
            mem_limit: 12320499302,
            mem_alarm: false,
            disk_free_limit: 50000000,
            disk_free_alarm: false,
            proc_total: 1048576,
            rates_mode: 'basic',
            uptime: 2396253092,
            run_queue: 1,
            processors: 8,
            exchange_types: [
              {
                name: 'x-delayed-message',
                description: 'Delayed Message Exchange.',
                enabled: true
              },
              {
                name: 'headers',
                description:
                  'AMQP headers exchange, as per the AMQP specification',
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
                name: 'direct',
                description:
                  'AMQP direct exchange, as per the AMQP specification',
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
                name: 'accept',
                description: 'Accept header(s) for Erlang/Elixir',
                version: '0.3.5'
              },
              {
                name: 'amqp10_common',
                description:
                  'Modules shared by rabbitmq-amqp1.0 and rabbitmq-amqp1.0-client',
                version: '3.9.29'
              },
              {
                name: 'amqp_client',
                description: 'RabbitMQ AMQP Client',
                version: '3.9.29'
              },
              {
                name: 'asn1',
                description: 'The Erlang ASN1 compiler version 5.0.21',
                version: '5.0.21'
              },
              {
                name: 'aten',
                description: 'Erlang node failure detector',
                version: '0.5.8'
              },
              {
                name: 'compiler',
                description: 'ERTS  CXC 138 10',
                version: '8.2.4'
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
                version: '3.1.0'
              },
              {
                name: 'crypto',
                description: 'CRYPTO',
                version: '5.1.3'
              },
              {
                name: 'cuttlefish',
                description: 'cuttlefish configuration abstraction',
                version: '3.0.1'
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
                version: '8.3'
              },
              {
                name: 'jsx',
                description: 'a streaming, evented json parsing toolkit',
                version: '3.1.0'
              },
              {
                name: 'kernel',
                description: 'ERTS  CXC 138 10',
                version: '8.5.4'
              },
              {
                name: 'mnesia',
                description: 'MNESIA  CXC 138 12',
                version: '4.21.4'
              },
              {
                name: 'observer_cli',
                description: 'Visualize Erlang Nodes On The Command Line',
                version: '1.7.3'
              },
              {
                name: 'os_mon',
                description: 'CPO  CXC 138 46',
                version: '2.8.1'
              },
              {
                name: 'osiris',
                description: 'New project',
                version: '1.0.0'
              },
              {
                name: 'prometheus',
                description: 'Prometheus.io client in Erlang',
                version: '4.9.1'
              },
              {
                name: 'public_key',
                description: 'Public key infrastructure',
                version: '1.13.3'
              },
              {
                name: 'ra',
                description: 'Raft library',
                version: '2.0.13'
              },
              {
                name: 'rabbit',
                description: 'RabbitMQ',
                version: '3.9.29'
              },
              {
                name: 'rabbit_common',
                description:
                  'Modules shared by rabbitmq-server and rabbitmq-erlang-client',
                version: '3.9.29'
              },
              {
                name: 'rabbitmq_delayed_message_exchange',
                description: 'RabbitMQ Delayed Message Exchange',
                version: '3.9.0'
              },
              {
                name: 'rabbitmq_management',
                description: 'RabbitMQ Management Console',
                version: '3.9.29'
              },
              {
                name: 'rabbitmq_management_agent',
                description: 'RabbitMQ Management Agent',
                version: '3.9.29'
              },
              {
                name: 'rabbitmq_prelaunch',
                description: 'RabbitMQ prelaunch setup',
                version: '3.9.29'
              },
              {
                name: 'rabbitmq_prometheus',
                description: '',
                version: '3.9.29'
              },
              {
                name: 'rabbitmq_web_dispatch',
                description: 'RabbitMQ Web Dispatcher',
                version: '3.9.29'
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
                description: 'Counters',
                version: '0.1.0'
              },
              {
                name: 'ssl',
                description: 'Erlang/OTP SSL application',
                version: '10.9'
              },
              {
                name: 'stdlib',
                description: 'ERTS  CXC 138 10',
                version: '4.3'
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
                name: 'tools',
                description: 'DEVTOOLS  CXC 138 16',
                version: '3.5.3'
              },
              {
                name: 'xmerl',
                description: 'XML parser',
                version: '1.3.31'
              }
            ],
            contexts: [
              {
                description: 'RabbitMQ Management',
                path: '/',
                cowboy_opts: '[{sendfile,false}]',
                port: '15672'
              },
              {
                description: 'RabbitMQ Prometheus',
                path: '/',
                cowboy_opts: '[{sendfile,false}]',
                port: '15692',
                protocol: 'http/prometheus'
              }
            ],
            log_files: [
              '/var/log/rabbitmq/rabbit@rabbitmq_upgrade.log',
              '<stdout>'
            ],
            db_dir: '/var/lib/rabbitmq/mnesia/rabbit@rabbitmq',
            config_files: ['/etc/rabbitmq/conf.d/10-defaults.conf'],
            net_ticktime: 60,
            enabled_plugins: [
              'rabbitmq_delayed_message_exchange',
              'rabbitmq_management',
              'rabbitmq_prometheus'
            ],
            mem_calculation_strategy: 'rss',
            ra_open_file_metrics: {
              ra_log_wal: 1,
              ra_log_segment_writer: 0
            },
            name: 'rabbit@rabbitmq',
            type: 'disc',
            running: true,
            mem_used: 382402560,
            mem_used_details: {
              rate: 754483.2
            },
            fd_used: 507,
            fd_used_details: {
              rate: 0
            },
            sockets_used: 459,
            sockets_used_details: {
              rate: 0
            },
            proc_used: 6440,
            proc_used_details: {
              rate: 0
            },
            disk_free: 122381864960,
            disk_free_details: {
              rate: 0
            },
            gc_num: 993726335,
            gc_num_details: {
              rate: 410.4
            },
            gc_bytes_reclaimed: 39822423848736,
            gc_bytes_reclaimed_details: {
              rate: 16481438.4
            },
            context_switches: 1804801147,
            context_switches_details: {
              rate: 768.6
            },
            io_read_count: 1,
            io_read_count_details: {
              rate: 0
            },
            io_read_bytes: 1,
            io_read_bytes_details: {
              rate: 0
            },
            io_read_avg_time: 0.065,
            io_read_avg_time_details: {
              rate: 0
            },
            io_write_count: 52621,
            io_write_count_details: {
              rate: 0
            },
            io_write_bytes: 28831334,
            io_write_bytes_details: {
              rate: 0
            },
            io_write_avg_time: 0.21217557629083447,
            io_write_avg_time_details: {
              rate: 0
            },
            io_sync_count: 52621,
            io_sync_count_details: {
              rate: 0
            },
            io_sync_avg_time: 3.3928285475380555,
            io_sync_avg_time_details: {
              rate: 0
            },
            io_seek_count: 19179,
            io_seek_count_details: {
              rate: 0
            },
            io_seek_avg_time: 0.07627994160279472,
            io_seek_avg_time_details: {
              rate: 0
            },
            io_reopen_count: 0,
            io_reopen_count_details: {
              rate: 0
            },
            mnesia_ram_tx_count: 3889,
            mnesia_ram_tx_count_details: {
              rate: 0
            },
            mnesia_disk_tx_count: 88,
            mnesia_disk_tx_count_details: {
              rate: 0
            },
            msg_store_read_count: 0,
            msg_store_read_count_details: {
              rate: 0
            },
            msg_store_write_count: 107,
            msg_store_write_count_details: {
              rate: 0
            },
            queue_index_journal_write_count: 94371,
            queue_index_journal_write_count_details: {
              rate: 0
            },
            queue_index_write_count: 2,
            queue_index_write_count_details: {
              rate: 0
            },
            queue_index_read_count: 0,
            queue_index_read_count_details: {
              rate: 0
            },
            io_file_handle_open_attempt_count: 166397,
            io_file_handle_open_attempt_count_details: {
              rate: 0
            },
            io_file_handle_open_attempt_avg_time: 0.001831841920226927,
            io_file_handle_open_attempt_avg_time_details: {
              rate: 0
            },
            connection_created: 460,
            connection_created_details: {
              rate: 0
            },
            connection_closed: 1,
            connection_closed_details: {
              rate: 0
            },
            channel_created: 776,
            channel_created_details: {
              rate: 0
            },
            channel_closed: 91,
            channel_closed_details: {
              rate: 0
            },
            queue_declared: 3479,
            queue_declared_details: {
              rate: 0
            },
            queue_created: 41,
            queue_created_details: {
              rate: 0
            },
            queue_deleted: 0,
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
              next_seq_id: 2,
              q1: 0,
              q2: 0,
              q3: 0,
              q4: 0,
              target_ram_count: 'infinity'
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
              minor_gcs: 39941
            },
            head_message_timestamp: null,
            idle_since: '2024-02-06 11:08:33',
            memory: 12848,
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
            name: 'CorpusManager.DeferredWork',
            node: 'rabbit@rabbitmq',
            operator_policy: null,
            policy: null,
            recoverable_slaves: null,
            reductions: 28323534,
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
              avg_ack_egress_rate: 0.09996931949509894,
              avg_ack_ingress_rate: 0.09996931949509894,
              avg_egress_rate: 0.09996931949509894,
              avg_ingress_rate: 0.09996931949509894,
              delta: ['delta', 'undefined', 0, 0, 'undefined'],
              len: 0,
              mode: 'default',
              next_seq_id: 244859,
              q1: 0,
              q2: 0,
              q3: 0,
              q4: 0,
              target_ram_count: 'infinity'
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
              minor_gcs: 610
            },
            head_message_timestamp: null,
            memory: 452632,
            message_bytes: 0,
            message_bytes_paged_out: 0,
            message_bytes_persistent: 0,
            message_bytes_ram: 0,
            message_bytes_ready: 0,
            message_bytes_unacknowledged: 0,
            message_stats: {
              ack: 244859,
              ack_details: {
                rate: 0
              },
              deliver: 244859,
              deliver_details: {
                rate: 0
              },
              deliver_get: 244859,
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
              publish: 244860,
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
            name: 'Reply.6b989ba5-29ae-4864-8f9e-4f0de23b64f0',
            node: 'rabbit@rabbitmq',
            operator_policy: null,
            policy: null,
            recoverable_slaves: null,
            reductions: 1102854628,
            reductions_details: {
              rate: 925
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
              next_seq_id: 5396,
              q1: 0,
              q2: 0,
              q3: 0,
              q4: 0,
              target_ram_count: 'infinity'
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
              minor_gcs: 39016
            },
            head_message_timestamp: null,
            idle_since: '2024-02-06 11:08:33',
            memory: 86704,
            message_bytes: 0,
            message_bytes_paged_out: 0,
            message_bytes_persistent: 0,
            message_bytes_ram: 0,
            message_bytes_ready: 0,
            message_bytes_unacknowledged: 0,
            message_stats: {
              ack: 5396,
              ack_details: {
                rate: 0
              },
              deliver: 5396,
              deliver_details: {
                rate: 0
              },
              deliver_get: 5396,
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
              publish: 5396,
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
            node: 'rabbit@rabbitmq',
            operator_policy: null,
            policy: null,
            recoverable_slaves: null,
            reductions: 109465333,
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
              avg_ack_egress_rate: 0.09996272645004729,
              avg_ack_ingress_rate: 0.09996272645004729,
              avg_egress_rate: 0.09996272645004729,
              avg_ingress_rate: 0.09996272645004729,
              delta: ['delta', 'undefined', 0, 0, 'undefined'],
              len: 0,
              mode: 'default',
              next_seq_id: 239522,
              q1: 0,
              q2: 0,
              q3: 0,
              q4: 0,
              target_ram_count: 'infinity'
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
              minor_gcs: 48
            },
            head_message_timestamp: null,
            memory: 305144,
            message_bytes: 0,
            message_bytes_paged_out: 0,
            message_bytes_persistent: 0,
            message_bytes_ram: 0,
            message_bytes_ready: 0,
            message_bytes_unacknowledged: 0,
            message_stats: {
              ack: 239522,
              ack_details: {
                rate: 0
              },
              deliver: 239522,
              deliver_details: {
                rate: 0
              },
              deliver_get: 239522,
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
              publish: 239523,
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
            node: 'rabbit@rabbitmq',
            operator_policy: null,
            policy: null,
            recoverable_slaves: null,
            reductions: 706197548,
            reductions_details: {
              rate: 585.4
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
              next_seq_id: 6,
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
              target_ram_count: 'infinity'
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
              minor_gcs: 39955
            },
            head_message_timestamp: null,
            idle_since: '2024-02-06 11:08:33',
            memory: 72472,
            message_bytes: 0,
            message_bytes_paged_out: 0,
            message_bytes_persistent: 0,
            message_bytes_ram: 0,
            message_bytes_ready: 0,
            message_bytes_unacknowledged: 0,
            message_stats: {
              ack: 6,
              ack_details: {
                rate: 0
              },
              deliver: 6,
              deliver_details: {
                rate: 0
              },
              deliver_get: 6,
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
              publish: 6,
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
            name: 'Request.v2.1dac73db-ab89-42fc-bedd-9af0a0d7f2a0',
            node: 'rabbit@rabbitmq',
            operator_policy: null,
            policy: null,
            recoverable_slaves: null,
            reductions: 141328774,
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
              next_seq_id: 414,
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
              target_ram_count: 'infinity'
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
              minor_gcs: 58430
            },
            head_message_timestamp: null,
            idle_since: '2024-02-06 11:08:33',
            memory: 96288,
            message_bytes: 0,
            message_bytes_paged_out: 0,
            message_bytes_persistent: 0,
            message_bytes_ram: 0,
            message_bytes_ready: 0,
            message_bytes_unacknowledged: 0,
            message_stats: {
              ack: 414,
              ack_details: {
                rate: 0
              },
              deliver: 414,
              deliver_details: {
                rate: 0
              },
              deliver_get: 414,
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
              publish: 414,
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
            name: 'Request.v2.2c9b02ef-1e21-46a3-9c10-99e53999d3c6',
            node: 'rabbit@rabbitmq',
            operator_policy: null,
            policy: null,
            recoverable_slaves: null,
            reductions: 153472601,
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
              next_seq_id: 9812,
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
              target_ram_count: 'infinity'
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
              minor_gcs: 39958
            },
            head_message_timestamp: null,
            idle_since: '2024-02-06 11:08:33',
            memory: 121592,
            message_bytes: 0,
            message_bytes_paged_out: 0,
            message_bytes_persistent: 0,
            message_bytes_ram: 0,
            message_bytes_ready: 0,
            message_bytes_unacknowledged: 0,
            message_stats: {
              ack: 9812,
              ack_details: {
                rate: 0
              },
              deliver: 9812,
              deliver_details: {
                rate: 0
              },
              deliver_get: 9812,
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
              publish: 9812,
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
            node: 'rabbit@rabbitmq',
            operator_policy: null,
            policy: null,
            recoverable_slaves: null,
            reductions: 189998957,
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
              next_seq_id: 92,
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
              target_ram_count: 'infinity'
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
              minor_gcs: 58440
            },
            head_message_timestamp: null,
            idle_since: '2024-02-06 11:08:34',
            memory: 93928,
            message_bytes: 0,
            message_bytes_paged_out: 0,
            message_bytes_persistent: 0,
            message_bytes_ram: 0,
            message_bytes_ready: 0,
            message_bytes_unacknowledged: 0,
            message_stats: {
              ack: 92,
              ack_details: {
                rate: 0
              },
              deliver: 92,
              deliver_details: {
                rate: 0
              },
              deliver_get: 92,
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
              publish: 92,
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
            name: 'Request.v2.7ea61879-12a4-4433-a9e9-e6ac1ab14345',
            node: 'rabbit@rabbitmq',
            operator_policy: null,
            policy: null,
            recoverable_slaves: null,
            reductions: 155341765,
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
              next_seq_id: 0,
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
              target_ram_count: 'infinity'
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
              minor_gcs: 39944
            },
            head_message_timestamp: null,
            idle_since: '2024-02-06 11:08:34',
            memory: 70760,
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
            name: 'Request.v2.83428294-77bb-4ff6-8398-98de0888f09c',
            node: 'rabbit@rabbitmq',
            operator_policy: null,
            policy: null,
            recoverable_slaves: null,
            reductions: 140106988,
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
              next_seq_id: 1,
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
              target_ram_count: 'infinity'
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
              minor_gcs: 39962
            },
            head_message_timestamp: null,
            idle_since: '2024-02-06 11:08:33',
            memory: 71168,
            message_bytes: 0,
            message_bytes_paged_out: 0,
            message_bytes_persistent: 0,
            message_bytes_ram: 0,
            message_bytes_ready: 0,
            message_bytes_unacknowledged: 0,
            message_stats: {
              ack: 1,
              ack_details: {
                rate: 0
              },
              deliver: 1,
              deliver_details: {
                rate: 0
              },
              deliver_get: 1,
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
              publish: 1,
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
            name: 'Request.v2.99f42b38-0a0d-4ec9-9f43-2950b182e09d',
            node: 'rabbit@rabbitmq',
            operator_policy: null,
            policy: null,
            recoverable_slaves: null,
            reductions: 140512834,
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
              next_seq_id: 0,
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
              target_ram_count: 'infinity'
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
              minor_gcs: 39962
            },
            head_message_timestamp: null,
            idle_since: '2024-02-06 11:08:34',
            memory: 70744,
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
            name: 'Request.v2.9deccef4-d0b1-4cc5-8022-e8638a369a89',
            node: 'rabbit@rabbitmq',
            operator_policy: null,
            policy: null,
            recoverable_slaves: null,
            reductions: 140105131,
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
              next_seq_id: 404,
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
              target_ram_count: 'infinity'
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
              minor_gcs: 60064
            },
            head_message_timestamp: null,
            idle_since: '2024-02-06 11:08:33',
            memory: 109432,
            message_bytes: 0,
            message_bytes_paged_out: 0,
            message_bytes_persistent: 0,
            message_bytes_ram: 0,
            message_bytes_ready: 0,
            message_bytes_unacknowledged: 0,
            message_stats: {
              ack: 404,
              ack_details: {
                rate: 0
              },
              deliver: 404,
              deliver_details: {
                rate: 0
              },
              deliver_get: 404,
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
              publish: 404,
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
            node: 'rabbit@rabbitmq',
            operator_policy: null,
            policy: null,
            recoverable_slaves: null,
            reductions: 167999348,
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
              next_seq_id: 4,
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
              target_ram_count: 'infinity'
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
              minor_gcs: 39972
            },
            head_message_timestamp: null,
            idle_since: '2024-02-06 11:08:33',
            memory: 71960,
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
            name: 'Request.v2.d45a105b-8407-48da-99f3-6a8f23c0cbb6',
            node: 'rabbit@rabbitmq',
            operator_policy: null,
            policy: null,
            recoverable_slaves: null,
            reductions: 140981383,
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
              next_seq_id: 6,
              q1: 0,
              q2: 0,
              q3: 0,
              q4: 0,
              target_ram_count: 'infinity'
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
              minor_gcs: 19985
            },
            head_message_timestamp: null,
            idle_since: '2024-02-06 11:08:34',
            memory: 19776,
            message_bytes: 0,
            message_bytes_paged_out: 0,
            message_bytes_persistent: 0,
            message_bytes_ram: 0,
            message_bytes_ready: 0,
            message_bytes_unacknowledged: 0,
            message_stats: {
              ack: 6,
              ack_details: {
                rate: 0
              },
              deliver: 6,
              deliver_details: {
                rate: 0
              },
              deliver_get: 6,
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
              publish: 6,
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
            name: 'SesFileTranslationConsumer.CheckReachedQuota',
            node: 'rabbit@rabbitmq',
            operator_policy: null,
            policy: null,
            recoverable_slaves: null,
            reductions: 31608516,
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
              next_seq_id: 0,
              q1: 0,
              q2: 0,
              q3: 0,
              q4: 0,
              target_ram_count: 'infinity'
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
              minor_gcs: 19966
            },
            head_message_timestamp: null,
            idle_since: '2024-02-06 11:08:33',
            memory: 15744,
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
            node: 'rabbit@rabbitmq',
            operator_policy: null,
            policy: null,
            recoverable_slaves: null,
            reductions: 28965417,
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
              next_seq_id: 0,
              q1: 0,
              q2: 0,
              q3: 0,
              q4: 0,
              target_ram_count: 'infinity'
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
              minor_gcs: 19966
            },
            head_message_timestamp: null,
            idle_since: '2024-02-06 11:08:34',
            memory: 15736,
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
            node: 'rabbit@rabbitmq',
            operator_policy: null,
            policy: null,
            recoverable_slaves: null,
            reductions: 28965421,
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
              next_seq_id: 0,
              q1: 0,
              q2: 0,
              q3: 0,
              q4: 0,
              target_ram_count: 'infinity'
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
              minor_gcs: 19966
            },
            head_message_timestamp: null,
            idle_since: '2024-02-06 11:08:33',
            memory: 15736,
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
            node: 'rabbit@rabbitmq',
            operator_policy: null,
            policy: null,
            recoverable_slaves: null,
            reductions: 28965275,
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
              next_seq_id: 6,
              q1: 0,
              q2: 0,
              q3: 0,
              q4: 0,
              target_ram_count: 'infinity'
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
              minor_gcs: 19993
            },
            head_message_timestamp: null,
            idle_since: '2024-02-06 11:08:34',
            memory: 18864,
            message_bytes: 0,
            message_bytes_paged_out: 0,
            message_bytes_persistent: 0,
            message_bytes_ram: 0,
            message_bytes_ready: 0,
            message_bytes_unacknowledged: 0,
            message_stats: {
              ack: 6,
              ack_details: {
                rate: 0
              },
              deliver: 6,
              deliver_details: {
                rate: 0
              },
              deliver_get: 6,
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
            name: 'SesFileTranslationConsumer.FileConsumption',
            node: 'rabbit@rabbitmq',
            operator_policy: null,
            policy: null,
            recoverable_slaves: null,
            reductions: 30918224,
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
              next_seq_id: 0,
              q1: 0,
              q2: 0,
              q3: 0,
              q4: 0,
              target_ram_count: 'infinity'
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
              minor_gcs: 19973
            },
            head_message_timestamp: null,
            idle_since: '2024-02-06 11:08:33',
            memory: 15720,
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
            node: 'rabbit@rabbitmq',
            operator_policy: null,
            policy: null,
            recoverable_slaves: null,
            reductions: 28925237,
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
              next_seq_id: 3,
              q1: 0,
              q2: 0,
              q3: 0,
              q4: 0,
              target_ram_count: 'infinity'
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
              minor_gcs: 19978
            },
            head_message_timestamp: null,
            idle_since: '2024-02-06 11:08:34',
            memory: 19504,
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
            name: 'SesFileTranslationConsumer.FileConsumptionNotifications',
            node: 'rabbit@rabbitmq',
            operator_policy: null,
            policy: null,
            recoverable_slaves: null,
            reductions: 31471376,
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
              next_seq_id: 0,
              q1: 0,
              q2: 0,
              q3: 0,
              q4: 0,
              target_ram_count: 'infinity'
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
              minor_gcs: 19966
            },
            head_message_timestamp: null,
            idle_since: '2024-02-06 11:08:34',
            memory: 15752,
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
            node: 'rabbit@rabbitmq',
            operator_policy: null,
            policy: null,
            recoverable_slaves: null,
            reductions: 28965307,
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
              next_seq_id: 6,
              q1: 0,
              q2: 0,
              q3: 0,
              q4: 0,
              target_ram_count: 'infinity'
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
              minor_gcs: 19985
            },
            head_message_timestamp: null,
            idle_since: '2024-02-06 11:08:33',
            memory: 19792,
            message_bytes: 0,
            message_bytes_paged_out: 0,
            message_bytes_persistent: 0,
            message_bytes_ram: 0,
            message_bytes_ready: 0,
            message_bytes_unacknowledged: 0,
            message_stats: {
              ack: 6,
              ack_details: {
                rate: 0
              },
              deliver: 6,
              deliver_details: {
                rate: 0
              },
              deliver_get: 6,
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
              publish: 6,
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
            name: 'SesFileTranslationConsumer.FileRoutingQueue',
            node: 'rabbit@rabbitmq',
            operator_policy: null,
            policy: null,
            recoverable_slaves: null,
            reductions: 31622738,
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
              next_seq_id: 0,
              q1: 0,
              q2: 0,
              q3: 0,
              q4: 0,
              target_ram_count: 'infinity'
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
              minor_gcs: 19965
            },
            head_message_timestamp: null,
            idle_since: '2024-02-06 11:08:34',
            memory: 15744,
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
            node: 'rabbit@rabbitmq',
            operator_policy: null,
            policy: null,
            recoverable_slaves: null,
            reductions: 28965310,
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
              next_seq_id: 3,
              q1: 0,
              q2: 0,
              q3: 0,
              q4: 0,
              target_ram_count: 'infinity'
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
              minor_gcs: 19472
            },
            head_message_timestamp: null,
            idle_since: '2024-02-06 11:08:34',
            memory: 19544,
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
            name: 'SesFileTranslationConsumer.FilterExporting',
            node: 'rabbit@rabbitmq',
            operator_policy: null,
            policy: null,
            recoverable_slaves: null,
            reductions: 31481909,
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
              next_seq_id: 0,
              q1: 0,
              q2: 0,
              q3: 0,
              q4: 0,
              target_ram_count: 'infinity'
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
              minor_gcs: 19966
            },
            head_message_timestamp: null,
            idle_since: '2024-02-06 11:08:34',
            memory: 15736,
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
            node: 'rabbit@rabbitmq',
            operator_policy: null,
            policy: null,
            recoverable_slaves: null,
            reductions: 28965268,
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
              next_seq_id: 3,
              q1: 0,
              q2: 0,
              q3: 0,
              q4: 0,
              target_ram_count: 'infinity'
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
              minor_gcs: 19977
            },
            head_message_timestamp: null,
            idle_since: '2024-02-06 11:08:34',
            memory: 19552,
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
            name: 'SesFileTranslationConsumer.Notification',
            node: 'rabbit@rabbitmq',
            operator_policy: null,
            policy: null,
            recoverable_slaves: null,
            reductions: 31509239,
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
              next_seq_id: 0,
              q1: 0,
              q2: 0,
              q3: 0,
              q4: 0,
              target_ram_count: 'infinity'
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
              minor_gcs: 19966
            },
            head_message_timestamp: null,
            idle_since: '2024-02-06 11:08:34',
            memory: 15736,
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
            node: 'rabbit@rabbitmq',
            operator_policy: null,
            policy: null,
            recoverable_slaves: null,
            reductions: 28965267,
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
              next_seq_id: 0,
              q1: 0,
              q2: 0,
              q3: 0,
              q4: 0,
              target_ram_count: 'infinity'
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
              minor_gcs: 19965
            },
            head_message_timestamp: null,
            idle_since: '2024-02-06 11:08:33',
            memory: 15720,
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
            node: 'rabbit@rabbitmq',
            operator_policy: null,
            policy: null,
            recoverable_slaves: null,
            reductions: 28925333,
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
              next_seq_id: 0,
              q1: 0,
              q2: 0,
              q3: 0,
              q4: 0,
              target_ram_count: 'infinity'
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
              minor_gcs: 19966
            },
            head_message_timestamp: null,
            idle_since: '2024-02-06 11:08:33',
            memory: 15728,
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
            node: 'rabbit@rabbitmq',
            operator_policy: null,
            policy: null,
            recoverable_slaves: null,
            reductions: 28925302,
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
              next_seq_id: 0,
              q1: 0,
              q2: 0,
              q3: 0,
              q4: 0,
              target_ram_count: 'infinity'
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
              minor_gcs: 19966
            },
            head_message_timestamp: null,
            idle_since: '2024-02-06 11:08:34',
            memory: 15728,
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
            node: 'rabbit@rabbitmq',
            operator_policy: null,
            policy: null,
            recoverable_slaves: null,
            reductions: 28925314,
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
              next_seq_id: 0,
              q1: 0,
              q2: 0,
              q3: 0,
              q4: 0,
              target_ram_count: 'infinity'
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
              minor_gcs: 19966
            },
            head_message_timestamp: null,
            idle_since: '2024-02-06 11:08:33',
            memory: 15736,
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
            node: 'rabbit@rabbitmq',
            operator_policy: null,
            policy: null,
            recoverable_slaves: null,
            reductions: 28965283,
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
              next_seq_id: 0,
              q1: 0,
              q2: 0,
              q3: 0,
              q4: 0,
              target_ram_count: 'infinity'
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
              minor_gcs: 19966
            },
            head_message_timestamp: null,
            idle_since: '2024-02-06 11:08:34',
            memory: 15728,
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
            node: 'rabbit@rabbitmq',
            operator_policy: null,
            policy: null,
            recoverable_slaves: null,
            reductions: 28925349,
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
              next_seq_id: 0,
              q1: 0,
              q2: 0,
              q3: 0,
              q4: 0,
              target_ram_count: 'infinity'
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
              minor_gcs: 19966
            },
            head_message_timestamp: null,
            idle_since: '2024-02-06 11:08:34',
            memory: 15736,
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
            node: 'rabbit@rabbitmq',
            operator_policy: null,
            policy: null,
            recoverable_slaves: null,
            reductions: 28965262,
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
              next_seq_id: 0,
              q1: 0,
              q2: 0,
              q3: 0,
              q4: 0,
              target_ram_count: 'infinity'
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
              minor_gcs: 19974
            },
            head_message_timestamp: null,
            idle_since: '2024-02-06 11:08:33',
            memory: 15744,
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
            node: 'rabbit@rabbitmq',
            operator_policy: null,
            policy: null,
            recoverable_slaves: null,
            reductions: 28965229,
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
              next_seq_id: 0,
              q1: 0,
              q2: 0,
              q3: 0,
              q4: 0,
              target_ram_count: 'infinity'
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
              minor_gcs: 19966
            },
            head_message_timestamp: null,
            idle_since: '2024-02-06 11:08:34',
            memory: 15752,
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
            node: 'rabbit@rabbitmq',
            operator_policy: null,
            policy: null,
            recoverable_slaves: null,
            reductions: 28965495,
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
              next_seq_id: 18,
              q1: 0,
              q2: 0,
              q3: 0,
              q4: 0,
              target_ram_count: 'infinity'
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
              minor_gcs: 20020
            },
            head_message_timestamp: null,
            idle_since: '2024-02-06 11:08:33',
            memory: 19784,
            message_bytes: 0,
            message_bytes_paged_out: 0,
            message_bytes_persistent: 0,
            message_bytes_ram: 0,
            message_bytes_ready: 0,
            message_bytes_unacknowledged: 0,
            message_stats: {
              ack: 18,
              ack_details: {
                rate: 0
              },
              deliver: 18,
              deliver_details: {
                rate: 0
              },
              deliver_get: 18,
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
              publish: 18,
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
            name: 'SesFileTranslationConsumer.Translation',
            node: 'rabbit@rabbitmq',
            operator_policy: null,
            policy: null,
            recoverable_slaves: null,
            reductions: 31719361,
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
              next_seq_id: 0,
              q1: 0,
              q2: 0,
              q3: 0,
              q4: 0,
              target_ram_count: 'infinity'
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
              minor_gcs: 19966
            },
            head_message_timestamp: null,
            idle_since: '2024-02-06 11:08:34',
            memory: 15736,
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
            node: 'rabbit@rabbitmq',
            operator_policy: null,
            policy: null,
            recoverable_slaves: null,
            reductions: 28965504,
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
              next_seq_id: 26001,
              q1: 0,
              q2: 0,
              q3: 0,
              q4: 0,
              target_ram_count: 'infinity'
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
              minor_gcs: 21305
            },
            head_message_timestamp: null,
            idle_since: '2024-02-06 11:08:33',
            memory: 18872,
            message_bytes: 0,
            message_bytes_paged_out: 0,
            message_bytes_persistent: 0,
            message_bytes_ram: 0,
            message_bytes_ready: 0,
            message_bytes_unacknowledged: 0,
            message_stats: {
              ack: 26001,
              ack_details: {
                rate: 0
              },
              deliver: 26001,
              deliver_details: {
                rate: 0
              },
              deliver_get: 26001,
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
            name: 'SesFileTranslationConsumer.TranslationStatusMonitoring',
            node: 'rabbit@rabbitmq',
            operator_policy: null,
            policy: null,
            recoverable_slaves: null,
            reductions: 114752220,
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
              next_seq_id: 12,
              q1: 0,
              q2: 0,
              q3: 0,
              q4: 0,
              target_ram_count: 'infinity'
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
              minor_gcs: 20004
            },
            head_message_timestamp: null,
            idle_since: '2024-02-06 11:08:34',
            memory: 18896,
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
            name:
              'SesFileTranslationConsumer.TranslationStatusMonitoring.Error',
            node: 'rabbit@rabbitmq',
            operator_policy: null,
            policy: null,
            recoverable_slaves: null,
            reductions: 30960814,
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
              next_seq_id: 3,
              q1: 0,
              q2: 0,
              q3: 0,
              q4: 0,
              target_ram_count: 'infinity'
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
              minor_gcs: 19977
            },
            head_message_timestamp: null,
            idle_since: '2024-02-06 11:08:34',
            memory: 19208,
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
            name: 'SesFileTranslationConsumer.XliffParsing',
            node: 'rabbit@rabbitmq',
            operator_policy: null,
            policy: null,
            recoverable_slaves: null,
            reductions: 31333758,
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
              next_seq_id: 0,
              q1: 0,
              q2: 0,
              q3: 0,
              q4: 0,
              target_ram_count: 'infinity'
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
              minor_gcs: 19972
            },
            head_message_timestamp: null,
            idle_since: '2024-02-06 11:08:34',
            memory: 15736,
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
            node: 'rabbit@rabbitmq',
            operator_policy: null,
            policy: null,
            recoverable_slaves: null,
            reductions: 28965180,
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
          version: '3.9.29',
          semverVersion: '3.9.29',
          invalidVersion: false
        },
        status: 'running'
      },
      lastSuccessfulUpdate: '2024-02-06T11:09:52.042Z',
      lastUpdate: '2024-02-06T11:09:52.042Z',
      status: 'running',
      name: 'RabbitMQ (used by ses-file-translation-consumer)'
    },
    {
      _id: '659d834a74582a82f94f351b',
      hostname: 'rabbitmq',
      insertedAt: '2024-01-09T17:32:58.140Z',
      secure: false,
      version: '2024-02-06T11:09:50.687Z',
      app: {
        version: '3.9.29'
      },
      lastSuccessfulUpdate: '2024-02-06T11:09:50.743Z',
      lastUpdate: '2024-02-06T11:09:50.790Z',
      status: 'running',
      name: 'Broker'
    },
    {
      host: 'mongodb',
      version: '5.0.15',
      process: 'mongod',
      pid: 1,
      uptime: 2396260,
      uptimeMillis: 2396260020,
      uptimeEstimate: 2396260,
      localTime: '2024-02-06T11:09:52.423Z',
      asserts: {
        regular: 0,
        warning: 0,
        msg: 0,
        user: 1477881,
        tripwire: 0,
        rollovers: 0
      },
      catalogStats: {
        collections: 76,
        capped: 0,
        timeseries: 0,
        views: 0,
        internalCollections: 19,
        internalViews: 1
      },
      connections: {
        current: 525,
        available: 838335,
        totalCreated: 738973,
        active: 66,
        threaded: 525,
        exhaustIsMaster: 1,
        exhaustHello: 62,
        awaitingTopologyChanges: 160
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
        localUpdateWallClockTime: '2024-01-09T17:32:13.901Z'
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
        user_time_us: 2823779594929,
        system_time_us: 210226879678,
        maximum_resident_set_kb: 5026276,
        input_blocks: 6060360,
        output_blocks: 29557059680,
        page_reclaims: 139107150,
        page_faults: 2350,
        voluntary_context_switches: 17319345818,
        involuntary_context_switches: 3517155893
      },
      flowControl: {
        enabled: true,
        targetRateLimit: 1000000000,
        timeAcquiringMicros: 145403971,
        locksPerKiloOp: 5,
        sustainerRate: 0,
        isLagged: false,
        isLaggedCount: 0,
        isLaggedTimeMicros: 0
      },
      freeMonitoring: {
        state: 'undecided'
      },
      globalLock: {
        totalTime: 2396260038000,
        currentQueue: {
          total: 0,
          readers: 0,
          writers: 0
        },
        activeClients: {
          total: 0,
          readers: 0,
          writers: 0
        }
      },
      indexBulkBuilder: {
        count: 44,
        resumed: 0,
        filesOpenedForExternalSort: 0,
        filesClosedForExternalSort: 0
      },
      indexStats: {
        count: 513,
        features: {
          '2d': {
            count: 0,
            accesses: 0
          },
          '2dsphere': {
            count: 0,
            accesses: 0
          },
          collation: {
            count: 0,
            accesses: 0
          },
          compound: {
            count: 41,
            accesses: 474782
          },
          hashed: {
            count: 2,
            accesses: 0
          },
          id: {
            count: 148,
            accesses: 127041
          },
          normal: {
            count: 361,
            accesses: 72563998
          },
          partial: {
            count: 0,
            accesses: 0
          },
          single: {
            count: 324,
            accesses: 72089216
          },
          sparse: {
            count: 11,
            accesses: 479354
          },
          text: {
            count: 2,
            accesses: 0
          },
          ttl: {
            count: 29,
            accesses: 1447
          },
          unique: {
            count: 28,
            accesses: 58434173
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
            r: 185787243
          }
        },
        FeatureCompatibilityVersion: {
          acquireCount: {
            r: 22129272185,
            w: 142759427
          }
        },
        ReplicationStateTransition: {
          acquireCount: {
            w: 341212621,
            W: 2
          },
          acquireWaitCount: {
            w: 3
          },
          timeAcquiringMicros: {
            w: 7840
          }
        },
        Global: {
          acquireCount: {
            r: 22172328410,
            w: 212923924,
            W: 6
          }
        },
        Database: {
          acquireCount: {
            r: 2487694,
            w: 212609954,
            W: 3
          }
        },
        Collection: {
          acquireCount: {
            r: 91375,
            w: 212609584,
            R: 37,
            W: 330
          },
          acquireWaitCount: {
            r: 121,
            w: 5,
            W: 100
          },
          timeAcquiringMicros: {
            r: 5230000,
            w: 80130,
            W: 3279021
          }
        },
        Mutex: {
          acquireCount: {
            r: 209191979
          }
        },
        oplog: {
          acquireCount: {
            r: 2396260,
            w: 1
          }
        }
      },
      logicalSessionRecordCache: {
        activeSessionsCount: 123,
        sessionsCollectionJobCount: 7988,
        lastSessionsCollectionJobDurationMillis: 20,
        lastSessionsCollectionJobTimestamp: '2024-02-06T11:07:14.215Z',
        lastSessionsCollectionJobEntriesRefreshed: 74,
        lastSessionsCollectionJobEntriesEnded: 92,
        lastSessionsCollectionJobCursorsClosed: 0,
        transactionReaperJobCount: 7988,
        lastTransactionReaperJobDurationMillis: 2,
        lastTransactionReaperJobTimestamp: '2024-02-06T11:07:14.194Z',
        lastTransactionReaperJobEntriesCleanedUp: 0,
        sessionCatalogSize: 60
      },
      network: {
        bytesIn: 155755555237,
        bytesOut: 197650421211,
        physicalBytesIn: 152068857571,
        physicalBytesOut: 197600833245,
        numSlowDNSOperations: 0,
        numSlowSSLOperations: 0,
        numRequests: 145219012,
        tcpFastOpen: {
          kernelSetting: 1,
          serverSupported: true,
          clientSupported: true,
          accepted: 0
        },
        compression: {
          snappy: {
            compressor: {
              bytesIn: 234265625,
              bytesOut: 180369556
            },
            decompressor: {
              bytesIn: 180365377,
              bytesOut: 234260186
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
            threadsRunning: 525,
            clientsInTotal: 525,
            clientsRunning: 525,
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
          latency: 1569053342507,
          ops: 59574484
        },
        writes: {
          latency: 953996612344,
          ops: 47229881
        },
        commands: {
          latency: 4723565922,
          ops: 38414581
        },
        transactions: {
          latency: 50808,
          ops: 9
        }
      },
      opcounters: {
        insert: 19180449,
        query: 28880940,
        update: 28116719,
        delete: 1287381,
        getmore: 4790113,
        command: 64422577
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
        totalTimeProcessingMicros: 873,
        processingMethod: 'scanning',
        totalTimeTruncatingMicros: 127398315,
        truncateCount: 37037
      },
      readConcernCounters: {
        nonTransactionOps: {
          none: 54784377,
          noneInfo: {
            CWRC: {
              local: 0,
              available: 0,
              majority: 0
            },
            implicitDefault: {
              local: 54784377,
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
      repl: {
        topologyVersion: {
          processId: '659d831c74582a82f94ee143',
          counter: 6
        },
        hosts: ['mongodb:27017'],
        setName: 'indexers',
        setVersion: 1,
        isWritablePrimary: true,
        secondary: false,
        primary: 'mongodb:27017',
        me: 'mongodb:27017',
        electionId: '7fffffff0000000000000002',
        lastWrite: {
          opTime: {
            ts: '7332444583789330443',
            t: 2
          },
          lastWriteDate: '2024-02-06T11:09:52.000Z',
          majorityOpTime: {
            ts: '7332444583789330443',
            t: 2
          },
          majorityWriteDate: '2024-02-06T11:09:52.000Z'
        },
        primaryOnlyServices: {
          TenantMigrationDonorService: {
            state: 'running',
            numInstances: 0
          },
          TenantMigrationRecipientService: {
            state: 'running',
            numInstances: 0
          }
        },
        rbid: 1
      },
      scramCache: {
        'SCRAM-SHA-1': {
          count: 0,
          hits: 0,
          misses: 0
        },
        'SCRAM-SHA-256': {
          count: 1,
          hits: 41,
          misses: 3
        }
      },
      security: {
        authentication: {
          saslSupportedMechsReceived: 738146,
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
                received: 504,
                successful: 494
              },
              clusterAuthenticate: {
                received: 0,
                successful: 0
              },
              authenticate: {
                received: 533,
                successful: 494
              }
            },
            'SCRAM-SHA-256': {
              speculativeAuthenticate: {
                received: 738150,
                successful: 738131
              },
              clusterAuthenticate: {
                received: 44,
                successful: 44
              },
              authenticate: {
                received: 738152,
                successful: 738133
              }
            }
          }
        },
        SSLServerSubjectName: 'CN=mongodb,O=Systran\\, Inc.,ST=IDF,C=FR',
        SSLServerHasCertificateAuthority: true,
        SSLServerCertificateExpirationDate: '2025-05-23T17:32:03.000Z'
      },
      storageEngine: {
        name: 'wiredTiger',
        supportsCommittedReads: true,
        oldestRequiredTimestampForCrashRecovery: '7332444493595017227',
        supportsPendingDrops: true,
        dropPendingIdents: 0,
        supportsSnapshotReadConcern: true,
        readOnly: false,
        persistent: true,
        backupCursorOpen: false,
        supportsResumableIndexBuilds: true
      },
      tcmalloc: {
        generic: {
          current_allocated_bytes: 3494460320,
          heap_size: 5331546112
        },
        tcmalloc: {
          pageheap_free_bytes: 1118613504,
          pageheap_unmapped_bytes: 296976384,
          max_total_thread_cache_bytes: 1048576000,
          current_total_thread_cache_bytes: 263015816,
          total_free_bytes: 421495904,
          central_cache_free_bytes: 158205272,
          transfer_cache_free_bytes: 274816,
          thread_cache_free_bytes: 263015816,
          aggressive_memory_decommit: 0,
          pageheap_committed_bytes: 5034569728,
          pageheap_scavenge_count: 2228736,
          pageheap_commit_count: 11154163,
          pageheap_total_commit_bytes: 592064401408,
          pageheap_decommit_count: 2228736,
          pageheap_total_decommit_bytes: 587029831680,
          pageheap_reserve_count: 4279,
          pageheap_total_reserve_bytes: 5331546112,
          spinlock_total_delay_ns: 600058840787,
          release_rate: 1,
          formattedString:
            '------------------------------------------------\nMALLOC:     3494460896 ( 3332.6 MiB) Bytes in use by application\nMALLOC: +   1118613504 ( 1066.8 MiB) Bytes in page heap freelist\nMALLOC: +    158205272 (  150.9 MiB) Bytes in central cache freelist\nMALLOC: +       274816 (    0.3 MiB) Bytes in transfer cache freelist\nMALLOC: +    263015240 (  250.8 MiB) Bytes in thread cache freelists\nMALLOC: +     24379392 (   23.2 MiB) Bytes in malloc metadata\nMALLOC:   ------------\nMALLOC: =   5058949120 ( 4824.6 MiB) Actual memory used (physical + swap)\nMALLOC: +    296976384 (  283.2 MiB) Bytes released to OS (aka unmapped)\nMALLOC:   ------------\nMALLOC: =   5355925504 ( 5107.8 MiB) Virtual address space used\nMALLOC:\nMALLOC:         157324              Spans in use\nMALLOC:            582              Thread heaps in use\nMALLOC:           4096              Tcmalloc page size\n------------------------------------------------\nCall ReleaseFreeMemory() to release freelist memory to the OS (via madvise()).\nBytes released to the OS take up virtual address space but no physical memory.\n'
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
        transactionsCollectionWriteCount: 26666459,
        currentActive: 0,
        currentInactive: 0,
        currentOpen: 0,
        totalAborted: 0,
        totalCommitted: 9,
        totalStarted: 9,
        totalPrepared: 0,
        totalPreparedThenCommitted: 0,
        totalPreparedThenAborted: 0,
        currentPrepared: 0,
        lastCommittedTransaction: {
          operationCount: 1,
          oplogOperationBytes: 296,
          writeConcern: {
            w: 'majority',
            wtimeout: 0,
            provenance: 'implicitDefault'
          }
        }
      },
      transportSecurity: {
        '1.0': 0,
        1.1: 0,
        1.2: 0,
        1.3: 739016,
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
        'block-manager': {
          'block cache cached blocks updated': 0,
          'block cache cached bytes updated': 0,
          'block cache evicted blocks': 0,
          'block cache file size causing bypass': 0,
          'block cache lookups': 0,
          'block cache number of blocks not evicted due to overhead': 0,
          'block cache number of bypasses because no-write-allocate setting was on': 0,
          'block cache number of bypasses due to overhead on put': 0,
          'block cache number of bypasses on get': 0,
          'block cache number of bypasses on put because file is too small': 0,
          'block cache number of eviction passes': 0,
          'block cache number of hits including existence checks': 0,
          'block cache number of misses including existence checks': 0,
          'block cache number of put bypasses on checkpoint I/O': 0,
          'block cache removed blocks': 0,
          'block cache total blocks': 0,
          'block cache total blocks inserted on read path': 0,
          'block cache total blocks inserted on write path': 0,
          'block cache total bytes': 0,
          'block cache total bytes inserted on read path': 0,
          'block cache total bytes inserted on write path': 0,
          'blocks pre-loaded': 21677,
          'blocks read': 2335890909,
          'blocks written': 2615241122,
          'bytes read': 18045012627456,
          'bytes read via memory map API': 0,
          'bytes read via system call API': 0,
          'bytes written': 20375392206848,
          'bytes written for checkpoint': 2493902880768,
          'bytes written via memory map API': 0,
          'bytes written via system call API': 0,
          'mapped blocks read': 0,
          'mapped bytes read': 0,
          'number of times the file was remapped because it changed size via fallocate or truncate': 0,
          'number of times the region was remapped via write': 0
        },
        cache: {
          'application threads page read from disk to cache count': 761561041,
          'application threads page read from disk to cache time (usecs)': 19079658671,
          'application threads page write from cache to disk count': 325335561,
          'application threads page write from cache to disk time (usecs)': 3403418370,
          'bytes allocated for updates': 82770067,
          'bytes belonging to page images in the cache': 3057804495,
          'bytes belonging to the history store table in the cache': 341855239,
          'bytes currently in the cache': 3246093531,
          'bytes dirty in the cache cumulative': 101594548479017,
          'bytes not belonging to page images in the cache': 188289036,
          'bytes read into cache': 80915593323046,
          'bytes written from cache': 90966876646487,
          'cache overflow score': 0,
          'checkpoint blocked page eviction': 17240406,
          'checkpoint of history store file blocked non-history store page eviction': 122,
          'eviction calls to get a page': 2734383744,
          'eviction calls to get a page found queue empty': 8347039,
          'eviction calls to get a page found queue empty after locking': 137777606,
          'eviction currently operating in aggressive mode': 0,
          'eviction empty score': 0,
          'eviction gave up due to detecting an out of order on disk value behind the last update on the chain': 0,
          'eviction gave up due to detecting an out of order tombstone ahead of the selected on disk update': 32238,
          'eviction gave up due to detecting an out of order tombstone ahead of the selected on disk update after validating the update chain': 0,
          'eviction gave up due to detecting out of order timestamps on the update chain after the selected on disk update': 0,
          'eviction gave up due to needing to remove a record from the history store but checkpoint is running': 0,
          'eviction passes of a file': 1703047157,
          'eviction server candidate queue empty when topping up': 6497616,
          'eviction server candidate queue not empty when topping up': 181675404,
          'eviction server evicting pages': 0,
          'eviction server slept, because we did not make progress with eviction': 127905426,
          'eviction server unable to reach eviction goal': 0,
          'eviction server waiting for a leaf page': 21311920,
          'eviction state': 64,
          'eviction walk most recent sleeps for checkpoint handle gathering': 49096,
          'eviction walk target pages histogram - 0-9': 1376895009,
          'eviction walk target pages histogram - 10-31': 109059427,
          'eviction walk target pages histogram - 128 and higher': 0,
          'eviction walk target pages histogram - 32-63': 68888212,
          'eviction walk target pages histogram - 64-128': 148204509,
          'eviction walk target pages reduced due to history store cache pressure': 14705,
          'eviction walk target strategy both clean and dirty pages': 95721923,
          'eviction walk target strategy only clean pages': 2706663,
          'eviction walk target strategy only dirty pages': 1604618571,
          'eviction walks abandoned': 4218027,
          'eviction walks gave up because they restarted their walk twice': 1360372748,
          'eviction walks gave up because they saw too many pages and found no candidates': 3891252,
          'eviction walks gave up because they saw too many pages and found too few candidates': 1826305,
          'eviction walks reached end of tree': 2771176243,
          'eviction walks restarted': 0,
          'eviction walks started from root of tree': 1372586026,
          'eviction walks started from saved location in tree': 330461131,
          'eviction worker thread active': 4,
          'eviction worker thread created': 0,
          'eviction worker thread evicting pages': 2587742385,
          'eviction worker thread removed': 0,
          'eviction worker thread stable number': 0,
          'files with active eviction walks': 0,
          'files with new eviction walks started': 1410803495,
          'force re-tuning of eviction workers once in a while': 0,
          'forced eviction - history store pages failed to evict while session has history store cursor open': 1,
          'forced eviction - history store pages selected while session has history store cursor open': 1918,
          'forced eviction - history store pages successfully evicted while session has history store cursor open': 1902,
          'forced eviction - pages evicted that were clean count': 443516,
          'forced eviction - pages evicted that were clean time (usecs)': 1112518,
          'forced eviction - pages evicted that were dirty count': 18,
          'forced eviction - pages evicted that were dirty time (usecs)': 360587,
          'forced eviction - pages selected because of a large number of updates to a single item': 11,
          'forced eviction - pages selected because of too many deleted items count': 1318,
          'forced eviction - pages selected count': 1461806,
          'forced eviction - pages selected unable to be evicted count': 567674,
          'forced eviction - pages selected unable to be evicted time': 1078192,
          'hazard pointer blocked page eviction': 2069580,
          'hazard pointer check calls': 2589701461,
          'hazard pointer check entries walked': 26172697079,
          'hazard pointer maximum array length': 2,
          'history store score': 99,
          'history store table insert calls': 11882437765,
          'history store table insert calls that returned restart': 0,
          'history store table max on-disk size': 0,
          'history store table on-disk size': 532848640,
          'history store table out-of-order resolved updates that lose their durable timestamp': 0,
          'history store table out-of-order updates that were fixed up by reinserting with the fixed timestamp': 0,
          'history store table reads': 10,
          'history store table reads missed': 389934224,
          'history store table reads requiring squashed modifies': 0,
          'history store table truncation by rollback to stable to remove an unstable update': 0,
          'history store table truncation by rollback to stable to remove an update': 0,
          'history store table truncation to remove an update': 0,
          'history store table truncation to remove range of updates due to key being removed from the data page during reconciliation': 4422560,
          'history store table truncation to remove range of updates due to out-of-order timestamp update on data page': 0,
          'history store table writes requiring squashed modifies': 394,
          'in-memory page passed criteria to be split': 1539586,
          'in-memory page splits': 451142,
          'internal pages evicted': 2199888,
          'internal pages queued for eviction': 1894312,
          'internal pages seen by eviction walk': 947503865,
          'internal pages seen by eviction walk that are already queued': 40092698,
          'internal pages split during eviction': 5675,
          'leaf pages split during eviction': 1237338,
          'maximum bytes configured': 4294967296,
          'maximum page size at eviction': 8466867,
          'modified pages evicted': 2439354032,
          'modified pages evicted by application threads': 95147,
          'operations timed out waiting for space in cache': 0,
          'overflow pages read into cache': 0,
          'page split during eviction deepened the tree': 2,
          'page written requiring history store records': 227682109,
          'pages currently held in the cache': 57734,
          'pages evicted by application threads': 380923,
          'pages evicted in parallel with checkpoint': 1107674636,
          'pages queued for eviction': 18392188426,
          'pages queued for eviction post lru sorting': 18449635322,
          'pages queued for urgent eviction': 17791813,
          'pages queued for urgent eviction during walk': 948164,
          'pages queued for urgent eviction from history store due to high dirty content': 10009729,
          'pages read into cache': 2335124154,
          'pages read into cache after truncate': 592293,
          'pages read into cache after truncate in prepare state': 0,
          'pages requested from the cache': 168535148508,
          'pages seen by eviction walk': 56018334102,
          'pages seen by eviction walk that are already queued': 6380243441,
          'pages selected for eviction unable to be evicted': 20574215,
          'pages selected for eviction unable to be evicted because of active children on an internal page': 1094264,
          'pages selected for eviction unable to be evicted because of failure in reconciliation': 32431,
          'pages selected for eviction unable to be evicted because of race between checkpoint and out of order timestamps handling': 0,
          'pages walked for eviction': 259355715075,
          'pages written from cache': 2613206337,
          'pages written requiring in-memory restoration': 177052742,
          'percentage overhead': 8,
          'the number of times full update inserted to history store': 2947259571,
          'the number of times reverse modify inserted to history store': 8935178955,
          'tracked bytes belonging to internal pages in the cache': 14474932,
          'tracked bytes belonging to leaf pages in the cache': 3231618599,
          'tracked dirty bytes in the cache': 223265920,
          'tracked dirty pages in the cache': 4812,
          'unmodified pages evicted': 129322165
        },
        capacity: {
          'background fsync file handles considered': 0,
          'background fsync file handles synced': 0,
          'background fsync time (msecs)': 0,
          'bytes read': 18035839131648,
          'bytes written for checkpoint': 1690273631735,
          'bytes written for eviction': 12002493057395,
          'bytes written for log': 3093622012672,
          'bytes written total': 16786371591855,
          'threshold to call fsync': 0,
          'time waiting due to total capacity (usecs)': 0,
          'time waiting during checkpoint (usecs)': 0,
          'time waiting during eviction (usecs)': 0,
          'time waiting during logging (usecs)': 0,
          'time waiting during read (usecs)': 0
        },
        'checkpoint-cleanup': {
          'pages added for eviction': 397675,
          'pages removed': 1052333,
          'pages skipped during tree walk': 1261037401,
          'pages visited': 3433026298
        },
        connection: {
          'auto adjusting condition resets': 12815322,
          'auto adjusting condition wait calls': 28344048,
          'auto adjusting condition wait raced to update timeout and skipped updating': 6,
          'detected system time went backwards': 0,
          'files currently open': 150,
          'hash bucket array size for data handles': 512,
          'hash bucket array size general': 512,
          'memory allocations': 164852316016,
          'memory frees': 164868531415,
          'memory re-allocations': 1352197880,
          'pthread mutex condition wait calls': 204210940,
          'pthread mutex shared lock read-lock calls': 86335975963,
          'pthread mutex shared lock write-lock calls': 1041521613,
          'total fsync I/Os': 28725781,
          'total read I/Os': 2335962621,
          'total write I/Os': 2667725538
        },
        cursor: {
          'Total number of entries skipped by cursor next calls': 14787069286583,
          'Total number of entries skipped by cursor prev calls': 6943949,
          'Total number of entries skipped to position the history store cursor': 0,
          'Total number of times a search near has exited due to prefix config': 26786,
          'cached cursor count': 1720,
          'cursor bulk loaded cursor insert calls': 210,
          'cursor close calls that result in cache': 1602589546,
          'cursor create calls': 8003518,
          'cursor insert calls': 12021329805,
          'cursor insert key and value bytes': 2999391254639,
          'cursor modify calls': 20815976972,
          'cursor modify key and value bytes affected': 18974573095923,
          'cursor modify value bytes modified': 127634518077,
          'cursor next calls': 144898686464,
          'cursor next calls that skip due to a globally visible history store tombstone': 0,
          'cursor next calls that skip greater than or equal to 100 entries': 21087710356,
          'cursor next calls that skip less than 100 entries': 123811080400,
          'cursor operation restarted': 623617,
          'cursor prev calls': 103443228,
          'cursor prev calls that skip due to a globally visible history store tombstone': 0,
          'cursor prev calls that skip greater than or equal to 100 entries': 259,
          'cursor prev calls that skip less than 100 entries': 103442928,
          'cursor remove calls': 97224409,
          'cursor remove key bytes removed': 1688142359,
          'cursor reserve calls': 0,
          'cursor reset calls': 96101786798,
          'cursor search calls': 57663755832,
          'cursor search history store calls': 389932233,
          'cursor search near calls': 24456051472,
          'cursor sweep buckets': 77849404,
          'cursor sweep cursors closed': 3382,
          'cursor sweep cursors examined': 8190062,
          'cursor sweeps': 12974337,
          'cursor truncate calls': 37037,
          'cursor update calls': 0,
          'cursor update key and value bytes': 0,
          'cursor update value size change': 7213009,
          'cursors reused from cache': 1602588480,
          'open cursor count': 29
        },
        'data-handle': {
          'connection data handle size': 440,
          'connection data handles currently active': 257,
          'connection sweep candidate became referenced': 0,
          'connection sweep dhandles closed': 1753,
          'connection sweep dhandles removed from hash list': 1242174,
          'connection sweep time-of-death sets': 10206412,
          'connection sweeps': 239886,
          'connection sweeps skipped due to checkpoint gathering handles': 11,
          'session dhandles swept': 692798,
          'session sweep attempts': 198696
        },
        lock: {
          'checkpoint lock acquisitions': 38374,
          'checkpoint lock application thread wait time (usecs)': 1001,
          'checkpoint lock internal thread wait time (usecs)': 0,
          'dhandle lock application thread time waiting (usecs)': 101405,
          'dhandle lock internal thread time waiting (usecs)': 4503,
          'dhandle read lock acquisitions': 2323511883,
          'dhandle write lock acquisitions': 2484945,
          'durable timestamp queue lock application thread time waiting (usecs)': 0,
          'durable timestamp queue lock internal thread time waiting (usecs)': 0,
          'durable timestamp queue read lock acquisitions': 0,
          'durable timestamp queue write lock acquisitions': 0,
          'metadata lock acquisitions': 38373,
          'metadata lock application thread wait time (usecs)': 864,
          'metadata lock internal thread wait time (usecs)': 0,
          'read timestamp queue lock application thread time waiting (usecs)': 0,
          'read timestamp queue lock internal thread time waiting (usecs)': 0,
          'read timestamp queue read lock acquisitions': 0,
          'read timestamp queue write lock acquisitions': 0,
          'schema lock acquisitions': 65027,
          'schema lock application thread wait time (usecs)': 25581465,
          'schema lock internal thread wait time (usecs)': 0,
          'table lock application thread time waiting for the table lock (usecs)': 1054881,
          'table lock internal thread time waiting for the table lock (usecs)': 229020,
          'table read lock acquisitions': 0,
          'table write lock acquisitions': 4853063,
          'txn global lock application thread time waiting (usecs)': 148431471,
          'txn global lock internal thread time waiting (usecs)': 137941434,
          'txn global read lock acquisitions': 1908206663,
          'txn global write lock acquisitions': 1028394290
        },
        log: {
          'busy returns attempting to switch slots': 8713244,
          'force archive time sleeping (usecs)': 0,
          'log bytes of payload data': 3051316351958,
          'log bytes written': 3092360286720,
          'log files manually zero-filled': 0,
          'log flush operations': 43056228,
          'log force write operations': 59172294,
          'log force write operations skipped': 19814955,
          'log records compressed': 11851336728,
          'log records not compressed': 42362217,
          'log records too small to compress': 27302335,
          'log release advances write LSN': 39419,
          'log scan operations': 6,
          'log scan records requiring two reads': 0,
          'log server thread advances write LSN': 52347352,
          'log server thread write LSN walk skipped': 550374403,
          'log sync operations': 27261619,
          'log sync time duration (usecs)': 47365602588,
          'log sync_dir operations': 29550,
          'log sync_dir time duration (usecs)': 26273231,
          'log write operations': 11921001246,
          'logging bytes consolidated': 3092352915584,
          'maximum log file size': 104857600,
          'number of pre-allocated log files to create': 2,
          'pre-allocated log files not ready and missed': 1,
          'pre-allocated log files prepared': 29551,
          'pre-allocated log files used': 29549,
          'records processed by log scan': 15,
          'slot close lost race': 0,
          'slot close unbuffered waits': 0,
          'slot closures': 52386796,
          'slot join atomic update races': 78450,
          'slot join calls atomic updates raced': 78434,
          'slot join calls did not yield': 11920752443,
          'slot join calls found active slot closed': 170595,
          'slot join calls slept': 817,
          'slot join calls yielded': 248896,
          'slot join found active slot closed': 3146929,
          'slot joins yield time (usecs)': 22047380,
          'slot transitions unable to find free slot': 0,
          'slot unbuffered writes': 247,
          'total in-memory size of compressed records': 3251347594250,
          'total log buffer size': 33554432,
          'total size of compressed records': 3037099610133,
          'written slots coalesced': 25,
          'yields waiting for previous log file close': 0
        },
        perf: {
          'file system read latency histogram (bucket 1) - 10-49ms': 812,
          'file system read latency histogram (bucket 2) - 50-99ms': 2,
          'file system read latency histogram (bucket 3) - 100-249ms': 0,
          'file system read latency histogram (bucket 4) - 250-499ms': 0,
          'file system read latency histogram (bucket 5) - 500-999ms': 0,
          'file system read latency histogram (bucket 6) - 1000ms+': 0,
          'file system write latency histogram (bucket 1) - 10-49ms': 13979,
          'file system write latency histogram (bucket 2) - 50-99ms': 135,
          'file system write latency histogram (bucket 3) - 100-249ms': 6,
          'file system write latency histogram (bucket 4) - 250-499ms': 1,
          'file system write latency histogram (bucket 5) - 500-999ms': 0,
          'file system write latency histogram (bucket 6) - 1000ms+': 0,
          'operation read latency histogram (bucket 1) - 100-249us': 9491016,
          'operation read latency histogram (bucket 2) - 250-499us': 4380636,
          'operation read latency histogram (bucket 3) - 500-999us': 1746623,
          'operation read latency histogram (bucket 4) - 1000-9999us': 912011,
          'operation read latency histogram (bucket 5) - 10000us+': 21361,
          'operation write latency histogram (bucket 1) - 100-249us': 2130754,
          'operation write latency histogram (bucket 2) - 250-499us': 1147555,
          'operation write latency histogram (bucket 3) - 500-999us': 384932,
          'operation write latency histogram (bucket 4) - 1000-9999us': 186292,
          'operation write latency histogram (bucket 5) - 10000us+': 9926
        },
        reconciliation: {
          'approximate byte size of timestamps in pages written': 685006194872,
          'approximate byte size of transaction IDs in pages written': 342518225224,
          'fast-path pages deleted': 56793667,
          'leaf-page overflow keys': 0,
          'maximum seconds spent in a reconciliation call': 1,
          'page reconciliation calls': 2552708008,
          'page reconciliation calls for eviction': 2233173861,
          'page reconciliation calls that resulted in values with prepared transaction metadata': 0,
          'page reconciliation calls that resulted in values with timestamps': 230648777,
          'page reconciliation calls that resulted in values with transaction ids': 230914177,
          'pages deleted': 2099355,
          'pages written including an aggregated newest start durable timestamp ': 8466934,
          'pages written including an aggregated newest stop durable timestamp ': 4608054,
          'pages written including an aggregated newest stop timestamp ': 4587715,
          'pages written including an aggregated newest stop transaction ID': 4587715,
          'pages written including an aggregated newest transaction ID ': 8467920,
          'pages written including an aggregated oldest start timestamp ': 4104849,
          'pages written including an aggregated prepare': 0,
          'pages written including at least one prepare state': 0,
          'pages written including at least one start durable timestamp': 2601802322,
          'pages written including at least one start timestamp': 2601799121,
          'pages written including at least one start transaction ID': 2602343793,
          'pages written including at least one stop durable timestamp': 2316559265,
          'pages written including at least one stop timestamp': 2316560546,
          'pages written including at least one stop transaction ID': 2316560542,
          'records written including a prepare state': 0,
          'records written including a start durable timestamp': 27529168510,
          'records written including a start timestamp': 27529118727,
          'records written including a start transaction ID': 27530714448,
          'records written including a stop durable timestamp': 15283498805,
          'records written including a stop timestamp': 15284109753,
          'records written including a stop transaction ID': 15284109689,
          'split bytes currently awaiting free': 0,
          'split objects currently awaiting free': 1
        },
        session: {
          'attempts to remove a local object and the object is in use': 0,
          'flush_tier operation calls': 0,
          'local objects removed': 0,
          'open session count': 36,
          'session query timestamp calls': 0,
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
          'table create successful calls': 743,
          'table drop failed calls': 0,
          'table drop successful calls': 303,
          'table rename failed calls': 0,
          'table rename successful calls': 0,
          'table salvage failed calls': 0,
          'table salvage successful calls': 0,
          'table truncate failed calls': 0,
          'table truncate successful calls': 37037,
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
          'application thread time evicting (usecs)': 16156053,
          'application thread time waiting for cache (usecs)': 40514606,
          'connection close blocked waiting for transaction state stabilization': 0,
          'connection close yielded for lsm manager shutdown': 0,
          'data handle lock yielded': 1271192,
          'get reference for page index and slot time sleeping (usecs)': 2000,
          'page access yielded due to prepare state change': 0,
          'page acquire busy blocked': 295827,
          'page acquire eviction blocked': 598465,
          'page acquire locked blocked': 4952889,
          'page acquire read blocked': 408198,
          'page acquire time sleeping (usecs)': 1391607600,
          'page delete rollback time sleeping for state change (usecs)': 0,
          'page reconciliation yielded due to child modification': 169696
        },
        transaction: {
          'Number of prepared updates': 0,
          'Number of prepared updates committed': 0,
          'Number of prepared updates repeated on the same key': 0,
          'Number of prepared updates rolled back': 0,
          'prepared transactions': 0,
          'prepared transactions committed': 0,
          'prepared transactions currently active': 0,
          'prepared transactions rolled back': 0,
          'query timestamp calls': 11592969597,
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
          'sessions scanned in each walk of concurrent sessions': 1782516138146,
          'set timestamp calls': 63492931,
          'set timestamp durable calls': 0,
          'set timestamp durable updates': 0,
          'set timestamp oldest calls': 26988071,
          'set timestamp oldest updates': 26988071,
          'set timestamp stable calls': 36504860,
          'set timestamp stable updates': 27005999,
          'transaction begins': 34182918521,
          'transaction checkpoint currently running': 0,
          'transaction checkpoint currently running for history store file': 0,
          'transaction checkpoint generation': 38374,
          'transaction checkpoint history store file duration (usecs)': 337683,
          'transaction checkpoint max time (msecs)': 4827,
          'transaction checkpoint min time (msecs)': 6,
          'transaction checkpoint most recent duration for gathering all handles (usecs)': 967,
          'transaction checkpoint most recent duration for gathering applied handles (usecs)': 354,
          'transaction checkpoint most recent duration for gathering skipped handles (usecs)': 277,
          'transaction checkpoint most recent handles applied': 35,
          'transaction checkpoint most recent handles skipped': 111,
          'transaction checkpoint most recent handles walked': 291,
          'transaction checkpoint most recent time (msecs)': 2570,
          'transaction checkpoint prepare currently running': 0,
          'transaction checkpoint prepare max time (msecs)': 78,
          'transaction checkpoint prepare min time (msecs)': 0,
          'transaction checkpoint prepare most recent time (msecs)': 0,
          'transaction checkpoint prepare total time (msecs)': 83612,
          'transaction checkpoint scrub dirty target': 0,
          'transaction checkpoint scrub time (msecs)': 100,
          'transaction checkpoint stop timing stress active': 0,
          'transaction checkpoint total time (msecs)': 93154786,
          'transaction checkpoints': 38373,
          'transaction checkpoints due to obsolete pages': 188,
          'transaction checkpoints skipped because database was clean': 0,
          'transaction failures due to history store': 0,
          'transaction fsync calls for checkpoint after allocating the transaction ID': 38373,
          'transaction fsync duration for checkpoint after allocating the transaction ID (usecs)': 213286,
          'transaction range of IDs currently pinned': 18,
          'transaction range of IDs currently pinned by a checkpoint': 0,
          'transaction range of timestamps currently pinned': 1288490188800,
          'transaction range of timestamps pinned by a checkpoint':
            '7332444583789330443',
          'transaction range of timestamps pinned by the oldest active read timestamp': 0,
          'transaction range of timestamps pinned by the oldest timestamp': 1288490188800,
          'transaction read timestamp of the oldest active reader': 0,
          'transaction rollback to stable currently running': 0,
          'transaction walk of concurrent sessions': 48760738118,
          'transactions committed': 11920803628,
          'transactions rolled back': 22262143451,
          'update conflicts': 1391
        },
        concurrentTransactions: {
          write: {
            out: 0,
            available: 128,
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
          'latest majority snapshot timestamp available': 'Feb  6 11:09:52:11',
          'oldest majority snapshot timestamp available': 'Feb  6 11:04:52:11',
          'pinned timestamp requests': 0,
          'min pinned timestamp': '-1'
        },
        oplog: {
          'visibility timestamp': '7332444583789330443'
        }
      },
      mem: {
        bits: 64,
        resident: 4677,
        virtual: 7291,
        supported: true
      },
      metrics: {
        apiVersions: {
          'SYSTRAN / SES-Console / Resources': ['default'],
          'SYSTRAN / SES-Console / notifications': ['default'],
          'SYSTRAN / TRS-Console / TRSL': ['default'],
          'MongoDB Shell': ['default'],
          'SYSTRAN / SES-Console / feedbacks': ['default'],
          'SYSTRAN / SES-Console / Profiles': ['default'],
          'SYSTRAN / SES-Console / production': ['default'],
          'SYSTRAN / SES-Console / stats': ['default'],
          'SYSTRAN / SES-Console / user': ['default'],
          'SYSTRAN / SES-Console / settings': ['default'],
          'SYSTRAN / SES-Console / information': ['default'],
          'SYSTRAN / TRS-Console / user': ['default'],
          '': ['default'],
          'SYSTRAN / SES-Console / translationResource': ['default']
        },
        aggStageCounters: {
          $_internalApplyOplogUpdate: 0,
          $_internalConvertBucketIndexStats: 0,
          $_internalFindAndModifyImageLookup: 0,
          $_internalInhibitOptimization: 0,
          $_internalReshardingIterateTransaction: 0,
          $_internalReshardingOwnershipMatch: 0,
          $_internalSetWindowFields: 0,
          $_internalSplitPipeline: 0,
          $_internalUnpackBucket: 0,
          $_unpackBucket: 0,
          $addFields: 0,
          $bucket: 0,
          $bucketAuto: 0,
          $changeStream: 2,
          $collStats: 0,
          $count: 35,
          $currentOp: 0,
          $documents: 0,
          $facet: 35,
          $geoNear: 0,
          $graphLookup: 0,
          $group: 682340,
          $indexStats: 0,
          $limit: 461307,
          $listLocalSessions: 0,
          $listSessions: 0,
          $lookup: 0,
          $match: 682310,
          $merge: 0,
          $mergeCursors: 0,
          $operationMetrics: 0,
          $out: 0,
          $planCacheStats: 0,
          $project: 220768,
          $queue: 0,
          $redact: 0,
          $replaceRoot: 0,
          $replaceWith: 0,
          $sample: 0,
          $set: 1070354,
          $setWindowFields: 0,
          $skip: 34,
          $sort: 156,
          $sortByCount: 0,
          $unionWith: 0,
          $unset: 0,
          $unwind: 80
        },
        commands: {
          '<UNKNOWN>': 1,
          _addShard: {
            failed: 0,
            total: 0
          },
          _cloneCollectionOptionsFromPrimaryShard: {
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
          _configsvrCommitChunkMerge: {
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
          _configsvrCreateDatabase: {
            failed: 0,
            total: 0
          },
          _configsvrDropCollection: {
            failed: 0,
            total: 0
          },
          _configsvrDropDatabase: {
            failed: 0,
            total: 0
          },
          _configsvrEnableSharding: {
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
          _configsvrMovePrimary: {
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
          _configsvrSetAllowMigrations: {
            failed: 0,
            total: 0
          },
          _configsvrShardCollection: {
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
          _shardsvrCommitReshardCollection: {
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
          _shardsvrMovePrimary: {
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
          _shardsvrShardCollection: {
            failed: 0,
            total: 0
          },
          _transferMods: {
            failed: 0,
            total: 0
          },
          abortTransaction: {
            failed: 0,
            total: 0
          },
          aggregate: {
            allowDiskUseTrue: 135,
            failed: 0,
            total: 682300
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
            total: 1474581
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
          collMod: {
            failed: 0,
            total: 0
          },
          collStats: {
            failed: 0,
            total: 0
          },
          commitTransaction: {
            failed: 0,
            total: 9
          },
          compact: {
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
            total: 4
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
            total: 22001731
          },
          create: {
            failed: 0,
            total: 0
          },
          createIndexes: {
            failed: 0,
            total: 2333
          },
          createRole: {
            failed: 0,
            total: 0
          },
          createUser: {
            failed: 0,
            total: 19
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
            total: 478751
          },
          distinct: {
            failed: 0,
            total: 3292492
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
            failed: 0,
            total: 5
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
            total: 0
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
            total: 0
          },
          endSessions: {
            failed: 0,
            total: 737311
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
            total: 6
          },
          find: {
            failed: 0,
            total: 28880940
          },
          findAndModify: {
            arrayFilters: 0,
            failed: 7,
            pipeline: 0,
            total: 15431
          },
          flushRouterConfig: {
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
          getFreeMonitoringStatus: {
            failed: 0,
            total: 0
          },
          getLastError: {
            failed: 0,
            total: 0
          },
          getLog: {
            failed: 0,
            total: 0
          },
          getMore: {
            failed: 0,
            total: 4790113
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
            failed: 97,
            total: 16506531
          },
          hostInfo: {
            failed: 0,
            total: 1
          },
          insert: {
            failed: 0,
            total: 19174492
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
            total: 15027543
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
            total: 0
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
            total: 1
          },
          listCommands: {
            failed: 0,
            total: 0
          },
          listDatabases: {
            failed: 0,
            total: 2
          },
          listIndexes: {
            failed: 3,
            total: 16046
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
          moveChunk: {
            failed: 0,
            total: 0
          },
          ping: {
            failed: 0,
            total: 239781
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
            total: 1474580
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
            total: 1475959
          },
          saslStart: {
            failed: 29,
            total: 31
          },
          serverStatus: {
            failed: 0,
            total: 738552
          },
          setDefaultRWConcern: {
            failed: 0,
            total: 0
          },
          setFeatureCompatibilityVersion: {
            failed: 0,
            total: 0
          },
          setFreeMonitoring: {
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
          setShardVersion: {
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
            arrayFilters: 43,
            failed: 0,
            pipeline: 545083,
            total: 27579659
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
            total: 37
          },
          waitForFailPoint: {
            failed: 0,
            total: 0
          },
          whatsmyuri: {
            failed: 0,
            total: 737290
          }
        },
        cursor: {
          moreThanOneBatch: 78,
          timedOut: 0,
          totalOpened: 682357,
          lifespan: {
            greaterThanOrEqual10Minutes: 0,
            lessThan10Minutes: 0,
            lessThan15Seconds: 0,
            lessThan1Minute: 0,
            lessThan1Second: 682324,
            lessThan30Seconds: 0,
            lessThan5Seconds: 31
          },
          open: {
            noTimeout: 0,
            pinned: 2,
            total: 2
          }
        },
        document: {
          deleted: 19214347,
          inserted: 19180428,
          returned: 27946197,
          updated: 11855113691
        },
        dotsAndDollarsFields: {
          inserts: 0,
          updates: 0
        },
        getLastError: {
          wtime: {
            num: 47202560,
            totalMillis: 1125782
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
          scanAndOrder: 20631829,
          writeConflicts: 1463
        },
        operatorCounters: {
          expressions: {
            $_internalJsEmit: 0,
            $abs: 0,
            $acos: 0,
            $acosh: 0,
            $add: 0,
            $allElementsTrue: 0,
            $and: 0,
            $anyElementTrue: 0,
            $arrayElemAt: 39,
            $arrayToObject: 39,
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
            $concat: 0,
            $concatArrays: 195,
            $cond: 221025,
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
            $dayOfMonth: 21,
            $dayOfWeek: 0,
            $dayOfYear: 0,
            $degreesToRadians: 0,
            $divide: 0,
            $eq: 457108,
            $exp: 0,
            $filter: 39,
            $first: 0,
            $floor: 0,
            $function: 0,
            $getField: 0,
            $gt: 0,
            $gte: 220515,
            $hour: 21,
            $ifNull: 66,
            $in: 78,
            $indexOfArray: 0,
            $indexOfBytes: 0,
            $indexOfCP: 0,
            $isArray: 0,
            $isNumber: 0,
            $isoDayOfWeek: 0,
            $isoWeek: 0,
            $isoWeekYear: 0,
            $last: 0,
            $let: 0,
            $literal: 0,
            $ln: 0,
            $log: 0,
            $log10: 0,
            $lt: 0,
            $lte: 0,
            $ltrim: 0,
            $map: 39,
            $max: 0,
            $mergeObjects: 0,
            $meta: 0,
            $millisecond: 0,
            $min: 0,
            $minute: 21,
            $mod: 0,
            $month: 21,
            $multiply: 0,
            $ne: 456754,
            $not: 39,
            $objectToArray: 78,
            $or: 0,
            $pow: 0,
            $radiansToDegrees: 0,
            $rand: 0,
            $range: 0,
            $reduce: 234,
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
            $type: 0,
            $unsetField: 0,
            $week: 0,
            $year: 21,
            $zip: 0
          },
          match: {
            $all: 0,
            $alwaysFalse: 0,
            $alwaysTrue: 0,
            $and: 480389,
            $bitsAllClear: 0,
            $bitsAllSet: 0,
            $bitsAnyClear: 0,
            $bitsAnySet: 0,
            $comment: 0,
            $elemMatch: 30,
            $eq: 65387924,
            $exists: 957870,
            $expr: 913508,
            $geoIntersects: 0,
            $geoWithin: 0,
            $gt: 1374778,
            $gte: 3,
            $in: 1690261,
            $jsonSchema: 0,
            $lt: 8774,
            $lte: 1,
            $mod: 0,
            $ne: 928208,
            $near: 0,
            $nearSphere: 0,
            $nin: 456742,
            $nor: 0,
            $not: 12,
            $or: 952233,
            $regex: 657,
            $sampleRate: 0,
            $size: 14,
            $text: 0,
            $type: 2,
            $where: 0
          }
        },
        query: {
          deleteManyCount: 1205400,
          planCacheTotalSizeEstimateBytes: 826520,
          updateDeleteManyDocumentsMaxCount: 26139,
          updateDeleteManyDocumentsTotalCount: 11866316320,
          updateDeleteManyDurationMaxMs: 3660,
          updateDeleteManyDurationTotalMs: 743199760,
          updateManyCount: 20055587,
          updateOneOpStyleBroadcastWithExactIDCount: 0,
          multiPlanner: {
            classicCount: 334,
            classicMicros: 1141469,
            classicWorks: 130986,
            sbeCount: 0,
            sbeMicros: 0,
            sbeNumReads: 0,
            histograms: {
              classicMicros: [
                {
                  lowerBound: 0,
                  count: 199
                },
                {
                  lowerBound: 1024,
                  count: 71
                },
                {
                  lowerBound: 4096,
                  count: 53
                },
                {
                  lowerBound: 16384,
                  count: 8
                },
                {
                  lowerBound: 65536,
                  count: 3
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
                  count: 167
                },
                {
                  lowerBound: 4,
                  count: 126
                },
                {
                  lowerBound: 8,
                  count: 41
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
                  count: 266
                },
                {
                  lowerBound: 128,
                  count: 22
                },
                {
                  lowerBound: 256,
                  count: 11
                },
                {
                  lowerBound: 512,
                  count: 22
                },
                {
                  lowerBound: 1024,
                  count: 9
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
                  count: 2
                },
                {
                  lowerBound: 16384,
                  count: 1
                },
                {
                  lowerBound: 32768,
                  count: 1
                }
              ],
              sbeMicros: [
                {
                  lowerBound: 0,
                  count: 0
                },
                {
                  lowerBound: 1024,
                  count: 0
                },
                {
                  lowerBound: 4096,
                  count: 0
                },
                {
                  lowerBound: 16384,
                  count: 0
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
                  count: 0
                },
                {
                  lowerBound: 4,
                  count: 0
                },
                {
                  lowerBound: 8,
                  count: 0
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
                  count: 0
                },
                {
                  lowerBound: 128,
                  count: 0
                },
                {
                  lowerBound: 256,
                  count: 0
                },
                {
                  lowerBound: 512,
                  count: 0
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
          }
        },
        queryExecutor: {
          scanned: 23795603723,
          scannedObjects: 110605681631,
          collectionScans: {
            nonTailable: 8287291,
            total: 8287293
          }
        },
        record: {
          moves: 0
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
            userOperationsRunning: 0
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
          deletedDocuments: 49243,
          passes: 39936
        }
      },
      ok: 1,
      $clusterTime: {
        clusterTime: '7332444583789330443',
        signature: {
          hash: 'kn098xYjQ0FncY+Ahhxr4w4FBkY=',
          keyId: '7322152708276748293'
        }
      },
      operationTime: '7332444583789330443',
      app: {
        version: '5.0.15'
      },
      name: 'MongoDB',
      status: 'running',
      hostname: 'mongodb'
    },
    {
      _id: '659d832c74582a82f94ee547',
      type: 'Redis',
      hostname: 'redis:6379',
      insertedAt: '2024-01-17T17:25:12.655Z',
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
          os: 'Linux 5.4.0-169-generic x86_64',
          arch_bits: '64',
          monotonic_clock: 'POSIX clock_gettime',
          multiplexing_api: 'epoll',
          atomicvar_api: 'c11-builtin',
          gcc_version: '8.5.0',
          process_id: '9',
          process_supervised: 'no',
          run_id: '3fc73516b85c65dfd297abceb68f50852d63ba38',
          tcp_port: '6379',
          server_time_usec: '1707217791998221',
          uptime_in_seconds: '2396258',
          uptime_in_days: '27',
          hz: '10',
          configured_hz: '10',
          lru_clock: '12718975',
          executable: '/opt/systran/redis/bin/redis-server',
          config_file: '',
          io_threads_active: '0'
        },
        Clients: {
          connected_clients: '40',
          cluster_connections: '0',
          maxclients: '10000',
          client_recent_max_input_buffer: '20480',
          client_recent_max_output_buffer: '0',
          blocked_clients: '0',
          tracking_clients: '0',
          clients_in_timeout_table: '0'
        },
        Memory: {
          used_memory: '1680968',
          used_memory_human: '1.60M',
          used_memory_rss: '5038080',
          used_memory_rss_human: '4.80M',
          used_memory_peak: '2431656',
          used_memory_peak_human: '2.32M',
          used_memory_peak_perc: '69.13%',
          used_memory_overhead: '972808',
          used_memory_startup: '858664',
          used_memory_dataset: '708160',
          used_memory_dataset_perc: '86.12%',
          allocator_allocated: '1765904',
          allocator_active: '2256896',
          allocator_resident: '5685248',
          total_system_memory: '30801248256',
          total_system_memory_human: '28.69G',
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
          maxmemory: '0',
          maxmemory_human: '0B',
          maxmemory_policy: 'noeviction',
          allocator_frag_ratio: '1.28',
          allocator_frag_bytes: '490992',
          allocator_rss_ratio: '2.52',
          allocator_rss_bytes: '3428352',
          rss_overhead_ratio: '0.89',
          rss_overhead_bytes: '-647168',
          mem_fragmentation_ratio: '3.07',
          mem_fragmentation_bytes: '3397128',
          mem_not_counted_for_evict: '0',
          mem_replication_backlog: '0',
          mem_total_replication_buffers: '0',
          mem_clients_slaves: '0',
          mem_clients_normal: '70200',
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
          rdb_changes_since_last_save: '38',
          rdb_bgsave_in_progress: '0',
          rdb_last_save_time: '1707217595',
          rdb_last_bgsave_status: 'ok',
          rdb_last_bgsave_time_sec: '0',
          rdb_current_bgsave_time_sec: '-1',
          rdb_saves: '267',
          rdb_last_cow_size: '868352',
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
          total_connections_received: '461200',
          total_commands_processed: '1895824',
          instantaneous_ops_per_sec: '0',
          total_net_input_bytes: '44744942',
          total_net_output_bytes: '5711653861',
          total_net_repl_input_bytes: '0',
          total_net_repl_output_bytes: '0',
          instantaneous_input_kbps: '0.00',
          instantaneous_output_kbps: '0.00',
          instantaneous_input_repl_kbps: '0.00',
          instantaneous_output_repl_kbps: '0.00',
          rejected_connections: '0',
          sync_full: '0',
          sync_partial_ok: '0',
          sync_partial_err: '0',
          expired_keys: '1687',
          expired_stale_perc: '0.00',
          expired_time_cap_reached_count: '0',
          expire_cycle_cpu_milliseconds: '62946',
          evicted_keys: '0',
          evicted_clients: '0',
          total_eviction_exceeded_time: '0',
          current_eviction_exceeded_time: '0',
          keyspace_hits: '25247',
          keyspace_misses: '1292',
          pubsub_channels: '0',
          pubsub_patterns: '0',
          pubsubshard_channels: '0',
          latest_fork_usec: '311',
          total_forks: '267',
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
          total_reads_processed: '1782088',
          total_writes_processed: '1782084',
          io_threaded_reads_processed: '0',
          io_threaded_writes_processed: '0',
          reply_buffer_shrinks: '247',
          reply_buffer_expands: '209'
        },
        Replication: {
          role: 'master',
          connected_slaves: '0',
          master_failover_state: 'no-failover',
          master_replid: '7bd7007da472db78030b33d0c77d9be394829165',
          master_replid2: '0000000000000000000000000000000000000000',
          master_repl_offset: '0',
          second_repl_offset: '-1',
          repl_backlog_active: '0',
          repl_backlog_size: '1048576',
          repl_backlog_first_byte_offset: '0',
          repl_backlog_histlen: '0'
        },
        CPU: {
          used_cpu_sys: '2131.071513',
          used_cpu_user: '2950.225480',
          used_cpu_sys_children: '0.920055',
          used_cpu_user_children: '1.248530',
          used_cpu_sys_main_thread: '2131.031963',
          used_cpu_user_main_thread: '2950.204909'
        },
        Modules: {},
        Commandstats: {
          cmdstat_multi: [
            'calls=286',
            'usec=251',
            'usec_per_call=0.88',
            'rejected_calls=0',
            'failed_calls=0'
          ],
          cmdstat_info: [
            'calls=922341',
            'usec=213079929',
            'usec_per_call=231.02',
            'rejected_calls=0',
            'failed_calls=0'
          ],
          cmdstat_hmset: [
            'calls=73',
            'usec=1496',
            'usec_per_call=20.49',
            'rejected_calls=0',
            'failed_calls=0'
          ],
          cmdstat_rpush: [
            'calls=256',
            'usec=1866',
            'usec_per_call=7.29',
            'rejected_calls=0',
            'failed_calls=0'
          ],
          cmdstat_rpushx: [
            'calls=6584',
            'usec=28450',
            'usec_per_call=4.32',
            'rejected_calls=0',
            'failed_calls=0'
          ],
          cmdstat_quit: [
            'calls=461158',
            'usec=634141',
            'usec_per_call=1.38',
            'rejected_calls=0',
            'failed_calls=0'
          ],
          cmdstat_exec: [
            'calls=286',
            'usec=4019',
            'usec_per_call=14.05',
            'rejected_calls=0',
            'failed_calls=0'
          ],
          cmdstat_ping: [
            'calls=6112',
            'usec=6204',
            'usec_per_call=1.02',
            'rejected_calls=0',
            'failed_calls=0'
          ],
          cmdstat_del: [
            'calls=66',
            'usec=921',
            'usec_per_call=13.95',
            'rejected_calls=0',
            'failed_calls=0'
          ],
          cmdstat_llen: [
            'calls=6840',
            'usec=14742',
            'usec_per_call=2.16',
            'rejected_calls=0',
            'failed_calls=0'
          ],
          cmdstat_expire: [
            'calls=359',
            'usec=1530',
            'usec_per_call=4.26',
            'rejected_calls=0',
            'failed_calls=0'
          ],
          cmdstat_auth: [
            'calls=461200',
            'usec=3618370',
            'usec_per_call=7.85',
            'rejected_calls=0',
            'failed_calls=0'
          ],
          cmdstat_get: [
            'calls=17419',
            'usec=113970',
            'usec_per_call=6.54',
            'rejected_calls=0',
            'failed_calls=0'
          ],
          cmdstat_set: [
            'calls=10564',
            'usec=143222',
            'usec_per_call=13.56',
            'rejected_calls=0',
            'failed_calls=0'
          ],
          cmdstat_hgetall: [
            'calls=2280',
            'usec=16991',
            'usec_per_call=7.45',
            'rejected_calls=0',
            'failed_calls=0'
          ]
        },
        Errorstats: {},
        Latencystats: {
          latency_percentiles_usec_multi: [
            'p50=1.003',
            'p99=2.007',
            'p99.9=6.015'
          ],
          latency_percentiles_usec_info: [
            'p50=193.535',
            'p99=671.743',
            'p99.9=1777.663'
          ],
          latency_percentiles_usec_hmset: [
            'p50=9.023',
            'p99=48.127',
            'p99.9=581.631'
          ],
          latency_percentiles_usec_rpush: [
            'p50=5.023',
            'p99=27.007',
            'p99.9=362.495'
          ],
          latency_percentiles_usec_rpushx: [
            'p50=2.007',
            'p99=11.007',
            'p99.9=41.215'
          ],
          latency_percentiles_usec_quit: [
            'p50=1.003',
            'p99=3.007',
            'p99.9=23.039'
          ],
          latency_percentiles_usec_exec: [
            'p50=11.007',
            'p99=43.007',
            'p99.9=376.831'
          ],
          latency_percentiles_usec_ping: [
            'p50=1.003',
            'p99=3.007',
            'p99.9=22.015'
          ],
          latency_percentiles_usec_del: [
            'p50=7.007',
            'p99=20.095',
            'p99.9=438.271'
          ],
          latency_percentiles_usec_llen: [
            'p50=2.007',
            'p99=7.007',
            'p99.9=21.119'
          ],
          latency_percentiles_usec_expire: [
            'p50=4.015',
            'p99=18.047',
            'p99.9=49.151'
          ],
          latency_percentiles_usec_auth: [
            'p50=7.007',
            'p99=25.087',
            'p99.9=167.935'
          ],
          latency_percentiles_usec_get: [
            'p50=6.015',
            'p99=22.015',
            'p99.9=88.063'
          ],
          latency_percentiles_usec_set: [
            'p50=12.031',
            'p99=38.143',
            'p99.9=397.311'
          ],
          latency_percentiles_usec_hgetall: [
            'p50=5.023',
            'p99=28.031',
            'p99.9=460.799'
          ]
        },
        Cluster: {
          cluster_enabled: '0'
        },
        Keyspace: {
          db0: ['keys=683', 'expires=1', 'avg_ttl=1195892']
        },
        app: {
          version: '7.0.12',
          semverVersion: '7.0.12',
          invalidVersion: false
        },
        name: 'Redis',
        status: 'running',
        hostname: 'redis:6379'
      },
      lastSuccessfulUpdate: '2024-02-06T11:09:52.003Z',
      lastUpdate: '2024-02-06T11:09:52.003Z',
      status: 'running',
      name: 'Redis'
    },
    {
      _id: '659d832c74582a82f94ee54d',
      type: 'ActivityServer',
      hostname: 'http://ses-activity-collector:8701',
      insertedAt: '2024-01-17T17:25:12.744Z',
      lastFailedUpdate: '2024-01-09T17:32:42.082Z',
      lastPollingError: 'Error: connect ECONNREFUSED 172.16.0.18:8701',
      lastUpdate: '2024-02-06T11:09:51.998Z',
      status: 'running',
      app: {
        name: 'Activity Server',
        version: '9.11.7-0.0.beta0.el8',
        semverVersion: '9.11.7',
        invalidVersion: false
      },
      data: {
        app: {
          name: 'Activity Server',
          version: '9.11.7-0.0.beta0.el8',
          semverVersion: '9.11.7',
          invalidVersion: false
        },
        status: true
      },
      lastSuccessfulUpdate: '2024-02-06T11:09:51.998Z',
      name: 'Activity Server'
    },
    {
      name: 'SES Console',
      status: 'running',
      hostname: 'https://spns-alpha-el8.systran.net',
      app: {
        version: '9.11.7-0.0.beta0.el8'
      }
    },
    {
      _id: '659d832c74582a82f94ee554',
      type: 'Gateway',
      hostname: 'https://ses-gateway:8904',
      insertedAt: '2024-01-17T17:25:12.756Z',
      lastFailedUpdate: '2024-01-09T17:32:52.079Z',
      lastPollingError: 'Error: connect ECONNREFUSED 172.16.0.22:8904',
      lastUpdate: '2024-02-06T11:09:52.004Z',
      status: 'running',
      app: {
        name: 'SYSTRAN REST Gateway',
        version: '9.11.1-0.el8',
        semverVersion: '9.11.1',
        invalidVersion: false
      },
      data: {
        app: {
          name: 'SYSTRAN REST Gateway',
          version: '9.11.1-0.el8',
          semverVersion: '9.11.1',
          invalidVersion: false
        },
        status: true
      },
      lastSuccessfulUpdate: '2024-02-06T11:09:52.004Z',
      name: 'Gateway',
      statusFailed: true
    },
    {
      _id: '659d832c74582a82f94ee556',
      type: 'TrsConsole',
      hostname: 'https://trs-console:3445',
      insertedAt: '2024-01-17T17:25:12.761Z',
      lastFailedUpdate: '2024-01-09T17:32:42.099Z',
      lastPollingError: 'Error: connect ECONNREFUSED 172.16.0.12:3445',
      lastUpdate: '2024-02-06T11:09:52.006Z',
      status: 'running',
      app: {
        name: 'Local TranslationResourceStore console',
        version: '9.11.0-0.3.alpha3.el8',
        semverVersion: '9.11.0',
        invalidVersion: false
      },
      data: {
        app: {
          name: 'Local TranslationResourceStore console',
          version: '9.11.0-0.3.alpha3.el8',
          semverVersion: '9.11.0',
          invalidVersion: false
        },
        status: true
      },
      lastSuccessfulUpdate: '2024-02-06T11:09:52.006Z',
      name: 'TRS Console'
    },
    {
      _id: '659d834a74582a82f94f34fd',
      hostname: 'dispatcher',
      insertedAt: '2024-01-09T17:34:38.759Z',
      secure: false,
      app: {
        name: 'SystranTranslationDispatcher',
        version: '8.23.1-0.el8',
        semverVersion: '8.23.1'
      },
      lastSuccessfulUpdate: '2024-02-06T11:09:47.539Z',
      lastUpdate: '2024-02-06T11:09:47.539Z',
      pollingHost: 'dispatcher:8887',
      status: 'running',
      name: 'Dispatcher'
    },
    {
      _id: '659d834a74582a82f94f34ee',
      hostname: 'routing',
      insertedAt: '2024-01-09T17:32:58.126Z',
      secure: false,
      version: 'f08ead0a-abb7-4e19-9485-c438daa83b6d_8.23.1-0.el8',
      app: {
        name: 'RoutingServer',
        version: '8.23.1-0.el8',
        semverVersion: '8.23.1',
        invalidVersion: false
      },
      lastSuccessfulUpdate: '2024-02-06T11:09:48.426Z',
      lastUpdate: '2024-02-06T11:09:48.427Z',
      status: 'running',
      name: 'Routing Server'
    },
    {
      _id: '659d832c74582a82f94ee561',
      type: 'GDict',
      hostname: 'http://10.60.104.243:8892',
      insertedAt: '2024-01-17T17:25:12.771Z',
      app: {
        name: 'GDict Mongo',
        version: '8.23.1-1.el8',
        semverVersion: '8.23.1',
        invalidVersion: false
      },
      data: {
        app: {
          name: 'GDict Mongo',
          version: '8.23.1-1.el8',
          semverVersion: '8.23.1',
          invalidVersion: false
        },
        status: true
      },
      lastSuccessfulUpdate: '2024-02-06T11:09:52.002Z',
      lastUpdate: '2024-02-06T11:09:52.002Z',
      status: 'running',
      name: 'GDict'
    },
    {
      _id: '659d832c74582a82f94ee563',
      type: 'DctIndexer',
      hostname: 'http://dct-indexer:8893',
      insertedAt: '2024-01-17T17:25:12.774Z',
      app: {
        name: 'DctIndexer',
        version: '8.23.1-0.el8',
        semverVersion: '8.23.1',
        invalidVersion: false
      },
      data: {
        app: {
          name: 'DctIndexer',
          version: '8.23.1-0.el8',
          semverVersion: '8.23.1',
          invalidVersion: false
        },
        status: true
      },
      lastSuccessfulUpdate: '2024-02-06T11:09:52.005Z',
      lastUpdate: '2024-02-06T11:09:52.005Z',
      status: 'running',
      name: 'DCT Indexer'
    },
    {
      _id: '659d832c74582a82f94ee54f',
      type: 'CorpusManager',
      hostname: 'http://corpus-manager:8889',
      insertedAt: '2024-01-17T17:25:12.748Z',
      app: {
        name: 'CorpusManager2',
        version: '8.23.2-0.el8',
        semverVersion: '8.23.2',
        invalidVersion: false
      },
      data: {
        app: {
          name: 'CorpusManager2',
          version: '8.23.2-0.el8',
          semverVersion: '8.23.2',
          invalidVersion: false
        },
        status: true
      },
      lastSuccessfulUpdate: '2024-02-06T11:09:51.999Z',
      lastUpdate: '2024-02-06T11:09:51.999Z',
      status: 'running',
      name: 'Corpus Manager'
    },
    {
      _id: '659d832c74582a82f94ee551',
      type: 'TmIndexer',
      hostname: 'http://tm-indexer:8890',
      insertedAt: '2024-01-17T17:25:12.751Z',
      app: {
        name: 'TmIndexer',
        version: '8.23.1-0.el8',
        semverVersion: '8.23.1',
        invalidVersion: false
      },
      data: {
        app: {
          name: 'TmIndexer',
          version: '8.23.1-0.el8',
          semverVersion: '8.23.1',
          invalidVersion: false
        },
        status: true
      },
      lastSuccessfulUpdate: '2024-02-06T11:09:52.000Z',
      lastUpdate: '2024-02-06T11:09:52.000Z',
      status: 'running',
      name: 'TM Indexer'
    },
    {
      _id: '659d832c74582a82f94ee55e',
      type: 'Lookup',
      hostname: 'http://lookup:8891',
      insertedAt: '2024-01-17T17:25:12.769Z',
      lastFailedUpdate: '2024-01-09T17:32:57.117Z',
      lastPollingError: 'Error: connect ECONNREFUSED 172.16.0.8:8891',
      lastUpdate: '2024-02-06T11:09:52.001Z',
      status: 'running',
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
      lastSuccessfulUpdate: '2024-02-06T11:09:52.001Z',
      name: 'Lookup Server'
    },
    {
      displayName: 'Computing Node (TRM)',
      id: '659d834a74582a82f94f349f',
      hostname: 'trm',
      status: 'running',
      app: {
        name: 'TranslationResourceMonitor',
        version: '8.23.1-0.el8',
        semverVersion: '8.23.1',
        invalidVersion: false
      },
      lastUpdate: '2024-02-06T11:09:47.657Z',
      lastSuccessfulUpdate: '2024-02-06T11:09:47.657Z',
      nbCores: 8,
      loadAverage: '2.51 2.4 2.29',
      totalMemory: '30079344',
      availableMemory: '2386068',
      freeMemory: '326320',
      cachedMemory: '1858648',
      buffersMemory: '73908',
      totalDisk: '203056560',
      availableDisk: '119513480',
      freeDisk: '119529864',
      os: 'CentOS Linux release 8.4.2105',
      uptime: '33 days, 22:3:36',
      nbInstances: 17,
      translationResources: [
        {
          id: '1f14b501-df8a-4650-a0a6-efc6c69bc188',
          name: 'Container Generic (L) arfr',
          status: 'installed',
          nbInstances: 1,
          routes: []
        },
        {
          id: 'bb916243-7148-4987-8451-09d342e7c648',
          name: 'PTE Data Generic (L) arfr',
          status: 'downloaded',
          nbInstances: 0,
          routes: []
        },
        {
          id: '54d8f2f4-a204-4d1c-8e55-b5ce8b773218',
          name: 'PTE Data Generic (L) enfr',
          status: 'downloaded',
          nbInstances: 0,
          routes: []
        },
        {
          id: '904d3611-2d15-4348-b0d9-62e79794adc9',
          name: 'Container Generic (L) enfr NFAtest',
          status: 'installed',
          nbInstances: 1,
          routes: []
        },
        {
          id: 'c9317a87-9157-494f-9a34-2df3b8015056',
          name: 'PTE Data Generic (L) enes',
          status: 'downloaded',
          nbInstances: 0,
          routes: []
        },
        {
          id: 'af186cea-f2c4-45e1-8c08-5ab9411d9cef',
          name: 'PTE Data Generic (L) enja',
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
          id: 'ab36139c-9347-4e53-97e4-051addbf16ef',
          name: 'PTE Data Generic (L) zhen',
          status: 'downloaded',
          nbInstances: 0,
          routes: []
        },
        {
          id: 'ef7b6686-2586-488e-9e3b-6f21f7855266',
          name: 'PTE Data IT (M) fren',
          status: 'downloaded',
          nbInstances: 0,
          routes: []
        },
        {
          id: '1dac73db-ab89-42fc-bedd-9af0a0d7f2a0',
          name: 'PTE Generic (L) enfr',
          status: 'installed',
          nbInstances: 1,
          routes: []
        },
        {
          id: '2239b878-f944-46d7-be5f-6846baaa7eac',
          name: 'PTE Data Generic (L) enfr',
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
          id: 'd394e2c4-830f-474e-b918-4247f8ca0eab',
          name: 'Container Data Generic (L) zhen',
          status: 'downloaded',
          nbInstances: 0,
          routes: []
        },
        {
          id: '9a2a5ba2-999e-4b04-8c1c-b398e49e76cc',
          name: 'Container Data Generic (L) enfr',
          status: 'downloaded',
          nbInstances: 0,
          routes: []
        },
        {
          id: 'ce4a521a-6ab5-4c00-91f0-15cdc943c771',
          name: 'Container Generic (L) fren',
          status: 'installed',
          nbInstances: 1,
          routes: []
        },
        {
          id: '96b74bbd-102a-4aa4-87a9-adffbbdf688b',
          name: 'Container Generic (L) enes',
          status: 'installed',
          nbInstances: 1,
          routes: []
        },
        {
          id: 'c690fb3c-b48e-41f3-9ba2-e0e34fe9a6c3',
          name: 'Container Data Generic (L) enja',
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
              _id: '65a6a1ac74582a82f979ced7',
              profileId: '227e99b8-c399-4b47-8fb0-cc153afcd13e',
              queue: '6baabe22-19fa-4a24-be92-f31263b57f70',
              serverVersion:
                'f08ead0a-abb7-4e19-9485-c438daa83b6d_8.23.1-0.el8',
              service: 'Translate_fr_en',
              comment: {
                serviceName: 'Translator NMT Generic (L) - FREN',
                translationResourceId: '6baabe22-19fa-4a24-be92-f31263b57f70',
                translationResourceName: 'PTE Generic (L) fren'
              },
              deactivated: false,
              insertedAt: '2024-01-16T15:33:00.491Z',
              insertionTime: '1704821681221',
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
              version: '2.0'
            },
            {
              _id: '65a6a1ac74582a82f979ceeb',
              profileId: 'd535307a-e824-4720-9cf2-dc331c5252e5',
              queue: '6baabe22-19fa-4a24-be92-f31263b57f70',
              serverVersion:
                'f08ead0a-abb7-4e19-9485-c438daa83b6d_8.23.1-0.el8',
              service: 'Translate_fr_en',
              comment: {
                serviceName: 'Translate_fr_en',
                translationResourceId: '6baabe22-19fa-4a24-be92-f31263b57f70',
                translationResourceName: 'PTE Generic (L) fren'
              },
              deactivated: false,
              insertedAt: '2024-01-16T15:33:00.496Z',
              insertionTime: '1705419167461',
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
              users: ['659d832714bc9e000da91571'],
              version: '2.0'
            }
          ]
        },
        {
          id: '96c9af1f-a582-4c61-931c-86b69a5dd6f0',
          name: 'Container IT (M) fren',
          status: 'installed',
          nbInstances: 1,
          routes: []
        },
        {
          id: 'b866d27f-4f16-44b4-b53d-8723ffd5daa8',
          name: 'Filter',
          status: 'installed',
          nbInstances: 1,
          routes: [
            {
              _id: '65a6a1ac74582a82f979ced1',
              profileId: 'd61e807e-90ee-4332-9e98-97b300463b15',
              queue: 'b866d27f-4f16-44b4-b53d-8723ffd5daa8',
              serverVersion:
                'f08ead0a-abb7-4e19-9485-c438daa83b6d_8.23.1-0.el8',
              service: 'Filter',
              comment: {
                serviceName: 'Filter',
                translationResourceId: 'b866d27f-4f16-44b4-b53d-8723ffd5daa8',
                translationResourceName: 'Filter'
              },
              deactivated: false,
              insertedAt: '2024-01-16T15:33:00.489Z',
              insertionTime: '1704821680671',
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
          id: '9c33a332-8d74-47a9-b4ed-729594a2828d',
          name: 'Container Generic (L) enfr',
          status: 'installed',
          nbInstances: 1,
          routes: []
        },
        {
          id: 'd45a105b-8407-48da-99f3-6a8f23c0cbb6',
          name: 'PTE Generic (L) zhen',
          status: 'installed',
          nbInstances: 1,
          routes: [
            {
              _id: '65a6a1ac74582a82f979ced9',
              profileId: 'c8a00929-3979-43a2-83e5-401083044949',
              queue: 'd45a105b-8407-48da-99f3-6a8f23c0cbb6',
              serverVersion:
                'f08ead0a-abb7-4e19-9485-c438daa83b6d_8.23.1-0.el8',
              service: 'Translate_zh_en',
              comment: {
                serviceName: 'Translator NMT Generic (L) - ZHEN',
                translationResourceId: 'd45a105b-8407-48da-99f3-6a8f23c0cbb6',
                translationResourceName: 'PTE Generic (L) zhen'
              },
              deactivated: false,
              insertedAt: '2024-01-16T15:33:00.491Z',
              insertionTime: '1704821681225',
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
              source: 'zh',
              target: 'en',
              version: '2.0'
            }
          ]
        },
        {
          id: '24daa535-f29b-48f1-8184-2ecd93ca3f7e',
          name: 'Container Generic (L) zhen',
          status: 'installed',
          nbInstances: 1,
          routes: []
        },
        {
          id: '7ea61879-12a4-4433-a9e9-e6ac1ab14345',
          name: 'PTE Generic (L) enfr',
          status: 'installed',
          nbInstances: 1,
          routes: [
            {
              _id: '65a6a1ac74582a82f979cedb',
              profileId: 'df36cd44-ec7e-4425-ba08-2c8c20d58cfc',
              queue: '7ea61879-12a4-4433-a9e9-e6ac1ab14345',
              serverVersion:
                'f08ead0a-abb7-4e19-9485-c438daa83b6d_8.23.1-0.el8',
              service: 'Translate_en_fr',
              comment: {
                serviceName: 'Translator NMT Generic (L) - ENFR',
                translationResourceId: '7ea61879-12a4-4433-a9e9-e6ac1ab14345',
                translationResourceName: 'PTE Generic (L) enfr'
              },
              deactivated: false,
              insertedAt: '2024-01-16T15:33:00.492Z',
              insertionTime: '1704821681230',
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
              version: '2.0'
            }
          ]
        },
        {
          id: '9deccef4-d0b1-4cc5-8022-e8638a369a89',
          name: 'PTE Generic (L) enja',
          status: 'installed',
          nbInstances: 1,
          routes: [
            {
              _id: '65a6a1ac74582a82f979cee0',
              profileId: 'd7c6a6e6-2c01-4af8-bc87-a8245971a050',
              queue: '9deccef4-d0b1-4cc5-8022-e8638a369a89',
              serverVersion:
                'f08ead0a-abb7-4e19-9485-c438daa83b6d_8.23.1-0.el8',
              service: 'Translate_en_ja',
              comment: {
                serviceName: 'Translator NMT Generic (L) - ENJA',
                translationResourceId: '9deccef4-d0b1-4cc5-8022-e8638a369a89',
                translationResourceName: 'PTE Generic (L) enja'
              },
              deactivated: false,
              insertedAt: '2024-01-16T15:33:00.493Z',
              insertionTime: '1704821681231',
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
              target: 'ja',
              version: '2.0'
            }
          ]
        },
        {
          id: '2c9b02ef-1e21-46a3-9c10-99e53999d3c6',
          name: 'PTE Generic (L) arfr',
          status: 'installed',
          nbInstances: 1,
          routes: [
            {
              _id: '65a6a1ac74582a82f979cef3',
              profileId: '87cdf300-5665-4541-89a9-e9995d50ac01',
              queue: '2c9b02ef-1e21-46a3-9c10-99e53999d3c6',
              serverVersion:
                'f08ead0a-abb7-4e19-9485-c438daa83b6d_8.23.1-0.el8',
              service: 'Translate_ar_fr',
              comment: {
                serviceName: 'Translate_ar_fr',
                translationResourceId: '2c9b02ef-1e21-46a3-9c10-99e53999d3c6',
                translationResourceName: 'PTE Generic (L) arfr'
              },
              deactivated: false,
              insertedAt: '2024-01-16T15:33:00.496Z',
              insertionTime: '1705419167473',
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
              source: 'ar',
              target: 'fr',
              users: ['659d832714bc9e000da91571'],
              version: '2.0'
            },
            {
              _id: '65a6a1ac74582a82f979cee8',
              profileId: 'df48f352-a356-4d32-884a-96b71bf50671',
              queue: '2c9b02ef-1e21-46a3-9c10-99e53999d3c6',
              serverVersion:
                'f08ead0a-abb7-4e19-9485-c438daa83b6d_8.23.1-0.el8',
              service: 'Translate_ar_fr',
              comment: {
                serviceName: 'Translator NMT Generic (L) - ARFR',
                translationResourceId: '2c9b02ef-1e21-46a3-9c10-99e53999d3c6',
                translationResourceName: 'PTE Generic (L) arfr'
              },
              deactivated: false,
              insertedAt: '2024-01-16T15:33:00.495Z',
              insertionTime: '1704880893050',
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
              source: 'ar',
              target: 'fr',
              users: ['659d832714bc9e000da91571'],
              version: '2.0'
            }
          ]
        },
        {
          id: '99f42b38-0a0d-4ec9-9f43-2950b182e09d',
          name: 'PTE IT (M) fren',
          status: 'installed',
          nbInstances: 1,
          routes: [
            {
              _id: '65a6a1ac74582a82f979ced2',
              profileId: 'dc4b1a67-32f3-44fd-b08c-f90bdd1594f2',
              queue: '99f42b38-0a0d-4ec9-9f43-2950b182e09d',
              serverVersion:
                'f08ead0a-abb7-4e19-9485-c438daa83b6d_8.23.1-0.el8',
              service: 'Translate_fr_en',
              comment: {
                serviceName: 'Translator NMT IT (M) - FREN',
                translationResourceId: '99f42b38-0a0d-4ec9-9f43-2950b182e09d',
                translationResourceName: 'PTE IT (M) fren'
              },
              deactivated: false,
              insertedAt: '2024-01-16T15:33:00.490Z',
              insertionTime: '1704821681201',
              internal: true,
              priority: 0,
              public: true,
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
              sharingStatus: 'public',
              source: 'fr',
              target: 'en',
              version: '2.0'
            }
          ]
        },
        {
          id: '83428294-77bb-4ff6-8398-98de0888f09c',
          name: 'PTE Generic (L) enes',
          status: 'installed',
          nbInstances: 1,
          routes: [
            {
              _id: '65a6a1ac74582a82f979ceda',
              profileId: '9c7f8a10-a9b1-46b3-977b-f65913a133c4',
              queue: '83428294-77bb-4ff6-8398-98de0888f09c',
              serverVersion:
                'f08ead0a-abb7-4e19-9485-c438daa83b6d_8.23.1-0.el8',
              service: 'Translate_en_es',
              comment: {
                serviceName: 'Translator NMT Generic (L) - ENES',
                translationResourceId: '83428294-77bb-4ff6-8398-98de0888f09c',
                translationResourceName: 'PTE Generic (L) enes'
              },
              deactivated: false,
              insertedAt: '2024-01-16T15:33:00.492Z',
              insertionTime: '1704821681225',
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
              target: 'es',
              version: '2.0'
            }
          ]
        },
        {
          id: '2de613a4-06f3-4bf7-a60f-1f889c959110',
          name: 'Container Data Generic (L) enes',
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
          id: 'efac2e24-7d72-4919-a8cd-3f91b2ce8507',
          name: 'Container Generic (L) enja',
          status: 'installed',
          nbInstances: 1,
          routes: []
        },
        {
          id: '87a57c65-fd1c-435f-86e9-498379f31325',
          name: 'Container Data Generic (L) arfr',
          status: 'downloaded',
          nbInstances: 0,
          routes: []
        },
        {
          id: '4db1eb95-2f7f-4e9a-9bc2-0859939bb48c',
          name: 'Container Data IT (M) fren',
          status: 'downloaded',
          nbInstances: 0,
          routes: []
        },
        {
          id: 'b0b85d25-694c-4d66-85a0-3988055d511b',
          name: 'Container Data Generic (L) enfr',
          status: 'downloaded',
          nbInstances: 0,
          routes: []
        },
        {
          id: 'fb61d28d-5f4a-4c1a-aeb3-475040a5035c',
          name: 'Common Image',
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
      lastPollingDate: '2024-02-06T11:06:29.955Z',
      lastTrsUpdate: '2024-02-06T11:06:29.955Z',
      app: {
        version: '9.11.0-0.3.alpha3.el8'
      },
      lastUpdate: '2024-02-06T11:09:52.010Z'
    },
    {
      name: 'SES File Translation Consumer',
      app: {
        version: '9.11.7-0.0.beta0.el8'
      },
      status: 'running'
    },
    {
      name: 'SES Poller',
      app: {
        version: '9.11.7-0.0.beta0.el8'
      },
      status: 'running'
    }
  ],
  total: 19,
  running: 19,
  failed: 0
};
