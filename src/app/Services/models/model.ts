export interface IBanner
{
    id: number;
    ImageName?: string;
    ImagePath?: string;
    Description?: string;
    Order?: number;
    Created_at?: string;
    Updated_at?: string;
}

export interface IUsers
{
    id: number;
    name: string;
    email: string;
    email_verified_at?: string;
    password: string;
    confirmPassword?: string;
    remember_token?: string;
    created_at?: string;
    updated_at?: string;
}
export interface ILogin
{
    email:string;
    password:string;
    rememberMe?: boolean;
    success?: any;
}

export interface IRegister
{
    email:string;
    password:string;
    name:string;
}

export interface IHeader
{
    id: number;
    name: string;
    value: string;
    status: boolean;
    order: number;
    statusDD?: string;
}

export interface IAboutUs
{
    id: number;
    title: string;
    description: string;
    company_name: string;
    created_at?: string;
    updated_at?: string;
}

export interface IOurService 
{
    id: number;
    title: string;
    description: string;
    author:string;
    imagePath: string;
    created_at:string;
    updated_at:string;
}
export interface IOurTeam 
{
    id: number;
    title: string;
    description: string;
    designation:string;
    imagePath: string;
    created_at:string;
    updated_at:string;
}
export interface ITestimonials
{
    id: number;
    title: string;
    description: string;
    client_name:string;
    imagePath: string;
    created_at:string;
    updated_at:string;
}
export interface IContact
{
    id: number;
    name: string;
    phone: string;
    email: string;
    subject: string;
    message: string;
    created_at: string;
    updated_at: string;
}
export interface ICategory
{
    id: number;
    name: string;
    category_code: string;
    imagePath: string;
}
export interface IProduct
{
    id: number;
    title: string;
    category_id: number;
    material: string;
    core: string;
    thickness: string;
    popular_width: string;
    popular_length: string;
    color: string;
    roll_size: string;
    supply_capacity: string;
    imagePath: string;
}
export interface IFooter
{
    id: number;
    phone1: string;
    phone2: number;
    phone3: string;
    email1: string;
    email2: string;
    email3: string;
    facebook: string;
    instagram: string;
    twitter: string;
    open_and_close: string;
}