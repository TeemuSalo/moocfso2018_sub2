import React from 'react'
import ReactDOM from 'react-dom'
import axios from 'axios'

// Components for exercises 2.1 - 2.5
import Kurssi from './Kurssi'
import App from './App'

// Components for exercise 2.6 - 2.10
import Filter from './Filter'
import AddPerson from './AddPerson';

class Puhelinluettelo extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      persons: [],
      newName: '',
      newNumber: '',
      canSubmit: true,
      filter: '',
    }
  }

  componentDidMount() {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        this.setState({ persons: response.data })
      })
  }

  // Get values from child component arguments
  handlePersonSubmit = ({ name, number }) => {

    let newPerson = { name, number }
    const persons = this.state.persons.concat(newPerson)
    const newName = ''
    const newNumber = ''

    // Use same names in variables and properties so we can go full ES6
    this.setState({
      newName,
      newNumber,
      persons,
    })
  }

  handleNameFilter = (e) => {

    const filter = e.target.value

    this.setState({ filter })
  }

  render() {

    const smallpad = { padding: "3px" }

    // Chained filter to map, noice
    const showPersons = this.state.persons
      .filter(({ name }) => {

        // Make sure to be caseinsensitive
        name = name.toLowerCase()
        const filter = this.state.filter.toLowerCase()

        // Name must include filter value or filter is empty
        if (name.indexOf(filter) !== -1 || filter === '') {
          return true
        } else {
          return false
        }
      })
      .map(({ name, number }, i) => {

        return (
          <tr key={"person-" + [i]} ><td style={smallpad}>{name}</td><td style={smallpad}>{number}</td></tr>
        )
      })

    const medpad = { padding: "5px" }

    return (
      <div>
        <h2>Puhelinluettelo</h2>

        <Filter handleNameFilter={this.handleNameFilter} filter={this.state.filter} />

        <AddPerson handlePersonSubmit={this.handlePersonSubmit} persons={this.state.persons} />

        <h3>Numerot</h3>
        <table>
          <tbody>
            {showPersons}
          </tbody>
        </table>
      </div>
    )
  }
}

ReactDOM.render(
  <Puhelinluettelo />, document.getElementById('root')
)