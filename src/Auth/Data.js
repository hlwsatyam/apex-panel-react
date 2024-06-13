// export const baseUrl='http://13.201.227.209:3000'

export const baseUrl = "http://13.51.79.179:3000";

export const formatDate = (dateString) => {
    if (!dateString) return null;
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-GB', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    }).format(date);
  };