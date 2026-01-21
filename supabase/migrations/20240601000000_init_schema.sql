-- Enable necessary extensions
create extension if not exists "uuid-ossp";

-- PROFILES
create table if not exists profiles (
  id uuid references auth.users on delete cascade primary key,
  email text unique not null,
  first_name text,
  last_name text,
  avatar_url text,
  role text default 'customer' check (role in ('customer', 'admin', 'manager', 'owner')),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table profiles enable row level security;

create policy "Users can view own profile" on profiles
  for select using (auth.uid() = id);

create policy "Users can update own profile" on profiles
  for update using (auth.uid() = id);

create policy "Admins can view all profiles" on profiles
  for select using (
    exists (
      select 1 from profiles where id = auth.uid() and role in ('admin', 'owner', 'manager')
    )
  );

create policy "Admins can update all profiles" on profiles
  for update using (
    exists (
      select 1 from profiles where id = auth.uid() and role in ('admin', 'owner', 'manager')
    )
  );

-- PRODUCTS
create table if not exists products (
  id uuid default uuid_generate_v4() primary key,
  name text not null,
  slug text unique not null,
  description text,
  price decimal(10,2) not null,
  compare_at_price decimal(10,2),
  images text[] default '{}',
  category text,
  stock integer default 0,
  is_active boolean default true,
  metadata jsonb default '{}'::jsonb,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table products enable row level security;

create policy "Public read access for products" on products
  for select using (true);

create policy "Admin write access for products" on products
  for all using (
    exists (
      select 1 from profiles where id = auth.uid() and role in ('admin', 'owner', 'manager')
    )
  );

-- CART ITEMS
create table if not exists cart_items (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references auth.users on delete cascade not null,
  product_id uuid references products on delete cascade not null,
  quantity integer default 1 check (quantity > 0),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null,
  unique(user_id, product_id)
);

alter table cart_items enable row level security;

create policy "Users can manage own cart items" on cart_items
  for all using (auth.uid() = user_id);

-- ORDERS
create table if not exists orders (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references auth.users on delete set null, -- Nullable for guest checkout if supported, but typically we want tracking
  email text not null, -- Captured for guests or users
  total decimal(10,2) not null,
  subtotal decimal(10,2) not null,
  tax decimal(10,2) default 0,
  shipping_cost decimal(10,2) default 0,
  status text default 'pending' check (status in ('pending', 'processing', 'shipped', 'delivered', 'cancelled')),
  shipping_address jsonb not null,
  billing_address jsonb,
  payment_intent_id text,
  payment_status text default 'pending',
  items jsonb not null, -- storing snapshot of items
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table orders enable row level security;

create policy "Users can view own orders" on orders
  for select using (auth.uid() = user_id);

create policy "Admins can view all orders" on orders
  for select using (
    exists (
      select 1 from profiles where id = auth.uid() and role in ('admin', 'owner', 'manager')
    )
  );

create policy "Admins can update orders" on orders
  for update using (
    exists (
      select 1 from profiles where id = auth.uid() and role in ('admin', 'owner', 'manager')
    )
  );

create policy "Users can insert orders" on orders
  for insert with check (
    auth.uid() = user_id
    -- OR (auth.uid() IS NULL) for guest checkout? Requires stricter check or different flow
  );

-- Function to handle new user signup
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, email, first_name, last_name, role)
  values (
    new.id,
    new.email,
    new.raw_user_meta_data->>'firstName',
    new.raw_user_meta_data->>'lastName',
    coalesce(new.raw_user_meta_data->>'role', 'customer')
  );
  return new;
end;
$$ language plpgsql security definer;

-- Trigger for new user signup
drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- Helper indices
create index if not exists idx_products_category on products(category);
create index if not exists idx_products_slug on products(slug);
create index if not exists idx_orders_user_id on orders(user_id);
create index if not exists idx_cart_items_user_id on cart_items(user_id);
