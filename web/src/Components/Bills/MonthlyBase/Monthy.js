import api from "../../../services/api";

const MONTHS_CACHE_KEY = 'months_cache';

export const getMonths = async () => {
  const cachedMonths = localStorage.getItem(MONTHS_CACHE_KEY);

  if (cachedMonths) {
    return JSON.parse(cachedMonths);
  }

  try {
    const response = await api.get('/monthyear/month');
    const months = response.data.content;

    // Cache the months in localStorage
    localStorage.setItem(MONTHS_CACHE_KEY, JSON.stringify(months));

    return months;
  } catch (error) {
    console.error('Failed to fetch months:', error);
    throw error;
  }
};
