import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FileUp, Lock, Shield, Zap, Users, History, Settings } from 'lucide-react';

const Main = () => {
  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-16"
      >
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          FileConverter Pro
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Secure, fast, and efficient file compression with advanced features
          and local storage for your privacy.
        </p>
      </motion.div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow"
        >
          <div className="bg-blue-100 rounded-full w-12 h-12 flex items-center justify-center mb-4">
            <Shield className="w-6 h-6 text-blue-600" />
          </div>
          <h3 className="text-xl font-semibold mb-2">Secure Compression</h3>
          <p className="text-gray-600">
            Password-protected ZIP files with military-grade encryption for your sensitive data.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow"
        >
          <div className="bg-green-100 rounded-full w-12 h-12 flex items-center justify-center mb-4">
            <Zap className="w-6 h-6 text-green-600" />
          </div>
          <h3 className="text-xl font-semibold mb-2">Lightning Fast</h3>
          <p className="text-gray-600">
            Compress multiple files instantly with our optimized compression algorithm.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow"
        >
          <div className="bg-purple-100 rounded-full w-12 h-12 flex items-center justify-center mb-4">
            <Users className="w-6 h-6 text-purple-600" />
          </div>
          <h3 className="text-xl font-semibold mb-2">User Management</h3>
          <p className="text-gray-600">
            Create your account to manage files, track history, and set security preferences.
          </p>
        </motion.div>
      </div>

      <div className="bg-white rounded-xl shadow-md p-8 mb-16">
        <h2 className="text-2xl font-bold mb-6">How It Works</h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-xl font-semibold mb-4">Key Features</h3>
            <ul className="space-y-3">
              <li className="flex items-center">
                <FileUp className="w-5 h-5 text-blue-600 mr-2" />
                Support for multiple file formats (PNG, JPEG, GIF, etc.)
              </li>
              <li className="flex items-center">
                <Lock className="w-5 h-5 text-blue-600 mr-2" />
                PIN-based file locking system
              </li>
              <li className="flex items-center">
                <History className="w-5 h-5 text-blue-600 mr-2" />
                Conversion history tracking
              </li>
              <li className="flex items-center">
                <Settings className="w-5 h-5 text-blue-600 mr-2" />
                Customizable compression settings
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-4">Compression Tips</h3>
            <ul className="space-y-3 text-gray-600">
              <li>• Compress up to 6 files at once (more with admin access)</li>
              <li>• Use PIN protection for sensitive files</li>
              <li>• Set custom ZIP names for better organization</li>
              <li>• Track your compression history</li>
            </ul>
          </div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <Link
          to="/register"
          className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
        >
          Get Started Now
        </Link>
        <p className="mt-4 text-gray-600">
          Already have an account?{' '}
          <Link to="/login" className="text-blue-600 hover:text-blue-800">
            Login here
          </Link>
        </p>
      </motion.div>
    </div>
  );
};

export default Main;