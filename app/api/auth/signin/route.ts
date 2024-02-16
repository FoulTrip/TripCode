import { NextResponse } from "next/server";
import ClientService from "@/classes/ClientServices";
import SoftwareEngineerService from "@/classes/SoftwareEngineerService";
import ProjectManagerServices from "@/classes/ProjectManagerService";
import TokenService from "@/classes/TokenServices";

async function findUser(email: string, password: string) {
  try {
    // Intentar autenticar en la colección de Clientes
    const clientUser = await ClientService.signin(email, password);
    return clientUser;
  } catch (clientError) {
    // En caso de error, intentar en la colección de Ingenieros de Software
    try {
      const softwareEngineerUser = await SoftwareEngineerService.signin(
        email,
        password
      );
      return softwareEngineerUser;
    } catch (softwareEngineerError) {
      // En caso de error, intentar en la colección de Project Managers
      try {
        const projectManagerUser = await ProjectManagerServices.signin(
          email,
          password
        );
        return projectManagerUser;
      } catch (projectManagerError) {
        // Ninguna colección tiene el usuario
        return null;
      }
    }
  }
}

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    // Intentar encontrar al usuario en alguna colección
    const user = await findUser(email, password);

    if (!user) {
      return NextResponse.json({
        success: false,
        error: "El usuario no existe en ninguna colección",
      });
    }

    // Creamos un token JWT con la información del usuario
    const payload = { userId: user.id, userEmail: user.email };
    const secret = process.env.JWT_SECRET as string;
    const token = TokenService.createToken(payload, secret);

    const loginRes = {
      ...user,
      token,
    };

    return NextResponse.json({ success: true, data: loginRes });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      success: false,
      error: "Error al conectar login",
    });
  }
}
