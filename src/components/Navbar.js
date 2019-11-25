import React from 'react';
import { Link } from 'react-router-dom'
 const Navbar = ()=>{
    return(
        <header>
        <div className="container">
                    <Link to="/" className="brand-logo">UI Asignment</Link>
                    
                    <ul className="right-item nav-ul">
                        <li><Link to="/">Shop</Link></li>
                        <li><Link to="/cart">My cart</Link></li>
                    </ul>
                </div>
            </header>
   
        
    )
}

export default Navbar;