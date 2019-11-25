import React, { Component } from 'react'
import { connect } from 'react-redux'
//import { addShipping } from './actions/cartActions'
class Recipe extends Component{

    render(){
       // console.log(this.props.items)
        let calculate = 0;
        let itemTotal = 0;
        let discountPrice = 0;
        this.props.addedItems.map(item => {
                calculate += (item.quantity*item.price);
                itemTotal += item.quantity;
                let price = parseInt(item.price);
                let discount = parseInt(item.discount);
                let dicountPercent = (price*discount)/100;
                discountPrice += (dicountPercent*parseInt(item.quantity));
        })
        return(
            <div>
                <ul className="collection">

                        <li className="collection-item">
                        <p><b>Total</b></p><br/>
                        <table width="100%" border="0">
                            <tbody>
                            <tr>
                                <td width="49.5%">Items({itemTotal})</td>
                                <td>:</td>
                                <td style={{'textAlign': 'right'}} width="49.5%">${calculate}</td>
                            </tr>
                            <tr>
                                <td colSpan="3">&nbsp;</td>
                            </tr>
                            <tr>
                                <td width="49.5%">Discount</td>
                                <td>:</td>
                                <td style={{'textAlign': 'right'}} width="49.5%">${discountPrice}</td>
                            </tr>
                            </tbody>
                        </table>
                        </li>

                    </ul>
                    <div className="checkout">
                    <table width="100%" border="0">
                        <tbody>
                            <tr>
                                <td width="49.5%">Order Total</td><td>:</td><td style={{'textAlign': 'right'}} width="49.5%">${calculate-discountPrice}</td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                 </div>
        )
    }
}

const mapStateToProps = (state)=>{
    return{
        addedItems: state.addedItems,
        total: state.total,
        items: state.items
    }
}

export default connect(mapStateToProps)(Recipe)
