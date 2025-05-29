"use client"
import React, { useState, useEffect } from 'react';
import { MapPin, Users, Truck, ShoppingBag, ArrowRight, CheckCircle, Star, Menu, X } from 'lucide-react';

export default function TrackFlowLanding() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeRole, setActiveRole] = useState('customer');

  const roles = [
    {
      id: 'customer',
      title: 'Customer',
      icon: <ShoppingBag className="w-8 h-8" />,
      description: 'Track your orders in real-time and stay updated on delivery status',
      features: ['Real-time order tracking', 'Delivery notifications', 'Order history', 'Multiple addresses'],
      color: 'from-blue-500 to-purple-600',
      loginPath: '/auth/login/customer',
      signupPath: '/auth/signup/customer'
    },
    {
      id: 'vendor',
      title: 'Vendor',
      icon: <Users className="w-8 h-8" />,
      description: 'Manage your business operations and monitor all deliveries',
      features: ['Order management', 'Analytics dashboard', 'Inventory tracking', 'Customer insights'],
      color: 'from-green-500 to-emerald-600',
      loginPath: '/auth/login/vendor',
      signupPath: '/auth/signup/vendor'
    },
    {
      id: 'delivery',
      title: 'Delivery Partner',
      icon: <Truck className="w-8 h-8" />,
      description: 'Optimize your routes and provide seamless delivery experiences',
      features: ['Route optimization', 'Live location sharing', 'Earnings tracker', 'Performance metrics'],
      color: 'from-orange-500 to-red-600',
      loginPath: '/auth/login/delivery',
      signupPath: '/auth/signup/delivery'
    }
  ];

  const currentRole = roles.find(role => role.id === activeRole);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-800 text-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-white/10 backdrop-blur-lg border-b border-white/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-2">
              <MapPin className="w-8 h-8 text-blue-400 animate-pulse" />
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                TrackFlow
              </span>
            </div>
            
            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-8">
              <a href="#roles" className="hover:text-blue-400 transition-colors">Choose Role</a>
              <button className="bg-gradient-to-r from-blue-500 to-purple-600 px-6 py-2 rounded-full hover:shadow-lg hover:shadow-blue-500/25 transition-all">
                Login Required
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-slate-900/95 backdrop-blur-lg border-t border-white/20">
            <div className="px-4 py-6 space-y-4">
              <a href="#roles" className="block hover:text-blue-400 transition-colors">Choose Role</a>
              <button className="w-full bg-gradient-to-r from-blue-500 to-purple-600 px-6 py-2 rounded-full hover:shadow-lg hover:shadow-blue-500/25 transition-all">
                Login Required
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="pt-24 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <div className="mb-8 animate-fade-in">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent">
              Track Everything
              <br />
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                In Real-Time
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
              The ultimate location tracking platform connecting customers, vendors, and delivery partners 
              in a seamless ecosystem. <strong>Login required to start tracking.</strong>
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <button 
              onClick={() => document.getElementById('roles').scrollIntoView({behavior: 'smooth'})}
              className="bg-gradient-to-r from-blue-500 to-purple-600 px-8 py-4 rounded-full text-lg font-semibold hover:shadow-2xl hover:shadow-blue-500/25 transition-all transform hover:scale-105"
            >
              Choose Your Role & Login
              <ArrowRight className="inline ml-2 w-5 h-5" />
            </button>
            <div className="border-2 border-white/30 px-8 py-4 rounded-full text-lg font-semibold bg-white/5 cursor-not-allowed opacity-70">
              🔒 Login Required to Track
            </div>
          </div>

          {/* Floating Elements */}
          <div className="relative">
            <div className="absolute -top-10 left-1/4 w-72 h-72 bg-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute -bottom-10 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
            
            {/* Mock Device */}
            <div className="relative z-10 mx-auto w-80 h-96 bg-gradient-to-br from-slate-800 to-slate-900 rounded-3xl border border-white/20 shadow-2xl overflow-hidden">
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
                <div className="bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-2xl h-80 flex items-center justify-center">
                  <MapPin className="w-20 h-20 text-blue-400 animate-bounce" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Role Selection Section */}
      <section id="roles" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Choose Your
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent"> Role</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Whether you're ordering, selling, or delivering - we've got the perfect solution for you
            </p>
          </div>

          {/* Role Tabs */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {roles.map((role) => (
              <button
                key={role.id}
                onClick={() => setActiveRole(role.id)}
                className={`flex items-center space-x-3 px-6 py-4 rounded-2xl transition-all transform hover:scale-105 ${
                  activeRole === role.id
                    ? `bg-gradient-to-r ${role.color} shadow-lg`
                    : 'bg-white/10 hover:bg-white/20'
                }`}
              >
                {role.icon}
                <span className="font-semibold text-lg">{role.title}</span>
              </button>
            ))}
          </div>

          {/* Active Role Content */}
          <div className="bg-white/5 backdrop-blur-lg rounded-3xl border border-white/20 p-8 md:p-12">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <div className="flex items-center space-x-4 mb-6">
                  <div className={`p-4 rounded-2xl bg-gradient-to-r ${currentRole.color}`}>
                    {currentRole.icon}
                  </div>
                  <h3 className="text-3xl font-bold">{currentRole.title}</h3>
                </div>
                
                <p className="text-xl text-gray-300 mb-8">
                  {currentRole.description}
                </p>

                <ul className="space-y-4 mb-8">
                  {currentRole.features.map((feature, index) => (
                    <li key={index} className="flex items-center space-x-3">
                      <CheckCircle className="w-6 h-6 text-green-400 flex-shrink-0" />
                      <span className="text-lg">{feature}</span>
                    </li>
                  ))}
                </ul>

                <div className="flex flex-col sm:flex-row gap-4">
                  <a
                    href={currentRole.signupPath}
                    className={`inline-flex items-center justify-center px-8 py-4 rounded-full text-lg font-semibold bg-gradient-to-r ${currentRole.color} hover:shadow-lg transition-all transform hover:scale-105`}
                  >
                    Sign Up as {currentRole.title}
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </a>
                  <a
                    href={currentRole.loginPath}
                    className="inline-flex items-center justify-center px-8 py-4 rounded-full text-lg font-semibold border-2 border-white/30 hover:bg-white/10 transition-all"
                  >
                    Login
                  </a>
                </div>
              </div>

              <div className="relative">
                <div className={`w-full h-96 bg-gradient-to-br ${currentRole.color} rounded-3xl opacity-20 absolute inset-0 blur-xl`}></div>
                <div className="relative bg-gradient-to-br from-slate-800 to-slate-900 rounded-3xl border border-white/20 p-8 h-96 flex items-center justify-center">
                  <div className="text-center">
                    <div className={`inline-flex p-6 rounded-full bg-gradient-to-r ${currentRole.color} mb-4`}>
                      {currentRole.icon}
                    </div>
                    <h4 className="text-2xl font-bold mb-2">{currentRole.title} Dashboard</h4>
                    <p className="text-gray-400">Experience seamless tracking</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 bg-black/20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Powerful
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent"> Features</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Everything you need for comprehensive location tracking and management
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <MapPin className="w-8 h-8" />,
                title: "Real-Time Tracking",
                description: "Live location updates with sub-meter accuracy and instant notifications"
              },
              {
                icon: <Users className="w-8 h-8" />,
                title: "Multi-Role Support",
                description: "Seamless experience for customers, vendors, and delivery partners"
              },
              {
                icon: <MapPin className="w-8 h-8" />,
                title: "Interactive Map Tracking",
                description: "Live map visualization with route optimization and geofencing capabilities"
              }
            ].map((feature, index) => (
              <div key={index} className="bg-white/5 backdrop-blur-lg rounded-2xl border border-white/20 p-8 hover:bg-white/10 transition-all">
                <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-4 rounded-2xl w-fit mb-6">
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-bold mb-4">{feature.title}</h3>
                <p className="text-gray-300 text-lg">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 sm:px-6 lg:px-8 border-t border-white/20">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <MapPin className="w-8 h-8 text-blue-400" />
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              TrackFlow
            </span>
          </div>
          <p className="text-gray-400">
            © 2025 TrackFlow. All rights reserved. Empowering real-time connections.
          </p>
        </div>
      </footer>
    </div>
  );
}