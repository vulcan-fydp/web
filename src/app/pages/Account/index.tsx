import { Button } from "@chakra-ui/button";
import { Input } from "@chakra-ui/input";
import { Text, Box, Wrap, WrapItem } from "@chakra-ui/layout";
import { FormControl, FormErrorMessage, useToast } from "@chakra-ui/react";
import { Skeleton } from "@chakra-ui/skeleton";
import { apolloClient } from "app/apollo";
import { ErrorPage } from "app/components/ErrorPage";
import { HeroPage } from "app/components/HeroPage";
import { useCallback, useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import {
  AccountQuery,
  useAccountQuery,
  useUpdateUserMutation,
} from "app/pages/Account/account.backend.generated";

interface UpdateFormProps {
  isLoaded: boolean;
  data?: AccountQuery;
}

interface UpdateNameFields {
  firstName?: string;
  lastName?: string;
}

const UpdateNameForm: React.FC<UpdateFormProps> = ({ isLoaded, data }) => {
  const {
    handleSubmit,
    register,
    setError,
    reset,
    formState: { errors, isSubmitting, isDirty },
  } = useForm<UpdateNameFields>({
    defaultValues: {
      firstName: data?.user?.firstName,
      lastName: data?.user?.lastName,
    },
  });

  useEffect(() => {
    if (data?.user) {
      reset({
        firstName: data.user.firstName,
        lastName: data.user.lastName,
      });
    }
  }, [data, reset]);

  const showToast = useToast();

  const [updateUser] = useUpdateUserMutation();
  const onFormSubmit = useCallback<SubmitHandler<UpdateNameFields>>(
    async (data) => {
      const { data: updateUserResult } = await updateUser({
        variables: {
          firstName: data.firstName,
          lastName: data.lastName,
        },
      });
      if (!updateUserResult || !updateUserResult.updateUser) {
        setError("lastName", {
          message: "An unknown error occured.",
        });
        return;
      }
      switch (updateUserResult.updateUser.__typename) {
        case "User":
          await apolloClient.resetStore();
          showToast({
            title: "Name successfully updated",
            status: "success",
            duration: 4000,
            position: "bottom",
          });
          break;
        case "AuthenticationError":
          setError(
            "lastName",
            { message: updateUserResult.updateUser.message },
            { shouldFocus: true }
          );
          break;
        case "InvalidFirstNameError":
          setError(
            "firstName",
            { message: updateUserResult.updateUser.message },
            { shouldFocus: true }
          );
          break;
        case "InvalidLastNameError":
          setError(
            "lastName",
            { message: updateUserResult.updateUser.message },
            { shouldFocus: true }
          );
          break;
      }
    },
    [updateUser, setError, showToast]
  );

  return (
    <Box as="form" onSubmit={handleSubmit(onFormSubmit)} mb="40px">
      <Wrap spacing="10px" justify="stretch">
        <WrapItem display="block" flex="1 0 200px">
          <FormControl isInvalid={!!errors.firstName}>
            <Text fontSize="sm" textTransform="uppercase" mb="2px">
              First Name
            </Text>
            <Skeleton isLoaded={isLoaded}>
              <Input
                {...register("firstName", {
                  required: "Please provide a first name",
                })}
              />
            </Skeleton>
            {errors.firstName ? (
              <FormErrorMessage>{errors.firstName.message}</FormErrorMessage>
            ) : null}
          </FormControl>
        </WrapItem>

        <WrapItem display="block" flex="1 0 200px">
          <FormControl isInvalid={!!errors.lastName}>
            <Text fontSize="sm" textTransform="uppercase" mb="2px">
              Last Name
            </Text>
            <Skeleton isLoaded={isLoaded}>
              <Input
                {...register("lastName", {
                  required: "Please provide a last name",
                })}
              />
            </Skeleton>
            {errors.lastName ? (
              <FormErrorMessage>{errors.lastName.message}</FormErrorMessage>
            ) : null}
          </FormControl>
        </WrapItem>
      </Wrap>
      <Button
        isLoading={isSubmitting}
        isDisabled={!isDirty}
        type="submit"
        mt="10px"
      >
        Update name
      </Button>
    </Box>
  );
};
interface UpdatePasswordFields {
  oldPassword?: string;
  newPassword?: string;
}

const UpdatePasswordForm: React.FC<UpdateFormProps> = ({ isLoaded }) => {
  const {
    handleSubmit,
    register,
    setError,
    reset,
    formState: { errors, isSubmitting, isDirty },
  } = useForm<UpdatePasswordFields>({
    defaultValues: {
      oldPassword: "",
      newPassword: "",
    },
  });
  const showToast = useToast();

  const [updateUser] = useUpdateUserMutation();
  const onFormSubmit = useCallback<SubmitHandler<UpdatePasswordFields>>(
    async (data) => {
      const { data: updateUserResult } = await updateUser({
        variables: {
          oldPassword: data.oldPassword,
          newPassword: data.newPassword,
        },
      });

      if (!updateUserResult || !updateUserResult.updateUser) {
        setError("newPassword", {
          message: "An unknown error occured.",
        });
        return;
      }

      switch (updateUserResult.updateUser.__typename) {
        case "User":
          reset();
          showToast({
            title: "Password successfully updated",
            status: "success",
            duration: 4000,
            position: "bottom",
          });
          break;
        case "AuthenticationError":
          setError(
            "newPassword",
            { message: updateUserResult.updateUser.message },
            { shouldFocus: true }
          );
          break;
        case "InvalidOldPasswordError":
          setError(
            "oldPassword",
            { message: updateUserResult.updateUser.message },
            { shouldFocus: true }
          );
          break;
        case "InvalidNewPasswordError":
          setError(
            "newPassword",
            { message: updateUserResult.updateUser.message },
            { shouldFocus: true }
          );
          break;
      }
    },
    [updateUser, setError, showToast, reset]
  );

  return (
    <Box as="form" onSubmit={handleSubmit(onFormSubmit)} mb="40px">
      <FormControl isInvalid={!!errors.oldPassword} mb="10px">
        <Text fontSize="sm" textTransform="uppercase" mb="2px">
          Current Password
        </Text>
        <Skeleton isLoaded={isLoaded} flex="1">
          <Input
            type="password"
            {...register("oldPassword", {
              required: "Please provide your current password",
            })}
          />
        </Skeleton>
        {errors.oldPassword ? (
          <FormErrorMessage>{errors.oldPassword.message}</FormErrorMessage>
        ) : null}
      </FormControl>
      <FormControl isInvalid={!!errors.newPassword} mb="10px">
        <Text fontSize="sm" textTransform="uppercase" mb="2px">
          New Password
        </Text>
        <Skeleton isLoaded={isLoaded} flex="1">
          <Input
            type="password"
            {...register("newPassword", {
              required: "Please provide a new password",
            })}
          />
        </Skeleton>
        {errors.newPassword ? (
          <FormErrorMessage>{errors.newPassword.message}</FormErrorMessage>
        ) : null}
      </FormControl>
      <Button isLoading={isSubmitting} isDisabled={!isDirty} type="submit">
        Update password
      </Button>
    </Box>
  );
};

export const AccountPage = () => {
  const { data, loading, error } = useAccountQuery();

  if (error) {
    return <ErrorPage isTransient />;
  }

  if (!loading && (!data || !data.user)) {
    return <ErrorPage />;
  }

  const isLoaded = !loading;

  return (
    <HeroPage>
      <Box maxW="800px" w="90%">
        <Text mb="40px" fontSize="4xl">
          Account
        </Text>
        <Box mb="40px">
          <Text fontSize="sm" textTransform="uppercase" mb="2px">
            Email
          </Text>
          <Skeleton isLoaded={isLoaded}>
            <Input value={data?.user?.email ?? ""} isReadOnly />
          </Skeleton>
        </Box>
        <UpdateNameForm isLoaded={isLoaded} data={data} />
        <UpdatePasswordForm isLoaded={isLoaded} />
      </Box>
    </HeroPage>
  );
};
