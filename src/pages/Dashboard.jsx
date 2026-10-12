

import { motion } from "framer-motion";

import { useState, useEffect } from "react";

import {

  ShieldCheck,

  Sun, Moon,

  MapPin,

  Users,

  PhoneCall,

  Bell,

  Home,

  UserRound,

  ChevronRight,

  Route,

  History,

  BookOpen,

  Settings,

  X,

  CheckCheck,

} from "lucide-react";

import { useNavigate } from "react-router-dom";

import "./Dashboard.css";

import { api } from "../lib/api";

import HoldSOS from "../components/HoldSOS";



export default function Dashboard() {

  const navigate = useNavigate();

  const [account,setAccount]=useState(null);

  useEffect(()=>{api("/auth/me").then(setAccount).catch(()=>setAccount(null));},[]);

  const [darkTheme, setDarkTheme] = useState(() => document.documentElement.dataset.theme === "dark");

  const toggleTheme = () => { const next = !darkTheme; setDarkTheme(next); document.documentElement.dataset.theme = next ? "dark" : "light"; try { localStorage.setItem("rakshaTheme", next ? "dark" : "light"); } catch { /* Theme still applies for this session. */ } };



  const [showNotifications, setShowNotifications] = useState(false);

  const [showMore, setShowMore] = useState(false);



  const [notifications, setNotifications] = useState([]);
  const [notificationError, setNotificationError] = useState("");
  useEffect(() => {
    let active = true;
    const refresh = () => api("/alerts").then(items => {
      if (active) { setNotifications(items.map(item => ({...item, message: item.description, time: new Date(item.date).toLocaleString()}))); setNotificationError(""); }
    }).catch(() => { if (active) setNotificationError("Sign in to view saved safety updates."); });
    refresh();
    const timer = setInterval(refresh, 15000);
    window.addEventListener("focus", refresh);
    return () => { active = false; clearInterval(timer); window.removeEventListener("focus", refresh); };
  }, []);

  const [readNotifications, setReadNotifications] = useState(() => {

    try {

      const saved = JSON.parse(

        localStorage.getItem("rakshaReadNotifications") || "[]"

      );



      return Array.isArray(saved) ? saved : [];

    } catch {

      return [];

    }

  });



  useEffect(() => {

    localStorage.setItem(

      "rakshaReadNotifications",

      JSON.stringify(readNotifications)

    );

  }, [readNotifications]);



  const unreadCount = notifications.filter(

    (notification) => !readNotifications.includes(notification.id)

  ).length;



  const markAllRead = () => {

    setReadNotifications((prev) => [

      ...new Set([

        ...prev,

        ...notifications.map((notification) => notification.id),

      ]),

    ]);

  };



  const markAsRead = (id) => {

    setReadNotifications((prev) =>

      prev.includes(id) ? prev : [...prev, id]

    );

  };



  const handleSOS = () => {

    navigate("/sos", { state: { heldSOS: true } });

  };



  return (

    <main className="dashboard-page">

      <header className="dashboard-header">

        <div>

          <p className="dashboard-greeting">Welcome back 👋</p>

          <h1>Stay Safe{account?.name ? `, ${account.name}` : ""}</h1>

        </div>



        <div className="dashboard-header-actions"><button className="notification-button" onClick={toggleTheme} aria-label={darkTheme ? "Switch to light theme" : "Switch to dark theme"} aria-pressed={darkTheme}>{darkTheme ? <Sun size={21} /> : <Moon size={21} />}</button><button className="notification-button" onClick={() => navigate("/settings")} aria-label="Open settings"><Settings size={21} /></button>

        {/* Notification Bell */}

        <div className="notification-wrapper">

          <button

            className="notification-button"

            aria-label="Notifications"

            aria-expanded={showNotifications}

            onClick={() => setShowNotifications((prev) => !prev)}

          >

            <Bell size={21} />



            {unreadCount > 0 && (

              <span className="notification-badge">

                {unreadCount > 9 ? "9+" : unreadCount}

              </span>

            )}

          </button>



          {showNotifications && (

            <div className="notification-panel">

              <div className="notification-header">

                <div>

                  <h3>Notifications</h3>

                  <p>

                    {unreadCount === 0

                      ? "You're all caught up"

                      : `${unreadCount} unread notification${

                          unreadCount === 1 ? "" : "s"

                        }`}

                  </p>

                </div>



                <button

                  className="notification-close"

                  onClick={() => setShowNotifications(false)}

                  aria-label="Close notifications"

                >

                  <X size={18} />

                </button>

              </div>



              {notifications.length > 0 && unreadCount > 0 && (

                <button

                  className="mark-read-btn"

                  onClick={markAllRead}

                >

                  <CheckCheck size={16} />

                  Mark all as read

                </button>

              )}



              <div className="notification-list">

                {notifications.length === 0 ? (

                  <div className="notification-empty">

                    <Bell size={28} />

                    <h4>No notifications yet</h4>

                    <p>

                      {notificationError || "Your safety updates will appear here."}

                    </p>

                  </div>

                ) : (

                  notifications.map((notification) => {

                    const isRead = readNotifications.includes(

                      notification.id

                    );



                    return (

                      <button

                        key={notification.id}

                        className={`notification-item ${

                          isRead ? "read" : "unread"

                        }`}

                        onClick={() => markAsRead(notification.id)}

                      >

                        <span className="notification-dot" />



                        <div className="notification-content">

                          <h4>{notification.title}</h4>

                          <p>{notification.message}</p>

                          <small>

                            {notification.time || "Recent"}

                          </small>

                        </div>

                      </button>

                    );

                  })

                )}

              </div>

            </div>

          )}

        </div>

        </div>

      </header>



      {!account && <p style={{padding:"12px",fontSize:"13px"}}>Local preview · <button onClick={()=>navigate("/login")}>Sign in to save your safety data</button></p>}

      <motion.section

        className="safety-status"

        initial={{ opacity: 0, y: 15 }}

        animate={{ opacity: 1, y: 0 }}

        transition={{ duration: 0.5 }}

      >

        <div className="status-icon">

          <ShieldCheck size={25} />

        </div>



        <div>

          <h2>You’re in your safety space</h2>

          <p>

            Your safety tools are ready whenever you need them.

          </p>

        </div>

      </motion.section>



      <motion.section

        className="sos-section"

        initial={{ opacity: 0, scale: 0.95 }}

        animate={{ opacity: 1, scale: 1 }}

        transition={{ delay: 0.15, duration: 0.5 }}

      >

        <p className="sos-caption">NEED HELP?</p>



        <HoldSOS onComplete={handleSOS} />



        <h2>Emergency Assistance</h2>

        <p>Demo mode · Hold SOS to preview. No alerts are sent.</p>

      </motion.section>



      <section className="dashboard-tools">

        <div className="section-heading">

          <h2>Your Safety Tools</h2>

          <span>Quick access</span>

        </div>



        {/* Live Location */}

        <div className="tool-card">

          <div className="tool-icon location-icon">

            <MapPin size={22} />

          </div>



          <div className="tool-info">

            <h3>Live Location</h3>

            <p>Manage your location sharing</p>

          </div>



          <button

            className="tool-arrow"

            onClick={() => navigate("/live-location")}

            aria-label="Open live location"

          >

            <ChevronRight size={20} />

          </button>

        </div>



        {/* Trusted Contacts */}

        <div className="tool-card">

          <div className="tool-icon contacts-icon">

            <Users size={22} />

          </div>



          <div className="tool-info">

            <h3>Trusted Contacts</h3>

            <p>Manage your emergency contacts</p>

          </div>



          <button

            className="tool-arrow"

            onClick={() => navigate("/trusted-contacts")}

            aria-label="Open trusted contacts"

          >

            <ChevronRight size={20} />

          </button>

        </div>



        {/* Police Help */}

        <div className="tool-card">

          <div className="tool-icon police-icon">

            <PhoneCall size={22} />

          </div>



          <div className="tool-info">

            <h3>Emergency Calling</h3>

            <p>Emergency helpline information</p>

          </div>



          <button

            className="tool-arrow"

            onClick={() => navigate("/police-help")}

            aria-label="Open emergency calling"

          >

            <ChevronRight size={20} />

          </button>

        </div>



        <button className="dashboard-more-toggle" aria-expanded={showMore} onClick={() => setShowMore(value => !value)}>{showMore ? "Show fewer tools" : "More safety tools"}<ChevronRight size={18} /></button>

        {showMore && <div className="dashboard-more-tools"><div className="tool-card"><div className="tool-icon contacts-icon"><PhoneCall size={22} /></div><div className="tool-info"><h3>Fake Call</h3><p>Simulate an incoming call</p></div><button className="tool-arrow" onClick={() => navigate("/fake-call")} aria-label="Open fake call"><ChevronRight size={20} /></button></div>

        {/* Safety Check-in / Journey */}

        <div className="tool-card">

          <div className="tool-icon journey-icon">

            <Route size={22} />

          </div>



          <div className="tool-info">

            <h3>Safety Timer</h3>

            <p>Set a timer and check in safely</p>

          </div>



          <button

            className="tool-arrow"

            onClick={() => navigate("/safety-timer")}

            aria-label="Open safety timer"

          >

            <ChevronRight size={20} />

          </button>

        </div>



        {/* Alert History */}

        <div className="tool-card">

          <div className="tool-icon history-icon">

            <History size={22} />

          </div>



          <div className="tool-info">

            <h3>Alert History</h3>

            <p>View your recorded safety activity</p>

          </div>



          <button

            className="tool-arrow"

            onClick={() => navigate("/alert-history")}

            aria-label="Open alert history"

          >

            <ChevronRight size={20} />

          </button>

        </div>



        {/* Safety Tips */}

        <div className="tool-card">

          <div className="tool-icon safety-tips-icon">

            <BookOpen size={22} />

          </div>



          <div className="tool-info">

            <h3>Safety Tips</h3>

            <p>Explore helpful safety guides</p>

          </div>



          <button

            className="tool-arrow"

            onClick={() => navigate("/safety-tips")}

            aria-label="Open safety tips"

          >

            <ChevronRight size={20} />

          </button>

        </div>

        </div>}

      </section>



      {/* Bottom Navigation */}

      <nav className="dashboard-nav">

        <button

          className="nav-item active"

          onClick={() => navigate("/dashboard")}

        >

          <Home size={21} />

          <span>Home</span>

        </button>



        <button

          className="nav-item"

          onClick={() => navigate("/trusted-contacts")}

        >

          <Users size={21} />

          <span>Contacts</span>

        </button>



        <button

          className="nav-item"

          onClick={() => navigate("/live-location")}

        >

          <MapPin size={21} />

          <span>Location</span>

        </button>



        <button

          className="nav-item"

          onClick={() => navigate("/profile")}

        >

          <UserRound size={21} />

          <span>Profile</span>

        </button>

      </nav>

    </main>

  );

}











