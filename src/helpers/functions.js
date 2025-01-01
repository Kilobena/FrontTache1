export const isImageUrl = (url) => {
  const imageExtensions = /\.(png|jpe?g|gif|svg|jpg)$/i;
  return typeof url === "string" && imageExtensions.test(url);
};
