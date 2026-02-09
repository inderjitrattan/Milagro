import VideoPlayer from "@/src/components/VideoPlayer";
import InstaCarousel from "@/src/components/sliders/InstaCarousel";
import TestimonialsCarousel from "@/src/components/sliders/TestimonialsCarousel";
import ReservationSection from "@/src/components/sections/Reservation";

import Layouts from "@/src/layouts/Layouts";
import { sliderProps } from "@/src/sliderProps";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { useEffect, useState, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

const Index2 = () => {
  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    email: "",
    date: "",
    time: "",
    seats: 1,
  });
  const [formError, setFormError] = useState("");
  const [formSuccess, setFormSuccess] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const dateInputRef = useRef(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    if (formError) {
      setFormError("");
    }
    if (formSuccess) {
      setFormSuccess("");
    }
  };

  const handleSeatsChange = (increment) => {
    setFormData({
      ...formData,
      seats: Math.max(1, formData.seats + increment),
    });
  };

  const getReservationValidationError = () => {
    const name = formData.name.trim();
    if (!name) {
      return "Please enter your name.";
    }

    const rawMobile = formData.mobile.trim();
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

    const email = formData.email.trim();
    if (!email) {
      return "Please enter your email address.";
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) {
      return "Please enter a valid email address.";
    }

    if (!formData.date) {
      return "Please select a date.";
    }

    if (!formData.time) {
      return "Please select a time.";
    }

    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

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
      const response = await fetch('/api/send-reservation', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setFormSuccess("Reservation request sent successfully! Check your email for confirmation.");
        // Reset form
        setFormData({
          name: "",
          mobile: "",
          email: "",
          date: "",
          time: "",
          seats: 1,
        });
      } else {
        setFormError('Error sending reservation: ' + data.message);
      }
    } catch (error) {
      console.error('Error:', error);
      setFormError('Error sending reservation. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleWhatsAppReservation = () => {
    const validationError = getReservationValidationError();
    if (validationError) {
      setFormError(validationError);
      return;
    }
    setFormError("");

    const message = `Hi, I would like to make a reservation:\nName: ${formData.name}\nMobile: ${formData.mobile}\nEmail: ${formData.email}\nDate: ${formData.date}\nTime: ${formData.time}\nSeats: ${formData.seats}`;
    const whatsappUrl = `https://wa.me/YOUR_PHONE_NUMBER?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");
  };

  const handleContactSubmit = (e) => {
    e.preventDefault();
  };

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Initialize Flatpickr date picker
    if (dateInputRef.current) {
      flatpickr(dateInputRef.current, {
        minDate: new Date(),
        dateFormat: "Y-m-d",
        onChange: (selectedDates) => {
          if (selectedDates.length > 0) {
            const date = selectedDates[0];
            const dateStr = date.getFullYear() + '-' + String(date.getMonth() + 1).padStart(2, '0') + '-' + String(date.getDate()).padStart(2, '0');
            setFormData((prevFormData) => ({
              ...prevFormData,
              date: dateStr,
            }));
          }
        },
      });
    }

    const ctx = gsap.context(() => {
      // First section animations
      gsap.to(".milagro-special-1 .milagro-plate", {
        rotation: 360,
        ease: "none",
        transformOrigin: "50% 50%",
        scrollTrigger: {
          trigger: ".milagro-special-1",
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });

      gsap.to(".milagro-special-1 .milagro-dish", {
        rotation: -360,
        ease: "none",
        transformOrigin: "50% 50%",
        scrollTrigger: {
          trigger: ".milagro-special-1",
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });

      // Second section animations
      gsap.to(".milagro-special-2 .milagro-plate", {
        rotation: 360,
        ease: "none",
        transformOrigin: "50% 50%",
        scrollTrigger: {
          trigger: ".milagro-special-2",
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });

      gsap.to(".milagro-special-2 .milagro-dish", {
        rotation: -360,
        ease: "none",
        transformOrigin: "50% 50%",
        scrollTrigger: {
          trigger: ".milagro-special-2",
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });

      // Third section animations
      gsap.to(".milagro-special-3 .milagro-plate", {
        rotation: 360,
        ease: "none",
        transformOrigin: "50% 50%",
        scrollTrigger: {
          trigger: ".milagro-special-3",
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });

      gsap.to(".milagro-special-3 .milagro-dish", {
        rotation: -360,
        ease: "none",
        transformOrigin: "50% 50%",
        scrollTrigger: {
          trigger: ".milagro-special-3",
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <Layouts>
      {/* Section Started Slider */}
      <section className="section kf-started-slider" id="home">
        <Swiper
          {...sliderProps.mainSliderSelector}
          className="swiper-container"
        >
          <div className="swiper-wrapper">
            <SwiperSlide className="swiper-slide">
              <div className="kf-started-item">
                <div
                  className="slide js-parallax"
                  style={{ backgroundImage: "url(images/started_img7.jpg)" }}
                />
                <div className="container">
                  <div className="description align-left element-anim-1">
                    <div className="subtitles">Welcome to the Milagro</div>
                    <h2 className="name text-anim-1" data-splitting="chars">
                      Reserve Your <br />
                      Table Today
                    </h2>
                    <div className="kf-bts">
                      <Link href="menu-restaurant" className="kf-btn">
                        <span>explore more</span>
                        <i className="fas fa-chevron-right" />
                      </Link>
                      <Link href="reservation" className="kf-btn dark-btn">
                        <span>get delivery</span>
                        <i className="fas fa-chevron-right" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide className="swiper-slide">
              <div className="kf-started-item">
                <div
                  className="slide js-parallax"
                  style={{ backgroundImage: "url(images/started_img5.jpg)" }}
                />
                <div className="container">
                  <div className="description align-left element-anim-1">
                    <div className="subtitles">Welcome to the Milagro</div>
                    <h2 className="name text-anim-1" data-splitting="chars">
                      Explore The <br />
                      Lobsters
                    </h2>
                    <div className="kf-bts">
                      <Link href="menu-restaurant" className="kf-btn">
                        <span>explore more</span>
                        <i className="fas fa-chevron-right" />
                      </Link>
                      <Link href="reservation" className="kf-btn dark-btn">
                        <span>get delivery</span>
                        <i className="fas fa-chevron-right" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide className="swiper-slide">
              <div className="kf-started-item">
                <div
                  className="slide js-parallax"
                  style={{ backgroundImage: "url(images/started_img6.jpg)" }}
                />
                <div className="container">
                  <div className="description align-left element-anim-1">
                    <div className="subtitles">Welcome to the Milagro</div>
                    <h2 className="name text-anim-1" data-splitting="chars">
                      Premium <br />
                      Meat Milagro
                    </h2>
                    <div className="kf-bts">
                      <Link href="menu-restaurant" className="kf-btn">
                        <span>explore more</span>
                        <i className="fas fa-chevron-right" />
                      </Link>
                      <Link href="reservation" className="kf-btn dark-btn">
                        <span>get delivery</span>
                        <i className="fas fa-chevron-right" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          </div>
          <div className="swiper-button-prev" />
          <div className="swiper-button-next" />
        </Swiper>
      </section>

{/* About Milagro – Table Collage */}
<section className="section about-milagro" id="about">
  <div className="container">
    <h2 className="about-title">About Milagro</h2>

    <div className="about-table-wrapper">
      <table className="about-table">
        <tbody>
          <tr>
            <td>
              <img src="/images/abt01.webp" alt="" />
            </td>

            <td rowSpan={2}>
              <img src="/images/abt03.webp" alt="" />
            </td>

            <td rowSpan={4} className="center">
              <img src="/images/abt_main.webp" alt="Chef" />
            </td>

            <td>
              <img src="/images/abt07.webp" alt="" />
            </td>

            <td rowSpan={2}>
              <img src="/images/abt09.webp" alt="" />
            </td>
          </tr>

          <tr>
            <td>
              <img src="/images/abt02.webp" alt="" />
            </td>
            <td>
              <img src="/images/abt08.webp" alt="" />
            </td>
          </tr>

          <tr>
            <td rowSpan={2}>
              <img src="/images/abt04.webp" alt="" />
            </td>

            <td>
              <img src="/images/abt05.webp" alt="" />
            </td>

            <td rowSpan={2}>
              <img src="/images/abt10.webp" alt="" />
            </td>

            <td>
              <img src="/images/abt11.webp" alt="" />
            </td>
          </tr>

          <tr>
            <td>
              <img src="/images/abt06.webp" alt="" />
            </td>
            <td>
              <img src="/images/abt12.webp" alt="" />
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <p className="about-text">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed diam nonummy
      nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut
      wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit
      lobortis nisl ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit
      amet.
    </p>
  </div>
</section>

      {/* Section Special Dish */}
      <section
        className="section milagro-special milagro-special-1"
        style={{ backgroundImage: "url(images/BG.png)" }}
        id="menu"
      >
        <div className="container">
          <h2 className="about-title">Spanish Inspired  Cuisine</h2>
          <div className="row align-items-center">
            <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6">
              <div className="milagro-special-media">
                <img
                  src="/images/BG Splash.png"
                  alt="plate"
                  className="milagro-plate"
                />
                <img
                  src="/images/Homemade Spaghetti Vongole.png"
                  alt="dish"
                  className="milagro-dish"
                />
              </div>
            </div>
            <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6">
              <div className="milagro-special-content">
                <h2 className="milagro-special-title">
                  Homemade<br />Spaghetti Vongole
                </h2>
                <p className="milagro-special-text">
                  Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed
                  diam nonummy nibh euismod tincidunt.
                </p>
                <Link href="menu-restaurant" className="kf-btn">
                  <span>View Menu</span>
                  <i className="fas fa-chevron-right" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section Special Dish 2 */}
      <section
        className="section milagro-special milagro-special-2"
        style={{ backgroundImage: "url(images/BG.png)" }}
      >
        <div className="container">
          <div className="row align-items-center">
            <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6 order-md-2">
              <div className="milagro-special-media">
                <img
                  src="/images/BG Splash.png"
                  alt="plate"
                  className="milagro-plate"
                />
                <img
                  src="/images/Seafood Paella.png"
                  alt="dish"
                  className="milagro-dish"
                />
              </div>
            </div>
            <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6 order-md-1">
              <div className="milagro-special-content">
                <h2 className="milagro-special-title">
                  Seafood Paella
                </h2>
                <p className="milagro-special-text">
                  Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed
                  diam nonummy nibh euismod tincidunt.
                </p>
                <Link href="menu-restaurant" className="kf-btn">
                  <span>View Menu</span>
                  <i className="fas fa-chevron-right" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section Special Dish 3 */}
      <section
        className="section milagro-special milagro-special-3"
        style={{ backgroundImage: "url(images/BG.png)" }}
      >
        <div className="container">
          <div className="row align-items-center">
            <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6">
              <div className="milagro-special-media">
                <img
                  src="/images/BG Splash.png"
                  alt="plate"
                  className="milagro-plate"
                />
                <img
                  src="/images/Dessert.png"
                  alt="dish"
                  className="milagro-dish"
                />
              </div>
            </div>
            <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6">
              <div className="milagro-special-content">
                <h2 className="milagro-special-title">
                  Desserts
                </h2>
                <p className="milagro-special-text">
                  Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed
                  diam nonummy nibh euismod tincidunt.
                </p>
                <Link href="menu-restaurant" className="kf-btn">
                  <span>View Menu</span>
                  <i className="fas fa-chevron-right" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section Reservation Page */}
      <section className="section milagro-reservation-page" id="reservation">
        <div className="container">
          <h2 className="about-title">Reservation</h2>
          
          <div className="milagro-reservation-description">
            <p>
              A Destination Where Spanish Artistry Meets European Sophistication. After A Celebrated Debut In Goa, Milagro Brings Its Signature Blend Of Exceptional Cuisine, Captivating Interiors, And World-Class Hospitality To The Heart Of Mumbai.
            </p>
            <p>
              From Romantic Fine Dining To A High-Energy Cocktail Bar, Every Corner Is Crafted To Elevate Your Senses. For Those Seeking Exclusivity, Our Bespoke Private Dining Setups Transform Intimate Celebrations And Corporate Gatherings Into Unforgettable Moments.
            </p>
          </div>

          <div className="milagro-reservation-notice">
            <h2>A New Milagro Experience Is Taking Shape. Stay Tuned!<br />In The Meantime, You May Request A Reservation.</h2>
          </div>

          <form className="milagro-reservation-form" onSubmit={handleSubmit}>
            <div className="milagro-form-grid">
              <div className="milagro-form-field">
                <input
                  type="text"
                  name="name"
                  placeholder="Name *"
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>
              <div className="milagro-form-field">
                <input
                  type="tel"
                  name="mobile"
                  placeholder="Mobile Number *"
                  value={formData.mobile}
                  onChange={handleChange}
                />
              </div>
              <div className="milagro-form-field">
                <input
                  type="email"
                  name="email"
                  placeholder="Email *"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
              <div className="milagro-form-field">
                <input
                  ref={dateInputRef}
                  type="text"
                  name="date"
                  placeholder="Select Date *"
                  value={formData.date}
                  readOnly
                  required
                />
              </div>
              <div className="milagro-form-field">
                <select
                  name="time"
                  value={formData.time}
                  onChange={handleChange}
                >
                  <option value="">Select Time *</option>
                  {['12:00 PM', '12:30 PM', '1:00 PM', '1:30 PM', '2:00 PM', '2:30 PM', '3:00 PM', '3:30 PM', '4:00 PM', '4:30 PM', '7:00 PM', '7:30 PM', '8:00 PM', '8:30 PM', '9:00 PM', '9:30 PM', '10:00 PM'].map((time) => (
                    <option key={time} value={time}>{time}</option>
                  ))}
                </select>
              </div>
              <div className="milagro-form-field milagro-seats-field">
                <input
                  type="text"
                  name="seats"
                  placeholder="Seats *"
                  value={formData.seats}
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
            </div>

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
              <button type="submit" className="kf-btn" disabled={isSubmitting}>
                <span>{isSubmitting ? "SENDING..." : "RESERVE"}</span>
                <i className="fas fa-chevron-right" />
              </button>
              <button
                type="button"
                className="milagro-whatsapp-btn"
                onClick={handleWhatsAppReservation}
              >
                RESERVE ON WHATSAPP
              </button>
            </div>
          </form>
        </div>
      </section>
    </Layouts>
  );
};
export default Index2;
