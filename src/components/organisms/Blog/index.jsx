import React from 'react';
import './Blog.scss';

const blogPosts = [
  {
    title: "All About Design System",
    description: "How we built an design system and maintained it during a major redesign. We is the leading Travel and Hospitality",
    image: require('../../../assets/images/How-to-Build-Design-System.png'),
    tags: ["Design System", "CSS"],
  },
  {
    title: "How to explain your ideas",
    description: "Know the basics so you can master the complexities. — Art is subjective. And yes, beauty lies in the eyes of the beholder.",
    image:  require('../../../assets/images/laptop.jpg'),
    tags: ["UX Thing", "Wireframe"],
  },
  {
    title: "Learning about color in CSS",
    description: "Build your website using consistency and standards principle. Why so? To create a strong website.",
    image:  require('../../../assets/images/css.png'),
    tags: ["Color", "Branding"],
  },
  {
    title: "5 Books you must read.",
    description: "Something is intriguing about the design trends — even if they're mainstream, they can still be exciting and edgy.",
    image: require('../../../assets/images/books.jpg'),
    tags: ["Self improvement"],
  },
];


const featuredArticle = {
  title: "Why Product Design must learning Motion",
  description: "Why motion is an essential part of the designer toolkit — Motion is a storytelling medium. It builds a narrative that provides context to the user.",
  image: require('../../../assets/images/design.jpg'),
  tags: ["Live Project", "UI/UX", "12 Min Read"],
};

const BlogPage = () => (
  <div className='blogPage'>
    <div className="hero-section">
      <div className="content">
        <h1>Rush your ideas with us</h1>
        <p>Ready to take your design to the next level? Contact us today to schedule a consultation and see how our team can bring your vision to life</p>
        <button className="btn-cta">Let's Make it →</button>
      </div>
  </div>
  <div className="blog-page">
    <section className="featured-article-section">
      <div className="container mx-auto px-4">
        <div className="featured-article-card">
          <div className="featured-content">
            <h2>{featuredArticle.title}</h2>
            <p>{featuredArticle.description}</p>
            <div className="tags">
              {featuredArticle.tags.map(tag => (
                <span className="tag" key={tag}>{tag}</span>
              ))}
            </div>
            <button className="read-article common-btn">Read article</button>
          </div>
          <div className="featured-image">
            <img src={featuredArticle.image} alt="Featured article" />
          </div>
        </div>
      </div>
    </section>
    <section className="blog-section">
      <div className="container mx-auto px-4">
        <div className="section-header">
          <h2>New blog for you</h2>
          <button className="view-all">View all blog</button>
        </div>
        <div className="blog-grid">
          {blogPosts.map((post, index) => (
            <div className="blog-card" key={index}>
              <img src={post.image} alt={post.title} />
              <div className="content">
                <div className="tags">
                  {post.tags.map(tag => (
                    <span className="tag" key={tag}>{tag}</span>
                  ))}
                </div>
                <h3>{post.title}</h3>
                <p>{post.description}</p>
                <button className="read-more">Read Article</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  </div>
  </div>
);

export default BlogPage;