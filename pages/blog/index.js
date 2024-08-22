import fs from "fs";
import matter from "gray-matter";

export async function getStaticProps() {
  const files = fs.readdirSync("posts/");
  const posts = files.map((fileName) => {
    const slug = fileName.replace(".md", "");
    const fileContents = fs.readFileSync(`posts/${fileName}`, "utf8");
    const { data } = matter(fileContents);
    return {
      slug,
      title: data.title,
    };
  });

  return {
    props: {
      posts,
    },
  };
}

export default function Blog({ posts }) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <div className="w-full max-w-2xl px-4">
        <div className="font-sans text-3xl font-extralight italic">Blog</div>
        <div className="mb-6 text-sm font-extralight text-slate-400">
          © MMXXIV Francisco Ramos do Ó.
        </div>
        <div className="space-y-4">
          {posts.map((post, index) => (
            <div key={index}>
              <a
                href={`/blog/${post.slug}`}
                className="text-blue-600 hover:underline"
              >
                {post.title}
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
