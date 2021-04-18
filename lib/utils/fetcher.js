const fetcher = async (url, options) => {
  const response = await fetch(url, options);

  if (!response.status.toString().startsWith('2')) {
    const { message } = await response.json();
    throw new Error(message);
  }

  return response.json();
};

export default fetcher;
