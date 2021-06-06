import { Box, Center, Grid, Tooltip } from "@chakra-ui/react";
import { faComments, faHeadset, faHome, faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router";
import { Link, Redirect, Route, Switch } from "react-router-dom";
import { User } from "../../@types/users.types";
import { apiRequest } from "./@common/@apiRequest";
import { LoadingPage } from "./pages/@common/LoadingPage";
import { ChatPage } from "./pages/chat/chat.page";
import { CategoriesPage } from "./pages/forum/categories.page";
import { TopicsPage } from "./pages/forum/categories/[categoryId]/topics.page";
import { PostsPage } from "./pages/forum/categories/[categoryId]/topics/[topicId]/posts.page";
import { HomePage } from "./pages/home/home.page";
import { LoginPage } from "./pages/login.page";
import { TokenPage } from "./pages/token.page";

export function findActiveUser(): Promise<User> {
  return apiRequest({
    url: `/auth/user`,
    method: "GET",
  });
}

export function logout(): Promise<void> {
  return apiRequest({
    url: `/auth/logout`,
    method: "POST",
    body: JSON.stringify({}),
  });
}

export const App: React.FC = () => {
  const [isAuth, setIsAuth] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const router = useHistory();
  const location = useLocation();

  useEffect(() => {
    findActiveUser().then((response) => {
      if (response.email) {
        setIsAuth(true);
        setIsLoading(false);
      } else {
        setIsLoading(false);
      }
    });
  }, [router]);

  async function handleLogout() {
    await logout();
    setIsAuth(false);
  }

  if (isLoading) {
    return <LoadingPage></LoadingPage>;
  }

  if (!isAuth) {
    return (
      <Switch>
        <Route exact path="/login">
          <LoginPage />
        </Route>
        <Route exact path="/token">
          <TokenPage setIsAuth={setIsAuth} />
        </Route>
        <Route path="*">
          <Redirect to="/login" />
        </Route>
      </Switch>
    );
  }

  const activeUrl = location.pathname.split("/")[1];
  return (
    <Grid gridTemplateColumns="60px 1fr" h="100vh">
      <Box backgroundColor="gray.900">
        <Tooltip label="Home" aria-label="home-tooltip" placement="right" shouldWrapChildren>
          <Link to="/" aria-label="home">
            <Center
              h="40px"
              _hover={{ color: "gray.400", cursor: "pointer" }}
              m="2"
              borderRadius="4"
              backgroundColor={activeUrl === "" ? "gray.600" : ""}
            >
              <FontAwesomeIcon icon={faHome} size="lg" />
            </Center>
          </Link>
        </Tooltip>
        <Tooltip label="Forum" aria-label="forum-tooltip" placement="right" shouldWrapChildren>
          <Link to="/forum/categories" aria-label="forum">
            <Center
              h="40px"
              _hover={{ color: "gray.400", cursor: "pointer" }}
              m="2"
              borderRadius="4"
              backgroundColor={activeUrl === "forum" ? "gray.600" : ""}
            >
              <FontAwesomeIcon icon={faComments} size="lg" />
            </Center>
          </Link>
        </Tooltip>
        <Tooltip label="Chat" aria-label="chat-tooltip" placement="right" shouldWrapChildren>
          <Link to="/chat" aria-label="chat">
            <Center
              h="40px"
              _hover={{ color: "gray.400", cursor: "pointer" }}
              m="2"
              borderRadius="4"
              backgroundColor={activeUrl === "chat" ? "gray.600" : ""}
            >
              <FontAwesomeIcon icon={faHeadset} size="lg" />
            </Center>
          </Link>
        </Tooltip>

        <Tooltip label="Logout" aria-label="logout-tooltip" placement="right" shouldWrapChildren>
          <Center
            h="40px"
            _hover={{ color: "gray.400", cursor: "pointer" }}
            m="2"
            borderRadius="4"
            onClick={handleLogout}
          >
            <FontAwesomeIcon icon={faSignOutAlt} size="lg" />
          </Center>
        </Tooltip>
      </Box>
      <Box>
        <Switch>
          <Route exact path="/">
            <HomePage />
          </Route>
          <Route exact path="/forum/categories">
            <CategoriesPage />
          </Route>
          <Route exact path="/forum/categories/:categoryId/topics">
            <TopicsPage />
          </Route>
          <Route exact path="/forum/categories/:categoryId/topics/:topicId/posts">
            <PostsPage />
          </Route>
          <Route path="/chat">
            <ChatPage />
          </Route>
          <Route path="*">
            <Redirect to="/" />
          </Route>
        </Switch>
      </Box>
    </Grid>
  );
};
