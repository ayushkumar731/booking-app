import axios from 'axios';
import { showAlert } from './alerts';

export const forgotSettings = async (data, type, message, method, token) => {
  const url = type === 'forgot' ? '/api/v1/users/forgotPassword' : `${token}`;
  try {
    const res = await axios({
      method: `${method}`,
      url,
      data
    });
    if (res.data.status === 'success') {
      showAlert('success', `${message}`);
      window.setTimeout(() => {
        location.assign('/');
      }, 1000);
    }
  } catch (err) {
    showAlert('error', err.response.data.message);
  }
};
