// types/models.ts
// Database model interfaces - these match your Prisma schema exactly
// Use these when working with data from the database

import { RegistrationStatus, JpPrefecture, NotificationType } from './enums';

/**
 * Admin user who can access the admin panel
 */
export interface AdminUser {
  id: string;
  email: string;
  name: string | null;
  passwordHash: string;
  createdAt: Date | string;
  updatedAt: Date | string;
}

/**
 * Admin user without sensitive password hash (for API responses)
 */
export interface AdminUserSafe {
  id: string;
  email: string;
  name: string | null;
  createdAt: Date | string;
  updatedAt: Date | string;
}

/**
 * Email subscription for newsletters
 */
export interface Subscription {
  id: string;
  email: string;
  verifiedAt: Date | string | null;
  unsubscribedAt: Date | string | null;
  createdAt: Date | string;
  notifications?: Notification[];
}

/**
 * Notification sent to a subscriber
 */
export interface Notification {
  id: string;
  type: string | NotificationType;
  refId: string; // ID of Newsletter/Seminar/Announcement
  email: string;
  sentAt: Date | string;
  subscriptionId: string | null;
  subscription?: Subscription;
}

/**
 * Announcement/News article
 */
export interface Announcement {
  id: string;
  title: string;
  body: string;
  excerpt: string | null;
  slug: string;
  publishedAt: Date | string;
}

/**
 * Newsletter content
 */
export interface Newsletter {
  id: string;
  title: string;
  body: string;
  excerpt: string | null;
  slug: string;
  publishedAt: Date | string;
}

/**
 * Seminar/Event information
 */
export interface Seminar {
  id: string;
  title: string;
  description: string;
  location: string;
  startsAt: Date | string;
  endsAt: Date | string;
  registrationUrl: string | null;
  publishedAt: Date | string;
  slug: string;
  excerpt: string | null;
  heroImage: string | null;
  thumbnail: string | null;
  speakerName: string | null;
  speakerTitle: string | null;
  speakerOrg: string | null;
  registrations?: SeminarRegistration[];
}

/**
 * User registration for a seminar
 */
export interface SeminarRegistration {
  id: string;
  seminarId: string;
  seminar?: Seminar;
  name: string;
  companyName: string | null;
  phone: string;
  prefecture: JpPrefecture;
  email: string;
  consentPI: boolean;
  status: RegistrationStatus;
  createdAt: Date | string;
  ip: string | null;
  userAgent: string | null;
  notes: string | null;
}

/**
 * Blog post
 */
export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  content: string;
  coverImage: string | null;
  excerpt: string | null;
  publishedAt: Date | string;
  likeCount: number;
  likes?: Like[];
}

/**
 * Like on a blog post
 */
export interface Like {
  id: string;
  postId: string;
  post?: BlogPost;
  userKey: string; // Anonymous user identifier (IP hash, cookie, etc.)
  createdAt: Date | string;
}
