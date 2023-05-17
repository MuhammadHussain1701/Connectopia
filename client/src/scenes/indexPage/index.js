import { NavLink } from "react-router-dom"

function IndexPage(){
    return (
        <div>
            HOMEPAGE
            <NavLink to="/login">Login</NavLink>
        </div>
    )
}

export default IndexPage