import Layouts from "@/src/layouts/Layouts";
import Link from "next/link";
import { useState, useEffect } from "react";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
const ASSET_BASE_URL = API_BASE_URL.replace(/\/api$/, '');

const Blog = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/blogs?status=published`);
      const data = await response.json();
      if (data.success && data.data) {
        setBlogs(data.data);
      }
    } catch (error) {
      console.error('Error fetching blogs:', error);
    } finally {
      setLoading(false);
    }
  };

  const getImageUrl = (imagePath) => {
    if (!imagePath) return '/images/latest_blog1.jpg';
    if (imagePath.startsWith('http')) return imagePath;
    const normalized = imagePath.startsWith('/') ? imagePath : `/${imagePath}`;
    return `${ASSET_BASE_URL}${normalized}`;
  };

  const getLogoUrl = (logoPath) => {
    if (!logoPath) return '/images/logo.png';
    if (logoPath.startsWith('http')) return logoPath;
    const normalized = logoPath.startsWith('/') ? logoPath : `/${logoPath}`;
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

  const stripHtml = (value) => (value || "").replace(/<[^>]*>/g, "").trim();

  const getExcerpt = (blog) => {
    const raw = blog.excerpt || stripHtml(blog.content);
    if (!raw) return "";
    return raw.length > 220 ? `${raw.slice(0, 220)}...` : raw;
  };

  return (
    <Layouts>
      <section className="section milagro-blog-list">
        <div className="container">
          <div className="milagro-blog-header">
            <h2 className="about-title">Newsroom</h2>
          </div>
          <div className="milagro-blog-items">
            {loading ? (
              <div className="milagro-blog-empty">
                <p>Loading blogs...</p>
              </div>
            ) : blogs.length > 0 ? (
              blogs.map((blog) => (
                <article key={blog.id} className="milagro-blog-card">
                  <div className="milagro-blog-media">
                    <Link href={`/blog/${blog.slug}`}>
                      <img
                        src={getImageUrl(blog.featured_image)}
                        alt={blog.title}
                      />
                    </Link>
                  </div>
                  <div className="milagro-blog-body">
                    <div className="milagro-blog-meta">
                      <img
                        src={getLogoUrl(blog.blog_logo)}
                        alt="Milagro"
                        className="milagro-blog-logo"
                      />
                      <span className="milagro-blog-date">
                        {formatDate(blog.published_at || blog.created_at)}
                      </span>
                    </div>
                    <h3 className="milagro-blog-name">
                      <Link href={`/blog/${blog.slug}`}>{blog.title}</Link>
                    </h3>
                    <p className="milagro-blog-excerpt">{getExcerpt(blog)}</p>
                    <div className="milagro-blog-action">
                      <Link
                        href={`/blog/${blog.slug}`}
                        className="milagro-blog-link"
                      >
                        Read More
                      </Link>
                    </div>
                  </div>
                </article>
              ))
            ) : (
              <div className="milagro-blog-empty">
                <p>No published blogs yet.</p>
              </div>
            )}
          </div>
        </div>
      </section>
    </Layouts>
  );
};

export default Blog;
