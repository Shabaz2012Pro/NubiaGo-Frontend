import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Camera, Upload, X, Search, Loader2 } from 'lucide-react';
import Button from '../atoms/Button';
import Card from '../atoms/Card';
import { clsx } from 'clsx';

interface VisualSearchProps {
  onImageSearch?: (imageFile: File) => void;
  onResults?: (results: any[]) => void;
  className?: string;
}

const VisualSearch: React.FC<VisualSearchProps> = ({
  onImageSearch,
  onResults,
  className
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isCameraActive, setIsCameraActive] = useState(false);

  const handleFileSelect = (file: File) => {
    setSelectedImage(file);
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: 'environment' } 
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setIsCameraActive(true);
      }
    } catch (error) {
      console.error('Error accessing camera:', error);
    }
  };

  const capturePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const canvas = canvasRef.current;
      const video = videoRef.current;
      const context = canvas.getContext('2d');
      
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      
      if (context) {
        context.drawImage(video, 0, 0);
        canvas.toBlob((blob) => {
          if (blob) {
            const file = new File([blob], 'camera-capture.jpg', { type: 'image/jpeg' });
            handleFileSelect(file);
            stopCamera();
          }
        }, 'image/jpeg', 0.8);
      }
    }
  };

  const stopCamera = () => {
    if (videoRef.current?.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach(track => track.stop());
      setIsCameraActive(false);
    }
  };

  const performSearch = async () => {
    if (!selectedImage) return;

    setIsSearching(true);
    
    // Simulate AI-powered visual search
    setTimeout(() => {
      const mockResults = [
        {
          id: '1',
          name: 'Similar Product 1',
          price: 99.99,
          image: 'https://images.pexels.com/photos/356056/pexels-photo-356056.jpeg?auto=compress&cs=tinysrgb&w=300',
          similarity: 95
        },
        {
          id: '2',
          name: 'Similar Product 2',
          price: 149.99,
          image: 'https://images.pexels.com/photos/1649771/pexels-photo-1649771.jpeg?auto=compress&cs=tinysrgb&w=300',
          similarity: 87
        },
        {
          id: '3',
          name: 'Similar Product 3',
          price: 79.99,
          image: 'https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=300',
          similarity: 82
        }
      ];
      
      setSearchResults(mockResults);
      setIsSearching(false);
      onResults?.(mockResults);
    }, 2000);

    onImageSearch?.(selectedImage);
  };

  const reset = () => {
    setSelectedImage(null);
    setPreviewUrl(null);
    setSearchResults([]);
    setIsSearching(false);
    stopCamera();
  };

  return (
    <>
      <Button
        variant="outline"
        onClick={() => setIsOpen(true)}
        leftIcon={<Camera className="w-4 h-4" />}
        className={className}
      >
        Visual Search
      </Button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-4xl max-h-[90vh] overflow-y-auto"
            >
              <Card variant="default" padding="lg" className="relative">
                <button
                  onClick={() => setIsOpen(false)}
                  className="absolute top-4 right-4 w-8 h-8 rounded-full bg-neutral-100 dark:bg-neutral-700 flex items-center justify-center hover:bg-neutral-200 dark:hover:bg-neutral-600 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>

                <div className="mb-6">
                  <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100 mb-2">
                    Visual Search
                  </h2>
                  <p className="text-neutral-600 dark:text-neutral-400">
                    Upload an image or take a photo to find similar products
                  </p>
                </div>

                {!selectedImage && !isCameraActive && (
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Button
                        variant="outline"
                        size="lg"
                        onClick={() => fileInputRef.current?.click()}
                        leftIcon={<Upload className="w-5 h-5" />}
                        className="h-32 flex-col space-y-2"
                      >
                        <span>Upload Image</span>
                        <span className="text-sm text-neutral-500">JPG, PNG up to 10MB</span>
                      </Button>

                      <Button
                        variant="outline"
                        size="lg"
                        onClick={startCamera}
                        leftIcon={<Camera className="w-5 h-5" />}
                        className="h-32 flex-col space-y-2"
                      >
                        <span>Take Photo</span>
                        <span className="text-sm text-neutral-500">Use your camera</span>
                      </Button>
                    </div>

                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                  </div>
                )}

                {isCameraActive && (
                  <div className="space-y-4">
                    <div className="relative bg-black rounded-lg overflow-hidden">
                      <video
                        ref={videoRef}
                        autoPlay
                        playsInline
                        className="w-full h-64 object-cover"
                      />
                      <canvas ref={canvasRef} className="hidden" />
                    </div>
                    
                    <div className="flex justify-center space-x-4">
                      <Button
                        variant="primary"
                        onClick={capturePhoto}
                        leftIcon={<Camera className="w-4 h-4" />}
                      >
                        Capture Photo
                      </Button>
                      <Button
                        variant="outline"
                        onClick={stopCamera}
                      >
                        Cancel
                      </Button>
                    </div>
                  </div>
                )}

                {selectedImage && previewUrl && (
                  <div className="space-y-6">
                    <div className="flex items-start space-x-6">
                      <div className="flex-shrink-0">
                        <img
                          src={previewUrl}
                          alt="Selected"
                          className="w-48 h-48 object-cover rounded-lg border border-neutral-200 dark:border-neutral-700"
                        />
                      </div>
                      
                      <div className="flex-1 space-y-4">
                        <div>
                          <h3 className="font-semibold text-neutral-900 dark:text-neutral-100 mb-2">
                            Selected Image
                          </h3>
                          <p className="text-sm text-neutral-600 dark:text-neutral-400">
                            {selectedImage.name} ({(selectedImage.size / 1024 / 1024).toFixed(2)} MB)
                          </p>
                        </div>

                        <div className="flex space-x-3">
                          <Button
                            variant="primary"
                            onClick={performSearch}
                            loading={isSearching}
                            leftIcon={<Search className="w-4 h-4" />}
                            disabled={isSearching}
                          >
                            {isSearching ? 'Searching...' : 'Find Similar Products'}
                          </Button>
                          
                          <Button
                            variant="outline"
                            onClick={reset}
                            disabled={isSearching}
                          >
                            Try Another Image
                          </Button>
                        </div>
                      </div>
                    </div>

                    {isSearching && (
                      <div className="flex items-center justify-center py-12">
                        <div className="text-center">
                          <Loader2 className="w-8 h-8 animate-spin text-red-500 mx-auto mb-4" />
                          <p className="text-neutral-600 dark:text-neutral-400">
                            Analyzing image and finding similar products...
                          </p>
                        </div>
                      </div>
                    )}

                    {searchResults.length > 0 && (
                      <div>
                        <h3 className="font-semibold text-neutral-900 dark:text-neutral-100 mb-4">
                          Similar Products Found
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          {searchResults.map((result) => (
                            <div
                              key={result.id}
                              className="border border-neutral-200 dark:border-neutral-700 rounded-lg p-4 hover:shadow-lg transition-shadow cursor-pointer"
                            >
                              <img
                                src={result.image}
                                alt={result.name}
                                className="w-full h-32 object-cover rounded-lg mb-3"
                              />
                              <h4 className="font-medium text-neutral-900 dark:text-neutral-100 mb-1">
                                {result.name}
                              </h4>
                              <p className="text-lg font-bold text-red-600 mb-2">
                                ${result.price}
                              </p>
                              <div className="flex items-center justify-between">
                                <span className="text-sm text-green-600">
                                  {result.similarity}% match
                                </span>
                                <Button size="sm" variant="outline">
                                  View Details
                                </Button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </Card>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default VisualSearch;