import { Button } from "@chakra-ui/button";
import { Input } from "@chakra-ui/input";
import { Text, Box, HStack, Flex, Wrap, WrapItem } from "@chakra-ui/layout";
import { Skeleton, SkeletonText } from "@chakra-ui/skeleton";
import { useToken } from "@chakra-ui/system";
import { ErrorPage } from "components/ErrorPage";
import { HeroPage } from "components/HeroPage";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useAccountQuery } from "./account.backend.generated";

const AccountField = () => {
  return <Box></Box>;
};

interface AccountForm {
  firstName: string;
  lastName: string;
}

export const AccountPage = () => {
  const { data, loading, error } = useAccountQuery();

  const { register, handleSubmit, reset } = useForm<AccountForm>({
    defaultValues: {
      firstName: "",
      lastName: "",
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
        <Text mt="20px" mb="20px" fontSize="4xl">
          Account
        </Text>
        <Wrap spacing="10px" justify="stretch">
          <WrapItem display="block" flex="1 0 200px">
            <Text fontSize="sm" textTransform="uppercase" mb="2px">
              First Name
            </Text>
            <Skeleton isLoaded={isLoaded}>
              <Input {...register("firstName")} />
            </Skeleton>
          </WrapItem>
          <WrapItem display="block" flex="1 0 200px">
            <Text fontSize="sm" textTransform="uppercase" mb="2px">
              Last Name
            </Text>
            <Skeleton isLoaded={isLoaded}>
              <Input {...register("lastName")} />
            </Skeleton>
          </WrapItem>
        </Wrap>
        <Box mt="20px">
          <Text fontSize="sm" textTransform="uppercase" mb="2px">
            Email
          </Text>
          <Skeleton isLoaded={isLoaded}>
            <Input value={data?.user?.email ?? ""} isReadOnly />
          </Skeleton>
        </Box>
        <Box mt="20px">
          <Text fontSize="sm" textTransform="uppercase" mb="2px">
            Password
          </Text>
          <HStack>
            <Skeleton isLoaded={isLoaded} flex="1">
              <Input value="**********" isReadOnly />
            </Skeleton>
            <Button variant="outline">Change</Button>
          </HStack>
        </Box>

        <Button mt="20px">Update account</Button>
      </Box>
    </HeroPage>
  );
};
