import SoftwareEngineerService from "@/classes/SoftwareEngineerService";
import { NextResponse } from "next/server";

// Actualizar la contraseña de un usuario por ID
export async function PUT(req: Request) {
  try {
    const { id, password } = await req.json();
    const updatedClient = await SoftwareEngineerService.updatePassword(id, password);

    return NextResponse.json(updatedClient);
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message });
    }
  }
}
