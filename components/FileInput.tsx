import React, { useCallback, useState, useMemo } from "react";
import { useDropzone } from "react-dropzone";
import { getUrlFromCid } from "../utils/helpers";
import IpfsService from "../utils/IpfsService";

type Props = {
  setfileIpfsUrl: React.Dispatch<React.SetStateAction<string>>;
};

const FileInput = ({ setfileIpfsUrl }: Props) => {
  const [uploadedFile, setUploadedFile] = useState<File>();
  const ipfsService = useMemo(() => new IpfsService(), []);

  const removeFile = async () => {
    setUploadedFile(null);
  };

  const uploadImageToIpfs = async (file: File): Promise<string> =>
    new Promise((resolve, _) => {
      try {
        const reader = new window.FileReader();
        reader.readAsArrayBuffer(file);
        reader.onloadend = async () => {
          const cid = await ipfsService.pinFile(reader.result as string);
          resolve(getUrlFromCid(cid));
        };
      } catch (err) {
        console.log(err);
        resolve(null);
      }
    });

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      setUploadedFile(acceptedFiles[0]);
      const fileUrl = await uploadImageToIpfs(acceptedFiles[0]);
      setfileIpfsUrl(fileUrl);
    },
    [setfileIpfsUrl]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: false,
  });

  return (
    <div className="my-4">
      <div
        {...getRootProps({
          className: `border-dashed ${
            isDragActive ? "border-blue-300" : "border-base-200"
          } border-2 w-full h-80 rounded flex flex-col justify-center items-center rounded-md`,
        })}
      >
        <input {...getInputProps()} />
        <i className="ri-upload-cloud-2-line text-4xl text-base-300"></i>

        <span className="block text-xl text-base-300">
          Drop your files here
        </span>
      </div>

      {uploadedFile && (
        <div className="relative flex flex-col justify-center items-center border border-base-200 mt-4 py-4 rounded-md">
          {uploadedFile.name}
          <button
            className="absolute right-0 top-0 w-4 h-4 flex justify-center items-center translate-x-1/2 -translate-y-1/2 p-[10px] bg-red-500 text-white rounded-full"
            onClick={removeFile}
          >
            <i className="ri-close-line text-base"></i>
          </button>
        </div>
      )}
    </div>
  );
};

export default FileInput;
