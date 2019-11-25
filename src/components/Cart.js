import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { removeItem,addQuantity,subtractQuantity,changeQuantity} from './actions/cartActions'
import Recipe from './Recipe';
import placeholder from '../img/150.png';
class Cart extends Component{

    //to remove the item completely
    handleRemove = (id)=>{
        this.props.removeItem(id);
    }
    //to add the quantity
    handleAddQuantity = (id)=>{
        this.props.addQuantity(id);
    }
    //to substruct from the quantity
    handleSubtractQuantity = (id)=>{
        this.props.subtractQuantity(id);
    }

    changeQuantity(e) {
        if(!isNaN(e.target.value)){
            let id = e.target.id;
            let quantity = e.target.value
             e.target.value = quantity;
            if(quantity>0){
                this.props.changeQuantity(id,quantity); 
            }
        }
        
    }

    getImage = (variable) => {
        var image = new Image();
        var url_image = variable
        image.src = url_image;
        if (image.width === 0) {
           return placeholder;
        } else {
           return variable;
        } 
    }    

    render(){
        let itemTotal = 0;
        this.props.items.map(item => {
            itemTotal += item.quantity;
        })
       return(
            <section className="view-product">
                <div className="container">
                    <div className="itemheader">
                        <div className="item left-item">
                            <Link to="/"> &lt; </Link> order Summary 
                        </div>
                    </div>
                    <div className="itemBody">
                        <div className="productCartArea">
                            <div className="cartHead">
                                <div className="cartHeadCell">
                                    Items({itemTotal})
                                </div>
                                <div className="cartHeadCell">
                                    Quantity
                                </div>
                                <div className="cartHeadCell">
                                    Price
                                </div>
                            </div>
                            <div className="cart">
                            { 
                                this.props.items.map(item=> {
                                   // console.log(item.quantity)
                                   // allProductCount += item.quantity      
                                    return (
                                        <div className="cartBody" key={item.id}>
                                            <div className="cartBodyCell productName">
                                                <img className="pImg" width="30" src={this.getImage(item.img_url)} alt={item.name} /> 
                                                <span>{item.name+' - '+item.id} </span>
                                                <span className="removeProduct" style={{'float':'right'}} onClick={()=>{this.handleRemove(item.id)}} >X</span>
                                            </div>
                                            <div className="cartBodyCell">
                                            <span className="removeProduct" onClick={()=>{this.handleSubtractQuantity(item.id)}}>
                                            -</span>
                                            <input 
                                                className="pQty" 
                                                type="text" 
                                                value={item.quantity} 
                                                onChange={this.changeQuantity.bind(this) }  id={item.id} />

                                            <span className="removeProduct" onClick={()=>{this.handleAddQuantity(item.id)}}>+</span>
                                            </div>
                                            <div className="cartBodyCell">
                                                ${item.price*item.quantity }
                                            </div>
                                        </div>  
                                    )

                                }
                                )
                            }





                            </div>
                        </div>
                        <div className="billArea">
                            <Recipe />
                        </div>
                    </div>
                    </div>
                </section>


            )
    }
}


const mapStateToProps = (state)=>{
    return{
        items: state.addedItems,
        total: state.total
    }
}
const mapDispatchToProps = (dispatch)=>{
    return{
        removeItem: (id)=>{dispatch(removeItem(id))},
        addQuantity: (id)=>{dispatch(addQuantity(id))},
        subtractQuantity: (id)=>{dispatch(subtractQuantity(id))},
        changeQuantity : (id,quantity) =>{dispatch(changeQuantity(id,quantity))}
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(Cart)