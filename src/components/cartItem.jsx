// CartItem.jsx
/* eslint-disable react/prop-types */

function CartItem({ item, removeFromCart }) {
    
    return (
        <div key={item.name} className="cart-item d-flex justify-content-between mb-3">
            <div className="d-flex flex-column">
                <p className="cart-item-name mb-1">{item.name}</p>
                <div className="d-flex cart-item-data-container">
                    <p className="cart-item-cantidad me-2">{item.cantidad}x</p>
                    <p className="cart-item-price">
                        <span className="cart-arroba">@</span>
                        ${item.price.toFixed(2)}
                    </p>
                    <p className="cart-item-total">
                        ${(item.price * item.cantidad).toFixed(2)}
                    </p>
                </div>
            </div>
            <button
                className="remove-item-button d-flex align-items-center mt-3"
                onClick={() => removeFromCart(item)}
            >
                <img
                    src="images/icon-remove-item.svg"
                    alt="remove item icon"
                    className="remove-item-icon"
                />
            </button>
        </div>
    );
}

export default CartItem;
