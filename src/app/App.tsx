import { useForm, SubmitHandler } from "react-hook-form";
import "./App.css";

type FormData = {
  name: string;
  email: string;
  message: string;
};

function App() {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<FormData>();
  const onSubmit: SubmitHandler<FormData> = (data) => {
    console.log("form values", data);
  };
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
              {...register("name")}
              type="text"
              name="name"
              placeholder="Enter your name..."
            />
          </div>
          <div className="contact-us-form-field">
            <label>Email</label>
            <input
              {...register("email", { required: true })}
              type="email"
              name="email"
              placeholder="Enter your email..."
            />
            {errors.email?.type === "required" && (
              <p role="alert">First name is required</p>
            )}
          </div>
          <div className="contact-us-form-field">
            <label>Message</label>
            <textarea
              {...register("message")}
              placeholder="Type your message here.."
              rows={4}
              cols={30}
            />
          </div>
        </div>
        <button type="submit">Submit</button>
      </form>
    </section>
  );
}

export default App;
