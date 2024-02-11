// Import necessary modules and dependencies
import { prisma } from "@/prisma/db";
import { Commit } from "@prisma/client";
import { ScalarCommit } from "@/types/Schema";

// Service class for managing Commits
class CommitService {
  /**
   * Create a new Commit.
   * @param data - The data for creating a new Commit.
   * @returns Promise<PrismaCommit>
   */
  static async create(data: ScalarCommit): Promise<Commit> {
    // Create a new Commit and return the result
    return prisma.commit.create({
      data: {
        ...data,
      },
    });
  }

  /**
   * Get a Commit by ID.
   * @param id - The ID of the Commit.
   * @returns Promise<PrismaCommit | null>
   */
  static async get(id: string): Promise<Commit | null> {
    return prisma.commit.findUnique({ where: { id } });
  }

  /**
   * Update a Commit's information.
   * @param id - The ID of the Commit to be updated.
   * @param data - The partial data for updating the Commit.
   * @returns Promise<PrismaCommit>
   */
  static async update(id: string, data: ScalarCommit): Promise<Commit> {
    // Update the Commit and return the result
    return prisma.commit.update({ where: { id }, data });
  }

  /**
   * Delete a Commit by ID.
   * @param id - The ID of the Commit to be deleted.
   * @returns Promise<PrismaCommit>
   */
  static async delete(id: string): Promise<Commit> {
    return prisma.commit.delete({ where: { id } });
  }

  /**
   * Get all Commits.
   * @returns Promise<PrismaCommit[]>
   */
  static async getAll(): Promise<Commit[]> {
    // Puedes agregar lógica adicional aquí si es necesario
    return prisma.commit.findMany();
  }
}

// Export the CommitService class
export default CommitService;
