import fs from "fs";
import matter from "gray-matter";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import Link from "next/link";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/cjs/styles/prism";

export async function getStaticPaths() {
  const files = fs.readdirSync("posts");
  const paths = files.map((fileName) => ({
    params: {
      slug: fileName.replace(".md", ""),
    },
  }));

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params: { slug } }) {
  const fileName = fs.readFileSync(`posts/${slug}.md`, "utf-8");
  const { data: frontmatter, content } = matter(fileName);

  // Convert the clipped Date to an ISO string if it exists
  if (frontmatter.clipped) {
    frontmatter.clipped = new Date(frontmatter.clipped).toISOString();
  }

  return {
    props: {
      frontmatter,
      content,
    },
  };
}

export default function BlogPost({ frontmatter, content }) {
  const router = useRouter();
  const [formattedClippedDate, setFormattedClippedDate] = useState(null);

  useEffect(() => {
    if (frontmatter.clipped) {
      setFormattedClippedDate(
        new Date(frontmatter.clipped).toLocaleDateString(),
      );
    }
  }, [frontmatter.clipped]);

  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  const components = {
    code({ node, inline, className, children, ...props }) {
      const match = /language-(\w+)/.exec(className || "");
      return !inline && match ? (
        <SyntaxHighlighter
          style={vscDarkPlus}
          language={match[1]}
          PreTag="div"
          {...props}
        >
          {String(children).replace(/\n$/, "")}
        </SyntaxHighlighter>
      ) : (
        <code className={className} {...props}>
          {children}
        </code>
      );
    },
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-3xl">
        <Link
          href="/blog"
          className="mb-8 inline-block text-blue-600 hover:underline"
        >
          ← Back to Blog
        </Link>

        <div className="mb-2 font-sans text-4xl font-extralight italic text-gray-900">
          {frontmatter.title}
        </div>

        <div className="mb-8 text-sm text-gray-600">
          <span>By {frontmatter.author}</span>
          {frontmatter.clipped && (
            <span className="ml-4">
              Created: {formattedClippedDate || frontmatter.clipped}
            </span>
          )}
        </div>

        {frontmatter.tags && (
          <div className="mb-4 flex flex-wrap">
            {frontmatter.tags.map((tag, index) => (
              <span
                key={index}
                className="mr-2 mb-2 rounded-full bg-blue-100 px-3 py-1 text-sm font-semibold text-blue-800"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        <div className="prose prose-lg max-w-none">
          <ReactMarkdown components={components}>{content}</ReactMarkdown>
        </div>

        {frontmatter.source && (
          <div className="mt-8">
            <a
              href={frontmatter.source}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              Source
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
