import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { MongoGridFS } from 'mongo-gridfs';
import { GridFSBucket, GridFSBucketReadStream } from 'mongodb';
import { DATA_BASE_CONFIGURATION } from 'src/Config/Mongo';

import { FileUploadDto } from './model/FileUploadDto';
import { FileInfoVm } from './model/FileInfoVm ';

@Injectable()
export class FileService {
  private fileModel: MongoGridFS;
  private gridFSBucket: GridFSBucket;
  
  constructor() {
    this.initializeFileModel();
  }

  private async initializeFileModel(): Promise<void> {
    const MongoClient = require('mongodb').MongoClient;
    const client = new MongoClient(DATA_BASE_CONFIGURATION.mongoConnectionString, { useNewUrlParser: true, useUnifiedTopology: true });

    try {
      await client.connect();
      const db = client.db();
      this.fileModel = new MongoGridFS(db, 'fs');
      this.gridFSBucket = new GridFSBucket(db, { bucketName: 'fs' });
    } catch (err) {
      throw new HttpException('Failed to connect to MongoDB', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async readStream(id: string): Promise<GridFSBucketReadStream> {
    if (!this.fileModel) {
      throw new HttpException('File model is not initialized', HttpStatus.INTERNAL_SERVER_ERROR);
    }
    return await this.fileModel.readFileStream(id);
  }

  async findInfo(id: string): Promise<FileInfoVm> {
    if (!this.fileModel) {
      throw new HttpException('File model is not initialized', HttpStatus.INTERNAL_SERVER_ERROR);
    }
    
    const result = await this.fileModel.findById(id).catch(err => {
      throw new HttpException('File not found', HttpStatus.NOT_FOUND);
    });

    return {
      filename: result.filename,
      length: result.length,
      chunkSize: result.chunkSize,
      md5:'',
      contentType: result.contentType
    };
  }

  async deleteFile(id: string): Promise<boolean> {
    if (!this.fileModel) {
      throw new HttpException('File model is not initialized', HttpStatus.INTERNAL_SERVER_ERROR);
    }
    return await this.fileModel.delete(id);
  }

  async uploadFile(file: Express.Multer.File): Promise<FileUploadDto> {
    return new Promise((resolve, reject) => {
      const writeStream = this.gridFSBucket.openUploadStream(file.originalname, {
        contentType: file.mimetype,
      });

      writeStream.on('finish', () => {
        resolve({
          id: writeStream.id.toString(),
          filename: file.originalname,
          contentType: file.mimetype,
        });
      });

      writeStream.on('error', (error) => {
        reject(new HttpException(`File upload failed: ${error.message}`, HttpStatus.INTERNAL_SERVER_ERROR));
      });

      writeStream.end(file.buffer);
    });
  }
}
