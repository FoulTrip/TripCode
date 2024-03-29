import SoftwareEngineerService from "@/classes/SoftwareEngineerService";
import TokenService from "@/classes/TokenServices";
import { NextResponse } from "next/server";

// Iniciar sesión del usuario
export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();
    // console.log(email, password)
    const user = await SoftwareEngineerService.signin(email, password);
    // console.log(user)

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
    if (error instanceof Error) {
      return NextResponse.json({ success: false, error: error.message });
    }
  }
}
