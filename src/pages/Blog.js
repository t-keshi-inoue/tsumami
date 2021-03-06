import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Layout from "../components/Layout";
import client from "../Contentful";
import Loading from "../components/Loading";

const Blog = () => {
  const [posts, setPosts] = useState({
    blog: [],
    publishBlog: [],
  });
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    client.getEntries({ content_type: "post" }).then(entries => {
      // log the title for all the entries that have it
      console.log([...entries.items].find(item => item.fields.slug === "test"));
      let blog = formatData(entries.items);
      let publishBlog = blog.filter(blog => blog.publish === true);
      setPosts({
        blog,
        publishBlog,
      });
      setIsLoading(false);
    });
  }, []);
  const formatData = posts => {
    console.log("formatData");
    let tempItems = posts.map(item => {
      let id = item.sys.id;
      let image = item.fields.image;
      let blog = { ...item.fields, image, id };
      return blog;
    });
    return tempItems;
  };
  if (isLoading === true) {
    return (
      <Layout>
        <Loading />
      </Layout>
    );
  }
  return (
    <Layout>
      <h1>Beer Blog</h1>
      {console.log(posts)}

      {posts.blog.map((item, index) => {
        return (
          <li key={index}>
            <Link to={`beer-blog/${item.slug}`}>{item.title}</Link>
          </li>
        );
      })}
    </Layout>
  );
};

export default Blog;
