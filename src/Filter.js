import React from 'react';

class Filter extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            filter: props.filter
        }
    }


    render() {

        const medpad = { padding: "5px" }

        return (
            <div>
                <h3>Suodata henkilöitä</h3>
                <form style={{ width: "250px" }}>
                    <div>
                        nimi sisältää:<br />
                        <input style={medpad} value={this.props.filter} onChange={this.props.handleNameFilter} />
                    </div>
                </form>
            </div>
        )
    }
}

export default Filter