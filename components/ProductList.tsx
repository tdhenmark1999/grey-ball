import { useDispatch } from 'react-redux';
import { addItem } from '../store/cartSlice';

type Product = {
  id: string;
  title: string;
  description: string;
  price: string;
  currency: string;
  image: string;
  rating: number;
};

type ProductListProps = {
  products: Product[];
};

const ProductList: React.FC<ProductListProps> = ({ products }) => {
  const dispatch = useDispatch();

  const handleAddToCart = (product: Product) => {
    dispatch(addItem(product));
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {products.map((product) => (
        <div key={product.id} className="border p-4 rounded shadow">
          <img src={product.image} alt={product.title} className="w-full h-48 object-cover" />
          <h2 className="text-lg font-bold mt-2">{product.title}</h2>
          <p className="text-sm text-gray-500">{product.description.substring(0, 100)}...</p>
          <p className="text-xl font-semibold">{product.currency} {product.price}</p>
          <p className="text-yellow-500">{`★`.repeat(Math.floor(product.rating / 20000))}</p>
          <button
            onClick={() => handleAddToCart(product)}
            className="mt-2 px-4 py-2 bg-blue-500 text-white rounded"
          >
            Add to Cart
          </button>
        </div>
      ))}
    </div>
  );
};

export default ProductList;
