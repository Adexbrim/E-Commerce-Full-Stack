"use client";
import { Button } from "@/components/ui/button";

import { useCartStore } from "@/store/cart-store";
import Link from "next/link";
import { use, useEffect } from "react";

export default function SuccessPage() {
    const {clearCart} = useCartStore();

    useEffect(() => {
        clearCart();
    }
    , [clearCart]);
    
    return (
        <div className="container mx-auto px-4 py-8 text-center">
            <h1 className="text-3xl font-bold mb-4 text-center">Payment Successful!</h1>
            <p className="text-lg text-center mb-4">
                Thank you for your purchase! Your order is being processed
            </p>
            
            <Link href="/products" className="text-blue-500 hover:underline">
                Continue Shopping
            </Link>
        </div>
    )
}
