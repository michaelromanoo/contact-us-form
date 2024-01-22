import { FormEvent } from "react";
import "./App.css";

function App() {
  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log("hello");
  };
  return (
    <section id="contact-us">
      <div className="contact-us-text">
        <h1>Contact Us</h1>
        <p>
          Need us to get in touch with you? Please fill out the form with your
          inquiry and we will get back to you
        </p>
      </div>
      <form className="contact-us-form" onSubmit={onSubmit}>
        <div className="contact-us-form-field">
          <label>Name</label>
          <input type="text" name="name" />
        </div>

        <button type="submit">submit</button>
      </form>
    </section>
  );
}

export default App;
