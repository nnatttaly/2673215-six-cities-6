export const formatReviewDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    month: 'long',
    year: 'numeric',
  });
};

export const getISODateString = (dateString: string): string => new Date(dateString).toISOString().split('T')[0];
