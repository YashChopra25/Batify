import validator from "validator";
import { prisma } from "../config/DBconnect.js";
import { generateToken } from "../utils/general.js";
import bcrypt from "bcrypt";
class UserControllerClass {
  async signUp(req, res) {
    try {
      const { name, email, password } = req.body;
      if (
        validator.isEmpty(name) ||
        validator.isEmpty(email) ||
        validator.isEmpty(password)
      ) {
        return res.status(400).json({
          message: "All fields are required",
        });
      }
      if (!validator.isEmail(email)) {
        return res.status(404).json({
          success: false,
          message: "Email is not valid",
        });
      }
      const prismaUser = await prisma.user.create({
        data: {
          email,
          name,
          password,
        },
      });
      if (!prismaUser) {
        return res.status(501).json({
          success: false,
          message: "User is not created",
          data: prismaUser,
        });
      }
      return res.status(201).json({
        success: true,
        message: "User is created",
        data: {
          name: prismaUser.name,
          email: prismaUser.email,
          id: prismaUser.id,
        },
      });
    } catch (error) {
      if (error.code === "P2002" && error.meta?.target?.includes("email")) {
        return res.status(409).json({
          success: false,
          message: "Email already exists",
        });
      }
      return res.status(500).json({
        success: false,
        message: "Something went wrong",
        error,
      });
    }
  }
  async fetchUser(req, res) {
    try {
      console.log(req.user);
      const prismaUser = await prisma.user.findFirst({
        where: {
          id: parseInt(req.user.id),
        },
        select: {
          id: true,
          name: true,
          email: true,
        },
      });
      if (!prismaUser) {
        return res.status(404).json({
          success: false,
          message: "User is not found",
        });
      }
      return res.status(200).json({
        success: true,
        message: "User is fetchdsfed",
        data: prismaUser,
      });
    } catch (error) { 
      console.log(error);
      return res.status(500).json({
        success: false,
        message: "Something went wrong",
        error,
      });
    }
  }
  async fetchAllUser(req, res) {
    try {
      const prismaUser = await prisma.user.findMany();
      return res.status(200).json({
        success: true,
        message: "User is fetched",
        data: prismaUser,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Something went wrong",
        error,
      });
    }
  }
  async login(req, res) {
    try {
      const { email, password } = req.body;
      if (validator.isEmpty(email) || validator.isEmpty(password)) {
        return res.status(400).json({
          success: false,
          message: "All fields are required",
        });
      }
      if (!validator.isEmail(email)) {
        return res.status(404).json({
          success: false,
          message: "Email is not valid",
        });
      }
      const prismaUser = await prisma.user.findFirst({
        where: {
          email,
        },
      });
      if (!prismaUser) {
        return res.status(404).json({
          success: false,
          message: "Please enter correct credentials",
        });
      }
      const comparePassword = await bcrypt.compare(
        password,
        prismaUser.password
      );
      console.log(comparePassword);
      if (!comparePassword) {
        return res.status(401).json({
          success: false,
          message: "Please enter correct credentials",
        });
      }
      const token = generateToken(prismaUser);
      res.cookie("token", token);
      return res.status(200).json({
        success: true,
        message: "User is logged in",
        data: {
          name: prismaUser.name,
          email: prismaUser.email,
          id: prismaUser.id,
        },
      });
    } catch (error) {
      console.log("error", error);
      return res.json({
        success: false,
        message: "Something went wrong",
        error,
      });
    }
  }
  async logout(req, res) {
    try {
      res.clearCookie("token");
      return res.json({
        success: true,
        message: "User is logged out",
      });
    } catch (error) {
      console.log("error", error);
      return res.json({
        success: false,
        message: "Something went wrong,Unable to logout",
        error,
      });
    }
  }
}

const UserController = new UserControllerClass();
export default UserController;
