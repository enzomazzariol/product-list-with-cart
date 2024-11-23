import './css/App.css';
import data from '../data.json';
import DessertCard from './components/dessertCard.jsx';
import Cart from './components/cart.jsx';
import Dessert from './DessertModel.jsx';
import { useState } from 'react';

function App() {
  const [cart, setCart] = useState([]);
  
  // Crear una lista de objetos Dessert con sus datos iniciales
  const desserts = data.map((dessert) => new Dessert(dessert.name, dessert.image, dessert.category, dessert.price, 0));

  const addToCart = (dessert) => {
    setCart((prevCart) => {
      const existeItem = prevCart.find((item) => item.name === dessert.name);
      if (existeItem) {
        // Si el producto ya existe, incrementamos la cantidad
        return prevCart.map((item) =>
          item.name === dessert.name ? { ...item, cantidad: item.cantidad + 1 } : item
        );
      } else {
        // Si el producto no existe, agregamos el nuevo producto con cantidad 1
        return [...prevCart, { ...dessert, cantidad: 1 }];
      }
    });
  };

  const updateCantidad = (dessert, newCantidad) => {
    setCart((prevCart) => 
      prevCart.map((item) => 
        item.name === dessert.name ? { ...item, cantidad: newCantidad } : item
      )
    );
  };

  return (
    <section className="container">
      <div className="d-flex p-5">
        <div className="w-100 d-flex flex-column">
          <h3 className="title mb-4">Desserts</h3>
          <div className="d-flex justify-content-between cards-container flex-wrap">
            {desserts.map((dessert) => (
              <DessertCard
                key={dessert.name}
                dessert={dessert}
                addToCart={addToCart}
                updateCantidad={updateCantidad} 
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
  );
}

export default App;
