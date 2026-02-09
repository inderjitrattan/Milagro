import { Formik } from 'formik';

const ReservationForm = () => {
  
  const formData = {
    "formspreeURL": "https://formspree.io/f/YOUR_API_KEY"
  }
  
  return (
    <>
      <Formik
        initialValues = {{ email: '', name: '', tel: '', date: '', time: '', persons: '1' }}
        validate = { values => {
            const errors = {};
            if (!values.email) {
                errors.email = 'Required';
            } else if (
                !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
            ) {
                errors.email = 'Invalid email address';
            }
            return errors;
        }}
        onSubmit = {( values, { setSubmitting, resetForm } ) => {
            const form = document.getElementById("contactForm");
            const status = document.getElementById("contactFormStatus");
            const data = new FormData();

            data.append('name', values.name);
            data.append('email', values.email);
            data.append('tel', values.tel);
            data.append('date', values.date);
            data.append('time', values.time);
            data.append('persons', values.persons);

            fetch(form.action, {
                method: 'POST',
                body: data,
                headers: {
                    'Accept': 'application/json'
                }
            }).then(response => {
                console.log(response);
                if (response.ok) {
                    resetForm();
                    status.innerHTML = "Thanks for your submission!";
                    status.style.display = 'block';
                    form.style.display = 'none';

                    setTimeout(function(){
                      status.style.display = 'none';
                      form.style.display = 'block';
                    }, 4000);
                } else {
                    response.json().then(data => {
                        if (Object.hasOwn(data, 'errors')) {
                            status.innerHTML = data["errors"].map(error => error["message"]).join(", ")
                        } else {
                            status.innerHTML = "Oops! There was a problem submitting your form"
                        }
                    })
                }
            }).catch(error => {
                status.innerHTML = "Oops! There was a problem submitting your form"
            });

            setSubmitting(false);
        }}
        >
        {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
            /* and other goodies */
        }) => (
        <form onSubmit={handleSubmit} id="contactForm" action={formData.formspreeURL}>

            <div className="row">
              <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6">
                <div className="kf-field">
                  <input
                    type="text" 
                    placeholder="Full Name"
                    name="name" 
                    required="required" 
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.name} 
                  />
                  <i className="far fa-user" />
                </div>
              </div>
              <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6">
                <div className="kf-field">
                  <input
                    type="email" 
                    placeholder="Email Address"
                    name="email"
                    required="required"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.email}
                  />
                  <i className="fas fa-at" />
                </div>
              </div>
              <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6">
                <div className="kf-field">
                  <input 
                    type="tel" 
                    name="tel" 
                    placeholder="Phone Number"
                    required="required"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.tel}
                  />
                  <i className="fas fa-mobile-alt" />
                </div>
              </div>
              <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6">
                <div className="kf-field">
                  <select 
                    name="persons"
                    value={values.persons}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  >
                    <option value="1" selected>1 Person</option>
                    <option value="2">2 Persons</option>
                    <option value="3">3 Persons</option>
                    <option value="4">4 Persons</option>
                  </select>
                </div>
              </div>
              <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6">
                <div className="kf-field">
                  <input 
                    type="date" 
                    name="date" 
                    required="required"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.date}
                  />
                  <i className="far fa-calendar-alt" />
                </div>
              </div>
              <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6">
                <div className="kf-field">
                  <input 
                    type="text" 
                    name="time" 
                    placeholder="Time" 
                    required="required"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.time}
                  />
                  <i className="far fa-clock" />{" "}
                </div>
              </div>
              <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                <div className="kf-bts">
                  <button
                    type="submit"
                    className="kf-btn"
                  >
                    <span>booking table</span>
                    <i className="fas fa-chevron-right" />
                  </button>
                </div>
              </div>
            </div>

        </form>
        )}
      </Formik>
      <div className="alert-success" style={{ display: "none", textAlign: "center" }} id="contactFormStatus">
        <p>Thanks, your message is sent successfully.</p>
      </div>
    </>
  );
};
export default ReservationForm;
