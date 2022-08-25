import { useState } from "react";
import "./components_css/CommentForm.css";

const ContactForm = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [yourMessage, setYourMessage] = useState("");

  const handleComment = (event) => {
    event.preventDefault();
    alert(
      "You Form Has Been Processed.  A Copy Has Been Sent to your Email Address."
    );
    setFirstName("");
    setLastName("");
    setEmail("");
    setYourMessage("");
  };

  return (
    <div>
      <form onSubmit={handleComment}>
        <label>First Name:
        <input
          id="first_name"
          label="First Name: "
          name="first_name"
          type="text"
          onChange={(event) => setFirstName(event.target.value)}
          value={firstName}
        /></label>
         <label>Last Name:
        <input
          id="last_name"
          name="last_name"
          type="text"
          onChange={(event) => setLastName(event.target.value)}
          value={lastName}
        /></label>
        <label>Email:
        <input
          id="_email"
          name="_email"
          type="text"
          onChange={(event) => setEmail(event.target.value)}
          value={email}
        /></label>
        <label>Message:
        <input
          id="your_message"
          name="your_message"
          type="text"
          onChange={(event) => setYourMessage(event.target.value)}
          value={yourMessage}
        /></label>

        <button type="submit">Submit Form</button>
      </form>
    </div>
  );
};
export default ContactForm;
