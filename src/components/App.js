import React, { Component } from "react";
import axios from 'axios'
import './style.css'



const token = process.env.FATTMERCHANT_TOKEN

class App extends Component {

    state = {
        catalogItems: [],
        memo: '',
        total: 0,
        pickedItems: [{
            itemName: '',
            itemPrice: 0,
            quantity: 0
        }]
    }

    //headers
    getHeaders = () => {
        return {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
            Accept: "application/json"
        };
    }

    //make get request to api to obtain item data 
    getItems = () => {
        axios({
            url: 'https://apidemo.fattlabs.com/item',
            method: "GET",
            headers: this.getHeaders()

        }).then(result => {
            console.log(result.data.data)
            const res = result.data.data

            const list = res.map((item) => {
                return (
                    <ul key={item.id}>
                        <li>{item.item}</li>
                        <li>{item.price}</li>
                        <li><button
                            type="button"
                            className='btn btn-danger text-light'
                            onClick={() => this.selectItem(item.item, item.price)}>
                            Select {item.item}
                        </button>
                        </li>
                    </ul>
                )
            })
            this.setState({ catalogItems: list })


        }


        );
    }
    //save invoice 
    saveInvoice = () => {

        axios({
            url: 'https://apiprod.fattlabs.com/invoice',
            method: 'POST',
            data: {
                memo: this.state.memo,
                total: this.state.total,
                item: this.state.pickedItems.itemName,
                quanitity: this.state.pickedItems.quanitity
            },
            headers: this.getHeaders(),
            transformRequest: [(data) => {
                return data
            }]

        }).then(response => {
            console.log("Success", response)
            alert('Invoice Created')

        }).catch(error => {
            console.log(error.response)
        });
    }

    selectItem = (item, price) => {
        console.log(item, price)

        this.setState({
            pickedItems: {
                itemName: this.state.pickedItems.itemName + item,
                itemPrice: price,
                quanitity: this.state.quanitity + 1
            },
            total: this.state.total + price
        })
    }


    onInputChange = event => {
        this.setState({ memo: event.target.value });
    }





    render() {
        console.log(this.state.pickedItems, this.state.memo)
        const { catalogItems } = this.state
        return (
            <div className="App">
                <nav className="navbar navbar-light bg-light mb-5 mx-auto">
                    <h1 className="text-dark mx-auto">Invoice</h1>
                </nav>
              
                <div>
                    <h2>Choose Items:</h2>

                    <button onClick={this.getItems} className='btn btn-success'>Search Items</button>
                    <h1>{catalogItems}</h1>

                </div>

                <div>
                    <h2>Enter Memo:</h2>
                    <input type='text' value={this.state.memo} onChange={this.onInputChange} className='memo'></input>

                </div>
                <div className="jumbotron text-dark mt-5">
                    <h2>Your Selected Items:</h2>
                    <p>  {this.state.pickedItems.itemName}</p>
                </div>

                <div className='card text-dark mb-5'>
                    <h2>Total: $ {this.state.total}</h2>
                </div>


                <div>
                    <button className='btn btn-success' onClick={this.saveInvoice}>Save Invoice</button>
       
                </div>

            </div>
        );
    }
}

export default App 