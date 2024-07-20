import { useEffect, useState } from "react";

export function useConvertImgToFile( imageUrl: string, title: string) {
    const [file, setFile] = useState<File | null>(null);

    useEffect(() => {
        const convertImgToFile = async () => {
            const response = await fetch(imageUrl);
            const blob = await response.blob();
            const file = new File([blob], title, { type: "image/png" });
            setFile(file);
        }   

        convertImgToFile();
    }, [imageUrl, title])

    return file;
}