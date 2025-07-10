import { convertFileToUrl } from "@/lib/utils";
import { CloudUploadIcon } from "lucide-react";
import { useCallback } from "react";
import { useDropzone } from "react-dropzone";

type FileUploaderProps = {
  files: File[] | string | undefined;
  onChange: (files: File[]) => void;
};

const FileUploader = ({ files, onChange }: FileUploaderProps) => {
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      onChange(acceptedFiles);
    },
    [onChange]
  );
  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <div {...getRootProps()} className="file-upload-wrapper cursor-pointer">
      <input {...getInputProps()} className="file-upload" />
      {files && (Array.isArray(files) ? files.length > 0 : true) ? (
        <img src={Array.isArray(files) ? convertFileToUrl(files[0]) : files} className="w-fit h-fit overflow-hidden object-cover" alt="upload-image" />
      ) : (
        <div className="flex flex-col justify-center items-center">
          <CloudUploadIcon className="text-green-500" />
          <div className="space-y-2 mt-2">
            <p className="file-upload-text">
              <span className="text-green-500">Click to upload</span>
              <span className="hidden sm:inline">
                {" "}
                or Drag 'n' drop files here
              </span>
            </p>
            <p className="file-upload-text">
              svg, png, jpg or gif (max 800×400)
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default FileUploader;
