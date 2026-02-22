import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";
import { useParams } from "react-router-dom";



export const ContactForm = () => {

    const { contactId } = useParams();
    const navigate = useNavigate();
    const { dispatch } = useGlobalReducer();


    useEffect(() => {

        if (contactId && state.contact) {

            const editContact = state.contact.find(contact => contact.id === parseInt(contactId));

            if (editContact) {
                setInput({

                    username: editContact.username,
                    address: editContact.address,
                    phone: editContact.phone,
                    email: editContact.email,



                });
            }

        }[contactId, state.contact]

    })


    const [input, setInput] = useState({ username: "", address: "", phone: "", email: "" })

    const addInput = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value })

    }

    const saveInput = () => {

        dispatch({
            type: 'addContact',
            payload: {

                username: input.username,
                address: input.address,
                phone: input.phone,
                email: input.email,

            }

        });

        navigate("/");

    }





    return (


        <div>
            <h1>Add new Contact</h1>

            <div >
                <label> Full Name
                    <input type="text" name="username" value={input.username} onChange={addInput} />

                </label>

                <label> Address
                    <input type="text" name="address" value={input.address} onChange={addInput} />

                </label>

                <label> Phone Number
                    <input type="number" name="phone" value={input.phone} onChange={addInput} />

                </label>

                <label> Email
                    <input type="email" name="email" value={input.email} onChange={addInput} />

                </label>




            </div>
            <button onClick={saveInput}

            >Save</button>
            <Link to="/">Get back to the contacts</Link>


        </div>



    );
};