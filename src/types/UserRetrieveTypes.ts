
export interface UserRetrieveInterface2 {
    email: string,
    pseudo: string,
    name: string,
    image: string | null,
}
export interface UserRetrieveInterface extends UserRetrieveInterface2{
    is_staff: boolean,
    is_superuser: boolean,
}

