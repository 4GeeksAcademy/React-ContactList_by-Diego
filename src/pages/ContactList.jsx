import React from "react";
import { Link, useNavigate } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";




export const ContactList = () => {

    const { state, dispatch } = useGlobalReducer();
    const navigate = useNavigate();






    return (

        <div className="ListContainer">

            <Link to="contact"> <button className="addContact">Add new contact</button></Link>

            {state.contact && state.contact.map((contact) => (

                <div className="Profile" key={contact.id}>

                    <img src="https://via.placeholder.com/50" alt="profile" />

                    <div>
                        <h3>{contact.name}</h3>
                        <div>
                            <i className="iconLocation fa-solid fa-location-dot"></i>
                            <span>{contact.address}</span>
                        </div>
                        <div>
                            <i className="iconPhone fa-solid fa-phone-flip"></i>
                            <span>{contact.phone}</span>
                        </div>

                        <div>
                            <i className="iconEmail fa-solid fa-envelope"></i>
                            <span>{contact.email}</span>
                        </div>

                    </div>



                    < div >
                        <button onClick={() => navigate(`edit/${contact.id}`)}>Edit</button>
                        <button onClick={() => dispatch({ type: 'deleteContact', payload: contact.id })}>Delete</button>
                    </div >
                </div>
            )
            )
            }




        </div >

    )

}