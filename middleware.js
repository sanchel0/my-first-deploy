import { NextResponse } from "next/server";

export function middleware(req) {
  const authHeader = req.headers.get("authorization");

  if (authHeader) {
    const authValue = authHeader.split(" ")[1];
    const [user, pwd] = atob(authValue).split(":");

    // Aquí pones tu usuario y contraseña (o mejor usas variables de entorno)
    if (user === "tu_usuario" && pwd === "tu_password_secreto") {
      return NextResponse.next();
    }
  }

  return new NextResponse("No autorizado", {
    status: 401,
    headers: {
      "WWW-Authenticate": 'Basic realm="Secure Area"',
    },
  });
}

// Esto hace que el middleware proteja TODO el sitio
export const config = {
  matcher: ["/:path*"],
};
