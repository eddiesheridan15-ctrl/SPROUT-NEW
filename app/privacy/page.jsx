import LegalShell from "../../components/LegalShell";

export const metadata = {
  title: "Privacy Policy, Renyu",
  description: "How Renyu collects, uses, and protects personal data.",
};

export default function PrivacyPage() {
  return (
    <LegalShell title="Privacy Policy" updated="13 June 2026">
      <p>
        This Privacy Policy explains how Renyu (&ldquo;Renyu&rdquo;,
        &ldquo;we&rdquo;, &ldquo;us&rdquo; or &ldquo;our&rdquo;) collects, uses,
        shares and protects personal data when you visit our website, enquire
        about our programmes, or take part in a Renyu programme through our app.
        We are committed to handling your personal data in line with the UK
        General Data Protection Regulation (UK GDPR) and the Data Protection Act
        2018.
      </p>
      <p>
        <em>
          Renyu is a trading name. Our registered company name and number will
          be added here on incorporation. Until then, enquiries can be sent to
          the contact address below.
        </em>
      </p>

      <h2>1. Who we are</h2>
      <p>
        Renyu provides four-week team engagement programmes for organisations,
        delivered through a mobile and web app, that reward everyday
        environmental actions and end with a guaranteed donation to a verified
        environmental partner. For the personal data described in this policy,
        Renyu is the data controller, except where we act as a processor on
        behalf of an employer (see section 9).
      </p>

      <h2>2. The data we collect</h2>
      <p>We collect the following categories of personal data:</p>
      <ul>
        <li>
          <strong>Enquiry data.</strong> When you complete our booking or contact
          form, we collect your name, work email address, and any details you
          choose to share about your team or organisation.
        </li>
        <li>
          <strong>Account and participation data.</strong> If you take part in a
          programme, we collect your name, email, the team or organisation you
          belong to, the actions you log, points and levels earned, streaks,
          badges, and your position on leaderboards.
        </li>
        <li>
          <strong>Content you submit.</strong> Photos, captions, comments and
          other content you upload as part of an action or a social feed.
        </li>
        <li>
          <strong>Marketing preferences.</strong> Whether you have asked to hear
          about the Renyu consumer app or other updates.
        </li>
        <li>
          <strong>Technical data.</strong> Device type, browser, IP address, and
          usage data collected through cookies and similar technologies (see
          section 8).
        </li>
      </ul>
      <p>
        We do not intentionally collect special category data (such as health,
        religious or political data). Please do not submit such data through
        free-text fields or uploaded content.
      </p>

      <h2>3. How we use your data and our legal basis</h2>
      <ul>
        <li>
          <strong>To respond to enquiries and arrange intro calls.</strong> Legal
          basis: our legitimate interests in responding to people who contact us,
          and taking steps to enter into a contract.
        </li>
        <li>
          <strong>To deliver a programme</strong> (run competitions, calculate
          points and leaderboards, administer the donation). Legal basis:
          performance of a contract, or our legitimate interests in operating the
          programme.
        </li>
        <li>
          <strong>To send you updates about the Renyu app</strong> where you
          have asked us to. Legal basis: consent, which you can withdraw at any
          time.
        </li>
        <li>
          <strong>To improve and secure our services.</strong> Legal basis: our
          legitimate interests in maintaining and improving a safe, working
          product.
        </li>
        <li>
          <strong>To meet legal and regulatory obligations.</strong> Legal basis:
          compliance with a legal obligation.
        </li>
      </ul>

      <h2>4. The guaranteed donation</h2>
      <p>
        Donations made through a Renyu programme are committed by the
        participating organisation and directed to one of our vetted
        environmental partners. We share only the information necessary to
        administer and acknowledge the donation. We do not sell personal data to
        partners, and partners may not use any data we share for their own
        marketing without a separate lawful basis and your awareness.
      </p>

      <h2>5. Who we share data with</h2>
      <ul>
        <li>
          <strong>Service providers</strong> who help us run Renyu (for example
          hosting, database, email delivery and analytics providers), acting as
          our processors under contract.
        </li>
        <li>
          <strong>Your employer or programme organiser</strong>, who will see
          team-level and, where relevant, individual participation data as part
          of running the programme.
        </li>
        <li>
          <strong>Environmental partners</strong>, limited to what is needed to
          administer the donation.
        </li>
        <li>
          <strong>Authorities or advisers</strong> where required by law, or to
          establish, exercise or defend legal claims.
        </li>
      </ul>

      <h2>6. International transfers</h2>
      <p>
        Some of our service providers may process data outside the UK. Where they
        do, we rely on an adequacy decision or appropriate safeguards (such as the
        UK International Data Transfer Agreement or Addendum to the EU Standard
        Contractual Clauses).
      </p>

      <h2>7. How long we keep data</h2>
      <p>
        We keep enquiry data for up to 24 months after our last contact, unless
        you become a customer. We keep participation data for the duration of a
        programme and for a reasonable period afterwards to support reporting and
        the consumer app where you have opted in. We keep records needed for
        legal, tax or accounting purposes for as long as the law requires.
      </p>

      <h2>8. Cookies</h2>
      <p>
        Our website uses strictly necessary cookies to function, and may use
        analytics cookies to understand how the site is used. You can control
        non-essential cookies through your browser settings. A full cookie notice
        will be provided as our use of analytics expands.
      </p>

      <h2>9. When we act for your employer</h2>
      <p>
        Where an organisation runs a Renyu programme for its staff, that
        organisation is the controller for participation data and Renyu acts as a
        processor under a data processing agreement. In that case, your
        employer&rsquo;s privacy notice also applies, and requests about your data
        may be directed to them.
      </p>

      <h2>10. Your rights</h2>
      <p>
        Under UK data protection law you have the right to access your data,
        correct it, erase it, restrict or object to processing, port it, and
        withdraw consent. You also have the right to complain to the Information
        Commissioner&rsquo;s Office (ICO) at ico.org.uk. We would appreciate the
        chance to address your concern first.
      </p>

      <h2>11. Changes to this policy</h2>
      <p>
        We may update this policy from time to time. We will change the date at
        the top and, for material changes, take reasonable steps to let you know.
      </p>

      <h2>12. Contact</h2>
      <p>
        For any privacy question or to exercise your rights, email us at{" "}
        <a href="mailto:privacy@renyu.co.uk">privacy@renyu.co.uk</a> or use the
        contact form on our website.
      </p>
    </LegalShell>
  );
}
