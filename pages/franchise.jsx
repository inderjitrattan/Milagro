import { useState } from "react";

import Layouts from "@/src/layouts/Layouts";

const Franchise = () => {
  const [formValues, setFormValues] = useState({
    name: "",
    phone: "",
    email: "",
    location: "",
    message: "",
  });
  const [formError, setFormError] = useState("");
  const [formSuccess, setFormSuccess] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormValues((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (formError) {
      setFormError("");
    }
    if (formSuccess) {
      setFormSuccess("");
    }
  };

  const getFranchiseValidationError = () => {
    if (!formValues.name.trim()) {
      return "Please enter your name.";
    }

    const rawPhone = formValues.phone.trim();
    if (!rawPhone) {
      return "Please enter your mobile number.";
    }

    const compactPhone = rawPhone.replace(/[\s-]/g, "");
    let mobileNumber = compactPhone;
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

    if (!formValues.location.trim()) {
      return "Please enter your location.";
    }

    if (!formValues.message.trim()) {
      return "Please enter your message.";
    }

    return null;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (isSubmitting) {
      return;
    }

    const validationError = getFranchiseValidationError();
    if (validationError) {
      setFormError(validationError);
      return;
    }

    setFormError("");
    setFormSuccess("");
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/send-franchise", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formValues),
      });

      if (response.ok) {
        setFormSuccess("Thanks for your submission! We'll be in touch soon.");
        setFormValues({
          name: "",
          phone: "",
          email: "",
          location: "",
          message: "",
        });
      } else {
        const responseData = await response.json().catch(() => ({}));
        setFormError(
          responseData?.message || "Oops! There was a problem submitting your form."
        );
      }
    } catch (error) {
      setFormError("Oops! There was a problem submitting your form.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Layouts>
      <section className="section milagro-reservation-page">
        <div className="container">
          <h2 className="about-title">Franchise</h2>
        </div>
        <div className="container">
          <div className="milagro-reservation-description">
            <p>
              A thoughtfully built fine-dining brand blending Spanish cuisine, culture,
              and immersive experiences, now open for franchise partnerships.
            </p>
          </div>
          <div className="milagro-reservation-notice">
            <h2>Tell Us About Your City</h2>
          </div>
          <form
            id="franchiseForm"
            className="milagro-reservation-form"
            onSubmit={handleSubmit}
          >
            <div className="milagro-form-grid milagro-franchise-grid">
              <div className="milagro-form-field milagro-form-full">
                <input
                  type="text"
                  name="name"
                  placeholder="Name"
                  value={formValues.name}
                  onChange={handleChange}
                  required="required"
                />
              </div>
              <div className="milagro-form-field">
                <input
                  type="tel"
                  name="phone"
                  placeholder="Mobile Number"
                  value={formValues.phone}
                  onChange={handleChange}
                  required="required"
                />
              </div>
              <div className="milagro-form-field">
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formValues.email}
                  onChange={handleChange}
                  required="required"
                />
              </div>
              <div className="milagro-form-field milagro-form-full">
                <input
                  type="text"
                  name="location"
                  placeholder="Location"
                  value={formValues.location}
                  onChange={handleChange}
                  required="required"
                />
              </div>
              <div className="milagro-form-field milagro-form-full">
                <textarea
                  name="message"
                  placeholder="Message"
                  value={formValues.message}
                  onChange={handleChange}
                  required="required"
                />
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
                <span>{isSubmitting ? "SENDING..." : "ENQUIRE NOW"}</span>
                <i className="fas fa-chevron-right" />
              </button>
            </div>
          </form>
        </div>
      </section>
    </Layouts>
  );
};
export default Franchise;
