// ===== User & Auth Types =====
export type UserRole = 'stagiaire' | 'formateur' | 'admin';

export interface User {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    role: UserRole;
    avatar?: string;
    formationType?: string;
    formationLevel?: string;
    pole?: string;
    speciality?: string;
    year?: number;
    createdAt: string;
    updatedAt: string;
}

export interface AuthState {
    user: User | null;
    token: string | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    error: string | null;
}

export interface LoginCredentials {
    email: string;
    password: string;
}

export interface RegisterData {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    role: UserRole;
    formationType?: string;
    formationLevel?: string;
    pole?: string;
    speciality?: string;
    year?: number;
}

// ===== Course Types =====
export interface Course {
    id: string;
    title: string;
    description: string;
    content: string;
    speciality: string;
    year: number;
    thumbnail?: string;
    formateur: User;
    formateurId: string;
    averageRating: number;
    totalRatings: number;
    resources: Resource[];
    createdAt: string;
    updatedAt: string;
}

export interface CourseFormData {
    title: string;
    description: string;
    content: string;
    speciality: string;
    year: number;
    thumbnail?: File;
}

// ===== Resource Types =====
export type ResourceType = 'pdf' | 'video' | 'document' | 'other';

export interface Resource {
    id: string;
    title: string;
    description: string;
    type: ResourceType;
    fileUrl: string;
    fileName: string;
    fileSize: number;
    speciality: string;
    year: number;
    courseId?: string;
    uploadedBy: User;
    isValidated: boolean;
    createdAt: string;
    updatedAt: string;
}

// ===== Rating Types =====
export interface Rating {
    id: string;
    value: number;
    comment?: string;
    userId: string;
    courseId: string;
    user: User;
    createdAt: string;
}

// ===== Forum Types =====
export interface Question {
    id: string;
    title: string;
    body: string;
    tags: string[];
    author: User;
    authorId: string;
    answers: Answer[];
    answersCount: number;
    votes: number;
    createdAt: string;
    updatedAt: string;
}

export interface Answer {
    id: string;
    body: string;
    author: User;
    authorId: string;
    questionId: string;
    votes: number;
    isAccepted: boolean;
    createdAt: string;
    updatedAt: string;
}

// ===== API Response Types =====
export interface ApiResponse<T> {
    data: T;
    message: string;
    success: boolean;
}

export interface PaginatedResponse<T> {
    data: T[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
}

// ===== Admin Types =====
export interface DashboardStats {
    totalUsers: number;
    totalCourses: number;
    totalResources: number;
    totalQuestions: number;
    pendingResources: number;
    usersByRole: { role: UserRole; count: number }[];
    recentActivity: ActivityItem[];
}

export interface ActivityItem {
    id: string;
    type: 'course_created' | 'resource_uploaded' | 'user_registered' | 'question_asked';
    description: string;
    user: User;
    createdAt: string;
}
