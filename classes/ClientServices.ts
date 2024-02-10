import { prisma } from "@/prisma/db";
import { ScalarClient } from "@/types/Schema";
import { Client } from "@prisma/client";
import bcrypt from "bcryptjs";

class ClientService {
  // Crear usuario
  static async create(data: ScalarClient): Promise<Client> {
    const existEmail = await prisma.client.findUnique({
      where: { email: data.email },
    });

    if (existEmail) {
      throw new Error("El correo electrónico ya está en uso");
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);

    return prisma.client.create({
      data: {
        ...data,
        password: hashedPassword,
      },
    });
  }

  // Obtener usuario por ID
  static async get(id: string): Promise<Client | null> {
    return prisma.client.findUnique({ where: { id } });
  }

  // Actualizar usuario
  static async update(
    id: string,
    data: Partial<ScalarClient>
  ): Promise<Client> {
    return prisma.client.update({ where: { id }, data });
  }

  // Actualizar contraseña del usuario
  static async updatePassword(id: string, password: string): Promise<Client> {
    const hashedPassword = await bcrypt.hash(password, 10);
    return prisma.client.update({
      where: { id },
      data: { password: hashedPassword },
    });
  }

  // Eliminar usuario
  static async delete(id: string): Promise<Client> {
    return prisma.client.delete({ where: { id } });
  }

  // Iniciar sesión del usuario
  static async signin(email: string, password: string): Promise<Client> {
    const user = await prisma.client.findUnique({ where: { email } });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new Error("Credenciales inválidas");
    }

    return user;
  }
}

export default ClientService;
