import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

const middleware = async (req) => {
  const token = await getToken({ req });
  const { pathname } = req.nextUrl;
  
  const loginUrl = new URL("/auth/login", req.url);
  const homeUrl = new URL('/',req.url)

  if(pathname.startsWith('/auth')){
    if(token){
      return NextResponse.redirect(homeUrl)
    }
  }

  if (pathname.startsWith("/courses/") && pathname !== "/courses") {
    if (!token) {
      return NextResponse.redirect(loginUrl);
    }
  }

  if (pathname.startsWith("/dashboard")) {
    if (!token) {
      return NextResponse.redirect(loginUrl);
    }

    const role = token.role;
    const pathSegments = pathname.split("/").filter(Boolean);

    if (pathSegments.length === 1) {
      return NextResponse.redirect(new URL(`/dashboard/${role}`, req.url));
    }

    const requestedRoute = pathSegments[1];

    if (role !== requestedRoute) {
      return NextResponse.redirect(new URL("/", req.url));
    }
  }

  return NextResponse.next();
};

export default middleware;

// {
//   name: 'Asifur Rahman',
//   email: 'asifurrahman.ac@gmail.com',
//   picture: 'https://lh3.googleusercontent.com/a/ACg8ocJ9ehHRu0T_WHt4hVtYi5B729oe8T4EDNQrApa7jWCeC4QL=s96-c',
//   sub: '113626038852667318792',
//   _id: '684ddfeb73fac201c77e821c',
//   role: 'admin',
//   iat: 1750876829,
//   exp: 1753468829,
//   jti: '5a025767-3814-482b-8b0a-6ec3e1ae5b84'
// }
