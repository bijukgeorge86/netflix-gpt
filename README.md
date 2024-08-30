# Netflix GPT

# Create React App

-> Run create React App command 'npx create-react-app netflix-gpt' - here 'netflix-gpt' is folder name.

# Configured Tailwind CSS

-> Go to tailwind css and select 'create-react-app' and run below commands
npm install -D tailwindcss
npx tailwindcss init
it will create a file named 'tailwind.config.js'
then modfy the file as site given
then add below in index.css

-   @tailwind base;
-   @tailwind components;
-   @tailwind utilities;
    then modify by adding tailwind classes and restart and check

# Features Needed to added are decided

# Creating Main Pages

# Setting Up Routing Pages

-> npm i -D react-router-dom

# Login Form

# Sign Up Form

# Formik library for React Validation (Not Used)

# useRef Hook

# Setup Firebase and then run below command in project

npm install firebase

Before using firebase login please install the below command
npm install -g firebase-tools

then after setting up in firebase we have to use command below
firebase login
firebase init

to deploy use command
firebase deploy

# Setup Redux store using Redux Toolkit

npm i -D @reduxjs/toolkit
npm i react-redux

When loading a store and we are accessing the store and if store is null we use return as below example and this is called early return
if (!movies) return;

# install openai npm library

npm install --save openai
