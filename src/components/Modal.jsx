/* eslint-disable react/prop-types */
const Modal = ({ showModal, closeModal, totalPrice, cart }) => {
  if (!showModal) return null;

  const itemsInModal = cart.filter((item) => item.cantidad > 0);

  const handleClickOutside = (e) => {
    if (e.target.classList.contains('modal-overlay')) {
      closeModal();
    }
  };

  return (
    <div className="modal-overlay" onClick={handleClickOutside}>
      <div className="modal-container d-flex flex-column p-4" onClick={(e) => e.stopPropagation()}>
        <img src="src/assets/images/icon-order-confirmed.svg" alt="icon confirm order" className="modal-icon mb-3" />
        <h2 className="modal-title">Order Confirmed</h2>
        <p className="modal-description">We hope you enjoy your food!</p>
        <div className="order-list-container p-4 mb-4">
          {itemsInModal.map((item) => (
            <section key={item.id} className="order-item-container d-flex justify-content-between align-items-center pb-2 mb-3">
              <div className="d-flex">
                <img src={`src/${item.image.thumbnail}`} alt="image thumbnail dessert" className="order-item-img" />
                <div className="d-flex flex-column ms-3">
                  <p className="cart-item-name mb-2">{item.name}</p>
                  <div className="d-flex">
                    <p className="cart-item-cantidad me-3">{item.cantidad}x</p>
                    <p className="cart-item-price">
                      <span className="cart-arroba">@</span>
                      ${item.price.toFixed(2)}
                    </p>
                  </div>
                </div>
              </div>
              <p className="cart-item-price order">${item.price.toFixed(2)}</p>
            </section>
          ))}
          <div className="d-flex justify-content-between align-items-center mt-4">
            <p className="cart-total-title">Order total</p>
            <p className="cart-total">${totalPrice.toFixed(2)}</p>
          </div>
        </div>
        <button className="confirm-order-button p-2">Start new Order</button>
      </div>
    </div>
  );
};

export default Modal;
