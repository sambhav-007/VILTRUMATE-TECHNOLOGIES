import React from "react";

const services = [
  "Static Sites",
  "CMS Admin Panels",
  "SEO & Analytics",
  "Branding & Design",
];

const portfolioItems = [
  {
    title: "Atlas Finance",
    description: "Corporate website focused on trust, speed, and lead conversion.",
  },
  {
    title: "Northline Medical",
    description: "Clean healthcare platform with high accessibility and structured flows.",
  },
  {
    title: "Vertex Real Estate",
    description: "Luxury property landing suite designed for premium clientele.",
  },
  {
    title: "Nova Logistics",
    description: "Operations dashboard and public-facing portal with streamlined UX.",
  },
];

const processSteps = ["Discovery", "Strategy", "Execution", "Optimization"];

function App() {
  return (
    <>
      <header className="site-header" id="top">
        <div className="container nav-wrap">
          <a className="brand-mark" href="#top" aria-label="Go to top">
            <img src="/v-logo.png" alt="Viltrumate icon" />
          </a>
          <nav className="nav-links" aria-label="Primary navigation">
            <a href="#services">Services</a>
            <a href="#about">About</a>
            <a href="#portfolio">Portfolio</a>
            <a href="#process">Process</a>
            <a href="#contact">Contact</a>
          </nav>
        </div>
      </header>

      <main>
        <section className="hero section-pad" aria-label="Viltrumate Technologies hero">
          <div className="container hero-inner">
            <img
              className="hero-logo"
              src="/viltrumate-logo.png"
              alt="Viltrumate Technologies logo"
            />
            <p>We build high-performance websites that drive results.</p>
            <a className="btn-outline" href="#contact">
              Get Started
            </a>
          </div>
        </section>

        <section className="section-pad" id="services" aria-labelledby="services-title">
          <div className="container">
            <h2 id="services-title">Services</h2>
            <div className="services-grid">
              {services.map((service) => (
                <article className="simple-card" key={service}>
                  <h3>{service}</h3>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section-pad" id="about" aria-labelledby="about-title">
          <div className="container narrow">
            <h2 id="about-title">About</h2>
            <p>
              Viltrumate Technologies creates modern digital solutions for ambitious businesses.
              We combine strategic thinking, precise engineering, and premium execution to deliver
              websites that are fast, scalable, and built to perform in real-world markets.
            </p>
          </div>
        </section>

        <section className="section-pad" id="portfolio" aria-labelledby="portfolio-title">
          <div className="container">
            <h2 id="portfolio-title">Portfolio</h2>
            <div className="portfolio-grid">
              {portfolioItems.map((item) => (
                <article className="portfolio-card" key={item.title}>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section-pad" id="process" aria-labelledby="process-title">
          <div className="container">
            <h2 id="process-title">Process</h2>
            <ol className="process-line">
              {processSteps.map((step, index) => (
                <li key={step}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <p>{step}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="section-pad cta" id="contact" aria-labelledby="cta-title">
          <div className="container narrow">
            <h2 id="cta-title">Ready to grow your business?</h2>
            <a className="btn-outline" href="mailto:hello@viltrumate.com">
              Get Started
            </a>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="container footer-wrap">
          <p>Viltrumate Technologies</p>
          <p>High-performance digital solutions for serious brands.</p>
        </div>
      </footer>
    </>
  );
}

export default App;
