"use client";

import { useSelector } from 'react-redux';
import { RootState } from '../store';

const Header = () => {
  const { items, totalAmount } = useSelector((state: RootState) => state.cart);

  return (
    <header className="fixed top-0 left-0 w-full shadow p-4 bg-black">
      <div className="flex justify-between">
        <h1 className="text-2xl font-bold">My E-commerce</h1>
        <div>
          <p>{items.length} items - ${totalAmount.toFixed(2)}</p>
        </div>
      </div>
    </header>
  );
};

export default Header;
