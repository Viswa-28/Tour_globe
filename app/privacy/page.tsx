import type { Metadata } from "next";
import Link from "next/link";
import { EmailLink } from "@/components/EmailLink";
import { LegalPage, Pending } from "@/components/LegalPage";
import { COMPANY, SITE_URL } from "@/lib/site";

export const dynamic = "error";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How Tourglobe, travel consultants in Madurai, Tamil Nadu, collects and handles the personal information you send through the enquiry form.",
  alternates: { canonical: `${SITE_URL}/privacy` },
};

/**
 * DRAFT — needs review by a qualified lawyer before launch.
 *
 * Everything stated about the site's technical behaviour is verified against
 * the code: the field list matches components/EnquiryForm.tsx, the recipients
 * match app/api/enquiry/route.ts, and the "no cookies" claim was checked
 * against live response headers and a source scan for cookie/localStorage
 * usage. Everything the code cannot answer is marked TODO(client).
 */
export default function PrivacyPolicyPage() {
  return (
    <LegalPage
      title="Privacy Policy"
      lead="What we collect when you enquire, why we collect it, and what we do with it."
    >
      <p>
        <strong>Last updated:</strong> <Pending>publication date</Pending>
      </p>

      <p>
        This policy explains how {COMPANY.name} (&ldquo;we&rdquo;,
        &ldquo;us&rdquo;), a travel counselling and consultancy firm at{" "}
        {COMPANY.address.street}, {COMPANY.address.locality},{" "}
        {COMPANY.address.region} {COMPANY.address.postalCode}, India, handles
        personal information collected through{" "}
        <Link href="/">{COMPANY.website}</Link>.
      </p>
      <p>
        The registered legal entity operating this site is{" "}
        <Pending>full registered entity name and registration number</Pending>.
      </p>

      <h2>What we collect</h2>

      <h3>Information you give us</h3>
      <p>
        The enquiry form is the only place on this site where you can send us
        information. It asks for:
      </p>
      <ul>
        <li>Your name</li>
        <li>Your phone or WhatsApp number</li>
        <li>Your email address</li>
        <li>Where you are travelling around</li>
        <li>The number of travellers</li>
        <li>What you are planning</li>
        <li>Anything specific you want to tell us</li>
      </ul>
      <p>
        Only your name and one means of contact are required. You do not have
        to give us both a phone number and an email address, and every other
        field can be left blank.
      </p>

      <h3>Information collected automatically</h3>
      <p>
        To stop automated spam, the form measures how long the page was open
        before submission and includes a hidden field that people never see.
        Neither identifies you, and we do not use CAPTCHA.
      </p>
      <p>
        Our host, Vercel, records anonymous page performance measurements
        (loading speed and responsiveness) through Vercel Speed Insights.
        These are aggregated and are not used to identify individual visitors.
      </p>

      <h3>Cookies</h3>
      <p>
        <strong>This website sets no cookies.</strong> We use no advertising
        cookies, no tracking pixels and no cross-site profiling, and we store
        nothing in your browser. That is why you are not asked to accept a
        cookie banner.
      </p>

      <h2>Why we use it</h2>
      <p>
        We use what you send us for one purpose: to reply to your enquiry and
        to plan and discuss travel with you. A counsellor may contact you by
        phone, WhatsApp or email using the details you provide.
      </p>
      <p>
        We do not sell your personal information, we do not rent or trade it,
        and we do not use it for advertising.
      </p>

      <h2>Who else sees it</h2>
      <p>
        We share personal information only with the service providers needed
        to operate this site and reply to you:
      </p>
      <ul>
        <li>
          <strong>Resend</strong> — delivers the enquiry form email to our
          inbox. Your submission passes through their systems.
        </li>
        <li>
          <strong>Vercel</strong> — hosts the website and processes requests.
        </li>
        {/* Zoho is not a guess: tourglobe.in's public MX records point at
            mx.zoho.com / mx2 / mx3, and its SPF record is
            "v=spf1 include:zohomail.com ~all". */}
        <li>
          <strong>Zoho Mail</strong> — hosts the{" "}
          <EmailLink email={COMPANY.email} /> mailbox where
          enquiries arrive.
        </li>
      </ul>
      <p>
        These providers operate servers outside India, so your information may
        be processed abroad. If you contact us through WhatsApp, that
        conversation is also governed by WhatsApp&rsquo;s own privacy policy.
      </p>
      <p>
        We may disclose information where the law requires it, and to
        professional advisers where necessary. Beyond that, we do not pass it
        to anyone else.
      </p>

      <h2>How long we keep it</h2>
      <p>
        We keep enquiry records for <Pending>retention period</Pending>, after
        which they are deleted. If you ask us to delete your details sooner, we
        will, unless we are required to keep them by law.
      </p>

      <h2>Your rights</h2>
      <p>You may ask us to:</p>
      <ul>
        <li>tell you what personal information we hold about you</li>
        <li>correct anything that is wrong or out of date</li>
        <li>delete your information</li>
        <li>stop contacting you</li>
      </ul>
      <p>
        To make any of these requests, email{" "}
        <EmailLink email={COMPANY.email} /> or write to us
        at the address below. We will respond within a reasonable period.
      </p>
      <p>
        If you are in the European Economic Area or the United Kingdom, you
        also have the right to object to processing, to request
        portability of your data, and to complain to your local data
        protection authority.
      </p>

      <h2>Keeping it safe</h2>
      <p>
        The site is served over an encrypted connection, and form submissions
        are transmitted encrypted. Access to enquiry emails is limited to the
        counsellors who need it. No system is perfectly secure, but we take
        reasonable steps to protect what you send us.
      </p>

      <h2>Children</h2>
      <p>
        This site is not directed at children, and we do not knowingly collect
        information from anyone under 18. If a child has sent us information,
        contact us and we will delete it.
      </p>

      <h2>Grievance Officer</h2>
      <p>
        Under India&rsquo;s Digital Personal Data Protection Act 2023 we must
        name an officer who handles data protection complaints:
      </p>
      <ul>
        <li>
          <strong>Name:</strong> <Pending>grievance officer name</Pending>
        </li>
        <li>
          <strong>Email:</strong>{" "}
          <EmailLink email={COMPANY.email} />
        </li>
        <li>
          <strong>Address:</strong> {COMPANY.address.street},{" "}
          {COMPANY.address.locality}, {COMPANY.address.region}{" "}
          {COMPANY.address.postalCode}, India
        </li>
      </ul>

      <h2>Changes</h2>
      <p>
        If we change this policy we will update the date at the top of this
        page. Material changes will be made clear on the site.
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
