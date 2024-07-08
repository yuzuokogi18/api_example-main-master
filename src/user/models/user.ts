export interface User{
    user_id: number;
    username: string;
    password: string;
    employee_id:number | null;
    role_id_fk: number;
    created_at: String;
    created_by: string;
    updated_at: String;
    updated_by: string;
    deleted: boolean;
}