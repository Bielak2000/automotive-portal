import {getAllBrands, getModelsByBrand} from "../../../lib/api/vehicle";
import {DropDownType} from "../types";
import {Toast} from "primereact/toast";
import {RefObject} from "react";

export const getBrands = (toast: RefObject<Toast>, setVehicleBrandValues: (values: DropDownType[]) => void) => {
    getAllBrands().then(response => {
        if (response.status === 200) {
            const brandArrayTemp: DropDownType[] = [];
            response.data.forEach((brand: any) => {
                brandArrayTemp.push({name: brand.make, code: brand.make});
            })
            setVehicleBrandValues(brandArrayTemp);
        } else {
            toast.current?.show({
                severity: "error",
                summary: "Błąd pobierania danych",
                detail: "Brak możliwości pobrania pojazdów, spróbuj ponownie za chwilę.",
                life: 8000
            })
        }
    })
}

export const getModels = (toast: RefObject<Toast>, selectedVehicleBrand: DropDownType, setVehicleModelValues: (values: DropDownType[]) => void) => {
    getModelsByBrand(selectedVehicleBrand.code).then(response => {
        if (response.status === 200) {
            const modelsArrayTemp: DropDownType[] = [];
            response.data.forEach((res: any) => {
                modelsArrayTemp.push({name: res.model, code: res.model});
            })
            setVehicleModelValues(modelsArrayTemp);
        } else {
            toast.current?.show({
                severity: "error",
                summary: "Błąd pobierania danych",
                detail: "Brak możliwości pobrania modelów, spróbuj ponownie za chwilę.",
                life: 8000
            })
        }
    })
}
