// types/forms.ts
// Form data interfaces - defines the shape of form inputs and validation
// Use these in your React forms (Antd Form, React Hook Form, etc.)

import { JpPrefecture } from './enums';

// ==========================================
// ADMIN USER FORMS
// ==========================================

/**
 * Login form data
 */
export interface LoginFormData {
  email: string;
  password: string;
}

/**
 * Admin user creation form
 */
export interface CreateAdminUserFormData {
  email: string;
  name: string;
  password: string;
  confirmPassword?: string; // Optional for client-side validation
}

/**
 * Admin user edit form
 */
export interface EditAdminUserFormData {
  name: string;
  password?: string; // Optional - only if changing password
  confirmPassword?: string; // Optional for client-side validation
}

/**
 * Profile update form
 */
export interface ProfileFormData {
  name: string;
  password?: string;
  confirmPassword?: string;
}

// ==========================================
// NEWSLETTER FORMS
// ==========================================

/**
 * Newsletter creation/edit form
 */
export interface NewsletterFormData {
  title: string;
  body: string;
  excerpt?: string;
  slug: string;
}

// ==========================================
// BLOG FORMS
// ==========================================

/**
 * Blog post creation/edit form
 */
export interface BlogPostFormData {
  title: string;
  slug: string;
  content: string;
  coverImage?: string;
  excerpt?: string;
}

// ==========================================
// SEMINAR FORMS
// ==========================================

/**
 * Seminar creation/edit form
 */
export interface SeminarFormData {
  title: string;
  description: string;
  location: string;
  startsAt: Date | string;
  endsAt: Date | string;
  registrationUrl?: string;
  slug: string;
  excerpt?: string;
  heroImage?: string;
  thumbnail?: string;
  speakerName?: string;
  speakerTitle?: string;
  speakerOrg?: string;
}

/**
 * Seminar registration form (public-facing)
 */
export interface SeminarRegistrationFormData {
  seminarId: string;
  name: string;
  companyName?: string;
  phone: string;
  prefecture: JpPrefecture | string;
  email: string;
  consentPI: boolean;
}

/**
 * Update seminar registration status (admin)
 */
export interface UpdateRegistrationStatusFormData {
  status: 'SUBMITTED' | 'CONFIRMED' | 'CANCELLED';
  notes?: string;
}

// ==========================================
// SUBSCRIPTION FORMS
// ==========================================

/**
 * Newsletter subscription form
 */
export interface SubscriptionFormData {
  email: string;
}

/**
 * Unsubscribe form
 */
export interface UnsubscribeFormData {
  email: string;
  reason?: string; // Optional feedback
}

// ==========================================
// ANNOUNCEMENT FORMS
// ==========================================

/**
 * Announcement creation/edit form
 */
export interface AnnouncementFormData {
  title: string;
  body: string;
  excerpt?: string;
  slug: string;
}

// ==========================================
// CONTACT/INQUIRY FORMS
// ==========================================

/**
 * Contact/inquiry form (if you have one)
 */
export interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  message: string;
  subject?: string;
}

// ==========================================
// SEARCH/FILTER FORMS
// ==========================================

/**
 * Seminar search/filter form
 */
export interface SeminarFilterFormData {
  keyword?: string;
  startDate?: Date | string;
  endDate?: Date | string;
  location?: string;
}

/**
 * Blog search/filter form
 */
export interface BlogFilterFormData {
  keyword?: string;
  startDate?: Date | string;
  endDate?: Date | string;
}

/**
 * Newsletter search/filter form
 */
export interface NewsletterFilterFormData {
  keyword?: string;
  startDate?: Date | string;
  endDate?: Date | string;
}

/**
 * Subscription filter form
 */
export interface SubscriptionFilterFormData {
  keyword?: string; // Search by email
  verified?: boolean;
  unsubscribed?: boolean;
}

/**
 * Registration filter form
 */
export interface RegistrationFilterFormData {
  seminarId?: string;
  status?: 'SUBMITTED' | 'CONFIRMED' | 'CANCELLED';
  keyword?: string; // Search by name/email
  prefecture?: JpPrefecture;
}
