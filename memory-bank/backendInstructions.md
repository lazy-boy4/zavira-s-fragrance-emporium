# Backend Integration Instructions

This document provides comprehensive instructions for the backend developer/agent to integrate the Zavira e-commerce frontend with a Go/PostgreSQL backend.

## Table of Contents
1. [Project Overview](#project-overview)
2. [Database Schema](#database-schema)
3. [API Specifications](#api-specifications)
4. [Authentication & Authorization](#authentication--authorization)
5. [Integration Checklist](#integration-checklist)

---

## Project Overview

### Current State
- **Frontend**: Complete visitor and admin dashboard UI built with React, TypeScript, Tailwind CSS
- **Backend**: Not yet implemented (mock data currently in use)
- **Target Stack**: Go backend with PostgreSQL database

### Architecture Pattern
```
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│   React SPA     │────▶│   Go REST API   │────▶│   PostgreSQL    │
│   (Vite)        │◀────│   (or gRPC)     │◀────│   Database      │
└─────────────────┘     └─────────────────┘     └─────────────────┘
```

---

## Database Schema

### Core Tables

#### 1. Users & Authentication

```sql
-- User roles enum
CREATE TYPE user_role AS ENUM ('owner', 'manager', 'staff', 'customer');

-- Users table (extends Supabase auth.users or custom)
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    phone VARCHAR(20),
    avatar_url TEXT,
    email_verified BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- User roles (separate table for security - prevents privilege escalation)
CREATE TABLE user_roles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE NOT NULL,
    role user_role NOT NULL,
    UNIQUE (user_id, role)
);

-- Role checking function (security definer to bypass RLS)
CREATE OR REPLACE FUNCTION has_role(_user_id UUID, _role user_role)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
    SELECT EXISTS (
        SELECT 1 FROM user_roles
        WHERE user_id = _user_id AND role = _role
    )
$$;
```

#### 2. Products

```sql
CREATE TABLE products (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    slug VARCHAR(255) UNIQUE NOT NULL,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    short_description VARCHAR(500),
    price DECIMAL(10, 2) NOT NULL,
    compare_at_price DECIMAL(10, 2), -- Original price for discounts
    cost_per_item DECIMAL(10, 2),    -- Cost for profit calculation
    sku VARCHAR(100),
    barcode VARCHAR(100),
    
    -- Inventory
    track_quantity BOOLEAN DEFAULT TRUE,
    quantity INTEGER DEFAULT 0,
    low_stock_threshold INTEGER DEFAULT 10,
    
    -- Fragrance specific
    fragrance_family VARCHAR(100),   -- e.g., "Woody", "Floral", "Oriental"
    top_notes TEXT[],                -- Array of top notes
    heart_notes TEXT[],              -- Array of heart notes
    base_notes TEXT[],               -- Array of base notes
    concentration VARCHAR(50),        -- e.g., "Eau de Parfum", "Parfum"
    volume_ml INTEGER,
    
    -- SEO
    meta_title VARCHAR(60),
    meta_description VARCHAR(160),
    
    -- Status
    status VARCHAR(20) DEFAULT 'draft', -- draft, active, archived
    featured BOOLEAN DEFAULT FALSE,
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    created_by UUID REFERENCES users(id),
    
    -- Indexes
    INDEX idx_products_status (status),
    INDEX idx_products_featured (featured),
    INDEX idx_products_slug (slug)
);

-- Product images
CREATE TABLE product_images (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    product_id UUID REFERENCES products(id) ON DELETE CASCADE,
    url TEXT NOT NULL,
    alt_text VARCHAR(255),
    position INTEGER DEFAULT 0,
    is_primary BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Product variants (for different sizes)
CREATE TABLE product_variants (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    product_id UUID REFERENCES products(id) ON DELETE CASCADE,
    name VARCHAR(100) NOT NULL,      -- e.g., "30ml", "50ml", "100ml"
    sku VARCHAR(100),
    price DECIMAL(10, 2) NOT NULL,
    compare_at_price DECIMAL(10, 2),
    quantity INTEGER DEFAULT 0,
    volume_ml INTEGER,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

#### 3. Collections

```sql
CREATE TABLE collections (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    slug VARCHAR(255) UNIQUE NOT NULL,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    image_url TEXT,
    
    -- SEO
    meta_title VARCHAR(60),
    meta_description VARCHAR(160),
    
    -- Display
    is_featured BOOLEAN DEFAULT FALSE,
    sort_order INTEGER DEFAULT 0,
    
    -- Status
    status VARCHAR(20) DEFAULT 'active', -- active, hidden
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Product-Collection relationship (many-to-many)
CREATE TABLE product_collections (
    product_id UUID REFERENCES products(id) ON DELETE CASCADE,
    collection_id UUID REFERENCES collections(id) ON DELETE CASCADE,
    position INTEGER DEFAULT 0,
    PRIMARY KEY (product_id, collection_id)
);
```

#### 4. Orders

```sql
CREATE TYPE order_status AS ENUM (
    'pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled', 'refunded'
);

CREATE TYPE payment_status AS ENUM (
    'pending', 'paid', 'failed', 'refunded', 'partially_refunded'
);

CREATE TABLE orders (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    order_number VARCHAR(50) UNIQUE NOT NULL, -- e.g., "ZAV-2024-0001"
    
    -- Customer
    customer_id UUID REFERENCES users(id),
    customer_email VARCHAR(255) NOT NULL,
    customer_phone VARCHAR(20),
    
    -- Addresses (stored as JSONB for flexibility)
    shipping_address JSONB NOT NULL,
    billing_address JSONB,
    
    -- Pricing
    subtotal DECIMAL(10, 2) NOT NULL,
    shipping_cost DECIMAL(10, 2) DEFAULT 0,
    tax_amount DECIMAL(10, 2) DEFAULT 0,
    discount_amount DECIMAL(10, 2) DEFAULT 0,
    total DECIMAL(10, 2) NOT NULL,
    currency VARCHAR(3) DEFAULT 'USD',
    
    -- Status
    status order_status DEFAULT 'pending',
    payment_status payment_status DEFAULT 'pending',
    
    -- Shipping
    shipping_method VARCHAR(100),
    tracking_number VARCHAR(100),
    shipped_at TIMESTAMP WITH TIME ZONE,
    delivered_at TIMESTAMP WITH TIME ZONE,
    
    -- Discount
    discount_code VARCHAR(50),
    
    -- Notes
    customer_notes TEXT,
    internal_notes TEXT,
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    INDEX idx_orders_status (status),
    INDEX idx_orders_customer (customer_id),
    INDEX idx_orders_created (created_at DESC)
);

-- Order items
CREATE TABLE order_items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    order_id UUID REFERENCES orders(id) ON DELETE CASCADE,
    product_id UUID REFERENCES products(id),
    variant_id UUID REFERENCES product_variants(id),
    
    -- Snapshot of product at time of order
    product_name VARCHAR(255) NOT NULL,
    variant_name VARCHAR(100),
    sku VARCHAR(100),
    
    quantity INTEGER NOT NULL,
    unit_price DECIMAL(10, 2) NOT NULL,
    total_price DECIMAL(10, 2) NOT NULL,
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Order timeline/history
CREATE TABLE order_events (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    order_id UUID REFERENCES orders(id) ON DELETE CASCADE,
    event_type VARCHAR(50) NOT NULL,  -- e.g., "status_changed", "note_added", "shipped"
    description TEXT,
    metadata JSONB,
    created_by UUID REFERENCES users(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

#### 5. Customers

```sql
-- Customer extends users with e-commerce specific data
CREATE TABLE customer_profiles (
    user_id UUID PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
    
    -- Stats (denormalized for performance)
    total_orders INTEGER DEFAULT 0,
    total_spent DECIMAL(12, 2) DEFAULT 0,
    average_order_value DECIMAL(10, 2) DEFAULT 0,
    
    -- Preferences
    preferred_fragrance_families TEXT[],
    
    -- Marketing
    accepts_marketing BOOLEAN DEFAULT FALSE,
    marketing_opt_in_date TIMESTAMP WITH TIME ZONE,
    
    -- Tags for segmentation
    tags TEXT[],
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Customer addresses
CREATE TABLE customer_addresses (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    
    label VARCHAR(50),                -- e.g., "Home", "Work"
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    company VARCHAR(255),
    address_line1 VARCHAR(255) NOT NULL,
    address_line2 VARCHAR(255),
    city VARCHAR(100) NOT NULL,
    state VARCHAR(100),
    postal_code VARCHAR(20) NOT NULL,
    country VARCHAR(100) NOT NULL,
    phone VARCHAR(20),
    
    is_default_shipping BOOLEAN DEFAULT FALSE,
    is_default_billing BOOLEAN DEFAULT FALSE,
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

#### 6. Discounts

```sql
CREATE TYPE discount_type AS ENUM ('percentage', 'fixed_amount', 'free_shipping');

CREATE TABLE discounts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    code VARCHAR(50) UNIQUE NOT NULL,
    description TEXT,
    
    -- Discount details
    type discount_type NOT NULL,
    value DECIMAL(10, 2) NOT NULL,     -- Percentage or fixed amount
    
    -- Limits
    minimum_purchase DECIMAL(10, 2),   -- Minimum order amount
    maximum_uses INTEGER,               -- Total uses allowed
    uses_per_customer INTEGER DEFAULT 1,
    current_uses INTEGER DEFAULT 0,
    
    -- Validity
    starts_at TIMESTAMP WITH TIME ZONE,
    expires_at TIMESTAMP WITH TIME ZONE,
    is_active BOOLEAN DEFAULT TRUE,
    
    -- Restrictions
    applies_to_collections UUID[],      -- Specific collections only
    applies_to_products UUID[],         -- Specific products only
    excluded_products UUID[],
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    created_by UUID REFERENCES users(id),
    
    INDEX idx_discounts_code (code),
    INDEX idx_discounts_active (is_active, starts_at, expires_at)
);
```

#### 7. Content Management

```sql
CREATE TABLE content_pages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    slug VARCHAR(255) UNIQUE NOT NULL,
    title VARCHAR(255) NOT NULL,
    content TEXT,                       -- HTML or Markdown
    
    -- SEO
    meta_title VARCHAR(60),
    meta_description VARCHAR(160),
    
    -- Status
    status VARCHAR(20) DEFAULT 'draft', -- draft, published
    published_at TIMESTAMP WITH TIME ZONE,
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_by UUID REFERENCES users(id)
);

-- Store settings (key-value store for flexibility)
CREATE TABLE store_settings (
    key VARCHAR(100) PRIMARY KEY,
    value JSONB NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_by UUID REFERENCES users(id)
);

-- Example settings:
-- INSERT INTO store_settings (key, value) VALUES
-- ('store_name', '"Zavira"'),
-- ('store_email', '"contact@zavira.com"'),
-- ('shipping_rates', '[{"name":"Standard","price":10,"days":"5-7"},{"name":"Express","price":25,"days":"2-3"}]'),
-- ('tax_rates', '[{"country":"US","rate":0.08}]'),
-- ('policies', '{"privacy":"...","terms":"...","shipping":"..."}');
```

#### 8. Wishlist & Cart

```sql
-- Wishlist
CREATE TABLE wishlists (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    product_id UUID REFERENCES products(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE (user_id, product_id)
);

-- Persistent cart (for logged-in users)
CREATE TABLE carts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE UNIQUE,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE cart_items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    cart_id UUID REFERENCES carts(id) ON DELETE CASCADE,
    product_id UUID REFERENCES products(id) ON DELETE CASCADE,
    variant_id UUID REFERENCES product_variants(id),
    quantity INTEGER NOT NULL DEFAULT 1,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE (cart_id, product_id, variant_id)
);
```

---

## API Specifications

### Base URL
```
Production: https://api.zavira.com/v1
Development: http://localhost:8080/v1
```

### Authentication
All authenticated endpoints require:
```
Authorization: Bearer <jwt_token>
```

### Response Format
```json
{
    "success": true,
    "data": { ... },
    "meta": {
        "page": 1,
        "per_page": 20,
        "total": 100,
        "total_pages": 5
    },
    "error": null
}
```

### Error Format
```json
{
    "success": false,
    "data": null,
    "error": {
        "code": "VALIDATION_ERROR",
        "message": "Invalid input",
        "details": [
            { "field": "email", "message": "Invalid email format" }
        ]
    }
}
```

---

### Public Endpoints (No Auth Required)

#### Products

```
GET /products
    Query params:
        - page (int, default: 1)
        - per_page (int, default: 20, max: 100)
        - collection (string, slug)
        - fragrance_family (string)
        - min_price (decimal)
        - max_price (decimal)
        - sort (string: "price_asc", "price_desc", "newest", "featured")
        - search (string)
    
GET /products/:slug
    Returns: Full product with images, variants, and related products

GET /collections
    Returns: All active collections

GET /collections/:slug
    Returns: Collection details with products
```

#### Content

```
GET /pages/:slug
    Returns: Page content (privacy, terms, etc.)

GET /settings/public
    Returns: Store name, contact info, shipping rates (public settings only)
```

#### Search

```
GET /search
    Query params:
        - q (string, required)
        - type (string: "products", "collections", "all")
        - limit (int, default: 10)
```

---

### Customer Endpoints (Auth Required)

#### Authentication

```
POST /auth/register
    Body: { email, password, first_name, last_name }
    Returns: { user, token }

POST /auth/login
    Body: { email, password }
    Returns: { user, token }

POST /auth/logout
    Invalidates current token

POST /auth/forgot-password
    Body: { email }

POST /auth/reset-password
    Body: { token, new_password }

GET /auth/me
    Returns: Current user profile
```

#### Profile

```
GET /profile
PUT /profile
    Body: { first_name, last_name, phone, avatar_url }

GET /profile/addresses
POST /profile/addresses
PUT /profile/addresses/:id
DELETE /profile/addresses/:id
```

#### Cart

```
GET /cart
POST /cart/items
    Body: { product_id, variant_id?, quantity }
PUT /cart/items/:id
    Body: { quantity }
DELETE /cart/items/:id
DELETE /cart
    Clears entire cart
```

#### Wishlist

```
GET /wishlist
POST /wishlist
    Body: { product_id }
DELETE /wishlist/:product_id
```

#### Orders

```
GET /orders
    Query params: page, per_page
    Returns: Customer's orders only

GET /orders/:id
    Returns: Order details (customer's own order only)

POST /orders
    Body: {
        shipping_address,
        billing_address?,
        shipping_method,
        payment_method,
        discount_code?,
        customer_notes?
    }
```

#### Discounts

```
POST /discounts/validate
    Body: { code, cart_total?, product_ids? }
    Returns: { valid, discount_type, discount_value, message }
```

---

### Admin Endpoints (Admin Auth Required)

All admin endpoints require role verification. Check `user_roles` table.

#### Dashboard

```
GET /admin/dashboard/stats
    Returns: {
        total_revenue,
        total_orders,
        total_customers,
        average_order_value,
        recent_orders,
        top_products,
        revenue_chart_data
    }
```

#### Products (Admin)

```
GET /admin/products
    Query params: page, per_page, status, search

POST /admin/products
    Body: Full product object

GET /admin/products/:id
PUT /admin/products/:id
DELETE /admin/products/:id

POST /admin/products/:id/images
    Multipart form data
DELETE /admin/products/:id/images/:image_id

POST /admin/products/:id/variants
PUT /admin/products/:id/variants/:variant_id
DELETE /admin/products/:id/variants/:variant_id

POST /admin/products/:id/duplicate
    Creates a copy of the product
```

#### Collections (Admin)

```
GET /admin/collections
POST /admin/collections
PUT /admin/collections/:id
DELETE /admin/collections/:id

PUT /admin/collections/:id/products
    Body: { product_ids: [] }
    Updates collection's products
```

#### Orders (Admin)

```
GET /admin/orders
    Query params: page, per_page, status, payment_status, date_from, date_to, search

GET /admin/orders/:id

PUT /admin/orders/:id/status
    Body: { status, notify_customer: boolean }

PUT /admin/orders/:id/shipping
    Body: { tracking_number, carrier? }

POST /admin/orders/:id/notes
    Body: { note, is_internal: boolean }

POST /admin/orders/:id/refund
    Body: { amount, reason, items? }
```

#### Customers (Admin)

```
GET /admin/customers
    Query params: page, per_page, search, sort

GET /admin/customers/:id
    Returns: Customer with orders and activity

PUT /admin/customers/:id/tags
    Body: { tags: [] }
```

#### Discounts (Admin)

```
GET /admin/discounts
POST /admin/discounts
PUT /admin/discounts/:id
DELETE /admin/discounts/:id
```

#### Team Management (Owner/Manager Only)

```
GET /admin/team
    Returns: All staff members with roles

POST /admin/team/invite
    Body: { email, role, permissions }

PUT /admin/team/:user_id/role
    Body: { role }
    Note: Only owner can change roles

DELETE /admin/team/:user_id
    Removes staff access
```

#### Content (Admin)

```
GET /admin/content/pages
PUT /admin/content/pages/:slug

GET /admin/settings
PUT /admin/settings/:key
    Body: { value }
```

#### Analytics

```
GET /admin/analytics/sales
    Query params: period (day, week, month, year), date_from, date_to

GET /admin/analytics/products
    Returns: Product performance metrics

GET /admin/analytics/customers
    Returns: Customer acquisition and retention metrics
```

---

## Authentication & Authorization

### JWT Token Structure
```json
{
    "sub": "user_uuid",
    "email": "user@example.com",
    "roles": ["owner"],
    "iat": 1234567890,
    "exp": 1234654290
}
```

### Role Permissions Matrix

| Feature | Owner | Manager | Staff | Customer |
|---------|-------|---------|-------|----------|
| View Dashboard | ✅ | ✅ | ✅ | ❌ |
| Manage Products | ✅ | ✅ | ✅ | ❌ |
| Delete Products | ✅ | ✅ | ❌ | ❌ |
| View Orders | ✅ | ✅ | ✅ | Own only |
| Update Order Status | ✅ | ✅ | ✅ | ❌ |
| Process Refunds | ✅ | ✅ | ❌ | ❌ |
| View Customers | ✅ | ✅ | ✅ | ❌ |
| Manage Discounts | ✅ | ✅ | ❌ | ❌ |
| Manage Team | ✅ | ✅ | ❌ | ❌ |
| Invite Staff | ✅ | ✅ | ❌ | ❌ |
| Change Roles | ✅ | ❌ | ❌ | ❌ |
| Store Settings | ✅ | ✅ | ❌ | ❌ |
| View Analytics | ✅ | ✅ | ❌ | ❌ |

### Middleware Example (Go)

```go
func RequireRole(allowedRoles ...string) gin.HandlerFunc {
    return func(c *gin.Context) {
        userID := c.GetString("user_id") // From JWT middleware
        
        for _, role := range allowedRoles {
            if hasRole(userID, role) {
                c.Next()
                return
            }
        }
        
        c.AbortWithStatusJSON(403, gin.H{
            "error": "Insufficient permissions",
        })
    }
}

// Usage:
adminRoutes.GET("/team", RequireRole("owner", "manager"), teamHandler.List)
adminRoutes.PUT("/team/:id/role", RequireRole("owner"), teamHandler.UpdateRole)
```

---

## Integration Checklist

### Phase 1: Foundation
- [ ] Set up PostgreSQL database with all tables
- [ ] Implement user authentication (register, login, JWT)
- [ ] Implement role-based access control
- [ ] Create base CRUD operations for products
- [ ] Set up file upload for product images

### Phase 2: E-commerce Core
- [ ] Implement collections management
- [ ] Build cart functionality
- [ ] Create order processing flow
- [ ] Implement discount code validation
- [ ] Add wishlist functionality

### Phase 3: Admin Features
- [ ] Dashboard statistics aggregation
- [ ] Order management with status updates
- [ ] Customer management
- [ ] Team/staff management
- [ ] Content page editing
- [ ] Store settings management

### Phase 4: Advanced Features
- [ ] Analytics and reporting
- [ ] Search functionality with filters
- [ ] Email notifications (order confirmation, shipping updates)
- [ ] Inventory management with low stock alerts
- [ ] Export functionality (orders, customers)

### Phase 5: Optimization
- [ ] Implement caching (Redis)
- [ ] Add rate limiting
- [ ] Set up monitoring and logging
- [ ] Performance optimization
- [ ] Security audit

---

## Frontend Integration Points

### API Client Setup (src/lib/api.ts)
```typescript
const API_BASE_URL = import.meta.env.VITE_API_URL || '/api/v1';

export const api = {
    get: <T>(endpoint: string) => fetch(`${API_BASE_URL}${endpoint}`).then(r => r.json() as T),
    post: <T>(endpoint: string, data: unknown) => 
        fetch(`${API_BASE_URL}${endpoint}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        }).then(r => r.json() as T),
    // ... put, delete
};
```

### React Query Integration
Each page component has TODO comments indicating where to integrate React Query hooks:

```typescript
// Example: src/pages/admin/ProductList.tsx
const { data: products, isLoading } = useQuery({
    queryKey: ['admin', 'products', filters],
    queryFn: () => api.get('/admin/products', { params: filters })
});
```

### Environment Variables
```env
VITE_API_URL=https://api.zavira.com/v1
```

---

## Notes for Backend Developer

1. **Slugs**: Generate URL-safe slugs from names using a library like `slugify`
2. **Order Numbers**: Use format `ZAV-YYYY-XXXX` with auto-incrementing sequence
3. **Timestamps**: Always use `TIMESTAMP WITH TIME ZONE`
4. **Soft Deletes**: Consider adding `deleted_at` column for products/orders
5. **Audit Trail**: Log all admin actions for security compliance
6. **Image Storage**: Use S3-compatible storage (AWS S3, Cloudflare R2, etc.)
7. **Email Templates**: Prepare templates for order confirmation, shipping updates, password reset

---

## What Has Been Done (Frontend)

### Visitor Pages ✅
- Home page with hero, featured products, brand story
- Shop page with product grid
- Product detail page
- Collections page
- Cart and checkout flow (shipping, payment, confirmation)
- Auth pages (login/signup)
- Profile page with orders, addresses, wishlist
- Footer pages (Privacy, Terms, FAQ, Contact, Shipping, Store Locator, etc.)
- Search functionality

### Admin Pages ✅
- Dashboard with stats and charts
- Product management (list, create, edit)
- Collection management
- Order management (list, detail, status updates)
- Customer management
- Discount management
- Team/staff management
- Content management
- Store settings

### What Needs Backend Integration
1. Replace all mock data with API calls
2. Implement authentication flow
3. Connect cart to persistent storage
4. Enable order creation and tracking
5. Set up image uploads
6. Implement search with backend
7. Add real-time inventory checks
