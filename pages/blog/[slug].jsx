import Layouts from "@/src/layouts/Layouts";
import Link from "next/link";
import { useState, useEffect } from "react";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
const ASSET_BASE_URL = API_BASE_URL.replace(/\/api$/, '');

const BlogSingle = ({ blog }) => {
  const [relatedBlogs, setRelatedBlogs] = useState([]);

  useEffect(() => {
    fetchRelatedBlogs();
  }, [blog?.id]);

  const fetchRelatedBlogs = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/blogs?status=published&limit=3`);
      const data = await response.json();
      if (data.success && data.data) {
        // Filter out current blog and limit to 3
        setRelatedBlogs(data.data.filter(b => b.id !== blog?.id).slice(0, 3));
      }
    } catch (error) {
      console.error('Error fetching related blogs:', error);
    }
  };

  const getImageUrl = (imagePath) => {
    if (!imagePath) return '/images/latest_blog1.jpg';
    if (imagePath.startsWith('http')) return imagePath;
    const normalized = imagePath.startsWith('/') ? imagePath : `/${imagePath}`;
    return `${ASSET_BASE_URL}${normalized}`;
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  if (!blog) {
    return (
      <Layouts>
        <div className="container py-5">
          <div className="text-center">
            <h2>Blog not found</h2>
            <Link href="/blog" className="kf-btn-link mt-3">
              <span>Back to Newsroom</span>
            </Link>
          </div>
        </div>
      </Layouts>
    );
  }

  return (
    <Layouts>
      {/* Section Archive Started */}
      <section className="section kf-archive-started">
        <div className="container">
          <div className="kf-titles">
            <div
              className="kf-date element-anim-1 scroll-animate"
              data-animate="active"
            >
              {formatDate(blog.published_at || blog.created_at)} - <Link href="/blog">News</Link>
            </div>
            <h1
              className="kf-p-title text-anim-1 scroll-animate"
              data-splitting="words"
              data-animate="active"
            >
              {blog.title}
            </h1>
          </div>
        </div>
        <div
          className="kf-archive-image element-anim-1 scroll-animate"
          data-animate="active"
          style={{ backgroundImage: `url(${getImageUrl(blog.featured_image)})` }}
        />
      </section>

      {/* Section Archive */}
      <section className="section kf-archive">
        <div className="container">
          <div className="row">
            <div className="col-xs-12 col-sm-12 col-md-12 col-lg-8 offset-lg-2">
              <div
                className="post-content element-anim-1 scroll-animate"
                data-animate="active"
              >
                {/* Author and Date Info */}
                <p className="blog-meta text-muted mb-4">
                  By <strong>{blog.author || 'Milagro Team'}</strong> on {formatDate(blog.published_at || blog.created_at)}
                </p>

                {/* Blog Content */}
                <div
                  className="post-body"
                  dangerouslySetInnerHTML={{ __html: blog.content || '' }}
                />

                {/* Excerpt if available */}
                {blog.excerpt && (
                  <blockquote className="mt-5 mb-5">
                    <p>{blog.excerpt}</p>
                    <cite>{blog.author || 'Milagro Team'}</cite>
                  </blockquote>
                )}

                {/* Share Links */}
                <div className="blog-share mt-5 pt-5 border-top">
                  <p className="mb-3">
                    <strong>Share this article:</strong>
                  </p>
                  <div className="social-links">
                    <a 
                      href={`https://www.facebook.com/sharer/sharer.php?u=${typeof window !== 'undefined' ? window.location.href : ''}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="me-3"
                    >
                      <i className="fab fa-facebook" /> Facebook
                    </a>
                    <a 
                      href="https://www.instagram.com/milagromumbai?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <i className="fab fa-instagram" /> Instagram
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Articles */}
      {relatedBlogs.length > 0 && (
        <section className="section kf-archive">
          <div className="container">
            <h3 className="mb-4">Related Articles</h3>
            <div className="row">
              {relatedBlogs.map((relatedBlog) => (
                <div key={relatedBlog.id} className="col-lg-4 col-md-6 mb-4">
                  <div className="kf-archive-item">
                    <div className="image kf-image-hover">
                      <Link href={`/blog/${relatedBlog.slug}`}>
                        <img 
                          src={getImageUrl(relatedBlog.featured_image)} 
                          alt={relatedBlog.title}
                          style={{ height: '250px', objectFit: 'cover' }}
                        />
                      </Link>
                    </div>
                    <div className="desc">
                      <div className="kf-date">
                        <i className="far fa-calendar-alt" />
                        {formatDate(relatedBlog.published_at || relatedBlog.created_at)}
                      </div>
                      <h5 className="name">
                        <Link href={`/blog/${relatedBlog.slug}`}>
                          {relatedBlog.title}
                        </Link>
                      </h5>
                      <div className="readmore">
                        <Link href={`/blog/${relatedBlog.slug}`} className="kf-btn-link">
                          <span>read more</span>
                          <i className="fas fa-chevron-right" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Back to Blog */}
      <section className="section kf-archive mb-5">
        <div className="container">
          <Link href="/blog" className="kf-btn-link">
            <i className="fas fa-chevron-left me-2" />
            Back to Newsroom
          </Link>
        </div>
      </section>
    </Layouts>
  );
};

export async function getStaticProps({ params }) {
  try {
    const response = await fetch(`${API_BASE_URL}/blogs`);
    const data = await response.json();

    if (!data.success || !data.data) {
      return { notFound: true };
    }

    const blog = data.data.find(b => b.slug === params.slug && b.status === 'published');

    if (!blog) {
      return { notFound: true };
    }

    return {
      props: { blog },
      revalidate: 60 // Revalidate every 60 seconds
    };
  } catch (error) {
    console.error('Error fetching blog:', error);
    return { notFound: true };
  }
}

export async function getStaticPaths() {
  try {
    const response = await fetch(`${API_BASE_URL}/blogs?status=published`);
    const data = await response.json();

    if (!data.success || !data.data) {
      return { paths: [], fallback: 'blocking' };
    }

    const paths = data.data.map(blog => ({
      params: { slug: blog.slug }
    }));

    return {
      paths,
      fallback: 'blocking'
    };
  } catch (error) {
    console.error('Error generating static paths:', error);
    return { paths: [], fallback: 'blocking' };
  }
}

export default BlogSingle;
