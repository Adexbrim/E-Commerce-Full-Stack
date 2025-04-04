import Link from "next/link";
import { Card, CardHeader, CardContent, CardTitle } from "./ui/card";
import Stripe from "stripe";
import Image from "next/image";
import { Button } from "./ui/button";

interface Props {
    product: Stripe.Product;
}
export const ProductCard = ({ product }: Props) => {
    const price = product.default_price as Stripe.Price;
    const desc = product.description ? product.description : "No description available";
    
    return (
        <Link href={`/products/${product.id}`} className="block h-full">
            <Card className="group hover:shadow-2xl tansition duration-300 py-0 h-full flex flex-col border-none shadow-sm rounded-lg overflow-hidden">
                {product.images && product.images[0] && (
                    <div className='relative h-60 w-full'>
                        <Image
                            alt={product.name} 
                            src={product.images[0]}
                            layout="fill"
                            objectFit="cover"
                            className='group-hover:opacity-90 transition-opacity duration-300 rounded-t-lg'
                            />
                    </div>
                 )}

                <CardHeader className="p-4">
                    <CardTitle className="text-xl font-bold text-gray-800">
                        {product.name}
                    </CardTitle>
                    <CardContent className="p-4 flex-grow flex flex-col justify-between">
                        {price && price.unit_amount && (
                            <p className="text-lg font-semibold text-gray-900"> 
                                ${(price.unit_amount / 100).toFixed(2)}
                            </p>
                        )}
                        {desc && desc.length > 0 && (
                            <p className="text-sm text-gray-600 mb-2">
                                {desc}
                            </p>
                        )}
                        <Button className="mt-4 bg-black text-white">View Details</Button>
                    </CardContent>
                </CardHeader>

            </Card>
        </Link>
    )
}