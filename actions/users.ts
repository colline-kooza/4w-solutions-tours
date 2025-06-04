"use server";

import { revalidatePath } from "next/cache";
import { db } from "@/prisma/db";

import bcrypt from "bcryptjs";
import { BriefUser, UserCreateProps, UserUpdateProps } from "@/types/users";

// Create a new User
export async function createUser(data: UserCreateProps) {
  try {
    const hashedPassword = data.password
      ? await bcrypt.hash(data.password, 12)
      : undefined;

    const user = await db.user.create({
      data: {
        name: data.name,
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        phone: data.phone,
        password: hashedPassword,
        role: data.role || "USER",
        status: data.status ?? true,
        isVerified: data.isVerified ?? false,
      },
    });

    revalidatePath("/dashboard/users");
    return user;
  } catch (error) {
    console.error(error);
    return null;
  }
}

// Get all Users for Dashboard
export async function getDashboardUsers(): Promise<BriefUser[]> {
  try {
    const users = await db.user.findMany({
      select: {
        id: true,
        name: true,
        firstName: true,
        lastName: true,
        email: true,
        phone: true,
        image: true,
        role: true,
        status: true,
        isVerified: true,
        emailVerified: true,
        createdAt: true,
        updatedAt: true,
      },
      orderBy: { createdAt: "desc" },
    });
    return users;
  } catch (error) {
    console.error(error);
    return [];
  }
}

// Get a single User by ID
export async function getUserById(id: string) {
  try {
    const user = await db.user.findUnique({
      where: { id },
      include: {
        blogs: {
          select: {
            id: true,
            title: true,
            published: true,
            createdAt: true,
          },
        },
        bookings: {
          select: {
            id: true,
            tourDate: true,
            status: true,
            totalAmount: true,
            tour: {
              select: {
                title: true,
              },
            },
          },
        },
        reviews: {
          select: {
            id: true,
            rating: true,
            title: true,
            createdAt: true,
            tour: {
              select: {
                title: true,
              },
            },
          },
        },
      },
    });
    return user;
  } catch (error) {
    console.error(error);
    return null;
  }
}

// Update a User
export async function updateUserById(id: string, data: UserUpdateProps) {
  try {
    const updateData: any = { ...data };

    // Hash password if provided
    if (data.password) {
      updateData.password = await bcrypt.hash(data.password, 12);
    }

    const user = await db.user.update({
      where: { id },
      data: updateData,
    });

    revalidatePath("/dashboard/users");
    revalidatePath(`/users/${id}`);
    return user;
  } catch (error) {
    console.error(error);
    return null;
  }
}

// Delete a User
export async function deleteUserById(id: string) {
  try {
    const user = await db.user.delete({
      where: { id },
    });

    revalidatePath("/dashboard/users");
    return user;
  } catch (error) {
    console.error(error);
    return null;
  }
}
