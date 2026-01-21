"use client";

import { useState, useRef, useCallback } from "react";
import { Upload, X, ZoomIn, ZoomOut, RotateCw, Check, Image as ImageIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

interface ImageUploaderProps {
  value?: string;
  onChange: (url: string) => void;
  aspectRatio?: "square" | "landscape" | "portrait" | "hero";
  className?: string;
  label?: string;
  hint?: string;
}

const aspectRatios = {
  square: { width: 1, height: 1, label: "1:1" },
  landscape: { width: 16, height: 9, label: "16:9" },
  portrait: { width: 3, height: 4, label: "3:4" },
  hero: { width: 1920, height: 1080, label: "Hero (1920x1080)" },
};

export function ImageUploader({
  value,
  onChange,
  aspectRatio = "landscape",
  className,
  label = "Upload Image",
  hint,
}: ImageUploaderProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(value || null);
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [tempImage, setTempImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleFile(files[0]);
    }
  }, []);

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleFile(files[0]);
    }
  };

  const handleFile = (file: File) => {
    if (!file.type.startsWith("image/")) {
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      setTempImage(result);
      setZoom(1);
      setRotation(0);
      setIsEditorOpen(true);
    };
    reader.readAsDataURL(file);
  };

  const handleSave = () => {
    if (tempImage) {
      // In production, this would upload to storage and return URL
      // For now, we'll use the data URL
      setPreviewUrl(tempImage);
      onChange(tempImage);
      setIsEditorOpen(false);
    }
  };

  const handleRemove = () => {
    setPreviewUrl(null);
    onChange("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const ratio = aspectRatios[aspectRatio];
  const paddingBottom = (ratio.height / ratio.width) * 100;

  return (
    <>
      <div className={cn("space-y-2", className)}>
        {label && (
          <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
            {label}
          </label>
        )}
        
        {previewUrl ? (
          <div className="relative group">
            <div 
              className="relative overflow-hidden rounded-lg border border-border bg-muted"
              style={{ paddingBottom: `${paddingBottom}%` }}
            >
              {/* Using standard img for blob/data URLs to avoid next/image config issues during preview */}
              <img
                src={previewUrl}
                alt="Uploaded image"
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-background/80 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => fileInputRef.current?.click()}
                  aria-label="Replace image"
                >
                  Replace
                </Button>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={handleRemove}
                  aria-label="Remove image"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        ) : (
          <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            className={cn(
              "relative cursor-pointer rounded-lg border-2 border-dashed transition-colors",
              isDragging
                ? "border-primary bg-primary/5"
                : "border-border hover:border-primary/50",
              "flex flex-col items-center justify-center text-center"
            )}
            style={{ paddingBottom: `${paddingBottom}%` }}
            aria-label="Upload image area"
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                fileInputRef.current?.click();
              }
            }}
          >
            <div className="absolute inset-0 flex flex-col items-center justify-center p-6">
              <ImageIcon className="h-10 w-10 text-muted-foreground mb-3" aria-hidden="true" />
              <p className="text-sm font-medium text-foreground mb-1">
                {isDragging ? "Drop image here" : "Click to upload"}
              </p>
              <p className="text-xs text-muted-foreground">
                or drag and drop
              </p>
              <p className="text-xs text-muted-foreground mt-2">
                Recommended: {ratio.label}
              </p>
            </div>
          </div>
        )}

        {hint && (
          <p className="text-xs text-muted-foreground">{hint}</p>
        )}

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileInput}
          className="hidden"
          aria-hidden="true"
        />
      </div>

      {/* Image Editor Dialog */}
      <Dialog open={isEditorOpen} onOpenChange={setIsEditorOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="font-display">Edit Image</DialogTitle>
          </DialogHeader>

          <div className="space-y-6">
            {/* Preview Area */}
            <div 
              className="relative overflow-hidden rounded-lg border border-border bg-muted"
              style={{ paddingBottom: `${Math.min(paddingBottom, 60)}%` }}
            >
              {tempImage && (
                <img
                  src={tempImage}
                  alt="Preview"
                  className="absolute inset-0 w-full h-full object-contain transition-transform"
                  style={{
                    transform: `scale(${zoom}) rotate(${rotation}deg)`,
                  }}
                />
              )}
            </div>

            {/* Controls */}
            <div className="space-y-4">
              {/* Zoom Control */}
              <div className="flex items-center gap-4">
                <ZoomOut className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
                <Slider
                  value={[zoom]}
                  onValueChange={([value]) => setZoom(value)}
                  min={0.5}
                  max={2}
                  step={0.1}
                  className="flex-1"
                  aria-label="Zoom"
                />
                <ZoomIn className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
                <span className="text-sm text-muted-foreground w-12 text-right">
                  {Math.round(zoom * 100)}%
                </span>
              </div>

              {/* Rotation Control */}
              <div className="flex items-center gap-4">
                <RotateCw className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
                <Slider
                  value={[rotation]}
                  onValueChange={([value]) => setRotation(value)}
                  min={0}
                  max={360}
                  step={1}
                  className="flex-1"
                  aria-label="Rotate"
                />
                <span className="text-sm text-muted-foreground w-12 text-right">
                  {rotation}°
                </span>
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditorOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSave} className="gap-2">
              <Check className="h-4 w-4" aria-hidden="true" />
              Apply
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
