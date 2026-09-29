import { SignJWT, jwtVerify } from "jose";

const secret = new TextEncoder().encode(
    process.env.JWT_SECRET_KEY
);

export async function createToken(userId) {
    return await new SignJWT({
        userId,
    })
        .setProtectedHeader({
            alg: "HS256",
        })
        .setIssuedAt()
        .setExpirationTime("1d")
        .sign(secret);
}

export async function verifyToken(token) {
    try {
        const { payload } = await jwtVerify(token, secret);
        return payload;
    } catch (err) {
        return null;
    }
}
