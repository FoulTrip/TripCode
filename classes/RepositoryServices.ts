// Importa los módulos y dependencias necesarios
import { prisma } from "@/prisma/db";
import { RepositoryDetail } from "@prisma/client";

// Clase de servicio para gestionar RepositoryDetail
class RepositoryDetailService {
  /**
   * Crea un nuevo RepositoryDetail.
   * @param data - Los datos para crear un nuevo RepositoryDetail.
   * @returns Promise<RepositoryDetail>
   */
  static async create(data: RepositoryDetail): Promise<RepositoryDetail> {
    // Crea un nuevo RepositoryDetail y devuelve el resultado
    return prisma.repositoryDetail.create({
      data: {
        ...data,
      },
    });
  }

  /**
   * Obtiene un RepositoryDetail por ID.
   * @param id - El ID de RepositoryDetail.
   * @returns Promise<RepositoryDetail | null>
   */
  static async get(id: string): Promise<RepositoryDetail | null> {
    return prisma.repositoryDetail.findUnique({ where: { id } });
  }

  /**
   * Encuentra todos los RepositoryDetail asociados a un Project por su ID.
   * @param projectId - El ID del Project.
   * @returns Promise<RepositoryDetail[]>
   */
  static async getByProjectId(projectId: string): Promise<RepositoryDetail[]> {
    return prisma.repositoryDetail.findMany({
      where: { projectId },
    });
  }

  /**
   * Actualiza la información de un RepositoryDetail.
   * @param id - El ID de RepositoryDetail a actualizar.
   * @param data - Los datos parciales para actualizar el RepositoryDetail.
   * @returns Promise<RepositoryDetail>
   */
  static async update(
    id: string,
    data: RepositoryDetail
  ): Promise<RepositoryDetail> {
    // Actualiza el RepositoryDetail y devuelve el resultado
    return prisma.repositoryDetail.update({ where: { id }, data });
  }

  /**
   * Elimina un RepositoryDetail por ID.
   * @param id - El ID de RepositoryDetail a ser eliminado.
   * @returns Promise<RepositoryDetail>
   */
  static async delete(id: string): Promise<RepositoryDetail> {
    return prisma.repositoryDetail.delete({ where: { id } });
  }

  /**
   * Obtiene todos los RepositoryDetail.
   * @returns Promise<RepositoryDetail[]>
   */
  static async getAll(): Promise<RepositoryDetail[]> {
    return prisma.repositoryDetail.findMany();
  }

  //   /**
  //    * Agrega un Commit a un RepositoryDetail.
  //    * @param repositoryDetailId - El ID de RepositoryDetail.
  //    * @param commitData - Los datos del Commit a agregar.
  //    * @returns Promise<RepositoryDetail>
  //    */
  //   static async addCommit(
  //     repositoryDetailId: string,
  //     commitData: ScalarCommit
  //   ): Promise<RepositoryDetail> {
  //     return prisma.repositoryDetail.update({
  //       where: { id: repositoryDetailId },
  //       data: {
  //         Commit: {
  //           create: commitData,
  //         },
  //       },
  //     });
  //   }
}

export default RepositoryDetailService;
