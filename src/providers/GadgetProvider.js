import { createContext, useContext, useState, useEffect } from 'react';

const GadgetContext = createContext();

export const useGadget = () => useContext(GadgetContext);


export const GadgetProvider = ({ children }) => {
    const [showSpinner, setShowSpinner] = useState(false);
    const [alert, setAlert] = useState({show: false, message: '', type: 'success'});

    return (
        <GadgetContext.Provider value={{showSpinner, setShowSpinner, alert, setAlert}}>
            {children}
        </GadgetContext.Provider>
    )
}