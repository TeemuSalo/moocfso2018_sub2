import React from 'react';

class AddPersonREST extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            newName: '',
            newNumber: '',
        }
    }

    handleNameChange = (e) => {

        const newName = e.target.value
        this.setState({ newName })
    }

    handleNumberChange = (e) => {

        const newNumber = e.target.value
        this.setState({ newNumber })
    }

    handleSubmitHere = (e) => {
        e.preventDefault()

        // Don't send empty names
        if (this.state.newName !== '') {

            let replace = false

            // If name exists in state we send replace flag as true
            this.props.persons.forEach(({ name, id }) => {
                if (this.state.newName.toLowerCase() === name.toLowerCase()) {
                    replace = id
                }
            })

            const sendMsg = { 
                name: this.state.newName, 
                number: this.state.newNumber,
                replace: replace
            }

            this.props.handleAddPerson(sendMsg)

            this.setState({ newName: '', newNumber: '' })
        }
    }


    render() {

        const medpad = { padding: "5px" }

        return (
            <div>
                <h3>Lisää henkilö</h3>
                <form style={{ width: "250px" }} onSubmit={this.handleSubmitHere}>
                    <div>
                        nimi:<br /><input style={medpad} value={this.state.newName} onChange={this.handleNameChange} />
                    </div>
                    <div>
                        numero:<br /><input style={medpad} value={this.state.newNumber} onChange={this.handleNumberChange} />
                    </div>
                    <div style={{ padding: "10px 0px" }}>
                        <button className="add" type="submit">lisää</button>
                    </div>
                </form>
            </div>
        )
    }
}

export default AddPersonREST