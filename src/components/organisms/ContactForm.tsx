import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, MessageSquare, Building, Globe, Send, User } from 'lucide-react';
import Card from '../atoms/Card';
import { FormProvider, FormInput, FormSelect, FormCheckbox, FormTextArea, FormSubmitButton, FormError, FormRadioGroup } from '../forms';
import useForm from '../../hooks/useForm';
import { validationSchemas } from '../../utils/validation';
import { useUIStore } from '../../store/useUIStore';

interface ContactFormProps {
  className?: string;
}

const ContactForm: React.FC<ContactFormProps> = ({ className }) => {
  const { addNotification } = useUIStore();
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Initialize form with validation schema
  const form = useForm({
    schema: validationSchemas.contact,
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      company: '',
      country: '',
      subject: '',
      message: '',
      inquiryType: '',
      newsletter: false,
    },
    onSubmit: async (data) => {
      setIsSubmitting(true);
      
      try {
        // In a real app, this would submit to an API
        console.log('Form submitted:', data);
        
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // Show success notification
        addNotification({
          type: 'success',
          message: 'Your message has been sent successfully!',
          autoClose: true,
        });
        
        // Clear form
        form.reset();
      } catch (error) {
        console.error('Error submitting form:', error);
        addNotification({
          type: 'error',
          message: 'Failed to send message. Please try again.',
          autoClose: true,
        });
      } finally {
        setIsSubmitting(false);
      }
    },
  });

  const countryOptions = [
    { value: 'ng', label: 'Nigeria', icon: '🇳🇬' },
    { value: 'gh', label: 'Ghana', icon: '🇬🇭' },
    { value: 'ke', label: 'Kenya', icon: '🇰🇪' },
    { value: 'za', label: 'South Africa', icon: '🇿🇦' },
    { value: 'eg', label: 'Egypt', icon: '🇪🇬' },
    { value: 'ma', label: 'Morocco', icon: '🇲🇦' },
    { value: 'tr', label: 'Turkey', icon: '🇹🇷' },
    { value: 'other', label: 'Other' },
  ];

  const inquiryOptions = [
    { value: 'general', label: 'General Inquiry', description: 'Questions about our platform' },
    { value: 'supplier', label: 'Become a Supplier', description: 'Join our marketplace as a seller' },
    { value: 'bulk', label: 'Bulk Orders', description: 'Large quantity purchases' },
    { value: 'partnership', label: 'Partnership', description: 'Business collaboration opportunities' },
    { value: 'support', label: 'Technical Support', description: 'Help with platform usage' },
  ];

  return (
    <Card variant="default" padding="lg" className={className}>
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100 mb-2">
          Get in Touch
        </h2>
        <p className="text-neutral-600 dark:text-neutral-400">
          Ready to start trading? Have questions? We're here to help you succeed.
        </p>
      </div>

      <FormProvider form={form} onSubmit={form.handleSubmit} className="space-y-6">
        {/* Personal Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormInput
            name="firstName"
            label="First Name"
            placeholder="Enter your first name"
            leftIcon={<User className="w-4 h-4" />}
            required
          />
          
          <FormInput
            name="lastName"
            label="Last Name"
            placeholder="Enter your last name"
            leftIcon={<User className="w-4 h-4" />}
            required
          />
        </div>

        {/* Contact Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormInput
            name="email"
            label="Email Address"
            type="email"
            placeholder="your@email.com"
            leftIcon={<Mail className="w-4 h-4" />}
            required
          />
          
          <FormInput
            name="phone"
            label="Phone Number"
            placeholder="+1 (555) 123-4567"
            leftIcon={<Phone className="w-4 h-4" />}
            required
          />
        </div>

        {/* Business Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormInput
            name="company"
            label="Company Name (Optional)"
            placeholder="Your company name"
            leftIcon={<Building className="w-4 h-4" />}
          />
          
          <FormSelect
            name="country"
            label="Country"
            placeholder="Select your country"
            options={countryOptions}
            searchable
            required
          />
        </div>

        {/* Inquiry Type */}
        <FormRadioGroup
          name="inquiryType"
          label="What can we help you with?"
          options={inquiryOptions}
          required
        />

        {/* Subject */}
        <FormInput
          name="subject"
          label="Subject"
          placeholder="Brief description of your inquiry"
          leftIcon={<MessageSquare className="w-4 h-4" />}
          required
        />

        {/* Message */}
        <FormTextArea
          name="message"
          label="Message"
          placeholder="Tell us more about your needs, requirements, or questions..."
          rows={6}
          required
        />

        {/* Newsletter Subscription */}
        <FormCheckbox
          name="newsletter"
          label="Subscribe to our newsletter for exclusive deals and updates"
        />

        {/* Submit Button */}
        <div className="pt-4">
          <FormSubmitButton
            variant="primary"
            size="lg"
            fullWidth
            leftIcon={<Send className="w-5 h-5" />}
            className="bg-red-600 hover:bg-red-700"
            loading={isSubmitting}
          >
            Send Message
          </FormSubmitButton>
        </div>
      </FormProvider>
    </Card>
  );
};

export default ContactForm;