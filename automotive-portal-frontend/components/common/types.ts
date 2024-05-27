export interface NotificationDTO {
    id: string;
    content: string;
    read: boolean;
    postId: string;
    createdAt: Date;
}

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
    notifications: NotificationDTO[];
}

export interface DropDownType {
    name: string;
    code: string;
}

export const postTypes: DropDownType[] = [{
    name: "usterka",
    code: "FAULT"
}, {name: "kupie", code: "BUY"}, {name: "sprzedam", code: "SELL"}, {name: "ogólny", code: "QUESTION"}];
