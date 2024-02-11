import SoftwareEngineerService from "@/classes/SoftwareEngineerService";
import TokenService from "@/classes/TokenServices";
import { ScalarClient } from "@/types/Schema";
import { NextResponse } from "next/server";

export async function PUT(req: Request) {
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

    const { id, firstname, lastname, email, avatar }: ScalarClient =
      await req.json();

    if (!id) {
      throw new Error("El ID del usuario no se proporcionó");
    }

    const updatedClient = await SoftwareEngineerService.update(id, {
      firstname,
      lastname,
      email,
      avatar,
    });

    return NextResponse.json({ success: true, data: updatedClient });
  } catch (error) {
    if (error instanceof Error) {
      console.log(error);
      return NextResponse.json({ success: false, error: error.message });
    }
  }
}
