"use server";

import { z } from "zod";
import { createSession, deleteSession } from "@/lib/session";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

// Simulação de um banco de dados de usuários
const testUser = {
  id: "1",
  email: "iceesar@live.com",
  password: "12345678",
};

// Validação dos dados de entrada
const loginSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }).trim(),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" })
    .trim(),
});

export async function login(prevState: any, formData: FormData) {
  // valida os dados de entrada
  const result = loginSchema.safeParse(Object.fromEntries(formData));

  if (!result.success) {
    // retorna os erros de validação
    return {
      errors: result.error.flatten().fieldErrors,
    };
  }
  // verifica se o usuário existe
  const { email, password } = result.data;

  if (email !== testUser.email || password !== testUser.password) {
    return {
      errors: {
        email: ["Invalid email or password"]
      },
    };
  }
  // cria a sessão
  await createSession(testUser.id);
  // redireciona para a página de dashboard
  redirect("/dashboard");
}

export async function logout() {
  await deleteSession();
  redirect("/login");
}
