import React from "react";
import styled from "styled-components";
import {
  width,
  WidthProps,
  borders,
  BordersProps,
  minHeight,
  MinHeightProps,
  SpaceProps,
  space
} from "styled-system";

import { Flex, Image } from "../primitives/styled-rebass";
import MyLink from "./my-link";
import { useRouter } from "next/router";

interface HeaderProps {
  hocLoginState: boolean;
  hocLogout: () => void;
  referer: string;
  syncLogout: () => void;
  token?: string;
}

const Nav = styled.nav<WidthProps & BordersProps & MinHeightProps & SpaceProps>`
  color: #ccc;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  ${minHeight}
  ${width}
  ${borders}
  ${space}
`;

const RenderLoginLink = () => {
  return (
    <MyLink shade="dark" href="/login" name="login">
      Login
    </MyLink>
  );
};

interface RenderLogoutProps {
  hocLogout?: () => void;
  syncLogout?: () => void;
}

const RenderLogout: React.FunctionComponent<RenderLogoutProps> = ({
  hocLogout,
  syncLogout
}) => {
  return (
    <MyLink
      syncLogout={syncLogout}
      hocLogout={hocLogout}
      shade="dark"
      href="/logout"
      name="/logout"
    >
      Logout
    </MyLink>
  );
};

const RenderAvatarLink = () => {
  return (
    <MyLink hover={false} shade="dark" href="/user/profile" name="profile">
      <Image
        src="https://images.unsplash.com/photo-1463453091185-61582044d556?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80"
        sx={{
          width: 48,
          height: 48,
          borderRadius: "50%",
          paddingBottom: 0,
          verticalAlign: "middle"
        }}
      />
    </MyLink>
  );
};

interface LabelProps {
  label: string;
}

function Logger(props: LabelProps) {
  console.log(`${props.label} rendered`);
  return null; // what is returned here is irrelevant...
}

// function Label(props: LabelProps) {
//   return <span>{props.label}</span>;
// }

const Header: React.FunctionComponent<HeaderProps> = ({
  hocLoginState,
  hocLogout,
  referer,
  syncLogout,
  token
}) => {
  // @ts-ignore
  const [count, setCount] = React.useState(0);
  // const increment = () => setCount(c => c + 1);

  const breakWidths = [1, 1, "690px", "690px"];
  let { query } = useRouter();

  let getQuery;

  let isAnArray =
    query && query.message instanceof Array ? query.message[0] : undefined;
  let isAString =
    query && typeof query.message === "string" ? query.message : undefined;

  getQuery = isAString ? isAString : isAnArray ? isAnArray : "unknown";

  let makeAuthenticatedFalseMatches = ["Not authenticated", "logout"];
  let shouldntBeAuthed =
    makeAuthenticatedFalseMatches.indexOf(getQuery, 0) !== -1;

  let isAuthenticated = false;

  if (shouldntBeAuthed === true) {
    isAuthenticated = false;
  }
  // specifically if they just logged in
  if (
    !token &&
    hocLoginState === true &&
    referer.includes("login") &&
    shouldntBeAuthed === false
  ) {
    isAuthenticated = true;
  }

  type RenderDecisionEnum = "okay to render" | "do not render";

  type LoginStatusEnum = "i just logged in" | "i logged in another way";

  let loginStatus: LoginStatusEnum =
    !token &&
    hocLoginState === true &&
    referer.includes("login") &&
    shouldntBeAuthed === false
      ? "i just logged in"
      : "i logged in another way";

  let renderDecision: RenderDecisionEnum =
    shouldntBeAuthed === true || isAuthenticated === false
      ? "do not render" // hocLogin state is false || query message is "Not authenticated"
      : loginStatus === "i just logged in"
      ? "okay to render"
      : "do not render";
  if (renderDecision === "okay to render") {
    return (
      <Flex
        flexDirection="column"
        width={breakWidths}
        sx={{ borderBottom: "2px #eee solid" }}
      >
        <Nav minHeight="58px" width={breakWidths} px={3}>
          <MyLink shade="dark" href="/" name="home">
            Home
          </MyLink>
          <RenderLogout syncLogout={syncLogout} hocLogout={hocLogout} />
          <RenderAvatarLink />
          {/* <MyLink shade="dark" href="/hello" name="/hello">
            Hello
          </MyLink>
          <MyLink shade="dark" href="/user/profile" name="/user/profile">
            Profile
          </MyLink> */}
          {/* <Label label={`counter: ${count}`} /> */}
        </Nav>
        {/* <button type="button" onClick={increment}>
          increment
        </button> */}
        <Logger label={`counter: ${count}`} />
      </Flex>
    );
  }
  if (renderDecision === "do not render") {
    return (
      <Flex
        flexDirection="column"
        width={breakWidths}
        sx={{ borderBottom: "2px #eee solid" }}
      >
        <Nav minHeight="58px" width={breakWidths} px={3}>
          <MyLink shade="dark" href="/" name="home">
            Home
          </MyLink>

          <RenderLoginLink />
          {/* 
          <RenderLogout syncLogout={syncLogout} hocLogout={hocLogout} />
          <MyLink shade="dark" href="/hello" name="/hello">
            Hello
          </MyLink>
          <MyLink shade="dark" href="/user/profile" name="/user/profile">
            Profile
          </MyLink> */}
          {/* <Label label={`counter: ${count}`} /> */}
        </Nav>
        {/* <button type="button" onClick={increment}>
          increment
        </button> */}
        <Logger label={`counter: ${count}`} />
      </Flex>
    );
  } else {
    return <div>Error!!!!!</div>;
  }
  // HIDE BELOW
  // return (
  //   <Flex
  //     flexDirection="column"
  //     width={breakWidths}
  //     sx={{ borderBottom: "2px #eee solid" }}
  //   >
  //     <Nav minHeight="58px" width={breakWidths} px={3}>
  //       <MyLink shade="dark" href="/" name="home">
  //         Home
  //       </MyLink>
  //       {/* {isAuthenticated ? (
  //         <RenderLogout syncLogout={syncLogout} hocLogout={hocLogout} />
  //       ) : (
  //         ""
  //       )} */}
  //       {shouldntBeAuthed === false || isAuthenticated === true ? (
  //         <>
  //           shouldntBeAuthed: {shouldntBeAuthed.toString()}
  //           isAuthed: {isAuthenticated.toString()}
  //           <RenderLogout syncLogout={syncLogout} hocLogout={hocLogout} />
  //           <RenderAvatarLink />
  //         </>
  //       ) : (
  //         <>
  //           shouldntBeAuthed: {shouldntBeAuthed.toString()}
  //           isAuthed: {isAuthenticated.toString()}
  //           <RenderLoginLink />
  //           <RenderLogout syncLogout={syncLogout} hocLogout={hocLogout} />
  //         </>
  //       )}

  //       <MyLink shade="dark" href="/hello" name="/hello">
  //         Hello
  //       </MyLink>

  //       <MyLink shade="dark" href="/user/profile" name="/user/profile">
  //         Profile
  //       </MyLink>
  //       <Label label={`counter: ${count}`} />
  //     </Nav>
  //     <button type="button" onClick={increment}>
  //       increment
  //     </button>

  //     <Logger label={`counter: ${count}`} />
  //   </Flex>
  // );
};

export default Header;
