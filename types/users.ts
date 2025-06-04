export interface BriefUser {
  id: string;
  name: string;
  firstName?: string | null;
  lastName?: string | null;
  email: string;
  phone?: string | null;
  image?: string | null;
  role: "USER" | "ADMIN";
  status: boolean;
  isVerified: boolean;
  emailVerified?: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface UserCreateProps {
  name: string;
  firstName?: string;
  lastName?: string;
  email: string;
  phone?: string;
  password?: string;
  role?: "USER" | "ADMIN";
  status?: boolean;
  isVerified?: boolean;
}

export interface UserUpdateProps {
  name?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  password?: string;
  role?: "USER" | "ADMIN";
  status?: boolean;
  isVerified?: boolean;
  image?: string;
}

export interface FullUser extends BriefUser {
  blogs: {
    id: string;
    title: string;
    published: boolean | null;
    createdAt: Date;
  }[];
  bookings: {
    id: string;
    tourDate: Date;
    status: string;
    totalAmount: number;
    tour: {
      title: string;
    };
  }[];
  reviews: {
    id: string;
    rating: number;
    title: string | null;
    createdAt: Date;
    tour: {
      title: string;
    };
  }[];
}
