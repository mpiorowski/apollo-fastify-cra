import { Button, Flex, useDisclosure } from "@chakra-ui/react";
import React from "react";
import { useParams } from "react-router";
import { useFindCategoryById } from "../../@common/categories.api";
import { TopicDrawer } from "./TopicDrawer";
import TopicsTable from "./TopicsTable";

export const TopicsPage: React.FC = () => {
  const { categoryId } = useParams<{ categoryId: string }>();

  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef(null);

  const { response } = useFindCategoryById(categoryId as string);
  console.log(response);

  return (
    <>
      <TopicDrawer categoryId={categoryId as string} btnRef={btnRef} isOpen={isOpen} onClose={onClose} />
      <Flex justifyContent="right" p="5">
        <Button ref={btnRef} onClick={onOpen} w="200px">
          Dodaj temat
        </Button>
      </Flex>
      <TopicsTable category={response} />
    </>
  );
};
