import React from 'react'
import './intropage.css'
import { Link }from 'react-router-dom'
import logo from '../../assets/GOALS ALLY LETTERS LOGO.png'
//import logoname from '../../assets/GOALS ALLY LOGO.png'

const Intropage = () => {
    return(
        <div>
            <img src={logo} alt='logo' />
            <h1>GoalsAlly</h1>
            <Link to="/signup">
            <button>SIGN-UP</button>
            </Link>
            <Link to="/signin">
            <button>SIGN-IN</button>
            </Link>
        </div>
    )
}
export default Intropage;