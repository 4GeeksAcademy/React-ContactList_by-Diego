import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";




export const ContactList = () => {

    const { state, dispatch } = useGlobalReducer();
    const navigate = useNavigate();

    const [showModal, setShowModal] = useState(false);
    const [contactDelete, setContactDelete] = useState(null)

    const askDelete = (id) => {
        setContactDelete(id);
        setShowModal(true)

    }

    const confirmDelete = () => {
        dispatch({ type: 'deleteContact', payload: contactDelete })
        setShowModal(false);
        setContactDelete(null)
    }


    return (

        <div className="ListContainer">

            <Link to="contact"> <button className="addContact">Add new contact</button></Link>

            {state.contact && state.contact.map((contact) => (

                <div className="Profile" key={contact.id}>

                    <img
                        src={`https://randomuser.me/api/portraits/${contact.sex === 'woman' ? 'women' : 'men'}/${contact.id % 99}.jpg`}
                        alt="profile"
                        style={{ borderRadius: "50%", width: "50px" }}
                    />

                    <div>
                        <h3>{contact.username}</h3>

                        <div>
                            <i className="fa-solid fa-venus-mars"></i>
                            <span>{contact.sex}</span>
                        </div>

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
                        <button onClick={() => askDelete(contact.id)}>Delete</button>
                    </div >
                </div>
            )
            )
            }


            {showModal && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <h2>¿Estás seguro?</h2>
                        <p>Si eliminas este contacto, no podrás recuperarlo.</p>
                        <div className="modal-actions">
                            <button onClick={() => setShowModal(false)}>No</button>
                            <button className="confirm-btn" onClick={confirmDelete}>Yes, please!</button>
                        </div>
                    </div>
                </div>
            )}

        </div >

    )

}