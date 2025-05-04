import { FC, useState } from "react";

import { CreateUserForm } from "../components/UserForms/CreateUserForm";
import { AuthorizationUserForm } from "../components/UserForms/AuthorizationUserForm";

export const UserCreation: FC = () => {
  const [checkerForm, setCheckerForm] = useState<boolean>(false);

  const toggleForm = () => setCheckerForm((prev) => !prev);

  return (
    <>
      {checkerForm ? (
        <AuthorizationUserForm switchForm={toggleForm} />
      ) : (
        <CreateUserForm switchForm={toggleForm} />
      )}
    </>
  );
};
