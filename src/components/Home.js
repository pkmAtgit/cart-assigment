import React, { Component } from 'react';
import { connect } from 'react-redux'
import { addToCart } from './actions/cartActions'
import { Link } from 'react-router-dom'
import placeholder from '../img/150.png';

 class Home extends Component{

    state = {
        displayText: null,
        countCart:0,
    }    

    handleClick = (id,name)=>{
        let count = this.state.countCart
        this.setState({
            countCart: count+1,
            displayText: name+' is added to cart'
        })
        this.props.addToCart(id); 
    }

    displayMassege = (displayText) => {
        if(displayText){
            return(
                <span className="massegeBox">
                    {displayText}
                </span>
            )
        }
    }

    getImage(variable){
        var image = new Image();
        var url_image = variable
        image.src = url_image;
        if (image.width === 0) {
           return placeholder;
        } else {
           return variable;
        } 
    }    

    getDiscountedPrice(price,discount){
        let dicountPercent = price*discount/100;
        let discountPrice = price-dicountPercent
        return '$'+discountPrice;
    }

    componentDidMount(){
        let itemTotal = 0;
        this.props.items.map(item=>{
            if(item.quantity){
            itemTotal += item.quantity;
            }
        })
        this.setState({
            countCart:itemTotal
        })

    }

    getTotalItemsCounts(){
        let itemTotal = 0;
        this.props.items.map(item=>{
            if(item.quantity){
              itemTotal += item.quantity;
            }
        })
        return itemTotal
    }

    render(){
        let itemTotal = 0;
        this.props.addedItems.map(item => {
            itemTotal += item.quantity;
        })        
        let itemList = this.props.items.map(item=>{
            return(                           
            <li className="product" key={item.id}>
                <div className="thumbHolder">
                    <img src={this.getImage(item.img_url)} alt={item.name} />
                </div>
                <div className="productInfo">
                    <p className="productTitle">{item.name}</p>
                    <span className={`price cell ${(item.discount>0) ? "discount" : ""}`}>
                        {'$'+item.price}
                    </span>

                    <span className="price cell cell2">
                        {
                            (item.discount>0) ? this.getDiscountedPrice(item.price, item.discount) : ""
                        }
                    </span>

                    <button className="addToCartBtn cell" 
                    onClick={()=>{this.handleClick(item.id, item.name)}}
                    >Add to cart</button>
                </div>
            </li>
            )
        })

        return(
            <section className="view-product">
            <div className="container">
                <div className="itemheader">
                    <div className="item left-item">
                        All Items
                    </div>
                    <div className="item center-item">
                    {this.displayMassege(this.state.displayText)}

                    </div>
                    <div className="item right-item gotoCart">
                    <Link to="/cart">Go to cart <span>{itemTotal}</span></Link>
                        
                    </div>
                </div>
                <div className="itemBody">
                    <ul className="productList">
                    {itemList}
                    </ul>
                     </div>
                 </div>
             </section>
        )
    }
}
const mapStateToProps = (state)=>{
    return {
        addedItems: state.addedItems,
      items: state.items,
      total: state.total
    }
  }
const mapDispatchToProps= (dispatch)=>{
    
    return{
        addToCart: (id)=>{dispatch(addToCart(id))}
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Home)