import { useToast } from "@chakra-ui/toast";
import React, { useEffect } from "react";
import { useHistory } from "react-router";
import { apiRequest } from "../@common/@apiRequest";
import { useQuery } from "../@common/@hooks";
import { LoadingPage } from "./@common/LoadingPage";

type Props = {
  setIsAuth: React.Dispatch<React.SetStateAction<boolean>>;
};

export const TokenPage: React.FC<Props> = ({ setIsAuth }: Props) => {
  let query = useQuery();
  let history = useHistory();
  const toast = useToast();

  useEffect(() => {
    if (query.get("token")) {
      apiRequest({
        url: `/auth/token`,
        method: "POST",
        body: JSON.stringify(query.get("token")),
      }).then((response) => {
        if (response) {
          setIsAuth(true);
        } else {
          toast({
            title: "Token was incorrect",
            status: "error",
            duration: 2000,
            isClosable: true,
            position: "top-right",
          });
          history.push("/login");
        }
      });
    }
  }, [query, history, setIsAuth, toast]);

  return <LoadingPage></LoadingPage>;
};
