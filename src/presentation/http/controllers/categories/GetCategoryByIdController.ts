import { NotFoundError } from "@application/errors/NotFoundError";
import { CategoryService } from "@application/services/CategoryService";
import { successResponse } from "@presentation/http/response";
import { categoryIdParamSchema } from "@presentation/http/schemas/categoryIdParamSchema";
import { validate } from "@presentation/http/validate";
import { Context } from "hono";
import { HTTPException } from "hono/http-exception";

export class GetCategoryByIdController {
    private readonly categoryService: CategoryService;

    constructor(categoryService: CategoryService) {
        this.categoryService = categoryService;
    }

    async handle(c: Context): Promise<Response>{
        const {id} = validate(categoryIdParamSchema, c.req.param());

        try {
            const category = await this.categoryService.getById(id);
            const response = successResponse(category, "Category retrieved");
            
            return c.json(response);        
        } catch (error) {
            if (error instanceof NotFoundError) {
                throw new HTTPException(404, {message: error.message});
            }
            throw error
        }
    }
}