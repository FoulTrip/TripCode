import { prisma } from "@/prisma/db";
import { PayProject, DetailPayProject, PaymentStatus } from "@prisma/client";
import { PaymentProject, DetailPaymentProject } from "@/types/Schema";

class PaymentService {
  /**
   * Crea una nueva orden de pago.
   * @param data - Los datos para crear una nueva orden de pago.
   * @returns Promise<PayProject>
   */
  static async create(data: PaymentProject): Promise<PayProject> {
    // Crea un nuevo pago al projecto
    return prisma.payProject.create({
      data,
    });
  }

  /**
   * Agrega más detalles a una orden de pago existente.
   * @param data - Los datos del nuevo detalle para agregar.
   * @returns Promise<DetailPaymentProject>
   */
  static async addDetails(
    data: DetailPaymentProject
  ): Promise<DetailPayProject> {
    const newDetails = {
      name: data.name,
      description: data.description,
      price: data.price,
      payProjectId: data.payProjectId,
    };
    return prisma.detailPayProject.create({
      data: newDetails,
    });
  }

  /**
   * Actualiza un detalle específico de una orden de pago.
   * @param id - El ID de la orden de pago.
   * @param detailId - El ID del detalle a actualizar.
   * @param updatedDetail - El detalle actualizado.
   * @returns Promise<PayProject>
   */
  static async updateDetail(
    detailId: string,
    updatedDetail: DetailPayProject
  ): Promise<DetailPayProject> {
    return prisma.detailPayProject.update({
      where: { id: detailId },
      data: updatedDetail,
    });
  }

  /**
   * Cambia el estado de una orden de pago.
   * @param id - El ID de la orden de pago.
   * @param status - El nuevo estado.
   * @returns Promise<PayProject>
   */
  static async changeStatus(
    id: string,
    status: PaymentStatus
  ): Promise<PayProject> {
    return prisma.payProject.update({
      where: { id },
      data: { status },
    });
  }
}

export default PaymentService;
