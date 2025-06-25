"use client"
import React from 'react'
import { UserButton, UserProfile, useUser } from '@clerk/nextjs'

function Profile() {
  const { user, isLoaded, isSignedIn } = useUser()

  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
      </div>
    )
  }

  if (!isSignedIn) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Please sign in to view your profile</h2>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-3">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Profile Settings</h1>
          <p className="text-gray-600 mt-2">Manage your account and preferences</p>
        </div>
        <div className="flex items-center space-x-4">
          <span className="text-sm text-gray-700">
            Welcome, {user?.firstName || user?.username || 'User'}!
          </span>
        </div>
      </div>
        <div className='flex items-center justify-center'>
          <UserProfile 
          routing="hash"
          appearance={{
            elements: {
              card: "shadow-none border-0",
              navbar: "hidden",
              navbarMobileMenuButton: "hidden",
              headerTitle: "text-2xl font-bold",
              headerSubtitle: "text-gray-600"
            },
            layout: {
              socialButtonsPlacement: "bottom",
              socialButtonsVariant: "blockButton"
            }
          }}
        />
        </div>
    </div>
  )
}

export default Profile