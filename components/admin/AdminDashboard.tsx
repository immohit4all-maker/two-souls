"use client";

import { FormEvent, ReactNode, useEffect, useMemo, useState } from "react";

// Types matching database schema
type Product = { id: string; name: string; sku: string; seller: { name: string }; category: string; price: number; inventory: number; status: "ACTIVE" | "DRAFT" | "ARCHIVED" };
type Order = { id: string; customer: { name: string | null }; items: { name: string; quantity: number }[]; total: number; createdAt: string; status: "PENDING" | "CONFIRMED" | "PROCESSING" | "SHIPPED" | "DELIVERED" | "CANCELLED" };
type Seller = { id: string; name: string; contactName: string; email: string; products: { length: number }; status: "PENDING" | "ACTIVE" | "SUSPENDED" };

const money = (value: number | string) => new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(Number(value));
const Icon = ({ children }: { children: ReactNode }) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-5 w-5">{children}</svg>;

export default function AdminDashboard() {
  const [section, setSection] = useState<"Overview" | "Products" | "Orders" | "Sellers">("Overview");
  const [products, setProducts] = useState<Product[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [sellers, setSellers] = useState<Seller[]>([]);
  const [search, setSearch] = useState("");
  const [showProductForm, setShowProductForm] = useState(false);
  const [notice, setNotice] = useState("");

  useEffect(() => {
    fetch("/api/admin/products").then(res => res.json()).then(setProducts);
    fetch("/api/admin/orders").then(res => res.json()).then(setOrders);
    fetch("/api/admin/sellers").then(res => res.json()).then(setSellers);
  }, []);

  const lowStock = products.filter((product) => product.inventory < 8).length;
  const filteredProducts = useMemo(() => products.filter((product) => `${product.name} ${product.sku} ${product.seller.name}`.toLowerCase().includes(search.toLowerCase())), [products, search]);
  const filteredOrders = useMemo(() => orders.filter((order) => `${order.id} ${order.customer.name}`.toLowerCase().includes(search.toLowerCase())), [orders, search]);
  
  const flash = (message: string) => { setNotice(message); window.setTimeout(() => setNotice(""), 2600); };
  
  const changeOrderStatus = async (id: string, status: Order["status"]) => {
    await fetch("/api/admin/orders", { method: "PATCH", body: JSON.stringify({ id, status }) });
    setOrders((items) => items.map((order) => order.id === id ? { ...order, status } : order));
    flash("Order status updated");
  };
  
  const approveSeller = async (id: string) => { 
    await fetch("/api/admin/sellers", { method: "PATCH", body: JSON.stringify({ id, status: "ACTIVE" }) });
    setSellers((items) => items.map((seller) => seller.id === id ? { ...seller, status: "ACTIVE" } : seller)); 
    flash("Seller approved and notified"); 
  };
  
  const addProduct = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault(); const data = new FormData(event.currentTarget);
    const body = { name: data.get("name"), sku: data.get("sku"), price: Number(data.get("price")), inventory: Number(data.get("stock")), category: data.get("category"), sellerId: data.get("seller") };
    await fetch("/api/admin/products", { method: "POST", body: JSON.stringify(body) });
    setShowProductForm(false); flash("Product created");
    fetch("/api/admin/products").then(res => res.json()).then(setProducts);
  };

  const nav = [
    ["Overview", <Icon key="o"><path d="M3 12 12 4l9 8v8a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1v-8Z" /></Icon>],
    ["Products", <Icon key="p"><path d="m21 8-9 5-9-5 9-5 9 5Z" /><path d="m3 12 9 5 9-5M3 16l9 5 9-5" /></Icon>],
    ["Orders", <Icon key="r"><path d="M5 3h14v18H5z" /><path d="M8 7h8M8 11h8M8 15h5" /></Icon>],
    ["Sellers", <Icon key="s"><circle cx="12" cy="8" r="3" /><path d="M5 21a7 7 0 0 1 14 0" /></Icon>],
  ] as const;

  return <div className="min-h-screen bg-[#f6f5f1] text-[#20211e]">
    <aside className="fixed inset-y-0 left-0 z-20 hidden w-64 flex-col bg-[#20231f] px-5 py-7 text-white md:flex">
      <a href="/" className="mb-12 px-3 font-serif text-2xl tracking-[0.12em]">TWO SOULS<span className="block pt-1 font-sans text-[9px] font-medium tracking-[0.32em] text-[#cfad6d]">ADMIN STUDIO</span></a>
      <nav className="space-y-2">{nav.map(([name, icon]) => <button key={name} onClick={() => { setSection(name); setSearch(""); }} className={`flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-sm transition ${section === name ? "bg-[#c99c4f] text-white shadow-lg" : "text-[#c6c7c0] hover:bg-white/10 hover:text-white"}`}>{icon}<span>{name}</span>{name === "Orders" && <span className="ml-auto rounded-full bg-white/15 px-2 py-0.5 text-[10px]">{orders.filter(o => o.status === "PENDING").length}</span>}</button>)}</nav>
    </aside>
    <main className="md:ml-64">
      <header className="sticky top-0 z-10 flex min-h-20 items-center justify-between border-b border-[#dfdfd6] bg-[#f6f5f1]/95 px-5 backdrop-blur md:px-10"><div><p className="text-xs font-medium uppercase tracking-[0.18em] text-[#8a8174]">Management workspace</p><h1 className="mt-1 font-serif text-2xl">{section}</h1></div></header>
      <div className="mx-auto max-w-7xl p-5 md:p-10">
        {notice && <div className="fixed right-5 top-24 z-30 rounded-xl bg-[#273428] px-4 py-3 text-sm text-white shadow-xl">{notice}</div>}
        {section === "Overview" && <Overview products={products} orders={orders} sellers={sellers} lowStock={lowStock} onSection={setSection} />}
        {section === "Products" && <Products products={filteredProducts} search={search} onSearch={setSearch} onNew={() => setShowProductForm(true)} />}
        {section === "Orders" && <Orders orders={filteredOrders} search={search} onSearch={setSearch} onAdvance={changeOrderStatus} />}
        {section === "Sellers" && <Sellers sellers={sellers} onApprove={approveSeller} />}
      </div>
    </main>
    {showProductForm && <ProductModal sellers={sellers.filter((seller) => seller.status === "ACTIVE")} onClose={() => setShowProductForm(false)} onSubmit={addProduct} />}
  </div>;
}

function Overview({ products, orders, sellers, lowStock, onSection }: { products: Product[]; orders: Order[]; sellers: Seller[]; lowStock: number; onSection: (section: "Overview" | "Products" | "Orders" | "Sellers") => void }) { return <>
  <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-end"><div><h2 className="font-serif text-3xl">Good morning, Mohit.</h2><p className="mt-2 text-sm text-[#77766d]">Here’s what needs your attention today.</p></div><button onClick={() => onSection("Products")} className="rounded-lg bg-[#20231f] px-4 py-2.5 text-sm font-medium text-white hover:bg-[#3a3e37]">+ Add a product</button></div>
  <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4"><Metric label="Active products" value={String(products.filter((p) => p.status === "ACTIVE").length)} trend={`${lowStock} low-stock alerts`} /><Metric label="Orders to fulfil" value={String(orders.filter(o => o.status === "PENDING").length)} trend="Need action today" /><Metric label="Partner sellers" value={String(sellers.filter((s) => s.status === "ACTIVE").length)} trend={`${sellers.filter(s => s.status === "PENDING").length} pending approval`} /></div>
</> }
function Metric({ label, value, trend }: { label: string; value: string; trend: string }) { return <div className="rounded-2xl border border-[#e0dfd6] bg-white p-5"><p className="text-xs font-medium text-[#74736d]">{label}</p><p className="mt-3 font-serif text-3xl">{value}</p><p className="mt-2 text-xs text-[#5c7655]">{trend}</p></div> }
function Products({ products, search, onSearch, onNew }: { products: Product[]; search: string; onSearch: (value: string) => void; onNew: () => void }) { return <><Toolbar placeholder="Search products, SKU or seller..." value={search} onChange={onSearch} action="+ New product" onAction={onNew} /><section className="overflow-hidden rounded-2xl border border-[#e0dfd6] bg-white"><div className="overflow-x-auto"><table className="w-full min-w-[760px] text-left text-sm"><thead className="bg-[#fbfaf7] text-[11px] uppercase tracking-wider text-[#7d7a70]"><tr><th className="px-5 py-3 font-medium">Product</th><th className="px-4 py-3 font-medium">Seller</th><th className="px-4 py-3 font-medium">Price</th><th className="px-4 py-3 font-medium">Inventory</th><th className="px-4 py-3 font-medium">Status</th></tr></thead><tbody>{products.map((product) => <tr key={product.id} className="border-t border-[#f0efe9]"><td className="px-5 py-4"><p className="font-medium">{product.name}</p><p className="mt-0.5 text-xs text-[#8b887f]">{product.sku} · {product.category}</p></td><td className="px-4 py-4 text-[#66645d]">{product.seller.name}</td><td className="px-4 py-4">{money(product.price)}</td><td className="px-4 py-4"><span className={product.inventory < 8 ? "font-medium text-[#b16e2a]" : "text-[#55564f]"}>{product.inventory} units</span></td><td className="px-4 py-4"><Status status={product.status} /></td></tr>)}</tbody></table></div></section></> }
function Orders({ orders, search, onSearch, onAdvance }: { orders: Order[]; search: string; onSearch: (value: string) => void; onAdvance: (id: string, status: Order["status"]) => void }) { return <><Toolbar placeholder="Search order or customer..." value={search} onChange={onSearch} action="Export orders" onAction={() => window.print()} /><section className="overflow-hidden rounded-2xl border border-[#e0dfd6] bg-white"><div className="overflow-x-auto"><table className="w-full min-w-[650px] text-left text-sm"><thead className="bg-[#fbfaf7] text-[11px] uppercase tracking-wider text-[#7d7a70]"><tr><th className="px-5 py-3 font-medium">Order</th><th className="px-4 py-3 font-medium">Customer</th><th className="px-4 py-3 font-medium">Total</th><th className="px-4 py-3 font-medium">Status</th></tr></thead><tbody>{orders.map((order) => <tr key={order.id} className="border-t border-[#f0efe9]"><td className="px-5 py-4"><p className="font-medium">{order.id}</p><p className="mt-0.5 text-xs text-[#8b887f]">{order.items.length} items</p></td><td className="px-4 py-4 text-[#5c5c55]">{order.customer.name || "N/A"}</td><td className="px-4 py-4 font-medium">{money(order.total)}</td><td className="px-4 py-4"><Status status={order.status} /></td><td className="px-5 py-4 text-right">{order.status !== "DELIVERED" && <button onClick={() => onAdvance(order.id, "SHIPPED")} className="text-xs font-medium text-[#a8782e]">Advance →</button>}</td></tr>)}</tbody></table></div></section></> }
function Sellers({ sellers, onApprove }: { sellers: Seller[]; onApprove: (id: string) => void }) { return <div className="grid gap-4 lg:grid-cols-2">{sellers.map((seller) => <article key={seller.id} className="rounded-2xl border border-[#e0dfd6] bg-white p-5"><div className="flex items-start justify-between"><h3 className="font-medium">{seller.name}</h3><Status status={seller.status} /></div><p className="text-xs text-[#85837b]">{seller.contactName} · {seller.email}</p>{seller.status === "PENDING" && <button onClick={() => onApprove(seller.id)} className="mt-4 rounded-md bg-[#c99c4f] px-3 py-1.5 text-xs font-medium text-white">Approve seller</button>}</article>)}</div> }
function Toolbar({ placeholder, value, onChange, action, onAction }: { placeholder: string; value: string; onChange: (value: string) => void; action: string; onAction: () => void }) { return <div className="mb-7 flex flex-col justify-between gap-3 sm:flex-row"><label className="flex max-w-md flex-1 items-center gap-2 rounded-lg border border-[#ddd9cf] bg-white px-3 py-2.5"><span className="text-[#8a887e]">⌕</span><input value={value} onChange={(event) => onChange(event.target.value)} placeholder={placeholder} className="w-full bg-transparent text-sm outline-none placeholder:text-[#a6a399]" /></label><button onClick={onAction} className="rounded-lg bg-[#20231f] px-4 py-2.5 text-sm font-medium text-white hover:bg-[#3a3e37]">{action}</button></div> }
function Status({ status }: { status: string }) { const style: Record<string, string> = { ACTIVE: "bg-[#eaf2e6] text-[#52734e]", DRAFT: "bg-[#f1f0eb] text-[#77756d]", PENDING: "bg-[#f8edd9] text-[#a5712a]", PROCESSING: "bg-[#e8f0f4] text-[#477086]", SHIPPED: "bg-[#eee9f4] text-[#705a91]", DELIVERED: "bg-[#eaf2e6] text-[#52734e]", SUSPENDED: "bg-[#fde8e8] text-[#9b1c1c]" }; return <span className={`rounded-full px-2.5 py-1 text-[11px] font-medium ${style[status] || style.Draft}`}>{status}</span> }
function ProductModal({ sellers, onClose, onSubmit }: { sellers: Seller[]; onClose: () => void; onSubmit: (event: FormEvent<HTMLFormElement>) => void }) { return <div className="fixed inset-0 z-40 flex items-center justify-center bg-[#1e211e]/45 p-4"><form onSubmit={onSubmit} className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl"><div className="flex items-center justify-between"><div><h2 className="font-serif text-2xl">New product</h2></div><button type="button" onClick={onClose} className="text-xl text-[#777]">×</button></div><div className="mt-6 grid gap-4 sm:grid-cols-2"><Field name="name" label="Product name" required /><Field name="sku" label="SKU" required /><Field name="price" label="Price (INR)" type="number" required /><Field name="stock" label="Initial stock" type="number" required /><label className="flex flex-col gap-1.5 text-xs font-medium text-[#5f5e58]"><span>Seller</span><select name="seller" className="rounded-lg border border-[#ddd9cf] px-3 py-2.5 text-sm outline-none">{sellers.map((seller) => <option key={seller.id} value={seller.id}>{seller.name}</option>)}</select></label></div><div className="mt-7 flex justify-end gap-3"><button type="button" onClick={onClose} className="px-4 py-2.5 text-sm text-[#66645d]">Cancel</button><button className="rounded-lg bg-[#20231f] px-4 py-2.5 text-sm font-medium text-white">Save</button></div></form></div> }
function Field({ name, label, type = "text", required = false }: { name: string; label: string; type?: string; required?: boolean }) { return <label className="flex flex-col gap-1.5 text-xs font-medium text-[#5f5e58]"><span>{label}</span><input name={name} type={type} required={required} min={type === "number" ? 0 : undefined} className="rounded-lg border border-[#ddd9cf] px-3 py-2.5 text-sm outline-none focus:border-[#c99c4f]" /></label> }
