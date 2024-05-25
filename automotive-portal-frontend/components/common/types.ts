export type UserDTO = {
    id: string;
    name: string;
    surname: string;
    email: string;
    phoneNumber: string | null;
    createdAt: Date;
    lastActivityAt: Date;
    vehicleBrand: string | null;
    vehicleModel: string | null;
}

export interface DropDownType {
    name: string;
    code: string;
}
