import { MulterOptionsFactory, MulterModuleOptions } from '@nestjs/platform-express';
export declare class GridFsMulterConfigService implements MulterOptionsFactory {
    gridFsStorage: any;
    constructor();
    createMulterOptions(): MulterModuleOptions;
}
