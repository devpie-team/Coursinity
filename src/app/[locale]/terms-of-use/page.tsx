import { Metadata } from 'next'
import { Typography } from '@/components/ui'

export const metadata: Metadata = {
  title: 'Terms of Use | Coursinity',
  description: 'Terms and conditions for using Coursinity services and platform.'
}

export default function TermsOfUsePage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="prose prose-lg max-w-none">
          <Typography variant="h3" weight="bold" className="text-gray-900 mb-8 text-center">
            COURSINITY TERMS OF USE (TERMS & CONDITIONS)
          </Typography>

          <Typography variant="body3" className="text-gray-600 mb-8">
            Last updated: July 1, 2025
          </Typography>

          <div className="mb-8">
            <Typography variant="body2" className="text-gray-700 leading-relaxed">
              Welcome to Coursinity. By accessing or using any Coursinity services, tools, or content ("Services"), you
              agree to be bound by the terms and conditions outlined below (the "Terms of Use").
            </Typography>

            <Typography variant="body2" className="text-gray-700 leading-relaxed mt-4">
              In these Terms of Use, "Coursinity," "we," "us," or "our" refers to Management Training LLC KLD, the
              operator of the Coursinity platform. "You" refers to any individual or entity accessing or using our
              Services, whether as a learner, trainer, partner, or authorized representative of an organization.
            </Typography>

            <Typography variant="body2" className="text-gray-700 leading-relaxed mt-4">
              Coursinity is a digital training platform that enables public and private sector organizations to upskill
              their workforce through customized learning journeys. These include virtual academies, AI-powered modules,
              live mentorship, and other practical training tools. Any updates, new services, or tools introduced are
              also subject to these Terms.
            </Typography>

            <Typography variant="body2" className="text-gray-700 leading-relaxed mt-4">
              You must carefully read and accept all the terms and conditions set forth here, as well as our Privacy
              Policy, Cookie Policy, and any other applicable guidelines or service-specific agreements, before using
              any of our Services.
            </Typography>

            <Typography variant="body2" className="text-gray-700 leading-relaxed mt-4">
              We may update these Terms from time to time, so we recommend reviewing them regularly.
            </Typography>
          </div>

          <div className="mb-8">
            <Typography variant="h4" weight="semibold" className="text-gray-900 mb-6">
              Table of Content
            </Typography>
            <ol className="list-decimal list-inside space-y-2 text-gray-700">
              <li>
                <a href="#agreement" className="text-blue-600 hover:text-blue-800">
                  Agreement to Terms
                </a>
              </li>
              <li>
                <a href="#access" className="text-blue-600 hover:text-blue-800">
                  Site Access
                </a>
              </li>
              <li>
                <a href="#intellectual" className="text-blue-600 hover:text-blue-800">
                  Intellectual Property
                </a>
              </li>
              <li>
                <a href="#responsibilities" className="text-blue-600 hover:text-blue-800">
                  User Responsibilities
                </a>
              </li>
              <li>
                <a href="#accuracy" className="text-blue-600 hover:text-blue-800">
                  Accuracy of Information
                </a>
              </li>
              <li>
                <a href="#third-party" className="text-blue-600 hover:text-blue-800">
                  Third-party Content & Links
                </a>
              </li>
              <li>
                <a href="#privacy" className="text-blue-600 hover:text-blue-800">
                  Privacy
                </a>
              </li>
              <li>
                <a href="#additional" className="text-blue-600 hover:text-blue-800">
                  Additional Terms
                </a>
              </li>
              <li>
                <a href="#disclaimers" className="text-blue-600 hover:text-blue-800">
                  Liability & Disclaimers
                </a>
              </li>
              <li>
                <a href="#limitation" className="text-blue-600 hover:text-blue-800">
                  Limitation of Liability
                </a>
              </li>
              <li>
                <a href="#changes" className="text-blue-600 hover:text-blue-800">
                  Changes to the Terms
                </a>
              </li>
              <li>
                <a href="#termination" className="text-blue-600 hover:text-blue-800">
                  Termination
                </a>
              </li>
              <li>
                <a href="#governing" className="text-blue-600 hover:text-blue-800">
                  Governing Law & Jurisdiction
                </a>
              </li>
              <li>
                <a href="#severability" className="text-blue-600 hover:text-blue-800">
                  Severability
                </a>
              </li>
              <li>
                <a href="#waivers" className="text-blue-600 hover:text-blue-800">
                  Waivers
                </a>
              </li>
              <li>
                <a href="#force-majeure" className="text-blue-600 hover:text-blue-800">
                  Force Majeure
                </a>
              </li>
              <li>
                <a href="#assignment" className="text-blue-600 hover:text-blue-800">
                  Assignment
                </a>
              </li>
              <li>
                <a href="#full-agreement" className="text-blue-600 hover:text-blue-800">
                  Full Agreement
                </a>
              </li>
              <li>
                <a href="#contact" className="text-blue-600 hover:text-blue-800">
                  Contact Information
                </a>
              </li>
            </ol>
          </div>

          <section id="agreement" className="mb-8">
            <Typography variant="h4" weight="semibold" className="text-gray-900 mb-4">
              1. Agreement to Terms
            </Typography>
            <Typography variant="body2" className="text-gray-700 leading-relaxed">
              By using the COURSINITY website ("Site") and related services by Management Training LLC KLD (the
              "Company"), you agree to these Terms & Conditions and our Privacy Policy. If you disagree, please do not
              access the Site or use any services.
            </Typography>
          </section>

          <section id="access" className="mb-8">
            <Typography variant="h4" weight="semibold" className="text-gray-900 mb-4">
              2. Site Access
            </Typography>
            <Typography variant="body2" className="text-gray-700 leading-relaxed">
              You are responsible for necessary access arrangements and technology. We may modify or suspend the Site or
              any service at any time without notice. We are not liable if the Site or services are unavailable due to
              circumstances beyond our control.
            </Typography>
          </section>

          <section id="intellectual" className="mb-8">
            <Typography variant="h4" weight="semibold" className="text-gray-900 mb-4">
              3. Intellectual Property
            </Typography>

            <Typography variant="h6" weight="medium" className="text-gray-900 mb-3">
              3.1 Ownership
            </Typography>
            <Typography variant="body2" className="text-gray-700 leading-relaxed mb-4">
              All content, texts, software, audiovisual materials, images, etc. is protected by copyright, trademark,
              patent, or other proprietary rights. You shall not copy, modify, distribute, or exploit any content
              without our express written consent.
            </Typography>

            <Typography variant="h6" weight="medium" className="text-gray-900 mb-3">
              3.2 User License
            </Typography>
            <Typography variant="body2" className="text-gray-700 leading-relaxed mb-4">
              Upon payment (if applicable), we grant you a limited, non-transferable license to access and use the
              content for personal or internal business purposes only. Any other use is prohibited unless expressly
              permitted in writing.
            </Typography>

            <Typography variant="h6" weight="medium" className="text-gray-900 mb-3">
              3.3 Recordings & Marketing
            </Typography>
            <Typography variant="body2" className="text-gray-700 leading-relaxed mb-4">
              We may record service sessions (e.g., chat, voice) for quality, marketing, or promotional purposes.
            </Typography>
            <Typography variant="body2" className="text-gray-700 leading-relaxed">
              You grant us permission to use your name, likeness, voice, and image in connection with our marketing and
              delivery activities, as permitted by applicable law.
            </Typography>
          </section>

          <section id="responsibilities" className="mb-8">
            <Typography variant="h4" weight="semibold" className="text-gray-900 mb-4">
              4. User Responsibilities
            </Typography>
            <Typography variant="body2" className="text-gray-700 leading-relaxed mb-4">
              You agree not to:
            </Typography>
            <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4">
              <li>Use the Site unlawfully or against regulations.</li>
              <li>Misrepresent your identity or interfere with Site operation.</li>
              <li>Upload harmful software or infringing content.</li>
              <li>Use bots or automated systems improperly.</li>
              <li>Share passwords, promote products, or conduct spamming activities.</li>
            </ul>
            <Typography variant="body2" className="text-gray-700 leading-relaxed">
              You are responsible for any tax obligations arising from your usage. You indemnify the Company and
              affiliates from any claims related to your misuse of the Site.
            </Typography>
          </section>

          <section id="accuracy" className="mb-8">
            <Typography variant="h4" weight="semibold" className="text-gray-900 mb-4">
              5. Accuracy of Information
            </Typography>
            <Typography variant="body2" className="text-gray-700 leading-relaxed">
              Content on the Site is tailored to the needs of our clients and is not generic in nature. We stand behind
              its accuracy and reliability. While it is designed to support informed decision-making, it remains the
              user's responsibility to apply it appropriately to their specific context. We are not liable for outcomes
              resulting from misuse or misapplication.
            </Typography>
          </section>

          <section id="third-party" className="mb-8">
            <Typography variant="h4" weight="semibold" className="text-gray-900 mb-4">
              6. Third-party Content & Links
            </Typography>
            <Typography variant="body2" className="text-gray-700 leading-relaxed">
              The Site may contain content or links from third parties. We do not endorse or assume responsibility for
              any third-party content, products, or services you encounter.
            </Typography>
          </section>

          <section id="privacy" className="mb-8">
            <Typography variant="h4" weight="semibold" className="text-gray-900 mb-4">
              7. Privacy
            </Typography>
            <Typography variant="body2" className="text-gray-700 leading-relaxed">
              Any personal data collected is handled pursuant to our Privacy Policy, and your use of the Site implies
              your consent to that policy.
            </Typography>
          </section>

          <section id="additional" className="mb-8">
            <Typography variant="h4" weight="semibold" className="text-gray-900 mb-4">
              8. Additional Terms
            </Typography>
            <Typography variant="body2" className="text-gray-700 leading-relaxed">
              Certain paid or subscription-based services may require separate terms. These will be agreed upon during
              your subscription.
            </Typography>
          </section>

          <section id="disclaimers" className="mb-8">
            <Typography variant="h4" weight="semibold" className="text-gray-900 mb-4">
              9. Liability & Disclaimers
            </Typography>
            <Typography variant="body2" className="text-gray-700 leading-relaxed">
              The Site and its content are provided "as is" without warranty. To the fullest extent permitted by law,
              the Company disclaims all warranties, express or implied, including suitability for a particular purpose.
            </Typography>
          </section>

          <section id="limitation" className="mb-8">
            <Typography variant="h4" weight="semibold" className="text-gray-900 mb-4">
              10. Limitation of Liability
            </Typography>
            <Typography variant="body1" className="text-gray-700 leading-relaxed">
              The Company and its affiliates shall not be liable for indirect, incidental, or consequential damages,
              including loss of profits, data, or business, arising from your use of the Site, even if we have been
              informed of potential damages.
            </Typography>
          </section>

          <section id="changes" className="mb-8">
            <Typography variant="h4" weight="semibold" className="text-gray-900 mb-4">
              11. Changes to the Terms
            </Typography>
            <Typography variant="body1" className="text-gray-700 leading-relaxed">
              We reserve the right to modify these Terms at any time. Changes become effective when posted. Continued
              use of the Site after changes indicates acceptance.
            </Typography>
          </section>

          <section id="termination" className="mb-8">
            <Typography variant="h4" weight="semibold" className="text-gray-900 mb-4">
              12. Termination
            </Typography>
            <Typography variant="body2" className="text-gray-700 leading-relaxed mb-4">
              We may suspend or terminate your access immediately if:
            </Typography>
            <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4">
              <li>Payment obligations are not met.</li>
              <li>You violate these Terms.</li>
              <li>You engage in fraudulent or abusive conduct.</li>
            </ul>
            <Typography variant="body2" className="text-gray-700 leading-relaxed">
              You may terminate your account at any time via your account portal. Refund eligibility depends on the
              service-specific policy.
            </Typography>
          </section>

          <section id="governing" className="mb-8">
            <Typography variant="h4" weight="semibold" className="text-gray-900 mb-4">
              13. Governing Law & Jurisdiction
            </Typography>
            <Typography variant="body1" className="text-gray-700 leading-relaxed">
              These Terms are governed by the laws of the UAE. Any disputes shall be resolved exclusively in the UAE
              courts. You waive objections to jurisdiction or venue.
            </Typography>
          </section>

          <section id="severability" className="mb-8">
            <Typography variant="h4" weight="semibold" className="text-gray-900 mb-4">
              14. Severability
            </Typography>
            <Typography variant="body2" className="text-gray-700 leading-relaxed">
              If a provision is deemed invalid, it will be modified to reflect intent, and the remaining provisions will
              remain in effect.
            </Typography>
          </section>

          <section id="waivers" className="mb-8">
            <Typography variant="h4" weight="semibold" className="text-gray-900 mb-4">
              15. Waivers
            </Typography>
            <Typography variant="body2" className="text-gray-700 leading-relaxed">
              Failure to enforce any right does not constitute a waiver. Any waiver must be in writing and signed by the
              Company.
            </Typography>
          </section>

          <section id="force-majeure" className="mb-8">
            <Typography variant="h4" weight="semibold" className="text-gray-900 mb-4">
              16. Force Majeure
            </Typography>
            <Typography variant="body2" className="text-gray-700 leading-relaxed">
              We are not liable for delays or omissions caused by circumstances beyond our reasonable control (e.g.,
              system failures, legal changes).
            </Typography>
          </section>

          <section id="assignment" className="mb-8">
            <Typography variant="h4" weight="semibold" className="text-gray-900 mb-4">
              17. Assignment
            </Typography>
            <Typography variant="body2" className="text-gray-700 leading-relaxed">
              The Company may transfer or assign these Terms in connection with a merger or sale. By using the Site, you
              consent to such assignment.
            </Typography>
          </section>

          <section id="full-agreement" className="mb-8">
            <Typography variant="h4" weight="semibold" className="text-gray-900 mb-4">
              18. Full Agreement
            </Typography>
            <Typography variant="body2" className="text-gray-700 leading-relaxed">
              These Terms and any documents referenced herein constitute the entire agreement between you and the
              Company, superseding all prior understandings or statements.
            </Typography>
          </section>

          <section id="contact" className="mb-8">
            <Typography variant="h4" weight="semibold" className="text-gray-900 mb-4">
              19. Contact Information
            </Typography>
            <Typography variant="body2" className="text-gray-700 leading-relaxed">
              For questions or reports, contact us at{' '}
              <a href="mailto:info@coursinity.com" className="text-blue-600 hover:text-blue-800">
                info@coursinity.com
              </a>
            </Typography>
          </section>
        </div>
      </div>
    </div>
  )
}
