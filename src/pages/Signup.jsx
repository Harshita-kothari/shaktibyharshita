
import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  UserRound,
  Phone,
  Mail,
  Plus,
  UserRoundPlus,
  ArrowRight,
} from "lucide-react";
import "./Signup.css";

export default function Signup() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [contacts, setContacts] = useState([]);

  const handleContinue = (e) => {
  e.preventDefault();
  navigate("/verify-otp");
};

  const addContact = () => {
    setContacts([...contacts, { name: "", phone: "" }]);
  };

  const updateContact = (index, field, value) => {
    const updated = [...contacts];
    updated[index][field] = value;
    setContacts(updated);
  };

  return (
    <main className="account-page">
      <motion.section
        className="account-card"
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="account-content">
          <h1>Create Your Account</h1>
          <p className="account-subtitle">
            Let’s set up your safety profile
          </p>

          <form onSubmit={handleContinue}>
            <div className="account-fields">
              <div className="account-input">
                <UserRound size={19} />
                <input
                  type="text"
                  placeholder="Full Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>

              <div className="account-input">
                <Phone size={19} />
                <input
                  type="tel"
                  placeholder="Phone Number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                />
              </div>

              <div className="account-input">
                <Mail size={19} />
                <input
                  type="email"
                  placeholder="Email (optional)"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            <button type="submit" className="account-continue">
              Continue <ArrowRight size={18} />
            </button>
          </form>

          <div className="account-divider" />

          <section className="trusted-contacts">
            <h2>Trusted Contacts</h2>
            <p>Add people you trust for emergency alerts</p>

            <div className="contact-list">
              <div className="contact-avatar">👩🏻</div>
              <div className="contact-avatar">👩🏽</div>
              <div className="contact-avatar">👩🏼</div>
              <div className="contact-avatar">👩🏾</div>

              <button
                type="button"
                className="contact-add"
                onClick={addContact}
                aria-label="Add trusted contact"
              >
                <Plus size={22} />
              </button>

              <button
                type="button"
                className="contact-add-label"
                onClick={addContact}
              >
                <UserRoundPlus size={18} />
                <span>Add</span>
              </button>
            </div>

            {contacts.map((contact, index) => (
              <div className="new-contact-fields" key={index}>
                <input
                  type="text"
                  placeholder="Contact name"
                  value={contact.name}
                  onChange={(e) =>
                    updateContact(index, "name", e.target.value)
                  }
                />
                <input
                  type="tel"
                  placeholder="Phone number"
                  value={contact.phone}
                  onChange={(e) =>
                    updateContact(index, "phone", e.target.value)
                  }
                />
              </div>
            ))}
          </section>

          <button
            type="button"
            className="skip-button"
            onClick={() => alert("You can add trusted contacts later 💗")}
          >
            Skip for now
          </button>
        </div>
      </motion.section>
    </main>
  );
}