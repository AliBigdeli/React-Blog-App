<h1 align="center">React Resume Setup</h1>
<h3 align="center">A Guideline to create react resume</h3>
<p align="center">
<a href="https://www.python.org" target="_blank"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/python/python-original.svg" alt="python" width="40" height="40"/> </a>

</p>
    
# Guideline
- [Guideline](#guideline)
- [Setup Project](#setup-project)
  - [Install nodejs](#install-nodejs)
  - [Install Vite and Setup project](#install-vite-and-setup-project)
  - [Start the app](#start-the-app)
- [Project Layout](#project-layout)
  - [components](#components)
    - [simple components](#simple-components)
    - [api components](#api-components)
    - [hooks components](#hooks-components)
    - [validation components](#validation-components)
    - [messages components](#messages-components)
  - [Pages](#pages)
  - [Routes](#routes)

# Setup Project

## Install nodejs
in order to setup a project you need to have npm and node installed first:

1. go to nodejs.org and download the latest lts version
2. install it
3. make sure npm works correctly
4. update to latest npm with ```npm install -g npm@latest```


## Install Vite and Setup project
for installing and creating react app use vite, but in order to do that we will use yarn package manager
```
npm create vite
```
then it will start initiating installation, and will ask you the name of the project which i call it app.then i will choose javascript as the language for creating project. (choose based on your way of working)
```
Need to install the following packages:
  create-vite@4.3.0
Ok to proceed? (y) y
√ Project name: ... app
√ Select a framework: » React
√ Select a variant: » JavaScript

Scaffolding project in C:\Users\Ali\Documents\GitHub\React-Blog-App\app...

Done. Now run:

  cd app
  npm install
  npm run dev

```

## Start the app
in order to install the dependencies first go inside the project directory then use the command ```npm install``` for installing the packages. and in order to run the project in each mode use the following commands:
```
# installing packages
npm install

# running the project in dev mode
npm run dev

# for showing the page outside of local
npm run dev -- --host

# building for production
npm run build
```
after successful run you can see the page in the following address:

<http://localhost:5173/>

# Project Layout
for a react app project layout in general should be like this:

## components
each component that you are willing to create should be stored in ```src/components``` directory. each component may be coming with a **.jsx** and **.css** file.

### simple components
it is better to have each component in a separate folder with its belongings.consider having a component as sidebar:
```
src
  - components
    - sidebar
      - sidebar.jsx
      - sidebar.css

```

### api components
for outer connections and apis its good to have a separate component:

```
src
  - components
    ...
    - api
      - BaseUrl.jsx
      - AuthApi.js
      - EXAMPLE.js

```

### hooks components
connectors to elements of page which be listened and act as and actuators:

```
src
  - components
    ...
    - hooks
      - EXAMPLE.jsx
      

```

### validation components
validators for forms:

```
src
  - components
    ...
    - validation
      - EXAMPLE.jsx
      
```

### messages components
messages for forms:

```
src
  - components
    ...
    - messages
      - EXAMPLE.jsx
      
```

## Pages
every app needs to have multiple pages and general info and schema of it this is where you keep them, and stor in the ```src/pages``` directory.

## Routes
for switching between pages you need to have routes, so all the routes will be stored and define in this directory, which will be as ```src/routes```.
