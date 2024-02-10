// Import necessary modules and dependencies
import { prisma } from "@/prisma/db";
import { ScalarProjectManager } from "@/types/Schema";
import { ProjectManager } from "@prisma/client";
import bcrypt from "bcryptjs";

// Service class for managing Project Managers
class ProjectManagerServices {
  /**
   * Create a new Project Manager.
   * @param data - The data for creating a new Project Manager.
   * @returns Promise<ProjectManager>
   */
  static async create(data: ScalarProjectManager): Promise<ProjectManager> {
    // Check if the email is already in use
    const existEmail = await prisma.projectManager.findUnique({
      where: { email: data.email },
    });

    // If the email is already in use, throw an error
    if (existEmail) {
      throw new Error("El correo electrónico ya está en uso");
    }

    // Hash the password before storing it
    const hashedPassword = await bcrypt.hash(data.password, 10);

    // Create a new Project Manager and return the result
    return prisma.projectManager.create({
      data: {
        ...data,
        password: hashedPassword,
      },
    });
  }

  /**
   * Get a Project Manager by ID.
   * @param id - The ID of the Project Manager.
   * @returns Promise<ProjectManager | null>
   */
  static async get(id: string): Promise<ProjectManager | null> {
    return prisma.projectManager.findUnique({ where: { id } });
  }

  /**
   * Update a Project Manager's information.
   * @param id - The ID of the Project Manager to be updated.
   * @param data - The partial data for updating the Project Manager.
   * @returns Promise<ProjectManager>
   */
  static async update(
    id: string,
    data: Partial<ScalarProjectManager>
  ): Promise<ProjectManager> {
    return prisma.projectManager.update({ where: { id }, data });
  }

  /**
   * Update the password of a Project Manager.
   * @param id - The ID of the Project Manager to update the password.
   * @param password - The new password.
   * @returns Promise<ProjectManager>
   */
  static async updatePassword(
    id: string,
    password: string
  ): Promise<ProjectManager> {
    // Hash the new password before updating
    const hashedPassword = await bcrypt.hash(password, 10);

    // Update the password and return the result
    return prisma.projectManager.update({
      where: { id },
      data: { password: hashedPassword },
    });
  }

  /**
   * Delete a Project Manager by ID.
   * @param id - The ID of the Project Manager to be deleted.
   * @returns Promise<ProjectManager>
   */
  static async delete(id: string): Promise<ProjectManager> {
    return prisma.projectManager.delete({ where: { id } });
  }

  /**
   * Sign in a Project Manager with the provided credentials.
   * @param email - The email of the Project Manager.
   * @param password - The password of the Project Manager.
   * @returns Promise<ProjectManager>
   */
  static async signin(
    email: string,
    password: string
  ): Promise<ProjectManager> {
    // Find the user by email
    const user = await prisma.projectManager.findUnique({ where: { email } });

    // If user not found or password is incorrect, throw an error
    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new Error("Credenciales inválidas");
    }

    // Return the authenticated user
    return user;
  }
}

// Export the ClientService class
export default ProjectManagerServices;
