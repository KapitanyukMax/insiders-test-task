const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export const uploadImages = async (formData) => {
  const res = await fetch(`${apiUrl}/images-upload`, {
    method: 'PUT',
    body: formData,
  });

  if (!res.ok) {
    const { message } = await res.json();
    throw new Error(message);
  }

  return res.json();
};
