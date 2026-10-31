import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const teams = [
  { number: "01", name: "Web Development", description: "Build modern websites and interactive web applications." },
  { number: "02", name: "UI/UX Design", description: "Create beautiful, intuitive and user-friendly interfaces." },
  { number: "03", name: "App Development", description: "Explore application development and build useful products." },
  { number: "04", name: "Creative & Media", description: "Bring ideas to life through content, design and creativity." },
];

export default function Home() {
  const { isAuthenticated, application, applicationLoading } = useAuth();
  const destination = !isAuthenticated ? "/register" : application ? "/status" : "/apply";
  const ctaLabel = !isAuthenticated ? "Join Us →" : application ? "View application →" : "Continue application →";

  return <main className="home">
    <nav className="navbar">
      <Link to="/" className="logo">WEBWIZ<span>.</span></Link>
      <div className="nav-links"><a href="#home">Home</a><a href="#about">About</a><a href="#teams">Teams</a>
        {!applicationLoading && (isAuthenticated ? <Link to="/status">My application</Link> : <Link to="/login">Login</Link>)}
      </div>
      {!applicationLoading && <Link to={destination} className="nav-button">{ctaLabel}</Link>}
    </nav>

    <section className="hero" id="home">
      <p className="eyebrow">WEBWIZ • RECRUITMENT 2026</p>
      <h1>Don't just use<br />technology.<br /><span>Create it.</span></h1>
      <p className="hero-description">A space for curious minds, creative thinkers and aspiring developers. Learn, collaborate and build something meaningful with Webwiz.</p>
      <div className="hero-buttons">
        {!applicationLoading && <Link to={destination} className="apply-button">{application ? "View your application ↗" : isAuthenticated ? "Continue application ↗" : "Apply Now ↗"}</Link>}
        <a href="#about" className="learn-button">Discover Webwiz ↓</a>
      </div>
      <div className="hero-bottom"><span>IDEAS INTO REALITY.</span><span>DESIGN • DEVELOP • INNOVATE</span></div>
    </section>

    <section className="about" id="about"><p className="eyebrow">01 / WHO WE ARE</p><h2>More than a club.<br />A place to <span>build.</span></h2><p>Webwiz brings together students interested in technology, development and design. Whether you're just starting out or already building projects, there's room to learn, experiment and grow.</p></section>

    <section className="teams" id="teams"><p className="eyebrow">02 / FIND YOUR PLACE</p><h2>Explore our teams.</h2><div className="team-grid">{teams.map(team => <article className="team-card" key={team.number}><span className="team-number">{team.number}</span><h3>{team.name}</h3><p>{team.description}</p><span className="team-arrow">↗</span></article>)}</div></section>

    <section className="closing"><p className="eyebrow">03 / YOUR TURN</p><h2>Have an idea?<br /><span>Let's build it.</span></h2><p>{application ? "Your application is in. You can check its status any time." : "Your journey with Webwiz starts here."}</p>{!applicationLoading && <Link to={destination} className="apply-button">{application ? "View application status →" : isAuthenticated ? "Continue your application →" : "Start your application →"}</Link>}</section>

    <footer className="footer"><h2>WEBWIZ<span>.</span></h2><p>Built by curious minds. Driven by ideas.</p><p>© 2026 Webwiz. All rights reserved.</p></footer>
  </main>;
}
