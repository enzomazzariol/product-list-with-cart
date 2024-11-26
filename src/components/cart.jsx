/* eslint-disable react/prop-types */
import { useState } from 'react';
import Modal from './Modal';
import CartItem from './cartItem';

function Cart({ cart, removeFromCart }) {
    const [showModal, setShowModal] = useState(false);

    const openModal = () => setShowModal(true);
    const closeModal = () => setShowModal(false);

    const totalPrice = cart.reduce(
        (total, item) => total + item.price * item.cantidad,
        0
    );

    const itemsInCart = cart.filter((item) => item.cantidad > 0);

    return (
        <section className="flex-shrink-1 p-4 ms-5 cart-container">
            {itemsInCart.length === 0 ? (
                <>
                    <p className="cart-title">Your Cart (0)</p>
                    <img
                        src="src/assets/images/illustration-empty-cart.svg"
                        alt="image empty cart"
                        className="cart-img"
                    />
                    <p className="cart-description text-center mt-2">
                        Your added items will appear here
                    </p>
                </>
            ) : (
                <>
                    <p className="cart-title mb-3">Your Cart ({itemsInCart.length})</p>
                    {itemsInCart.map((item) => (
                        <CartItem
                            key={item.name}
                            item={item}
                            removeFromCart={removeFromCart}
                        />
                    ))}
                    <div className="d-flex flex-column mt-4">
                        <div className="d-flex justify-content-between align-items-center mb-1">
                            <p className="cart-total-title">Order total</p>
                            <p className="cart-total">${totalPrice.toFixed(2)}</p>
                        </div>
                        <div className="delivery-message d-flex justify-content-center align-items-center mb-4 p-3">
                            <img
                                src="src/assets/images/icon-carbon-neutral.svg"
                                alt="carbon neutral delivery"
                                className="me-2"
                            />
                            <p className="m-0">
                                This is a <strong>carbon-neutral</strong>{' '}
                                delivery
                            </p>
                        </div>
                        <button
                            className="confirm-order-button p-2"
                            onClick={openModal}
                        >
                            Confirm order
                        </button>
                    </div>
                </>
            )}

            {showModal && (
                <Modal
                    setShowModal={setShowModal}
                    closeModal={closeModal}
                    totalPrice={totalPrice}
                />
            )}
        </section>
    );
}

export default Cart;
