import Link from "next/link";

const Footer = () => {
  return (
    <div className="kf-footer">
      <div className="container">
        <div className="row">
          <div className="col-xs-12 col-sm-12 col-md-6 col-lg-3">
            {/* logo */}
            <div
              className="kf-logo element-anim-1 scroll-animate"
              data-animate="active"
            >
              <Link href="/">
                <img src="images/logo.png" alt="image" />
              </Link>
            </div>
          </div>
          <div className="col-xs-12 col-sm-12 col-md-6 col-lg-3">
            {/* hours */}
            <div
              className="kf-f-hours element-anim-1 scroll-animate"
              data-animate="active"
            >
              <h5>Quick Links</h5>
              <ul>
                <li>
                  <Link href="/#home">Home</Link>
                </li>
                <li>
                  <Link href="/#about">About Us</Link>
                </li>
                <li>
                  <Link href="/#menu">Menu</Link>
                </li>
                <li>
                  <Link href="/#reservation">Reservation</Link>
                </li>
                <li>
                  <Link href="/blog">Newsroom</Link>
                </li>
                <li>
                  <Link href="/contacts">Contact Us</Link>
                </li>
                <li></li>
              </ul>
            </div>
          </div>  
          <div className="col-xs-12 col-sm-12 col-md-6 col-lg-3">
            {/* hours */}
            <div
              className="kf-f-hours element-anim-1 scroll-animate"
              data-animate="active"
            >
              <h5>Working Hours</h5>
              <ul>
                <li>
                  Open All Days
                  <em>12:00 pm - 11:30pm</em>
                </li>
                <li>
                  Brunch (Only Sunday)
                  <em>12:30 pm - 04:30pm</em>
                </li>
                <li></li>
              </ul>
            </div>
          </div>
          <div className="col-xs-12 col-sm-12 col-md-6 col-lg-3">
            {/* contact */}
            <div
              className="kf-f-contact element-anim-1 scroll-animate"
              data-animate="active"
            >
              <h5>Contact Us</h5>
              <ul>
                <li>
                  <i className="las la-map-marker" />
                  <em>Location :</em>
                  5th Floor, S.V, Swatantryaveer Savarkar Rd, opposite Century Bazaar, Prabhadevi, Mumbai, Maharashtra 400 025.
                </li>
                <li>
                  <i className="las la-envelope-open-text" />
                  <em>Email Address :</em>
                  <a href="mailto:concierge@milagromumbai.com">concierge@milagromumbai.com</a>  
                </li>
                <li>
                  <i className="las la-phone" />
                  <em>Phone Number :</em>
                  <a href="tel:+919167779102">+91 9167779102</a><br /><a href="tel:+919167779102">+91 9167779102</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 align-center">
            {/* copyright */}
            <div className="kf-copyright element-anim-1 scroll-animate" data-animate="active">
              Copyright © 2026 Milagro. All Rights Reserved.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Footer;
