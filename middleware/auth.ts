export default defineNuxtRouteMiddleware((to, from) => {
  const token = localStorage.getItem("token");
  const user = localStorage.getItem("user");
  // redirect the user to the login page
  if (!token || !user) {
    return navigateTo({
      path: "/login",
      query: {
        redirect: to.fullPath,
      },
    });
  }
});
