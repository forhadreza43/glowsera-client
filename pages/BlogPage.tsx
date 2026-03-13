import Link from "next/link"
import { blogPosts } from "@/data/mockData"
import Image from "next/image"

const BlogPage = () => {
  return (
    <div className="container-narrow py-8 md:py-12">
      <div className="mb-12 text-center">
        <h1 className="font-heading text-3xl font-light md:text-4xl">
          The Glow Journal
        </h1>
        <p className="mt-2 font-body text-sm text-muted-foreground">
          Expert skincare advice, tips, and product guides
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
        {blogPosts.map((post) => (
          <Link key={post.id} href={`/blog/${post.slug}`} className="group">
            <div className="mb-4 aspect-16/10 overflow-hidden rounded-sm bg-secondary">
              {post.image && (
                <Image
                  src={post.image}
                  alt={post.title}
                  width={800}
                  height={512}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              )}
            </div>
            <div className="mb-2 flex items-center gap-3">
              <span className="font-body text-xs tracking-wider text-primary uppercase">
                {post.category}
              </span>
              <span className="font-body text-xs text-muted-foreground">
                {new Date(post.date).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
              </span>
            </div>
            <h2 className="font-heading text-lg leading-snug font-medium transition-colors group-hover:text-primary">
              {post.title}
            </h2>
            <p className="mt-2 line-clamp-2 font-body text-sm text-muted-foreground">
              {post.excerpt}
            </p>
            <p className="mt-3 font-body text-xs text-muted-foreground">
              By {post.author}
            </p>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default BlogPage
