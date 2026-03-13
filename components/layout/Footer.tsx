import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-foreground text-primary-foreground">
      <div className="container-narrow py-16">
        <div className="container-narrow mx-auto max-w-xl text-center">
          <h2 className="font-heading text-3xl font-light md:text-4xl">
            Join the Glow
          </h2>
          <p className="mt-3 font-body text-sm text-background/70">
            Subscribe to receive exclusive offers, new product launches, and
            skincare tips.
          </p>
          <div className="mx-auto mt-6 flex max-w-md">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 rounded-l-sm bg-background/10 px-4 py-3 font-body text-sm text-background placeholder:text-background/40 focus:outline-none"
            />
            <button className="btn-rose rounded-l-none">Subscribe</button>
          </div>
        </div>
        <div className="my-12 border-t border-primary-foreground/10"></div>
        <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
          {/* Brand */}
          <div className="md:col-span-1">
            <h3 className="mb-4 font-heading text-2xl font-semibold">
              Glowsera
            </h3>
            <p className="font-body text-sm leading-relaxed text-primary-foreground/70">
              Your trusted destination for authentic skincare & beauty products.
              Glow with confidence.
            </p>
          </div>

          {/* Shop */}
          <div>
            <h4 className="mb-4 font-body text-xs font-semibold tracking-widest uppercase">
              Shop
            </h4>
            <ul className="space-y-2.5">
              {[
                "Serums",
                "Moisturizers",
                "Cleansers",
                "Sunscreen",
                "Hair Care",
                "Face Masks",
              ].map((item) => (
                <li key={item}>
                  <Link
                    href={`/shop?category=${item.toLowerCase().replace(" ", "-")}`}
                    className="font-body text-sm text-primary-foreground/70 transition-colors hover:text-primary-foreground"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Help */}
          <div>
            <h4 className="mb-4 font-body text-xs font-semibold tracking-widest uppercase">
              Help
            </h4>
            <ul className="space-y-2.5">
              {[
                "Contact Us",
                "FAQs",
                "Shipping Policy",
                "Return Policy",
                "Track Order",
              ].map((item) => (
                <li key={item}>
                  <Link
                    href="/contact"
                    className="font-body text-sm text-primary-foreground/70 transition-colors hover:text-primary-foreground"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-primary-foreground/10 pt-8 md:flex-row">
          <p className="font-body text-xs text-primary-foreground/50">
            © 2026 Glowsera. All rights reserved.
          </p>
          <div className="flex gap-6">
            {["Privacy Policy", "Terms of Service"].map((item) => (
              <Link
                key={item}
                href="/"
                className="font-body text-xs text-primary-foreground/50 transition-colors hover:text-primary-foreground/70"
              >
                {item}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
};

export default Footer;
