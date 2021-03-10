import React from "react"
import {Link} from "react-router-dom"

function NavBar() {

    return(
        <nav>
            <ul>
                <li><Link to="/public">Public</Link></li>
                <li><Link to="/profile">Profile</Link></li>
            </ul>
        </nav>
    )
}
export default NavBar