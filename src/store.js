


export const initialContactState = {

    contact: []
}


export const contactReducer = (state, action) => {

    switch (action.type) {


        case "addContact":
            return { ...state, contact: [...state.contact, {...action.payload, id: Date.now() }] };

        case "deleteContact":
            return { ...state, contact: state.contact.filter(contact => contact.id !== action.payload) };

        case "updateContact":
            return { ...state, contact: state.contact.map(contact => contact.id === action.payload.id ? action.payload : contact) };
        default:
            return state;



    }

}