import { z } from 'zod';

// Common validation patterns
const patterns = {
  email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
  password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
  phone: /^\+?[0-9\s\-()]{10,20}$/,
  zipCode: /^[0-9]{5}(-[0-9]{4})?$/,
  creditCard: /^[0-9]{13,19}$/,
  cvv: /^[0-9]{3,4}$/,
  expiryDate: /^(0[1-9]|1[0-2])\/([0-9]{2})$/,
};

// Error messages
const errorMessages = {
  required: 'This field is required',
  email: 'Please enter a valid email address',
  password: 'Password must be at least 8 characters and include uppercase, lowercase, number and special character',
  passwordMatch: 'Passwords do not match',
  phone: 'Please enter a valid phone number',
  zipCode: 'Please enter a valid zip code',
  creditCard: 'Please enter a valid credit card number',
  cvv: 'Please enter a valid CVV code',
  expiryDate: 'Please enter a valid expiry date (MM/YY)',
  minLength: (field: string, length: number) => `${field} must be at least ${length} characters`,
  maxLength: (field: string, length: number) => `${field} must be at most ${length} characters`,
};

// Base schemas
export const baseSchemas = {
  name: z.string().min(2, { message: errorMessages.minLength('Name', 2) }).max(50, { message: errorMessages.maxLength('Name', 50) }),
  email: z.string().email({ message: errorMessages.email }),
  password: z.string().regex(patterns.password, { message: errorMessages.password }),
  phone: z.string().regex(patterns.phone, { message: errorMessages.phone }),
  phoneOptional: z.string().regex(patterns.phone, { message: errorMessages.phone }).optional(),
  address: z.string().min(5, { message: errorMessages.minLength('Address', 5) }).max(100, { message: errorMessages.maxLength('Address', 100) }),
  city: z.string().min(2, { message: errorMessages.minLength('City', 2) }).max(50, { message: errorMessages.maxLength('City', 50) }),
  zipCode: z.string().regex(patterns.zipCode, { message: errorMessages.zipCode }).optional(),
  country: z.string().min(2, { message: errorMessages.minLength('Country', 2) }),
  creditCard: z.string().regex(patterns.creditCard, { message: errorMessages.creditCard }),
  cvv: z.string().regex(patterns.cvv, { message: errorMessages.cvv }),
  expiryDate: z.string().regex(patterns.expiryDate, { message: errorMessages.expiryDate }),
};

// Login schema
export const loginSchema = z.object({
  email: baseSchemas.email.min(1, { message: errorMessages.required }),
  password: z.string().min(1, { message: errorMessages.required }),
  rememberMe: z.boolean().optional(),
});

// Registration schema
export const registrationSchema = z.object({
  firstName: baseSchemas.name.min(1, { message: errorMessages.required }),
  lastName: baseSchemas.name.min(1, { message: errorMessages.required }),
  email: baseSchemas.email.min(1, { message: errorMessages.required }),
  password: baseSchemas.password.min(1, { message: errorMessages.required }),
  confirmPassword: z.string().min(1, { message: errorMessages.required }),
  agreeTerms: z.boolean().refine(val => val === true, { message: 'You must agree to the terms and conditions' }),
}).refine(data => data.password === data.confirmPassword, {
  message: errorMessages.passwordMatch,
  path: ['confirmPassword'],
});

// Password reset schema
export const forgotPasswordSchema = z.object({
  email: baseSchemas.email.min(1, { message: errorMessages.required }),
});

// Reset password schema
export const resetPasswordSchema = z.object({
  password: baseSchemas.password.min(1, { message: errorMessages.required }),
  confirmPassword: z.string().min(1, { message: errorMessages.required }),
}).refine(data => data.password === data.confirmPassword, {
  message: errorMessages.passwordMatch,
  path: ['confirmPassword'],
});

// Contact form schema
export const contactFormSchema = z.object({
  firstName: baseSchemas.name.min(1, { message: errorMessages.required }),
  lastName: baseSchemas.name.min(1, { message: errorMessages.required }),
  email: baseSchemas.email.min(1, { message: errorMessages.required }),
  phone: baseSchemas.phoneOptional,
  company: z.string().optional(),
  country: baseSchemas.country.min(1, { message: errorMessages.required }),
  subject: z.string().min(5, { message: errorMessages.minLength('Subject', 5) }).max(100, { message: errorMessages.maxLength('Subject', 100) }),
  message: z.string().min(10, { message: errorMessages.minLength('Message', 10) }).max(1000, { message: errorMessages.maxLength('Message', 1000) }),
  inquiryType: z.string().min(1, { message: 'Please select an inquiry type' }),
  newsletter: z.boolean().optional(),
});

// Shipping address schema
export const shippingAddressSchema = z.object({
  firstName: baseSchemas.name.min(1, { message: errorMessages.required }),
  lastName: baseSchemas.name.min(1, { message: errorMessages.required }),
  address: baseSchemas.address.min(1, { message: errorMessages.required }),
  city: baseSchemas.city.min(1, { message: errorMessages.required }),
  zipCode: baseSchemas.zipCode,
  country: baseSchemas.country.min(1, { message: errorMessages.required }),
  phone: baseSchemas.phone.min(1, { message: errorMessages.required }),
  isDefault: z.boolean().optional(),
});

// Payment information schema
export const paymentInfoSchema = z.object({
  cardNumber: baseSchemas.creditCard.min(1, { message: errorMessages.required }),
  cardholderName: z.string().min(3, { message: errorMessages.minLength('Cardholder name', 3) }).min(1, { message: errorMessages.required }),
  expiryDate: baseSchemas.expiryDate.min(1, { message: errorMessages.required }),
  cvv: baseSchemas.cvv.min(1, { message: errorMessages.required }),
  saveCard: z.boolean().optional(),
});

// Order schema
export const orderSchema = z.object({
  shippingAddress: shippingAddressSchema,
  billingAddress: z.object({
    sameAsShipping: z.boolean(),
    address: shippingAddressSchema.optional(),
  }),
  paymentMethod: z.string().min(1, { message: 'Please select a payment method' }),
  paymentDetails: z.union([
    paymentInfoSchema,
    z.object({}).optional(),
  ]).optional(),
  notes: z.string().optional(),
  agreeTerms: z.boolean().refine(val => val === true, { message: 'You must agree to the terms and conditions' }),
});

// Profile update schema
export const profileUpdateSchema = z.object({
  firstName: baseSchemas.name.optional(),
  lastName: baseSchemas.name.optional(),
  email: baseSchemas.email.optional(),
  phone: baseSchemas.phoneOptional,
  company: z.string().optional(),
});

// Password change schema
export const passwordChangeSchema = z.object({
  currentPassword: z.string().min(1, { message: errorMessages.required }),
  newPassword: baseSchemas.password.min(1, { message: errorMessages.required }),
  confirmPassword: z.string().min(1, { message: errorMessages.required }),
}).refine(data => data.newPassword === data.confirmPassword, {
  message: errorMessages.passwordMatch,
  path: ['confirmPassword'],
});

// Product review schema
export const productReviewSchema = z.object({
  rating: z.number().min(1, { message: 'Please select a rating' }).max(5),
  title: z.string().min(3, { message: errorMessages.minLength('Title', 3) }).max(100, { message: errorMessages.maxLength('Title', 100) }),
  review: z.string().min(10, { message: errorMessages.minLength('Review', 10) }).max(1000, { message: errorMessages.maxLength('Review', 1000) }),
  recommend: z.boolean().optional(),
  images: z.array(z.any()).optional(),
});

// Export all validation schemas
export const validationSchemas = {
  login: loginSchema,
  registration: registrationSchema,
  forgotPassword: forgotPasswordSchema,
  resetPassword: resetPasswordSchema,
  contact: contactFormSchema,
  shippingAddress: shippingAddressSchema,
  paymentInfo: paymentInfoSchema,
  order: orderSchema,
  profileUpdate: profileUpdateSchema,
  passwordChange: passwordChangeSchema,
  productReview: productReviewSchema,
};

export default validationSchemas;