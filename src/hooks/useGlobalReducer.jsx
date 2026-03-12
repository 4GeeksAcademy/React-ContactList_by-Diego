
import { useContext, useReducer, createContext } from "react";
import { contactReducer } from "../store";
import { initialContactState } from "../store";



//Espacio para que los datos "floten" por encima de todas las páginas.
const ContactContext = createContext()

// Define a provider component that encapsulates the store and warps it in a context provider to 
// broadcast the information throught all the app pages and components.
export const ContactProvider = ({ children }) => {
    // Initialize reducer with the initial state.
    const [state, dispatch] = useReducer(contactReducer, initialContactState);
    // Provide the store and dispatch method to all child components.
    return (
    <ContactContext.Provider value={{ state, dispatch }}>
        {children}
    </ContactContext.Provider>
)
}

// Custom hook to access the global state and dispatch function.
export default function useGlobalReducer() {
    return useContext(ContactContext)

}