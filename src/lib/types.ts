export type Character = {
    id: string;
    name: string;
    description: string;
    image: string;

    userId: string; // FK -> users.id
};
