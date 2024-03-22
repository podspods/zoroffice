# Statistique

  1. [fullView](#fullview)
  1. [Groups](#groups)
  1. [Profiles](#profiles)
  1. [Session](#session)
  1. [User](#user)



# overview

## Axe : 
  - time  monthly 
  - user -> group 
  - language pair
  - mime-type
  - User-agent

## Key figure 
  - Consumption by char
  - consumption by file 
  - Unlimited 
      - Translation Box
      - SYSTRAN Windows App
      - Office Add-Ins - Text Translation
      - Misc.
  - Counted Translations
      - gateway
      - File Translate Box
      - Google compat mode
      - Misc.

  - Consumption in the Monthly Package
 # Data source 

mongoDB : 
database : stats

 # report 

 1. agregate statistics
 1. statistics

  # FullView
1. url : https://localhost:3450/en/administration/statistics/fullview
1. network request : GET 	https://localhost:3450/administration/statistics/fullview?_rsc=9sgcd
  GET https://localhost:3450/en/administration/statistics/fullview

Response
```js
GET
  0:["development",[["children",["lang","en","d"],"children","administration","children","statistics","children","fullview",["fullview",{"children":["__PAGE__",{}]}],null,null]]]
```
  # Groups

1. columns
    1. [A] groupName (Administrator)
    1. [A] period (December 2023)
    1. [A] profileName ('Ada Lovelace') 
    1. [A] source (EN)
    1. [A] target (FR)
    1. [A] mimeType (json)
    1. [I] Request (102)
    1. [I] Success (98)
    1. [I] Segments (200)
    1. [I] Segement in cache (152)
    1. [I] Characters (3498)
    1. [I] Elapsed time (87633)
1. url : https://localhost:3450/en/administration/statistics/groups
1. network request : GET https://localhost:3450/admin/groups/light?limit=50&eleFilters[name]=&withRoles=true
1. response 

```js
{
	"groups": [
		{
			"name": "Administrator",
			"roles": [],
			"accounts": [],
			"id": "654b985a0e9e5000c7a3ec62"
		},
		{
			"name": "Default",
			"roles": [],
			"accounts": [],
			"id": "654b98590e9e5000c7a3ec5c"
		}
	],
	"total": 2,
	"offset": 0,
	"limit": 2
}
```


  # Profiles
   - User-agent
  # Session
  # User
  usr from translate-beta when click on https://translate-beta.systran.net/fr/statistics/personal
  	https://translate-beta.systran.net/node/global/settings
# request current dashbord  

GET
	https://trs.systran.net/periods/656bcd8ee136251241688219/usage/counted  



# first draft 

## dashboard 1

1. Unlimited translations
    - elapsedTime: 10688268,
    - groupName: Systran,
    - nbCacheHits: 984,
    - nbCharacters: 279533,
    - nbCharactersCacheHits: 70507,
    - nbSegments: 3845,
    - nbTokens: 0,
    - nbTus: 4400,
    - nbTusFailed: 1,
    - request: 3345,
    - success: 3228,

1. Counted Translations
# notes draft 


react-side /home/destrieux/dev/enterprise-server/react/statistics/components
redux-side  /home/destrieux/dev/enterprise-server/redux/statistics/actions.js
server-side /home/destrieux/dev/enterprise-server/test/statistics
## ses console 
line 586
```js
if (nconf.get('TrainingOnTheCloud:mode') === 'ses') {
    app.get('/views/statistics*', auth([actions.ADMIN_STATS, actions.USER_PERSONAL_STATS, actions.USERS_STATS, actions.GROUPS_STATS, actions.AGGREGATED_STATS]), routes.statistics);
    app.get('/views/admin/monitoring', auth(actions.ADMIN_MONITORING), routes.monitoring);
  }
```



previous version 
/home/destrieux/dev/enterprise-server/redux/statistics/actions.js
```js
    case 'global':
      type = types.REQUEST_GLOBAL_STATS;
      break;
    case 'user':
      type = types.REQUEST_USER_STATS;
      break;
    case 'group':
      type = types.REQUEST_GROUP_STATS;
      break;
    case 'session':
      type = types.REQUEST_SESSION_STATS;
      break;
    case 'details':
      type = types.REQUEST_DETAILED_STATS;
```

    /home/destrieux/dev/enterprise-server/redux/statistics/operations.js

    ```js
        switch (view) {
      case 'global':
        queryString = {groupBy: 'profiles'};
        statisticsState = 'globalStatistics';
        uri = '/activity';
        break;
      case 'session':
        queryString = {groupBy: 'sessions'};
        statisticsState = 'sessionStatistics';
        uri = '/activity';
        break;
      case 'details':
        statisticsState = 'detailedStatistics';
        uri = '/activity/details';
        break;
      default:
        return null;
    }
    ```

# user list 
https://trs.systran.net/administration/users
https://trs.systran.net/admin/users?skip=0&limit=10&optionnalFields[]=groupNames&optionnalFields[]=allRoleNames



https://trs.systran.net/downloads#/usage
GET
	https://trs.systran.net/downloads/list/all?skip=0&limit=5
  GET
	https://trs.systran.net/downloads/usage?startDate=2023-12-18 16:01:55&endDate=2023-12-19 16:01:55


# syntheise dashboard 
https://trs.systran.net/dashboard/usage

user-entity
https://trs.systran.net/entity/personal/users?eleFilters[enable]=false&limit=50


# user-role
https://trs.systran.net/entity/personal

usage-period
GET
	https://trs.systran.net/periods/656bcd8ee136251241688219/usage/counted

  unlimited 
  https://trs.systran.net/periods/656bcd8ee136251241688219/usage/unlimited


  https://trs.systran.net/entity/personal/users?eleFilters[enable]=true&limit=50
  https://trs.systran.net/entity/personal
  https://trs.systran.net/locales/en/client
  https://trs.systran.net/locales/en/translation


  GET
	https://trs.systran.net/dashboard/usage

  routes/index.js

  ```js
  exports.statistics = getPageHandler('Statistics', 'admin/statistics', 'ses10');
exports.monitoring = getPageHandler('Monitoring', 'admin/monitoring', 'ses10');
  ```


# requette 
https://trs.systran.net/periods/656bcd8ee136251241688219/usage/counted