import { useState } from "react";
import { NavLink } from "react-router-dom";
import { Plus, MoreHorizontal, Edit, Trash2, GripVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";

/**
 * CollectionList - Manage product collections
 * 
 * Features:
 * - Collection grid view
 * - Drag and drop reordering
 * - Collection CRUD operations
 * 
 * Backend Integration:
 * - GET /api/admin/collections - List collections
 * - POST /api/admin/collections - Create collection
 * - PUT /api/admin/collections/:id - Update collection
 * - DELETE /api/admin/collections/:id - Delete collection
 * - PATCH /api/admin/collections/reorder - Reorder collections
 */

const mockCollections = [
  {
    id: "col_1",
    name: "Signature Collection",
    slug: "signature",
    description: "Our most iconic fragrances",
    productCount: 6,
    image: "/src/assets/product-primal.jpg",
    status: "active",
  },
  {
    id: "col_2",
    name: "Noir Collection",
    slug: "noir",
    description: "Dark and mysterious scents",
    productCount: 4,
    image: "/src/assets/product-midnight.jpg",
    status: "active",
  },
  {
    id: "col_3",
    name: "Limited Edition",
    slug: "limited",
    description: "Exclusive seasonal releases",
    productCount: 2,
    image: "/src/assets/product-velvet.jpg",
    status: "active",
  },
  {
    id: "col_4",
    name: "Gift Sets",
    slug: "gifts",
    description: "Perfect for gifting",
    productCount: 3,
    image: "/src/assets/product-essence.jpg",
    status: "draft",
  },
];

export default function CollectionList() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-display tracking-wider">Collections</h1>
          <p className="text-muted-foreground mt-1">
            Organize your products into collections
          </p>
        </div>
        <NavLink to="/admin/collections/new">
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            New Collection
          </Button>
        </NavLink>
      </div>

      {/* Collections grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {mockCollections.map((collection) => (
          <Card key={collection.id} className="overflow-hidden">
            <div className="relative h-40">
              <img
                src={collection.image}
                alt={collection.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
              <div className="absolute top-2 left-2">
                <GripVertical className="h-5 w-5 text-foreground/50 cursor-grab" />
              </div>
              <div className="absolute top-2 right-2">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="secondary" size="icon" className="h-8 w-8">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem asChild>
                      <NavLink to={`/admin/collections/${collection.id}`} className="flex items-center gap-2">
                        <Edit className="h-4 w-4" /> Edit
                      </NavLink>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="gap-2 text-destructive">
                      <Trash2 className="h-4 w-4" /> Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
            <CardContent className="pt-4">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-display text-lg">{collection.name}</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    {collection.description}
                  </p>
                </div>
                <Badge
                  variant="secondary"
                  className={
                    collection.status === "active"
                      ? "bg-green-500/10 text-green-500"
                      : "bg-muted text-muted-foreground"
                  }
                >
                  {collection.status}
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground mt-3">
                {collection.productCount} products
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
