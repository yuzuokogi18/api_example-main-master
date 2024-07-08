"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmployeeRepository = void 0;
const database_1 = __importDefault(require("../../shared/config/database"));
class EmployeeRepository {
    static findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                database_1.default.query('SELECT employee_id, name, number, address, age, tipo, role_id_fk FROM employee', (error, results) => {
                    if (error) {
                        reject(error);
                    }
                    else {
                        const employees = results;
                        resolve(employees);
                    }
                });
            });
        });
    }
    static findById(employee_id) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                database_1.default.query('SELECT * FROM employee WHERE employee_id = ?', [employee_id], (error, results) => {
                    if (error) {
                        reject(error);
                    }
                    else {
                        const employees = results;
                        if (employees.length > 0) {
                            resolve(employees[0]);
                        }
                        else {
                            resolve(null);
                        }
                    }
                });
            });
        });
    }
    static findByName(Name) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                database_1.default.query('SELECT * FROM employee WHERE name = ?', [Name], (error, results) => {
                    if (error) {
                        reject(error);
                    }
                    else {
                        const employees = results;
                        if (employees.length > 0) {
                            resolve(employees[0]);
                        }
                        else {
                            resolve(null);
                        }
                    }
                });
            });
        });
    }
    static createEmployee(employee) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = 'INSERT INTO employee (name, number, address, age, tipo, role_id_fk, created_at, created_by, updated_at, updated_by, deleted) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
            console.log(employee);
            return new Promise((resolve, reject) => {
                database_1.default.execute(query, [employee.name, employee.number, employee.address, employee.age, employee.tipo, employee.role_id_fk, employee.created_at, employee.created_by, employee.updated_at, employee.updated_by, employee.deleted], (error, result) => {
                    if (error) {
                        reject(error);
                    }
                    else {
                        const createdEmployeeId = result.insertId;
                        const createdEmployee = Object.assign(Object.assign({}, employee), { employee_id: createdEmployeeId });
                        resolve(createdEmployee);
                    }
                });
            });
        });
    }
    static updateEmployee(employee_id, employeeData) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = 'UPDATE employee SET name = ?, number = ?, address = ?, age = ?, tipo = ?, role_id_fk = ?,  updated_at = ?, updated_by = ?, deleted = ? WHERE employee_id = ?';
            return new Promise((resolve, reject) => {
                database_1.default.execute(query, [employeeData.name, employeeData.number, employeeData.address, employeeData.age, employeeData.tipo, employeeData.role_id_fk, employeeData.updated_at, employeeData.updated_by, employeeData.deleted, employee_id], (error, result) => {
                    if (error) {
                        reject(error);
                    }
                    else {
                        if (result.affectedRows > 0) {
                            const updatedEmployee = Object.assign(Object.assign({}, employeeData), { employee_id: employee_id });
                            resolve(updatedEmployee);
                        }
                        else {
                            resolve(null);
                        }
                    }
                });
            });
        });
    }
    static deleteEmployee(employee_id) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = 'DELETE FROM employee WHERE employee_id = ?';
            return new Promise((resolve, reject) => {
                database_1.default.execute(query, [employee_id], (error, result) => {
                    if (error) {
                        reject(error);
                    }
                    else {
                        if (result.affectedRows > 0) {
                            resolve(true); // Eliminación exitosa
                        }
                        else {
                            resolve(false); // Si no se encontró el usuario a eliminar
                        }
                    }
                });
            });
        });
    }
}
exports.EmployeeRepository = EmployeeRepository;
