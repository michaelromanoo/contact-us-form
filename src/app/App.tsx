import { useForm, SubmitHandler } from "react-hook-form";
import "./App.css";
import { useState } from "react";

interface IFormData {
  name: string;
  email: string;
  message: string;
}

// isValid => set to true, if form doesnt have any errors
// isDirty => set to true, after the user modifies any of the inputs
// TODO: make an error component to display messages

const App = () => {
  const [emailSuccess, setEmailSuccess] = useState<
    "not sent" | "error" | "success"
  >("not sent");
  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
  } = useForm<IFormData>({ mode: "onChange" });

  const onSubmit: SubmitHandler<IFormData> = async (data) => {
    console.log("form values", data);

    await fetch("http://localhost:3000/send", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ data }),
    })
      .then((res) => {
        if (!res.ok) {
          setEmailSuccess("error");
          throw new Error(`HTTP error! Status ${res.status}`);
        }
        console.log("status", res.status);
        setEmailSuccess("success");
        res.json();
      })
      .then((data) => console.log("data", data));
  };

  console.log("errors", errors);

  return (
    <section id="contact-us">
      <div className="contact-us-heading">
        <h1>How can we help you today?</h1>
        <p>
          Need us to get in touch with you? Please fill out the form with your
          inquiry and we will get back to you.
        </p>
      </div>
      <form className="contact-us-form" onSubmit={handleSubmit(onSubmit)}>
        <div className="contact-us-form">
          <div className="contact-us-form-field">
            <label>Name</label>
            <input
              {...register("name", { required: true })}
              type="text"
              name="name"
              id={errors.name && "error-input"}
              placeholder="Enter your name..."
            />
            {errors.name?.type === "required" && (
              <p id="error">Name is required</p>
            )}
          </div>
          <div className="contact-us-form-field">
            <label>Email</label>
            <input
              {...register("email", { required: true })}
              id={errors.email && "error-input"}
              type="email"
              name="email"
              placeholder="Enter your email..."
            />
            {errors.email?.type === "required" && (
              <p id="error">Email is required</p>
            )}
          </div>
          <div className="contact-us-form-field">
            <label>Message</label>
            <textarea
              {...register("message", { required: true })}
              id={errors.message && "error-input"}
              placeholder="Type your message here.."
              rows={4}
              cols={30}
            />
            {errors.message?.type === "required" && (
              <p id="error">Message is required</p>
            )}
          </div>
        </div>
        <button type="submit" disabled={!isValid}>
          Submit
        </button>
        {emailSuccess === "success" && <p>Email Sent!</p>}
        {emailSuccess === "error" && (
          <p>There is an error. Please try again!</p>
        )}
      </form>
    </section>
  );
};

export default App;
