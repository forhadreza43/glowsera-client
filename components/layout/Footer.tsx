import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-foreground text-primary-foreground">
      <div className="container-narrow py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="md:col-span-1">
            <h3 className="font-heading text-2xl font-semibold mb-4">Glowsera</h3>
            <p className="text-sm text-primary-foreground/70 leading-relaxed font-body">
              Your trusted destination for authentic skincare & beauty products. Glow with confidence.
            </p>
          </div>

          {/* Shop */}
          <div>
            <h4 className="text-xs uppercase tracking-widest font-body font-semibold mb-4">Shop</h4>
            <ul className="space-y-2.5">
              {["Serums", "Moisturizers", "Cleansers", "Sunscreen", "Hair Care", "Face Masks"].map(item => (
                <li key={item}>
                  <Link href={`/shop?category=${item.toLowerCase().replace(" ", "-")}`} className="text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors font-body">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Help */}
          <div>
            <h4 className="text-xs uppercase tracking-widest font-body font-semibold mb-4">Help</h4>
            <ul className="space-y-2.5">
              {["Contact Us", "FAQs", "Shipping Policy", "Return Policy", "Track Order"].map(item => (
                <li key={item}>
                  <Link href="/contact" className="text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors font-body">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-xs uppercase tracking-widest font-body font-semibold mb-4">Stay Updated</h4>
            <p className="text-sm text-primary-foreground/70 mb-4 font-body">Subscribe for exclusive offers and skincare tips.</p>
            <div className="flex">
              <input
                type="email"
                placeholder="Your email"
                className="flex-1 px-4 py-2.5 bg-primary-foreground/10 text-sm text-primary-foreground placeholder:text-primary-foreground/40 rounded-l-sm focus:outline-none font-body"
              />
              <button className="px-5 py-2.5 bg-rose-gold text-accent-foreground text-xs tracking-wider uppercase font-medium rounded-r-sm hover:bg-rose-gold/85 transition-colors">
                Join
              </button>
            </div>
          </div>
        </div>

        <div className="border-t border-primary-foreground/10 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-primary-foreground/50 font-body">© 2026 Glowsera. All rights reserved.</p>
          <div className="flex gap-6">
            {["Privacy Policy", "Terms of Service"].map(item => (
              <Link key={item} href="/" className="text-xs text-primary-foreground/50 hover:text-primary-foreground/70 transition-colors font-body">
                {item}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
