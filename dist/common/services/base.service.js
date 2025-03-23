"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseService = void 0;
class BaseService {
    constructor(model) {
        this.model = model;
    }
    async findAll(params) {
        const { page = 1, limit = 10, ...options } = params || {};
        const offset = (page - 1) * limit;
        const { rows: items, count: total } = await this.model.findAndCountAll({
            ...options,
            offset,
            limit,
        });
        return {
            items,
            total,
            page,
            limit,
            totalPages: Math.ceil(total / limit),
        };
    }
    async findById(id) {
        return this.model.findByPk(id);
    }
    async create(data, options) {
        return this.model.create(data, options);
    }
    async update(id, data, options) {
        const [updated] = await this.model.update(data, {
            ...options,
            where: { id },
            returning: true,
        });
        return updated;
    }
    async delete(id, options) {
        const deleted = await this.model.destroy({
            ...options,
            where: { id },
        });
        return deleted > 0;
    }
    async findOne(options) {
        return this.model.findOne(options);
    }
    async count(options) {
        return this.model.count(options);
    }
}
exports.BaseService = BaseService;
//# sourceMappingURL=base.service.js.map