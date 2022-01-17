import { useApolloClient } from "@apollo/client";
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  Input,
  Text,
  Link,
} from "@chakra-ui/react";
import { HeroPage } from "app/components/HeroPage";
import React, { useCallback, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Link as RouterLink, useHistory } from "react-router-dom";
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
  const history = useHistory();
  const apolloClient = useApolloClient();

  const [responseError, setResponseError] = useState<string>();

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
        setResponseError("An unknown error occured.");
        return;
      }

      switch (logInResult.logInAsUser.__typename) {
        case "User":
          await apolloClient.resetStore();
          history.push("/room");
          break;
        case "AuthenticationError":
          setResponseError(logInResult.logInAsUser.message);
          break;
      }
    },
    [logIn, history, setResponseError, apolloClient]
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
        <Button
          isDisabled={isSubmitting}
          type="submit"
          colorScheme="purple"
          size="lg"
          mb="20px"
        >
          Log In
        </Button>
        {responseError !== undefined ? <Text>{responseError}</Text> : null}
      </Flex>
      <Text size="sm" mb="10px">
        <Link as={RouterLink} to="/reset-password">
          Forgot your password?
        </Link>
      </Text>
      <Text size="sm">
        <Link as={RouterLink} to="/sign-up">
          Create an account
        </Link>
      </Text>
    </HeroPage>
  );
};
