import { motion } from "framer-motion";
import { Trash, Minus, Plus } from "lucide-react";
import { useEffect } from "react";

import { useProductStore } from "../stores/useProductStore";



const ProductsList = () => {
const { products, getAllProducts, setProducts, updateQuantity, loading } = useProductStore();

const { deleteProduct } = useProductStore();

const handleDeleteProduct = async (productId) => {
  await deleteProduct(productId);
};

const updateStock = async (id, amount) => {
  const product = products.find((p) => p._id === id);
  if (!product) return;

  const newStock = Math.max(0, product.inStock + amount);

  await updateQuantity(id, newStock); 
  useProductStore.setState((state) => ({
      products: state.products.map((p) =>
        p._id === id ? { ...p, inStock: newStock } : p
      ),
    }));
};


  const removeProduct = (id) => {
    setProducts((prev) => prev.filter((p) => p._id !== id));
  };
 
useEffect(() => {
  const fetchProducts = async () => {
    await getAllProducts();
    const updatedProducts = await Promise.all(
      useProductStore.getState().products.map(async (product) => {
        return { ...product};
      })
    );

    useProductStore.setState({ products: updatedProducts });
  };

  fetchProducts();
}, [getAllProducts]);

  return (
    <motion.div
      className="bg-pink-100 shadow-lg rounded-lg overflow-hidden max-w-4xl mx-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <table className="min-w-full divide-y divide-pink-300">
        <thead className="bg-pink-200">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-pink-800 uppercase tracking-wider">
              Product
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-pink-800 uppercase tracking-wider">
              Price
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-pink-800 uppercase tracking-wider">
              Category
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-pink-800 uppercase tracking-wider">
              Stock
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-pink-800 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>

        <tbody className="bg-pink-50 divide-y divide-pink-200">
          {products.map((product) => (
            <tr key={product._id} className="hover:bg-pink-100">
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  <div className="flex-shrink-0 h-15 w-20">
                    
                    <img src={ product.imageUrl} alt={product.name} />
                  </div>
                  <div className="ml-4">
                    <div className="text-sm font-medium text-pink-800">
                      {product.name}
                    </div>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-pink-700">
                  ${product.price.toFixed(2)}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-pink-700">{product.category}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => updateStock(product._id, -1)}
                    className="text-pink-600 hover:text-pink-800"
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  <span>{product.inStock}</span>
                  <button
                    onClick={() => updateStock(product._id, 1)}
                    className="text-pink-600 hover:text-pink-800"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <button
                  onClick={() => handleDeleteProduct(product._id)}
                  className="text-red-500 hover:text-red-700"
                >
                  <Trash className="h-5 w-5" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </motion.div>
  );
};

export default ProductsList;
