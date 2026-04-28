import React, { useState, useEffect, useRef } from "react";
import { MagneticWrapper, CustomCursor } from "./UIEnhancements";

const CONVERSION_RATE = 94.25;

const plans = [
  {
    id: "basic",
    name: "Basic Infrastructure",
    priceMonthly: 18,
    description: "Perfect for single dynamic websites needing reliable database hosting.",
    features: ["1 vCPU Core", "2GB ECC RAM", "25GB NVMe Storage", "1TB Monthly Bandwidth"],
    cta: "Select Basic",
  },
  {
    id: "professional",
    name: "Professional Cloud",
    priceMonthly: 25,
    description: "Enhanced performance for growing businesses and higher traffic loads.",
    features: ["2 vCPU Cores", "4GB ECC RAM", "60GB NVMe Storage", "2.5TB Monthly Bandwidth"],
    cta: "Select Professional",
    popular: true,
  },
  {
    id: "business",
    name: "Business Cluster",
    priceMonthly: 98,
    description: "High-availability servers for mission-critical web applications.",
    features: ["4 vCPU Cores", "16GB ECC RAM", "250GB NVMe Storage", "5TB Monthly Bandwidth"],
    cta: "Select Business",
  },
  {
    id: "enterprise",
    name: "Enterprise Custom",
    priceMonthly: 140,
    description: "Fully custom server architecture with maximum security and SLA.",
    features: ["8 vCPU Cores (Dedicated)", "32GB ECC RAM", "500GB NVMe Storage", "Unmetered Bandwidth"],
    cta: "Select Enterprise",
  },
];

/* ---------- helpers ---------- */
const genInvoiceId = () =>
  "VLT-" + Date.now().toString(36).toUpperCase() + "-" + Math.random().toString(36).substring(2, 6).toUpperCase();

const today = () => {
  const d = new Date();
  return d.toLocaleDateString("en-IN", { day: "2-digit", month: "long", year: "numeric" });
};

const nextDate = (isYearly) => {
  const d = new Date();
  isYearly ? d.setFullYear(d.getFullYear() + 1) : d.setMonth(d.getMonth() + 1);
  return d.toLocaleDateString("en-IN", { day: "2-digit", month: "long", year: "numeric" });
};

/* ========== SUCCESS SCREEN ========== */
const PurchaseSuccess = ({ plan, isYearly, onReset }) => {
  const invoiceId = useRef(genInvoiceId()).current;
  const discountedUSD = plan.priceMonthly * 0.8;
  const finalUSD = isYearly ? discountedUSD : plan.priceMonthly;
  const finalINR = Math.round(finalUSD * CONVERSION_RATE);
  const annualUSD = isYearly ? +(finalUSD * 12).toFixed(2) : null;
  const annualINR = isYearly ? Math.round(finalINR * 12) : null;
  const totalUSD = isYearly ? annualUSD : finalUSD;
  const totalINR = isYearly ? annualINR : finalINR;

  return (
    <div className="success-page">
      <div className="success-glow" />

      <div className="success-card">
        {/* Top badge */}
        <div className="success-badge">
          <span className="success-check">✓</span>
        </div>

        <div className="success-top-text">
          <p className="success-label">Payment Confirmed</p>
          <h1 className="success-heading">Thank you for your order!</h1>
          <p className="success-sub">
            A confirmation has been sent to your registered email address.<br />
            Your infrastructure will be provisioned within <strong>24 hours</strong>.
          </p>
        </div>

        {/* Invoice card */}
        <div className="invoice-card">
          {/* Invoice header */}
          <div className="invoice-header">
            <div>
              <div className="invoice-brand">VILTRUMATE</div>
              <div className="invoice-brand-sub">TECHNOLOGIES</div>
            </div>
            <div className="invoice-meta-right">
              <div className="invoice-tag">TAX INVOICE</div>
              <div className="invoice-id">#{invoiceId}</div>
              <div className="invoice-date">{today()}</div>
            </div>
          </div>

          <div className="invoice-divider" />

          {/* Billed to / from */}
          <div className="invoice-parties">
            <div className="invoice-party">
              <span className="party-label">From</span>
              <strong>Viltrumate Technologies</strong>
              <span>Mumbai, Maharashtra, India</span>
              <span>GSTIN: 27AAAAA0000A1Z5</span>
              <span>hello@viltrumate.com</span>
            </div>
            <div className="invoice-party invoice-party-right">
              <span className="party-label">Billed To</span>
              <strong>Your Client</strong>
              <span>Infrastructure Services</span>
              <span>Renewal on: {nextDate(isYearly)}</span>
            </div>
          </div>

          <div className="invoice-divider" />

          {/* Line items */}
          <table className="invoice-table">
            <thead>
              <tr>
                <th>Service Description</th>
                <th>Cycle</th>
                <th>Unit Price</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <strong>{plan.name}</strong>
                  <span className="item-sub">{plan.features.join(" · ")}</span>
                </td>
                <td>{isYearly ? "Annual" : "Monthly"}</td>
                <td>${Number.isInteger(finalUSD) ? finalUSD : finalUSD.toFixed(2)}/mo</td>
                <td>${totalUSD}</td>
              </tr>
              <tr className="subtotal-row">
                <td colSpan={3}>Subtotal</td>
                <td>${totalUSD}</td>
              </tr>
              <tr>
                <td colSpan={3}>GST &amp; Applicable Taxes</td>
                <td className="included-cell">Included</td>
              </tr>
              <tr>
                <td colSpan={3}>Setup &amp; Onboarding Fee</td>
                <td className="included-cell">Waived</td>
              </tr>
            </tbody>
            <tfoot>
              <tr className="total-row">
                <td colSpan={3}>Total Charged</td>
                <td>
                  <div className="total-usd">${totalUSD}</div>
                  <div className="total-inr">₹{totalINR?.toLocaleString("en-IN")} INR</div>
                </td>
              </tr>
            </tfoot>
          </table>

          <div className="invoice-divider" />

          {/* Spec summary */}
          <div className="invoice-specs-row">
            {plan.features.map((f) => (
              <div className="invoice-spec-chip" key={f}>
                <span className="chip-dot">◈</span>
                {f}
              </div>
            ))}
          </div>

          {/* Footer */}
          <div className="invoice-footer-note">
            <span className="lock-icon">🔒</span>
            This is a computer-generated invoice and does not require a physical signature. · Powered by <strong>Viltrumate Secure Infrastructure</strong>
          </div>
        </div>

        {/* Actions */}
        <div className="success-actions">
          <MagneticWrapper>
            <button className="btn-outline" onClick={() => window.print()}>
              Download / Print Invoice
            </button>
          </MagneticWrapper>
          <button className="success-back-link" onClick={onReset}>
            ← Return to Plans
          </button>
        </div>
      </div>
    </div>
  );
};

/* ========== CHECKOUT DRAWER ========== */
const CheckoutDrawer = ({ plan, isYearly, onClose, onConfirm }) => {
  const discountedUSD = plan.priceMonthly * 0.8;
  const finalUSD = isYearly ? discountedUSD : plan.priceMonthly;
  const originalPriceUSD = isYearly ? plan.priceMonthly : null;
  const finalINR = Math.round(finalUSD * CONVERSION_RATE);
  const annualUSD = isYearly ? (finalUSD * 12).toFixed(2) : null;
  const annualINR = isYearly ? Math.round(finalINR * 12) : null;

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  return (
    <div className="checkout-backdrop" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="checkout-drawer">
        <div className="drawer-header">
          <div>
            <span className="drawer-kicker">Order Summary</span>
            <h2 className="drawer-title">{plan.name}</h2>
          </div>
          <button className="drawer-close" onClick={onClose} aria-label="Close checkout">✕</button>
        </div>

        <div className="drawer-body">
          <div className="drawer-section">
            <span className="drawer-section-label">Plan Details</span>
            <ul className="drawer-specs">
              {plan.features.map((f) => (
                <li key={f}><span className="spec-icon">◈</span>{f}</li>
              ))}
            </ul>
          </div>

          <div className="drawer-divider" />

          <div className="drawer-section">
            <span className="drawer-section-label">Billing Breakdown</span>
            <div className="bill-row">
              <span>{isYearly ? "Annual Plan (20% off)" : "Monthly Plan"}</span>
              <span>${Number.isInteger(finalUSD) ? finalUSD : finalUSD.toFixed(2)}/mo</span>
            </div>
            {isYearly && (
              <div className="bill-row">
                <span>Billed annually (12 months)</span>
                <span>${annualUSD}</span>
              </div>
            )}
            <div className="bill-row"><span>Setup Fee</span><span className="bill-free">Free</span></div>
            <div className="bill-row"><span>GST / Taxes</span><span className="bill-free">Included</span></div>
            <div className="bill-row"><span>Infrastructure Maintenance</span><span className="bill-free">Included</span></div>
          </div>

          <div className="drawer-divider" />

          <div className="bill-total-block">
            <div className="bill-total-row">
              <span>Total Due {isYearly ? "Today" : "/ Month"}</span>
              <div className="bill-total-amounts">
                <span className="bill-total-usd">${isYearly ? annualUSD : (Number.isInteger(finalUSD) ? finalUSD : finalUSD.toFixed(2))}</span>
                <span className="bill-total-inr">≈ ₹{isYearly ? annualINR?.toLocaleString("en-IN") : finalINR.toLocaleString("en-IN")}</span>
              </div>
            </div>
            <p className="bill-tax-note">All taxes and fees are included. No hidden charges.</p>
          </div>
        </div>

        <div className="drawer-footer">
          <MagneticWrapper>
            <button className="btn-outline drawer-cta" onClick={onConfirm}>
              Proceed to Secure Checkout →
            </button>
          </MagneticWrapper>
          <p className="drawer-secure-note">🔒 Secured by Viltrumate · 256-bit Encrypted</p>
        </div>
      </div>
    </div>
  );
};

/* ========== MAIN PAGE ========== */
export const PaymentPage = () => {
  const [isYearly, setIsYearly] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [purchased, setPurchased] = useState(false);
  const [confirmedPlan, setConfirmedPlan] = useState(null);

  const openCheckout = (plan) => setSelectedPlan(plan);
  const closeCheckout = () => setSelectedPlan(null);

  const handleConfirm = () => {
    setConfirmedPlan(selectedPlan);
    setSelectedPlan(null);
    setPurchased(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleReset = () => {
    setPurchased(false);
    setConfirmedPlan(null);
  };

  if (purchased && confirmedPlan) {
    return (
      <>
        <CustomCursor />
        <PurchaseSuccess plan={confirmedPlan} isYearly={isYearly} onReset={handleReset} />
      </>
    );
  }

  return (
    <>
      <CustomCursor />
      <div className={`payment-page ${selectedPlan ? "dimmed" : ""}`}>
        <header className="payment-header">
          <a href="/" className="back-link">← Back to Viltrumate</a>
          <div className="header-glow" />
          <h1>Managed Infrastructure &amp; Hosting</h1>
          <p>Premium, high-performance server configurations for dynamic applications.</p>
          <div className="billing-toggle">
            <span className={!isYearly ? "active" : ""}>Monthly</span>
            <button
              className={`toggle-btn ${isYearly ? "toggled" : ""}`}
              onClick={() => setIsYearly(!isYearly)}
              aria-label="Toggle billing cycle"
            >
              <div className="toggle-circle" />
            </button>
            <span className={isYearly ? "active" : ""}>
              Annually <span className="discount-badge">Save 20%</span>
            </span>
          </div>
        </header>

        <div className="container">
          <div className="payment-grid">
            {plans.map((plan) => {
              const discountedUSD = plan.priceMonthly * 0.8;
              const finalPriceUSD = isYearly ? discountedUSD : plan.priceMonthly;
              const originalPriceUSD = isYearly ? plan.priceMonthly : null;
              const finalRupee = Math.round(finalPriceUSD * CONVERSION_RATE);
              return (
                <div className={`payment-card ${plan.popular ? "popular" : ""}`} key={plan.id}>
                  {plan.popular && <div className="popular-badge">Most Chosen</div>}
                  <h3>{plan.name}</h3>
                  <p className="payment-desc">{plan.description}</p>
                  <div className="payment-price">
                    {originalPriceUSD && <span className="original-price">${originalPriceUSD}</span>}
                    <span className="price-val">${Number.isInteger(finalPriceUSD) ? finalPriceUSD : finalPriceUSD.toFixed(2)}</span>
                    <span className="price-term">/mo</span>
                  </div>
                  <div className="rupee-val">
                    approx ₹{finalRupee.toLocaleString("en-IN")}/mo {isYearly ? "· billed annually" : ""}
                  </div>
                  <ul className="payment-features">
                    {plan.features.map((f) => <li key={f}>{f}</li>)}
                  </ul>
                  <div className="payment-cta-wrap">
                    <MagneticWrapper>
                      <button
                        className={`btn-outline payment-cta ${plan.popular ? "primary" : ""}`}
                        onClick={() => openCheckout(plan)}
                      >
                        {plan.cta}
                      </button>
                    </MagneticWrapper>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {selectedPlan && (
        <CheckoutDrawer
          plan={selectedPlan}
          isYearly={isYearly}
          onClose={closeCheckout}
          onConfirm={handleConfirm}
        />
      )}
    </>
  );
};
