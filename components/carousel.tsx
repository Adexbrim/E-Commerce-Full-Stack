"use client";
import React from 'react';

import { useEffect, useState } from 'react';
import Stripe from 'stripe';
import { Card, CardTitle, CardContent } from './ui/card';
import Image from 'next/image';

interface Props {
    products: Stripe.Product[];
}
export const Carousel = ({products} : Props) => {
    const [current, setCurrent] = useState<number>(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrent((prev) => (prev + 1) % products.length);
        }, 3000);// Change slide every 3 seconds

        return () => clearInterval(interval); // Cleanup interval on unmount
    }, [products.length]);

    const currentProduct = products[current];

    const price = currentProduct.default_price as Stripe.Price;

    return (
        <Card className='relative overflow-hidden rounded-lg shadow-md'>
            {currentProduct.images && currentProduct.images[0] && (
                <div className='relative h-80 w-full'>
                    <Image
                        alt={currentProduct.name} 
                        src={currentProduct.images[0]}
                        layout="fill"
                        objectFit="cover"
                        className='transition-opacity duration-500 ease-in-out'
                    />
                </div>
            )}
            <CardContent className='absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-50 text-white p-4'>
                <CardTitle className='text-3xl font-bold text-white mb-2'>
                    {currentProduct.name}
                </CardTitle>
                {price && price.unit_amount && (
                    <p> ${(price.unit_amount / 100).toFixed(2)}</p>
                )}
            </CardContent>
        </Card>
    )
}