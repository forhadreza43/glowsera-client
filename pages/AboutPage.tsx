const AboutPage = () => {
  return (
    <div className="container-narrow py-8 md:py-16">
      <div className="text-center max-w-2xl mx-auto mb-16">
        <h1 className="font-heading text-3xl md:text-5xl font-light mb-6">About Glowsera</h1>
        <p className="text-muted-foreground text-sm font-body leading-relaxed">
          Glowsera was founded with a simple mission: to make authentic, high-quality skincare accessible to everyone.
          We believe that great skin starts with great products — and that everyone deserves to feel confident in their own skin.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        {[
          { title: "Our Mission", text: "To empower people with authentic skincare products that deliver real, visible results." },
          { title: "Our Promise", text: "Every product on Glowsera is 100% authentic, carefully sourced, and quality-verified." },
          { title: "Our Values", text: "Transparency, authenticity, and customer satisfaction drive everything we do." },
        ].map(item => (
          <div key={item.title} className="text-center p-8 bg-secondary rounded-sm">
            <h3 className="font-heading text-xl font-medium mb-3">{item.title}</h3>
            <p className="text-sm text-muted-foreground font-body leading-relaxed">{item.text}</p>
          </div>
        ))}
      </div>

      <div className="bg-foreground text-background rounded-sm p-10 md:p-16 text-center">
        <h2 className="font-heading text-3xl font-light mb-4">Join Our Community</h2>
        <p className="text-background/70 text-sm font-body max-w-md mx-auto mb-6">
          Follow us on social media for skincare tips, new launches, and exclusive offers.
        </p>
        <div className="flex justify-center gap-4">
          {["Instagram", "Facebook", "TikTok"].map(social => (
            <span key={social} className="text-xs tracking-wider uppercase border border-background/30 px-4 py-2 rounded-sm font-body hover:bg-background/10 cursor-pointer transition-colors">
              {social}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
