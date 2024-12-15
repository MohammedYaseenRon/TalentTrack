"use client";

import React, { useState, useRef } from 'react';
import { File as FileIcon } from 'lucide-react';
import { Label } from './ui/label';
import { Input } from './ui/input';

interface ProjectProps {
    projectName: string;
    projectDescription: string;
    techStack: string;
    livedemo: string;    
    sourcecode: string;    
    tags: string[];
    images: File[]     
}

interface ImagePickerProps {
    onImageSelected?: (files: File[]) => void;
    multiple?: boolean;
    maxFiles?: number;
    maxSizeInMB?: number;
}

export const ImagePicker: React.FC<ImagePickerProps> = ({
    onImageSelected,
    multiple = true,
    maxFiles = 3,
    maxSizeInMB = 5
}) => {
    const [selectedImages, setSelectedImages] = useState<File[]>([]);
    const [previews, setPreviews] = useState<string[]>([]);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (!files) return;

        const fileArray = Array.from(files);

        // Validate number of files
        if (fileArray.length > maxFiles) {
            alert(`You can select up to ${maxFiles} files`);
            return;
        }

        // Validate file sizes
        const oversizedFiles = fileArray.filter(
            file => file.size > maxSizeInMB * 1024 * 1024
        );
        if (oversizedFiles.length > 0) {
            alert(`Files must be smaller than ${maxSizeInMB}MB`);
            return;
        }

        // Create file previews
        const newPreviews = fileArray.map(file => URL.createObjectURL(file));
        
        setSelectedImages(fileArray);
        setPreviews(newPreviews);
    
        // Call optional callback
        if (onImageSelected) {
            onImageSelected(fileArray);
        }
    };

    const removeImage = (indexToRemove: number) => {
        const newImages = selectedImages.filter((_, index) => index !== indexToRemove);
        const newPreviews = previews.filter((_, index) => index !== indexToRemove);
        
        setSelectedImages(newImages);
        setPreviews(newPreviews);

        // Reset file input
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }

        // Call callback if provided
        if (onImageSelected) {
            onImageSelected(newImages);
        }
    };

    return (
        <div className="space-y-2">
            <Label className="text-sm font-medium text-gray-700">
                Upload Project Images
            </Label>
            <div className="flex items-center gap-2">
                <Input 
                    type="file" 
                    ref={fileInputRef}
                    accept="image/*"
                    multiple={multiple}
                    onChange={handleFileChange}
                    className="hidden"
                />
                <button 
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded"
                >
                    <FileIcon className="w-5 h-5" />
                    Select Images
                </button>
            </div>

            {/* Image Previews */}
            {previews.length > 0 && (
                <div className="flex gap-2 mt-2">
                    {previews.map((preview, index) => (
                        <div key={index} className="relative">
                            <img 
                                src={preview} 
                                alt={`Preview ${index + 1}`} 
                                className="w-20 h-20 object-cover rounded"
                            />
                            <button
                                type="button"
                                onClick={() => removeImage(index)}
                                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs"
                            >
                                ×
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};