export const API_BASE_URL = "http://192.168.1.14:5000";

export const ENDPOINTS = {
  LOGIN: `${API_BASE_URL}/auth/login`,
  VERIFY_CODE: `${API_BASE_URL}/Verif/Code`,
  VERIFY_PASSWORD: `${API_BASE_URL}/Verif/password`,
  RESET_PASSWORD: `${API_BASE_URL}/Verif/UpdatePw`,
};
