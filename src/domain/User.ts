import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

export const userRoles = ["contributor", "moderator"] as const;
export type UserRole = (typeof userRoles)[number];

@Entity()
export class User {
    @PrimaryGeneratedColumn("uuid")
    id!: string;

    @Column({unique: true})
    email!: string;

    @Column()
    nickname!: string;

    @Column()
    private passwordHash!: string;

    @Column({type: "enum", enum: userRoles})
    role!: UserRole;

    static async register(email: string, nickname: string, plainPassword: string, role: UserRole): Promise<User> {
        const user: User = new User();
        user.email = email;
        user.nickname = nickname;
        user.passwordHash = await Bun.password.hash(plainPassword, {algorithm: "bcrypt"});
        user.role = role;

        return user;
    }

    verifypassword(plainPassword: string): Promise<boolean> {
        return Bun.password.verify(plainPassword, this.passwordHash);
    }
}