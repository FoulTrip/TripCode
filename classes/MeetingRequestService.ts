// Import necessary modules and dependencies
import { prisma } from "@/prisma/db";
import {
  ScalarMeetingRequest,
  ScalarClient,
  ScalarProjectManager,
} from "@/types/Schema";
import { MeetingRequest, MeetingStatus } from "@prisma/client";

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
   * Update all fields of a Meeting Request by ID.
   * @param id - The ID of the Meeting Request to be updated.
   * @param data - The new data for the Meeting Request.
   * @returns Promise<MeetingRequest>
   */
  static async updateAll(
    id: string,
    data: ScalarMeetingRequest
  ): Promise<MeetingRequest> {
    return prisma.meetingRequest.update({
      where: { id },
      data,
    });
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

  /**
   * Update the `managerId` of a Meeting Request by ID.
   * @param id - The ID of the Meeting Request to be updated.
   * @param managerId - The new managerId.
   * @returns Promise<MeetingRequest>
   */
  static async updateManagerId(
    id: string,
    managerId: string
  ): Promise<MeetingRequest> {
    return prisma.meetingRequest.update({
      where: { id },
      data: { managerId },
    });
  }

  /**
   * Update the `status` of a Meeting Request by ID.
   * @param id - The ID of the Meeting Request to be updated.
   * @param status - The new status.
   * @returns Promise<MeetingRequest>
   */
  static async updateStatus(
    id: string,
    status: MeetingStatus
  ): Promise<MeetingRequest> {
    return prisma.meetingRequest.update({
      where: { id },
      data: { status },
    });
  }

  /**
   * Update the `meetingLink` of a Meeting Request by ID.
   * @param id - The ID of the Meeting Request to be updated.
   * @param meetingLink - The new meetingLink.
   * @returns Promise<MeetingRequest>
   */
  static async updateMeetingLink(
    id: string,
    meetingLink: string
  ): Promise<MeetingRequest> {
    return prisma.meetingRequest.update({
      where: { id },
      data: { meetingLink },
    });
  }

  /**
   * Update the `timestamp` of a Meeting Request by ID.
   * @param id - The ID of the Meeting Request to be updated.
   * @param timestamp - The new timestamp.
   * @returns Promise<MeetingRequest>
   */
  static async updateTimestamp(
    id: string,
    timestamp: string
  ): Promise<MeetingRequest> {
    return prisma.meetingRequest.update({
      where: { id },
      data: { timestamp },
    });
  }
}

// Export the MeetingRequestService class
export default MeetingRequestService;
