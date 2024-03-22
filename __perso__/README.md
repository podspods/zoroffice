# Statistique

  1. [fullView](#fullview)
  1. [Groups](#groups)
  1. [Profiles](#profiles)
  1. [Session](#session)
  1. [User](#user)
  1. [request](#requete)



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


# git source API  
1. lib/stats.js
1. ses-activity-collector.js


# Réunion point avec le produit

https://systran.atlassian.net/wiki/spaces/PRODUCT/pages/312147974/Detailed+Statistics+Revamp

aggregated page 
period, user , group 
critere aggregate :  
Indicateur voir feuille confluence   
filtre multicolonne , ET

stat admin , tableau



minute-meeting 
1. page confluence de specification https://systran.atlassian.net/wiki/spaces/PRODUCT/pages/312147974/Detailed+Statistics+Revamp
1. interation 1 sur 10.1  2 report 1 agg 1 detaille
1. periode interactif iteration 1.1
1. export excel 
1. point de repere : epic  : 
https://systran.atlassian.net/browse/ST-3791  


# realisation 

## myStat 
get : https://translate.systran.net/activity/user/personal/details?date=2023-11&skip=0&limit=10&sortName=request&sortOrder=desc
sample:  /home/destrieux/dev/enterprise-server/web/app/[lang]/administration/statistics/data/mystat.json


get + filter  https://translate.systran.net/activity/user/personal/details?date=2023-11&skip=0&limit=10&eleFilters%5Bsource%5D=EN&eleFilters%5Btarget%5D=FR&sortName=request&sortOrder=desc

[vendredi 15:31] BRETIN Guillaume
PERINPARAJAH Janany Comme tu n'a pas pu être présente / voici un rapide résumé du point de ce jour 
 
Nous avons formalisé nos attentes sur la page confluence de référence >> https://systran.atlassian.net/wiki/spaces/PRODUCT/pages/312147974/Detailed+Statistics+Revamp
 
Besoin
Réduire le nombre de page car il n'est pas utile d'avoir une page pour un type de filtre ou d'aggregations de données > on doit pouvoir tout proposer sur une page
Il faudrait idéalement qu'on soit en mesure d'adapter la table avec un choix d'aggrégateur de l'utilisateur mais dans un premier temps on peut partir sur une table fixe avec des un petit set de colonnes (et d'autres cachées que l'utilisateur peux ré-afficher selon son besoin)
On ne propose pas de line expand pour le moment, l'idée est de rester sur un niveau de stat simple mais efficace
On veut pouvoir sélectionner sa période avec start/end date
On doit pouvoir filtrer sur la page sur les principaux et si possible par colonne (en mode "AND" ad minima > a voir si on peut proposer plus de choix sur l'opérateur (contains...)  
User 
Group
Profile
Language pair
On doit pouvoir proposer une colonne language pair plutôt que source et target
On veut des compteur globaux pour éviter aux utilisateurs d'avoir à sortir la data pour l'additionner et lui faire gagner du temps 
Le filtrage s'entend sur l'ensemble des données de la base sur la période sélectionnée et pas juste sur les données visisbles.
Il faudra peut-être un sélecteur pour choisir le type d'aggregation (Session vs all)
NB
N'hésitez pas à challenger si un choix est trop impactant ou cassant à votre sens. Nous sommes ouvert à la discussion 
S'il y a des update on fera un commentaire ou une maj sur l'epic concernée
SKELLEY Izzy va mettre à jour les mockup avec les colonnes visibles attendues et les compteurs.
 
Phasing 
10.1
Page de stats aggrégées
Page full stat (raw data) > le besoin est surtout pour l'utilisateur de pouvoir fouiller dans ses stats en les regroupant comme il le souhaite / si cette page est trop consommatrice de ressource on peut envisager de permettre au client de récupérer ses données autrement en export ou API afin de réaliser ses propres tableaux et aggregations
Il faudrait peut-être proposer le période d'aggregation (jour ou mois par exemple)
Et si possible >> Page My stats qui serait dans l'idéal un dashboard de plusieurs graphiques >> on fournira un mockup et les tableaux attendus
si cela fait trop par rapport à la 10.1 dans la mesure ou c'est un nouveau display alors on partira sur une page similaire à la page Page de stats aggrégées mai centrée sur les données du user.
Later
Page de stat autour des fichiers
En fonction de la 10.1 > Personal dashboard (à voir)
Global Dashboard for admin
 
Log in with Atlassian account
Log in to Jira, Confluence, and all other Atlassian Cloud products here. Not an Atlassian user? Sign up for free.

# requete

## spns
1. [global ](https://spns-alpha-el8.systran.net/statistics/global) :
https://spns-alpha-el8.systran.net/activity?startDate=1701426060000&endDate=1704018060000&groupBy=sessions&skip=0&limit=10&sortName=date&sortOrder=desc

1. [group](https://spns-alpha-el8.systran.net/statistics/group): https://spns-alpha-el8.systran.net/activity/group/65703bd5189489000d84dd69/details?date=2023-12&skip=0&limit=10&sortName=request&sortOrder=desc

## trs
https://trs.systran.net/periods/656bcd8ee136251241688219/usage/counted



donnée agrégat

page stat a restituer :  statut advance  user/group/profil  (agration par user/group/profil) 


3 pages différent  exist déja coté API
activity/aggregatedStats  dans lib



# fonctionnement

chaque traduction dans la translate box aliment la collection daily_chars
et aggrege la collection global

users stat lit dans global par période

## page profile
requette par période dans la table daily_char : correspon à la page profiles
https://spns10-alpha.systran.net/en/statistics/global

requette
https://spns10-alpha.systran.net/activity?startDate=1701593580000&endDate=1704358412447&groupBy=profiles&skip=0&limit=10&sortName=date&sortOrder=desc




## page user
https://spns10-alpha.systran.net/en/statistics/user

requette 
old https://localhost:3450/activity/user/654b98590e9e5000c7a3ec52/details?date=2024-1&skip=0&limit=10&sortName=request&sortOrder=desc
new https://localhost:3450/activity/user/659570d315a664000bca909c/details?date=2024-1&skip=0&limit=10&sortName=request&sortOrder=desc

https://localhost:3450/activity/user/654b98590e9e5000c7a3ec52/details?date=2024-1&skip=0&limit=10&sortName=request&sortOrder=desc

https://spns10-alpha.systran.net/activity/user/659570d315a664000bca909c/details?date=2024-1&skip=0&limit=10&sortName=request&sortOrder=desc

https://spns10-alpha.systran.net/activity/user/659570d315a664000bca909c/details?date=2024-1&skip=0&limit=10&sortName=request&sortOrder=desc


correspond à un access sur daily_char

userStat.json

## users-original
https://localhost:3450/activity/user/654b98590e9e5000c7a3ec52/details?date=2024-1&skip=0&limit=10&sortName=request&sortOrder=desc

https://localhost:3450/activity/user/654b98590e9e5000c7a3ec52/details?date=2024-1&skip=0&limit=10&sortName=request&sortOrder=desc
https://spns10-alpha.s/activity/user/659570d315a664000bca909c/details?date=2024-1&skip=0&limit=10&sortName=request&sortOrder=desc
 s10-alpha.systran.net/activity/user/659570d315a664000bca909c/details?date=2024-1&skip=0&limit=10&sortName=request&sortOrder=desc
https://localhost:3450/activity/user/654b98590e9e5000c7a3ec52/details?date=2024-1&skip=0&limit=10&sortName=request&sortOrder=desc

https://localhost:3450/activity/user/654b98590e9e5000c7a3ec52/details?date=2024-1&skip=0&limit=10&sortName=request&sortOrder=desc
https://localhost:3450/en/administration/statistics/node/activity/user/654b98590e9e5000c7a3ec52/details?date=2024-1&skip=0&limit=10&sortName=request&sortOrder=desc
## page groups 
https://spns10-alpha.systran.net/en/statistics/group

requette 
https://spns10-alpha.systran.net/activity/group/659570d415a664000bca90ac/details?date=2023-12&skip=0&limit=10&sortName=request&sortOrder=desc

# user list 
	https://spns10-alpha.systran.net/admin/users/light?eleFilters[name]=&limit=50

  # create user for test 

  U1@systran.fr : groupe user (defautl)
  U2@systran.fr : groupe user (defautl)
  U3@systran.fr : groupe user (defautl)
  A1@systran.fr : groupe admin
  A2@systran.fr : groupe admin
   
  TB1@systran.fr : groupe Team Bravo 
  TB2@systran.fr : groupe Team Bravo 
  TB3@systran.fr : groupe Team Bravo 
   


   https://localhost:3450/     activity?startDate=1704631610451&endDate=1704718010451&groupBy=profiles&skip=0&limit=10&sortName=date&sortOrder=desc
   https://localhost:3450/node/activity?startDate=1704621927742&endDate=1704708327742&groupBy=profiles&skip=0&limit=10&sortName=date&sortOrder=desc

   # user view 
   https://spns-alpha-el8.systran.net/activity/user/659d832714bc9e000da91571/details?date=2023-12&skip=0&limit=10&sortName=request&sortOrder=desc


   # agregate by profile 
selectbox dans la toolbar agregate by  (list de valeur ? )
   profile name
   user (list of)
   groupe (list of)
   language pair (list of)
   user agent (list of)
   mime-time (list of)
   charaters 


   question total char ?  de la période ou de toute la base
   total user : user disticnt ou user doublone par profile name etc : periode ou base

   date debut / date de fin ok 
requette sur spns alpha

   https://spns10-alpha.systran.net/activity?startDate=1701618300000&endDate=1704987920921&groupBy=profiles&skip=0&limit=10&sortName=date&sortOrder=desc


# agregate by user/ profile => api à réécrire
display option 1 
1 requette pour la liste des user
une requette pour les profiles par userUnique
1 requette pour date range


display option 2  : quelle est la différence avec l'option 1
display option 3  : récupere le id détaillé du user




# agregat by users

selectbox dans la toolbar agregate by  (list de valeur ? ) reponse : user , group, profile, mime-time, user agent, langague pair


  user name 
  group name (list of)
   language pair (list of)
   profile name
   user agent (list of)
   mime-time (list of)
   charaters 
 total char = par liste de donne
 de toute la requette.
 répoonse : 
une ligne par user


# agregate by group / by profile

interactif ? 
list des widgets interactif sur la toolbar


poitn avec Izzy 


Display Opiton 
second agreagation = tous les autres colone
quand on choisit une colone de second a
réponse : 
enlever la colonne user ?  un user appartient à plusieurs group
filter containt ; 
colone sans filter possible à voir par Izzy


liste des button sur la toolbar 
d'abbord , date picker, puis 1er agregate, puis 2ime agregat
# global = profile
