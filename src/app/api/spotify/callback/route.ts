import qs from "node:querystring";
import { NextResponse, type NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const code = searchParams.get("code");

  /*const response =*/ await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      "content-type": "application/x-www-form-urlencoded",
      Authorization:
        "Basic " +
        Buffer.from(
          process.env.SPOTIFY_CLIENT_ID +
            ":" +
            process.env.SPOTIFY_CLIENT_SECRET,
        ).toString("base64"),
    },
    /*
      https://stackoverflow.com/a/65954101
      "error": "unsupported_grant_type",
      "error_description": "grant_type parameter is missing"
    */
    body: qs.stringify({
      grant_type: "authorization_code",
      code: code,
      redirect_uri: process.env.SPOTIFY_REDIRECT_URI,
    }),
  });

  // const body = await response.json();
  // console.log(chalk.green(JSON.stringify(body, null, 2)));

  return NextResponse.redirect(
    request.nextUrl.origin || "http://localhost:3000",
  );
}
