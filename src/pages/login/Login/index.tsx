import React from "react";
import { HeroPage } from "components/HeroPage";
import {
  FormControl,
  FormErrorMessage,
  Input,
  Button,
  Text,
  Box,
  VStack,
  Flex,
} from "@chakra-ui/react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useCallback } from "react";
import { useLogInMutation } from "./logIn.generated";
import { useHistory, useRouteMatch } from "react-router-dom";
import { useState } from "react";

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
          history.push("/dashboard");
          break;
        case "AuthenticationError":
          setResponseError(logInResult.logInAsUser.message);
          break;
      }
    },
    [logIn, history, setResponseError]
  );

  return (
    <HeroPage>
      <Flex
        as="form"
        onSubmit={handleSubmit(onFormSubmit)}
        flexDir="column"
        alignItems="center"
      >
        <FormControl isInvalid={!!errors.email} mb="15px">
          <Input
            type="email"
            placeholder="Email"
            {...register("email", {
              required: "Please provide an email",
            })}
          />
          {errors.email ? (
            <FormErrorMessage>{errors.email.message}</FormErrorMessage>
          ) : null}
        </FormControl>
        <FormControl isInvalid={!!errors.password} mb="40px">
          <Input
            type="password"
            placeholder="Password"
            {...register("password", {
              required: "Please provide a password",
            })}
          />
          {errors.password ? (
            <FormErrorMessage>{errors.password.message}</FormErrorMessage>
          ) : null}
        </FormControl>
        <Button
          isDisabled={isSubmitting}
          type="submit"
          colorScheme="purple"
          fontSize="sm"
          size="lg"
        >
          Log In
        </Button>
        {responseError !== undefined ? <Text>{responseError}</Text> : null}
      </Flex>
    </HeroPage>
  );
};
