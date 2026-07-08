export const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000/api/v1';

export const ROUTES = {
  HOME: '/dashboard',
  LOGIN: '/login',
  SIGNUP: '/signup',
  SETTINGS: '/settings',
};

export const CONTRACT_STATUS = {
  ACTIVE: 'Active',
  PENDING: 'Pending',
  EXPIRING: 'Expiring Soon',
  EXPIRED: 'Expired',
  TERMINATED: 'Terminated'
};