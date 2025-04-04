import { stripe } from "@/lib/stripe";
import { ProductDetail } from "@/components/product-detail";

export default async function ProductPage({ 
    params 
}: { 
    params: Promise<{ id: string }> 
}) {
    const { id } = await params;
    
    const product = await stripe.products.retrieve(id, {
        expand: ["default_price"],
    });
    const plainProduct = JSON.parse(JSON.stringify(product));
    return (
        <ProductDetail product={plainProduct} />
    );
}

//Original code, couldn't use it due to error from next 15.0.0 perhaps try later to fix without await

// import { stripe } from "@/lib/stripe";
// import { ProductDetail } from "@/components/product-detail";

// export default async function ProductPage ({ 
//     params 
// }: { 
//     params: { id: string } 
// }) {
//     const product = await stripe.products.retrieve(params.id, {
//         expand: ["default_price"],
//     });

//     const plainProduct = JSON.parse(JSON.stringify(product));
//     return (
//         <ProductDetail product={plainProduct} />
//     )
// }