import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { UserContext, baseURL } from '../App';
import '../searchUser.css';
const SearchUser = () => {
    const [data, setData] = useState(null)
    const [name, setName] = useState(null)
    const { state, value1, dispatched1 } = useContext(UserContext);
    useEffect(() => {
        if (name) {
            fetch(baseURL + '/search', {
                method: "put",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + localStorage.getItem("jwt")
                },
                body: JSON.stringify({ query: name })
            }).then(res => res.json())
                .then(users => {
                    setData(users.user)
                    console.log("check search data",data)

                })
        }

    }, [name])
    const getName = (name) => {
        console.log(name)
        if (name === '') {
            setData(null)
        }
        setName(name)


    }
    return (
        <div >
            <div className='card searchUser' style={{ display: value1 ? "block" : "none" }} >
                <div className='card-title topbar' style={{ textAlign: "left", display: value1 ? "block" : "none" }}>
                    <h4>Search</h4>
                </div>
                <nav className='nav-wrapper'>
                    <div className="container-fluid" >
                        <i className="material-icons" for = "search" style={{ float: "left"}}>search</i>
                        <input type="search" id="search"  placeholder="search" onChange={(e) => { getName(e.target.value) }} style={{ width:"90%", marginRight:"2%"}} />
                    </div>
                </nav>
                <div className='card-body'>
                    <div>
                        <h5 style={{ float: "left" }} class="sidenav-trigger show-on-large" data-target="slide-out">Recent</h5>
                        <Link style={{ float: "right" }} class="sidenav-trigger show-on-large">clear All</Link>
                    </div>
                    </div>
                <div>
                    {data ? data.map(item => {
                        console.log("data", data)
                        return (

                            <ul className='collection sidenav' id="slide-out" style={{marginTop:"20px"}} >
                                <Link to={"/userProfile/" + item._id} style={{ color: "black"}}>
                                    <li >
                                        {item.email}
                                    </li>
                                </Link>
                            </ul>
                        )
                    }) : <h6 style={{ textAlign: 'center', marginTop:"20%"}}> No recent search</h6>}
                </div>
                
            </div>

        </div>
    )
}
export default SearchUser;