import React from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const LegalAgreementModal = ({ isOpen, onClose, type, title, content }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative bg-card border border-border rounded-lg shadow-xl max-w-4xl max-h-[80vh] w-full mx-4 flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="text-xl font-semibold text-foreground">{title}</h2>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
          >
            <Icon name="X" size={20} />
          </Button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="prose prose-sm max-w-none text-foreground">
            {content}
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end space-x-3 p-6 border-t border-border">
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
          <Button onClick={onClose}>
            I Understand
          </Button>
        </div>
      </div>
    </div>
  );
};

const TermsOfServiceContent = () => (
  <div className="space-y-6">
    <section>
      <h3 className="text-lg font-semibold mb-3">1. Acceptance of Terms</h3>
      <p className="text-muted-foreground leading-relaxed">
        By accessing and using the AI Agent Sandbox platform, you accept and agree to be bound by the terms and provision of this agreement. 
        If you do not agree to abide by the above, please do not use this service.
      </p>
    </section>

    <section>
      <h3 className="text-lg font-semibold mb-3">2. Use License</h3>
      <p className="text-muted-foreground leading-relaxed mb-3">
        Permission is granted to temporarily use the AI Agent Sandbox for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:
      </p>
      <ul className="list-disc list-inside text-muted-foreground space-y-1 ml-4">
        <li>modify or copy the materials</li>
        <li>use the materials for any commercial purpose or for any public display (commercial or non-commercial)</li>
        <li>attempt to decompile or reverse engineer any software contained on the platform</li>
        <li>remove any copyright or other proprietary notations from the materials</li>
      </ul>
    </section>

    <section>
      <h3 className="text-lg font-semibold mb-3">3. AI Agent Usage</h3>
      <p className="text-muted-foreground leading-relaxed">
        Users are responsible for the behavior and actions of AI agents created on this platform. All agents must comply with applicable laws and regulations. 
        The platform reserves the right to suspend or terminate agents that violate these terms or engage in harmful activities.
      </p>
    </section>

    <section>
      <h3 className="text-lg font-semibold mb-3">4. Data and Privacy</h3>
      <p className="text-muted-foreground leading-relaxed">
        Your privacy is important to us. All data processed by AI agents is handled in accordance with our Privacy Policy. 
        Users retain ownership of their data and can request deletion at any time.
      </p>
    </section>

    <section>
      <h3 className="text-lg font-semibold mb-3">5. Limitation of Liability</h3>
      <p className="text-muted-foreground leading-relaxed">
        In no event shall AI Agent Sandbox or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, 
        or due to business interruption) arising out of the use or inability to use the platform.
      </p>
    </section>

    <section>
      <h3 className="text-lg font-semibold mb-3">6. Modifications</h3>
      <p className="text-muted-foreground leading-relaxed">
        AI Agent Sandbox may revise these terms of service at any time without notice. By using this platform, 
        you are agreeing to be bound by the then current version of these terms of service.
      </p>
    </section>

    <div className="bg-muted/30 rounded-lg p-4 mt-6">
      <p className="text-sm text-muted-foreground">
        <strong>Last updated:</strong> August 30, 2025
      </p>
    </div>
  </div>
);

const PrivacyPolicyContent = () => (
  <div className="space-y-6">
    <section>
      <h3 className="text-lg font-semibold mb-3">1. Information We Collect</h3>
      <p className="text-muted-foreground leading-relaxed mb-3">
        We collect information you provide directly to us, such as when you create an account, use our services, or contact us for support.
      </p>
      <ul className="list-disc list-inside text-muted-foreground space-y-1 ml-4">
        <li>Account information (name, email, organization)</li>
        <li>AI agent configurations and task data</li>
        <li>Usage analytics and performance metrics</li>
        <li>Communication records and support interactions</li>
      </ul>
    </section>

    <section>
      <h3 className="text-lg font-semibold mb-3">2. How We Use Your Information</h3>
      <p className="text-muted-foreground leading-relaxed mb-3">
        We use the information we collect to:
      </p>
      <ul className="list-disc list-inside text-muted-foreground space-y-1 ml-4">
        <li>Provide, maintain, and improve our services</li>
        <li>Process transactions and send related information</li>
        <li>Send technical notices and support messages</li>
        <li>Respond to comments, questions, and customer service requests</li>
        <li>Monitor and analyze trends and usage</li>
      </ul>
    </section>

    <section>
      <h3 className="text-lg font-semibold mb-3">3. Information Sharing</h3>
      <p className="text-muted-foreground leading-relaxed">
        We do not sell, trade, or otherwise transfer your personal information to third parties without your consent, 
        except as described in this policy. We may share information in the following circumstances:
      </p>
      <ul className="list-disc list-inside text-muted-foreground space-y-1 ml-4 mt-3">
        <li>With your consent or at your direction</li>
        <li>For legal compliance or to protect rights and safety</li>
        <li>In connection with a merger, acquisition, or sale of assets</li>
        <li>With service providers who assist in our operations</li>
      </ul>
    </section>

    <section>
      <h3 className="text-lg font-semibold mb-3">4. Data Security</h3>
      <p className="text-muted-foreground leading-relaxed">
        We implement appropriate security measures to protect your personal information against unauthorized access, 
        alteration, disclosure, or destruction. This includes encryption, secure servers, and regular security audits.
      </p>
    </section>

    <section>
      <h3 className="text-lg font-semibold mb-3">5. Data Retention</h3>
      <p className="text-muted-foreground leading-relaxed">
        We retain your information for as long as your account is active or as needed to provide services. 
        You may request deletion of your account and associated data at any time.
      </p>
    </section>

    <section>
      <h3 className="text-lg font-semibold mb-3">6. Your Rights</h3>
      <p className="text-muted-foreground leading-relaxed mb-3">
        You have the right to:
      </p>
      <ul className="list-disc list-inside text-muted-foreground space-y-1 ml-4">
        <li>Access and update your personal information</li>
        <li>Request deletion of your data</li>
        <li>Opt out of certain communications</li>
        <li>Export your data in a portable format</li>
      </ul>
    </section>

    <div className="bg-muted/30 rounded-lg p-4 mt-6">
      <p className="text-sm text-muted-foreground">
        <strong>Last updated:</strong> August 30, 2025
      </p>
    </div>
  </div>
);

export { LegalAgreementModal, TermsOfServiceContent, PrivacyPolicyContent };