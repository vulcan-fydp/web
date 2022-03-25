import { useApolloClient } from "@apollo/client";
import {
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  Input,
  Text,
  Link,
} from "@chakra-ui/react";
import { HeroPage } from "app/components/HeroPage";
import { useCallback } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { useCreateUserMutation } from "app/pages/Signup/createUser.backend.generated";

interface LoginForm {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export const SignUpPage = () => {
  const {
    handleSubmit,
    register,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<LoginForm>();
  const navigate = useNavigate();
  const apolloClient = useApolloClient();
  const [createUser] = useCreateUserMutation();

  const onFormSubmit = useCallback<SubmitHandler<LoginForm>>(
    async (data) => {
      const { data: createUserResult } = await createUser({
        variables: {
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          password: data.password,
        },
      });

      if (!createUserResult) {
        setError(
          "password",
          {
            message: "An unknown error occured.",
          },
          { shouldFocus: true }
        );
        return;
      }

      switch (createUserResult.createUser!.__typename) {
        case "User":
          await apolloClient.resetStore();
          navigate("/room");
          break;
        case "AuthenticationError":
          setError(
            "password",
            { message: createUserResult.createUser.message },
            { shouldFocus: true }
          );
          break;
        case "EmailInUseError":
          setError(
            "email",
            { message: createUserResult.createUser.message },
            { shouldFocus: true }
          );
          break;
        case "InvalidEmailError":
          setError(
            "email",
            { message: createUserResult.createUser.message },
            { shouldFocus: true }
          );
          break;
        case "InvalidFirstNameError":
          setError(
            "firstName",
            { message: createUserResult.createUser.message },
            { shouldFocus: true }
          );
          break;
        case "InvalidLastNameError":
          setError(
            "lastName",
            { message: createUserResult.createUser.message },
            { shouldFocus: true }
          );
          break;
        case "InvalidPasswordError":
          setError(
            "password",
            { message: createUserResult.createUser!.message },
            { shouldFocus: true }
          );
          break;
      }
    },
    [createUser, navigate, setError, apolloClient]
  );

  return (
    <HeroPage>
      <Text fontSize="6xl" mb="60px" fontWeight="bold">
        Sign{" "}
        <Text as="span" color="purple.300">
          Up.
        </Text>
      </Text>
      <Flex
        as="form"
        onSubmit={handleSubmit(onFormSubmit)}
        flexDir="column"
        alignItems="center"
        mb="60px"
      >
        <Flex justifyContent="space-between" width="266px" gap="10px">
          <FormControl isInvalid={!!errors.firstName} mb="10px" mr="0px">
            <Input
              type="text"
              placeholder="First name"
              {...register("firstName", {
                required: "Please provide your first name",
              })}
            />
            {errors.firstName ? (
              <FormErrorMessage>{errors.firstName.message}</FormErrorMessage>
            ) : null}
          </FormControl>
          <FormControl isInvalid={!!errors.lastName} mb="10px">
            <Input
              type="text"
              placeholder="Last name"
              {...register("lastName", {
                required: "Please provide your last name",
              })}
            />
            {errors.lastName ? (
              <FormErrorMessage>{errors.lastName.message}</FormErrorMessage>
            ) : null}
          </FormControl>
        </Flex>
        <FormControl isInvalid={!!errors.email} mb="10px" align="center">
          <Input
            type="email"
            placeholder="Email"
            autoComplete="username"
            {...register("email", {
              required: "Please provide an email",
            })}
            width="266px"
          />
          {errors.email ? (
            <FormErrorMessage>{errors.email.message}</FormErrorMessage>
          ) : null}
        </FormControl>
        <FormControl isInvalid={!!errors.password} mb="10px" align="center">
          <Input
            type="password"
            autoComplete="new-password"
            placeholder="Password"
            {...register("password", {
              required: "Please provide a password",
            })}
            width="266px"
          />
          {errors.password ? (
            <FormErrorMessage>{errors.password.message}</FormErrorMessage>
          ) : null}
        </FormControl>
        <Button isLoading={isSubmitting} type="submit" size="lg" mb="20px">
          Sign Up
        </Button>
      </Flex>
      <Text size="sm" mb="10px">
        Have an account?{" "}
        <Link as={RouterLink} to="/login">
          Log in.
        </Link>
      </Text>
    </HeroPage>
  );
};
