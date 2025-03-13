import jwt from "jsonwebtoken";

function authMiddleware(req, res, next) {
    console.log("Reached authMiddleware");
    console.log(req.cookies)

    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({ error: "Unauthorized, no token provided." });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET || "testSecret");
        console.log(decoded);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(403).json({ error: "Invalid/ expired token." })
    }
}

export default authMiddleware;