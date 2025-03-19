export interface User {
  email: string;
  password: string;
  name: string;
  profilePicture?: string;
  pin?: string;
}

export interface ConversionHistory {
  id: string;
  fileName: string;
  date: string;
  type: 'zip';
  password?: string;
  pin?: string;
  url: string;
}