# Web page Services 

# epic : ST-3374


# Page
# Toolbar
ticket : https://systran.atlassian.net/browse/ST-3491
Toolbar have to parts :  left side and right side
1. Buttons on the left-hand side concern actions on the selected row. in this case 
   - de-register
1. Buttons right-hand side are about global actions on the page in this  case : 
    - register
    - refresh
    - select refresh rate 

## Rules

Left hand side is not displayed if none row is selected 

de-register is grayed if more than one row is selected
# Table


# expand display 
As the owner of the product, i want access to detailed information by expanding lines.

Overall display rules : 

time duration should be displayed in : seconds, minutes, hours, days, week, month, year 

data size should be display in B (bytes) KB (kilobytes) MB (megabytes) GB (gigabytes) for null value '0 KB'

column size should be 5 rem

leading size should be 0.5 rem between the current line and the previous line



specific display rules

MongoDB

RabbitMQ (used by ses-file-translation-consumer)

value for running status is :  nodes[node-number].running

node is with running status => background color should be primary.main otherwise (other value or undefined)  background should be error.main

Computing Node

Redis

modified : label: CPU, value: redisData.Server.arch_bits + ' bits', leading: true   add ‘Bits’  as a unit

redisData.CPU.used_cpu_user :  display as a round number with no decimal and '%' as unit 

redisData.CPU.used_cpu_sys_children display as a round number with no decimal and '%' as unit 

redisData.CPU.used_cpu_user_children display as a round number with no decimal and '%' as unit 

Redis (used by Computing Nodes)

default expand

Elastic Search

Activity Server

Broker

Corpus Manager

Routing Server

Dispatcher

GDict

Lookup Server

TM Indexer

DCT Indexer

Gateway

TRS Console

SES Console

TRS Poller

information displayed : 

example : 



Ligne

Line number

label

data

Remark

1

Hostname:

services.hostname

2

Status

service.status

if fail => status = error

if  running => status = success

3

Last Polling Date

4

Last Update:

5

Last Successful Update:

# Network resquest



# draft note 
migration from React-16 /boostrap 3.14 to react-18/MUI

IMPORTANT :

Please pay attention to these following points when doing your development

the localization using i18n

the accessibility (with tab and arrow keys)

 

Migrate the existing table to MUI-table.

the title (static page)  

the table + with actions buttons 

expand information on table  

Handle search bar, filter, sort, pagination

Handle all existing actions to notifications

Plug page to the data on the server

Requirement

services

services managed by this pages are : 

Activity Server

Broker

Computing Node

Corpus Manager

DCT Indexer

Dispatcher

Elastic Search

Gateway

GDict

Lookup Server

MongoDB

RabbitMQ (used by ses-file-translation-consumer)

Redis

Redis (used by Computing Nodes)

Routing Server

SES Console

TM Indexer

TRS Console

TRS Poller

Services with de-register option are : 

Broker

Computing Node

Dispatcher

Routing Server

Redis (used by Computing Nodes)

note : this list should be displayed in select-box when register new service (the other services is not displayed)



Expand information  

check points on MR:

Bootstrap => MUI migration, React-18 and Typescript

Support themes / style component

Support localization (i18n)

Support accessibility

Responsive (minimal checks to ensure the website is still functional)

version  10.0 





Need informations 

is the search bar active on st