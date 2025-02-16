import { BASE_URL } from 'constants/map-env';
import { toast } from 'react-toastify';

class HttpServices {
  async get<T>(uri: string): Promise<T | undefined> {
    const url = new URL(uri, BASE_URL);

    try {
      const response = await fetch(url);
      if (!response.ok) {
        const errorMessage = await response.json();
        throw errorMessage || 'Failed to post data';
      }

      return response.json();
    } catch (err) {
      toast.error(err as string);
      return;
    }
  }

  async post<T, R>(uri: string, body?: T): Promise<R | undefined> {
    const url = new URL(uri, BASE_URL);

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: body ? JSON.stringify(body) : undefined,
      });

      if (!response.ok) {
        const errorMessage = await response.json();
        throw errorMessage || 'Failed to post data';
      }
      const data = await response.json();

      toast.success('Success!');
      return data;
    } catch (err) {
      toast.error(err as string);
      return;
    }
  }
}

export const httpServices = new HttpServices();
