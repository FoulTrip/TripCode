import MeetingRequestService from "@/classes/MeetingRequestService";
import TokenService from "@/classes/TokenServices";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    // Verificar la autenticación JWT
    const authorizationHeader = req.headers.get("Authorization");

    if (!authorizationHeader) {
      return NextResponse.json(
        { message: "Token de autorización no proporcionado" },
        { status: 401 }
      );
    }

    const token = authorizationHeader.split(" ")[1];

    const decodedToken = TokenService.verifyToken(
      token,
      process.env.JWT_SECRET as string
    ); // Reemplaza "tu-clave-secreta" con tu clave secreta

    if (!decodedToken) {
      return NextResponse.json({ message: "Token no válido" }, { status: 401 });
    }

    // Obtener todas las reuniones creadas por todos los clientes
    const meetingRequests = await MeetingRequestService.getAll();

    return NextResponse.json({ success: true, data: meetingRequests });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ success: false, error: error.message });
    }
  }
}
