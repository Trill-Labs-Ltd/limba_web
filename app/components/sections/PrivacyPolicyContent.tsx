export function PrivacyPolicyContent() {
  return (
    <div className="space-y-8">
      {/* Introduction */}
      <div className="space-y-4">
        <p className="text-gray-600 leading-relaxed">
          This Privacy Policy explains how LIMBA collects and uses your personal data.
        </p>
        <div className="space-y-3">
          <p className="text-gray-600 leading-relaxed font-semibold">In short:</p>
          <ul className="list-disc list-inside space-y-2 text-gray-600 leading-relaxed ml-4">
            <li>We collect only the data needed to create your wellness profile, generate stretching routines, and track progress.</li>
            <li>Some information you choose to provide (such as a yes/no medical history indicator) is treated as health data and used only with your explicit consent.</li>
            <li>We do not provide medical advice and do not store medical records.</li>
            <li>Payments are handled by trusted third parties; we do not store card details.</li>
            <li>You control your data and can withdraw consent or request deletion at any time.</li>
          </ul>
          <p className="text-gray-600 leading-relaxed">
            For full details, please read the sections below.
          </p>
        </div>
      </div>

      {/* Section 1 */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-teal-900 mb-4">1. Who we are</h2>
        <p className="text-gray-600 leading-relaxed">
          LIMBA is a stretching and mobility app operated by Trill Labs, Limited, based in the United Kingdom.
        </p>
        <p className="text-gray-600 leading-relaxed">
          Trill Labs, Limited is the data controller responsible for the use of your personal data under the UK GDPR and EU GDPR.
        </p>
        <div className="space-y-2">
          <p className="text-gray-600 leading-relaxed font-semibold">Contact us:</p>
          <p className="text-gray-600 leading-relaxed">
            Email: <a href="mailto:support@getlimba.co.uk" className="text-teal-600 hover:text-teal-700 underline">support@getlimba.co.uk</a>
          </p>
        </div>
      </section>

      {/* Section 2 */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-teal-900 mb-4">2. What data we collect</h2>
        <p className="text-gray-600 leading-relaxed">
          We collect only the data necessary to provide and improve the LIMBA app.
        </p>
        
        <div className="space-y-3">
          <h3 className="text-xl font-semibold text-teal-800 mb-3">Account information</h3>
          <ul className="list-disc list-inside space-y-2 text-gray-600 leading-relaxed ml-4">
            <li>Display name</li>
            <li>Email address</li>
            <li>Age</li>
            <li>Gender</li>
          </ul>
        </div>

        <div className="space-y-3">
          <h3 className="text-xl font-semibold text-teal-800 mb-3">Wellness and health-related information</h3>
          <ul className="list-disc list-inside space-y-2 text-gray-600 leading-relaxed ml-4">
            <li>Medical history status (yes/no only)</li>
            <li>Wellness preferences, such as:
              <ul className="list-disc list-inside space-y-1 ml-6 mt-2">
                <li>Discomfort frequency</li>
                <li>Target muscle groups</li>
                <li>Sedentary time</li>
              </ul>
            </li>
          </ul>
          <p className="text-gray-600 leading-relaxed">
            We do not collect detailed medical histories, diagnoses, medical records, or clinical notes.
          </p>
        </div>

        <div className="space-y-3">
          <h3 className="text-xl font-semibold text-teal-800 mb-3">App usage data</h3>
          <ul className="list-disc list-inside space-y-2 text-gray-600 leading-relaxed ml-4">
            <li>Stretching sessions completed</li>
            <li>Session frequency</li>
            <li>Feature usage</li>
          </ul>
        </div>

        <div className="space-y-3">
          <h3 className="text-xl font-semibold text-teal-800 mb-3">Device information</h3>
          <ul className="list-disc list-inside space-y-2 text-gray-600 leading-relaxed ml-4">
            <li>App version</li>
            <li>Operating system</li>
            <li>Basic device identifiers</li>
          </ul>
        </div>

        <div className="space-y-3">
          <h3 className="text-xl font-semibold text-teal-800 mb-3">Subscription and payment information</h3>
          <ul className="list-disc list-inside space-y-2 text-gray-600 leading-relaxed ml-4">
            <li>Subscription status</li>
            <li>Transaction identifiers</li>
          </ul>
          <p className="text-gray-600 leading-relaxed">
            Payments are processed securely by RevenueCat, Apple App Store, or Google Play.
          </p>
          <p className="text-gray-600 leading-relaxed">
            We do not store or have access to your full payment card details.
          </p>
        </div>

        <div className="space-y-3">
          <h3 className="text-xl font-semibold text-teal-800 mb-3">Support communications</h3>
          <ul className="list-disc list-inside space-y-2 text-gray-600 leading-relaxed ml-4">
            <li>Information you provide when contacting support</li>
          </ul>
        </div>

        <p className="text-gray-600 leading-relaxed">
          We do not collect precise location data.
        </p>
      </section>

      {/* Section 3 */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-teal-900 mb-4">3. How we use your data</h2>
        <div className="space-y-3">
          <h3 className="text-xl font-semibold text-teal-800 mb-3">How LIMBA works</h3>
          <p className="text-gray-600 leading-relaxed">
            LIMBA uses your information to support the following flow:
          </p>
          <ol className="list-decimal list-inside space-y-2 text-gray-600 leading-relaxed ml-4">
            <li><strong>Onboarding</strong> – you create an account and provide basic information</li>
            <li><strong>Wellness profile</strong> – you choose preferences such as target muscle groups, sedentary time, and (optionally) a yes/no medical history indicator</li>
            <li><strong>Routine generation</strong> – the app generates stretching routines based on your selected preferences</li>
            <li><strong>Tracking</strong> – your completed sessions and usage are recorded to help you track progress over time</li>
          </ol>
          <p className="text-gray-600 leading-relaxed">
            All personalisation is based on self-reported information and general wellness logic.
          </p>
        </div>
        <div className="space-y-3">
          <p className="text-gray-600 leading-relaxed">We also use your data to:</p>
          <ul className="list-disc list-inside space-y-2 text-gray-600 leading-relaxed ml-4">
            <li>Provide core app features</li>
            <li>Personalise stretching routines</li>
            <li>Track progress and activity</li>
            <li>Improve app performance and content</li>
            <li>Understand how the app is used</li>
            <li>Respond to support requests</li>
            <li>Send important service-related messages (such as account or subscription updates)</li>
            <li>Send reminders and notifications you choose to enable</li>
          </ul>
        </div>
      </section>

      {/* Section 4 */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-teal-900 mb-4">4. Legal basis for using your data</h2>
        <p className="text-gray-600 leading-relaxed">
          Under UK/EU GDPR, we rely on the following legal bases:
        </p>
        <div className="space-y-3">
          <h3 className="text-xl font-semibold text-teal-800 mb-3">Article 6 (general personal data)</h3>
          <ul className="list-disc list-inside space-y-2 text-gray-600 leading-relaxed ml-4">
            <li><strong>Contract</strong> – to provide the app and subscription services</li>
            <li><strong>Legitimate interests</strong> – to improve the app and communicate with users</li>
            <li><strong>Consent</strong> – for optional marketing communications and reminders</li>
            <li><strong>Legal obligation</strong> – where required by law</li>
          </ul>
        </div>
        <div className="space-y-3">
          <h3 className="text-xl font-semibold text-teal-800 mb-3">Article 9 (health-related data)</h3>
          <p className="text-gray-600 leading-relaxed">
            We process limited health-related information only with your explicit consent, for the purpose of personalising your experience within the app.
          </p>
          <p className="text-gray-600 leading-relaxed">
            You may withdraw this consent at any time through the app or by contacting us.
          </p>
        </div>
      </section>

      {/* Section 5 */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-teal-900 mb-4">5. Health data</h2>
        <p className="text-gray-600 leading-relaxed">
          Some of the information you choose to provide (such as a yes/no indication of medical history) is considered special category health data under GDPR.
        </p>
        <div className="space-y-3">
          <p className="text-gray-600 leading-relaxed">We process this data:</p>
          <ul className="list-disc list-inside space-y-2 text-gray-600 leading-relaxed ml-4">
            <li>Only with your explicit consent</li>
            <li>Only for personalisation within the app</li>
            <li>Only at a high-level and non-clinical level</li>
          </ul>
        </div>
        <div className="space-y-3">
          <p className="text-gray-600 leading-relaxed">We do not:</p>
          <ul className="list-disc list-inside space-y-2 text-gray-600 leading-relaxed ml-4">
            <li>Provide medical advice, diagnosis, or treatment</li>
            <li>Use health data for advertising or profiling</li>
            <li>Share health data with third parties for marketing</li>
          </ul>
        </div>
        <p className="text-gray-600 leading-relaxed">
          LIMBA is a wellness app and is not a medical device or healthcare service.
        </p>
        <p className="text-gray-600 leading-relaxed">
          You should consult a qualified healthcare professional before starting any new physical activity program.
        </p>
      </section>

      {/* Section 6 */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-teal-900 mb-4">6. Reminders and notifications</h2>
        <p className="text-gray-600 leading-relaxed">
          If you enable reminders, we may send notifications such as:
        </p>
        <ul className="list-disc list-inside space-y-2 text-gray-600 leading-relaxed ml-4">
          <li>Stretching reminders</li>
          <li>Routine prompts</li>
          <li>Progress-related notifications</li>
        </ul>
        <p className="text-gray-600 leading-relaxed">
          You can manage or disable reminders at any time through your device settings or within the app.
        </p>
      </section>

      {/* Section 7 */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-teal-900 mb-4">7. Analytics and third-party services</h2>
        <p className="text-gray-600 leading-relaxed">
          We use trusted third-party services to operate and improve the app, including:
        </p>
        <ul className="list-disc list-inside space-y-2 text-gray-600 leading-relaxed ml-4">
          <li>RevenueCat (payment processing)</li>
          <li>Apple App Store and Google Play (subscriptions)</li>
          <li>Analytics providers</li>
          <li>Cloud hosting services</li>
          <li>Customer support tools</li>
        </ul>
        <p className="text-gray-600 leading-relaxed">
          These providers process data only on our instructions and are required to keep it secure.
        </p>
        <p className="text-gray-600 leading-relaxed font-semibold">
          We do not sell your personal data.
        </p>
      </section>

      {/* Section 8 */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-teal-900 mb-4">8. Media and content delivery</h2>
        <p className="text-gray-600 leading-relaxed">
          LIMBA delivers videos, images, and other media content using secure, time-limited access methods (such as signed URLs).
        </p>
        <div className="space-y-3">
          <p className="text-gray-600 leading-relaxed">Media assets provided through the app:</p>
          <ul className="list-disc list-inside space-y-2 text-gray-600 leading-relaxed ml-4">
            <li>Are not personalised to individual users</li>
            <li>Do not embed personal data</li>
            <li>Are used solely to deliver app content securely</li>
          </ul>
        </div>
        <p className="text-gray-600 leading-relaxed">
          Access to media content does not expose your personal information to other users or third parties.
        </p>
      </section>

      {/* Section 9 */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-teal-900 mb-4">9. International data transfers</h2>
        <p className="text-gray-600 leading-relaxed">
          Some service providers may process data outside the UK or EU.
        </p>
        <p className="text-gray-600 leading-relaxed">
          When this occurs, we utilize appropriate safeguards approved under the GDPR, such as standard contractual clauses.
        </p>
      </section>

      {/* Section 10 */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-teal-900 mb-4">10. Users outside the UK or EU</h2>
        <p className="text-gray-600 leading-relaxed">
          If you access the LIMBA app from outside the United Kingdom or European Union, your personal data will still be processed in accordance with this Privacy Policy and UK GDPR standards.
        </p>
        <p className="text-gray-600 leading-relaxed">
          Depending on your location, you may have additional rights under local data protection laws. We will respect those rights where they apply.
        </p>
        <p className="text-gray-600 leading-relaxed">
          By using the app, you acknowledge that your personal data may be transferred to and processed in the UK or other countries where our service providers operate, with appropriate safeguards in place.
        </p>
      </section>

      {/* Section 11 */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-teal-900 mb-4">11. How long we keep your data</h2>
        <p className="text-gray-600 leading-relaxed">
          We keep personal data only for as long as necessary to:
        </p>
        <ul className="list-disc list-inside space-y-2 text-gray-600 leading-relaxed ml-4">
          <li>Provide the app and maintain your account</li>
          <li>Meet legal or accounting obligations</li>
          <li>Resolve disputes</li>
        </ul>
        <p className="text-gray-600 leading-relaxed">
          Health-related data is retained only while your account is active or until you withdraw consent or request deletion.
        </p>
      </section>

      {/* Section 12 */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-teal-900 mb-4">12. Your rights</h2>
        <p className="text-gray-600 leading-relaxed">You have the right to:</p>
        <ul className="list-disc list-inside space-y-2 text-gray-600 leading-relaxed ml-4">
          <li>Access your personal data</li>
          <li>Correct inaccurate data</li>
          <li>Request the deletion of your data</li>
          <li>Restrict or object to certain processing</li>
          <li>Withdraw consent at any time (including for health data)</li>
          <li>Request a copy of your data in a portable format</li>
        </ul>
        <p className="text-gray-600 leading-relaxed">
          To exercise your rights, contact <a href="mailto:support@getlimba.com" className="text-teal-600 hover:text-teal-700 underline">support@getlimba.com</a>.
        </p>
      </section>

      {/* Section 13 */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-teal-900 mb-4">13. Consent recording and versioning</h2>
        <p className="text-gray-600 leading-relaxed">
          When you create an account or continue using LIMBA after policy updates, we record your acceptance of this Privacy Policy and the Terms of Use.
        </p>
        <div className="space-y-3">
          <p className="text-gray-600 leading-relaxed">For audit and compliance purposes, we maintain records of:</p>
          <ul className="list-disc list-inside space-y-2 text-gray-600 leading-relaxed ml-4">
            <li>The policy name (Privacy Policy or Terms of Use)</li>
            <li>The version number</li>
            <li>The date and time of acceptance</li>
          </ul>
        </div>
        <p className="text-gray-600 leading-relaxed">
          These records are used solely to demonstrate compliance with legal and contractual requirements.
        </p>
      </section>

      {/* Section 14 */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-teal-900 mb-4">14. Complaints</h2>
        <p className="text-gray-600 leading-relaxed">
          If you have concerns about how we handle your data, please contact us first.
        </p>
        <p className="text-gray-600 leading-relaxed">
          You also have the right to complain to the Information Commissioner&apos;s Office (ICO) in the UK.
        </p>
      </section>

      {/* Section 15 */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-teal-900 mb-4">15. Children</h2>
        <p className="text-gray-600 leading-relaxed">
          LIMBA is not intended for children under 16, and we do not knowingly collect personal data from children.
        </p>
      </section>

      {/* Section 16 */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-teal-900 mb-4">16. Data Protection Impact Assessment (DPIA)</h2>
        <p className="text-gray-600 leading-relaxed">
          Because LIMBA processes limited health-related information, we have carried out a Data Protection Impact Assessment (DPIA) to assess potential risks to users and identify appropriate safeguards. This assessment confirms that data collection is minimal, consent-based, proportionate, and subject to appropriate security and user controls.
        </p>
      </section>

      {/* Section 17 */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-teal-900 mb-4">17. Changes to this policy</h2>
        <p className="text-gray-600 leading-relaxed">
          We may update this Privacy Policy from time to time.
        </p>
        <p className="text-gray-600 leading-relaxed">
          If changes are significant, we will notify you through the app.
        </p>
      </section>
    </div>
  )
}

