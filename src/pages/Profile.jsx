import { t } from "../lib/i18n";



import { useEffect, useState } from "react";



import { useNavigate } from "react-router-dom";



import {



  ArrowLeft,



  UserRound,



  Phone,



  Mail,



  ShieldCheck,



  Save,



  LogOut } from



"lucide-react";



import "./Profile.css";







import { api } from "../lib/api";







const Profile = () => {



  const navigate = useNavigate();







  const [profile, setProfile] = useState({ name: '', phone: '', email: '' });

  const [sync, setSync] = useState('Loading profile…');

  const [ready, setReady] = useState(false);

  const [busy, setBusy] = useState(false);

  useEffect(() => {let alive = true;api('/state/rakshaProfile').then((result) => {if (alive) {if (result.value) setProfile(result.value);setReady(true);setSync('');}}).catch((e) => {if (alive) setSync(e.message);});return () => {alive = false;};}, []);



  const [saved, setSaved] = useState(false);







  const handleChange = (e) => {



    setProfile({



      ...profile,



      [e.target.name]: e.target.value



    });



    setSaved(false);



  };







  const handleSave = async (e) => {

    e.preventDefault();if (busy || !ready) return;setBusy(true);setSaved(false);setSync('Saving…');

    try {await api('/state/rakshaProfile', { method: 'PUT', body: JSON.stringify({ value: profile }) });setSaved(true);setSync('Saved to your account');} catch (error) {setSync(error.message);} finally {setBusy(false);}

  };



  return (



    <div className="profile-page">



      

      

      <header className="profile-header">



        

        

        <button



          className="profile-back"



          onClick={() => navigate("/dashboard")}



          aria-label={t("Go back")}>



          



          

          

          <ArrowLeft size={22} />



        

        

        </button>







        



        



        <div>



          

          

          <h1>{t("Profile")}</h1>



          

          

          <p>{t("Manage your personal details")}</p>



        

        

        </div>



      

      

      </header>







      



      



      <main className="profile-content"><nav className="shakti-profile-menu" aria-label={t("Profile settings")}>{t([["Trusted Contacts", "/trusted-contacts"], ["App Settings", "/settings"], ["Language", "/language"], ["Privacy & Security", "/settings"], ["Help & Support", "/police-help"], ["About Shakti", "/onboarding"]].map(([label, to]) => <button key={label} onClick={() => navigate(to)}>{t(label)}<span>›</span></button>))}</nav>



        

        

        <section className="profile-hero">



          

          

          <div className="profile-avatar">



            

            

            <UserRound size={38} />



          

          

          </div>







          



          



          <h2>{profile.name || "Your Name"}</h2>



          

          

          <p>{profile.phone || "Add your phone number"}</p>







          



          



          <div className="profile-badge">



            

            

            <ShieldCheck size={15} />{t("Your personal profile")}







          </div>



        

        

        </section>







        



        



        <form className="profile-form" onSubmit={handleSave}>



          

          

          <h2>{t("Personal Information")}</h2>



          

          

          <p className="profile-form-subtitle">{t("Keep your details up to date.")}







          </p>







          



          



          <label htmlFor="profile-name">{t("Full Name")}</label>



          

          

          <div className="profile-input-wrap">



            

            

            <UserRound size={18} />



            

            

            <input



              id="profile-name"



              name="name"



              value={profile.name}



              onChange={handleChange}



              placeholder={t("Enter your full name")}



              required />



            



          

          

          </div>







          



          



          <label htmlFor="profile-phone">{t("Phone Number")}</label>



          

          

          <div className="profile-input-wrap">



            

            

            <Phone size={18} />



            

            

            <input



              id="profile-phone"



              name="phone"



              type="tel"



              value={profile.phone}



              onChange={handleChange}



              placeholder={t("Enter your phone number")}



              required />



            



          

          

          </div>







          



          



          <label htmlFor="profile-email">{t("Email Address")}</label>



          

          

          <div className="profile-input-wrap">



            

            

            <Mail size={18} />



            

            

            <input



              id="profile-email"



              name="email"



              type="email"



              value={profile.email}



              onChange={handleChange}



              placeholder={t("Enter your email (optional)")} />



            



          

          

          </div>







          



          



          {t(saved &&



          <p className="profile-success">



              

            

            {t(sync)}



            

          

          </p>)



          }







          



          



          <button className="profile-save-btn" type="submit" disabled={busy || !ready}>



            

            

            <Save size={18} />



            

            

            {t(busy ? "Saving…" : "Save Changes")}



          

          

          </button>



        

        

        </form>







        



        



        <button



          className="profile-logout-btn"



          onClick={async () => {try {await api("/auth/logout", { method: "POST" });try {localStorage.removeItem("rakshaUser");} catch {/* Session has ended. */}navigate("/login");} catch (error) {setSync("Sign out failed: " + error.message);}}}>



          



          

          

          <LogOut size={18} />{t("Sign out")}







        </button>







        



        



        <p className="profile-privacy">



          

          

          {t(sync)}



        

        

        </p>



      

      

      </main>



    

    

    </div>);







};







export default Profile;
