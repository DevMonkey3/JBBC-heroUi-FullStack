// types/api.ts
// API request and response interfaces - defines the shape of data sent to/from the server
// Use these in your API routes and frontend API calls

import {
  AdminUserSafe,
  Newsletter,
  BlogPost,
  Seminar,
  SeminarRegistration,
  Subscription,
  Announcement
} from './models';

// ==========================================
// COMMON API TYPES
// ==========================================

/**
 * Standard API error response
 */
export interface ApiError {
  error: string;
  details?: string;
  field?: string; // Which field caused the error
}

/**
 * Standard API success response
 */
export interface ApiSuccess<T = any> {
  success: true;
  data?: T;
  message?: string;
}

/**
 * Paginated response wrapper
 */
export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

// ==========================================
// AUTH API
// ==========================================

/**
 * Login request body
 */
export interface LoginRequest {
  email: string;
  password: string;
}

/**
 * Login response
 */
export interface LoginResponse {
  user: AdminUserSafe;
  token?: string;
}

// ==========================================
// ADMIN USERS API
// ==========================================

/**
 * List all admin users response
 */
export interface GetAdminUsersResponse {
  users: AdminUserSafe[];
}

/**
 * Create admin user request
 */
export interface CreateAdminUserRequest {
  email: string;
  name: string;
  password: string;
}

/**
 * Create admin user response
 */
export interface CreateAdminUserResponse {
  user: AdminUserSafe;
}

/**
 * Update admin user request
 */
export interface UpdateAdminUserRequest {
  name?: string;
  password?: string; // Optional - only if changing password
}

/**
 * Update admin user response
 */
export interface UpdateAdminUserResponse {
  user: AdminUserSafe;
}

/**
 * Delete admin user response
 */
export interface DeleteAdminUserResponse {
  success: true;
}

/**
 * Update profile request (for current user)
 */
export interface UpdateProfileRequest {
  adminId: string;
  name: string;
  password?: string;
}

/**
 * Update profile response
 */
export interface UpdateProfileResponse {
  ok: true;
}

// ==========================================
// NEWSLETTER API
// ==========================================

/**
 * List newsletters response
 */
export interface GetNewslettersResponse {
  newsletters: Newsletter[];
}

/**
 * Create newsletter request
 */
export interface CreateNewsletterRequest {
  title: string;
  body: string;
  excerpt?: string;
  slug: string;
}

/**
 * Update newsletter request
 */
export interface UpdateNewsletterRequest {
  title?: string;
  body?: string;
  excerpt?: string;
  slug?: string;
}

/**
 * Newsletter response (single)
 */
export interface NewsletterResponse {
  newsletter: Newsletter;
}

// ==========================================
// BLOG API
// ==========================================

/**
 * List blog posts response
 */
export interface GetBlogPostsResponse {
  posts: BlogPost[];
}

/**
 * Create blog post request
 */
export interface CreateBlogPostRequest {
  title: string;
  slug: string;
  content: string;
  coverImage?: string;
  excerpt?: string;
}

/**
 * Update blog post request
 */
export interface UpdateBlogPostRequest {
  title?: string;
  slug?: string;
  content?: string;
  coverImage?: string;
  excerpt?: string;
}

/**
 * Blog post response (single)
 */
export interface BlogPostResponse {
  post: BlogPost;
}

/**
 * Like blog post request
 */
export interface LikeBlogPostRequest {
  postId: string;
  userKey: string; // Anonymous user identifier
}

// ==========================================
// SEMINAR API
// ==========================================

/**
 * List seminars response
 */
export interface GetSeminarsResponse {
  seminars: Seminar[];
}

/**
 * Create seminar request
 */
export interface CreateSeminarRequest {
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
 * Update seminar request
 */
export interface UpdateSeminarRequest extends Partial<CreateSeminarRequest> {}

/**
 * Seminar response (single)
 */
export interface SeminarResponse {
  seminar: Seminar;
}

/**
 * Seminar registration request
 */
export interface CreateSeminarRegistrationRequest {
  seminarId: string;
  name: string;
  companyName?: string;
  phone: string;
  prefecture: string;
  email: string;
  consentPI: boolean;
}

/**
 * List seminar registrations response
 */
export interface GetSeminarRegistrationsResponse {
  registrations: SeminarRegistration[];
}

// ==========================================
// SUBSCRIPTION API
// ==========================================

/**
 * Create subscription request
 */
export interface CreateSubscriptionRequest {
  email: string;
}

/**
 * Subscription response
 */
export interface SubscriptionResponse {
  subscription: Subscription;
}

/**
 * List subscriptions response
 */
export interface GetSubscriptionsResponse {
  subscriptions: Subscription[];
}

/**
 * Unsubscribe request
 */
export interface UnsubscribeRequest {
  email: string;
  token?: string; // Optional unsubscribe token
}

// ==========================================
// DASHBOARD API
// ==========================================

/**
 * Dashboard statistics response
 */
export interface DashboardStatsResponse {
  totalAdmins: number;
  totalSubscriptions: number;
  activeSubscriptions: number;
  totalNewsletters: number;
  totalBlogPosts: number;
  totalSeminars: number;
  upcomingSeminars: number;
  totalRegistrations: number;
  totalNotifications: number;
  recentRegistrations: Array<SeminarRegistration & { seminar: { title: string } }>;
  recentSubscribers: Subscription[];
}

// ==========================================
// ANNOUNCEMENT API
// ==========================================

/**
 * List announcements response
 */
export interface GetAnnouncementsResponse {
  announcements: Announcement[];
}

/**
 * Create announcement request
 */
export interface CreateAnnouncementRequest {
  title: string;
  body: string;
  excerpt?: string;
  slug: string;
}

/**
 * Update announcement request
 */
export interface UpdateAnnouncementRequest extends Partial<CreateAnnouncementRequest> {}

/**
 * Announcement response (single)
 */
export interface AnnouncementResponse {
  announcement: Announcement;
}
