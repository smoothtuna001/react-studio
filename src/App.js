
import { useState } from "react";
import bakeryData from "./assets/bakery-data.json";
import BakeryItem from "./components/BakeryItem";
import CartItem from "./components/CartItem";

/* ####### DO NOT TOUCH -- this makes the image URLs work ####### */
bakeryData.forEach((item) => {
  item.image = process.env.PUBLIC_URL + "/" + item.image;
});
/* ############################################################## */

// make a prices map from the bakeryData
const prices = {};
bakeryData.forEach((item) => {
  prices[item.name] = item.price;
});

function App() {
  // TODO: use useState to create a state variable to hold the state of the cart
  /* add your cart state code here */

  const [cart, setCart] = useState({});
  const [total, setTotal] = useState(0);

  const addToCart = (item) => {
    // console.log("add!")
    const newCart = { ...cart };
    const name = item.name
    if (newCart[name]) {
      newCart[name].quantity++;
    } else {
      newCart[name] = { name, quantity: 1 };
    }
    console.log("newCart", newCart);
    console.log("calling setTotal with", total)
    console.log("calling setTotal with price,",  item.price)
    setTotal(total + prices[item.name]);
    setCart(newCart);
  };

  const removeFromCart = (item) => {
    const newCart = { ...cart };
    const name = item.name
    if (newCart[name]) {
      newCart[name].quantity--;
      if(newCart[name].quantity === 0){
        delete newCart[name];
      }
    } else {
      newCart[name] = { name, quantity: 0 };
    }
    console.log("newCart", newCart);
    setCart(newCart);
    setTotal(total - prices[item.name]);
  };

  return (
    <div className="App flex flex-col items-center h-screen text-neutral-800 min-w-[700px]">
      <h1 className="text-5xl md:text-7xl text-center p-10 font-bold bg-red-50 w-screen fixed whitespace-nowrap">My Bakery</h1> {/* TODO: personalize your bakery (if you want) */}

      <div className="p-10 m-10"></div>

      <div id="shoppingcontainer" className="flex w-full px-5 space-x-5">
        <div id="menu" className="grid gap-6 grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 w-5/6">
        {bakeryData.map((item, index) => ( // TODO: map bakeryData to BakeryItem components
          <>
          <BakeryItem {...item} cart={cart} addToCart={addToCart} key={item.name} />
          </>
        ))}
        </div>

        <div id="cart" className="w-1/6 min-w-[400px] md:min-w-[400px]">
          {/* <div className="fixed flex items-center justify-center w-[30rem]"> */}
            <div className="sticky top-40 justify-center items-center  border-neutral-800 border-4 rounded-xl">
              <div className=" text-center items-center justify-center inset-0 ">
              <h2 className="text-4xl font-bold">Cart</h2>
              {/* iterate through and display the cart */}
              {Object.values(cart).map((item) => (
                <>
                <CartItem item={item} addtocart={addToCart} removefromcart={removeFromCart} key={item.name} />
                {/* <div className="flex flex-row justify-between items-center px-2">
                  <CartItem item={item} addToCart={addToCart} removeFromCart={removeFromCart} key={item.name} />
                </div> */}
                </>
                  ))}
                  {!isNaN(total) && total > 0 && <h3 className="font-bold text-2xl">Total: ${total.toString().match(/^-?\d+(?:\.\d{0,2})?/)[0]}</h3>}
                  {/* Credit to https://stackoverflow.com/questions/4187146/truncate-number-to-two-decimal-places-without-rounding for regex */}
                  
              </div>
              
            </div>
            {/* TODO: render a list of items in the cart */}
          {/* </div> */}
        </div>
      </div>
    </div>
  );
}

export default App;
