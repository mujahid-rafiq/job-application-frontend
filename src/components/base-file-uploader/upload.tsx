import { useRef, useState } from "react";
import "./uploader.css"


export default function DragDropFile(props?: any) {
    const [dragActive, setDragActive] = useState(false);
    const inputRef = useRef<any>(null);

    const convertToBase64 = (file?:any) => {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file);
            fileReader.onload = () => {
                resolve(fileReader.result);
            };
            fileReader.onerror = (error) => {
                reject(error);
            };
        });
    };


    async function handleFile(files: any) {
        const base64 = await convertToBase64(files[0]);
        props?.setImagePreview(base64)
        props?.setCharacterImage(files[0])
    }

    const handleDrag = function (e: any) {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true);
        } else if (e.type === "dragleave") {
            setDragActive(false);
        }
    };

    // triggers when file is dropped
    const handleDrop = function (e: any) {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            handleFile(e.dataTransfer.files);
        }
    };

    // triggers when file is selected with click
    const handleChange = function (e: any) {
        e.preventDefault();

        if (e.target.files && e.target.files[0]) {
            handleFile(e.target.files);
        }
    };

    // triggers the input when the button is clicked
    // const onButtonClick = () => {
    //     inputRef?.current?.click();
    // };

    return (
        <>
            <form id="form-file-upload" className={`${props?.className ? props?.className : ""}`} onDragEnter={handleDrag} onSubmit={(e) => e.preventDefault()}>
                <input ref={inputRef} type="file" id="input-file-upload" multiple={true} onChange={handleChange} />
                <label id="label-file-upload" htmlFor="input-file-upload" className={dragActive ? "drag-active" : ""}>
                    <div className="text-[14px] font-semibold flex flex-col items-center justify-center">
                        <div className="p-4 bg-[#E5E7EB] rounded-xl">
                            FolderIcon
                        </div>
                        <p className="text-[#6B7280]">Drag and drop or
                            <span className="upload-button text-[#FBAB37]">Browse</span></p>
                        <span className="text-[10px] text-[#ACACAC] ">Support all image format</span>
                    </div>
                </label>
                {dragActive && <div id="drag-file-element" onDragEnter={handleDrag} onDragLeave={handleDrag} onDragOver={handleDrag} onDrop={handleDrop}></div>}
            </form>
        </>

    );
}
