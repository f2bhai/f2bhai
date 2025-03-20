import React from 'react';
import LegalLayout from '../components/LegalLayout';

const PrivacyPolicy = () => {
  return (
    <LegalLayout title="Privacy Policy">
      <div className="space-y-6">
        <p className="text-white/60">Effective Date: [20/02/2025]</p>
        
        <p>
          At F2 Bhai, we prioritize the privacy and security of your personal data. This Privacy Policy outlines the types of personal information we collect, how we use it, and how we ensure it is kept safe. By visiting our website, you agree to the terms set forth in this policy.
        </p>

        <section>
          <h2 className="text-2xl font-semibold mb-4">1. Information We Collect</h2>
          <p>We collect certain personal information when you interact with our website. This includes:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              <strong>Personal Identification Information:</strong> Your name, email address, phone number, or other information you provide through our contact forms or when subscribing to updates.
            </li>
            <li>
              <strong>Technical Data:</strong> This includes information such as your IP address, browser type, device type, and browsing activity on our website, which is automatically collected through cookies and other tracking technologies.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">2. How We Use Your Information</h2>
          <p>The information we collect is used for the following purposes:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>To improve the user experience on our website.</li>
            <li>To respond to your inquiries or feedback.</li>
            <li>To personalize content and provide services that match your interests.</li>
            <li>To ensure compliance with legal obligations and enhance website security.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">3. Data Security</h2>
          <p>
            We take the security of your personal information seriously. We implement appropriate technical and organizational measures to protect your data from unauthorized access, loss, or misuse. However, no method of internet transmission or electronic storage is 100% secure, and we cannot guarantee absolute security.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">4. Cookies</h2>
          <p>
            Our website uses cookies to enhance your experience. Cookies are small text files stored on your device that allow us to track user behavior and preferences. You can control cookie settings through your browser, but please note that disabling cookies may impact your ability to use certain features of the site.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">5. Sharing Your Information</h2>
          <p>
            We do not sell, rent, or share your personal information with third parties for marketing purposes. We may share information with trusted service providers that assist us in website operations, such as hosting and analytics. These third parties are contractually obligated to keep your information confidential.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">6. Your Rights</h2>
          <p>You have the right to:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Access and correct any personal information we hold about you.</li>
            <li>Request deletion of your personal data (subject to applicable legal requirements).</li>
            <li>Opt-out of email communications by clicking the unsubscribe link in our emails.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">7. Changes to This Privacy Policy</h2>
          <p>
            We reserve the right to update this Privacy Policy at any time. When we make changes, we will update the "Effective Date" at the top of this page. Please review this policy periodically to stay informed about how we are protecting your data.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">8. Contact Us</h2>
          <p>
            If you have any questions or concerns about this Privacy Policy or how we handle your personal data, please contact us at:{' '}
            <a href="mailto:f2business26@gmail.com" className="text-teal-500 hover:text-teal-400">
              f2business26@gmail.com
            </a>
          </p>
        </section>

        <p className="text-sm text-white/60 mt-8">
          By using our website, you consent to our Privacy Policy.
        </p>
      </div>
    </LegalLayout>
  );
};

export default PrivacyPolicy;