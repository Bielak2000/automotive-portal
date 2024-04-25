import axios from "axios";
import {catchErrors} from "../common";

export const getAllBrands = () => {
    return axios({
        url: process.env.NEXT_PUBLIC_API_URL + `/api/vehicle/brands`
    }).then((response) => {
        return response;
    }).catch((error) => {
        return catchErrors(error);
    })
}

export const getModelsByBrand = (brand: string) => {
    return axios({
        url: process.env.NEXT_PUBLIC_API_URL + `/api/vehicle/models/${brand}`
    }).then((response) => {
        return response;
    }).catch((error) => {
        return catchErrors(error);
    })
}