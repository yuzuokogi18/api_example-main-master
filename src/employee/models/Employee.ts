export interface Employee {
    employee_id: number | null;
    name: string;
    number: string;
    address: string;
    age: number;
    tipo: string;
    role_id_fk: number;
    created_at: String;
    created_by: string;
    updated_at: String;
    updated_by: string;
    deleted: number;
  }
  