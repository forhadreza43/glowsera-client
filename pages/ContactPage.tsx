import { Mail, Phone, MapPin } from "lucide-react";

const ContactPage = () => {
  return (
    <div className="container-narrow py-8 md:py-16">
      <div className="text-center mb-12">
        <h1 className="font-heading text-3xl md:text-4xl font-light">Get in Touch</h1>
        <p className="text-muted-foreground text-sm font-body mt-2">We'd love to hear from you</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-16 max-w-4xl mx-auto">
        <div>
          <h2 className="font-heading text-xl mb-6">Send us a message</h2>
          <div className="space-y-4">
            <input type="text" placeholder="Your Name" className="w-full px-4 py-3 text-sm border border-border rounded-sm bg-background font-body focus:outline-none focus:ring-1 focus:ring-rose-gold" />
            <input type="email" placeholder="Your Email" className="w-full px-4 py-3 text-sm border border-border rounded-sm bg-background font-body focus:outline-none focus:ring-1 focus:ring-rose-gold" />
            <textarea placeholder="Your Message" rows={5} className="w-full px-4 py-3 text-sm border border-border rounded-sm bg-background font-body focus:outline-none focus:ring-1 focus:ring-rose-gold resize-none" />
            <button className="btn-rose">Send Message</button>
          </div>
        </div>

        <div className="space-y-8">
          <h2 className="font-heading text-xl mb-6">Contact Information</h2>
          {[
            { icon: Mail, label: "Email", value: "hello@glowsera.com" },
            { icon: Phone, label: "Phone", value: "+880 1234 567 890" },
            { icon: MapPin, label: "Address", value: "Dhaka, Bangladesh" },
          ].map(item => (
            <div key={item.label} className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-rose-gold-light flex items-center justify-center flex-shrink-0">
                <item.icon size={18} className="text-rose-gold" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground font-body uppercase tracking-wider">{item.label}</p>
                <p className="text-sm font-body mt-0.5">{item.value}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
