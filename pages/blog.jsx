import Layouts from "@/src/layouts/Layouts";
import Link from "next/link";

const Blog = () => {
  return (
    <Layouts>
      <section className="section kf-archive">
        <div className="container">
          <h2 className="about-title">Newsroom</h2>
        </div>
        <div className="container">
          <div className="row">
            <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
              <div className="kf-archive-items">
                <div
                  className="kf-archive-item element-anim-1 scroll-animate"
                  data-animate="active"
                >
                  <div className="image kf-image-hover">
                    <Link href="blog-single">
                      <img src="images/latest_blog1.jpg" alt="image" />
                    </Link>
                  </div>
                  <div className="desc">
                    <div className="kf-date">
                      <i className="far fa-calendar-alt" />
                      25 Sep 2021
                    </div>
                    <h5 className="name">
                      <Link href="blog-single">
                        For most people, moderate coffee consumption can be
                        incorporated into a healthy diet
                      </Link>
                    </h5>
                    <div className="kf-text">
                      Sed ut perspiciatis unde omnis iste natus error sit
                      voluptatem accusantium dlorque laudantium totam rem
                      aperiam eaque ipsa quae abillo
                    </div>
                    <div className="readmore">
                      <Link href="blog-single" className="kf-btn-link">
                        <span>read more</span>
                        <i className="fas fa-chevron-right" />
                      </Link>
                    </div>
                  </div>
                </div>
                <div
                  className="kf-archive-item element-anim-1 scroll-animate"
                  data-animate="active"
                >
                  <div className="image kf-image-hover">
                    <Link href="blog-single">
                      <img src="images/latest_blog2.jpg" alt="image" />
                    </Link>
                  </div>
                  <div className="desc">
                    <div className="kf-date">
                      <i className="far fa-calendar-alt" />
                      25 Sep 2021
                    </div>
                    <h5 className="name">
                      <Link href="blog-single">
                        Coffee makes you poop during the day because it affects
                        your digestive system so quickly
                      </Link>
                    </h5>
                    <div className="kf-text">
                      Sed ut perspiciatis unde omnis iste natus error sit
                      voluptatem accusantium dlorque laudantium totam rem
                      aperiam eaque ipsa quae abillo
                    </div>
                    <div className="readmore">
                      <Link href="blog-single" className="kf-btn-link">
                        <span>read more</span>
                        <i className="fas fa-chevron-right" />
                      </Link>
                    </div>
                  </div>
                </div>
                <div
                  className="kf-archive-item element-anim-1 scroll-animate"
                  data-animate="active"
                >
                  <div className="image kf-image-hover">
                    <Link href="blog-single">
                      <img src="images/latest_blog3.jpg" alt="image" />
                    </Link>
                  </div>
                  <div className="desc">
                    <div className="kf-date">
                      <i className="far fa-calendar-alt" />
                      25 Sep 2021
                    </div>
                    <h5 className="name">
                      <Link href="blog-single">
                        Coffee with added milk provides all the macro nutrients
                        in good amounts
                      </Link>
                    </h5>
                    <div className="kf-text">
                      Sed ut perspiciatis unde omnis iste natus error sit
                      voluptatem accusantium dlorque laudantium totam rem
                      aperiam eaque ipsa quae abillo
                    </div>
                    <div className="readmore">
                      <Link href="blog-single" className="kf-btn-link">
                        <span>read more</span>
                        <i className="fas fa-chevron-right" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
              {/* pager */}
              <div
                className="pager element-anim-1 scroll-animate"
                data-animate="active"
              >
                <Link className="page-numbers prev" href="blog">
                  <i className="fas fa-chevron-left" />
                </Link>
                <span className="page-numbers current">1</span>
                <Link className="page-numbers" href="blog">
                  2
                </Link>
                <Link className="page-numbers" href="blog">
                  3
                </Link>
                <span className="page-numbers dots">…</span>
                <Link className="page-numbers" href="blog">
                  9
                </Link>
                <Link className="page-numbers next" href="blog">
                  <i className="fas fa-chevron-right" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layouts>
  );
};
export default Blog;
