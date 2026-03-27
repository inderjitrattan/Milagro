import { useEffect, useRef, useState } from "react";
import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Layouts from "@/src/layouts/Layouts";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

const Contacts = () => {
  const formData = {
    apiUrl: "/api/send-reservation",
  };

  const dateInputRef = useRef(null);
  const mapContainerRef = useRef(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [mapVisible, setMapVisible] = useState(false);
  const [formValues, setFormValues] = useState({
    name: "",
    tel: "",
    email: "",
    date: "",
    time: "",
    seats: 1,
    gathering: "",
  });
  const [formError, setFormError] = useState("");
  const [formSuccess, setFormSuccess] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!dateInputRef.current) {
      return;
    }

    const instance = flatpickr(dateInputRef.current, {
      minDate: new Date(),
      dateFormat: "Y-m-d",
      onChange: (selectedDates) => {
        if (selectedDates.length === 0) {
          return;
        }
        const date = selectedDates[0];
        const dateStr =
          date.getFullYear() +
          "-" +
          String(date.getMonth() + 1).padStart(2, "0") +
          "-" +
          String(date.getDate()).padStart(2, "0");
        setFormValues((prevValues) => ({
          ...prevValues,
          date: dateStr,
        }));
      },
    });

    return () => {
      instance.destroy();
    };
  }, []);

  // Intersection Observer for lazy loading map
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setMapVisible(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (mapContainerRef.current) {
      observer.observe(mapContainerRef.current);
    }

    return () => {
      if (mapContainerRef.current) {
        observer.unobserve(mapContainerRef.current);
      }
    };
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
    if (formError) {
      setFormError("");
    }
    if (formSuccess) {
      setFormSuccess("");
    }
  };

  const handleSeatsChange = (delta) => {
    setFormValues((prevValues) => ({
      ...prevValues,
      seats: Math.max(1, Number(prevValues.seats || 1) + delta),
    }));
  };

  const getReservationValidationError = () => {
    const name = formValues.name.trim();
    if (!name) {
      return "Please enter your name.";
    }

    const rawMobile = formValues.tel.trim();
    if (!rawMobile) {
      return "Please enter your mobile number.";
    }

    const compactMobile = rawMobile.replace(/[\s-]/g, "");
    let mobileNumber = compactMobile;
    if (mobileNumber.startsWith("+91")) {
      mobileNumber = mobileNumber.slice(3);
    } else if (mobileNumber.startsWith("0") && mobileNumber.length === 11) {
      mobileNumber = mobileNumber.slice(1);
    }

    if (!/^[6-9]\d{9}$/.test(mobileNumber)) {
      return "Please enter a valid Indian mobile number.";
    }

    const email = formValues.email.trim();
    if (!email) {
      return "Please enter your email address.";
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) {
      return "Please enter a valid email address.";
    }

    if (!formValues.date) {
      return "Please select a date.";
    }

    if (!formValues.time) {
      return "Please select a time.";
    }

    if (!formValues.seats) {
      return "Please enter the number of seats.";
    }

    if (!formValues.gathering) {
      return "Please select a gathering type.";
    }

    return null;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (isSubmitting) {
      return;
    }

    const validationError = getReservationValidationError();
    if (validationError) {
      setFormError(validationError);
      return;
    }

    setFormError("");
    setFormSuccess("");
    setIsSubmitting(true);

    try {
      const response = await fetch(`${API_BASE_URL}/forms`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          form_type: "contact",
          name: formValues.name,
          phone: formValues.tel,
          email: formValues.email,
          date: formValues.date,
          time: formValues.time,
          seats: formValues.seats,
          gathering: formValues.gathering,
        }),
      });

      const dataResponse = await response.json();

      if (response.ok && dataResponse.success) {
        setFormSuccess(
          "Contact request sent successfully! Check your email for confirmation."
        );
        setFormValues({
          name: "",
          tel: "",
          email: "",
          date: "",
          time: "",
          seats: 1,
          gathering: "",
        });
      } else {
        setFormError(
          dataResponse.message || "Error sending request. Please try again."
        );
      }
    } catch (error) {
      setFormError("Error sending request. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Layouts>
      <section className="section kf-contacts-info kf-contact-layout">
        <div className="container">
          <h2 className="about-title">Contact Us</h2>
          <div className="row kf-contact-split">
            <div className="col-xs-12 col-sm-12 col-md-6 col-lg-5">
              <p className="kf-contact-address">
                5th Floor, Sobo 25, S.V. Swatantryaveer Savarkar Rd,
                Opposite Century Bazaar, Prabhadevi, Mumbai, Maharashtra
                400 025.
              </p>
              <div
                ref={mapContainerRef}
                className="kf-contact-map element-anim-1 scroll-animate"
                data-animate="active"
                style={{ position: 'relative', minHeight: '400px' }}
              >
                {!mapLoaded && (
                  <div style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    zIndex: 10,
                    textAlign: 'center'
                  }}>
                    <div style={{
                      width: '40px',
                      height: '40px',
                      border: '4px solid #f0f0f0',
                      borderTop: '4px solid #d4a574',
                      borderRadius: '50%',
                      animation: 'spin 1s linear infinite',
                      margin: '0 auto',
                      marginBottom: '10px'
                    }} />
                    <p style={{ color: '#666', fontSize: '14px' }}>Loading map...</p>
                  </div>
                )}
                {mapVisible && (
                  <iframe
                    title="Milagro Mumbai map"
                    loading="lazy"
                    fetchpriority="low"
                    allowFullScreen
                    referrerPolicy="no-referrer-when-downgrade"
                    onLoad={() => setMapLoaded(true)}
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3772.1352142228!2d72.82202307580522!3d19.013762553922238!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7cf83d1a3c1b3%3A0x14f5a25e32fc6aba!2sMilagro%20Mumbai!5e0!3m2!1sen!2sus!4v1770890731651!5m2!1sen!2sus"
                    style={{ border: 0, width: '100%', height: '400px', display: mapLoaded ? 'block' : 'block' }}
                  />
                )}
                <style>{`
                  @keyframes spin {
                    to { transform: rotate(360deg); }
                  }
                `}</style>
              </div>
              <div className="kf-f-contact kf-contact-details">
                <ul>
                  <li>
                    <i className="las la-map-marker" />
                    <em>Location :</em>
                    5th Floor, Sobo 25, S.V. Swatantryaveer Savarkar Rd,
                    Opposite Century Bazaar, Prabhadevi, Mumbai, Maharashtra
                    400 025.
                  </li>
                  <li>
                    <i className="las la-envelope-open-text" />
                    <em>Email Address :</em>
                    <a href="mailto:concierge@milagromumbai.com">
                      concierge@milagromumbai.com
                    </a>
                  </li>
                  <li>
                    <i className="las la-phone" />
                    <em>Phone Number :</em>
                    <a href="tel:+919167779102">+91 91677 79102</a>
                    <span> / </span>
                    <a href="tel:+919167779102">+91 91677 79102</a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-xs-12 col-sm-12 col-md-6 col-lg-7">
              <div
                className="milagro-reservation-form"
              >
                <form
                  onSubmit={handleSubmit}
                  id="contactReservationForm"
                  action={formData.apiUrl}
                >
                  <div className="milagro-form-grid">
                    <div className="milagro-form-field milagro-form-full">
                      <input
                        type="text"
                        name="name"
                        placeholder="Name *"
                        onChange={handleChange}
                        value={formValues.name}
                      />
                    </div>
                    <div className="milagro-form-field milagro-form-full">
                      <input
                        type="tel"
                        name="tel"
                        placeholder="Mobile Number *"
                        onChange={handleChange}
                        value={formValues.tel}
                      />
                    </div>
                    <div className="milagro-form-field milagro-form-full">
                      <input
                        type="email"
                        name="email"
                        placeholder="Email *"
                        onChange={handleChange}
                        value={formValues.email}
                      />
                    </div>
                    <div className="milagro-form-field">
                      <input
                        ref={dateInputRef}
                        type="text"
                        className="flatpickr-input"
                        name="date"
                        placeholder="Select Date *"
                        value={formValues.date}
                        readOnly
                      />
                    </div>
                    <div className="milagro-form-field">
                      <select
                        name="time"
                        value={formValues.time}
                        onChange={handleChange}
                      >
                        <option value="">Select Time *</option>
                        {[
                          "12:00 PM",
                          "12:30 PM",
                          "1:00 PM",
                          "1:30 PM",
                          "2:00 PM",
                          "2:30 PM",
                          "3:00 PM",
                          "3:30 PM",
                          "4:00 PM",
                          "4:30 PM",
                          "7:00 PM",
                          "7:30 PM",
                          "8:00 PM",
                          "8:30 PM",
                          "9:00 PM",
                          "9:30 PM",
                          "10:00 PM",
                        ].map((time) => (
                          <option key={time} value={time}>
                            {time}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="milagro-form-field milagro-seats-field">
                      <input
                        type="text"
                        name="seats"
                        placeholder="Seats *"
                        value={formValues.seats}
                        readOnly
                      />
                      <div className="milagro-seats-controls">
                        <button
                          type="button"
                          className="milagro-seats-btn"
                          onClick={() => handleSeatsChange(-1)}
                        >
                          -
                        </button>
                        <button
                          type="button"
                          className="milagro-seats-btn"
                          onClick={() => handleSeatsChange(1)}
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <div className="milagro-form-field milagro-form-full">
                      <select
                        name="gathering"
                        value={formValues.gathering}
                        onChange={handleChange}
                      >
                        <option value="">Select Gathering *</option>
                        <option value="small">A Small Gathering</option>
                        <option value="family">Family Dinner</option>
                        <option value="business">Business Meetup</option>
                        <option value="celebration">Celebration</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                    <div className="milagro-form-full">
                      <div className="milagro-form-actions">
                        {formError && (
                          <div className="milagro-form-warning" role="alert">
                            {formError}
                          </div>
                        )}
                        {formSuccess && (
                          <div className="milagro-form-success" role="status">
                            {formSuccess}
                          </div>
                        )}
                        <button
                          type="submit"
                          className="kf-btn"
                          disabled={isSubmitting}
                        >
                          <span>
                            {isSubmitting ? "SENDING..." : "ENQUIRE NOW"}
                          </span>
                        </button>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layouts>
  );
};
export default Contacts;
