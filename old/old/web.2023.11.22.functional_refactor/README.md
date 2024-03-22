
# MIGRATION - The legacy notifications page 
# sommaire
ticket + link herre

# description 
Migration from React-16 /boostrap 3.14 to React-18/MUI  

## IMPORTANT : 
Please pay attention to these following points when doing your development
- the localization using i18n
- the accessibility (with tab and arrow keys)


1. Migrate the existing table to MUI-table.
    1. the title (static page) 
    1. the table + with actions buttons 
1. Handle search bar, filter, sort, pagination
1. Handle all existing actions to notifications
1. Plug page to the data on the server


## check points on MR:
1. Bootstrap => MUI migration, React-18 and Typescript
1. Support themes / style component
1. Support localisation (i18n)
1. Support accessibility
1. Responsive (minimal checks to ensure the website is still functional)

below : a screen-shoot before migration

## Requirement :
1. checkbox read  
    this check box toggle the notification status (read/unread). the result will be save on database
1. refresh
    This push button reload notification from database.
    need clarifications : what is the limit on the number of notifications to retrieve ?
    set interval refresh : to be clarify 

    clarifications required: what is the default? (my recommendation: disable)
1. push button ‘mark as read' : 
    This push button mark all checked notification as read. and save it in database
1. push button 'mark as unread :
    This push button mark all checked notification as unread. and save it in database
1. push button ‘mark all read’ :
    This push button mark all existing notification as read directly in database
1. Search bar 

    - Which fields are involved in finding it?  my suggestion: message fields only

    - Should the search be performed on the displayed data or on the entire database? (my suggestion: only the displayed data)
Filter and sort 

    - do the sorts and filters for the entire database or for the displayed data only ?
    my recommendation: for all data with a refresh of the data

1. Status Tags
  Status tags can be harmonised with the tags in our design library
 
1. Proposed design V4

1. Proposed new features 

    add a delete function: these functions allow the user to delete a notification

    add an auto-delete feature: this feature allows the system to purge notifications after a specified time (for example, 1 year)

# ticket
## ticket ST-3241 

https://systran.atlassian.net/browse/ST-3241

#### description: 
As a developer, I want to have every widget active (in the web page), so I can get any action validated
Widgets are: 

1. Toolbar with buttons : 
    1. Refresh button 
        - Push-button for immediate refresh
        - Select-box for scheduled refresh (5,10,30,60,120) second
    1. Mark as read
        - Push button for set notification selected  as read
          - This button is grayed out if no notification is selected

    1. Mark as unread
        - Push button to set notification selected  as unread
          - This button is grayed out if no notification is selected
    1. Mark all as read
        - Push button to set the whole dataset of notifications  as read
          - This button is grayed out if no notification is selected

1. on table header
    1. Checkbox in the first column for all rows,
    1. Select-box in the header of the second column
    1. Ellipsis menu in the last row 
        - Mark as read 
             - The action of this button affects only the current row
        - Mark as unread
             - The action of this button affects only the current row
    1. Sort ascendant and descendant on the following columns
        - level
        - read
        - inserted at
1. On table footer
    1. Row per pages (with predefined values : 5,10,25;50;100)
    1. Display number of notifications displayed of total  notifications
    1. Push-button to next page (grayed if not possible)
    1. Push-button to previous page (grayed if not possible)

## ticket ST-3242
https://systran.atlassian.net/browse/ST-3242
### Description
As a developer, I want to have following functionality:
1. Handle search bar, 
1. filter, 
1. sort, 
1. pagination , 
so I can get any action validated page behavior

### for search functionality 
see ticket  [ST-3566](https://systran.atlassian.net/browse/ST-3566)

### for sort functionality 
see ticket [ST-3567](https://systran.atlassian.net/browse/ST-3567) 

 
### filter

  1. filter should by apply on notification level (success, error, info).
1. filter should be for the whole dataset. starting on page 1 with page-size previously set
### Pagination 

1. pagination depends on page-size (list of predefined value, in this case 5,10,25,50,100) and page number.
  - note:  for each pagination change, we should request a new sub-dataset from the back-end.

## ticket ST-3357
https://systran.atlassian.net/browse/ST-3357
As the product owner, I want the action to change the status of read notification to be in the elipse menu

## ticket ST-3403
https://systran.atlassian.net/browse/ST-3403
Add links on notification according to the type of notification
Description

As the Product Owner, I want to have a hyperlink in the notification message for each type of information with the following rules, like this, that I can have optional information for each notification

Route for type of information
  profile: '/profilesManagement',
    tm: '/resourcesManagement/translationMemory/',
    tr: '/advancedConfiguration/translationResources/',
    node: '/advancedConfiguration/computingNode/',
    nodeView: '/advancedConfiguration/computingNode/view/',
    fileTranslation: '/translationTools/file/'
## ticket ST-3492
https://systran.atlassian.net/browse/ST-3492
as a developper, I want to have a list of all word used in this web-page, like that I can provide it for I18n features

## ticket ST-3496
https://systran.atlassian.net/browse/ST-3496

### Requirement : Rules for retrieving data (notifications list)

#### regular select
For this web page, we do not retrieve the whole notifications in database, we retrieve it page by page..
  1. Dataset of notification are retrieving by page (number of notification). the page size is defined in the web page and could be change by user ( possible step are 10,25,50,100)
  1. By default notifications  are sorted by ‘inserted date’  descendant 
  1. Sort should impact on the whole dataset existing in database (not only on displayed notification)
  1. Search should be for the whole dataset of notification

  note: notifications selected (checked) is not memorized in case of renew dataset (when sort or search for example)

 
#### select by status level (success, error, info).

When selecting this option, it should apply on the whole notifications list.
Data retrieved should overwrite all other current search.

## ticket ST-3559
https://systran.atlassian.net/browse/ST-3559
add select box, for filter notification level, on table header
we should re-use select-box component and implement it in table header

## ticket ST-3561
https://systran.atlassian.net/browse/ST-3561
As a developper, I want to have a list of all word used in the web page. like that I can provide this list in order to complete I18n translation list

## ticket ST-3564
https://systran.atlassian.net/browse/ST-3564
Description

As a product owner, i want to add a delay to start the search when the user enters the search text

like that we can save network activities by not sending a request for each character.
## ticket ST-3565
https://systran.atlassian.net/browse/ST-3565
Format notification message
Description

message to be displayed in notification web page should be formatted according to data retrieved.

example of data from back-end
```js
{
  "id": "6488959f18de370e30ebb15e",
  "insertedAt": "2023-06-13T16:13:19.306Z",
  "level": "error",
  "str": {
    "display": "File ${filename} successfully translated",
    "data": {
      "filename": {
        "type": "fileTranslation",
        "value": "7be078af-8542-44bb-89b9-01fb697dddaa",
        "label": "Organization_chart_SYSTRAN_SAS_2023-06-12.pdf"
      }
    },
    "v": 2
  },
  "read": true,
  "pushed": true
},
```

1. we should use str.display field, and replace tag (in this case ${filename} by their corresponding value is in this case str.data.filename.label.)

1. we should add a link (see ticket ST-3403 https://systran.atlassian.net/browse/ST-3403

1. if the tag name have a type (in this case str.data.filename.type) is in the list of tag with link as describe below. (in this case fileTranslation: '/translationTools/file/')

tag with link as described in /enterprise-server/lib/notification.js
```js
const urlMap = {
  profile: '/profilesManagement',
  tm: '/resourcesManagement/translationMemory/',
  tr: '/advancedConfiguration/translationResources/',
  node: '/advancedConfiguration/computingNode/',
  nodeView: '/advancedConfiguration/computingNode/view/',
  fileTranslation: '/translationTools/file/'
};
```

## ticket ST-3566
https://systran.atlassian.net/browse/ST-3566
Search one or seveal word in the notification (str)
Description

The search functionality must apply to the 'message' field and for all notifications.

The search returns  sorted message list ( sort by default is  ‘insert-at’,  descendant)

## ticket ST-3567
https://systran.atlassian.net/browse/ST-3567
sort funtionnalities

Description

Originally, only fields ‘inserted-at’ have sort functionality. we think it is a good to add also ‘read’ in sort.
notes: sort should be apply only on one column (insert-at or read).

Sort should apply on the whole dataset and return value according to page and page size.
## ticket ST-3577
https://systran.atlassian.net/browse/ST-3577
add toolbar

toolbar is described in ticket ST-3241
https://systran.atlassian.net/browse/ST-3241

we should create   create a component to satisfy these requirements


# draft note

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Important for V10.1:

- Remove the front proxy => only useful for iframes
- Remove the component IframeLoader => only useful for iframes
- remove the installation of @mui/material in package.json => only useful for the iframe loader
- remove the localization files from the backend => migrate them in the /locales folder in web


## Customizing the app

To change the default logo of the app (between SPNS and Translate) :

```
Change the file translate_server_logo.svg in the public repository
```

To add a custom logo for a client :

```
Leave the file translate_server_logo.svg in the public/images repository, it will be used as default logo if there is a problem
Add the new logo in svg format with the name custom_app_logo.svg in the public repository/images. This logo will be used instead of the default one, you need restart the server to apply the change.
```

To change the theme for a client :

```
Modify/create the json file  custom_theme.json in the public/theme repository, you can complete and add each property you need to change. It will apply to the theme instantly. If the theme didn't change, you maybe have change a property that which is not used. Try to restart the server.
```

## Adding the doc for the app

Add the doc folder containing the localized data in the public repository
