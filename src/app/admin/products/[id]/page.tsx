"use client";

import { use, useState, useEffect } from "react";
import ProductForm, { ProductFormData } from "@/components/admin/ProductForm";

// Mock function to simulate fetching product data
const getProduct = async (id: string): Promise<ProductFormData> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500));
  
  // Return mock data
  return {
    name: "Zavira Primal",
    slug: "zavira-primal",
    description: "A bold, sophisticated fragrance designed for the modern man. Notes of bergamot, oud, and vanilla create a lasting impression.",
    shortDescription: "A bold, sophisticated fragrance...",
    category: "for-him",
    collection: "signature",
    status: "active",
    featured: true,
    variants: [
      { id: "v1", size: "50ml", price: 145, sku: "ZAV-PRM-50", stock: 24 },
      { id: "v2", size: "100ml", price: 245, sku: "ZAV-PRM-100", stock: 12 },
    ],
    images: ["/assets/product-primal.jpg"],
    seoTitle: "Zavira Primal | Luxury Perfume for Men",
    seoDescription: "Discover Zavira Primal, a bold fragrance with notes of bergamot, oud, and vanilla.",
    notes: ["Bergamot", "Oud", "Vanilla"],
  };
};

export default function EditProductPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const [product, setProduct] = useState<ProductFormData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data = await getProduct(resolvedParams.id);
        setProduct(data);
      } catch (error) {
        console.error("Failed to fetch product", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProduct();
  }, [resolvedParams.id]);

  if (isLoading) {
    return <div className="p-8 text-center text-muted-foreground">Loading product...</div>;
  }

  if (!product) {
    return <div className="p-8 text-center text-destructive">Product not found</div>;
  }

  return <ProductForm initialData={product} isEditing />;
}
