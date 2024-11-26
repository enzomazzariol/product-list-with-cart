import { useState } from "react";
/* eslint-disable react/prop-types */

export const DessertCard = ({dessert, addToCart}) => {
    const [cardSelected, setCardSelected] = useState(false);
    const imageUrl = `src/${dessert.image.desktop}`;

    if (!dessert) {
        return <p>No dessert data available</p>;
    }

    // Función para agregar el postre al carrito con la cantidad
    const handleAddToCart = () => {
        setCardSelected(true); 
        addToCart(dessert, 1); 
    };

    // Función para incrementar la cantidad
    const incrementarCantidad = (e) => {
        e.stopPropagation();  // evitar que se propague el evento al padre
        addToCart(dessert, 1); 
    };

    // Función para decrementar la cantidad
    const decrementarCantidad = (e) => {
        e.stopPropagation(); // evitar que se propague el evento al padre
        if (dessert.cantidad > 1) {
            addToCart(dessert, -1); 
        } else {
            setCardSelected(false); 
            addToCart(dessert, -1);
        }
    };

    return (
        <div className='dessert-card d-flex flex-column'> 
            <div className='d-flex flex-column justify-content-center align-items-center'>
                <img src={imageUrl} alt="image of dessert" className={`dessert-card-img ${cardSelected ? 'selected' : ''}`} />
                <button 
                    className={`${cardSelected ? 'selected-button d-flex align-items-center justify-content-between p-2' : 'dessert-card-button p-2'}`}
                    onClick={handleAddToCart}
                >
                    {cardSelected || dessert.cantidad > 0 ? (
                        <>
                            <button className="button-incrementar" onClick={decrementarCantidad}>
                                <img 
                                    src="src/assets/images/icon-decrement-quantity.svg" 
                                    alt="decrement icon"
                                    className="decrement-icon"
                                />
                            </button>
                            <span className="cantidad-card">{dessert.cantidad}</span> 
                            <button className="button-incrementar" onClick={incrementarCantidad} >
                                <img 
                                    src="src/assets/images/icon-increment-quantity.svg" 
                                    alt="increment icon"
                                    className="increment-icon"
                                />
                            </button>
                        </>
                    ) : (
                        <>
                            <img src="src/assets/images/icon-add-to-cart.svg" alt="add to cart icon" className='dessert-card-icon me-2 mb-1' />
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
