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
import { User } from "../../Schema/User.Schema";
import { UserRepository } from "./UserRepo/user.repository";
import { Model } from "mongoose";
import { CreatUserDto } from "./DTO/CreatUser.dto";
import { LoginDto } from "./DTO/Login.dto";
import EmailService from "../email/email.service";
export declare class UserService {
    private readonly emailService;
    private readonly userRe;
    private userModel;
    constructor(emailService: EmailService, userRe: UserRepository, userModel: Model<User>);
    CreatUser({ ...creatUserDto }: CreatUserDto): Promise<import("mongoose").Document<unknown, {}, User> & User & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    loginUser(loginDto: LoginDto): Promise<User>;
    findAll(): Promise<User[]>;
    deleteUser(id: string): Promise<User>;
    findOneUser(id: string): Promise<User>;
    findUserByEmail(email: string): Promise<User>;
    findUserByRole(role: string, search: string, limit: number, offset: number): Promise<{
        users: User[];
        count: number;
    }>;
    UpdateUser(id: string, creatuserdto: CreatUserDto): Promise<User>;
    UpdateUser2(id: string, firstname: string, lastname: string): Promise<User>;
    markEmailAsConfirmed(id: string): Promise<User>;
    deleteUnconfirmedUsers(): Promise<void>;
    deleteUserProfile(userId: string): Promise<void>;
    setTwoFactorAuthenticationSecret(secret: string, userId: string): Promise<User>;
    turnOnTwoFactorAuthentication(userId: string): Promise<boolean>;
    updateUserProfilePicture(userId: string, ppid: string): Promise<User>;
    updateUserData(userId: string, un: string, fn: string, ln: string): Promise<User>;
    setCurrentRefreshToken(refreshToken: string, userId: string): Promise<void>;
    sendPasswordResetEmail(email: string): Promise<void>;
    getUserbyInstitution(institution: string): Promise<User[]>;
}
