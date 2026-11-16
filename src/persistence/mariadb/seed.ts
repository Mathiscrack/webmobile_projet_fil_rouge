import { Category } from "@domain/Category";
import { User } from "@domain/User";
import type { DataSource } from "typeorm";

export async function seed(dataSource: DataSource): Promise<void> {
    await seedCategory(dataSource);
    await seedUser(dataSource);
}

const DEFAULT_CATEGORIES = [
    {name : "Local library", icon : "local_library"},
    {name : "School", icon : "school"},
    {name : "Local cafe", icon : "local_cafe"},
    {name : "Groups", icon : "groups"},
    {name : "Park", icon : "park"}
];

const DEFAULT_USERS = [
    await User.register(
        "moderator@topspot.dev",
        "moderator",
        "moderator-demo-pwd",
        "moderator",
    ),
    await User.register(
        "contributor@topspot.dev",
        "contributor",
        "contributor-demo-pwd",
        "contributor",
    )
];

async function seedCategory(dataSource : DataSource): Promise<void> {
    const categoryRepo = dataSource.getRepository(Category);

    if ((await categoryRepo.count()) > 0) {
        console.log("Default categories already in the database");
        return;
    }

    await categoryRepo.save(DEFAULT_CATEGORIES.map((c) => categoryRepo.create(c)));
    console.log("Default categories created");
}

async function seedUser(dataSource: DataSource): Promise<void> {
    const userRepo = dataSource.getRepository(User);
    
    if ((await userRepo.count()) > 0) {
        console.log("Default users already in the database");
        return;
    }

    await userRepo.save(DEFAULT_USERS);
    console.log("Default users created");
}