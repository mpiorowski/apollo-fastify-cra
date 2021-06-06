import { useMemo } from "react";
import { gql, useMutation, useQuery } from "urql";
import { Topic } from "../../../../../@types/forum.types";
import { handleError } from "../../../@common/@handleError";
import { GraphqlMutation, GraphqlQuery } from "../../../@common/@types";

export function useFindTopicById(topicId: string): GraphqlQuery<Topic> {
  const query = gql`
    query ($topicId: String!) {
      topic(id: $topicId) {
        id
        title
        description
        posts {
          id
          content
          replies {
            id
            content
          }
        }
      }
    }
  `;

  const context = useMemo(() => ({ additionalTypenames: ["Post"] }), []);
  const [result, reexecuteQuery] = useQuery({ query, variables: { topicId }, pause: !topicId, context });
  const { data, fetching, error } = result;
  if (error) {
    handleError(error);
  }
  const response = data?.topic || [];
  return { response, fetching, error, reexecuteQuery };
}

export const useAddTopic = (): GraphqlMutation<Topic> => {
  const query = gql`
    mutation ($categoryId: String!, $title: String!, $description: String!) {
      createTopic(categoryId: $categoryId, title: $title, description: $description) {
        title
        description
        id
      }
    }
  `;
  const [result, mutate] = useMutation(query);
  const { data: response, fetching, error } = result;
  return { mutate, response, fetching, error };
};
