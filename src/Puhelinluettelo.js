import React from 'react'
import axios from 'axios'

// Components for exercises 2.6 - 2.10
import Filter from './Filter'
import AddPerson from './AddPerson';

// Components for exercises 2.14 - 2.19
import AddPersonREST from './AddPersonREST'
import personService from './services/persons'
import Notify from './betterMessages'
import './index.css'

export default class Puhelinluettelo extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            persons: [],
            newName: '',
            newNumber: '',
            canSubmit: true,
            filter: '',

            messageType: null,
            message: null,
        }
    }

    // Get persons from json server
    componentDidMount() {
        personService.getAll().then((data) => {
            this.setState({ persons: data })
        })
            .catch((err) => {
                console.log(err)
                this.setState({
                    messageType: 'error',
                    message: 'WRONG'
                })
            })
    }

    componentDidUpdate() {
        // Flash green background and text "OK" on successfull calls
        // Red background and text "WRONG" on errors 
        if (this.state.message) {
            setTimeout(() => {
                this.setState({ messageType: null, message: null })
            }, 1000)
        }
    }

    // Handler for exercises 2.6 - 2.10, AddPerson.js component
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

    // Handler for exercises 2.14 - 2.19, AddPersonREST.js component
    handleAddPerson = ({ name, number, replace, recreate }) => {

        const person = { name, number }

        if (replace) {
            // Name already exists, ask to replace number
            if (window.confirm(`Korvataanko ${name} henkilön numero?`)) {

                personService.update(replace, person)
                    .then((response) => {
                        const persons = this.state.persons.map((currPerson) => {
                            if (currPerson.id === replace) {
                                currPerson.number = person.number
                            }
                            return currPerson
                        })
                        this.setState({
                            persons,
                            messageType: 'success',
                            message: 'OK'
                        })
                    })
                    .catch((error) => {
                        console.log(error)
                        console.log('Trying to add person')
                        person.recreate = true;
                        // Recursion, sweet
                        this.handleAddPerson(person)
                    })
            }
        } else {
            // Name did not exist, add person
            personService.create(person)
                .then((response) => {

                    let persons = []

                    if (recreate) {
                        // PUT has failed, try to recreate person
                        persons = this.state.persons.map((currPerson) => {
                            if (currPerson.name === person.name) {
                                currPerson.number = person.number
                            }
                            return currPerson
                        })

                    } else {
                        // Normal creation of person (that's what god said)
                        persons = this.state.persons.concat(response.data)
                    }

                    this.setState({
                        persons,
                        messageType: 'success',
                        message: 'OK'
                    })
                })
                .catch((error) => {
                    console.log(error)
                    this.setState({
                        messageType: 'error',
                        message: 'WRONG'
                    })
                })
        }
    }

    handleDeletePerson = (delID) => () => {

        if (window.confirm("Haluatko poistaa henkilön?")) {
            personService.del(delID).then((response) => {

                const persons = this.state.persons.filter(({ id }) => {
                    return delID === id ? false : true
                })

                this.setState({
                    persons: persons,
                    messageType: 'success',
                    message: 'OK'
                })
            })
                .catch((err) => {
                    console.log(err)
                    this.setState({
                        messageType: 'error',
                        message: 'WRONG'
                    })
                })
        }
    }

    handleNameFilter = (e) => {

        const filter = e.target.value
        this.setState({ filter })
    }

    render() {

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
            .map(({ name, number, id }, i) => {

                return (
                    <tr key={"person-" + [i]} >
                        <td>{name}</td><td>{number}</td>
                        <td><button className="del" onClick={this.handleDeletePerson(id)}>poista</button></td>
                    </tr>
                )
            })

        return (
            <div>
                <h2>Puhelinluettelo</h2>

                <Filter handleNameFilter={this.handleNameFilter} filter={this.state.filter} />

                {/* Component for exercises 2.6 - 2.10 */}
                {/* <AddPerson handlePersonSubmit={this.handlePersonSubmit} persons={this.state.persons} /> */}

                {/* Component for exercises 2.14 - 2.19 */}
                <AddPersonREST handleAddPerson={this.handleAddPerson} persons={this.state.persons} />

                <h3>Numerot</h3>
                <table>
                    <tbody>
                        {showPersons}
                    </tbody>
                </table>

                {/* Success and error message flash. Uses CSS transition to fade entire background */}
                <Notify type={this.state.messageType} message={this.state.message} />
            </div>
        )
    }
}
