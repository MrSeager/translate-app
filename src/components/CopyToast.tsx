import { FC } from 'react';
//Bootstrap
import { Toast, ToastContainer } from 'react-bootstrap';

interface CopyToastProps {
    showTost: boolean,
    setShowToast: (showTost: boolean) => void
}

const CopyToast: FC<CopyToastProps> = ({ showTost, setShowToast }) => {
    return (
        <ToastContainer position='top-center'>
            <Toast 
                onClose={() => setShowToast(false)} 
                show={showTost} className='mt-5' 
                delay={2000}
                autohide
            >
                <Toast.Body>Copied!</Toast.Body>
            </Toast>
        </ToastContainer>
    );
}

export default CopyToast