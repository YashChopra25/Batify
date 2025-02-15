import { prisma } from "../config/DBconnect.js";
import { decodeToken } from "../utils/general.js";

export const AuthMiddleware = async (req, res, next) => {
  try {
    const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }
    console.log(token);
    const decoded = decodeToken(token);
    const fetchUser = await prisma.user.findFirst({
      where: {
        id: decoded.id,
      },
    });
    if (!fetchUser) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }
    req.user = fetchUser;
    next();
  } catch (error) {
    console.log("error in auth middleware", error);
    res.clearCookie("token");
    return res
      .status(401)
      .json({ success: false, message: "Something went wrong", error });
  }
};

export default AuthMiddleware;
