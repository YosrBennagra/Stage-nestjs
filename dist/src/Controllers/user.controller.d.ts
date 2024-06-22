/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/callback" />
/// <reference types="mongoose/types/collection" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/expressions" />
/// <reference types="mongoose/types/helpers" />
/// <reference types="mongoose/types/middlewares" />
/// <reference types="mongoose/types/indexes" />
/// <reference types="mongoose/types/models" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/populate" />
/// <reference types="mongoose/types/query" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose/types/schematypes" />
/// <reference types="mongoose/types/session" />
/// <reference types="mongoose/types/types" />
/// <reference types="mongoose/types/utility" />
/// <reference types="mongoose/types/validation" />
/// <reference types="mongoose/types/virtuals" />
/// <reference types="multer-gridfs-storage/node_modules/mongoose/types/aggregate" />
/// <reference types="multer-gridfs-storage/node_modules/mongoose/types/callback" />
/// <reference types="multer-gridfs-storage/node_modules/mongoose/types/collection" />
/// <reference types="multer-gridfs-storage/node_modules/mongoose/types/connection" />
/// <reference types="multer-gridfs-storage/node_modules/mongoose/types/cursor" />
/// <reference types="multer-gridfs-storage/node_modules/mongoose/types/document" />
/// <reference types="multer-gridfs-storage/node_modules/mongoose/types/error" />
/// <reference types="multer-gridfs-storage/node_modules/mongoose/types/expressions" />
/// <reference types="multer-gridfs-storage/node_modules/mongoose/types/helpers" />
/// <reference types="multer-gridfs-storage/node_modules/mongoose/types/middlewares" />
/// <reference types="multer-gridfs-storage/node_modules/mongoose/types/indexes" />
/// <reference types="multer-gridfs-storage/node_modules/mongoose/types/models" />
/// <reference types="multer-gridfs-storage/node_modules/mongoose/types/mongooseoptions" />
/// <reference types="multer-gridfs-storage/node_modules/mongoose/types/pipelinestage" />
/// <reference types="multer-gridfs-storage/node_modules/mongoose/types/populate" />
/// <reference types="multer-gridfs-storage/node_modules/mongoose/types/query" />
/// <reference types="multer-gridfs-storage/node_modules/mongoose/types/schemaoptions" />
/// <reference types="multer-gridfs-storage/node_modules/mongoose/types/schematypes" />
/// <reference types="multer-gridfs-storage/node_modules/mongoose/types/session" />
/// <reference types="multer-gridfs-storage/node_modules/mongoose/types/types" />
/// <reference types="multer-gridfs-storage/node_modules/mongoose/types/utility" />
/// <reference types="multer-gridfs-storage/node_modules/mongoose/types/validation" />
/// <reference types="multer-gridfs-storage/node_modules/mongoose/types/virtuals" />
/// <reference types="multer-gridfs-storage/node_modules/mongoose" />
/// <reference types="mongoose/types/inferschematype" />
/// <reference types="multer-gridfs-storage/node_modules/mongoose/types/inferschematype" />
import mongoose from "mongoose";
import { User } from "../Schema/User.Schema";
import { UserRepository, UserService } from "../uses-case/User";
import { CreatUserDto } from "../uses-case/User/DTO/CreatUser.dto";
export declare class UsersController {
    private usersService;
    private userRe;
    constructor(usersService: UserService, userRe: UserRepository);
    createUser(createUserDto: CreatUserDto): Promise<mongoose.Document<unknown, {}, User> & User & {
        _id: mongoose.Types.ObjectId;
    }>;
    DeleteUser(id: string): Promise<User>;
    GetUserById(id: string): Promise<User>;
    GetUserByRole(role: string, search: string, limit?: number, offset?: number): Promise<{
        users: User[];
        count: number;
    }>;
    getUserByEmail(email: string): Promise<User>;
    UpdateUser(creatUserDto: CreatUserDto, id: string): Promise<User>;
    resetPassword({ email, resetToken, password }: {
        email: string;
        resetToken: string;
        password: string;
    }): Promise<{
        message: string;
    }>;
    hashPassword(password: string): Promise<string>;
    forgotPassword(email: string): Promise<{
        message: string;
    }>;
    updateProfilePicture(requestBody: {
        userId: string;
        profilePictureId: string;
    }): Promise<{
        success: boolean;
        user: User;
        error?: undefined;
    } | {
        success: boolean;
        error: any;
        user?: undefined;
    }>;
    updateDataUser(requestBody: {
        userId: string;
        un: string;
        fn: string;
        ln: string;
    }): Promise<{
        success: boolean;
        user: User;
        error?: undefined;
    } | {
        success: boolean;
        error: any;
        user?: undefined;
    }>;
}
