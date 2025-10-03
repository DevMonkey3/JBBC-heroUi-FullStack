// types/common.ts
// Common utility types and shared interfaces used across the application

import { SVGProps } from 'react';

/**
 * SVG icon props
 */
export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

/**
 * Generic ID type for MongoDB ObjectIds
 */
export type ObjectId = string;

/**
 * Pagination parameters for API requests
 */
export interface PaginationParams {
  page?: number;
  pageSize?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

/**
 * Sort configuration
 */
export interface SortConfig {
  field: string;
  order: 'asc' | 'desc';
}

/**
 * Filter configuration (generic)
 */
export interface FilterConfig {
  field: string;
  operator: 'eq' | 'ne' | 'gt' | 'gte' | 'lt' | 'lte' | 'in' | 'contains';
  value: any;
}

/**
 * Table column configuration (for Antd or other table libraries)
 */
export interface TableColumn<T = any> {
  title: string;
  dataIndex: string | string[];
  key: string;
  width?: number | string;
  fixed?: 'left' | 'right';
  sortable?: boolean;
  filterable?: boolean;
  render?: (value: any, record: T, index: number) => React.ReactNode;
}

/**
 * Menu item configuration
 */
export interface MenuItem {
  key: string;
  label: string;
  icon?: React.ReactNode;
  children?: MenuItem[];
  disabled?: boolean;
  path?: string;
}

/**
 * Breadcrumb item
 */
export interface BreadcrumbItem {
  label: string;
  path?: string;
  icon?: React.ReactNode;
}

/**
 * Upload file info
 */
export interface UploadFile {
  uid: string;
  name: string;
  status: 'uploading' | 'done' | 'error' | 'removed';
  url?: string;
  thumbUrl?: string;
  size?: number;
  type?: string;
}

/**
 * Select option (for dropdowns)
 */
export interface SelectOption<T = any> {
  label: string;
  value: T;
  disabled?: boolean;
  description?: string;
}

/**
 * Modal state
 */
export interface ModalState {
  visible: boolean;
  mode: 'create' | 'edit' | 'view';
  data?: any;
}

/**
 * Loading state for async operations
 */
export interface LoadingState {
  isLoading: boolean;
  error: string | null;
  progress?: number; // 0-100
}

/**
 * Next.js page props with params
 */
export interface PageProps<T = any> {
  params: T;
  searchParams?: { [key: string]: string | string[] | undefined };
}

/**
 * Next.js layout props
 */
export interface LayoutProps {
  children: React.ReactNode;
}

/**
 * Session user (from NextAuth)
 */
export interface SessionUser {
  id: string;
  email: string;
  name?: string | null;
}

/**
 * Session object (from NextAuth)
 */
export interface Session {
  user: SessionUser;
  expires: string;
}

/**
 * Date range
 */
export interface DateRange {
  start: Date | string;
  end: Date | string;
}

/**
 * Coordinates (for location)
 */
export interface Coordinates {
  latitude: number;
  longitude: number;
}

/**
 * Address (Japanese format)
 */
export interface Address {
  prefecture?: string;
  city?: string;
  street?: string;
  building?: string;
  postalCode?: string;
}

/**
 * Contact info
 */
export interface ContactInfo {
  email?: string;
  phone?: string;
  fax?: string;
  website?: string;
}

/**
 * Meta tags for SEO
 */
export interface MetaTags {
  title: string;
  description: string;
  keywords?: string[];
  ogImage?: string;
  ogUrl?: string;
  twitterCard?: 'summary' | 'summary_large_image';
}

/**
 * Notification/Toast message
 */
export interface ToastMessage {
  type: 'success' | 'error' | 'warning' | 'info';
  message: string;
  description?: string;
  duration?: number;
}

/**
 * Validation error
 */
export interface ValidationError {
  field: string;
  message: string;
  code?: string;
}

/**
 * Validation result
 */
export interface ValidationResult {
  valid: boolean;
  errors: ValidationError[];
}

/**
 * Action result (generic operation result)
 */
export interface ActionResult<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  errors?: ValidationError[];
}

/**
 * Chart data point
 */
export interface ChartDataPoint {
  label: string;
  value: number;
  color?: string;
}

/**
 * Time series data point
 */
export interface TimeSeriesDataPoint {
  timestamp: Date | string;
  value: number;
  label?: string;
}

/**
 * Statistics card data
 */
export interface StatCardData {
  title: string;
  value: number | string;
  icon?: React.ReactNode;
  trend?: {
    value: number;
    direction: 'up' | 'down' | 'neutral';
  };
  color?: string;
}

/**
 * Theme configuration
 */
export interface ThemeConfig {
  mode: 'light' | 'dark';
  primaryColor?: string;
  fontFamily?: string;
}

/**
 * User preferences
 */
export interface UserPreferences {
  theme: ThemeConfig;
  language: string;
  notifications: {
    email: boolean;
    push: boolean;
    sms: boolean;
  };
}

/**
 * Export options (for data export)
 */
export interface ExportOptions {
  format: 'csv' | 'excel' | 'pdf' | 'json';
  filename?: string;
  columns?: string[];
  filters?: any;
}
