// Importa los módulos y dependencias necesarios
import { prisma } from "@/prisma/db";
import { Task } from "@prisma/client";
import { ScalarTask } from "@/types/Schema";

// Clase de servicio para gestionar las tareas
class TaskService {
  /**
   * Crea una nueva tarea.
   * @param data - Los datos para crear una nueva tarea.
   * @returns Promise<Task>
   */
  static async create(data: ScalarTask): Promise<Task> {
    // Crea una nueva tarea y devuelve el resultado
    return prisma.task.create({
      data,
    });
  }

  /**
   * Obtiene una tarea por su ID.
   * @param id - El ID de la tarea.
   * @returns Promise<Task | null>
   */
  static async get(id: string): Promise<Task | null> {
    return prisma.task.findUnique({ where: { id } });
  }

  /**
   * Actualiza la información de una tarea.
   * @param id - El ID de la tarea a actualizar.
   * @param data - Los datos parciales para actualizar la tarea.
   * @returns Promise<Task>
   */
  static async update(id: string, data: ScalarTask): Promise<Task> {
    // Actualiza la tarea y devuelve el resultado
    return prisma.task.update({ where: { id }, data });
  }

  /**
   * Elimina una tarea por su ID.
   * @param id - El ID de la tarea a eliminar.
   * @returns Promise<Task>
   */
  static async delete(id: string): Promise<Task> {
    return prisma.task.delete({ where: { id } });
  }

  /**
   * Obtiene todas las tareas de un proyecto.
   * @param projectId - El ID del proyecto.
   * @returns Promise<Task[]>
   */
  static async getAllTasksByProjectId(projectId: string): Promise<Task[]> {
    return prisma.task.findMany({
      where: {
        projectId,
      },
    });
  }

  /**
   *
   * @param id - El ID del proyecto
   * @param status - Status a cambiar de la tarea
   * @returns Promise<Task[]>
   */
  static async updateStatus(id: string, status: boolean): Promise<Task> {
    return prisma.task.update({
      where: { id },
      data: { status },
    });
  }
}

export default TaskService;
