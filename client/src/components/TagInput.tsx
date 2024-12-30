import React, { KeyboardEvent, useState } from 'react'
import { Badge } from './ui/badge';
import { X } from 'lucide-react';
import { Input } from './ui/input';

interface TagInputProps {
    tags: string[];
    onAddTag: (tag: string) => void;
    onRemoveTag:(tag: string) => void
}



export const TagInput: React.FC<TagInputProps> = ({tags,onAddTag,onRemoveTag}) => {
    const [input,setInput] = useState("")

    const handlekeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if(e.key === "Enter" && input.trim()) {
            e.preventDefault()
            onAddTag(input.trim())
            setInput("")
        }
    }
    
    return (
        <div className="flex flex-wrap gap-2 items-center">
            {tags.map((tag) => (
                <Badge key={tag} variant="secondary" className="flex items-center gap-1">
                    {tag}
                    <X size={14} className="cursor pointer" onClick={() => onRemoveTag(tag)} />
                </Badge>
            ))}
            <Input
            type='text'
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handlekeyDown}
            className='flex flex-row items-center gap-2 border h-[50px] shadow-none'
            placeholder='Enter a skill and press enter'

             />
        </div>
    )
}