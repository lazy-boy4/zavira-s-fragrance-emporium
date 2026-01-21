import AdminLayoutWrapper from "@/components/admin/AdminLayoutWrapper";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin Dashboard | Zavira",
  description: "Manage your store",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AdminLayoutWrapper>{children}</AdminLayoutWrapper>;
}
