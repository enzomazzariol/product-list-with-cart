import './css/App.css';
import DessertCard from './components/dessertCard.jsx';
import Cart from './components/cart.jsx';
import { useState, useEffect } from 'react';

function App() {
  const [cart, setCart] = useState([]);
  const [desserts, setDesserts] = useState([]);

  useEffect(() => {
    fetch('/data.json')
      .then((response) => response.json())
      .then((data) => {
        // Crear una lista de postres con la cantidad del carrito si existe
        const updatedDesserts = data.map((dessert) => {
          const dessertInCart = cart.find(item => item.name === dessert.name);
          const cantidad = dessertInCart ? dessertInCart.cantidad : 0; 
          return { ...dessert, cantidad }; // Añade la cantidad al postre
        });
        setDesserts(updatedDesserts); 
      })
      .catch((error) => {
        console.error('Error al cargar los datos JSON:', error);
      });
  }, [cart]);

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
      <div className="d-flex flex-md-row flex-sm-column flex-column p-4 pt-5">
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
