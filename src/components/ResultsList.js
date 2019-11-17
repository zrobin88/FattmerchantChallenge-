import React from 'react'
import App from '../components/App'


const ResultsList = (props) => {
    return (
    <div>
        <h2>Choose Items:</h2>
  

    <button onClick={props.getItems}>Search Items</button>
    <div>
       {this.props.results.map(item=>{
            <ul key={item.id}></ul>
        })}
    </div>
    </div>
    )

}

export default ResultsList