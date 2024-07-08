import { ResultSetHeader } from 'mysql2';
import connection from '../../shared/config/database';
import { Employee } from '../models/Employee';

export class EmployeeRepository {

  public static async findAll(): Promise<Employee[]> {
    return new Promise((resolve, reject) => {
      connection.query('SELECT employee_id, name, number, address, age, tipo, role_id_fk FROM employee', (error: any, results) => {
        if (error) {
          reject(error);
        } else {
          const employees: Employee[] = results as Employee[];
          resolve(employees);
        }
      });
    });
  }

  public static async findById(employee_id: number): Promise<Employee | null> {
    return new Promise((resolve, reject) => {
      connection.query('SELECT * FROM employee WHERE employee_id = ?', [employee_id], (error: any, results) => {
        if (error) {
          reject(error);
        } else {
          const employees: Employee[] = results as Employee[];
          if (employees.length > 0) {
            resolve(employees[0]);
          } else {
            resolve(null);
          }
        }
      });
    });
  }

  public static async findByName(Name: string): Promise<Employee | null> {
    return new Promise((resolve, reject) => {
      connection.query('SELECT * FROM employee WHERE name = ?', [Name], (error: any, results) => {
        if (error) {
          reject(error);
        } else {
          const employees: Employee[] = results as Employee[];
          if (employees.length > 0) {
            resolve(employees[0]);
          } else {
            resolve(null);
          }
        }
      });
    });
  }

  public static async createEmployee(employee: Employee): Promise<Employee> {
    const query = 'INSERT INTO employee (name, number, address, age, tipo, role_id_fk, created_at, created_by, updated_at, updated_by, deleted) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
    console.log(employee);
    return new Promise((resolve, reject) => {
      connection.execute(query, [employee.name, employee.number, employee.address, employee.age, employee.tipo, employee.role_id_fk, employee.created_at, employee.created_by, employee.updated_at, employee.updated_by, employee.deleted], (error, result: ResultSetHeader) => {
        if (error) {
          reject(error);
        } else {
          const createdEmployeeId = result.insertId;
          const createdEmployee: Employee = { ...employee, employee_id: createdEmployeeId };
          resolve(createdEmployee);
        }
      });
    });
  }

  public static async updateEmployee(employee_id: number, employeeData: Employee): Promise<Employee | null> {
    const query = 'UPDATE employee SET name = ?, number = ?, address = ?, age = ?, tipo = ?, role_id_fk = ?,  updated_at = ?, updated_by = ?, deleted = ? WHERE employee_id = ?';
    return new Promise((resolve, reject) => {
      connection.execute(query, [employeeData.name, employeeData.number, employeeData.address, employeeData.age, employeeData.tipo, employeeData.role_id_fk,  employeeData.updated_at, employeeData.updated_by, employeeData.deleted, employee_id], (error, result: ResultSetHeader) => {
        if (error) {
          reject(error);
        } else {
          if (result.affectedRows > 0) {
            const updatedEmployee: Employee = { ...employeeData, employee_id: employee_id };
            resolve(updatedEmployee);
          } else {
            resolve(null);
          }
        }
      });
    });
  }

  public static async deleteEmployee(employee_id: number): Promise<boolean> {
    const query = 'DELETE FROM employee WHERE employee_id = ?';
    return new Promise((resolve, reject) => {
      connection.execute(query, [employee_id], (error, result: ResultSetHeader) => {
        if (error) {
          reject(error);
        } else {
          if (result.affectedRows > 0) {
            resolve(true); // Eliminación exitosa
          } else {
            resolve(false); // Si no se encontró el usuario a eliminar
          }
        }
      });
    });
  }
}
