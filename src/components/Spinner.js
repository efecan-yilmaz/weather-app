import React from 'react';

import { useGadget } from '../providers/GadgetProvider';

import 'bootstrap/dist/css/bootstrap.css';
import Modal from 'react-bootstrap/Modal';
import BootstrapSpinner from 'react-bootstrap/Spinner';

const Spinner = () => {
    const gadgetContext = useGadget();

    return (
        <Modal show={gadgetContext.showSpinner} backdrop="static" centered>
            <Modal.Header>
                <Modal.Title>Weather Data is Loading</Modal.Title>
            </Modal.Header>
            <Modal.Body className="text-center">
                <BootstrapSpinner animation="grow" variant="info"/>
            </Modal.Body>
        </Modal>
    )
}

export default Spinner;
