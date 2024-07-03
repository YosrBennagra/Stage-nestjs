import { Institution } from 'src/Schema/Institution.Schema';
import { InstitutionService } from 'src/uses-case/Institution/institution.service';
export declare class InstitutionController {
    private readonly institutionService;
    constructor(institutionService: InstitutionService);
    create(createInstitutionDto: any): Promise<Institution>;
    findAll(): Promise<Institution[]>;
    findOne(id: string): Promise<Institution>;
    update(id: string, updateInstitutionDto: any): Promise<Institution>;
    delete(id: string): Promise<Institution>;
    addResponsable(institutionId: string, id: string): Promise<Institution>;
    removeResponsable(institutionId: string, id: string): Promise<Institution>;
}
