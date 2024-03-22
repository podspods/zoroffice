
# nanostore
 
1. [link to github doc](https://github.com/nanostores/nanostores)

1. install nanostore 

    ```sh
    npm i nanostores @nanostores/react
    ```


# Approach

1. [Component zoning](#component-zoning)
1. [page wire-frame](https://www.figma.com/file/poB5H5nQGlV1QiSBnaUGAC/Notifications?type=design&t=u59QEtwXtrZjR6Wm-6)  with react-schema  (state-> action -> effect->UI) 
1. coding for each part 
1. insert styles and theme


# Nanostore in a nuttshell
store : containts informations

1. Event triggers action
1. Action changes the information in store 
1. Store pushes changes to UI

# Component zoning
 for notifications page :  [see figma](https://www.figma.com/file/poB5H5nQGlV1QiSBnaUGAC/Notifications?type=design&node-id=5-105&mode=design&t=XeYXydSFCCq5DLJc-0)

 ![page-zoning](./doc/images/page-zoning.png)


 # page wire-frame
 ## schema

  [schema here]()https://www.figma.com/file/poB5H5nQGlV1QiSBnaUGAC/Notifications?type=design&node-id=0-1&mode=design&t=XeYXydSFCCq5DLJc-0

  ![react-schema](./doc/images/React-schema.png)


## coding 

1. actions
    - onRefresh  => setRefresh
    - onAutoRefresh => setRefresh
    - onMarkAsRead => setRead
    - OnMarkAsUnread => setUnread
    - OnToogleCHeckAll => setAllRead
    - OnSearch
    - OnCheckId
    - OnToogleSetRead  -> should be =onSetRead
    - onSelectpagination
    - onSortInsertedAt
1. states

    - isAllChecked 
    - isChecked
    - notificationLevel
    - notificationLevel (rowColor)
    - readStatus
    - message
    - messageMoment


<<<<<<< Updated upstream
=======



1. path to api 
original
```js
  app.get('/notifications/list', csrfCheckOtherMethods, auth(actions.NOTIF), checkAjaxRequestHeader, notifications.list);
  app.get('/notification/level', coversSes, auth(actions.NOTIF), checkAjaxRequestHeader, notifications.getLevels);
  app.get('/notification/:id', csrfCheckOtherMethods, auth(actions.NOTIF), checkAjaxRequestHeader, notifications.get);
  app.post('/notification/read/:id', auth(actions.NOTIF), checkAjaxRequestHeader, notifications.read);
  app.post('/notification/unread/:id', auth(actions.NOTIF), checkAjaxRequestHeader, notifications.unread);
  app.post('/notification/pushed/:id', auth(actions.NOTIF), checkAjaxRequestHeader, notifications.pushNotification);
  // app.get('/notification/count/unread', csrfCheckOtherMethods, auth(actions.NOTIF), checkAjaxRequestHeader, notifications.countUnread);

```
modifié 
```js
  app.get('/notifications/list', auth(actions.NOTIF), notifications.list);
  app.get('/notification/level', coversSes, auth(actions.NOTIF), notifications.getLevels);
  app.get('/notification/:id', csrfCheckOtherMethods, auth(actions.NOTIF), notifications.get);
  app.post('/notification/read/:id', auth(actions.NOTIF), notifications.read);
  app.post('/notification/unread/:id', auth(actions.NOTIF), notifications.unread);
  app.post('/notification/pushed/:id', auth(actions.NOTIF), notifications.pushNotification);
```



1. add json-server

```sh
npx json-server -w data/db.json -p 3500
```
>>>>>>> Stashed changes
