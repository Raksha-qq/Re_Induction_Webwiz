import { Link } from "react-router-dom";

const teams = [
     {
          number: "01",
          name: "Web Development",
          description: "Build modern websites and interactive web applications."
     },
     {
          number: "02",
          name: "UI/UX Design",
          description: "Create beautiful, intuitive and user-friendly interfaces."
     },
     {
          number: "03",
          name: "App Development",
          description: "Explore application development and build useful products."
     },
     {
          number: "04",
          name: "Creative & Media",
          description: "Bring ideas to life through content, design and creativity."
     }
];

function Home() {
     return (
          <main className="home">

               {/* Navigation */}
               <nav className="navbar">
                    <h2 className="logo">WEBWIZ<span>.</span></h2>

                    <div className="nav-links">
                         <a href="#home">Home</a>
                         <a href="#about">About</a>
                         <a href="#teams">Teams</a>
                         <Link to="/login">Login</Link>
                    </div>

                    <Link to="/register" className="nav-button">
                         Join Us →
                    </Link>
               </nav>

               {/* Hero Section */}
               <section className="hero" id="home">
                    <p className="eyebrow">WEBWIZ • RECRUITMENT 2026</p>

                    <h1>
                         Don't just use
                         <br />
                         technology.
                         <br />
                         <span>Create it.</span>
                    </h1>

                    <p className="hero-description">
                         A space for curious minds, creative thinkers and aspiring
                         developers. Learn, collaborate and build something meaningful
                         with Webwiz.
                    </p>

                    <div className="hero-buttons">
                         <Link to="/register" className="apply-button">
                              Apply Now ↗
                         </Link>

                         <a href="#about" className="learn-button">
                              Discover Webwiz ↓
                         </a>
                    </div>

                    <div className="hero-bottom">
                         <span>IDEAS INTO REALITY.</span>
                         <span>DESIGN • DEVELOP • INNOVATE</span>
                    </div>
               </section>

               {/* About Section */}
               <section className="about" id="about">
                    <p className="eyebrow">01 / WHO WE ARE</p>

                    <h2>
                         More than a club.
                         <br />
                         A place to <span>build.</span>
                    </h2>

                    <p>
                         Webwiz brings together students interested in technology,
                         development and design. Whether you're just starting out or
                         already building projects, there's room to learn, experiment
                         and grow.
                    </p>
               </section>

               {/* Teams Section */}
               <section className="teams" id="teams">
                    <p className="eyebrow">02 / FIND YOUR PLACE</p>

                    <h2>Explore our teams.</h2>

                    <div className="team-grid">
                         {teams.map((team) => (
                              <article className="team-card" key={team.number}>
                                   <span className="team-number">{team.number}</span>

                                   <h3>{team.name}</h3>

                                   <p>{team.description}</p>

                                   <span className="team-arrow">↗</span>
                              </article>
                         ))}
                    </div>
               </section>

               {/* Call to Action */}
               <section className="closing">
                    <p className="eyebrow">03 / YOUR TURN</p>

                    <h2>
                         Have an idea?
                         <br />
                         <span>Let's build it.</span>
                    </h2>

                    <p>Your journey with Webwiz starts here.</p>

                    <Link to="/register" className="apply-button">
                         Start your application →
                    </Link>
               </section>

               {/* Footer */}
               <footer className="footer">
                    <h2>WEBWIZ<span>.</span></h2>
                    <p>Built by curious minds. Driven by ideas.</p>
                    <p>© 2026 Webwiz. All rights reserved.</p>
               </footer>

          </main>
     );
}

export default Home;