// app/product-list/page.tsx
import Head from 'next/head';
import ProductList from '../../components/ProductList';

export default async function ProductListPage() {
  const res = await fetch('https://66b9fb8cfa763ff550fa5d55.mockapi.io/products');
  const products = await res.json();

  return (
    <>
      <Head>
        <title>Product Listing - My E-commerce</title>
        <meta name="description" content="Browse our selection of top-rated products!" />
        <meta name="keywords" content="e-commerce, products, shopping" />
      </Head>
      <main>
        <ProductList products={products} />
      </main>
    </>
  );
}
