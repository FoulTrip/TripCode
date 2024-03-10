// Import necessary modules and dependencies
import { prisma } from "@/prisma/db";
import { DockerStatus, ScalarProject, ProjectStatus } from "@/types/Schema";
import { Project, SoftwareEngineer } from "@prisma/client";

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

  /**
   * Add SoftwareEngineer ID to the array of engineers for a Project.
   * @param projectId - The ID of the Project.
   * @param softwareEngineerId - The ID of the Software Engineer.
   * @returns Promise<Project>
   */
  static async addSoftwareEngineerToProject(
    projectId: string,
    softwareEngineerId: string
  ): Promise<Project> {
    return prisma.project.update({
      where: { id: projectId },
      data: {
        engineers: {
          set: [
            ...((await prisma.project.findUnique({ where: { id: projectId } }))
              ?.engineers || []),
            softwareEngineerId,
          ],
        },
      },
    });
  }

  /**
   * Add Product Manager to a Project.
   * @param projectId - The ID of the Project.
   * @param productManagerId - The ID of the Product Manager.
   * @returns Promise<Project>
   */
  static async addProductManagerToProject(
    projectId: string,
    productManagerId: string
  ): Promise<Project> {
    console.log(
      "Adding Product Manager to Project:",
      projectId,
      productManagerId
    );

    // Verificar que productManagerId tenga un valor antes de realizar la búsqueda
    if (!productManagerId) {
      throw new Error("Product Manager ID is undefined.");
    }

    // Buscar el Product Manager por su ID
    const existingProductManager = await prisma.projectManager.findUnique({
      where: { id: productManagerId },
    });

    // Verificar si el Product Manager existe
    if (!existingProductManager) {
      throw new Error("Product Manager not found.");
    }

    // Actualizar el Project con el ID del Product Manager
    const updatedProject = await prisma.project.update({
      where: { id: projectId },
      data: { ProjectManagerId: productManagerId },
    });

    console.log("Updated Project:", updatedProject);
    return updatedProject;
  }

  /**
   * Find all projects where a SoftwareEngineer ID is involved.
   * @param softwareEngineerId - The ID of the Software Engineer.
   * @returns Promise<Project[]>
   */
  static async getProjectsBySoftwareEngineerId(
    softwareEngineerId: string
  ): Promise<Project[]> {
    return prisma.project.findMany({
      where: {
        engineers: {
          has: softwareEngineerId,
        },
      },
    });
  }

  /**
   * Find all projects where a SoftwareEngineer ID is involved.
   * @param softwareEngineerId - The ID of the Software Engineer.
   * @returns Promise<Project[]>
   */
  static async getProjectsByClientId(clientId: string): Promise<Project[]> {
    return prisma.project.findMany({
      where: {
        clientId,
      },
    });
  }

  /**
   * Update or add Repository ID to a Project.
   * @param id - The ID of the Project to be updated.
   * @param repositoryId - The new Repository ID.
   * @returns Promise<Project>
   */
  static async updateRepositoryId(
    id: string,
    repositoryId: string
  ): Promise<Project> {
    console.log(id, repositoryId)
    return prisma.project.update({
      where: { id },
      data: { repositoryId },
    });
  }

  /**
   * Elimina el identificador del repositorio de un proyecto.
   * @param id - El ID del proyecto a ser actualizado.
   * @returns Promise<Project>
   */
  static async removeRepositoryId(id: string): Promise<Project> {
    return prisma.project.update({
      where: { id },
      data: { repositoryId: null },
    });
  }

  /**
   * Remove SoftwareEngineer ID from the array of engineers for a Project.
   * @param projectId - The ID of the Project.
   * @param softwareEngineerId - The ID of the Software Engineer to be removed.
   * @returns Promise<Project>
   */
  static async removeSoftwareEngineerFromProject(
    projectId: string,
    softwareEngineerId: string
  ): Promise<Project> {
    return prisma.project.update({
      where: { id: projectId },
      data: {
        engineers: {
          set: (
            (await prisma.project.findUnique({ where: { id: projectId } }))
              ?.engineers || []
          ).filter((engineerId) => engineerId !== softwareEngineerId),
        },
      },
    });
  }

  /**
   * Remove ProjectManager from the Project.
   * @param projectId - The ID of the Project.
   * @returns Promise<Project>
   */
  static async removeProjectManagerFromProject(
    projectId: string
  ): Promise<Project | null> {
    // Añade "| null" para permitir null
    await prisma.project.update({
      where: { id: projectId },
      data: { ProjectManagerId: null },
    });

    const project = await prisma.project.findUnique({
      where: { id: projectId },
    });

    if (!project) {
      throw new Error("No formas parte");
    }

    return project;
  }
}

export default ProjectService;
