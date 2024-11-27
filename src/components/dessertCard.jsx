import { useState, useEffect } from "react";
/* eslint-disable react/prop-types */

const DessertCard = ({ dessert, addToCart }) => {
    const [imageUrl, setImageUrl] = useState(`src/${dessert.image.desktop}`);
  
    useEffect(() => {
      const updateImageUrl = () => {
        if (window.innerWidth < 768) {
          setImageUrl(`src/${dessert.image.mobile}`);
        } else {
          setImageUrl(`src/${dessert.image.desktop}`);
        }
      };
  
      updateImageUrl();
      window.addEventListener('resize', updateImageUrl);
  
      return () => {
        window.removeEventListener('resize', updateImageUrl);
      };
    }, [dessert.image.desktop, dessert.image.mobile]);
  
    const handleAddToCart = () => {
      addToCart(dessert, 1);
    };
  
    const incrementarCantidad = (e) => {
      e.stopPropagation();
      addToCart(dessert, 1);
    };
  
    const decrementarCantidad = (e) => {
      e.stopPropagation();
      addToCart(dessert, -1);
    };
  
    return (
      <div className="dessert-card d-flex flex-column">
        <div className="d-flex flex-column justify-content-center align-items-center">
          <img
            src={imageUrl}
            alt="image of dessert"
            className="dessert-card-img"
          />
          {dessert.cantidad > 0 ? (
            <div className="selected-button d-flex align-items-center justify-content-between p-2">
              <button className="button-incrementar" onClick={decrementarCantidad}>
                <img
                  src="src/assets/images/icon-decrement-quantity.svg"
                  alt="decrement icon"
                  className="decrement-icon"
                />
              </button>
              <span className="cantidad-card">{dessert.cantidad}</span>
              <button className="button-incrementar" onClick={incrementarCantidad}>
                <img
                  src="src/assets/images/icon-increment-quantity.svg"
                  alt="increment icon"
                  className="increment-icon"
                />
              </button>
            </div>
          ) : (
            <button
              className="dessert-card-button p-2"
              onClick={handleAddToCart}
            >
              <img
                src="src/assets/images/icon-add-to-cart.svg"
                alt="add to cart icon"
                className="dessert-card-icon me-2 mb-1"
              />
              Add to cart
            </button>
          )}
        </div>
        <small className="dessert-card-name">{dessert.name}</small>
        <strong className="dessert-card-description">{dessert.category}</strong>
        <p className="dessert-card-price">${dessert.price}</p>
      </div>
    );
  };
  
  export default DessertCard;
  