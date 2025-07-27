export interface IMachine {
    cpu_Load_one: number;
    cpu_load_fifteen: number
    cpu_load_five: number;
    cpu_usage: number
    created_at: string;
    current_goroutines:number
    disk_usage: number;
    id:number
    max_goroutines: number
    mem_usage: number;
    name: string;
    server_type: number
    status: number;
    updated_at: string;
}
export interface IMachineList {
    machine_list: IMachine[]
    total:number
}
export interface IMachineParams {
    page: number;
    size: number;
    sort_tag:number
    name: string;
}