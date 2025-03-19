export const saveUser = (user: User) => {
  localStorage.setItem('user', JSON.stringify(user));
};

export const getUser = (): User | null => {
  const user = localStorage.getItem('user');
  return user ? JSON.parse(user) : null;
};

export const saveHistory = (history: ConversionHistory[]) => {
  localStorage.setItem('history', JSON.stringify(history));
};

export const getHistory = (): ConversionHistory[] => {
  const history = localStorage.getItem('history');
  return history ? JSON.parse(history) : [];
};