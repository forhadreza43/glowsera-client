const AboutPage = () => {
  return (
    <div className="container-narrow py-8 md:py-16">
      <div className="mx-auto mb-16 max-w-2xl text-center">
        <h1 className="mb-6 font-heading text-3xl font-light md:text-5xl">
          About Glowsera
        </h1>
        <p className="font-body text-sm leading-relaxed text-muted-foreground">
          Glowsera was founded with a simple mission: to make authentic,
          high-quality skincare accessible to everyone. We believe that great
          skin starts with great products — and that everyone deserves to feel
          confident in their own skin.
        </p>
      </div>

      <div className="mb-16 grid grid-cols-1 gap-8 md:grid-cols-3">
        {[
          {
            title: 'Our Mission',
            text: 'To empower people with authentic skincare products that deliver real, visible results.',
          },
          {
            title: 'Our Promise',
            text: 'Every product on Glowsera is 100% authentic, carefully sourced, and quality-verified.',
          },
          {
            title: 'Our Values',
            text: 'Transparency, authenticity, and customer satisfaction drive everything we do.',
          },
        ].map((item) => (
          <div
            key={item.title}
            className="rounded-sm bg-secondary p-8 text-center"
          >
            <h3 className="mb-3 font-heading text-xl font-medium">
              {item.title}
            </h3>
            <p className="font-body text-sm leading-relaxed text-muted-foreground">
              {item.text}
            </p>
          </div>
        ))}
      </div>

      <div className="rounded-sm bg-foreground p-10 text-center text-background md:p-16">
        <h2 className="mb-4 font-heading text-3xl font-light">
          Join Our Community
        </h2>
        <p className="mx-auto mb-6 max-w-md font-body text-sm text-background/70">
          Follow us on social media for skincare tips, new launches, and
          exclusive offers.
        </p>
        <div className="flex justify-center gap-4">
          {['Instagram', 'Facebook', 'TikTok'].map((social) => (
            <span
              key={social}
              className="cursor-pointer rounded-sm border border-background/30 px-4 py-2 font-body text-xs tracking-wider uppercase transition-colors hover:bg-background/10"
            >
              {social}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

export default AboutPage
