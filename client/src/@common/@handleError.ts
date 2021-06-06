import { createStandaloneToast } from "@chakra-ui/react";
import { CombinedError } from "@urql/core";

export function handleError(error: CombinedError): void {
  const toast = createStandaloneToast();
  toast({
    title: error["message"],
    status: "error",
    duration: 2000,
    isClosable: true,
    position: "top-right",
  });
}
