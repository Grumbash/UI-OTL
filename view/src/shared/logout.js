export const logout = (storage, router) => {
  if (storage.jwt) {
    storage.removeItem("jwt");
    router.push("auth");
  }
};
