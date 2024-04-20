export type UserDTO = {
    name: string;
    surname: string;
    email: string
    createdAt: Date;
    lastActivityAt: Date;
    vehicleId: string | null;
}
