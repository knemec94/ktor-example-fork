import { useCurrentUserQuery } from "./domain/auth";
import { PrivateApp } from "./private-app/PrivateApp";
import { PublicApp } from "./public-app/PublicApp";

export const AppGuard = () => {
  const { data: user, isLoading } = useCurrentUserQuery();

  if (isLoading) {
    return null;
  }

  return user ? <PrivateApp /> : <PublicApp />;
};
