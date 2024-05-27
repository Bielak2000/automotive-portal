import React, {useEffect, useRef, useState} from "react";
import {Dialog} from "primereact/dialog";
import {useFormik} from "formik";
import {PostDataValidation, PostDTO, PostFormDTO} from "../types";
import {Button} from "primereact/button";
import {Toast} from "primereact/toast";
import {InputTextField} from "../../common/atoms/InputTextField";
import DropDownField from "../../common/atoms/DropDownField";
import {DropDownType, postTypes, UserDTO} from "../../common/types";
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
import {addPostWithImages, updatePost} from "../../../lib/api/post";
import axios from "axios";

type AddPostDialogProps = {
    showDialog: boolean;
    user: UserDTO;
    editPost: boolean;
    post?: PostDTO

    setShowDialog: (val: boolean) => void;
    setRequireRefreshPost: (val: boolean) => void;
}

const AddPostDialog: React.FC<AddPostDialogProps> = ({
                                                         showDialog,
                                                         user,
                                                         editPost,
                                                         post,
                                                         setShowDialog,
                                                         setRequireRefreshPost
                                                     }) => {
    const toast = useRef<Toast>(null);
    const fileUploadRef = useRef<FileUpload>(null);
    const [imagesNumber, setImagesNumber] = useState<number>(0);
    const [selectedPostType, setSelectedPostType] = useState<DropDownType>();
    const [vehicleBrandValues, setVehicleBrandValues] = useState<DropDownType[]>([]);
    const [vehicleModelValues, setVehicleModelValues] = useState<DropDownType[]>([]);
    const [selectedVehicleBrand, setSelectedVehicleBrand] = useState<DropDownType | null>(null);
    const [selectedVehicleModel, setSelectedVehicleModel] = useState<DropDownType | null>(null);
    const [files, setFiles] = useState([]);
    const oldValue = post;
    const formik = useFormik<PostFormDTO>({
        initialValues: editPost ? {
            title: post!.title,
            content: post!.content,
            vehicleBrand: post!.vehicleBrand,
            postType: post!.postType,
            vehicleModel: post!.vehicleModel
        } : {
            title: "",
            content: "",
            vehicleBrand: "",
            postType: null,
            vehicleModel: null
        },
        validationSchema: PostDataValidation,
        validateOnChange: false,
        onSubmit: (data) => {
            let correctFilesType = true;
            fileUploadRef.current!.getFiles().forEach((file) => {
                if (file.type !== "image/png" && file.type !== "image/jpg" && file.type !== "image/jpeg") {
                    correctFilesType = false;
                }
            })
            if (correctFilesType) {
                if (editPost) {
                    if (checkNewValue(data)) {
                        saveEditedPost(data);
                    } else {
                        toast.current?.show({
                            severity: "warn",
                            summary: "Brak zmian",
                            detail: "Nie wprowadzono żadnych zmian. Pamiętaj, że nowe zdjęcie musi mieć inną nazwę niż dotychczas.",
                            life: 8000
                        });
                    }
                } else {
                    addPost(data);
                }
            } else {
                toast.current?.show({
                    severity: "error",
                    summary: "Błędne dane",
                    detail: "Typ plików jest błędny.",
                    life: 5000
                });
            }
        }
    });

    useEffect(() => {
        if (showDialog) {
            getBrands(toast, setVehicleBrandValues);
            if (!editPost) {
                setSelectedVehicleBrand(user.vehicleBrand ? {name: user.vehicleBrand, code: user.vehicleBrand} : null);
                setSelectedVehicleModel(user.vehicleModel ? {name: user.vehicleModel, code: user.vehicleModel} : null);
            } else {
                setSelectedPostType(postTypes.find(value => value.code === post!.postType));
                setSelectedVehicleBrand({name: post!.vehicleBrand, code: post!.vehicleBrand});
                setSelectedVehicleModel(post!.vehicleModel ? {
                    name: post!.vehicleModel,
                    code: post!.vehicleModel
                } : null);
                const fetchImages = async () => {
                    try {
                        if (post!.images !== null && post!.images.length !== 0) {
                            const responses = await Promise.all([
                                post!.images[0] ? axios.get(`http://localhost:8080/api/posts/${post!.postId}/${post!.images[0]}`, {responseType: 'arraybuffer'}) : null,
                                post!.images[1] ? axios.get(`http://localhost:8080/api/posts/${post!.postId}/${post!.images[1]}`, {responseType: 'arraybuffer'}) : null
                            ]);
                            const filesTemp = await Promise.all(responses.map(async (response, index) => {
                                if (response !== null) {
                                    const base64Image = Buffer.from(response.data, 'binary').toString('base64');
                                    const mimeType = response.headers['content-type'];
                                    const dataUrl = `data:${mimeType};base64,${base64Image}`;
                                    const blob = await fetch(dataUrl).then(res => res.blob());
                                    const file = new File([blob], `${post!.images[index].split("_")[1]}`, {type: mimeType});
                                    // @ts-ignore
                                    file.objectURL = URL.createObjectURL(file);
                                    return file;
                                }
                            }));
                            const files1 = filesTemp.filter((file) => file !== undefined && file !== null);
                            // @ts-ignore
                            setFiles(files1);
                        }

                    } catch (error) {
                        console.error('Error fetching the images', error);
                    }
                };
                fetchImages();
            }
        }
    }, [showDialog]);

    useEffect(() => {
        if (files.length > 0 && fileUploadRef.current) {
            fileUploadRef.current.setFiles(files);
        }
        setImagesNumber(files.length);
    }, [files]);

    useEffect(() => {
        if (showDialog && selectedVehicleBrand !== null) {
            loadModels();
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
            setImagesNumber(0);
            fileUploadRef.current?.clear();
        }
    }, [imagesNumber]);

    const checkNewValue = (data: PostFormDTO) => {
        const descriptionChanges = data.postType !== oldValue!.postType || data.title !== oldValue!.title ||
            data.content !== oldValue!.content || data.vehicleBrand !== oldValue!.vehicleBrand || data.vehicleModel !== oldValue!.vehicleModel;
        let imageChanges = false;
        if (files.length !== fileUploadRef.current!.getFiles().length) {
            imageChanges = true;
        } else {
            fileUploadRef.current!.getFiles().forEach((file) => {
                files.forEach((oldFile) => {
                    // @ts-ignore
                    if (oldFile.name !== file.name) {
                        imageChanges = true;
                    }
                })
            })
        }
        return descriptionChanges || imageChanges;
    }

    const loadModels = () => {
        formik.setFieldValue('vehicleBrand', !selectedVehicleBrand ? null : selectedVehicleBrand.code);
        if (!selectedVehicleBrand) {
            setVehicleModelValues([]);
        } else {
            getModels(toast, selectedVehicleBrand, setVehicleModelValues);
            if (selectedVehicleBrand?.code !== user.vehicleBrand) {
                setSelectedVehicleModel(null);
            }
        }
    }

    const addPost = (data: PostFormDTO) => {
        addPostWithImages(data, fileUploadRef.current!.getFiles()).then((response) => {
            if (response.status === 401) {
                toast.current?.show({
                    severity: "error",
                    summary: "Błędne dane uwierzytelniające",
                    detail: "Wprowadzony login lub hasło są nieprawidłowe.",
                    life: 5000
                });
            } else {
                toast.current?.show({
                    severity: "success",
                    summary: "Post został dodany",
                    detail: "Stworzony post został dodany i opublikowany.",
                    life: 5000
                });
                setRequireRefreshPost(true);
                cancel();
            }
        })
    }

    const saveEditedPost = (data: PostFormDTO) => {
        updatePost(data, fileUploadRef.current!.getFiles(), post!.postId).then((response) => {
            if (response.status === 401) {
                toast.current?.show({
                    severity: "error",
                    summary: "Błędne dane uwierzytelniające",
                    detail: "Wprowadzony login lub hasło są nieprawidłowe.",
                    life: 5000
                });
            } else {
                toast.current?.show({
                    severity: "success",
                    summary: "Zedytowano post",
                    detail: "Post został zmieniony i opublikowany.",
                    life: 5000
                });
                setRequireRefreshPost(true);
                cancel();
            }
        })
    }

    const cancel = () => {
        setShowDialog(false);
        setSelectedPostType(undefined);
        if (user.vehicleBrand) {
            setSelectedVehicleBrand({
                name: user.vehicleBrand,
                code: user.vehicleBrand
            })
        } else {
            setSelectedVehicleBrand(null);
        }
        if (user.vehicleModel) {
            setSelectedVehicleModel({
                name: user.vehicleModel,
                code: user.vehicleModel
            })
        } else {
            setSelectedVehicleModel(null);
        }
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
                    Brak załączników
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
                    <DropDownField description="Typ postu*" values={postTypes}
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