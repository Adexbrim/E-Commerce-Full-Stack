"use client";

import Stripe from "stripe";
import { ProductCard } from "./product-card";
import { useState } from "react";

interface Props {
    products: Stripe.Product[];
}

export const ProductList = ({ products }: Props) => {
    const [searchTerm, setSearchTerm] = useState<string>("");

    const filteredProducts = products.filter((product) => {
        const term = searchTerm.toLowerCase();
        const nameMatch = product.name.toLowerCase().includes(term);
        const descMatch = product.description 
            ? product.description.toLowerCase().includes(term) 
            : false;

        return nameMatch || descMatch;
    });


    return (
        <div>
            <div className="mb-4 flex justify-center">
                <input 
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search products..."
                    className="w-full max-w-md rounded border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                 />
            </div>

            <ul className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {filteredProducts.map((product, key) => {
                    return (
                        <li key={key}>
                            <ProductCard product={product} />
                        </li>
                    )}
                )}
            </ul>

        </div>
    )
}