👀 👀 👀 


# Snowy - Ski Weather App

**Our implementation is a weather mobile app for Iphone, for our primary stakeholders; skiers and snowborders. However it can be run on an Ipad as well, using the Ipad component. In the iphone component there is a index.js, where we have implemented the weather APIs from the websites for daily and hourly forecast, and style.less to style and design our app.

## Set-Up Guide
- [Installation](#installation)
- [Development Workflow](#development-workflow)
- [Technology Stack](#technology-stack)
- [Operation](#operation)
- [API References](#api-references)

**0. Before doing any of this, if you're using your own laptop/desktop, make sure you've got the latest versions of node and npm installed (npm v: 4.0.5 & node v: 7.4.0) :**

```sh
node -v
npm -v
```

## Installation

** Install the dependencies :**

```sh
npm install
```

## Development Workflow


** Start a live-reload development server :**

```sh
npm run dev
```

> This is a full web server for your project. Any time you make changes within the `src` directory, it will rebuild and even refresh your browser.


** Generate a production build in `./build` :**

```sh
npm run build
```

** Start local production server with [serve](https://github.com/zeit/serve):**

```sh
npm start
```

> This simply serves up the contents of `./build`. Bear in mind, if you use this, the localhost port your server is running on will refresh, and you'll also need to restart it to see any changes you've made to the code in `src`.

## Technology Stack

**1. index.js

**2. style.less


## Operation

**The main page will load the hourly forecast, with current temperature and three weather condition, susch as wind speed, visibility and precipitation. At the footer, there are two buttons. The first one, for snow condition. Once, it is clicked it displays the snow details, instead of the three weather condition. The button can be clicked again, so the initial weather conditions are displays again. The other button, displays the weekly instead of hourly, and on the click of button, the hourly is showed again.

## API References

**http://api.wunderground.com/api/key/conditions/q/"+country+"/"+city+".json;

**http://api.wunderground.com/api/key/hourly/q/"+country+"/"+city+".json;

**http://api.wunderground.com/api/key/forecast10day/q/"+country+"/"+city+".json;

**https://ipapi.co/json/

## Screenshots

!["HomePage"](http://i68.tinypic.com/2r4op6f.png)


