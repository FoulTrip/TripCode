import MeetingRequestService from "@/classes/MeetingRequestService";
import TokenService from "@/classes/TokenServices";
import { ScalarMeetingRequest } from "@/types/Schema";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
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

    const { clientId }: ScalarMeetingRequest = await req.json();

    // Verificar si el usuario que hace la solicitud es un Cliente válido
    // (puedes agregar la lógica de autenticación según tu implementación)
    // ...

    const newMeetingRequest = await MeetingRequestService.create({
      clientId,
    });

    return NextResponse.json({ success: true, data: newMeetingRequest });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ success: false, error: error.message });
    }
  }
}
