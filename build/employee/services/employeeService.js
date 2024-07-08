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
exports.employeeService = void 0;
const EmployeeRepository_1 = require("../repositories/EmployeeRepository");
const DateUtils_1 = require("../../shared/utils/DateUtils");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
class employeeService {
    static getAllEmployees() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield EmployeeRepository_1.EmployeeRepository.findAll();
            }
            catch (error) {
                throw new Error(`Error al obtener empleados: ${error.message}`);
            }
        });
    }
    static getEmployeeById(employeeId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield EmployeeRepository_1.EmployeeRepository.findById(employeeId);
            }
            catch (error) {
                throw new Error(`Error al encontrar empleado: ${error.message}`);
            }
        });
    }
    static getEmployeeByName(fullName) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield EmployeeRepository_1.EmployeeRepository.findByName(fullName);
            }
            catch (error) {
                throw new Error(`Error al encontrar empleado: ${error.message}`);
            }
        });
    }
    static addEmployee(employee) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Verificar si los campos opcionales están definidos antes de asignarlos
                employee.created_at = DateUtils_1.DateUtils.formatDate(new Date());
                employee.updated_at = DateUtils_1.DateUtils.formatDate(new Date());
                // Asegurarse de que los campos opcionales se manejen correctamente
                // if (employee.deleted === undefined) {
                //     Employee.deleted = null; 
                // }
                return yield EmployeeRepository_1.EmployeeRepository.createEmployee(employee);
            }
            catch (error) {
                throw new Error(`Error al crear empleado: ${error.message}`);
            }
        });
    }
    static modifyEmployee(employeeId, employeeData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const employeeFound = yield EmployeeRepository_1.EmployeeRepository.findById(employeeId);
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
                }
                else {
                    return null;
                }
                employeeFound.updated_by = employeeData.updated_by;
                employeeFound.updated_at = DateUtils_1.DateUtils.formatDate(new Date());
                return yield EmployeeRepository_1.EmployeeRepository.updateEmployee(employeeId, employeeFound);
            }
            catch (error) {
                throw new Error(`Error al modificar empleado: ${error.message}`);
            }
        });
    }
    static deleteEmployee(employeeId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield EmployeeRepository_1.EmployeeRepository.deleteEmployee(employeeId);
            }
            catch (error) {
                throw new Error(`Error al eliminar empleado: ${error.message}`);
            }
        });
    }
}
exports.employeeService = employeeService;
