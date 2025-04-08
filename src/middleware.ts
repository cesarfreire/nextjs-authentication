import { NextRequest, NextResponse } from "next/server";
import { decrypt } from "./lib/session";

const protecedRoutes = ["/dashboard", "/profile", "/settings"];
const publicRoutes = ["/login", "/register"];

export default async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;

  const isProtectedRoute = protecedRoutes.includes(path);
  const isPublicRoute = publicRoutes.includes(path);

  // verifica se o usuário está logado
  const cookie = req.cookies.get("session")?.value;
  const session = await decrypt(cookie);

  if (isProtectedRoute && !session?.userId) {
    // se o usuário não estiver logado, redireciona para a página de login
    return NextResponse.redirect(new URL("/login", req.nextUrl));
  }

  if (isPublicRoute && session?.userId) {
    // se o usuário estiver logado, redireciona para a página de dashboard
    return NextResponse.redirect(new URL("/dashboard", req.nextUrl));
  }

  return NextResponse.next();
}
