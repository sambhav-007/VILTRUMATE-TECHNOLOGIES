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
    description: "Affordable, high-quality academic solutions designed for students. Professional work at budget-friendly rates.",
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
    link: "https://www.duaproperty.com",
  },
  {
    title: "Kabana De Nature",
    description: "Website for a luxury eco-resort, featuring immersive design, interactive booking system, and seamless user experience to showcase the resort's unique offerings and drive direct bookings.",
    link: "https://www.kabanadenatureresort.com",
  },
  {
    title: "Sambhav Sehgal",
    description: "Personal portfolio showcasing full-stack web development expertise, design philosophy, and premium projects built for high-performing brands.",
    link: "https://www.sambhavsehgal.tech",
  },
  
];

const pricingPlans = [
  {
    title: "Dynamic Landing Site",
    price: "₹3,999",
    description:
      "A high-performance, professionally built landing page — fully designed and delivered, ready to launch. No complexity, no maintenance required.",
    features: [
      "Fully responsive across all devices",
      "One-time developed landing page",
      "Unlimited bandwidth & hosting-ready structure",
      "WhatsApp chat integration",
      "Conversion-focused inquiry form",
      "Clean, modern UI design",
      "Social media integration",
      "Basic SEO setup",
      "24/7 support",
    ],
    cta: "Get Started",
    accent: "blue",
  },
  {
    title: "Business Website",
    price: "₹6,999",
    description:
      "A complete business website with essential admin controls — manage and update your content anytime with ease.",
    features: [
      "Fully responsive design",
      "WhatsApp integration",
      "Inquiry forms",
      "SEO-ready structure",
      "Modern UI",
      "Multi-page website (3–5 pages)",
      "Basic admin panel (edit text/images)",
      "Service & content sections",
      "Image gallery",
      "Google Maps integration",
      "Faster performance optimization",
      "Improved UX for higher engagement",
    ],
    cta: "Get Started",
    badges: ["Most Popular", "Best Value"],
    featured: true,
    accent: "green",
  },
  {
    title: "Premium / Custom Solution",
    price: "₹13,999+",
    description:
      "A fully dynamic, scalable system with advanced admin capabilities — built for businesses that need complete control, flexibility, and custom features.",
    features: [
      "Multi-page structure",
      "Admin panel",
      "Performance optimization",
      "SEO-ready setup",
      "Fully custom UI/UX design",
      "Advanced admin panel (dynamic control)",
      "Database integration (MongoDB)",
      "Dynamic content management",
      "API integrations (payments, third-party tools)",
      "Advanced scalability setup",
      "Priority support",
      "Custom feature development",
    ],
    cta: "Contact Us",
    badges: ["For Serious Businesses"],
    accent: "red",
  },
];

const faqs = [
  {
    question: "How long does it take?",
    answer:
      "Most landing sites are delivered quickly, while business and custom builds depend on scope, content readiness, and feature complexity.",
  },
  {
    question: "Do you provide support?",
    answer:
      "Yes. Every project includes support, with higher plans offering more hands-on guidance and priority assistance.",
  },
  {
    question: "Can I upgrade later?",
    answer:
      "Yes. You can start with a smaller plan and upgrade when your business needs more pages, admin control, or custom functionality.",
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
            <a href="#portfolio">Portfolio</a>
            <a href="#pricing">Pricing</a>
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

        <section className="section-pad" id="portfolio" aria-labelledby="portfolio-title">
          <div className="container portfolio-container">
            <header className="portfolio-header">
              <h2 id="portfolio-title">Portfolio</h2>
              <p>Selected projects crafted for performance, clarity, and conversion.</p>
            </header>
            <div className="portfolio-grid">
              {portfolioItems.map((item) => (
                <a
                  href={item.link || "#"}
                  className={`portfolio-card ${item.link ? "has-link" : ""}`}
                  key={item.title}
                  target={item.link ? "_blank" : "_self"}
                  rel={item.link ? "noopener noreferrer" : ""}
                >
                  <article>
                    <h3 className="portfolio-card-title">{item.title}</h3>
                    <p className="portfolio-card-copy">{item.description}</p>
                  </article>
                </a>
              ))}
            </div>
          </div>
        </section>

        <section className="section-pad pricing-section" id="pricing" aria-labelledby="pricing-title">
          <div className="container pricing-container">
            <header className="pricing-header">
              <h2 id="pricing-title">Pricing</h2>
              <p>From simple presence to full control — choose what fits your growth.</p>
            </header>

            <div className="pricing-grid" role="list" aria-label="Pricing plans">
              {pricingPlans.map((plan) => (
                <article
                  className={`pricing-card ${plan.featured ? "featured" : ""} ${plan.accent}`}
                  key={plan.title}
                  role="listitem"
                >
                  <div className="pricing-badges">
                    {plan.badges?.map((badge) => (
                      <span className="pricing-badge" key={badge}>
                        {badge}
                      </span>
                    ))}
                  </div>

                  <h3 className="pricing-card-title">{plan.title}</h3>
                  <div className="pricing-price">{plan.price}</div>
                  <p className="pricing-copy">{plan.description}</p>

                  <ul className="pricing-features">
                    {plan.features.map((feature) => (
                      <li key={feature}>{feature}</li>
                    ))}
                  </ul>

                  <a
                    className="btn-outline pricing-cta"
                    href={plan.cta === "Contact Us" ? "mailto:hello@viltrumate.com" : "#contact"}
                  >
                    {plan.cta}
                  </a>
                </article>
              ))}
            </div>

            <div className="faq-wrap">
              <h3 className="faq-title">FAQ</h3>
              <div className="faq-list">
                {faqs.map((faq) => (
                  <details className="faq-item" key={faq.question}>
                    <summary>{faq.question}</summary>
                    <p>{faq.answer}</p>
                  </details>
                ))}
              </div>
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
