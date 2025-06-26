import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, X, File, Image, CheckCircle, AlertCircle } from 'lucide-react';
import { clsx } from 'clsx';

interface UploadedFile {
  file: File;
  id: string;
  status: 'uploading' | 'success' | 'error';
  progress?: number;
  error?: string;
}

interface FileUploadProps {
  label?: string;
  accept?: string;
  multiple?: boolean;
  maxSize?: number; // in MB
  maxFiles?: number;
  onFilesChange?: (files: File[]) => void;
  disabled?: boolean;
  error?: string;
  className?: string;
}

const FileUpload: React.FC<FileUploadProps> = ({
  label,
  accept,
  multiple = false,
  maxSize = 10,
  maxFiles = 5,
  onFilesChange,
  disabled = false,
  error,
  className,
}) => {
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (files: FileList | null) => {
    if (!files) return;

    const newFiles = Array.from(files).slice(0, maxFiles - uploadedFiles.length);
    const validFiles: File[] = [];

    newFiles.forEach((file) => {
      if (file.size > maxSize * 1024 * 1024) {
        // Handle file too large
        return;
      }
      validFiles.push(file);
    });

    const newUploadedFiles: UploadedFile[] = validFiles.map((file) => ({
      file,
      id: Math.random().toString(36).substr(2, 9),
      status: 'uploading',
      progress: 0,
    }));

    setUploadedFiles(prev => [...prev, ...newUploadedFiles]);
    onFilesChange?.(validFiles);

    // Simulate upload progress
    newUploadedFiles.forEach((uploadedFile) => {
      simulateUpload(uploadedFile.id);
    });
  };

  const simulateUpload = (fileId: string) => {
    const interval = setInterval(() => {
      setUploadedFiles(prev => prev.map(file => {
        if (file.id === fileId) {
          const newProgress = (file.progress || 0) + Math.random() * 30;
          if (newProgress >= 100) {
            clearInterval(interval);
            return { ...file, status: 'success', progress: 100 };
          }
          return { ...file, progress: newProgress };
        }
        return file;
      }));
    }, 200);
  };

  const removeFile = (fileId: string) => {
    setUploadedFiles(prev => prev.filter(file => file.id !== fileId));
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    if (!disabled) {
      handleFileSelect(e.dataTransfer.files);
    }
  };

  const getFileIcon = (file: File) => {
    if (file.type.startsWith('image/')) {
      return <Image className="w-5 h-5" />;
    }
    return <File className="w-5 h-5" />;
  };

  return (
    <div className={clsx('w-full', className)}>
      {label && (
        <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
          {label}
        </label>
      )}

      <motion.div
        className={clsx(
          'relative border-2 border-dashed rounded-lg p-6 transition-all duration-200',
          isDragOver
            ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
            : error
            ? 'border-red-500 bg-red-50 dark:bg-red-900/20'
            : 'border-neutral-300 dark:border-neutral-600 hover:border-primary-400',
          disabled && 'opacity-50 cursor-not-allowed'
        )}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        whileHover={!disabled ? { scale: 1.01 } : {}}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept={accept}
          multiple={multiple}
          onChange={(e) => handleFileSelect(e.target.files)}
          disabled={disabled}
          className="sr-only"
        />

        <div className="text-center">
          <motion.div
            className="mx-auto w-12 h-12 text-neutral-400 mb-4"
            animate={{ y: isDragOver ? -5 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <Upload className="w-full h-full" />
          </motion.div>

          <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-2">
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              disabled={disabled}
              className="text-primary-600 hover:text-primary-700 font-medium"
            >
              Click to upload
            </button>
            {' '}or drag and drop
          </p>

          <p className="text-xs text-neutral-500">
            {accept ? `Accepted formats: ${accept}` : 'All file types accepted'} • Max {maxSize}MB per file
          </p>
        </div>
      </motion.div>

      {/* File List */}
      <AnimatePresence>
        {uploadedFiles.length > 0 && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-4 space-y-2"
          >
            {uploadedFiles.map((uploadedFile) => (
              <motion.div
                key={uploadedFile.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="flex items-center space-x-3 p-3 bg-neutral-50 dark:bg-neutral-800 rounded-lg"
              >
                <div className="text-neutral-500">
                  {getFileIcon(uploadedFile.file)}
                </div>

                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-neutral-900 dark:text-neutral-100 truncate">
                    {uploadedFile.file.name}
                  </p>
                  <p className="text-xs text-neutral-500">
                    {(uploadedFile.file.size / 1024 / 1024).toFixed(2)} MB
                  </p>

                  {uploadedFile.status === 'uploading' && (
                    <div className="mt-2">
                      <div className="w-full bg-neutral-200 dark:bg-neutral-700 rounded-full h-1.5">
                        <motion.div
                          className="bg-primary-600 h-1.5 rounded-full"
                          initial={{ width: 0 }}
                          animate={{ width: `${uploadedFile.progress || 0}%` }}
                          transition={{ duration: 0.3 }}
                        />
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex items-center space-x-2">
                  {uploadedFile.status === 'success' && (
                    <CheckCircle className="w-5 h-5 text-green-500" />
                  )}
                  {uploadedFile.status === 'error' && (
                    <AlertCircle className="w-5 h-5 text-red-500" />
                  )}

                  <button
                    type="button"
                    onClick={() => removeFile(uploadedFile.id)}
                    className="text-neutral-400 hover:text-red-500 transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {error && (
        <p className="mt-2 text-sm text-red-600 dark:text-red-400">
          {error}
        </p>
      )}
    </div>
  );
};

export default FileUpload;