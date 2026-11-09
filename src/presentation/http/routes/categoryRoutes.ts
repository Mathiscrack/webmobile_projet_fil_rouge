import { CategoryService } from "@application/services/CategoryService";
import { Category } from "@domain/Category";
import { dataSource } from "@persistence/mariadb/dataSource";
import { GetCategoryByIdController } from "@presentation/http/controllers/categories/GetCategoryByIdController";
import { ListCategoryController } from "@presentation/http/controllers/categories/ListCategoryController";
import { Hono } from "hono";
import { Repository } from "typeorm";

const categoryRepo: Repository<Category> = dataSource.getRepository(Category);
const categoryService: CategoryService = new CategoryService(categoryRepo);

const listCategory = new ListCategoryController(categoryService);
const getCategoryById = new GetCategoryByIdController(categoryService);

export const categoryRoutes = new Hono();

categoryRoutes.get("/", (c) => listCategory.handle(c));
categoryRoutes.get("/:id", (c) => getCategoryById.handle(c));