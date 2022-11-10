// TODO: create a component that displays a single bakery item

import CartItem from "./CartItem";

export default function BakeryItem(props) {
    console.log(props)
    return (
      <div className="bakeryitem
      flex flex-col items-center justify-center
      border-2 border-neutral-800
      rounded-lg
      m-2
      p-2
      w-70
      h-80
      text-center
      shadow-lg
      bg-sky-50
      ">
        <img src={".."+props.image} alt={props.name} className="w-40 h-40 overflow-clip" />
        <h3 className="text-2xl font-bold">{props.name}</h3>  
        <p className="text-xl">{props.description}</p>
        <p className="text-xl">${props.price}</p>
        <button onClick={()=> props.addToCart(props)} className="bg-sky-600 hover:bg-sky-400 hover:shadow-lg active:bg-sky-800  transition-colors duration-100 text-neutral-100 rounded-lg p-2 m-2">Add to Cart</button>
      </div>
    );
  }