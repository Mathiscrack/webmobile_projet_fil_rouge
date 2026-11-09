import { CategoryService } from "@application/services/CategoryService";
import { successResponse } from "@presentation/http/response";
import { categoryIdParamSchema } from "@presentation/http/schemas/categoryIdParamSchema";
import { validate } from "@presentation/http/validate";
import { Context } from "hono";

export class ListCategoryController{
    private readonly categoryService: CategoryService;

    constructor(categoryService: CategoryService) {
        this.categoryService = categoryService;
    }

    async handle(c: Context): Promise<Response> {
        const categories = await this.categoryService.list();
        const response = successResponse(categories, "Categories retrieved");
        
        return c.json(response);
    }
}