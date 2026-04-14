export function middleware(req) {
  const authHeader = req.headers.get("authorization");

  //if (authHeader) {
  const authValue = authHeader.split(" ")[1];
  const [user, pwd] = atob(authValue).split(":");

  console.log(user + ": " + process.env.ADMIN_USER);
  console.log(pwd + ": " + process.env.ADMIN_PASS);

  const validUser = process.env.ADMIN_USER;
  const validPass = process.env.ADMIN_PASS;

  if (user === validUser && pwd === validPass) {
    return;
  }
  //}

  return new Response("No autorizado", {
    status: 401,
    headers: {
      "WWW-Authenticate": 'Basic realm="Inventory Admin Area"',
    },
  });
}

// Esto hace que el middleware proteja todas las rutas
export const config = {
  matcher: ["/(.*)"],
};
