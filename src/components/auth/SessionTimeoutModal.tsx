import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Clock, RefreshCw } from 'lucide-react';
import Card from '../atoms/Card';
import Button from '../atoms/Button';
import { useAuth } from '../../contexts/AuthContext';
import { useAuthStore } from '../../store/useAuthStore';

interface SessionTimeoutModalProps {
  warningTime?: number; // Time in seconds before token expiry to show warning
  className?: string;
}

const SessionTimeoutModal: React.FC<SessionTimeoutModalProps> = ({
  warningTime = 300, // 5 minutes by default
  className,
}) => {
  const [showModal, setShowModal] = useState(false);
  const [timeLeft, setTimeLeft] = useState(warningTime);
  const { isAuthenticated } = useAuth();
  const { refreshToken } = useAuthStore();
  
  // Format time left as MM:SS
  const formatTimeLeft = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };
  
  // Check token expiration
  const checkTokenExpiration = useCallback(() => {
    // In a real app, you would check the actual token expiration
    // For demo purposes, we'll just show the modal after a random time
    if (isAuthenticated) {
      const randomTime = Math.floor(Math.random() * 10000) + 5000; // 5-15 seconds for demo
      setTimeout(() => {
        setTimeLeft(warningTime);
        setShowModal(true);
      }, randomTime);
    }
  }, [isAuthenticated, warningTime]);
  
  // Initialize token check on mount and when auth state changes
  useEffect(() => {
    if (isAuthenticated) {
      checkTokenExpiration();
    } else {
      setShowModal(false);
    }
  }, [isAuthenticated, checkTokenExpiration]);
  
  // Countdown timer
  useEffect(() => {
    if (!showModal) return;
    
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          // In a real app, you would log the user out here
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    
    return () => clearInterval(timer);
  }, [showModal]);
  
  // Handle session extension
  const extendSession = async () => {
    try {
      await refreshToken();
      setShowModal(false);
    } catch (error) {
      console.error('Failed to extend session:', error);
    }
  };
  
  if (!showModal) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className={className}
      >
        <Card variant="default" padding="lg" className="max-w-md w-full">
          <div className="text-center">
            <div className="w-16 h-16 bg-yellow-100 dark:bg-yellow-900/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <Clock className="w-8 h-8 text-yellow-600" />
            </div>
            
            <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100 mb-4">
              Your session is about to expire
            </h2>
            
            <p className="text-neutral-600 dark:text-neutral-400 mb-6">
              For your security, you will be automatically logged out in:
            </p>
            
            <div className="text-3xl font-bold text-red-600 mb-6">
              {formatTimeLeft(timeLeft)}
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                variant="primary"
                onClick={extendSession}
                leftIcon={<RefreshCw className="w-4 h-4" />}
                className="bg-red-600 hover:bg-red-700"
              >
                Extend Session
              </Button>
              
              <Button
                variant="outline"
                onClick={() => {
                  // In a real app, you would log the user out here
                  setShowModal(false);
                }}
              >
                Logout
              </Button>
            </div>
          </div>
        </Card>
      </motion.div>
    </div>
  );
};

export default SessionTimeoutModal;