import { Category } from "@domain/Category";

export class CategoryDto {
    readonly id: number;
    readonly name: string;
    readonly icon: string;

    constructor(category: Category) {
        this.id = category.id;
        this.name = category.name;
        this.icon = category.icon;
    }
}