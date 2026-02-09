import ReservationForm from "@/src/components/ReservationForm";

const ReservationSection = () => {
  return (
    <>
    {/* Section Reservation */}
    <section className="section kf-reservation kf-section-no-margin">
      <div className="container">
        <div
          className="kf-reservation-form element-anim-1 scroll-animate"
          data-animate="active"
        >
          <div
            className="image-left"
            style={{ backgroundImage: "url(images/reservation5.jpg)" }}
          />
          <div
            className="image-right"
            style={{ backgroundImage: "url(images/reservation6.jpg)" }}
          />
          <div className="kf-titles align-center">
            <div className="kf-subtitle">Booking Table</div>
            <h3 className="kf-title">Make Your Reservation</h3>
          </div>
          <ReservationForm />
        </div>
      </div>
    </section>
    </>
  );
};
export default ReservationSection;
