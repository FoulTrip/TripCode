import { prisma } from "@/prisma/db";
import { ProjectRequirement as PrismaProjectRequirement } from "@prisma/client";
import { ProjectRequirement } from "@/types/Schema";

// Service class for managing Project Requirements
class ProjectRequirementService {
  /**
   * Create a new Project Requirement.
   * @param data - The data for creating a new Project Requirement.
   * @returns Promise<PrismaProjectRequirement>
   */
  static async create(
    data: ProjectRequirement
  ): Promise<PrismaProjectRequirement> {
    // Create a new Project Requirement and return the result
    return prisma.projectRequirement.create({
      data: {
        ...data,
      },
    });
  }

  /**
   * Get a Project Requirement by ID.
   * @param id - The ID of the Project Requirement.
   * @returns Promise<PrismaProjectRequirement | null>
   */
  static async get(id: string): Promise<PrismaProjectRequirement | null> {
    return prisma.projectRequirement.findUnique({ where: { id } });
  }

  /**
   * Update a Project Requirement's information.
   * @param id - The ID of the Project Requirement to be updated.
   * @param data - The partial data for updating the Project Requirement.
   * @returns Promise<PrismaProjectRequirement>
   */
  static async update(
    id: string,
    data: ProjectRequirement
  ): Promise<PrismaProjectRequirement> {
    // Update the Project Requirement and return the result
    return prisma.projectRequirement.update({ where: { id }, data });
  }

  /**
   * Delete a Project Requirement by ID.
   * @param id - The ID of the Project Requirement to be deleted.
   * @returns Promise<PrismaProjectRequirement>
   */
  static async delete(id: string): Promise<PrismaProjectRequirement> {
    return prisma.projectRequirement.delete({ where: { id } });
  }

  /**
   * Get Project Requirements for a specific project.
   * @param projectId - The ID of the project.
   * @returns Promise<PrismaProjectRequirement[]>
   */
  static async getByProject(
    projectId: string
  ): Promise<PrismaProjectRequirement[]> {
    return prisma.projectRequirement.findMany({
      where: { projectId },
    });
  }

  /**
   * Get all Project Requirements.
   * @returns Promise<PrismaProjectRequirement[]>
   */
  static async getAll(): Promise<PrismaProjectRequirement[]> {
    return prisma.projectRequirement.findMany();
  }
}

export default ProjectRequirementService;
