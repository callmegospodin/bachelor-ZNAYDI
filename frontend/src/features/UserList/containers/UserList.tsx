import { FC, useEffect, useState } from "react";
import { UserService } from "../../UserCreation/api/user.service";
import { UserDataType } from "../../UserCreation/types/user.types";
import { toast } from "react-toastify";
import { Button } from "../../../shared/components/buttons/buttons";
import { useNavigate } from "react-router-dom";

export const UserList: FC = () => {
  const bucketURL = process.env.REACT_APP_S3_BUCKET_URL;
  const [listOfUsers, setListOfUsers] = useState<UserDataType[]>([]);
  const [pageCount, setPageCount] = useState(6);
  const navigate = useNavigate();

  const handleShowMore = () => {
    setPageCount((prevValue) => prevValue + 6);
  };

  const handleGetListOfUsers = async () => {
    try {
      const users = await UserService.getAllUsers();

      if (users) {
        setListOfUsers(users.data);
      }

      if (users?.errors?.length) {
        toast.error(users?.errors[0].message);
      }
    } catch (err: any) {
      toast.error(err);
    }
  };

  const handleRedirectToCreationUser = () => {
    navigate("/user");
  };

  useEffect(() => {
    handleGetListOfUsers();
  }, []);

  return (
    <div>
      <h3 className="my-10 text-4xl text-center font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-rose-600 via-red-400 to-orange-500">
        USER LIST
      </h3>
      <Button
        handler={handleRedirectToCreationUser}
        type="button"
        children="Create User"
        btnStyle="secondary"
      />
      <div className="flow-root">
        <ul className="divide-y divide-gray-200 dark:divide-gray-700">
          {listOfUsers
            ?.slice(0, pageCount)
            ?.map((user: UserDataType, index: number) => (
              <li key={index} className="py-3 sm:py-4">
                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0">
                    <img
                      className="w-8 h-8 rounded-full"
                      src={`${bucketURL}${user.photo}`}
                      alt={user?.name}
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-white-900 truncate dark:text-white">
                      {user?.name}
                    </p>
                    <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                      {user?.email}
                    </p>
                    <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                      {user?.phone}
                    </p>
                  </div>
                  <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                    {user?.position}
                  </div>
                </div>
              </li>
            ))}
        </ul>
      </div>
      <Button
        handler={handleShowMore}
        type="button"
        children="Show More"
        btnStyle="secondary"
      />
    </div>
  );
};
