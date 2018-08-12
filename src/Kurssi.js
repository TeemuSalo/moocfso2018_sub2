import React from 'react';


const Kurssi = ({kurssi}) => {
  return (
    <div>
      <Otsikko otsikko={kurssi.nimi}/>
      <Sisalto osat={kurssi.osat}/>
    </div>
  )
}

const Otsikko = ({otsikko}) => {
  return (
    <h1>{otsikko}</h1>
  )
}

const Sisalto = ({osat}) => {

  const yht = osat.reduce((acc, curr) => acc + curr.tehtavia, 0)

  return(
    <ul style={{paddingLeft: '20px'}}>
      {osat.map((osa) => {
        return <Osa key={osa.id} nimi={osa.nimi} teht={osa.tehtavia}/>
      })}
      <Yhteensa yht={yht}/>
    </ul>
  )
}

const Osa = ({nimi, teht}) => {
  return (
    <li style={{listStyle: 'none'}}>{nimi} {teht}</li>
  )
}

const Yhteensa = ({yht}) => {
  return <li style={{listStyle: 'none'}}> Yhteensä {yht} tehtävää</li>
}

export default Kurssi;
