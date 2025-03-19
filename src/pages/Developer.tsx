import React from 'react';
import { Github, Instagram, Mail, Globe } from 'lucide-react';

const Developer = () => {
  return (
    <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
      <div
        className="h-64 bg-cover bg-center"
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80")'
        }}
      ></div>
      
      <div className="relative px-8 py-6">
        <div className="absolute -top-16 left-8">
          <img
            src="https://i.ibb.co/rM2j6fQ/IMG-20230124-WA0001.jpg"
            alt="Developer"
            className="w-32 h-32 rounded-full border-4 border-white shadow-lg object-cover"
          />
        </div>
        
        <div className="mt-16">
          <h1 className="text-3xl font-bold text-gray-900">Naveen (Kutty Rolex)</h1>
          <p className="mt-2 text-gray-600">Full Stack Developer & Cybersecurity tester</p>
          
          <div className="mt-6">
            <h2 className="text-xl font-semibold text-gray-900">About Me</h2>
            <p className="mt-2 text-gray-600">
              Passionate about creating secure and efficient file compression solutions.
              Specializing in web development and cybersecurity, I'm dedicated to
              building tools that make file management easier while maintaining
              the highest security standards.
            </p>
          </div>
          
          <div className="mt-6">
            <h2 className="text-xl font-semibold text-gray-900">Connect With Me</h2>
            <div className="mt-4 flex space-x-4">
              <a
                href="https://instagram.com/kutty_rolex_naveen"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center text-pink-600 hover:text-pink-700"
              >
                <Instagram className="w-6 h-6" />
                <span className="ml-2">@kutty_rolex_naveen</span>
              </a>
              
              <a
                href="https://github.com/naveenhacking"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center text-gray-800 hover:text-gray-900"
              >
                <Github className="w-6 h-6" />
                <span className="ml-2">GitHub</span>
              </a>
              
              <a
                href="naveenkcyber@gmail.com"
                className="flex items-center text-blue-600 hover:text-blue-700"
              >
                <Mail className="w-6 h-6" />
                <span className="ml-2">Email</span>
              </a>
              
              <a
                href="https://kgfhacker.blogspot.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center text-green-600 hover:text-green-700"
              >
                <Globe className="w-6 h-6" />
                <span className="ml-2">Website</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Developer