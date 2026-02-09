import ContactForm from "@/src/components/ContactForm";
import Layouts from "@/src/layouts/Layouts";

const Franchise = () => {
  return (
    <Layouts>
      {/* Section Started Inner */}
      <section className="section kf-started-inner">
        <div
          className="kf-parallax-bg js-parallax"
          style={{ backgroundImage: "url(images/menu_reservation_inner_bg.jpg)" }}
        />
        <div className="container">
          <h1
            className="kf-h-title text-anim-1 scroll-animate"
            data-splitting="chars"
            data-animate="active"
          >
            Franchise
          </h1>
        </div>
      </section>
      {/* Section Franchise Highlights */}
      <section className="section kf-contacts-info">
        <div className="container">
          <div className="kf-contacts-items row">
            <div className="col-xs-12 col-sm-12 col-md-6 col-lg-4 align-center">
              <div
                className="kf-contacts-item element-anim-1 scroll-animate"
                data-animate="active"
              >
                <div className="image">
                  <i className="las la-chart-line" />
                </div>
                <div className="desc">
                  <h5 className="name">Strong Unit Economics</h5>
                  <ul>
                    <li>Proven concept and premium positioning</li>
                    <li>Operational playbook for consistent results</li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-xs-12 col-sm-12 col-md-6 col-lg-4 align-center">
              <div
                className="kf-contacts-item element-anim-1 scroll-animate"
                data-animate="active"
              >
                <div className="image">
                  <i className="las la-chalkboard-teacher" />
                </div>
                <div className="desc">
                  <h5 className="name">Training & Setup</h5>
                  <ul>
                    <li>End-to-end store launch support</li>
                    <li>Team training and SOP onboarding</li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-xs-12 col-sm-12 col-md-6 col-lg-4 align-center">
              <div
                className="kf-contacts-item element-anim-1 scroll-animate"
                data-animate="active"
              >
                <div className="image">
                  <i className="las la-hands-helping" />
                </div>
                <div className="desc">
                  <h5 className="name">Marketing Support</h5>
                  <ul>
                    <li>Launch campaigns and brand assets</li>
                    <li>Ongoing local marketing guidance</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Section Franchise Form */}
      <section className="section kf-contacts-form">
        <div className="container">
          <div
            className="kf-reservation-form element-anim-1 scroll-animate"
            data-animate="active"
          >
            <div className="kf-titles align-center">
              <div className="kf-subtitle">Franchise Enquiry</div>
              <h3 className="kf-title">Tell Us About Your City</h3>
            </div>
            <ContactForm />
          </div>
        </div>
      </section>
    </Layouts>
  );
};
export default Franchise;
