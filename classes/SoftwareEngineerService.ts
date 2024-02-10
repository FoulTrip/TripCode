// Import necessary modules and dependencies
import { prisma } from "@/prisma/db";
import { ScalarSoftwareEngineer } from "@/types/Schema";
import { SoftwareEngineer } from "@prisma/client";
import bcrypt from "bcryptjs";

// Service class for managing Software Engineers
class SoftwareEngineerService {
  /**
   * Create a new Software Engineer.
   * @param data - The data for creating a new Software Engineer.
   * @returns Promise<SoftwareEngineer>
   */
  static async create(data: ScalarSoftwareEngineer): Promise<SoftwareEngineer> {
    // Check if the email is already in use
    const existEmail = await prisma.softwareEngineer.findUnique({
      where: { email: data.email },
    });

    // If the email is already in use, throw an error
    if (existEmail) {
      throw new Error("El correo electrónico ya está en uso");
    }

    // Hash the password before storing it
    const hashedPassword = await bcrypt.hash(data.password, 10);

    // Create a new Software Engineer and return the result
    return prisma.softwareEngineer.create({
      data: {
        ...data,
        password: hashedPassword,
      },
    });
  }

  /**
   * Get a Software Engineer by ID.
   * @param id - The ID of the Software Engineer.
   * @returns Promise<SoftwareEngineer | null>
   */
  static async get(id: string): Promise<SoftwareEngineer | null> {
    return prisma.softwareEngineer.findUnique({ where: { id } });
  }

  /**
   * Update a Software Engineer's information.
   * @param id - The ID of the Software Engineer to be updated.
   * @param data - The partial data for updating the Software Engineer.
   * @returns Promise<SoftwareEngineer>
   */
  static async update(
    id: string,
    data: Partial<ScalarSoftwareEngineer>
  ): Promise<SoftwareEngineer> {
    return prisma.softwareEngineer.update({ where: { id }, data });
  }

  /**
   * Update the password of a Software Engineer.
   * @param id - The ID of the Software Engineer to update the password.
   * @param password - The new password.
   * @returns Promise<SoftwareEngineer>
   */
  static async updatePassword(
    id: string,
    password: string
  ): Promise<SoftwareEngineer> {
    // Hash the new password before updating
    const hashedPassword = await bcrypt.hash(password, 10);

    // Update the password and return the result
    return prisma.softwareEngineer.update({
      where: { id },
      data: { password: hashedPassword },
    });
  }

  /**
   * Delete a Software Engineer by ID.
   * @param id - The ID of the Software Engineer to be deleted.
   * @returns Promise<SoftwareEngineer>
   */
  static async delete(id: string): Promise<SoftwareEngineer> {
    return prisma.softwareEngineer.delete({ where: { id } });
  }

  /**
   * Sign in a Software Engineer with the provided credentials.
   * @param email - The email of the Software Engineer.
   * @param password - The password of the Software Engineer.
   * @returns Promise<SoftwareEngineer>
   */
  static async signin(
    email: string,
    password: string
  ): Promise<SoftwareEngineer> {
    // Find the user by email
    const user = await prisma.softwareEngineer.findUnique({ where: { email } });

    // If user not found or password is incorrect, throw an error
    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new Error("Credenciales inválidas");
    }

    // Return the authenticated user
    return user;
  }
}

export default SoftwareEngineerService;
