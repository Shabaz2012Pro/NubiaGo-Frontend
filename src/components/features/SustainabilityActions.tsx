
import React from 'react';
import { Heart, Users } from 'lucide-react';
import Card from '../atoms/Card';
import Button from '../atoms/Button';

const SustainabilityActions: React.FC = () => {
  return (
    <div className="relative bg-gradient-to-br from-green-600 to-green-800 rounded-2xl p-8 text-white overflow-hidden">
      <div className="absolute inset-0 bg-green-600/20 backdrop-blur-sm"></div>
      <div className="relative z-10">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-4">Join Our Sustainability Journey</h2>
          <p className="text-green-100 max-w-2xl mx-auto">
            Together, we can make a difference. Here's how you can contribute to our sustainability efforts.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Card variant="default" padding="lg" className="bg-white/10 backdrop-blur-sm border-white/20 text-white">
            <div className="text-center">
              <Heart className="w-8 h-8 mx-auto mb-4 text-green-300" />
              <h3 className="font-semibold mb-2">Choose Sustainable Products</h3>
              <p className="text-sm text-green-100">
                Look for our "Eco-Friendly" badge when shopping to support sustainable products.
              </p>
            </div>
          </Card>
          
          <Card variant="default" padding="lg" className="bg-white/10 backdrop-blur-sm border-white/20 text-white">
            <div className="text-center">
              <Users className="w-8 h-8 mx-auto mb-4 text-green-300" />
              <h3 className="font-semibold mb-2">Spread the Word</h3>
              <p className="text-sm text-green-100">
                Share our sustainability initiatives with your network to amplify our impact.
              </p>
            </div>
          </Card>
        </div>
        
        <div className="text-center">
          <Button 
            variant="secondary" 
            size="lg"
            className="bg-white text-green-600 hover:bg-neutral-100"
            onClick={() => window.location.hash = 'contact'}
          >
            Contact Our Sustainability Team
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SustainabilityActions;
