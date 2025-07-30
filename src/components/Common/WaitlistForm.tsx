"use client";
import { useState, useEffect } from 'react';

interface WaitlistFormData {
  email: string;
  firstName: string;
  lastName: string;
  userType: string;
  platformFocus: string[];
  monthlyBudget: string;
  currentTools: string;
  biggestChallenge: string;
}

const WaitlistForm = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const [formData, setFormData] = useState<WaitlistFormData>({
    email: '',
    firstName: '',
    lastName: '',
    userType: '',
    platformFocus: [],
    monthlyBudget: '',
    currentTools: '',
    biggestChallenge: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const userTypeOptions = [
    { value: 'content-creator', label: 'Content Creator (TikTok, Instagram, YouTube)' },
    { value: 'indie-musician', label: 'Independent Musician/Artist' },
    { value: 'meme-creator', label: 'Meme Creator/Video Editor' },
    { value: 'small-business', label: 'Small Business/Brand' },
    { value: 'hobbyist', label: 'Music Hobbyist/Fan' },
    { value: 'other', label: 'Other' }
  ];

  const platformOptions = [
    { value: 'tiktok', label: 'TikTok' },
    { value: 'instagram', label: 'Instagram Reels' },
    { value: 'youtube', label: 'YouTube Shorts' },
    { value: 'spotify', label: 'Spotify/Streaming' },
    { value: 'soundcloud', label: 'SoundCloud' },
    { value: 'other-social', label: 'Other Social Platforms' }
  ];

  const budgetOptions = [
    { value: '0', label: '$0 - I use free tools only' },
    { value: '1-25', label: '$1-25 per month' },
    { value: '26-50', label: '$26-50 per month' },
    { value: '51-100', label: '$51-100 per month' },
    { value: '100+', label: '$100+ per month' }
  ];

  // Load form data from localStorage on mount
  useEffect(() => {
    const savedData = localStorage.getItem('waitlistFormData');
    if (savedData) {
      try {
        const parsed = JSON.parse(savedData);
        setFormData(prev => ({ ...prev, ...parsed }));
      } catch (error) {
        console.error('Error parsing saved form data:', error);
      }
    }
  }, []);

  // Save form data to localStorage on change
  useEffect(() => {
    localStorage.setItem('waitlistFormData', JSON.stringify(formData));
  }, [formData]);

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    // Email validation
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    // First name validation
    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    }

    // Last name validation
    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    }

    // User type validation
    if (!formData.userType) {
      newErrors.userType = 'Please select your user type';
    }

    // Platform focus validation
    if (formData.platformFocus.length === 0) {
      newErrors.platformFocus = 'Please select at least one platform';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Send data to our API endpoint
      const response = await fetch('/api/waitlist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error((result.error as string) || 'Failed to submit form');
      }
      
      // Clear localStorage after successful submission
      localStorage.removeItem('waitlistFormData');
      
      setIsSubmitted(true);
      
      // Close modal after 3 seconds
      setTimeout(() => {
        onClose();
        setIsSubmitted(false);
        setFormData({
          email: '',
          firstName: '',
          lastName: '',
          userType: '',
          platformFocus: [],
          monthlyBudget: '',
          currentTools: '',
          biggestChallenge: ''
        });
      }, 3000);
      
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('There was an error submitting your form. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field: keyof WaitlistFormData, value: string | string[]) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const handlePlatformChange = (platform: string) => {
    const updatedPlatforms = formData.platformFocus.includes(platform)
      ? formData.platformFocus.filter(p => p !== platform)
      : [...formData.platformFocus, platform];
    
    handleInputChange('platformFocus', updatedPlatforms);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-8">
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                Join the Waitlist
              </h2>
              <p className="text-gray-600 dark:text-gray-300">
                Get early access to Eilumi AI and be the first to create viral music
              </p>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {isSubmitted ? (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🎵</div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                You're in!
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                We'll notify you when Eilumi AI launches. Check your email for exclusive updates.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    First Name *
                  </label>
                  <input
                    type="text"
                    value={formData.firstName}
                    onChange={(e) => handleInputChange('firstName', e.target.value)}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent dark:bg-gray-800 dark:border-gray-600 dark:text-white ${
                      errors.firstName ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Your first name"
                  />
                  {errors.firstName && (
                    <p className="mt-1 text-sm text-red-500">{errors.firstName}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Last Name *
                  </label>
                  <input
                    type="text"
                    value={formData.lastName}
                    onChange={(e) => handleInputChange('lastName', e.target.value)}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent dark:bg-gray-800 dark:border-gray-600 dark:text-white ${
                      errors.lastName ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Your last name"
                  />
                  {errors.lastName && (
                    <p className="mt-1 text-sm text-red-500">{errors.lastName}</p>
                  )}
                </div>
              </div>

              {/* Email Field */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent dark:bg-gray-800 dark:border-gray-600 dark:text-white ${
                    errors.email ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="your@email.com"
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-500">{errors.email}</p>
                )}
              </div>

              {/* User Type */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  I'm a... *
                </label>
                <select
                  value={formData.userType}
                  onChange={(e) => handleInputChange('userType', e.target.value)}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent dark:bg-gray-800 dark:border-gray-600 dark:text-white ${
                    errors.userType ? 'border-red-500' : 'border-gray-300'
                  }`}
                >
                  <option value="">Select your user type</option>
                  {userTypeOptions.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
                {errors.userType && (
                  <p className="mt-1 text-sm text-red-500">{errors.userType}</p>
                )}
              </div>

              {/* Platform Focus */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Where do you create? * (Select all that apply)
                </label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {platformOptions.map(platform => (
                    <label key={platform.value} className="flex items-center space-x-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.platformFocus.includes(platform.value)}
                        onChange={() => handlePlatformChange(platform.value)}
                        className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
                      />
                      <span className="text-sm text-gray-700 dark:text-gray-300">
                        {platform.label}
                      </span>
                    </label>
                  ))}
                </div>
                {errors.platformFocus && (
                  <p className="mt-1 text-sm text-red-500">{errors.platformFocus}</p>
                )}
              </div>

              {/* Monthly Budget */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  How much do you spend on music tools? (Optional)
                </label>
                <select
                  value={formData.monthlyBudget}
                  onChange={(e) => handleInputChange('monthlyBudget', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent dark:bg-gray-800 dark:border-gray-600 dark:text-white"
                >
                  <option value="">Select your budget range</option>
                  {budgetOptions.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Current Tools */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  What tools do you use now? (Optional)
                </label>
                <input
                  type="text"
                  value={formData.currentTools}
                  onChange={(e) => handleInputChange('currentTools', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent dark:bg-gray-800 dark:border-gray-600 dark:text-white"
                  placeholder="e.g., GarageBand, FL Studio, Ableton Live"
                />
              </div>

              {/* Biggest Challenge */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  What's your biggest music creation challenge? (Optional)
                </label>
                <textarea
                  value={formData.biggestChallenge}
                  onChange={(e) => handleInputChange('biggestChallenge', e.target.value)}
                  rows={3}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent dark:bg-gray-800 dark:border-gray-600 dark:text-white"
                  placeholder="Tell us about your challenges..."
                />
              </div>

              {/* Privacy Note */}
              <p className="text-xs text-gray-500 dark:text-gray-400">
                We'll only email you about Eilumi AI updates. No spam, unsubscribe anytime.
              </p>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-primary text-white py-4 px-6 rounded-lg font-semibold text-lg hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Joining...' : 'Join the Waitlist'}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default WaitlistForm; 