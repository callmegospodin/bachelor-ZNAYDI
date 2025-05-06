import { ChangeEvent, FC, useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { emailRegex, phoneRegex } from "../../constants/constants";
import { toast } from "react-toastify";
import { UserDataType } from "../../types/user.types";

import { UserFormBodyContainer } from "./UserFormBody/UserFormBody";
import { UserFormHeader } from "./UserFormHeader/AuthHeader";
import { PositionService } from "../../api/position.service";
import { PositionType } from "../../types/position.types";

import { UserService } from "../../api/user.service";
import { useNavigate } from "react-router-dom";
import { PasswordVisibleSVG } from "../../../../../assets/ShowPassword/passwordVisibleSVG";
import { PasswordUnVisibleSVG } from "../../../../../assets/ShowPassword/passwordUnVisibleSVG";
import { Button } from "../../../../shared/components/buttons/buttons";

interface IFormInput {
  email: string;
  firstName: string;
  lastName: string;
  //photo: any;
  password: string;
}

interface CreateUserFormProps {
  switchForm: () => void;
}

export const CreateUserForm: FC<CreateUserFormProps> = ({ switchForm }) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>();

  const navigate = useNavigate();

  const handleSwitchForm = () => {
    switchForm();
  };

  const togglePasswordVisibility = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    setIsPasswordVisible((prevState) => !prevState);
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];
    setPhotoFile(file || null);
  };

  const handleRedirectToEventList = (e: any) => {
    navigate("/events");
  };

  const onSubmit: SubmitHandler<IFormInput> = async (
    data: Omit<UserDataType, "position">
  ) => {
    try {
      const response = await UserService.createUser({
        ...data,
        //photo: photoFile,
      });

      if (response?.status) {
        toast.success("User has been created");
        handleSwitchForm();
      }

      if (response?.errors?.length) {
        toast.error(response?.errors[0].message);
      }
    } catch (err: any) {
      toast.error(err);
    }
  };

  return (
    <UserFormBodyContainer>
      <UserFormHeader />

      <form onSubmit={handleSubmit(onSubmit)}>
        <label className="block text-gray-700 text-sm font-bold">
          Електронна адреса
        </label>
        <input
          {...register("email", {
            required: true,
            maxLength: 96,
            pattern: emailRegex,
          })}
          className="my-2 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          type="text"
          placeholder="Електронна адреса"
        />
        {errors.email && (
          <div className="-mt-2 text-red-500 text-sm">
            <span>
              {errors.email.type === "required" &&
                "Це поле обов'язкове для заповнення"}
              {errors.email.type === "maxLength" && "Max length 96 symbols"}
              {errors.email.type === "pattern" &&
                "Електронна адреса повина бути у форматі: 'someEmail@gmail.com'"}
            </span>
          </div>
        )}

        <label className="block text-gray-700 text-sm font-bold">Імʼя</label>
        <input
          {...register("firstName", {
            required: true,
            maxLength: 60,
          })}
          className="my-2 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          type="text"
          placeholder="Ім'я"
        />
        {errors.firstName && (
          <div className="-mt-2 text-red-500 text-sm">
            <span>
              {errors.firstName.type === "required" &&
                "Це поле обов'язкове для заповнення"}
              {errors.firstName.type === "maxLength" && "Max length 96 symbols"}
            </span>
          </div>
        )}

        <label className="block text-gray-700 text-sm font-bold">
          Прізвище
        </label>
        <input
          {...register("lastName", {
            required: true,
            maxLength: 60,
          })}
          className="my-2 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          type="text"
          placeholder="Прізвище"
        />
        {errors.lastName && (
          <div className="-mt-2 text-red-500 text-sm">
            <span>
              {errors.lastName.type === "required" &&
                "Це поле обов'язкове для заповнення"}
              {errors.lastName.type === "maxLength" && "Max length 96 symbols"}
            </span>
          </div>
        )}

        <div className="relative container">
          <label className="block text-gray-700 text-sm font-bold">
            Пароль
          </label>
          <input
            type={isPasswordVisible ? "text" : "password"}
            {...register("password", {
              required: true,
              minLength: 5,
              maxLength: 20,
            })}
            className="my-2 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Пароль"
          />
          <button
            className="mt-5 absolute inset-y-0 right-0 flex items-center px-4 text-gray-600"
            onClick={(e) => togglePasswordVisibility(e)}
          >
            {isPasswordVisible ? (
              <PasswordVisibleSVG />
            ) : (
              <PasswordUnVisibleSVG />
            )}
          </button>
          {errors.password && (
            <div className="-mt-2 text-red-500 text-sm">
              <span>
                {errors.password.type === "required" &&
                  "Це поле обов'язкове для заповнення"}
                {errors.password.type === "minLength" &&
                  "Мінімальна довжина 5 символів"}
                {errors.password.type === "maxLength" &&
                  "Максимальна довжина 20 символів"}
              </span>
            </div>
          )}
        </div>

        <div className="mb-5 pb-1 pt-1 text-center">
          <div className="w-full">
            <Button
              type="submit"
              children="Зареєструватися"
              btnStyle="secondary"
            />
          </div>
        </div>

        <div className="flex items-center justify-between pb-6">
          <p className="mb-0 mr-2">Вже є акаунт?</p>
          <div>
            <button
              onClick={handleRedirectToEventList}
              type="button"
              className="inline-block rounded border-2 border-danger px-6 pb-[6px] pt-2 text-xs font-medium uppercase leading-normal text-danger transition duration-150 ease-in-out hover:border-danger-600 hover:bg-neutral-500 hover:bg-opacity-10 hover:text-danger-600 focus:border-danger-600 focus:text-danger-600 focus:outline-none focus:ring-0 active:border-danger-700 active:text-danger-700 dark:hover:bg-neutral-100 dark:hover:bg-opacity-10"
            >
              Список івентів
            </button>
          </div>
          <div>
            <button
              type="button"
              className="inline-block rounded border-2 border-danger px-6 pb-[6px] pt-2 text-xs font-medium uppercase leading-normal text-danger transition duration-150 ease-in-out hover:border-danger-600 hover:bg-neutral-500 hover:bg-opacity-10 hover:text-danger-600 focus:border-danger-600 focus:text-danger-600 focus:outline-none focus:ring-0 active:border-danger-700 active:text-danger-700 dark:hover:bg-neutral-100 dark:hover:bg-opacity-10"
              onClick={switchForm}
            >
              Увійти
            </button>
          </div>
        </div>
      </form>
    </UserFormBodyContainer>
  );
};
