import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { stickyNav } from "../utils";

const Header = () => {
  const router = useRouter();

  useEffect(() => {
    stickyNav();
  }, []);

  const [toggle, setToggle] = useState(false);

  useEffect(() => {
    if (document.querySelector("header").className.includes("animated")) {
      setTimeout(() => {
        document.querySelector("header").classList.add("opened", "show");
      }, 800);
    }
  }, [toggle]);

  const [activeMenu, setActiveMenu] = useState("");
  const activeMenuSet = (value) =>
      setActiveMenu(activeMenu === value ? "" : value),
    activeLi = (value) =>
      value === activeMenu ? { display: "block" } : { display: "none" };

  const [activeNav, setActiveNav] = useState("home");

  const handleMobileNavClick = () => {
    setToggle(false);
  };

  useEffect(() => {
    const setActiveFromPath = () => {
      if (router.pathname === "/blog" || router.pathname.startsWith("/blog/")) {
        setActiveNav("newsroom");
        return;
      }

      if (router.pathname === "/contacts") {
        setActiveNav("contact");
        return;
      }

      if (router.pathname === "/franchise") {
        setActiveNav("franchise");
        return;
      }

      if (router.pathname !== "/") {
        setActiveNav("");
      }
    };

    const updateActiveFromScroll = () => {
      if (router.pathname !== "/") {
        return;
      }

      const sectionIds = ["home", "about", "menu", "reservation"];
      const headerOffset = 140;
      const scrollPosition = window.scrollY + headerOffset;

      let currentSection = "home";
      sectionIds.forEach((sectionId) => {
        const section = document.getElementById(sectionId);
        if (section && scrollPosition >= section.offsetTop) {
          currentSection = sectionId;
        }
      });

      setActiveNav(currentSection);
    };

    const updateActiveFromHash = () => {
      if (router.pathname !== "/") {
        return;
      }

      const hash = window.location.hash.replace("#", "");
      if (hash) {
        setActiveNav(hash);
      } else {
        updateActiveFromScroll();
      }
    };

    setActiveFromPath();
    updateActiveFromHash();

    window.addEventListener("scroll", updateActiveFromScroll, { passive: true });
    window.addEventListener("hashchange", updateActiveFromHash);

    return () => {
      window.removeEventListener("scroll", updateActiveFromScroll);
      window.removeEventListener("hashchange", updateActiveFromHash);
    };
  }, [router.pathname]);

  return (
    <header className={`kf-header ${toggle ? "animated" : ""}`}>
      {/* topline */}
      <div className="kf-topline">
        <div className="row">
          <div className="col-xs-12 col-sm-6 col-md-4 col-lg-4">
            {/* hours */}
            <div className="kf-h-group">
              <i className="far fa-clock" /> <em>opening hours :</em> 08:00 am -
              09:00 pm
            </div>
          </div>
          <div className="col-xs-12 col-sm-6 col-md-4 col-lg-4 align-center">
            {/* social */}
            <div className="kf-h-social">
              <a href="facebook.com" target="blank">
                <i className="fab fa-facebook-f" />
              </a>
              <a href="twitter.com" target="blank">
                <i className="fab fa-twitter" />
              </a>
              <a href="instagram.com" target="blank">
                <i className="fab fa-instagram" />
              </a>
              <a href="youtube.com" target="blank">
                <i className="fab fa-youtube" />
              </a>
            </div>
          </div>
          <div className="col-xs-12 col-sm-6 col-md-4 col-lg-4 align-right">
            {/* location */}
            <div className="kf-h-group">
              <i className="fas fa-map-marker-alt" /> <em>Location :</em> 55
              main street, new york
            </div>
          </div>
        </div>
      </div>
      {/* navbar */}
      <div className="kf-navbar">
        <div className="row">
          <div className="col-xs-12 col-sm-6 col-md-3 col-lg-3">
            {/* logo */}
            <div className="kf-logo">
              <Link href="/">
                <img src="images/logo.png" alt="image" />
              </Link>
            </div>
          </div>
          <div className="col-xs-12 col-sm-6 col-md-6 col-lg-6 align-center">
            {/* main menu */}
            <div className="kf-main-menu">
              <ul>
                <li className={activeNav === "home" ? "active" : ""}>
                  <Link href="/#home">Home</Link>
                </li>
                <li className={activeNav === "about" ? "active" : ""}>
                  <Link href="/#about">About Us</Link>
                </li>
                <li className={activeNav === "menu" ? "active" : ""}>
                  <Link href="/#menu">Menu</Link>
                </li>
                <li className={activeNav === "reservation" ? "active" : ""}>
                  <Link href="/#reservation">Reservation</Link>
                </li>
                <li className={activeNav === "newsroom" ? "active" : ""}>
                  <Link href="/blog">Newsroom</Link>
                </li>
                <li className={activeNav === "contact" ? "active" : ""}>
                  <Link href="/contacts">Contact Us</Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="col-xs-12 col-sm-6 col-md-3 col-lg-3 align-right">
            {/* menu btn */}
            <a
              href="#"
              className={`kf-menu-btn ${toggle ? "active" : ""}`}
              onClick={() => setToggle(!toggle)}
            >
              <span />
            </a>
            {/* btn */}
            <Link href="/franchise" className="kf-btn h-btn">
              <span>Franchise</span>
            </Link>
          </div>
        </div>
      </div>
      {/* mobile navbar */}
      <div className="kf-navbar-mobile">
        {/* mobile menu */}
        <div className="kf-main-menu">
          <ul>
            <li className={activeNav === "home" ? "active" : ""}>
              <Link href="/#home" onClick={handleMobileNavClick}>
                Home
              </Link>
            </li>
            <li className={activeNav === "about" ? "active" : ""}>
              <Link href="/#about" onClick={handleMobileNavClick}>
                About Us
              </Link>
            </li>
            <li className={activeNav === "menu" ? "active" : ""}>
              <Link href="/#menu" onClick={handleMobileNavClick}>
                Menu
              </Link>
            </li>
            <li className={activeNav === "reservation" ? "active" : ""}>
              <Link href="/#reservation" onClick={handleMobileNavClick}>
                Reservation
              </Link>
            </li>
            <li className={activeNav === "newsroom" ? "active" : ""}>
              <Link href="/blog" onClick={handleMobileNavClick}>
                Newsroom
              </Link>
            </li>
            <li className={activeNav === "contact" ? "active" : ""}>
              <Link href="/contacts" onClick={handleMobileNavClick}>
                Contact Us
              </Link>
            </li>
          </ul>
        </div>
        {/* mobile topline */}
        <div className="kf-topline">
          <div className="row">
            <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
              {/* mobile btn */}
              <Link href="/franchise" className="kf-btn h-btn">
                <span>Franchise</span>
                <i className="fas fa-chevron-right" />
              </Link>
            </div>
            <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
              {/* social */}
              <div className="kf-h-social">
                <a href="facebook.com" target="blank">
                  <i className="fab fa-facebook-f" />
                </a>
                <a href="twitter.com" target="blank">
                  <i className="fab fa-twitter" />
                </a>
                <a href="instagram.com" target="blank">
                  <i className="fab fa-instagram" />
                </a>
                <a href="youtube.com" target="blank">
                  <i className="fab fa-youtube" />
                </a>
              </div>
            </div>
            <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
              {/* hours */}
              <div className="kf-h-group">
                <i className="far fa-clock" /> <em>opening hours :</em> 08:00 am
                - 09:00 pm
              </div>
            </div>
            <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
              {/* location */}
              <div className="kf-h-group">
                <i className="fas fa-map-marker-alt" /> <em>Location :</em> 55
                main street, new york
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
export default Header;
