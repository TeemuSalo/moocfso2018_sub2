import React from 'react';

class AddPerson extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            newName: '',
            newNumber: '',
            canSubmit: true,
        }
    }

    handleNameChange = (e) => {

        const newName = e.target.value.toLowerCase()
        let canSubmit = true

        // Disable submit button if name already exists in state
        this.props.persons.forEach(({ name }) => {
            if (newName === name.toLowerCase()) {
                canSubmit = false
            }
        })

        this.setState({ newName, canSubmit })
    }

    handleNumberChange = (e) => {

        const newNumber = e.target.value

        this.setState({ newNumber })
    }

    handleSubmitHere = (e) => {
        e.preventDefault()

        // Don't send empty names
        if (this.state.newName !== '') {

            const sendMsg = { name: this.state.newName, number: this.state.newNumber }

            this.props.handlePersonSubmit(sendMsg)

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
                        <button disabled={!this.state.canSubmit} type="submit">lisää</button>
                    </div>
                </form>
            </div>
        )
    }
}

export default AddPerson