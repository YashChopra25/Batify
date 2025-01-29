import React, { useEffect, useRef, useState, ChangeEvent } from "react";
import QRCodeStyling, { Options, FileExtension } from "qr-code-styling";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

const QRcodeGenerator = () => {
  const [options, setOptions] = useState<Options>({
    width: 300,
    height: 300,
    type: "svg",
    data: "",
    image: "",
    margin: 1,
    qrOptions: {
      typeNumber: 0,
      mode: "Byte",
      errorCorrectionLevel: "Q",
    },
    imageOptions: {
      hideBackgroundDots: true,
      imageSize: 0.4,
      margin: 10,
      crossOrigin: "anonymous",
      saveAsBlob: true,
    },
    dotsOptions: {
      color: "#222222",
    },
    backgroundOptions: {
      color: "#cccccc",
    },
  });
  const [fileExt, setFileExt] = useState<FileExtension>("svg");
  const [inputValue, setInputValue] = useState<string>("");
  const [qrCode, setQrCode] = useState<QRCodeStyling>();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setQrCode(new QRCodeStyling(options));
  }, []);

  useEffect(() => {
    if (ref.current) {
      qrCode?.append(ref.current);
    }
  }, [qrCode, ref]);

  useEffect(() => {
    if (!qrCode) return;
    qrCode?.update(options);
  }, [qrCode, options]);

  const onDataChange = (data: string) => {
    setOptions((options) => ({
      ...options,
      data,
    }));
  };

  const onExtensionChange = (event: FileExtension) => {
    setFileExt(event);
  };

  const onDownloadClick = () => {
    if (!qrCode) return;
    qrCode.download({
      extension: fileExt,
    });
  };
  const HandleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onDataChange(inputValue);
  };
  const HandleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setOptions((prevOptions) => ({
          ...prevOptions,
          image: reader.result as string, // Set the image to the file data URL
        }));
      };
      reader.readAsDataURL(file); // Read the image as a base64 data URL
    }
  };

  return (
    <div className="w-full">
      <form className="flex flex-col gap-5" onSubmit={HandleSubmit}>
        <div>
          <label
            htmlFor="QrcodeShorter"
            className="block mb-2 text-4xl font-bold "
          >
            Paste your long link here
          </label>
          <Input
            type="text"
            id="QrcodeShorter"
            placeholder="Enter your long link"
            value={inputValue}
            onChange={(event) => setInputValue(event.target.value)}
            required
          />
        </div>
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <label htmlFor="picture">QR Image</label>
          <Input id="picture" type="file" onChange={HandleImageUpload} />
        </div>
        <Button
          className="w-1/3 mb-4 mx-auto"
          variant={"default"}
          type="submit"
        >
          Generate Link
        </Button>
      </form>
      <div className="grid grid-cols-2">
        <div ref={ref} id="qrcode-preview" />
        {((options?.data?.length as number) || 0) > 0 && (
          <div>
            <div className="flex flex-col gap-2">
              <label className="">Download type</label>
              <Select onValueChange={onExtensionChange}>
                <SelectTrigger>
                  <SelectValue placeholder="SVG" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="svg">SVG</SelectItem>
                  <SelectItem value="png">PNG</SelectItem>
                  <SelectItem value="jpeg">JPEG</SelectItem>
                  <SelectItem value="webp">WEBP</SelectItem>
                </SelectContent>
              </Select>

              <Button variant={"outline"} onClick={onDownloadClick}>
                Download
              </Button>
            </div>
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <label htmlFor="picture">Change the color of the dotss</label>
              <Input
                type="color"
                className="w-1/3"
                value={options?.dotsOptions?.color || "#222222"}
                onChange={(e) =>
                  setOptions({
                    ...options,
                    dotsOptions: { color: e.target.value },
                  })
                }
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default QRcodeGenerator;
