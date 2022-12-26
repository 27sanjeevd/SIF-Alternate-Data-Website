import React from "react";
import {Link} from "react-router-dom";

function Navbar() {
    return (
        <>
            <ul>
                <li><Link to="/"> Home </Link></li>
                <li><Link to="/sanjeev"> Sanjeev </Link></li>
                <li><Link to="/ana"> Ana </Link></li>
                <li><Link to="/apurva"> Apurva </Link></li>
                <li><Link to="/anirudh"> Anirudh </Link></li>
                <li><Link to="/richard"> Richard </Link></li>
            </ul>
        </>
    );
}

export default Navbar;