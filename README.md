<h1 align="center">React Blog App</h1>
<h3 align="center">A Simple blog app as an exercise for base crud usage of react and jwt authentications with state manager and react query</h3>
<p align="center">
<a href="https://nodejs.org/en/" target="_blank"> <img src="https://seeklogo.com/images/N/nodejs-logo-FBE122E377-seeklogo.com.png" alt="nodejs" width="40" height="40"/> </a>
<a href="https://reactjs.org/" target="_blank"> <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/2300px-React-icon.svg.png" alt="react" width="40" height="35"/> </a>
<a href="https://tanstack.com/query/latest/" target="_blank"> <img src="https://img.stackshare.io/service/25599/default_c6db7125f2c663e452ba211df91b2ced3bb7f0ff.png" alt="react" width="40" height="35"/> </a>
<a href="https://redux.js.org/" target="_blank"> <img src="https://d33wubrfki0l68.cloudfront.net/45ed46a4aa7300c35494e9fc23ff4c1f61f62ab7/b7c39/static/redux_logo_2-24410881e63c96340db17ec232dfd1bf.png" alt="react" width="80" height="35"/> </a>

</p>
    
# Guideline
- [Guideline](#guideline)
- [Demo](#demo)
- [Setup Project](#setup-project)
  - [Install nodejs](#install-nodejs)
  - [Install Vite and Setup project](#install-vite-and-setup-project)
  - [Start the app](#start-the-app)
- [Project Layout](#project-layout)
  - [components-layout](#components-layout)
    - [simple components](#simple-components)
    - [api components](#api-components)
    - [hooks components](#hooks-components)
    - [validation components](#validation-components)
    - [messages components](#messages-components)
  - [Pages-layout](#pages-layout)
  - [Routes-layout](#routes-layout)
  - [Redux-layout](#redux-layout)
- [Redux](#redux)
- [React-Query](#react-query)


# Demo
<img loading="lazy" style="width:100%" src="./docs/demo.gif">

# Setup Project
keep that in mind that this project uses another repo as its backend which has been written with fastapi and python with basic authentication and blog app. which you can find it in the link bellow:

- <https://github.com/AliBigdeli/FastApi-Blog-Authentication-App>

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

## components-layout
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

## Pages-layout
every app needs to have multiple pages and general info and schema of it this is where you keep them, and stor in the ```src/pages``` directory.

## Routes-layout
for switching between pages you need to have routes, so all the routes will be stored and define in this directory, which will be as ```src/routes```.


## Redux-layout
```
src
  - redux
    - features
      - AuthSlice.jsx
    store.js
      
```


# Redux
Redux is a state management library for JavaScript applications that helps manage complex application states by providing a predictable and centralized way to manage state changes. Redux works by maintaining a single source of truth, called the store, which holds the state of the application. Components can interact with the store by dispatching actions, which are plain JavaScript objects that describe state changes. Redux then uses reducers, pure functions that take the current state and an action and return a new state, to update the store. Through this process, Redux makes it easy to manage and debug state changes across an application, making it a popular choice for building large-scale JavaScript applications.

in order to use redux in your project you need to install it first,so install the base component of redux for react, then install the toolkit:

```bash
npm install react-redux @reduxjs/toolkit
```

after installation is complete you need to create a ```store.js``` file in the redux directory which contains following scripts at the start, but eventually with each slice you create you need to add it to the list of reducers.
```jsx
import { configureStore } from "@reduxjs/toolkit";
import counterSlice from './features/counterSlice'
export const store = configureStore({
  reducer: {
    counter:counterSlice
  },
});
```

at this point you are going to need a provider for the application which will contain the app component inside of it, so open up the main.jsx and update the file like the provided example:

```jsx
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { store } from "./redux/store";
import { Provider } from "react-redux";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);

```

now for declaring any kind of slice just create a file inside ```redux/features/counterSlice.jsx``` and give it the following blueprint:

```jsx
// counterSlice.jsx


import { createSlice } from "@reduxjs/toolkit";

const counterSlice = createSlice({
  name: "counter",
  initialState: {
    value: 0,
  },
  reducers: {
    increment: (state) => {
     state.value +=1;
    },
    decrement: (state) => {
      state.value -=1;

    },
    assign: (state,action) => {
      state.value = action.payload.value
    },
  },
});

export const { increment, decrement,assign } = counterSlice.actions;

export default counterSlice.reducer;

```
almost done now in order to fetch the current value of counter you need to use the following code in components:

```jsx 
import { useSelector } from "react-redux";
const counter = useSelector((store) => store.counter.value);
```
and for using the reducers you cna use the following samples:

```jsx
import { useDispatch } from "react-redux";
import {increment,decrement,assign} from "../../redux/features/counterSlice";

const dispatch = useDispatch();


...
dispatch(increment()) // will add a number to the current value
dispatch(decrement()) // will minus one a number to the current value
dispatch(assign({
  value:2
})) // will assign value 2 to the counter

...
```

# React-Query
React Query is a popular JavaScript library for managing server state in React applications. It provides a simple and easy-to-use API for fetching, caching, and updating data from backend APIs. React Query is designed to simplify the process of managing server state in React applications, making it easier to build fast and responsive user interfaces.

in order to use react-query first of all you need to install it, you cna simply do it by using the provided command:

```bash
npm install @tanstack/react-query

# for react query dev tools install
npm install @tanstack/react-query-devtools
```

at this point you are going to need a provider for the application which will contain the app component inside of it, so open up the main.jsx and update the file like the provided example:

```jsx
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { QueryClient,QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}> 
      <App />
      <ReactQueryDevtools/>
    </QueryClientProvider>
  </React.StrictMode>
);

```

in order to do GET requests you would have to use ```useQuery``` with queryFn and queryKey, queryKey indicates what are you going to call this query as the name and what other additional paramaters you want to consider for this data. on the other hand queryFn is going to be the function you want to call based on the job. for example it can be an axios function to fetch data.
look at the example below to get the idea how to use it in a simple way.

```jsx
const BlogList = () => {
  const { isLoading, isError, data, error } = useQuery({
    queryKey: ['posts'],
    queryFn: fetchBlogList,
  })

  if (isLoading) {
    return <span>Loading...</span>
  }

  if (isError) {
    return <span>Error: {error.message}</span>
  }

  // We can assume by this point that `isSuccess === true`
  return (
    <ul>
      {data.map((post) => (
        <li key={post.id}>{post.title}</li>
      ))}
    </ul>
  )
}
```
for POST/PUT/PATCH requests your going to need ```useMutation``` this function will help you create a call to api and change 

```jsx

import { useMutation, useQueryClient } from '@tanstack/react-query'

const queryClient = useQueryClient()

// When this mutation succeeds, invalidate any queries with the `posts` or `reminders` query key
const mutation = useMutation({
  mutationFn: addPost,
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ['posts'] })
  },
})

//usage
<button onClick={() => {mutation.mutate()}}>

```
