import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { AuthDetails, User, Paper, Reviewer, DeadlineResponse, failureResponse } from './types';
import { getProfile } from './lib/profile';
import { useRouter , usePathname} from 'next/navigation';
import { getAllPapers } from './lib/paper';
import { getAllReviewers } from './lib/reviewers';
import { getDeadline } from './lib/deadline';

export const AuthContext = createContext<AuthDetails | undefined>(undefined);

export const AuthProvider: any= ({ children } : { children: ReactNode }) => {
  
  const router = useRouter();
  const pathname = usePathname();

  const [token, setToken] = useState<string>('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [papers, setPapers] = useState<Paper[]>([]);
  const [reviewers, setReviewers] = useState<Reviewer[]>([]);
  const [curDeadline, setCurDeadline] = useState<DeadlineResponse|null>(null);

  useEffect(() => {
    // Check if running on the client
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('token');
      if (token) {
        setToken(token);
        setIsLoggedIn(true);
        getProfile().then(user => setUser(user));
        getAllPapers().then(papers => setPapers(papers));
        getAllReviewers().then(reviewers => setReviewers(reviewers));
        getDeadline().then(deadline => {if('deadline' in deadline) setCurDeadline(deadline)});
        console.log(papers);
      }
    }
  }, [router, pathname]);

  const login = async (token: string) => {
    if (token.startsWith('Bearer ')) {
      setToken(token);
      if (typeof window !== 'undefined') {
        localStorage.setItem('token', token);
      }
      setIsLoggedIn(true);
      const user: User = await getProfile();
      setUser(user);
      const papersData : Paper[] = await getAllPapers();
      console.log(papersData);
      setPapers(papersData);
      const reviewersData : Reviewer[] = await getAllReviewers();
      setReviewers(reviewersData);
      const deadlineData = await getDeadline();
      console.log(deadlineData);
      if('deadline' in deadlineData) {
        setCurDeadline(deadlineData);
      }
    } else {
      throw new Error('Invalid token');
    }
  };

  const logout = () => {
    setIsLoggedIn(false);
    setUser(null);
    setToken('');
    setPapers([]);
    setReviewers([]);
    if (typeof window !== 'undefined') {
      localStorage.removeItem('token');
    }
  };

  const authValue : AuthDetails = {
    token,
    isLoggedIn,
    user,
    login,
    logout,
    papers,
    reviewers,
    curDeadline,
  }
    return(
        <AuthContext.Provider value={authValue}>{children}</AuthContext.Provider>
    );
};

