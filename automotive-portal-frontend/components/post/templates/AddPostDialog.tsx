import React, {useEffect, useRef, useState} from "react";
import {Dialog} from "primereact/dialog";
import {useFormik} from "formik";
import {PostDataValidation, PostFormDTO} from "../types";
import {Button} from "primereact/button";
import {Toast} from "primereact/toast";
import {InputTextField} from "../../common/atoms/InputTextField";
import DropDownField from "../../common/atoms/DropDownField";
import {DropDownType, UserDTO} from "../../common/types";
import {getBrands, getModels} from "../../common/organisms/VehicleFunctions";
import {
    FileUpload,
    FileUploadHeaderTemplateOptions,
    FileUploadSelectEvent,
    ItemTemplateOptions
} from "primereact/fileupload";
import {Tooltip} from "primereact/tooltip";
import {ProgressBar} from "primereact/progressbar";
import {InputTextarea} from "primereact/inputtextarea";

type AddPostDialogProps = {
    showDialog: boolean;
    user: UserDTO;

    setShowDialog: (val: boolean) => void;
}

const AddPostDialog: React.FC<AddPostDialogProps> = ({showDialog, user, setShowDialog}) => {
    const toast = useRef<Toast>(null);
    const fileUploadRef = useRef<FileUpload>(null);
    const [imagesNumber, setImagesNumber] = useState<number>(0);
    const postTypeValues: DropDownType[] = [{
        name: "usterka",
        code: "fault"
    }, {name: "kupie", code: "buy"}, {name: "sprzedam", code: "sell"}, {name: "ogólny", code: "question"}];
    const [selectedPostType, setSelectedPostType] = useState<DropDownType>();
    const [vehicleBrandValues, setVehicleBrandValues] = useState<DropDownType[]>([]);
    const [vehicleModelValues, setVehicleModelValues] = useState<DropDownType[]>([]);
    const [selectedVehicleBrand, setSelectedVehicleBrand] = useState<DropDownType | null>(user.vehicleBrand ? {
        name: user.vehicleBrand,
        code: user.vehicleBrand
    } : null);
    const [selectedVehicleModel, setSelectedVehicleModel] = useState<DropDownType | null>(user.vehicleModel ? {
        name: user.vehicleModel,
        code: user.vehicleModel
    } : null)
    const formik = useFormik<PostFormDTO>({
        initialValues: {
            title: "",
            content: "",
            vehicleBrand: "",
            postType: null,
            vehicleModel: null
        },
        validationSchema: PostDataValidation,
        validateOnChange: false,
        onSubmit: (data) => {
            console.log(data);
            console.log(fileUploadRef.current.getFiles())
            console.log(selectedVehicleBrand)
            // if (!selectedVehicleBrand) {
            //     toast.current?.show({
            //         severity: "error",
            //         summary: "Błędne dane",
            //         detail: "Marka pojazdu jest wymagana.",
            //         life: 8000
            //     })
            // }
            // handleLogin(data);
            // formik.resetForm();
        }
    });

    useEffect(() => {
        getBrands(toast, setVehicleBrandValues);
    }, []);

    useEffect(() => {
        formik.setFieldValue('vehicleBrand', !selectedVehicleBrand ? null : selectedVehicleBrand.code);
        if (!selectedVehicleBrand) {
            setSelectedVehicleModel(null);
            setVehicleModelValues([]);
        } else {
            getModels(toast, selectedVehicleBrand, setVehicleModelValues);
        }
    }, [selectedVehicleBrand]);

    useEffect(() => {
        formik.setFieldValue('vehicleModel', !selectedVehicleModel ? null : selectedVehicleModel.code);
    }, [selectedVehicleModel]);

    useEffect(() => {
        formik.setFieldValue('postType', !selectedPostType ? null : selectedPostType.code);
    }, [selectedPostType]);

    useEffect(() => {
        if (imagesNumber > 2) {
            toast.current?.show({
                severity: "warn",
                summary: "Błędne dane",
                detail: "Zbyt dużo wgranych zdjęć.",
                life: 5000
            });
            // document.getElementById('.custom-cancel-btn')!.click();
            setImagesNumber(0);
            fileUploadRef.current?.clear();
        }
    }, [imagesNumber]);

    // const handleLogin = (data: LoginData) => {
    //     login(data).then((response) => {
    //         if (response.status === 401) {
    //             toast.current?.show({
    //                 severity: "error",
    //                 summary: "Błędne dane uwierzytelniające",
    //                 detail: "Wprowadzony login lub hasło są nieprawidłowe.",
    //                 life: 5000
    //             })
    //         } else {
    //             toast.current?.show({
    //                 severity: "success",
    //                 summary: "Zalogowano",
    //                 detail: "Zostałeś zalogowany do systemu.",
    //                 life: 3000
    //             })
    //             setRefreshData(true);
    //             saveTokenInCookies(response.data.token);
    //             saveUserEmailInLocalStorage(response.data.email);
    //             setShowDialog(false);
    //         }
    //     })
    // }

    const cancel = () => {
        setShowDialog(false);
        setSelectedPostType(undefined);
        setSelectedVehicleBrand(null);
        setImagesNumber(0);
        formik.resetForm();
    }

    const footer = <div className="add-post-footer" style={{marginTop: "35px"}}>
        <Button className="user-form-button cancel-button" label="Anuluj" icon="pi pi-times" type="button"
                style={{maxWidth: "150px"}}
                onClick={cancel}/>
        <Button className="user-form-button confirm-button" label="Dodaj" icon="pi pi-check" type="submit"
                style={{maxWidth: "150px"}}/>
    </div>

    const onTemplateSelect = (e: FileUploadSelectEvent) => {
        setImagesNumber(e.files.length);
    };

    const onTemplateRemove = (file: File, callback: Function) => {
        setImagesNumber(imagesNumber - 1);
        callback();
    };

    const onTemplateClear = () => {
        setImagesNumber(0);
    };

    const headerTemplate = (options: FileUploadHeaderTemplateOptions) => {
        const {className, chooseButton, uploadButton, cancelButton} = options;
        const value = imagesNumber * 50;

        return (
            <div className={className}
                 style={{backgroundColor: 'transparent', display: 'flex', alignItems: 'center', maxHeight: "65px"}}>
                {chooseButton}
                {cancelButton}
                <div className="flex align-items-center gap-3 ml-auto">
                    <span>{imagesNumber} / 2</span>
                    <ProgressBar value={value} showValue={false} style={{width: '10rem', height: '12px'}}/>
                </div>
            </div>
        );
    };

    const itemTemplate = (inFile: object, props: ItemTemplateOptions) => {
        const file = inFile as File;
        return (
            <div className="flex align-items-center flex-wrap">
                <div className="flex align-items-center" style={{width: '40%'}}>
                    {/* @ts-ignore */}
                    <img alt={file.name} role="presentation" src={file.objectURL} width={100}/>
                    <span className="flex flex-column text-left ml-3">
                        {file.name}
                        <small>{new Date().toLocaleDateString()}</small>
                    </span>
                </div>
                <Button type="button" icon="pi pi-times"
                        className="p-button-outlined p-button-rounded p-button-danger ml-auto"
                        onClick={() => onTemplateRemove(file, props.onRemove)}/>
            </div>
        );
    };

    const emptyTemplate = () => {
        return (
            <div className="flex align-items-center flex-column">
                <i className="pi pi-image" style={{
                    fontSize: '5em',
                    height: "0",
                    borderRadius: '50%',
                    backgroundColor: 'var(--surface-b)',
                    color: 'var(--surface-d)'
                }}></i>
                <span style={{fontSize: '1.2em', color: 'var(--text-color-secondary)'}} className="my-5">
                    Przeciągnij i upuść tutaj zdjęcie
                </span>
            </div>
        );
    };

    const chooseOptions = {
        icon: 'pi pi-fw pi-images',
        iconOnly: true,
        className: 'custom-choose-btn p-button-rounded p-button-outlined'
    };

    const cancelOptions = {
        icon: 'pi pi-fw pi-times',
        iconOnly: true,
        className: 'custom-cancel-btn p-button-danger p-button-rounded p-button-outlined'
    };

    return <>
        <Toast ref={toast}/>
        <Dialog visible={showDialog} onHide={cancel}
                className="dialog add-post-dialog"
                style={{maxWidth: "80%"}}
                header={"Nowy post"} headerClassName="dialogHeader">
            <form onSubmit={formik.handleSubmit}>
                <div>
                    <DropDownField description="Typ postu*" values={postTypeValues}
                                   spanErrorStyle={{
                                       marginTop: "3px",
                                       border: formik.errors['postType'] ? "1px solid red" : "",
                                       borderRadius: "10px"
                                   }}
                                   selectedValue={selectedPostType} filter={false}
                                   setSelectedValue={(val) => setSelectedPostType(val)}/>
                    {formik.errors['postType'] &&
                        <small className="p-error" style={{fontSize: "15px"}}>Pole wymagane</small>}
                    <InputTextField className="inputTextFieldForm user-input-text-field marginTop"
                                    classNameInput="inputTextField"
                                    formik={formik} fieldName={'title'} label={'Tytuł*'}/>
                    <label className="content-area-label"
                           style={formik.errors['content'] ? {color: "red"} : {}}>Opis*</label>
                    <InputTextarea className="content-area" variant="filled" value={formik.values.content}
                                   style={formik.errors['content'] ? {
                                       border: '1px solid red',
                                       borderRadius: '6px'
                                   } : {}}
                                   onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => formik.setFieldValue("content", e.target.value)}
                                   rows={5} cols={30}/>
                    {formik.errors['content'] &&
                        <small className="p-error" style={{fontSize: "15px"}}>Pole wymagane</small>}
                    <DropDownField description="Wybierz pojazd*" values={vehicleBrandValues}
                                   spanErrorStyle={{
                                       marginTop: "3px",
                                       border: formik.errors['vehicleBrand'] ? "1px solid red" : "",
                                       borderRadius: "10px"
                                   }}
                                   divStyle={{marginTop: "1rem"}}
                                   selectedValue={selectedVehicleBrand} filter={true}
                                   setSelectedValue={(val) => setSelectedVehicleBrand(val)}/>
                    {formik.errors['vehicleBrand'] &&
                        <small className="p-error" style={{fontSize: "15px"}}>Pole wymagane</small>}
                    <DropDownField description="Wybierz model" values={vehicleModelValues}
                                   selectedValue={selectedVehicleModel} filter={true}
                                   divStyle={{marginTop: "1rem"}}
                                   setSelectedValue={(val) => setSelectedVehicleModel(val)}
                                   disabled={!selectedVehicleBrand}/>
                    <Tooltip target=".custom-choose-btn" content="Wybierz plik" position="bottom"/>
                    <Tooltip target=".custom-cancel-btn" content="Wyczyść" position="bottom"/>
                    <FileUpload ref={fileUploadRef} name="demo[]" url="/api/upload" multiple accept="image/*"
                                contentStyle={{maxHeight: imagesNumber === 0 ? "140px" : "none"}}
                                maxFileSize={1000000}
                                onSelect={onTemplateSelect} onError={onTemplateClear}
                                onClear={onTemplateClear}
                                headerTemplate={headerTemplate} itemTemplate={itemTemplate}
                                emptyTemplate={emptyTemplate}
                                chooseOptions={chooseOptions}
                                cancelOptions={cancelOptions}/>
                </div>
                <p style={{width: "100%", textAlign: "center"}}>* - pole wymagane</p>
                {footer}
            </form>
        </Dialog>
    </>
}

export default AddPostDialog;