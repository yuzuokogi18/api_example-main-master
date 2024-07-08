import { EmployeeRepository } from "../repositories/EmployeeRepository";
import { Employee } from "../models/Employee";
import { DateUtils } from "../../shared/utils/DateUtils";
import dotenv from 'dotenv';

dotenv.config();

export class employeeService {
    public static async getAllEmployees(): Promise<Employee[]> {
        try {
            return await EmployeeRepository.findAll();
        } catch (error: any) {
            throw new Error(`Error al obtener empleados: ${error.message}`);
        }
    }

    public static async getEmployeeById(employeeId: number): Promise<Employee | null> {
        try {
            return await EmployeeRepository.findById(employeeId);
        } catch (error: any) {
            throw new Error(`Error al encontrar empleado: ${error.message}`);
        }
    }

    public static async getEmployeeByName(fullName: string): Promise<Employee | null> {
        try {
            return await EmployeeRepository.findByName(fullName);
        } catch (error: any) {
            throw new Error(`Error al encontrar empleado: ${error.message}`);
        }
    }

    public static async addEmployee(employee: Employee) {
        try {
            // Verificar si los campos opcionales están definidos antes de asignarlos
            employee.created_at = DateUtils.formatDate(new Date());
            employee.updated_at = DateUtils.formatDate(new Date());

            // Asegurarse de que los campos opcionales se manejen correctamente
            // if (employee.deleted === undefined) {
            //     Employee.deleted = null; 
            // }

            return await EmployeeRepository.createEmployee(employee);
        } catch (error: any) {
            throw new Error(`Error al crear empleado: ${error.message}`);
        }
    }

    public static async modifyEmployee(employeeId: number, employeeData: Employee) {
        try {
            const employeeFound = await EmployeeRepository.findById(employeeId);

            if (employeeFound) {
                if (employeeData.name) {
                    employeeFound.name = employeeData.name;
                }

                if (employeeData.role_id_fk) {
                    employeeFound.role_id_fk = employeeData.role_id_fk;
                }

                if (employeeData.deleted !== undefined) {
                    employeeFound.deleted = employeeData.deleted;
                }
            } else {
                return null;
            }

            employeeFound.updated_by = employeeData.updated_by;
            employeeFound.updated_at = DateUtils.formatDate(new Date());

            return await EmployeeRepository.updateEmployee(employeeId, employeeFound);
        } catch (error: any) {
            throw new Error(`Error al modificar empleado: ${error.message}`);
        }
    }

    public static async deleteEmployee(employeeId: number): Promise<boolean> {
        try {
            return await EmployeeRepository.deleteEmployee(employeeId);
        } catch (error: any) {
            throw new Error(`Error al eliminar empleado: ${error.message}`);
        }
    }
}
