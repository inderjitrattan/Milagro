import { useRef, useState } from "react";
import HTMLFlipBook from "react-pageflip";

const FlipbookMenu = ({
  title,
  subtitle,
  cover,
  backCover,
  pages,
  imageOnly = false,
  showPageNumbers = true,
}) => {
  const bookRef = useRef(null);
  const [isPortrait, setIsPortrait] = useState(true);

  const handlePrev = () => {
    if (bookRef.current) {
      bookRef.current.pageFlip().flipPrev();
    }
  };

  const handleNext = () => {
    if (bookRef.current) {
      bookRef.current.pageFlip().flipNext();
    }
  };

  const handleFlip = (event) => {
    const pageIndex = typeof event?.data === "number" ? event.data : 0;
    setIsPortrait(pageIndex === 0);
  };

  return (
    <section className="section kf-menu-flipbook">
      <div className="container">
        <div className="kf-flipbook-wrap element-anim-1 scroll-animate" data-animate="active">
          <HTMLFlipBook
            ref={bookRef}
            width={520}
            height={680}
            size="stretch"
            minWidth={280}
            maxWidth={900}
            minHeight={360}
            maxHeight={1200}
            maxShadowOpacity={0.4}
            showCover
            startPage={0}
            usePortrait={isPortrait}
            mobileScrollSupport
            className="kf-flipbook"
            onFlip={handleFlip}
          >
            <div className={`kf-page kf-page-cover${imageOnly ? " kf-page-image-only" : ""}`}>
              <div className="kf-page-media">
                <img src={cover.image} alt={cover.title || "Cover"} />
              </div>
              {!imageOnly && (cover.eyebrow || cover.title || cover.subtitle) && (
                <div className="kf-page-title">
                  {cover.eyebrow && <span>{cover.eyebrow}</span>}
                  {cover.title && <h4>{cover.title}</h4>}
                  {cover.subtitle && <p>{cover.subtitle}</p>}
                </div>
              )}
            </div>
            {pages.map((page, index) => (
              <div
                className={`kf-page${imageOnly ? " kf-page-image-only" : ""}`}
                key={`${page.title || "page"}-${index}`}
              >
                <div className="kf-page-media">
                  <img src={page.image} alt={page.title || `Page ${index + 1}`} />
                </div>
                {!imageOnly && (page.title || page.description) && (
                  <div className="kf-page-body">
                    {page.title && <h5>{page.title}</h5>}
                    {page.description && <p>{page.description}</p>}
                  </div>
                )}
                {showPageNumbers && (
                  <div className="kf-page-footer">{index + 1}</div>
                )}
              </div>
            ))}
            <div
              className={`kf-page kf-page-cover kf-page-cover-back${
                imageOnly ? " kf-page-image-only" : ""
              }`}
            >
              <div className="kf-page-media">
                <img src={backCover.image} alt={backCover.title || "Back cover"} />
              </div>
              {!imageOnly && (backCover.eyebrow || backCover.title || backCover.subtitle) && (
                <div className="kf-page-title">
                  {backCover.eyebrow && <span>{backCover.eyebrow}</span>}
                  {backCover.title && <h4>{backCover.title}</h4>}
                  {backCover.subtitle && <p>{backCover.subtitle}</p>}
                </div>
              )}
              {showPageNumbers && (
                <div className="kf-page-footer">{pages.length + 1}</div>
              )}
            </div>
          </HTMLFlipBook>
          <div className="kf-flipbook-arrows" aria-hidden={false}>
            <button
              type="button"
              className="kf-flipbook-arrow kf-flipbook-arrow-left"
              onClick={handlePrev}
              aria-label="Previous page"
            >
              <i className="fas fa-chevron-left" />
            </button>
            <button
              type="button"
              className="kf-flipbook-arrow kf-flipbook-arrow-right"
              onClick={handleNext}
              aria-label="Next page"
            >
              <i className="fas fa-chevron-right" />
            </button>
          </div>
          <div className="kf-flipbook-hint">Tap or click the page corners to flip.</div>
        </div>
      </div>
    </section>
  );
};

export default FlipbookMenu;
