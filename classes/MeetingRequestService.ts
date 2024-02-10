// Import necessary modules and dependencies
import { prisma } from "@/prisma/db";
import {
  ScalarMeetingRequest,
  ScalarClient,
  ScalarProjectManager,
} from "@/types/Schema";
import {
  MeetingRequest,
  MeetingStatus,
  ProjectRequirement,
} from "@prisma/client";

// Service class for managing Meeting Requests
class MeetingRequestService {
  /**
   * Create a new Meeting Request.
   * @param data - The data for creating a new Meeting Request.
   * @returns Promise<MeetingRequest>
   */
  static async create(data: ScalarMeetingRequest): Promise<MeetingRequest> {
    // Create a new Meeting Request and return the result
    return prisma.meetingRequest.create({
      data: {
        ...data,
      },
    });
  }

  /**
   * Get a Meeting Request by ID.
   * @param id - The ID of the Meeting Request.
   * @returns Promise<MeetingRequest | null>
   */
  static async get(id: string): Promise<MeetingRequest | null> {
    return prisma.meetingRequest.findUnique({ where: { id } });
  }

  /**
   * Update a Meeting Request's information.
   * @param id - The ID of the Meeting Request to be updated.
   * @param data - The partial data for updating the Meeting Request.
   * @returns Promise<MeetingRequest>
   */
  static async update(
    id: string,
    data: Partial<ScalarMeetingRequest>
  ): Promise<MeetingRequest> {
    // Update the Meeting Request and return the result
    return prisma.meetingRequest.update({ where: { id }, data });
  }

  /**
   * Delete a Meeting Request by ID.
   * @param id - The ID of the Meeting Request to be deleted.
   * @returns Promise<MeetingRequest>
   */
  static async delete(id: string): Promise<MeetingRequest> {
    return prisma.meetingRequest.delete({ where: { id } });
  }

  /**
   * Get Meeting Requests for a specific client.
   * @param clientId - The ID of the client.
   * @returns Promise<MeetingRequest[]>
   */
  static async getByClient(clientId: string): Promise<MeetingRequest[]> {
    return prisma.meetingRequest.findMany({
      where: { clientId },
    });
  }

  /**
   * Obtener todas las reuniones.
   * @returns Promise<MeetingRequest[]>
   */
  static async getAll(): Promise<MeetingRequest[]> {
    // Puedes agregar lógica adicional aquí si es necesario
    return prisma.meetingRequest.findMany();
  }
}

// Export the MeetingRequestService class
export default MeetingRequestService;
