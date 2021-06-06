import { useMemo } from "react";
import { gql, useMutation, useQuery } from "urql";
import { Category } from "../../../../../@types/forum.types";
import { GraphqlMutation, GraphqlQuery } from "../../../@common/@types";

export function useFindAllCategories(): GraphqlQuery<Category[]> {
  const query = gql`
    query {
      categories {
        id
        title
        description
        postsCount
        topics {
          title
        }
      }
    }
  `;
  const context = useMemo(() => ({ additionalTypenames: ["Category"] }), []);
  const [result, reexecuteQuery] = useQuery({ query, context });
  const { data, fetching, error } = result;
  const response = data?.categories || [];
  return { response, fetching, error, reexecuteQuery };
}

export function useFindCategoryById(categoryId: string): GraphqlQuery<Category | null> {
  const query = gql`
    query Category($categoryId: String!) {
      category(id: $categoryId) {
        id
        title
        description
        topics {
          id
          title
          description
          posts {
            id
            replies {
              id
            }
          }
        }
      }
    }
  `;
  const context = useMemo(() => ({ additionalTypenames: ["Topic"] }), []);
  const [result, reexecuteQuery] = useQuery({ query, context, variables: { categoryId } });
  const { data, fetching, error } = result;
  const response = data?.category || null;
  return { response, fetching, error, reexecuteQuery };
}

export const useAddCategory = (): GraphqlMutation<Category> => {
  const query = gql`
    mutation CreateCategory($title: String, $description: String) {
      createCategory(title: $title, description: $description) {
        id
        title
        description
      }
    }
  `;
  const [result, mutate] = useMutation(query);
  const { data: response, fetching, error } = result;
  return { mutate, response, fetching, error };
};
