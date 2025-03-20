import React from 'react';
import LegalLayout from '../components/LegalLayout';

const TermsOfService = () => {
  return (
    <LegalLayout title="Terms of Service">
      <div className="space-y-6">
        <p className="text-white/60">Last Updated: [20/02/2025]</p>

        <section>
          <h2 className="text-2xl font-semibold mb-4">1. Acceptance of Terms</h2>
          <p>
            By accessing and using this website, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">2. Use License</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              Permission is granted to temporarily download one copy of the materials (information or software) on F2 Bhai's website for personal, non-commercial transitory viewing only.
            </li>
            <li>
              This is the grant of a license, not a transfer of title, and under this license you may not:
              <ul className="list-disc pl-6 mt-2 space-y-1">
                <li>Modify or copy the materials</li>
                <li>Use the materials for any commercial purpose</li>
                <li>Attempt to decompile or reverse engineer any software contained on F2 Bhai's website</li>
                <li>Remove any copyright or other proprietary notations from the materials</li>
                <li>Transfer the materials to another person or "mirror" the materials on any other server</li>
              </ul>
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">3. Disclaimer</h2>
          <p>
            The materials on F2 Bhai's website are provided on an 'as is' basis. F2 Bhai makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">4. Limitations</h2>
          <p>
            In no event shall F2 Bhai or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on F2 Bhai's website, even if F2 Bhai or a F2 Bhai authorized representative has been notified orally or in writing of the possibility of such damage.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">5. Accuracy of Materials</h2>
          <p>
            The materials appearing on F2 Bhai's website could include technical, typographical, or photographic errors. F2 Bhai does not warrant that any of the materials on its website are accurate, complete, or current.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">6. Links</h2>
          <p>
            F2 Bhai has not reviewed all of the sites linked to its website and is not responsible for the contents of any such linked site. The inclusion of any link does not imply endorsement by F2 Bhai of the site. Use of any such linked website is at the user's own risk.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">7. Modifications</h2>
          <p>
            F2 Bhai may revise these terms of service for its website at any time without notice. By using this website, you are agreeing to be bound by the then current version of these terms of service.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">8. Governing Law</h2>
          <p>
            These terms and conditions are governed by and construed in accordance with the laws and you irrevocably submit to the exclusive jurisdiction of the courts in that location.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Contact Information</h2>
          <p>
            If you have any questions about these Terms of Service, please contact us at:{' '}
            <a href="mailto:f2business26@gmail.com" className="text-teal-500 hover:text-teal-400">
              f2business26@gmail.com
            </a>
          </p>
        </section>
      </div>
    </LegalLayout>
  );
};

export default TermsOfService;