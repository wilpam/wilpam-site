export type BlogPostData = {
  url: string;
  frontmatter: {
    title: string;
    author: string;
    date: string;
    tags?: string[];
  };
};

export const posts = Object.values(
  import.meta.glob("../pages/blog/*.mdx", { eager: true })
) as BlogPostData[];

export function postTags(post: BlogPostData) {
  return post.frontmatter.tags ?? [];
}

export function formatDate(date: string) {
  return date.slice(0, 10);
}

export function postsByAuthor(author: string) {
  return posts.filter(
    (post) => post.frontmatter.author.toLowerCase() === author.toLowerCase()
  );
}
