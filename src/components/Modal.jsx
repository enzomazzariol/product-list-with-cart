/* eslint-disable react/prop-types */
// src/components/Modal.jsx
import '../css/App.css';

const Modal = ({ show, close }) => {
  if (!show) return null;  // Si no se debe mostrar el modal, no renderiza nada.

  const handleClickOutside = (e) => {
    // Cerrar el modal si se hace clic en el fondo
    if (e.target.classList.contains('modal-overlay')) {
      close();
    }
  };

  return (
    <div className="modal-overlay" onClick={handleClickOutside}>
      <div className="modal-container d-flex flex-column p-4" onClick={(e) => e.stopPropagation()}>
        <img src="src\assets\images\icon-order-confirmed.svg" alt="icon confirm order" className='modal-icon mb-3' />
        <h2 className='modal-title'>Order Confirmed</h2>
        <p className='modal-description'>We hope you enjoy your food!</p>
        <p>Lista de desserts</p>
        <button className='confirm-order-button p-2'>Start new Order</button>
      </div>
    </div>
  );
};

export default Modal;
