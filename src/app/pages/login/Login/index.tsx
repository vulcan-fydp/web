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
import { useLogInMutation } from "./logIn.backend.generated";

interface LoginForm {
  email: string;
  password: string;
}

export const LoginPage = () => {
  const {
    handleSubmit,
    register,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<LoginForm>();
  const navigate = useNavigate();
  const apolloClient = useApolloClient();
  const [logIn] = useLogInMutation();

  const onFormSubmit = useCallback<SubmitHandler<LoginForm>>(
    async (data) => {
      const { data: logInResult } = await logIn({
        variables: {
          email: data.email,
          password: data.password,
        },
      });

      if (!logInResult) {
        setError(
          "password",
          {
            message: "An unknown error occured.",
          },
          { shouldFocus: true }
        );
        return;
      }

      switch (logInResult.logInAsUser.__typename) {
        case "User":
          await apolloClient.resetStore();
          navigate("/room");
          break;
        case "AuthenticationError":
          setError(
            "password",
            { message: logInResult.logInAsUser.message },
            { shouldFocus: true }
          );
          break;
      }
    },
    [logIn, navigate, setError, apolloClient]
  );

  return (
    <HeroPage>
      <Text fontSize="6xl" mb="60px" fontWeight="bold">
        Log{" "}
        <Text as="span" color="purple.300">
          In.
        </Text>
      </Text>
      <Flex
        as="form"
        onSubmit={handleSubmit(onFormSubmit)}
        flexDir="column"
        alignItems="center"
        mb="60px"
      >
        <FormControl isInvalid={!!errors.email} mb="10px" align="center">
          <Input
            type="email"
            autoComplete="username"
            placeholder="Email"
            {...register("email", {
              required: "Please provide an email",
            })}
            width="266px"
          />
          {errors.email ? (
            <FormErrorMessage>{errors.email.message}</FormErrorMessage>
          ) : null}
        </FormControl>
        <FormControl isInvalid={!!errors.password} mb="20px" align="center">
          <Input
            type="password"
            autoComplete="current-password"
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
          Log In
        </Button>
      </Flex>
      {/* <Text size="sm" mb="10px">
        <Link as={RouterLink} to="/reset-password">
          Forgot your password?
        </Link>
      </Text> */}
      <Text size="sm">
        <Link as={RouterLink} to="/signup">
          Create an account
        </Link>
      </Text>
    </HeroPage>
  );
};
