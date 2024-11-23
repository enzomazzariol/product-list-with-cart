import './css/App.css'
import data from '../data.json';
import DessertCard from './components/dessertCard.jsx'
import Cart from './components/cart.jsx';
import Dessert from './DessertModel.jsx';
import { useState } from 'react';

function App() {
  const [cart, setCart] = useState([]);

  const desserts = data.map((dessert) => new Dessert(dessert.name, dessert.image, dessert.category, dessert.price, dessert.cantidad));

  const addToCart = (dessert) => {
    setCart((prevCart) => {
      const existeItem = prevCart.find((item) => item.name === dessert.name);
      if (existeItem) {
        // Si el producto ya existe, incrementa la cantidad
        return prevCart.map((item) =>
          item.name === dessert.name ? { ...item, cantidad: item.cantidad + 1 } : item
        );
      } else {
        // Si el producto no existe, agrégalo al carrito con cantidad inicial 1
        return [...prevCart, { ...dessert, cantidad: 1 }];
      }
    });
  };

  const actualizarCantidad = (dessert, newQuantity) => {
    setCart((prevCart) => 
      prevCart.map((item) =>
        item.name === dessert.name ? { ...item, cantidad: newQuantity } : item
      )
    );
  };

  return (
    <>
      <section className="container">
        <div className="d-flex p-5">
          <div className="w-100 d-flex flex-column">
            <h3 className="title mb-4">Desserts</h3>
            <div className="d-flex justify-content-between cards-container flex-wrap">
              {desserts.map((dessert) => (
                <DessertCard
                  key={dessert.name}
                  dessert={dessert}
                  cantidad={dessert.cantidad}
                  addToCart={addToCart}
                  actualizarCantidad={actualizarCantidad}
                />
              ))}
            </div>
          </div>
          <Cart cart={cart} setCart={setCart} />
        </div>
        <div className="attribution text-center">
          Challenge by <a href="https://www.frontendmentor.io?ref=challenge">Frontend Mentor</a>.
          Coded by <a href="#">Enzo Mazzariol</a>.
        </div>
      </section>
    </>
  );
}

export default App;
