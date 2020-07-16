import { IUsers } from './model';

export interface IUsersVM extends IUsers{
    currentPassword?:string;
    newPassword?:string;
    c_newPassword?:string;
}