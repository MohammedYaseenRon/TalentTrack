import React from 'react';

const ResumeAnalysisSkeleton = () => {
  return (
    <div className="animate-pulse">
      <div className="border rounded-lg shadow-sm">
        {/* Card Header */}
        <div className="border-b bg-gray-50 p-4">
          <div className="h-6 bg-gray-300 rounded w-1/2 mb-2"></div>
        </div>
        {/* Card Content */}
        <div className="p-6 mb-8">
          {/* Score Skeleton */}
          <div className="mb-6 bg-blue-50 p-4 rounded-lg">
            <div className="h-5 bg-gray-300 rounded w-1/3 mb-2"></div>
            <div className="h-8 bg-gray-300 rounded w-1/4"></div>
          </div>

          {/* Final Summary Skeleton */}
          <div className="mb-6">
            <div className="h-5 bg-gray-300 rounded w-1/4 mb-3"></div>
            <div className="h-4 bg-gray-300 rounded w-full mb-2"></div>
            <div className="h-4 bg-gray-300 rounded w-3/4"></div>
          </div>

          {/* Personal Information Skeleton */}
          <div className="mb-6">
            <div className="h-5 bg-gray-300 rounded w-1/4 mb-3"></div>
            <div className="h-4 bg-gray-300 rounded w-full mb-2"></div>
            <div className="h-4 bg-gray-300 rounded w-2/3"></div>
          </div>

          {/* Summary Analysis Skeleton */}
          <div className="mb-6">
            <div className="h-5 bg-gray-300 rounded w-1/4 mb-3"></div>
            <div className="h-4 bg-gray-300 rounded w-full mb-2"></div>
            <div className="h-4 bg-gray-300 rounded w-5/6"></div>
          </div>

          {/* Work Experience Skeleton */}
          <div className="mb-6">
            <div className="h-5 bg-gray-300 rounded w-1/4 mb-3"></div>
            <div className="h-4 bg-gray-300 rounded w-full mb-2"></div>
            <div className="h-4 bg-gray-300 rounded w-4/5"></div>
          </div>

          {/* Skills & Technologies Skeleton */}
          <div className="mb-6">
            <div className="h-5 bg-gray-300 rounded w-1/4 mb-3"></div>
            <div className="flex flex-wrap gap-2 mt-1">
              <div className="h-6 bg-gray-300 rounded w-20"></div>
              <div className="h-6 bg-gray-300 rounded w-16"></div>
              <div className="h-6 bg-gray-300 rounded w-24"></div>
            </div>
          </div>

          {/* Education & Certifications Skeleton */}
          <div className="mb-6">
            <div className="h-5 bg-gray-300 rounded w-1/4 mb-3"></div>
            <div className="h-4 bg-gray-300 rounded w-full mb-2"></div>
            <div className="h-4 bg-gray-300 rounded w-2/3"></div>
          </div>

          {/* Projects & Contributions Skeleton */}
          <div className="mb-6">
            <div className="h-5 bg-gray-300 rounded w-1/4 mb-3"></div>
            <div className="h-4 bg-gray-300 rounded w-full mb-2"></div>
            <div className="h-4 bg-gray-300 rounded w-5/6"></div>
          </div>

          {/* ATS Compatibility Skeleton */}
          <div className="mb-6">
            <div className="h-5 bg-gray-300 rounded w-1/4 mb-3"></div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-3">
              <div className="bg-gray-50 p-3 rounded">
                <div className="h-4 bg-gray-300 rounded w-1/2 mb-1"></div>
                <div className="h-3 bg-gray-300 rounded w-full"></div>
              </div>
              <div className="bg-gray-50 p-3 rounded">
                <div className="h-4 bg-gray-300 rounded w-1/2 mb-1"></div>
                <div className="h-3 bg-gray-300 rounded w-full"></div>
              </div>
              <div className="bg-gray-50 p-3 rounded">
                <div className="h-4 bg-gray-300 rounded w-1/2 mb-1"></div>
                <div className="h-3 bg-gray-300 rounded w-full"></div>
              </div>
            </div>
          </div>

          {/* Buttons Skeleton */}
          <div className="mt-6 flex justify-end gap-2">
            <div className="h-10 bg-gray-300 rounded w-32"></div>
            <div className="h-10 bg-gray-300 rounded w-32"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumeAnalysisSkeleton;