import {
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  Grid,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Textarea,
  useDisclosure,
} from "@chakra-ui/react";
import { CombinedError } from "@urql/core";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Chat } from "../../../../@types/chat.types";
import { handleError } from "../../@common/@handleError";
import { useAddChat, useChatSubscription } from "./chat.api";

export const ChatPage: React.FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [chatList, setChatList] = useState<Chat[]>([]);

  // form setup
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
    reset,
  } = useForm();

  // subscription
  const { res } = useChatSubscription();
  useEffect(() => {
    res.data?.newestChat && setChatList((currentChat) => [res.data.newestChat].concat(currentChat));
  }, [res.data]);
  // add chat mutation
  const addChat = useAddChat();

  // handle submit
  const onSubmit = async (values: Chat) => {
    try {
      const response = await addChat.mutate(values);
      if (response?.error) throw response.error;
      onClose();
      reset();
    } catch (error) {
      console.error(error);
      handleError(error as CombinedError);
    }
  };

  return (
    <>
      <Grid
        width="80%"
        margin="auto"
        backgroundColor="gray.700"
        marginTop={10}
        borderRadius={6}
        padding={8}
        paddingTop={4}
        height={300}
        overflow="auto"
        alignContent="flex-start"
      >
        {chatList.map(
          (el) =>
            el && (
              <Flex alignItems="center" alignContent="center" height={10} borderBottom="1px solid gray" key={el.id}>
                {el.content}
              </Flex>
            ),
        )}
      </Grid>
      <Flex width="80%" margin="auto" flexDirection="column" marginTop={22}>
        <Button onClick={onOpen}>Dodaj wpis</Button>

        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <form onSubmit={handleSubmit(onSubmit)}>
              <ModalHeader>Dodaj wpis</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <FormControl isInvalid={errors["content"]} h="120">
                  <Textarea
                    content="content"
                    placeholder="Wpis"
                    {...register("content", { required: "Pole nie może być puste" })}
                  />
                  <FormErrorMessage>{errors["content"] && errors["content"].message}</FormErrorMessage>
                </FormControl>
              </ModalBody>

              <ModalFooter>
                <Button colorScheme="green" type="submit" isLoading={isSubmitting}>
                  Save
                </Button>
              </ModalFooter>
            </form>
          </ModalContent>
        </Modal>
      </Flex>
      {/* <Flex width="80%" margin="auto" flexDirection="column">
          <FormControl isInvalid={errors.content} h="120">
            <FormLabel htmlFor="content">Dodaj wpis</FormLabel>
            <Textarea
              content="content"
              placeholder="Tytuł"
              {...register("content", { required: "Pole nie może być puste" })}
            />
            <FormErrorMessage>{errors.content && errors.content.message}</FormErrorMessage>
          </FormControl>
          <Button colorScheme="green" type="submit" isLoading={isSubmitting}>
            Save
          </Button>
        </Flex> */}
    </>
  );
};

export default ChatPage;
