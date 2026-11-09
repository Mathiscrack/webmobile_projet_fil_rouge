import { Category } from "@domain/Category";
import type { DataSource } from "typeorm";

export async function seed(dataSource: DataSource): Promise<void> {
    await seedCategory(dataSource);
}

const DEFAULT_CATEGORIES = [
    {name : "Local library", icon : "local_library"},
    {name : "School", icon : "school"},
    {name : "Local cafe", icon : "local_cafe"},
    {name : "Groups", icon : "groups"},
    {name : "Park", icon : "park"}
];

export async function seedCategory(dataSource : DataSource): Promise<void>{
    const categoryRepo = dataSource.getRepository(Category);

    if ((await categoryRepo.count()) > 0) {
        console.log("Default categories already in the database");
        return;
    }

    await categoryRepo.save(DEFAULT_CATEGORIES.map((c) => categoryRepo.create(c)));
    console.log("Default categories created");
}
