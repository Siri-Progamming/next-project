export interface Cast {
    id: number;
    gender: number; // 0 Not Specified - 1 Female - 2 Male - 3 Non-binary
    known_for_department: string;
    name: string;
    popularity: number;
    profile_path: string;
    cast_id: number;
    character: string;
    credit_id: string;
    order: number;
}
export interface Crew {
    id: number;
    gender: number;
    known_for_department: string;
    name: string;
    popularity: number;
    profile_path: string;
    credit_id: string;
    department: string;
    job: string;
}
