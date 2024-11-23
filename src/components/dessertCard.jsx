import { useState } from "react";
/* eslint-disable react/prop-types */

export const DessertCard = ({dessert, addToCart, updateCantidad}) => {
    const [cardSelected, setCardSelected] = useState(false);
    const [cantidad, setCantidad] = useState(0);
    const imageUrl = `src/${dessert.image.desktop}`;

    if (!dessert) {
        return <p>No dessert data available</p>;
    }

    const handleAddToCart = () => {
        setCantidad(1); 
        addToCart(dessert); 
        setCardSelected(true); 
    };

    const incrementarCantidad = () => {
        setCantidad(prevCantidad => {
            const nuevaCantidad = prevCantidad + 1;
            updateCantidad(dessert, nuevaCantidad);
            return nuevaCantidad;
        });
    };

    const decrementarCantidad = () => {
        setCantidad(prevCantidad => {
            const nuevaCantidad = prevCantidad - 1;
            if (nuevaCantidad <= 0) {
                setCardSelected(false);
                return 0; 
            }
            updateCantidad(dessert, nuevaCantidad); 
            return nuevaCantidad;
        });
    };

    return (
        <div className='dessert-card d-flex flex-column'> 
            <div className='d-flex flex-column justify-content-center align-items-center'>
                <img src={imageUrl} alt="image of dessert" className={`dessert-card-img ${cardSelected ? 'selected' : ''}`} />
                <button 
                    className={`${cardSelected ? 'selected-button d-flex align-items-center justify-content-between p-2' : 'dessert-card-button p-2'}`}
                    onClick={handleAddToCart}
                >
                    {cardSelected ? (
                        <>
                            <img 
                                src="src\assets\images\icon-decrement-quantity.svg" 
                                alt="decrement icon"
                                className="decrement-icon"
                                onClick={decrementarCantidad}
                            />
                            <span className="cantidad-card">{cantidad}</span> 
                            <img 
                                src="src\assets\images\icon-increment-quantity.svg" 
                                alt="increment icon"
                                className="increment-icon"
                                onClick={incrementarCantidad} 
                            />
                        </>
                    ) : (
                        <>
                            <img src="src\assets\images\icon-add-to-cart.svg" alt="add to cart icon" className='dessert-card-icon me-2 mb-1' />
                            Add to cart
                        </>
                    )}
                </button>
            </div>
            <small className='dessert-card-name'>{dessert.name}</small>
            <strong className='dessert-card-description'>{dessert.category}</strong>
            <p className='dessert-card-price'>${dessert.price}</p>
        </div>
    );
};

export default DessertCard;
