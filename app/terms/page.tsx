import type { Metadata } from "next";
import Link from "next/link";
import { EmailLink } from "@/components/EmailLink";
import { LegalPage, Pending } from "@/components/LegalPage";
import { COMPANY, SITE_URL } from "@/lib/site";

export const dynamic = "error";

export const metadata: Metadata = {
  title: "Terms of Use",
  description:
    "The terms on which Tourglobe, travel consultants in Madurai, Tamil Nadu, makes this website and its enquiry service available.",
  alternates: { canonical: `${SITE_URL}/terms` },
};

/**
 * DRAFT — needs review by a qualified lawyer before launch.
 *
 * Claims about how the site behaves are verified against the code: no payment
 * is taken anywhere, the enquiry form is the only submission point, and the
 * durations shown come from the client's catalogue. The "images are
 * illustrative" clause matters right now — all 45 destination photographs are
 * AI-generated placeholders and 17 do not depict the destination they
 * illustrate.
 */
export default function TermsPage() {
  return (
    <LegalPage
      title="Terms of Use"
      lead="The basis on which we make this website and our enquiry service available to you."
    >
      <p>
        <strong>Last updated:</strong> September 3, 2026
      </p>

      <p>
        This website is operated by {COMPANY.name}, a travel counselling and
        consultancy firm in {COMPANY.address.locality},{" "}
        {COMPANY.address.region}, India. The registered legal entity is{" "}
        <Pending>full registered entity name and registration number</Pending>.
        By using this site you accept these terms.
      </p>

      <h2>What this website is</h2>
      <p>
        This site is informational. It describes the kinds of journeys we plan
        and lets you send us an enquiry. It is <strong>not</strong> a booking
        engine:
      </p>
      <ul>
        <li>You cannot book or reserve anything on this site.</li>
        <li>
          No payment is taken here. We never ask for card details, bank
          details or payment through this website.
        </li>
        <li>
          Sending an enquiry costs nothing and commits you to nothing. No
          payment is needed to get a plan.
        </li>
      </ul>

      <h2>Enquiries are not contracts</h2>
      <p>
        An enquiry is an invitation for us to prepare a proposal. It does not
        create a booking, reserve availability, or fix a price. A journey is
        only confirmed when we confirm it to you in writing and you accept our
        booking terms, which are separate from these terms and will be
        provided at that stage.
      </p>
      <p>
        We aim to reply to enquiries within one working day. That is a service
        commitment, not a contractual guarantee.
      </p>

      <h2>Programme information</h2>
      <p>
        The destinations, itineraries and durations shown here are{" "}
        <strong>indicative</strong>. They describe the shape of a journey we
        can plan, not a fixed product. Places visited, night and day counts,
        seasons and inclusions all change with your dates, your group and local
        conditions, and are confirmed only in a written proposal.
      </p>
      <p>
        Prices are not published on this site. Any figure discussed with a
        counsellor is subject to availability and confirmation.
      </p>

      <h2>Photographs</h2>
      <p>
        Photographs on this site are <strong>illustrative</strong>. They convey
        the character of a destination or a kind of journey and are not
        photographs of specific accommodation, vehicles, guides or departures
        you will receive. Where an image does not depict a named place, its
        description avoids naming one.
      </p>

      <h2>Third parties</h2>
      <p>
        This site links to our sister brands and to WhatsApp. We do not control
        those services and are not responsible for their content or their
        handling of your information. Your use of WhatsApp is governed by
        WhatsApp&rsquo;s own terms.
      </p>
      <p>
        Travel services are ultimately delivered by airlines, hotels,
        transport operators and other suppliers who have their own terms and
        conditions.
      </p>

      <h2>Acceptable use</h2>
      <p>You agree not to:</p>
      <ul>
        <li>submit false information, or another person&rsquo;s details without their permission</li>
        <li>use the enquiry form to send unsolicited or automated messages</li>
        <li>attempt to disrupt, probe or gain unauthorised access to the site</li>
        <li>copy or republish substantial parts of the site for commercial use</li>
      </ul>

      <h2>Intellectual property</h2>
      <p>
        The Tourglobe name and logo, the text on this site, and its design and
        arrangement belong to us or are used with permission. You may read,
        share and print pages for your own travel planning. Any other use needs
        our written permission.
      </p>

      <h2>Availability and accuracy</h2>
      <p>
        We work to keep this site accurate and available, but we do not
        guarantee it will be uninterrupted or error-free, and content may
        become out of date. Tell us if you spot something wrong and we will
        correct it.
      </p>

      <h2>Liability</h2>
      <p>
        To the extent permitted by law, we are not liable for loss arising from
        reliance on the general information published on this site, as opposed
        to a written proposal we have issued to you. Nothing in these terms
        excludes liability that cannot lawfully be excluded, including for
        death or personal injury caused by negligence, or for fraud.
      </p>

      <h2>Privacy</h2>
      <p>
        Our <Link href="/privacy">Privacy Policy</Link> explains what we do
        with the information you send through the enquiry form.
      </p>

      <h2>Changes</h2>
      <p>
        We may update these terms. The date at the top of this page shows when
        they last changed, and the version published here is the one that
        applies.
      </p>

      <h2>Governing law</h2>
      <p>
        These terms are governed by the laws of India, and the courts at{" "}
        {COMPANY.address.locality}, {COMPANY.address.region} have exclusive
        jurisdiction over any dispute. <Pending>confirm jurisdiction clause with your legal adviser</Pending>
      </p>

      <h2>Contact us</h2>
      <p>
        {COMPANY.name}
        <br />
        {COMPANY.address.street}
        <br />
        {COMPANY.address.locality}, {COMPANY.address.region}{" "}
        {COMPANY.address.postalCode}, India
        <br />
        {COMPANY.phones.join(" · ")}
        <br />
        <EmailLink email={COMPANY.email} />
      </p>
    </LegalPage>
  );
}
