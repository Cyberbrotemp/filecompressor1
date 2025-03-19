import React, { useState, useRef, useEffect } from 'react';
import { useAuth } from '../components/AuthContext';
import JSZip from 'jszip';
import { FileUp, Lock, Unlock, Plus, Eye, EyeOff } from 'lucide-react';
import { getHistory, saveHistory } from '../utils/auth';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-toastify';

const Dashboard = () => {
  const { user } = useAuth();
  const [files, setFiles] = useState<File[]>([]);
  const [password, setPassword] = useState('');
  const [history, setHistory] = useState(getHistory());
  const [zipName, setZipName] = useState('cybernaveen.zip');
  const [showMoreFiles, setShowMoreFiles] = useState(false);
  const [adminPassword, setAdminPassword] = useState('');
  const [previews, setPreviews] = useState<{ [key: string]: string }>({});
  const [lockedFiles, setLockedFiles] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Generate previews for files
    files.forEach(file => {
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setPreviews(prev => ({
            ...prev,
            [file.name]: reader.result as string
          }));
        };
        reader.readAsDataURL(file);
      }
    });
  }, [files]);

  const speak = (text: string) => {
    const utterance = new SpeechSynthesisUtterance(text);
    window.speechSynthesis.speak(utterance);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || []);
    if (selectedFiles.length > 6 && !showMoreFiles) {
      toast.info('Enter admin password to add more files!');
      return;
    }
    if (selectedFiles.length > 6 && adminPassword !== 'cyber') {
      toast.error('Invalid admin password!');
      return;
    }
    setFiles(prev => [...prev, ...selectedFiles]);
    speak('Files added successfully');
    toast.success('Files added successfully!');
  };

  const toggleFileLock = (fileName: string, pin: string) => {
    if (pin !== user?.pin) {
      toast.error('Invalid PIN!');
      return;
    }
    setLockedFiles(prev => 
      prev.includes(fileName) 
        ? prev.filter(f => f !== fileName)
        : [...prev, fileName]
    );
    speak(lockedFiles.includes(fileName) ? 'File unlocked' : 'File locked');
  };

  const handleCompress = async () => {
    if (files.length === 0) return;

    const zip = new JSZip();
    
    for (const file of files) {
      const arrayBuffer = await file.arrayBuffer();
      zip.file(file.name, arrayBuffer);
    }

    const zipBlob = await zip.generateAsync({
      type: 'blob',
      password: password || undefined,
      compression: 'DEFLATE',
      compressionOptions: { level: 9 }
    });

    const url = URL.createObjectURL(zipBlob);
    const newHistory = {
      id: Date.now().toString(),
      fileName: zipName,
      date: new Date().toISOString(),
      type: 'zip' as const,
      password: password || undefined,
      url
    };

    const updatedHistory = [newHistory, ...history];
    setHistory(updatedHistory);
    saveHistory(updatedHistory);

    const link = document.createElement('a');
    link.href = url;
    link.download = zipName;
    link.click();

    speak('Files compressed successfully');
    toast.success('Files compressed successfully!');

    setFiles([]);
    setPassword('');
    setZipName('cybernaveen.zip');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-lg shadow-md p-6"
      >
        <h2 className="text-2xl font-bold mb-4">File Compression</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              ZIP File Name
            </label>
            <input
              type="text"
              value={zipName}
              onChange={(e) => setZipName(e.target.value)}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          {files.length > 6 && !showMoreFiles && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Admin Password
              </label>
              <input
                type="password"
                value={adminPassword}
                onChange={(e) => setAdminPassword(e.target.value)}
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                placeholder="Enter password to add more files"
              />
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select Files {!showMoreFiles && '(Max 6)'}
            </label>
            <input
              ref={fileInputRef}
              type="file"
              multiple
              onChange={handleFileSelect}
              className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <AnimatePresence>
              {files.map((file, index) => (
                <motion.div
                  key={file.name}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="relative group"
                >
                  <div className={`aspect-square rounded-lg overflow-hidden ${lockedFiles.includes(file.name) ? 'blur-lg' : ''}`}>
                    {previews[file.name] ? (
                      <img
                        src={previews[file.name]}
                        alt={file.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                        <FileUp className="w-8 h-8 text-gray-400" />
                      </div>
                    )}
                  </div>
                  <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={() => toggleFileLock(file.name, user?.pin || '')}
                      className="p-1 bg-white rounded-full shadow-md"
                    >
                      {lockedFiles.includes(file.name) ? (
                        <Lock className="w-4 h-4 text-red-500" />
                      ) : (
                        <Unlock className="w-4 h-4 text-green-500" />
                      )}
                    </button>
                  </div>
                  <p className="mt-1 text-sm text-gray-600 truncate">{file.name}</p>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              ZIP Password Protection (Optional)
            </label>
            <div className="relative">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="pl-10 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                placeholder="Enter password to protect the zip file"
              />
              {password ? (
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              ) : (
                <Unlock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              )}
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleCompress}
            disabled={files.length === 0}
            className="w-full flex items-center justify-center bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:bg-gray-400"
          >
            <FileUp className="w-5 h-5 mr-2" />
            Compress Files
          </motion.button>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-lg shadow-md p-6"
      >
        <h2 className="text-2xl font-bold mb-4">Conversion History</h2>
        <div className="space-y-4">
          <AnimatePresence>
            {history.map((item) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="flex items-center justify-between p-4 border rounded-lg hover:shadow-md transition-shadow"
              >
                <div>
                  <p className="font-medium">{item.fileName}</p>
                  <p className="text-sm text-gray-500">
                    {new Date(item.date).toLocaleDateString()}
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  {item.password && <Lock className="w-4 h-4 text-gray-400" />}
                  <a
                    href={item.url}
                    download={item.fileName}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    Download
                  </a>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
};

export default Dashboard