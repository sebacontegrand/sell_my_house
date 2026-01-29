"use client";

import { useState } from "react";
import Image from "next/image";
import { IoCloseCircle, IoCloudUploadOutline } from "react-icons/io5";

interface PhotoUploadProps {
    photos: string[];
    onPhotosChange: (photos: string[]) => void;
    maxPhotos?: number;
}

export const PhotoUpload = ({ photos, onPhotosChange, maxPhotos = 10 }: PhotoUploadProps) => {
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (!files || files.length === 0) return;

        if (photos.length + files.length > maxPhotos) {
            setError(`Máximo ${maxPhotos} fotos permitidas`);
            return;
        }

        setUploading(true);
        setError(null);

        try {
            const uploadPromises = Array.from(files).map(async (file) => {
                const formData = new FormData();
                formData.append("file", file);

                const response = await fetch("/api/upload", {
                    method: "POST",
                    body: formData,
                });

                if (!response.ok) {
                    const error = await response.json();
                    throw new Error(error.error || "Error al subir foto");
                }

                const data = await response.json();
                return data.url;
            });

            const urls = await Promise.all(uploadPromises);
            onPhotosChange([...photos, ...urls]);
        } catch (err) {
            setError(err instanceof Error ? err.message : "Error al subir fotos");
        } finally {
            setUploading(false);
            e.target.value = "";
        }
    };

    const removePhoto = (index: number) => {
        const newPhotos = photos.filter((_, i) => i !== index);
        onPhotosChange(newPhotos);
    };

    return (
        <div className="space-y-4">
            <div className="flex items-center gap-4">
                <label className="cursor-pointer">
                    <div className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition">
                        <IoCloudUploadOutline size={20} />
                        <span>{uploading ? "Subiendo..." : "Subir Fotos"}</span>
                    </div>
                    <input
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={handleFileChange}
                        disabled={uploading || photos.length >= maxPhotos}
                        className="hidden"
                    />
                </label>
                <span className="text-sm text-gray-500">
                    {photos.length}/{maxPhotos} fotos
                </span>
            </div>

            {error && (
                <div className="p-3 bg-red-100 text-red-700 rounded-lg text-sm">
                    {error}
                </div>
            )}

            {photos.length > 0 && (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {photos.map((photo, index) => (
                        <div key={index} className="relative group">
                            <Image
                                src={photo}
                                alt={`Foto ${index + 1}`}
                                width={200}
                                height={200}
                                className="w-full h-32 object-cover rounded-lg"
                            />
                            <button
                                type="button"
                                onClick={() => removePhoto(index)}
                                className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition"
                            >
                                <IoCloseCircle size={24} />
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};
