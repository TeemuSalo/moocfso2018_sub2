import React from 'react'
import ReactDOM from 'react-dom'
import axios from 'axios'


class Countries extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
        countries: [],
        countryValue: ''
    }
  }

  componentDidMount() {
    axios
        .get('https://restcountries.eu/rest/v2/all')
        .then(response => {
            this.setState({ countries: response.data })
        })
  }

  onCountryChange = (e) => {

        const newValue = e.target.value.toLowerCase()

        this.setState({countryValue: newValue })
  }

  handleClickCountry = ({name}) => () => {
        let newCountryValue = name.toLowerCase()
        this.setState({countryValue: newCountryValue})
  }

  render() {

    let showSomethingElse = ''
    let countriesShow = []

    if (this.state.countryValue === '') {

        showSomethingElse = <p>type something</p>

    } else {

        showSomethingElse = <p>Too many</p>

        let countriesFiltered= this.state.countries.filter(({name})=>{

            let nameLow = name.toLowerCase()

            if (nameLow.indexOf(this.state.countryValue) !== -1 ) {
                return true
            }

            return false
        })

        if(countriesFiltered.length === 1) {

            countriesShow = countriesFiltered.map((data, i)=>{
                return ( 
                    <div key={i}>
                        <h2>{data.name}</h2>
                        <p>Capital {data.capital}</p>
                        <p>Population {data.population}</p>
                        <img src={data.flag} width="160"/>
                    </div>
                )
            })
        }

        else if(countriesFiltered.length <= 10) {

            countriesShow = countriesFiltered.map(({name}, i) => {
                return (
                    <li key={i} style={{listStyle: 'none', cursor: 'pointer'}} onClick={this.handleClickCountry({name})}>{name}</li>
                )
            })
        }
    }

    return (
        <div>
            <h2>Get your countries!</h2>
            <label>Name of the country:</label>
            <input onChange={this.onCountryChange} value={this.state.countryValue}/>
            {countriesShow.length > 0 ? <ul style={{padding: '0px'}}> {countriesShow} </ul> : showSomethingElse}
        </div>
    )
  }
}

export default Countries