export const setBaseURL = () => {
  if (window) {
    let newHost = prompt('Masukkan URL Web Server:');

    if (!newHost) {
      return;
    }

    if (!newHost.startsWith('http://')) {
      newHost = `http://${newHost}`;
    }

    if (newHost[newHost.length - 1] !== '/') {
      newHost += '/';
    }

    localStorage.setItem('BASE_URL', newHost);
    window.location.reload();
  }
};

export const getBaseURL = () => localStorage.getItem('BASE_URL') || '';
