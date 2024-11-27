import './css/App.css';
import data from '../public/data.json';
import DessertCard from './components/dessertCard.jsx';
import Cart from './components/cart.jsx';
import { useState } from 'react';

function App() {
  const [cart, setCart] = useState([]);
  
  // Crear una lista de objetos Dessert con sus datos iniciales
  const desserts = data.map((dessert) => {
    const dessertInCart = cart.find(item => item.name === dessert.name);
    const cantidad = dessertInCart ? dessertInCart.cantidad : 0; // Verifica si está en el carrito
    return { ...dessert, cantidad }; // Añade la cantidad al postre
  });

  const addToCart = (dessert, quantity = 1) => {
    setCart((prevCart) => {
      const existeItem = prevCart.find((item) => item.name === dessert.name);
      if (existeItem) {
        // Si el producto ya existe, actualizamos la cantidad
        return prevCart.map((item) =>
          item.name === dessert.name ? { ...item, cantidad: item.cantidad + quantity } : item
        );
      } else {
        // Si el producto no existe, agregamos el nuevo producto con la cantidad proporcionada
        return [...prevCart, { ...dessert, cantidad: quantity }];
      }
    });
  };

  const removeFromCart = (dessert) => {
    setCart((prevCart) => prevCart.filter((item) => item.name !== dessert.name));
  };

  return (
    <section className="container">
      <div className="d-flex flex-ls-row flex-md-row flex-sm-column flex-column p-5">
        <div className="w-100 d-flex flex-column">
          <h3 className="title mb-4">Desserts</h3>
          <div className="d-flex justify-content-lg-between cards-container flex-wrap justify-content-md-center justify-content-sm-center justify-content-center">
            {desserts.map((dessert) => (
              <DessertCard
                key={dessert.name}
                dessert={dessert}
                addToCart={addToCart}
              />
            ))}
          </div>
        </div>
        <Cart cart={cart} removeFromCart={removeFromCart} />
      </div>
      <div className="attribution text-center">
        Challenge by <a href="https://www.frontendmentor.io?ref=challenge">Frontend Mentor</a>.
        Coded by <a href="#">Enzo Mazzariol</a>.
      </div>
    </section>
  );
}

export default App;
