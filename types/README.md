# Type Definitions for JBBC Admin App

This directory contains all TypeScript interfaces and types used throughout the application. These types ensure type safety, enable autocomplete, and make your code self-documenting.

## 📁 File Structure

```
types/
├── index.ts          # Central export file - import from here
├── enums.ts          # Enums (RegistrationStatus, JpPrefecture, etc.)
├── models.ts         # Database model interfaces (matches Prisma schema)
├── api.ts            # API request/response interfaces
├── forms.ts          # Form data interfaces
├── common.ts         # Shared utility types
└── README.md         # This file
```

## 🎯 How to Use

### Import types from the central index:

```typescript
import type { AdminUser, CreateNewsletterRequest, LoginFormData } from '@/types';
```

### In API Routes:

```typescript
// app/api/admin/users/route.ts
import type { GetAdminUsersResponse, ApiError } from '@/types';

export async function GET(): Promise<NextResponse<GetAdminUsersResponse | ApiError>> {
  // Your code here
  return NextResponse.json({ users: [...] });
}
```

### In React Components:

```typescript
// app/admin/users/page.tsx
import type { AdminUserSafe, CreateAdminUserFormData } from '@/types';

export default function UsersPage() {
  const [users, setUsers] = useState<AdminUserSafe[]>([]);
  const [form] = Form.useForm<CreateAdminUserFormData>();

  // Your code here
}
```

### In Form Handlers:

```typescript
import type { LoginFormData } from '@/types';

const handleSubmit = async (values: LoginFormData) => {
  // values.email and values.password are typed!
  await signIn('credentials', values);
};
```

## 📚 Type Categories

### 1. Enums (`enums.ts`)

**Purpose:** Define allowed values for specific fields

- `RegistrationStatus` - Seminar registration states (SUBMITTED, CONFIRMED, CANCELLED)
- `JpPrefecture` - Japanese prefectures
- `NotificationType` - Types of notifications (newsletter, seminar, announcement)

**Example:**
```typescript
import { RegistrationStatus } from '@/types';

const status: RegistrationStatus = RegistrationStatus.CONFIRMED;
```

### 2. Database Models (`models.ts`)

**Purpose:** Match your Prisma schema exactly - use when working with database data

Key interfaces:
- `AdminUser` - Admin with passwordHash
- `AdminUserSafe` - Admin without passwordHash (for API responses)
- `Subscription` - Email subscription
- `Newsletter` - Newsletter content
- `BlogPost` - Blog post
- `Seminar` - Seminar/event
- `SeminarRegistration` - User registration for seminar
- `Announcement` - Announcement/news
- `Notification` - Sent notification
- `Like` - Blog post like

**Example:**
```typescript
import type { BlogPost, Seminar } from '@/types';

const post: BlogPost = await prisma.blogPost.findUnique({ ... });
const seminar: Seminar = await prisma.seminar.findUnique({ ... });
```

### 3. API Types (`api.ts`)

**Purpose:** Define request/response shapes for API endpoints

Key interfaces:
- Request types: `CreateAdminUserRequest`, `UpdateSeminarRequest`, etc.
- Response types: `GetNewslettersResponse`, `BlogPostResponse`, etc.
- `ApiError` - Standard error response
- `ApiSuccess<T>` - Generic success response
- `PaginatedResponse<T>` - Paginated data wrapper

**Example:**
```typescript
import type { CreateNewsletterRequest, NewsletterResponse, ApiError } from '@/types';

// In API route
export async function POST(req: Request): Promise<NextResponse<NewsletterResponse | ApiError>> {
  const body: CreateNewsletterRequest = await req.json();
  // body.title, body.body, body.slug are typed!
}

// In component
const createNewsletter = async (data: CreateNewsletterRequest) => {
  const res = await fetch('/api/newsletters', {
    method: 'POST',
    body: JSON.stringify(data)
  });
  const result: NewsletterResponse = await res.json();
};
```

### 4. Form Types (`forms.ts`)

**Purpose:** Define form input shapes - use with React forms

Key interfaces:
- `LoginFormData` - Login form
- `CreateAdminUserFormData` - Create admin form
- `NewsletterFormData` - Newsletter creation/edit
- `SeminarFormData` - Seminar creation/edit
- `BlogPostFormData` - Blog post creation/edit
- Filter forms: `SeminarFilterFormData`, `BlogFilterFormData`, etc.

**Example:**
```typescript
import type { SeminarFormData } from '@/types';

const [form] = Form.useForm<SeminarFormData>();

const handleSubmit = (values: SeminarFormData) => {
  // values.title, values.description, values.startsAt are all typed!
  console.log(values.title); // TypeScript knows this is a string
};
```

### 5. Common Types (`common.ts`)

**Purpose:** Shared utility types used across the app

Key interfaces:
- `SessionUser`, `Session` - NextAuth session types
- `PaginationParams` - Pagination config
- `SelectOption<T>` - Dropdown options
- `ModalState` - Modal visibility state
- `LoadingState` - Async operation state
- `ToastMessage` - Notification messages
- `ValidationError`, `ValidationResult` - Form validation
- `StatCardData` - Dashboard statistics card
- Many more utilities!

**Example:**
```typescript
import type { LoadingState, SelectOption, ModalState } from '@/types';

const [loading, setLoading] = useState<LoadingState>({
  isLoading: false,
  error: null,
  progress: 0
});

const prefectureOptions: SelectOption<string>[] = [
  { label: 'Tokyo', value: 'TOKYO' },
  { label: 'Osaka', value: 'OSAKA' }
];

const [modal, setModal] = useState<ModalState>({
  visible: false,
  mode: 'create',
  data: null
});
```

## 🔥 Best Practices

### 1. Always Use Types for External Data

```typescript
// ✅ GOOD - Response is typed
const res = await fetch('/api/users');
const data: GetAdminUsersResponse = await res.json();
console.log(data.users[0].email); // TypeScript knows this exists!

// ❌ BAD - No type safety
const res = await fetch('/api/users');
const data = await res.json();
console.log(data.users[0].email); // Could error at runtime!
```

### 2. Use Safe Types for Public Data

```typescript
// ✅ GOOD - Never expose passwordHash to frontend
const user: AdminUserSafe = {
  id: '123',
  email: 'admin@example.com',
  name: 'Admin',
  createdAt: new Date()
};

// ❌ BAD - Includes passwordHash
const user: AdminUser = await prisma.adminUser.findUnique({ ... });
return NextResponse.json({ user }); // Leaks password hash!
```

### 3. Type Form Handlers

```typescript
// ✅ GOOD
const handleSubmit = (values: CreateBlogPostFormData) => {
  // Full autocomplete and type checking
  console.log(values.title, values.content);
};

// ❌ BAD
const handleSubmit = (values: any) => {
  // No autocomplete, easy to make typos
  console.log(values.titel); // Typo won't be caught!
};
```

### 4. Use Enums for Fixed Values

```typescript
// ✅ GOOD
import { RegistrationStatus } from '@/types';

const status = RegistrationStatus.CONFIRMED; // Autocomplete works!

// ❌ BAD
const status = 'CONFIRMED'; // Could typo as 'CONFIRMD'
```

### 5. Return Typed API Responses

```typescript
// ✅ GOOD - Type-safe API route
export async function GET(): Promise<NextResponse<GetSeminarsResponse | ApiError>> {
  try {
    const seminars = await prisma.seminar.findMany();
    return NextResponse.json({ seminars }); // Type checked!
  } catch (error) {
    return NextResponse.json({ error: 'Failed' }, { status: 500 });
  }
}

// ❌ BAD - No type safety
export async function GET() {
  const seminars = await prisma.seminar.findMany();
  return NextResponse.json({ data: seminars }); // Wrong shape, no error!
}
```

## 🚀 Adding New Types

When adding new features, follow this pattern:

### 1. Add Enum (if needed)

```typescript
// types/enums.ts
export enum InvoiceStatus {
  DRAFT = 'DRAFT',
  SENT = 'SENT',
  PAID = 'PAID',
  CANCELLED = 'CANCELLED',
}
```

### 2. Add Database Model

```typescript
// types/models.ts
export interface Invoice {
  id: string;
  customerId: string;
  amount: number;
  status: InvoiceStatus;
  createdAt: Date | string;
  paidAt: Date | string | null;
}
```

### 3. Add API Types

```typescript
// types/api.ts
export interface CreateInvoiceRequest {
  customerId: string;
  amount: number;
}

export interface GetInvoicesResponse {
  invoices: Invoice[];
}
```

### 4. Add Form Type

```typescript
// types/forms.ts
export interface InvoiceFormData {
  customerId: string;
  amount: number;
  dueDate: Date | string;
}
```

### 5. Use in Your Code!

```typescript
import type { Invoice, CreateInvoiceRequest, InvoiceFormData } from '@/types';

// API route
export async function POST(req: Request): Promise<NextResponse<Invoice | ApiError>> {
  const body: CreateInvoiceRequest = await req.json();
  // ...
}

// Component
const [form] = Form.useForm<InvoiceFormData>();
```

## 📖 Why This Matters

### Without Types:
```typescript
// Runtime error waiting to happen!
const user = await fetch('/api/users').then(r => r.json());
console.log(user.emial); // Typo! No error until runtime
```

### With Types:
```typescript
const res = await fetch('/api/users');
const data: GetAdminUsersResponse = await res.json();
console.log(data.users[0].emial); // ❌ TypeScript error: Property 'emial' does not exist
console.log(data.users[0].email); // ✅ Works perfectly
```

**Benefits:**
- ✅ Catch typos at compile time
- ✅ Full autocomplete in your IDE
- ✅ Self-documenting code
- ✅ Refactoring is safe
- ✅ API contracts are enforced
- ✅ No more "mystery shapes"

## 🎓 Learn More

- [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/intro.html)
- [TypeScript with React](https://react-typescript-cheatsheet.netlify.app/)
- [Prisma TypeScript](https://www.prisma.io/docs/concepts/components/prisma-client/working-with-prismaclient/use-custom-model-and-field-names)

---

**Remember:** When in doubt, add a type! Your future self will thank you. 🙏
