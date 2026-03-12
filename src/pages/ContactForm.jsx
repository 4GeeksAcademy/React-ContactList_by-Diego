import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";

export const ContactForm = () => {
    const { contactId } = useParams();
    const navigate = useNavigate();
    const { state, dispatch } = useGlobalReducer();


    const [input, setInput] = useState({
        username: "",
        address: "",
        phone: "",
        email: "",
        sex: "man"
    });

    useEffect(() => {
        if (contactId && state.contact) {
            const editContact = state.contact.find(c => c.id === parseInt(contactId));
            if (editContact) {
                setInput({
                    username: editContact.username,
                    address: editContact.address,
                    phone: editContact.phone,
                    email: editContact.email,
                    sex: editContact.sex || "man",
                });
            }
        }
    }, [contactId, state.contact]);

    const addInput = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });

        const requestOptions =
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },

        };


        fetch(`${BASE_URL}/agendas`, requestOptions)
            .then((response) => response.json())
            .then((result) => { console.log("Contacto creado: ", result); return getContacts(); })
            .catch((error) => console.error("Error al crear: ", error));
    };



};

const getContacts=async()=>{
const requestOptions = {
            method: "GET",

        };


        fetch(`${BASE_URL}/agendas`, requestOptions)
            .then((response) => {
                if (response.status === 404) {
                    createUser();
                    throw new Error("Usuario no existe, creando...");
                }
                return response.json();
            })
            .then((result) => { console.log("Tareas cargadas: ", result.todos); return setList(result.todos); })
            .catch((error) => console.error("Error al obtener: ", error));

    }

}

const saveInput = () => {
    if (contactId) {
        dispatch({
            type: 'updateContact',
            payload: { ...input, id: parseInt(contactId) }
        });
    } else {
        dispatch({
            type: 'addContact',
            payload: input
        });
    }
    navigate("/");
};

return (
    <div>
        <h1>{contactId ? "Edit Contact" : "Add new Contact"}</h1>
        <div>
            <label> Full Name
                <input type="text" name="username" value={input.username} onChange={addInput} />
            </label>

            <label> Sex
                <select name="sex" value={input.sex} onChange={addInput}>
                    <option value="man">Man</option>
                    <option value="woman">Woman</option>
                </select>
            </label>

            <label> Address
                <input type="text" name="address" value={input.address} onChange={addInput} />
            </label>

            <label> Phone Number
                <input type="tel" name="phone" value={input.phone} onChange={addInput} />
            </label>

            <label> Email
                <input type="email" name="email" value={input.email} onChange={addInput} />
            </label>
        </div>
        <button onClick={saveInput}>Save</button>
        <Link to="/">Get back to the contacts</Link>
    </div>
);
};