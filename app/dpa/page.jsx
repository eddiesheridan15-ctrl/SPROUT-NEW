import LegalShell from "../../components/LegalShell";

export const metadata = {
  title: "Data Processing Agreement, Sprout",
  description:
    "The terms under which Sprout processes personal data on behalf of a customer organisation.",
};

export default function DpaPage() {
  return (
    <LegalShell title="Data Processing Agreement" updated="13 June 2026">
      <p>
        This Data Processing Agreement (&ldquo;DPA&rdquo;) forms part of the
        agreement between Sprout (&ldquo;Sprout&rdquo;, &ldquo;Processor&rdquo;)
        and the customer organisation (&ldquo;Customer&rdquo;,
        &ldquo;Controller&rdquo;) that has agreed to run a Sprout programme (the
        &ldquo;Order&rdquo;). It governs the processing of personal data carried
        out by Sprout on the Customer&rsquo;s behalf, and is designed to meet the
        requirements of Article 28 of the UK GDPR.
      </p>
      <p>
        <em>
          Sprout is a trading name. Our registered company name and number will
          be added here on incorporation. This DPA is a working framework and
          should be reviewed by a qualified legal adviser before signature.
        </em>
      </p>

      <h2>1. Definitions</h2>
      <p>
        &ldquo;UK GDPR&rdquo;, &ldquo;controller&rdquo;, &ldquo;processor&rdquo;,
        &ldquo;data subject&rdquo;, &ldquo;personal data&rdquo;,
        &ldquo;processing&rdquo; and &ldquo;personal data breach&rdquo; have the
        meanings given in the UK GDPR and the Data Protection Act 2018. Where this
        DPA conflicts with the Order on data protection matters, this DPA prevails.
      </p>

      <h2>2. Roles of the parties</h2>
      <p>
        For the personal data processed under a programme, the Customer is the
        controller and Sprout is the processor. Sprout will process that personal
        data only on the Customer&rsquo;s documented instructions, including the
        instructions set out in this DPA and the Order, unless required to do
        otherwise by law (in which case Sprout will inform the Customer first
        where legally permitted).
      </p>

      <h2>3. Subject matter and details of processing</h2>
      <ul>
        <li>
          <strong>Subject matter:</strong> delivery of a Sprout team engagement
          programme.
        </li>
        <li>
          <strong>Duration:</strong> the term of the programme, plus any agreed
          period for reporting and return or deletion of data.
        </li>
        <li>
          <strong>Nature and purpose:</strong> hosting and administering
          competitions, calculating points, levels and leaderboards, enabling a
          participation feed, and administering the guaranteed donation.
        </li>
        <li>
          <strong>Types of personal data:</strong> participant name, work email,
          team or organisation, logged actions, points, levels, streaks, badges,
          leaderboard position, and content participants choose to upload.
        </li>
        <li>
          <strong>Categories of data subject:</strong> the Customer&rsquo;s
          employees or participants enrolled in the programme.
        </li>
      </ul>

      <h2>4. Sprout&rsquo;s obligations</h2>
      <ul>
        <li>
          Process personal data only on documented instructions from the
          Customer.
        </li>
        <li>
          Ensure that persons authorised to process the personal data are bound by
          confidentiality.
        </li>
        <li>
          Implement appropriate technical and organisational security measures (see
          section 7).
        </li>
        <li>
          Respect the conditions in section 5 for engaging sub-processors.
        </li>
        <li>
          Assist the Customer, taking into account the nature of processing, in
          responding to data subject requests and in meeting its obligations
          regarding security, breach notification, data protection impact
          assessments, and prior consultation with the ICO.
        </li>
        <li>
          At the Customer&rsquo;s choice, delete or return all personal data at
          the end of the programme, and delete existing copies unless retention is
          required by law.
        </li>
        <li>
          Make available to the Customer the information necessary to demonstrate
          compliance with Article 28, and allow for and contribute to audits on
          reasonable notice.
        </li>
      </ul>

      <h2>5. Sub-processors</h2>
      <p>
        The Customer gives general authorisation for Sprout to engage
        sub-processors (such as hosting, database, and email delivery providers)
        to deliver the Services. Sprout will impose data protection obligations on
        each sub-processor that are no less protective than those in this DPA, and
        remains responsible to the Customer for their performance. Sprout will
        give the Customer reasonable notice of any intended addition or replacement
        of a sub-processor, and the Customer may object on reasonable data
        protection grounds.
      </p>

      <h2>6. International transfers</h2>
      <p>
        Sprout will not transfer personal data outside the UK except where an
        adequacy decision applies or appropriate safeguards are in place (such as
        the UK International Data Transfer Agreement, or the UK Addendum to the EU
        Standard Contractual Clauses), and will inform the Customer of such
        transfers.
      </p>

      <h2>7. Security</h2>
      <p>
        Taking into account the state of the art, costs, and the nature, scope and
        purposes of processing, Sprout will implement appropriate technical and
        organisational measures to ensure a level of security appropriate to the
        risk. These include access controls, encryption in transit, secured hosting
        and database infrastructure, and measures to restore availability after an
        incident.
      </p>

      <h2>8. Personal data breaches</h2>
      <p>
        Sprout will notify the Customer without undue delay after becoming aware of
        a personal data breach affecting the Customer&rsquo;s data, and will
        provide the information reasonably available to help the Customer meet its
        own breach notification obligations.
      </p>

      <h2>9. Data subject requests</h2>
      <p>
        If Sprout receives a request from a data subject relating to the
        Customer&rsquo;s data, it will direct the request to the Customer and will
        not respond directly except on the Customer&rsquo;s instructions or as
        required by law. Sprout will provide reasonable assistance to enable the
        Customer to respond.
      </p>

      <h2>10. Liability</h2>
      <p>
        The liability of each party under or in connection with this DPA is subject
        to the limitations and exclusions of liability set out in the Order and our{" "}
        <a href="/terms">Terms of Service</a>.
      </p>

      <h2>11. Term</h2>
      <p>
        This DPA takes effect when the Order is signed and continues for as long as
        Sprout processes personal data on the Customer&rsquo;s behalf. Sections
        intended to survive (including confidentiality and deletion or return of
        data) continue after it ends.
      </p>

      <h2>12. Contact</h2>
      <p>
        Questions about this DPA can be sent to{" "}
        <a href="mailto:eddiesheridan15@gmail.com">eddiesheridan15@gmail.com</a>.
      </p>
    </LegalShell>
  );
}
