import { Box } from "@chakra-ui/react";

import { Redirect, Route, Switch, useLocation } from "react-router-dom";

import { TransitionGroup, CSSTransition } from "react-transition-group";

import { useMe } from "@/api/auth";

import DesignsPage from "@/views/app/designs";
import Editor from "@/views/app/editor";
import OrderOrSharePage from "@/views/app/order-or-share";

export default function DesignTool() {
  const location = useLocation();

  const { data: me } = useMe();

  console.log("Me", me);

  const [selectedGarment, setSelectedGarment] = useState<Garment>(DEFAULT_SELECTED_GARMENT);

  return (
    <Box height="100vh" display="flex" flexDirection="column" w={{ base: "100%" }}>
      <Box backgroundColor="#FFFFFF" h="100%" mx="auto" flex={1} w="100%">
        <TransitionGroup>
          <CSSTransition key={location.pathname} classNames="page" timeout={300}>
            <Switch location={location}>
              <Route path={`/app/designs`} render={() => <DesignsPage />} />
              <Route path={`/app/editor`} render={() => <Editor />} />
              <Route path={`/app/order-or-share`} render={() => <OrderOrSharePage />} />
              <Redirect
                from="/"
                to={me && me.roles[0] !== "guest" ? "/app/designs" : "/app/editor"}
              />
            </Switch>
          </CSSTransition>
        </TransitionGroup>
      </Box>
    </Box>
  );
}
