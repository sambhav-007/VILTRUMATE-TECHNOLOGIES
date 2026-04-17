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
    description: "Clean academic work delivered with solid design, structure, and reliable execution.",
  },
  {
    number: "03",
    title: "Dynamic CMS Sites",
    description: "Flexible content systems that stay easy to manage, update, and scale.",
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
    description: "Real estate platform with custom search, filtering, recommendations, and an admin panel.",
    link: "https://www.duaproperty.com",
  },
  {
    title: "Kabana De Nature",
    description: "Luxury eco-resort website with immersive design, booking flow, and direct conversion focus.",
    link: "https://www.kabanadenatureresort.com",
  },
  {
    title: "Sambhav Sehgal",
    description: "Personal portfolio built to showcase full-stack skill, design taste, and premium project work.",
    link: "https://www.sambhavsehgal.tech",
  },
  
];

const pricingPlans = [
  {
    title: "Dynamic Landing Site",
    price: "₹3,999",
    description:
      "A high-performance landing page designed to launch fast and look sharp from day one.",
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
      "A complete business website with essential admin control and a more flexible content structure.",
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
      "A fully dynamic, scalable system with advanced controls for custom business needs.",
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
      "Most landing sites are delivered quickly, while larger builds depend on scope, content readiness, and feature complexity.",
  },
  {
    question: "Do you provide support?",
    answer:
      "Yes. Every project includes support, with higher plans offering more hands-on guidance and priority assistance.",
  },
  {
    question: "Can I upgrade later?",
    answer:
      "Yes. You can start small and upgrade later when you need more pages, control, or custom functionality.",
  },
];

const processSteps = [
  {
    number: "01",
    title: "Analysis",
    description:
      "We map your goals, audience, and priorities before any design decisions begin.",
  },
  {
    number: "02",
    title: "Design",
    description:
      "We shape a clean visual direction that fits the brand and the user flow.",
  },
  {
    number: "03",
    title: "Development",
    description:
      "We build the site with performance, structure, and stability in mind.",
  },
  {
    number: "04",
    title: "Launch",
    description:
      "We launch cleanly and stay available for support after delivery.",
  },
];

function App() {
  const finalHeroTitle = "Digital Presence\nyour brand\ndeserves.";
  const [displayHeroTitle, setDisplayHeroTitle] = useState(finalHeroTitle);
  const finalHeroTitleAria = "Digital Presence your brand deserves.";
  const [isScrambling, setIsScrambling] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeStepCount, setActiveStepCount] = useState(0);
  const processStepRefs = useRef([]);
  const heroAmbientRef = useRef(null);

  const progressPercent = useMemo(() => {
    if (processSteps.length === 0) {
      return 0;
    }
    return Math.min(100, (activeStepCount / processSteps.length) * 100);
  }, [activeStepCount]);

  useEffect(() => {
    const randomChars = "abcdefghijklmnopqrstuvwxyz";
    let frame = 0;
    const totalFrames = 26;
    let timeoutId;

    setIsScrambling(true);

    const tick = () => {
      frame += 1;
      const progress = frame / totalFrames;
      const easedProgress =
        progress < 0.5
          ? Math.pow(progress * 2, 1.25) * 0.4
          : 0.4 + Math.pow((progress - 0.5) * 2, 0.58) * 0.6;
      const revealCount = Math.floor(easedProgress * finalHeroTitle.length);

      const scrambled = finalHeroTitle
        .split("")
        .map((char, index) => {
          if (char === " " || char === "\n") {
            return char;
          }
          if (index < revealCount || /[.,!?'-]/.test(char)) {
            return finalHeroTitle[index];
          }
          return randomChars[Math.floor(Math.random() * randomChars.length)];
        })
        .join("");

      setDisplayHeroTitle(scrambled);

      if (frame >= totalFrames) {
        setDisplayHeroTitle(finalHeroTitle);
        setIsScrambling(false);
        return;
      }

      const delay = frame < 8 ? 52 : frame < 18 ? 34 : 18;
      timeoutId = window.setTimeout(tick, delay);
    };

    timeoutId = window.setTimeout(tick, 140);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [finalHeroTitle]);

  useEffect(() => {
    const ambient = heroAmbientRef.current;
    if (!ambient) {
      return;
    }

    let rafId = 0;
    const target = { x: 0, y: 0 };
    const current = { x: 0, y: 0 };

    const animate = () => {
      current.x += (target.x - current.x) * 0.08;
      current.y += (target.y - current.y) * 0.08;
      ambient.style.setProperty("--parallax-x", `${current.x.toFixed(2)}px`);
      ambient.style.setProperty("--parallax-y", `${current.y.toFixed(2)}px`);
      rafId = window.requestAnimationFrame(animate);
    };

    const onMove = (event) => {
      const rect = ambient.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const deltaX = (event.clientX - centerX) / rect.width;
      const deltaY = (event.clientY - centerY) / rect.height;
      target.x = Math.max(-8, Math.min(8, deltaX * 14));
      target.y = Math.max(-8, Math.min(8, deltaY * 14));
    };

    const onLeave = () => {
      target.x = 0;
      target.y = 0;
    };

    ambient.addEventListener("mousemove", onMove);
    ambient.addEventListener("mouseleave", onLeave);
    rafId = window.requestAnimationFrame(animate);

    return () => {
      ambient.removeEventListener("mousemove", onMove);
      ambient.removeEventListener("mouseleave", onLeave);
      window.cancelAnimationFrame(rafId);
    };
  }, []);

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

  useEffect(() => {
    const revealTargets = Array.from(document.querySelectorAll("[data-reveal]"));

    if (revealTargets.length === 0) {
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries, currentObserver) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            return;
          }

          entry.target.classList.add("is-visible");
          currentObserver.unobserve(entry.target);
        });
      },
      {
        threshold: 0.14,
        rootMargin: "0px 0px -8% 0px",
      }
    );

    revealTargets.forEach((target) => {
      const delay = target.getAttribute("data-reveal-delay") || "0";
      target.style.setProperty("--reveal-delay", `${delay}ms`);
      observer.observe(target);
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth > 700) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("resize", onResize);
    };
  }, []);

  const handleMobileNavClick = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <header className="site-header" id="top">
        <div className="container nav-wrap">
          <a className="brand-mark" href="#top" aria-label="Go to top">
            <img src="/viltrumate-logo.png" alt="Viltrumate Technologies" />
          </a>

          <button
            className={`menu-toggle ${isMobileMenuOpen ? "open" : ""}`}
            type="button"
            aria-label="Toggle navigation menu"
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-primary-nav"
            onClick={() => setIsMobileMenuOpen((prev) => !prev)}
          >
            <span />
            <span />
            <span />
          </button>

          <nav
            id="mobile-primary-nav"
            className={`nav-links ${isMobileMenuOpen ? "open" : ""}`}
            aria-label="Primary navigation"
          >
            <a href="#services" onClick={handleMobileNavClick}>Services</a>
            <a href="#portfolio" onClick={handleMobileNavClick}>Portfolio</a>
            <a href="#process" onClick={handleMobileNavClick}>Process</a>
            <a href="#pricing" onClick={handleMobileNavClick}>Pricing</a>
            <a href="#contact" onClick={handleMobileNavClick}>Contact</a>
          </nav>
        </div>
      </header>

      <main>
        <section className="hero section-pad" aria-label="Viltrumate Technologies hero">
          <div className="container hero-inner">
            <div className="hero-copy" data-reveal data-reveal-variant="drift-left" data-reveal-delay="0">
              <p className="hero-kicker">Viltrumate Technologies</p>
              <div className="hero-meta" aria-label="Core strengths">
                <span>Academic Projects</span>
                <span>Web development</span>
                <span>SEO-ready builds</span>
              </div>
              <h1
                className={isScrambling ? "hero-title scrambling" : "hero-title"}
                aria-label={finalHeroTitleAria}
              >
                <span className="hero-title-static">{finalHeroTitle}</span>
                <span className="hero-title-scramble" aria-hidden="true">
                  {displayHeroTitle}
                </span>
              </h1>
              <p className="hero-description">
                We design and build sharp, fast websites that look premium and convert cleanly.
              </p>
              <div className="hero-actions">
                <a className="btn-outline" href="#contact">
                  Get Started
                </a>
                <a className="btn-ghost" href="#portfolio">
                  View Portfolio
                </a>
              </div>
              <div className="hero-trust" aria-label="Key benefits">
                <span>Premium quality</span>
                <span>Fast delivery</span>
                <span>Ongoing support</span>
              </div>
            </div>

            <div className="hero-ambient" aria-hidden="true" ref={heroAmbientRef} data-reveal data-reveal-variant="drift-right" data-reveal-delay="160">
              <div className="hero-ambient-grid" />
              <div className="hero-ambient-lines" />
              <div className="hero-ambient-glow" />
              <div className="hero-ambient-shimmer" />

              <div className="hero-particles">
                <span />
                <span />
                <span />
                <span />
                <span />
              </div>

              <div className="hero-float-card card-a">
                <span>Performance</span>
                <strong>98</strong>
              </div>

              <div className="hero-float-card card-b">
                <span>Conversion Focus</span>
                <strong>Premium UI</strong>
              </div>

              <div className="hero-float-card card-c">
                <span>Delivery</span>
                <strong>Fast + Reliable</strong>
              </div>
            </div>
          </div>
        </section>

        <section className="section-pad services-section" id="services" aria-labelledby="services-title">
          <div className="container services-container">
            <header className="services-header" data-reveal data-reveal-variant="depth">
              <span className="section-kicker">What we do</span>
              <h2 id="services-title">Services</h2>
              <p>Focused digital work designed to feel precise, premium, and direct.</p>
            </header>

            <div className="services-grid" role="list" aria-label="Service offerings" data-reveal data-reveal-variant="drift-right">
              {services.map((service) => (
                <article className="service-card" key={service.number} role="listitem" data-reveal data-reveal-variant="drift-up" data-reveal-delay={service.number === "01" ? "0" : service.number === "02" ? "80" : service.number === "03" ? "160" : "240"}>
                  <h3 className="service-card-title">{service.title}</h3>
                  <p className="service-card-copy">{service.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section-pad" id="portfolio" aria-labelledby="portfolio-title">
          <div className="container portfolio-container">
            <header className="portfolio-header" data-reveal data-reveal-variant="depth">
              <span className="section-kicker">Selected work</span>
              <h2 id="portfolio-title">Portfolio</h2>
              <p>Selected projects crafted for performance, clarity, and conversion.</p>
            </header>
            <div className="portfolio-grid" data-reveal data-reveal-variant="drift-right">
              {portfolioItems.map((item, index) => (
                <a
                  href={item.link || "#"}
                  className={`portfolio-card ${item.link ? "has-link" : ""}`}
                  key={item.title}
                  target={item.link ? "_blank" : "_self"}
                  rel={item.link ? "noopener noreferrer" : ""}
                  data-reveal
                  data-reveal-variant="drift-up"
                  data-reveal-delay={index * 100}
                >
                  <article>
                    <div className="portfolio-card-top">
                      <span className="portfolio-card-index">0{index + 1}</span>
                      <span className="portfolio-card-link">View project</span>
                    </div>
                    <h3 className="portfolio-card-title">{item.title}</h3>
                    <p className="portfolio-card-copy">{item.description}</p>
                  </article>
                </a>
              ))}
            </div>
          </div>
        </section>

        <section className="section-pad process-section" id="process" aria-labelledby="process-title">
          <div className="container process-container">
            <header className="process-header" data-reveal>
              <span className="section-kicker">How it works</span>
              <h2 id="process-title">Process</h2>
              <p>A simple flow that keeps the project sharp from start to launch.</p>
            </header>

            <div className="process-timeline" role="list" aria-label="Process steps" data-reveal>
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
                  data-reveal
                  data-reveal-delay={index * 100}
                >
                  <span className="process-number">{step.number}</span>
                  <h3 className="process-card-title">{step.title}</h3>
                  <p className="process-card-copy">{step.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section-pad pricing-section" id="pricing" aria-labelledby="pricing-title">
          <div className="container pricing-container">
            <header className="pricing-header" data-reveal data-reveal-variant="depth">
              <span className="section-kicker">Packages</span>
              <h2 id="pricing-title">Pricing</h2>
              <p>From simple presence to full control — choose what fits your growth.</p>
            </header>

            <div className="pricing-grid" role="list" aria-label="Pricing plans" data-reveal data-reveal-variant="drift-right">
              {pricingPlans.map((plan) => (
                <article
                  className={`pricing-card ${plan.featured ? "featured" : ""} ${plan.accent}`}
                  key={plan.title}
                  role="listitem"
                  data-reveal
                  data-reveal-variant={plan.featured ? "drift-up" : "drift-left"}
                  data-reveal-delay={plan.featured ? "120" : "0"}
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

            <div className="faq-wrap" data-reveal data-reveal-variant="drift-up">
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

        <section className="section-pad contact-section" id="contact" aria-labelledby="contact-title">
          <div className="container contact-container">
            <header className="contact-header" data-reveal data-reveal-variant="depth">
              <span className="section-kicker">Start here</span>
              <h2 id="contact-title">Let&apos;s build something that stands out.</h2>
              <p>Choose a channel and we&apos;ll respond with a clear next step.</p>
            </header>

            <div className="contact-grid" role="list" aria-label="Contact methods" data-reveal data-reveal-variant="drift-right">
              <a
                className="contact-card"
                href="https://www.instagram.com/viltrumate/"
                target="_blank"
                rel="noopener noreferrer"
                role="listitem"
                data-reveal
                data-reveal-variant="drift-up"
                data-reveal-delay="0"
              >
                <span className="contact-label">Instagram</span>
                <strong>@viltrumate</strong>
                <p>Follow our latest work, launch updates, and design drops.</p>
              </a>

              <a
                className="contact-card"
                href="https://www.linkedin.com/company/viltrumate-technologies/?lipi=urn%3Ali%3Apage%3Ad_flagship3_detail_base%3BR%2BCeavgSTKmOAa0uwC5k9Q%3D%3D"
                target="_blank"
                rel="noopener noreferrer"
                role="listitem"
                data-reveal
                data-reveal-variant="drift-up"
                data-reveal-delay="100"
              >
                <span className="contact-label">LinkedIn</span>
                <strong>Viltrumate Technologies</strong>
                <p>Connect for business inquiries, collaborations, and company updates.</p>
              </a>

              <a className="contact-card" href="tel:+917988280245" role="listitem" data-reveal data-reveal-variant="drift-up" data-reveal-delay="200">
                <span className="contact-label">Phone</span>
                <strong>+91 79882 80245</strong>
                <p>Call directly for quick discussion, scope, and pricing.</p>
              </a>
            </div>

            <div className="contact-cta-row" data-reveal data-reveal-variant="drift-left">
              <a className="btn-outline" href="mailto:hello@viltrumate.com">
                Start Your Project
              </a>
              <p>Available for startups, student projects, and serious business builds.</p>
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="container footer-wrap" data-reveal data-reveal-variant="drift-right">
          <div className="footer-brand-block" data-reveal data-reveal-variant="drift-left" data-reveal-delay="0">
            <p className="footer-brand">Viltrumate Technologies</p>
            <p className="footer-note">Ambala-based web studio for premium, fast, SEO-ready builds.</p>
          </div>

          <div className="footer-links" aria-label="Social links" data-reveal data-reveal-variant="drift-up" data-reveal-delay="100">
            <a href="https://www.instagram.com/viltrumate/" target="_blank" rel="noopener noreferrer">
              Instagram
            </a>
            <a
              href="https://www.linkedin.com/company/viltrumate-technologies/?lipi=urn%3Ali%3Apage%3Ad_flagship3_detail_base%3BR%2BCeavgSTKmOAa0uwC5k9Q%3D%3D"
              target="_blank"
              rel="noopener noreferrer"
            >
              LinkedIn
            </a>
            <a href="tel:+917988280245">+91 79882 80245</a>
          </div>

          <p className="footer-copy">© {new Date().getFullYear()} Viltrumate Technologies. All rights reserved.</p>
        </div>
      </footer>
    </>
  );
}

export default App;
