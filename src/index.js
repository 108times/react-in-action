import React from "react";
import { render } from "react-dom";
import "./index.css";
// import App from "./AppWithoutJSX";
import App from './App'
const node = document.getElementById("root");

const data = {
  post: {
    id: 123,
    content: 'What we hope ever to do with ease, we must first learn to do with dilligence. - Samuel Johnson ',
    user: 'Mark Thomas'
  },
  comments: [
    {
      id: 0,
      user: 'David',
      content: 'such. win.'
    },
    {
      id: 1,
      user: 'Haley',
      content: 'Love it.'
    },
    {
      id: 2,
      user: 'Peter',
      content: 'Who was Samuel Johnson'
    },
    {
      id: 3,
      user: 'Mitchell',
      content: '@Peter do your homework'
    },
    {
      id: 4,
      user: 'Peter',
      content: '@mitchell ok :P'
    }
  ]
}



render(<App data={data} />, node);


