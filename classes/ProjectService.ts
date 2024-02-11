// Import necessary modules and dependencies
import { prisma } from "@/prisma/db";
import { DockerStatus, ScalarProject, ProjectStatus } from "@/types/Schema";
import { Project } from "@prisma/client";

// Service class for managing Projects
class ProjectService {
  /**
   * Create a new Project.
   * @param data - The data for creating a new Project.
   * @returns Promise<PrismaProject>
   */
  static async create(data: ScalarProject): Promise<Project> {
    // Create a new Project and return the result
    return prisma.project.create({
      data: {
        ...data,
      },
    });
  }

  /**
   * Get a Project by ID.
   * @param id - The ID of the Project.
   * @returns Promise<PrismaProject | null>
   */
  static async get(id: string): Promise<ScalarProject | null> {
    return prisma.project.findUnique({ where: { id } });
  }

  /**
   * Update a Project's information.
   * @param id - The ID of the Project to be updated.
   * @param data - The partial data for updating the Project.
   * @returns Promise<PrismaProject>
   */
  static async update(id: string, data: ScalarProject): Promise<Project> {
    // Update the Project and return the result
    return prisma.project.update({ where: { id }, data });
  }

  /**
   * Delete a Project by ID.
   * @param id - The ID of the Project to be deleted.
   * @returns Promise<PrismaProject>
   */
  static async delete(id: string): Promise<Project> {
    return prisma.project.delete({ where: { id } });
  }

  /**
   * Get all Projects.
   * @returns Promise<PrismaProject[]>
   */
  static async getAll(): Promise<Project[]> {
    // Puedes agregar lógica adicional aquí si es necesario
    return prisma.project.findMany();
  }

  /**
   * Update the Dockerized status of a Project.
   * @param id - The ID of the Project to be updated.
   * @param dockerized - The new Dockerized status.
   * @returns Promise<PrismaProject>
   */
  static async updateDockerized(
    id: string,
    dockerized: DockerStatus
  ): Promise<Project> {
    return prisma.project.update({
      where: { id },
      data: { dockerized },
    });
  }

  /**
   * Update the status of a Project.
   * @param id - The ID of the Project to be updated.
   * @param status - The new status.
   * @returns Promise<PrismaProject>
   */
  static async updateStatus(
    id: string,
    status: ProjectStatus
  ): Promise<Project> {
    return prisma.project.update({
      where: { id },
      data: { status },
    });
  }
}

// Export the ProjectService class
export default ProjectService;
