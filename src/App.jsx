import React, { useEffect, useMemo, useRef, useState } from "react";

const services = [
  {
    number: "01",
    title: "Static Sites",
    description: "Fast, minimal websites built for clarity, speed, and direct impact.",
  },
  {
    number: "02",
    title: "Academic Projects",
    description: "Clean, structured project builds with polished presentation and reliability.",
  },
  {
    number: "03",
    title: "Dynamic CMS Sites",
    description: "Flexible content-driven systems that stay easy to manage and scale.",
  },
  {
    number: "04",
    title: "SEO & Analytics",
    description: "Search-ready builds with tracking, visibility, and measurable performance.",
  },
];

const portfolioItems = [
  {
    title: "Dua Property",
    description: " Dynamic real estate listing platform with custom search, filtering features, Recommendation system & Admin panel.",
  },
  {
    title: "Kabana De Nature",
    description: "Website for a luxury eco-resort, featuring immersive design, interactive booking system, and seamless user experience to showcase the resort's unique offerings and drive direct bookings.",
  },
  
];

const processSteps = [
  {
    number: "01",
    title: "Analysis",
    description:
      "We analyze your business goals and target audience to create a strategic foundation.",
  },
  {
    number: "02",
    title: "Design",
    description:
      "Crafting pixel-perfect designs that align with your brand and user expectations.",
  },
  {
    number: "03",
    title: "Development",
    description:
      "Building robust, scalable solutions using cutting-edge technologies.",
  },
  {
    number: "04",
    title: "Launch",
    description:
      "Deploying your project with ongoing support and performance monitoring.",
  },
];

function App() {
  const [activeStepCount, setActiveStepCount] = useState(0);
  const processStepRefs = useRef([]);

  const progressPercent = useMemo(() => {
    if (processSteps.length === 0) {
      return 0;
    }
    return Math.min(100, (activeStepCount / processSteps.length) * 100);
  }, [activeStepCount]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            return;
          }
          const stepIndex = Number(entry.target.getAttribute("data-step-index"));
          setActiveStepCount((current) => Math.max(current, stepIndex + 1));
        });
      },
      {
        threshold: 0.55,
        rootMargin: "0px 0px -10% 0px",
      }
    );

    processStepRefs.current.forEach((step) => {
      if (step) {
        observer.observe(step);
      }
    });

    return () => {
      observer.disconnect();
    };
  }, []);

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

        <section className="section-pad services-section" id="services" aria-labelledby="services-title">
          <div className="container services-container">
            <header className="services-header">
              <h2 id="services-title">Services</h2>
              <p>Focused digital work designed to feel precise, premium, and effective.</p>
            </header>

            <div className="services-grid" role="list" aria-label="Service offerings">
              {services.map((service) => (
                <article className="service-card" key={service.number} role="listitem">
                  <h3 className="service-card-title">{service.title}</h3>
                  <p className="service-card-copy">{service.description}</p>
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

        <section className="section-pad process-section" id="process" aria-labelledby="process-title">
          <div className="container process-container">
            <header className="process-header">
              <h2 id="process-title">Process</h2>
              <p>Our systematic approach to delivering excellence</p>
            </header>

            <div className="process-timeline" role="list" aria-label="Process steps">
              <div className="timeline-rail" aria-hidden="true">
                <span className="timeline-progress" style={{ height: `${progressPercent}%` }} />
              </div>

              {processSteps.map((step, index) => (
                <article
                  className={`process-item ${index < activeStepCount ? "active" : ""}`}
                  data-step-index={index}
                  key={step.number}
                  ref={(node) => {
                    processStepRefs.current[index] = node;
                  }}
                  role="listitem"
                >
                  <span className="process-number">{step.number}</span>
                  <h3 className="process-card-title">{step.title}</h3>
                  <p className="process-card-copy">{step.description}</p>
                </article>
              ))}
            </div>
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
