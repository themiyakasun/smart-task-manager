import axios from 'axios';
import type { UserContextType, UserData } from 'index';
import React, { createContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import { loginAPI, registerAPI } from 'services/auth-service';

const UserContext = createContext<UserContextType>({} as UserContextType);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate();
  const [token, setToken] = useState<string | null>('');
  const [user, setUser] = useState<UserData | null>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const user = localStorage.getItem('user');
    const token = localStorage.getItem('token');

    if (user && token) {
      setUser(JSON.parse(user));
      setToken(token);
      axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
    }
    setIsReady(true);
  }, []);

  const registerUser = async (
    email: string,
    name: string,
    password: string
  ) => {
    await registerAPI(name, email, password)
      .then((res) => {
        if (res) {
          toast.success('Registration successfull');
          navigate('/sign-in');
        }
      })
      .catch((e) => toast.warning('Server error occured'));
  };

  const loginUser = async (email: string, password: string) => {
    await loginAPI(email, password)
      .then((res) => {
        if (res) {
          localStorage.setItem('token', res.data.token.accessToken);
          const userObj = {
            id: res.data.user.id,
            name: res.data.user.name,
            email: res.data.user.email,
          };
          localStorage.setItem('user', JSON.stringify(userObj));
          setToken(res.data.token.accessToken);
          setUser(userObj);
          toast.success('Loggin successfull');
          navigate('/');
        }
      })
      .catch((e) => toast.warning('Server error occured'));
  };

  const isLoggedIn = !!user;

  const logout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    setUser(null);
    setToken('');
    navigate('/sign-in');
  };

  return (
    <UserContext.Provider
      value={{ loginUser, user, token, logout, isLoggedIn, registerUser }}
    >
      {isReady ? children : null}
    </UserContext.Provider>
  );
};

export const useAuth = () => React.useContext(UserContext);
