import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import * as cache from "memory-cache";
import { encrypt } from "../helpers/helpers";
import { User } from "../entity/User";

export class UserController {
  static async signup(req: Request, res: Response) {
    try {
      const { name, email, password, role } = req.body;
      const userRepository = AppDataSource.getRepository(User);
  
      // Check if the email already exists
      const existingUser = await userRepository.findOne({ where: { email } });
      if (existingUser) {
        return res.status(400).json({ message: "Email already in use" });
      }
  
      // Encrypt the password
      const encryptedPassword = await encrypt.encryptpass(password);
  
      // Create and save the new user
      const user = new User();
      user.name = name;
      user.email = email;
      user.password = encryptedPassword;
      user.role = role;
  
      await userRepository.save(user);
  
      // Generate a token for the new user
      const token = encrypt.generateToken({ id: user.id });
  
      return res
        .status(200)
        .json({ message: "User created successfully", token, user });
    } catch (error) {
      return res.status(500).json({ message: "An error occurred", error: error.message });
    }
  }
  
  static async getUsers(req: Request, res: Response) {
    const data = cache.get("data");
    if (data) {
      console.log("serving from cache");
      return res.status(200).json({
        data,
      });
    } else {
      console.log("serving from db");
      const userRepository = AppDataSource.getRepository(User);
      const users = await userRepository.find();

      cache.put("data", users, 6000);
      return res.status(200).json({
        data: users,
      });
    }
  }
  static async updateUser(req: Request, res: Response) {
    const { id } = req.params;
    const { name, email } = req.body;
    const userRepository = AppDataSource.getRepository(User);
    const user = await userRepository.findOne({
      where: { id },
    });
    user.name = name;
    user.email = email;
    await userRepository.save(user);
    res.status(200).json({ message: "udpdate", user });
  }

  static async deleteUser(req: Request, res: Response) {
    const { id } = req.params;
    const userRepository = AppDataSource.getRepository(User);
    const user = await userRepository.findOne({
      where: { id },
    });
    await userRepository.remove(user);
    res.status(200).json({ message: "ok" });
  }
}
