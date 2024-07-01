import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { Public } from 'src/Custom Decorators/public.decorator';
import { Institution } from 'src/Schema/Institution.Schema';
import { InstitutionService } from 'src/uses-case/Institution/institution.service';



@Controller('institutions')
export class InstitutionController {
    constructor(private readonly institutionService: InstitutionService) { }
    @Public()
    @Post()
    async create(@Body() createInstitutionDto: any): Promise<Institution> {
        return this.institutionService.create(createInstitutionDto);
    }

    @Public()
    @Get()
    async findAll(): Promise<Institution[]> {
        return this.institutionService.findAll();
    }

    @Public()
    @Get(':id')
    async findOne(@Param('id') id: string): Promise<Institution> {
        return this.institutionService.findOne(id);
    }

    @Public()
    @Put(':id')
    async update(@Param('id') id: string, @Body() updateInstitutionDto: any): Promise<Institution> {
        return this.institutionService.update(id, updateInstitutionDto);
    }

    @Public()
    @Delete(':id')
    async delete(@Param('id') id: string): Promise<Institution> {
        return this.institutionService.delete(id);
    }


}
