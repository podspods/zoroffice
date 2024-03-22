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