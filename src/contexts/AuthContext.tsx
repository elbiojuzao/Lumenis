import React, { createContext, useContext, useState, useEffect } from 'react';

// Types
export interface User {
  id: string;
  username: string;
  email: string;
  name: string;
  isAdmin?: boolean;
  createdAt: string;
  emailVerificado?: boolean;
}

export interface Address {
  id: string;
  userId: string;
  street: string;
  number: string;
  complement?: string;
  neighborhood: string;
  city: string;
  state: string;
  zipCode: string;
  isMain: boolean;
}

interface AuthContextType {
  currentUser: User | null;
  addresses: Address[];
  isAuthenticated: boolean;
  isAdmin: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (username: string, email: string, password: string, name: string) => Promise<void>;
  logout: () => void;
  addAddress: (address: Omit<Address, 'id' | 'userId'>) => void;
  updateAddress: (id: string, address: Partial<Address>) => void;
  removeAddress: (id: string) => void;
  setMainAddress: (id: string) => void;
  updateUser: (data: Partial<User>) => void;
  verifyEmail: (token: string) => Promise<void>;
  resendVerification: () => Promise<void>; 
}

// Mock data for development
const MOCK_USERS: User[] = [
  { 
    id: '1', 
    username: 'admin', 
    email: 'admin@example.com', 
    name: 'Admin User', 
    isAdmin: true,
    createdAt: '2023-01-15T10:30:00Z'
  },
  { 
    id: '2', 
    username: 'user', 
    email: 'user@example.com', 
    name: 'Regular User',
    createdAt: '2023-02-20T14:15:00Z'
  }
];

const MOCK_ADDRESSES: Address[] = [
  {
    id: '1',
    userId: '2',
    street: 'Main Street',
    number: '123',
    neighborhood: 'Downtown',
    city: 'New York',
    state: 'NY',
    zipCode: '10001',
    isMain: true
  },
  {
    id: '2',
    userId: '2',
    street: 'Broadway',
    number: '456',
    complement: 'Apt 7B',
    neighborhood: 'Theater District',
    city: 'New York',
    state: 'NY',
    zipCode: '10019',
    isMain: false
  }
];

// Create context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Provider component
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [addresses, setAddresses] = useState<Address[]>([]);
  
  // Check for stored user on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setCurrentUser(JSON.parse(storedUser));
      
      // Load addresses for the user
      const userAddresses = MOCK_ADDRESSES.filter(
        addr => addr.userId === JSON.parse(storedUser).id
      );
      setAddresses(userAddresses);
    }
  }, []);
  
  const login = async (email: string, password: string) => {
    // Mock authentication
    const user = MOCK_USERS.find(u => u.email === email);
    
    if (!user) {
      throw new Error('Invalid email or password');
    }
    
    // In a real app, you would validate the password here
    
    // Save user to state and localStorage
    setCurrentUser(user);
    localStorage.setItem('user', JSON.stringify(user));
    
    // Load addresses for the user
    const userAddresses = MOCK_ADDRESSES.filter(addr => addr.userId === user.id);
    setAddresses(userAddresses);
  };
  
  const register = async (username: string, email: string, password: string, name: string) => {
    // Check if user already exists
    if (MOCK_USERS.some(u => u.email === email || u.username === username)) {
      throw new Error('User already exists');
    }
    
    // Create new user
    const newUser: User = {
      id: Math.random().toString(36).substr(2, 9),
      username,
      email,
      name,
      createdAt: new Date().toISOString()
    };
    
    // In a real app, you would save this to a database
    
    // Set as current user
    setCurrentUser(newUser);
    localStorage.setItem('user', JSON.stringify(newUser));
  };
  
  const logout = () => {
    setCurrentUser(null);
    setAddresses([]);
    localStorage.removeItem('user');
  };
  
  const addAddress = (address: Omit<Address, 'id' | 'userId'>) => {
    if (!currentUser) return;
    
    const newAddress: Address = {
      ...address,
      id: Math.random().toString(36).substr(2, 9),
      userId: currentUser.id
    };
    
    // If this is the first address or isMain is true, make it the main address
    if (addresses.length === 0 || address.isMain) {
      // Set all other addresses to non-main
      const updatedAddresses = addresses.map(addr => ({
        ...addr,
        isMain: false
      }));
      
      setAddresses([...updatedAddresses, newAddress]);
    } else {
      setAddresses([...addresses, newAddress]);
    }
  };
  
  const updateAddress = (id: string, addressUpdate: Partial<Address>) => {
    const isSettingMain = addressUpdate.isMain === true;
    const updatedAddresses = addresses.map(addr => {
      if (addr.id === id)  return { ...addr, ...addressUpdate };

      if (isSettingMain)  return { ...addr, isMain: false };

      return addr;
    });
    
    setAddresses(updatedAddresses);
  };
  
  const removeAddress = (id: string) => {
    const addressToRemove = addresses.find(addr => addr.id === id);
    const filteredAddresses = addresses.filter(addr => addr.id !== id);
    
    // If the removed address was the main one, set the first remaining address as main
    if (addressToRemove?.isMain && filteredAddresses.length > 0) {
      filteredAddresses[0].isMain = true;
    }
    
    setAddresses(filteredAddresses);
  };
  
  const setMainAddress = (id: string) => {
    const updatedAddresses = addresses.map(addr => ({
      ...addr,
      isMain: addr.id === id
    }));
    
    setAddresses(updatedAddresses);
  };
  
  const updateUser = (data: Partial<User>) => {
    if (!currentUser) return;
    
    const updatedUser = { ...currentUser, ...data };
    setCurrentUser(updatedUser);
    localStorage.setItem('user', JSON.stringify(updatedUser));
  };

  const verifyEmail = async (token: string) => {
    // Lógica mockada para verificar o email
    console.log(`Verificando email com token: ${token}`);
    const user = MOCK_USERS.find(u => u.id === currentUser?.id); // Simula encontrar o usuário
    if (user) {
      // Simula a atualização do status de verificação do email
      setCurrentUser({ ...user, emailVerificado: true });
      localStorage.setItem('user', JSON.stringify({ ...user, emailVerificado: true }));
    } else {
      throw new Error('Usuário não encontrado');
    }
    return new Promise((resolve) => setTimeout(resolve, 1000)); // Simula uma chamada assíncrona
  };

  const resendVerification = async () => {
    if (!currentUser) {
      throw new Error('Usuário não autenticado');
    }
    // Lógica mockada para reenviar o email de verificação
    console.log(`Reenviando email de verificação para: ${currentUser.email}`);
    return new Promise((resolve) => setTimeout(resolve, 1500)); // Simula uma chamada assíncrona
  };
  
  const value = {
    currentUser,
    addresses,
    isAuthenticated: !!currentUser,
    isAdmin: currentUser?.isAdmin || false,
    login,
    register,
    logout,
    addAddress,
    updateAddress,
    removeAddress,
    setMainAddress,
    updateUser,
    verifyEmail,
    resendVerification
  };
  
  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};