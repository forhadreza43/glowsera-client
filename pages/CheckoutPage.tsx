"use client"
import { useState } from "react";
import Link from "next/link";
import { useCart } from "@/stores/cartStore";
import { CartItem } from "@/types";

const steps = ["Information", "Shipping", "Payment", "Review"];

const CheckoutPage = () => {
  const { items, subtotal } = useCart();
  const [step, setStep] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState("cod");

  if (items.length === 0) {
    return (
      <div className="container-narrow py-20 text-center">
        <h1 className="font-heading text-2xl">Your cart is empty</h1>
        <Link href="/shop" className="btn-rose mt-6 inline-block">Shop Now</Link>
      </div>
    );
  }

  return (
    <div className="container-narrow py-8 md:py-12">
      <h1 className="font-heading text-3xl md:text-4xl font-light mb-8">Checkout</h1>

      {/* Steps */}
      <div className="flex items-center gap-2 mb-10">
        {steps.map((s, i) => (
          <div key={s} className="flex items-center gap-2">
            <button onClick={() => i <= step && setStep(i)}
              className={`text-xs tracking-wider uppercase font-body ${i === step ? "text-foreground font-semibold" : i < step ? "text-rose-gold" : "text-muted-foreground"}`}>
              {s}
            </button>
            {i < steps.length - 1 && <span className="text-border">—</span>}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2">
          {step === 0 && (
            <div className="space-y-4">
              <h2 className="font-heading text-xl mb-4">Contact Information</h2>
              <input type="text" placeholder="Full Name" className="w-full px-4 py-3 text-sm border border-border rounded-sm bg-background font-body focus:outline-none focus:ring-1 focus:ring-rose-gold" />
              <input type="email" placeholder="Email Address" className="w-full px-4 py-3 text-sm border border-border rounded-sm bg-background font-body focus:outline-none focus:ring-1 focus:ring-rose-gold" />
              <input type="tel" placeholder="Phone Number" className="w-full px-4 py-3 text-sm border border-border rounded-sm bg-background font-body focus:outline-none focus:ring-1 focus:ring-rose-gold" />
              <button onClick={() => setStep(1)} className="btn-rose mt-4">Continue to Shipping</button>
            </div>
          )}

          {step === 1 && (
            <div className="space-y-4">
              <h2 className="font-heading text-xl mb-4">Shipping Address</h2>
              <input type="text" placeholder="Street Address" className="w-full px-4 py-3 text-sm border border-border rounded-sm bg-background font-body focus:outline-none focus:ring-1 focus:ring-rose-gold" />
              <div className="grid grid-cols-2 gap-4">
                <input type="text" placeholder="City" className="px-4 py-3 text-sm border border-border rounded-sm bg-background font-body focus:outline-none focus:ring-1 focus:ring-rose-gold" />
                <input type="text" placeholder="Postal Code" className="px-4 py-3 text-sm border border-border rounded-sm bg-background font-body focus:outline-none focus:ring-1 focus:ring-rose-gold" />
              </div>
              <button onClick={() => setStep(2)} className="btn-rose mt-4">Continue to Payment</button>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <h2 className="font-heading text-xl mb-4">Payment Method</h2>
              {[
                { id: "cod", label: "Cash on Delivery", desc: "Pay when you receive your order" },
                { id: "ssl", label: "Online Payment", desc: "Credit/Debit Card, Mobile Banking" },
              ].map(method => (
                <label key={method.id}
                  className={`flex items-start gap-4 p-4 border rounded-sm cursor-pointer transition-colors ${paymentMethod === method.id ? "border-rose-gold bg-rose-gold-light" : "border-border hover:border-muted-foreground"}`}>
                  <input type="radio" name="payment" value={method.id} checked={paymentMethod === method.id}
                    onChange={() => setPaymentMethod(method.id)} className="mt-1 accent-rose-gold" />
                  <div>
                    <p className="text-sm font-medium font-body">{method.label}</p>
                    <p className="text-xs text-muted-foreground font-body">{method.desc}</p>
                  </div>
                </label>
              ))}
              <button onClick={() => setStep(3)} className="btn-rose mt-4">Review Order</button>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6">
              <h2 className="font-heading text-xl mb-4">Order Review</h2>
              <div className="space-y-4">
                {items.map((item: CartItem) => (
                  <div key={item.product.id} className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-secondary rounded-sm flex-shrink-0" />
                    <div className="flex-1">
                      <p className="text-sm font-body font-medium">{item.product.name}</p>
                      <p className="text-xs text-muted-foreground font-body">Qty: {item.quantity}</p>
                    </div>
                    <p className="text-sm font-semibold font-body">৳{((item.product.discountPrice || item.product.price) * item.quantity).toLocaleString()}</p>
                  </div>
                ))}
              </div>
              <button className="btn-rose w-full mt-6">Place Order — ৳{subtotal.toLocaleString()}</button>
            </div>
          )}
        </div>

        {/* Order summary */}
        <div>
          <div className="bg-secondary p-6 rounded-sm sticky top-24">
            <h3 className="font-heading text-lg font-semibold mb-4">Summary</h3>
            <div className="space-y-2 text-sm font-body">
              <div className="flex justify-between"><span className="text-muted-foreground">Items ({items.length})</span><span>৳{subtotal.toLocaleString()}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Shipping</span><span className="text-green-600">Free</span></div>
              <div className="border-t border-border pt-3 flex justify-between font-semibold text-base mt-2">
                <span>Total</span><span>৳{subtotal.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
