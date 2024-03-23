export const paths = {
  index: "/",
  login: "/login",
  register: "/register",
  note: (noteId = ":noteId") => `/${noteId}`,
};
