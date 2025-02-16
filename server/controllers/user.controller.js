import validator from "validator";
import { prisma } from "../config/DBconnect.js";
import { generateToken } from "../utils/general.js";
import bcrypt from "bcrypt";
import e from "express";
class UserControllerClass {
  async verifyUser(req, res) {
    try {
      const user = req.user;
      return res.json({
        success: true,
        message: "User is verified",
        data: {
          name: user.name,
          email: user.email,
          id: user.id,
        },
      });
    } catch (err) {
      return res.json({
        success: false,
        message: "Something went wrong",
        error: err,
      });
    }
  }
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
  async fetchUserUrl(req, res) {
    try {
      const prismaAnalytics = await prisma.url.findMany({
        where: {
          ownerId: req.user.id,
        },
        include: {
          _count: true,
          owner: {
            select: {
              id: true,
              name: true,
              email: true,
            },
          },
          
        },
        orderBy:{
          createdAt:"desc"
        }
      });

      return res.status(200).json({
        success: true,
        message: "Url is fetched",
        data: prismaAnalytics,
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
  async updateUser(req, res) {
    try {
      const { first_name, last_name, email } = req.body;
      let updateFieds = {};
      if (first_name || last_name) {
        let name = first_name.trim() + " " + last_name.trim();
        updateFieds.name = name.trim().toLowerCase();
      }
      if (!validator.isEmail(email)) {
        return res.status(404).json({
          success: false,
          message: "Email is not valid",
        });
      }
      if (email) {
        const isExist = await prisma.user.findFirst({
          where: {
            email,
          },
        });
        if (isExist && isExist.id !== parseInt(req.user.id)) {
          return res.status(404).json({
            success: false,
            message: "This email already registered",
          });
        }
        updateFieds.email = email;
      }
      const prismaUser = await prisma.user.update({
        where: {
          id: parseInt(req.user.id),
        },
        data: updateFieds,
      });
      if (!prismaUser) {
        return res.status(404).json({
          success: false,
          message: "User is not found",
        });
      }
      return res.status(200).json({
        success: true,
        message: "User is updated",
        data: {
          name: prismaUser.name,
          email: prismaUser.email,
          id: prismaUser.id,
        },
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
      res.cookie("token", token, {
        e: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days
      });
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
