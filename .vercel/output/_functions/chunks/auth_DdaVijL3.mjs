import { jwtVerify } from "jose";
//#region src/lib/auth.ts
function getSecret() {
	throw new Error("JWT_SECRET environment variable is not set");
}
async function verifyToken(token) {
	try {
		await jwtVerify(token, getSecret());
		return true;
	} catch {
		return false;
	}
}
//#endregion
export { verifyToken as t };
