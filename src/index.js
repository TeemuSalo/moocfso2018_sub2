import React from 'react'
import ReactDOM from 'react-dom'
import axios from 'axios'

// Components for exercises 2.1 - 2.5
import Kurssi from './Kurssi'
import App from './App'

// Components for exercise 2.6 - 2.10
// Components for exercises 2.14 - 2.19
import Puhelinluettelo from './Puhelinluettelo'

// Components for exercises 2.12 - 2.13
import Countries from './Countries'

ReactDOM.render(
  // Toggle commenting to view different exercises

  // component for exercises 2.1 - 2.5
  // <Kurssi />, document.getElementById('root')

  // component for exercises 2.6 - 2.10 and 2.14 - 2.19
  <Puhelinluettelo />, document.getElementById('root')

  // component for exercises 2.12 - 2.13
  // <Countries />, document.getElementById('root')
)