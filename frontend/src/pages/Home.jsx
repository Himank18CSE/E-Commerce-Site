import{ useContext} from 'react'
import products from '../data/products';
import Productcard from '../components/Productcard';
import { CartContext } from '../context/CartContext';

export default function Home() {
    
    const {addToCart}=useContext(CartContext);
    
  return (
    <div className='products-container'>
        {products.map((product)=>(
            <Productcard
            key={product.id}
            product={product}
            addToCart={addToCart}
            />
        ))}
    </div>
  );
}