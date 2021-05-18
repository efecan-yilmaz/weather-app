import React, { useEffect } from 'react';

import { useGadget } from '../providers/GadgetProvider';

import 'bootstrap/dist/css/bootstrap.css';
import './Alert.css';
import BootstrapAlert from 'react-bootstrap/Alert';

const Alert = () => {
    const gadgetContext = useGadget();
    let timer;
    useEffect(() => {
        if (gadgetContext.alert.show && gadgetContext.alert.type === 'success' ) {
            timer = setTimeout(() => {
                gadgetContext.setAlert(prev => ({...prev, show: false}));
            }, 1500);
        } else {
            clearTimeout(timer);
        }
    }, [gadgetContext.alert.show]);


    
    return (
        <BootstrapAlert className="main-alert" show={gadgetContext.alert.show} variant={gadgetContext.alert.type} dismissible onClose={() => gadgetContext.setAlert(prev => ({...prev, show: false}))}>
            {gadgetContext.alert.message}
        </BootstrapAlert>
    )
}

export default Alert;
