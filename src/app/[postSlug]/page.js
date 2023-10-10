import React from "react";
import { MDXRemote } from "next-mdx-remote/rsc";
import dynamic from "next/dynamic";

import BlogHero from "@/components/BlogHero";
import CodeSnippet from "@/components/CodeSnippet";

import { loadBlogPost } from "@/helpers/file-helpers";
import { BLOG_TITLE } from "@/constants";

import styles from "./postSlug.module.css";

const DivisionGroupsDemo = dynamic(
    () => import("@/components/DivisionGroupsDemo"),
    { ssr: false }
);

const CircularColorsDemo = dynamic(
    () => import("@/components/CircularColorsDemo"),
    { ssr: false }
);

export async function generateMetadata({ params }) {
    const post = await loadBlogPost(params.postSlug);
    const { title, abstract } = post.frontmatter;
    const postTitle = title ? `${title} • ${BLOG_TITLE}` : BLOG_TITLE;

    return {
        title: postTitle,
        description: abstract,
    };
}

async function BlogPost({ params }) {
    const post = await loadBlogPost(params.postSlug);
    const { title, publishedOn } = post.frontmatter;

    return (
        <article className={styles.wrapper}>
            <BlogHero title={title} publishedOn={publishedOn} />
            <div className={styles.page}>
                <MDXRemote
                    source={post.content}
                    components={{
                        pre: CodeSnippet,
                        DivisionGroupsDemo,
                        CircularColorsDemo,
                    }}
                />
            </div>
        </article>
    );
}

export default BlogPost;
