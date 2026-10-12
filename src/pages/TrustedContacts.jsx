import { t } from "../lib/i18n";

import { useState } from "react";

import { motion } from "framer-motion";

import { useNavigate, useSearchParams } from "react-router-dom";

import {

  ArrowLeft,

  Users,

  Plus,

  Phone,

  Trash2,

  Pencil,

  X,

  Check } from

"lucide-react";

import "./TrustedContacts.css";

import { useServerState } from "../lib/useServerState";



export default function TrustedContacts() {

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const onboarding = searchParams.get("setup") === "1";



  const [contacts, setContacts, sync, ready, retrySync] = useServerState("trustedContacts", []);



  const [showForm, setShowForm] = useState(false);

  const [editingId, setEditingId] = useState(null);

  const [name, setName] = useState("");

  const [phone, setPhone] = useState("");

  const [error, setError] = useState("");

  const [notice, setNotice] = useState("");

  const [removed, setRemoved] = useState(null);



  const openAddForm = () => {

    if (contacts.length >= 5) return;

    setError("");

    setEditingId(null);

    setName("");

    setPhone("");

    setShowForm(true);

  };



  const openEditForm = (contact) => {

    setError("");

    setEditingId(contact.id);

    setName(contact.name);

    setPhone(contact.phone);

    setShowForm(true);

  };



  const handleSave = (e) => {

    e.preventDefault();



    const digits = phone.replace(/[\s()-]/g, "");

    const national = digits.replace(/^(\+91|0091|91)(?=\d{10}$)/, "");

    if (!name.trim()) {setError("Please enter a contact name.");return;}

    if (!/^[6-9]\d{9}$/.test(national)) {setError("Enter a valid 10-digit Indian mobile number, with optional +91.");return;}

    const cleanPhone = "+91" + national;

    if (contacts.some((c) => c.id !== editingId && c.phone.replace(/\D/g, "").slice(-10) === national)) {setError("This phone number is already in your trusted contacts.");return;}

    if (!editingId && contacts.length >= 5) {setError("You can add up to 5 contacts.");return;}

    setNotice(editingId ? "Contact updated." : "Contact added. Saved to your account when signed in.");



    if (editingId) {

      setContacts((previous) =>

      previous.map((contact) =>

      contact.id === editingId ?

      { ...contact, name: name.trim(), phone: cleanPhone } :

      contact

      )

      );

    } else {

      setContacts((previous) => [

      ...previous,

      {

        id: crypto.randomUUID(),

        name: name.trim(),

        phone: cleanPhone

      }]

      );

    }



    setShowForm(false);

    setName("");

    setPhone("");

    setEditingId(null);

  };



  const deleteContact = (id) => {

    setRemoved(contacts.find((c) => c.id === id));

    setNotice("Contact removed.");

    setContacts((previous) =>

    previous.filter((contact) => contact.id !== id)

    );

  };



  return (

    <main className="contacts-page">

      <header className="contacts-header">

        <button

          className="contacts-back"

          onClick={() => navigate("/dashboard")}

          aria-label={t("Back to dashboard")}>

          

          <ArrowLeft size={21} />

        </button>



        <div>

          <h1>{t("Trusted Contacts")}</h1>

          <p>{t("Your emergency support circle")}</p>

        </div>

      </header>



      <motion.section

        className="contacts-info"

        initial={{ opacity: 0, y: 15 }}

        animate={{ opacity: 1, y: 0 }}>

        

        <div className="contacts-info-icon">

          <Users size={25} />

        </div>

        <div>

          <h2>{t("People you trust")}</h2>

          <p>{t("Add 3\u20135 people you trust. Sign in to save your circle to your account. For push alerts, connect each person through Safety Circle. SMS requires you to tap Send.")}



          </p>

        </div>

      </motion.section>



      <button className="sos-police-link" style={{ display: "block", margin: "20px auto" }} onClick={() => navigate("/push-setup")}>{t("Connect your circle for push alerts \u2192")}</button>
      <div className="contacts-section-heading">

        <div>

          <h2>{t("My Contacts")}</h2>

          <span>{t(contacts.length)} {t("/ 5 added \xB7")} {t(contacts.length < 3 ? `Add ${3 - contacts.length} more to build your circle` : "Your circle is ready")}</span>

        </div>



        <button className="add-contact-button" onClick={openAddForm} disabled={!ready || contacts.length >= 5}>

          <Plus size={18} />{t("Add Contact")}



        </button>

      </div>



      {t(onboarding && <section className="contacts-intro" aria-label={t("Set up your safety circle")}><h2>{t("First, add someone you trust")}</h2><p>{t("Add your emergency contacts so they are easy to reach when you need help. You can add up to 5.")}</p><button className="save-contact-button" disabled={!ready || sync === "Saving…" || sync === "Loading saved data…" || contacts.length > 0 && !sync.includes("saved") && !sync.includes("Saved")} onClick={() => navigate("/dashboard", { replace: true })}>{t(contacts.length > 0 ? "Continue to dashboard" : "Skip for now")}</button></section>)}
      <p className="contacts-feedback" role="status">{t(sync)}</p>{(sync.startsWith("Not synced:")||!ready)&&<button className="save-contact-button" onClick={retrySync}>{t("Retry connection / save")}</button>} {t(!ready && <button className="save-contact-button" onClick={() => navigate("/login")}>{t("Sign in to manage contacts")}</button>)}<div className="contacts-feedback" role="status">{t(notice)} {t(removed && <button disabled={contacts.length >= 5} onClick={() => {

          if (contacts.length >= 5) {setNotice("Your circle is full. Remove a contact before restoring.");return;}

          if (contacts.some((c) => c.phone.replace(/\D/g, "").slice(-10) === removed.phone.replace(/\D/g, "").slice(-10))) {setNotice("This number is already in your circle.");return;}

          setContacts((previous) => [...previous, removed]);setRemoved(null);setNotice("Contact restored.");

        }}>{t("Undo remove")}</button>)}</div>



      {t(contacts.length === 0 ?

      <div className="contacts-empty">

          <div className="empty-contact-icon">

            <Users size={32} />

          </div>

          <h3>{t("No trusted contacts yet")}</h3>

          <p>{t("Add a family member or someone you trust.")}</p>

          <button onClick={openAddForm}>

            <Plus size={18} />{t("Add your first contact")}



        </button>

        </div> :



      <div className="contacts-list">

          {t(contacts.map((contact) =>

        <motion.article

          className="saved-contact"

          key={contact.id}

          initial={{ opacity: 0, y: 10 }}

          animate={{ opacity: 1, y: 0 }}>

          

              <div className="saved-contact-avatar">

                {contact.name.charAt(0).toUpperCase()}

              </div>



              <div className="saved-contact-details">

                <h3>{contact.name}</h3>

                <p>

                  <Phone size={14} />

                  {contact.phone}

                </p>

              </div>



              <div className="contact-actions">

                <button

              onClick={() => openEditForm(contact)}

              aria-label={t(`Edit ${contact.name}`)}>

              

                  <Pencil size={17} />

                </button>

                <button

              onClick={() => deleteContact(contact.id)}

              aria-label={t(`Remove ${contact.name}`)}>

              

                  <Trash2 size={17} />

                </button>

              </div>

            </motion.article>

        ))}

        </div>)

      }



      {t(showForm &&

      <div className="contact-modal-backdrop">

          <motion.form

          className="contact-modal"

          onSubmit={handleSave}

          initial={{ opacity: 0, scale: 0.95, y: 15 }}

          animate={{ opacity: 1, scale: 1, y: 0 }}>

          

            <div className="contact-modal-heading">

              <div>

                <h2>{t(editingId ? "Edit Contact" : "Add Trusted Contact")}</h2>

                <p>{t("Enter their contact details")}</p>

              </div>



              <button

              type="button"

              onClick={() => setShowForm(false)}

              aria-label={t("Close form")}>

              

                <X size={20} />

              </button>

            </div>



            <label htmlFor="contact-name">{t("Name")}</label>

            <input

            id="contact-name"

            autoFocus

            maxLength={60}

            type="text"

            placeholder={t("Enter contact name")}

            value={name}

            onChange={(e) => setName(e.target.value)}

            required />

          



            <label htmlFor="contact-phone">{t("Phone Number")}</label>

            <input

            id="contact-phone"

            inputMode="tel"

            maxLength={20}

            aria-describedby="contact-phone-help contact-error"

            type="tel"

            placeholder={t("Enter phone number")}

            value={phone}

            onChange={(e) => setPhone(e.target.value)}

            required />

          

            <p id="contact-phone-help" className="contact-help">{t("Indian mobile number \xB7 e.g. +91 98765 43210")}</p>

            <p id="contact-error" role="alert" className="contact-error">{t(error)}</p>



            <button type="submit" className="save-contact-button">

              <Check size={18} />{t("Save Contact")}



          </button>

          </motion.form>

        </div>)

      }

    </main>);



}
