import { useRef, useState, useCallback } from "react"; 
import emailjs from "@emailjs/browser";

const Contacts = () => {
  const formRef = useRef();
  const [loading, setLoading] = useState(false);
  const [fadeOutError, setFadeOutError] = useState(false); // Control error message fade-out
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: ""
  });
  const [error, setError] = useState(""); // Error message (empty initially)
  const [success, setSuccess] = useState(null); // Success message

  const handleChange = useCallback(({ target: { name, value } }) => {
    setForm({ ...form, [name]: value });
  }, [form]);

  const validateForm = useCallback(() => {
    if (!form.name || !form.email || !form.message) {
      setError("All fields must be filled!"); // 🔴 Set error message
      setFadeOutError(false); // Reset fade state
      setTimeout(() => {
        setFadeOutError(true); // 🔴 Start fade effect after a delay
        setTimeout(() => setError(""), 500); // 🔴 Hide error after fade
      }, 3000);
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.email)) {
      setError("Please enter a valid email address.");
      setFadeOutError(false);
      setTimeout(() => {
        setFadeOutError(true);
        setTimeout(() => setError(""), 500);
      }, 3000);
      return false;
    }

    setError(""); // Clear error if validation passes
    return true;
  }, [form]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return; // Prevent submission if validation fails

    setLoading(true);
    setSuccess(null);
    setError("");

    try {
      await emailjs.send(
        "service_xw20fid",
        "template_6ue8v7t",
        {
          from_name: form.name,
          to_name: "Omer Awan",
          from_email: form.email,
          to_email: "Umarfarooq6153@gmail.com",
          message: form.message
        },
        "zj6MEh0efnbcWQroD"
      );

      setSuccess("Your message has been sent successfully!");
      setForm({ name: "", email: "", message: "" });

      // 🔹 Remove success message after 3 seconds
      setTimeout(() => {
        setSuccess(null);
      }, 3000);
    } catch (error) {
      console.error("Error sending email:", error);
      setError("Failed to send email. Please try again later.");

      // 🔹 Remove error message after 3 seconds
      setTimeout(() => {
        setError("");
      }, 3000);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="sm:px-10 px-1 my-5 min-h-screen" id="contact">
      <div className="relative min-h-screen w-full flex items-center justify-center">
        {/* Hidden terminal image on small devices */}
        <img
          className="absolute inset-0 w-full h-full object-contain hidden sm:block"
          src="/assets/terminal.png"
          alt="terminal-bg"
          loading="lazy" // Lazy load terminal image
        />
        <div className="min-h-screen max-w-xl relative z-10 sm:px-10 px-5 mt-12">
          <h3 className="sm:text-4xl text-3xl mt-8 font-semibold text-gray_gradient">
            Contact Me
          </h3>
          <p className="text-lg text-white mt-3">
            Feel free to reach out to me with any questions or inquiries. I'm always here to help!
          </p>

          {/* Displaying Success or Error Message */}
          {success && (
            <div className="bg-green-500 text-white p-3 mt-4 rounded-md">
              {success}
            </div>
          )}
          {error && (
            <div
              className={`bg-red-500 text-white p-3 mt-4 rounded-md transition-opacity duration-500 ease-in-out ${
                fadeOutError ? "opacity-0" : "opacity-100"
              }`}
            >
              {error}
            </div>
          )}

          {/* Contact Form */}
          <form className="mt-12 flex flex-col space-y-7" onSubmit={handleSubmit} ref={formRef}>
            <input
              type="text"
              placeholder="Name"
              className={`border-2 rounded-md p-3 w-full focus:outline-none focus:border-blue-500 ${
                error && !form.name ? "border-red-500" : "border-gray-400"
              }`}
              name="name"
              value={form.name}
              onChange={handleChange}
            />
            <input
              type="email"
              placeholder="Abc@example.com"
              className={`border-2 rounded-md p-3 w-full focus:outline-none focus:border-blue-500 ${
                error && !form.email ? "border-red-500" : "border-gray-400"
              }`}
              name="email"
              value={form.email}
              onChange={handleChange}
            />
            <textarea
              placeholder="Message"
              className={`border-2 rounded-md p-3 w-full focus:outline-none focus:border-blue-500 h-36 ${
                error && !form.message ? "border-red-500" : "border-gray-400"
              }`}
              name="message"
              value={form.message}
              onChange={handleChange}
            />

            <button
              disabled={loading}
              className="bg-gray-500 px-5 py-2 min-h-12 rounded-lg shadow-black-200 shadow-2xl flex justify-center items-center text-lg text-white gap-3"
            >
              {loading ? (
                <svg
                  className="w-6 h-6 animate-spin text-blue-700"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="10" stroke="currentColor" fill="none" />
                  <path d="M4 12a8 8 0 0 1 8-8V4" fill="none" />
                </svg>
              ) : (
                <span className="flex items-center gap-2">
                  Send Message
                  <img src="/assets/mail.png" alt="send" className="w-5 h-5" />
                </span>
              )}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contacts;
