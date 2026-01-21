import OrderDetailClient from "@/components/admin/orders/OrderDetailClient";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function OrderDetailPage({ params }: PageProps) {
  const { id } = await params;
  return <OrderDetailClient id={id} />;
}
