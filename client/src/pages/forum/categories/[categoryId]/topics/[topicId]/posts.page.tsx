import { Button, Flex, Grid, useDisclosure } from "@chakra-ui/react";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useFindTopicById } from "../../../../@common/topics.api";
import { PostContent } from "./PostContent";
import { PostDrawer } from "./PostDrawer";

export const PostsPage: React.FC = () => {
  const { topicId } = useParams<{ topicId: string }>();

  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef(null);

  const [replyId, setReplyId] = useState<string>();

  const { response } = useFindTopicById(topicId as string);

  return (
    <>
      <PostDrawer topicId={topicId as string} btnRef={btnRef} isOpen={isOpen} onClose={onClose} replyId={replyId} />
      <Flex justifyContent="right" p="5">
        <Button
          ref={btnRef}
          onClick={() => {
            setReplyId(undefined);
            onOpen();
          }}
          w="200px"
        >
          Dodaj post
        </Button>
      </Flex>
      <Grid
        width="80%"
        margin="auto"
        marginTop="40px"
        background="rgba(160, 155, 155, 0.329)"
        rowGap="0.5"
        paddingTop="0.5"
        paddingBottom="0.5"
      >
        {response?.posts?.map((post) => (
          <PostContent key={post.id} post={post} onOpen={onOpen} setReplyId={() => setReplyId(post.id)} />
        ))}
      </Grid>
    </>
  );
};
