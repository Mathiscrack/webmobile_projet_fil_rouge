import { NotFoundError } from "@application/errors/NotFoundError";
import { CategoryDto } from "@application/services/dtos/outputs/CategoryDto";
import { Category } from "@domain/Category";
import { Repository } from "typeorm";

export class CategoryService {
    private readonly categoryRepo: Repository<Category>;

    constructor(categoryRepo: Repository<Category>) {
        this.categoryRepo = categoryRepo;
    }

    async list(): Promise<Array<CategoryDto>> {
        const categories = await this.categoryRepo.find({
            order: {name : "ASC"},
        });

        return categories.map((c) => new CategoryDto(c));
    }

    async getById(id: number): Promise<CategoryDto> {
        const category = await this.categoryRepo.findOneBy({id});

        if (!category) {
            throw new NotFoundError("Category not found");
        }

        return new CategoryDto(category);
    }
}