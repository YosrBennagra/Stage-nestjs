"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseAbstractRepository = void 0;
class BaseAbstractRepository {
    constructor(model) {
        this.model = model;
    }
    async create(data) {
        return await this.model.create(data);
    }
    async findById(id) {
        return await this.model.findById(id).exec();
    }
    async findOne(filter) {
        return await this.model.findOne(filter).exec();
    }
    async updateUserFirstnameAndLastname(id, firstname, lastname) {
        const dataToUpdate = {
            firstname: firstname,
            lastname: lastname
        };
        return await this.model.findByIdAndUpdate(id, dataToUpdate, { new: true }).exec();
    }
    async find(filter) {
        return await this.model.find(filter).exec();
    }
    async update(id, data) {
        return await this.model.findByIdAndUpdate(id, data, { new: true }).exec();
    }
    async delete(id) {
        const result = await this.model.findByIdAndDelete(id);
        return await result;
    }
    findAll() {
        return this.model.find();
    }
}
exports.BaseAbstractRepository = BaseAbstractRepository;
//# sourceMappingURL=base.abstract.repository.js.map