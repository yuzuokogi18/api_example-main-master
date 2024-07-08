import { UserRepository } from "../repositories/UserRepository";
import { User } from "../models/user";
import { DateUtils } from "../../shared/utils/DateUtils";
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';


dotenv.config();

const secretKey = process.env.SECRET || "";
const saltRounds = 10;

export class userService {

  public static async login(username: string, password: string){
    try {
      const user = await this.getUserBylName(username);
      if (!user) {
        return null;
      }
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) {
        return null;
      }
      const payload = {
        user_id: user.user_id,
        rol_id_pk: user.role_id_fk,
        username: user.username
      };
      return await jwt.sign(payload, secretKey, { expiresIn: '5m' });
    } catch (error: any) {
      throw new Error(`Error al logearse: ${error.message}`);
    }
  }

  public static async getAllUser(): Promise<User[]> {
    try {
      return await UserRepository.findAll();
    } catch (error: any) {
      throw new Error(`Error al obtener empleados: ${error.message}`);
    }
  }

  public static async getUserById(userId: number): Promise<User | null> {
    try {
      return await UserRepository.findById(userId);
    } catch (error: any) {
      throw new Error(`Error al encontrar empleado: ${error.message}`);
    }
  }

  public static async getUserBylName(username: string): Promise<User | null> {
    try {
      return await UserRepository.findByName(username);
    } catch (error: any) {
      throw new Error(`Error al encontrar empleado: ${error.message}`);
    }
  }

  public static async addUser(user: User) {
    try {
      const salt = await bcrypt.genSalt(saltRounds);
      user.created_at = DateUtils.formatDate(new Date());
      user.updated_at = DateUtils.formatDate(new Date());
      user.password = await bcrypt.hash(user.password, salt);
      return await UserRepository.createUser(user);
    } catch (error: any) {
      throw new Error(`Error al crear empleado: ${error.message}`);
    }
  }

  public static async modifyUser(userId: number, userData: User){
    try {
      const userFinded =  await UserRepository.findById(userId);
      const salt = await bcrypt.genSalt(saltRounds);

      if (userFinded) {
        if (userData.username) {
          userFinded.username = userData.username;
        }
        if (userData.password) {
          userFinded.password = await bcrypt.hash(userData.password, salt);
        }
        if (userData.role_id_fk) {
          userFinded.role_id_fk = userData.role_id_fk;
        }
        if (userData.employee_id !== undefined) {
          userFinded.employee_id = userData.employee_id;
        }
        if (userData.deleted) {
          userFinded.deleted = userData.deleted;
        }
      } else {
        return null;
      }
      userFinded.updated_by = userData.updated_by;
      userFinded.updated_at = DateUtils.formatDate(new Date());
      return await UserRepository.updateUser(userId, userFinded);
    } catch (error: any) {
      throw new Error(`Error al modificar empleado: ${error.message}`);
    }
  }

  public static async deleteUser(userId: number): Promise<boolean> {
    try {
      return await UserRepository.deleteUser(userId);//yuuu
    } catch (error: any) {
      throw new Error(`Error al eliminar empleado: ${error.message}`);//okogi
    }
  }
}
