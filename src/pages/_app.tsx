<script src="https://apis.google.com/js/api.js" type="text/javascript"></script>

import { AuthBindings, Refine } from "@refinedev/core";
import { RefineKbar, RefineKbarProvider } from "@refinedev/kbar";
import {
  RefineSnackbarProvider,
  notificationProvider,
  RefineThemes
} from "@refinedev/mui";
import { createTheme } from "@mui/material/styles";
import routerProvider, {
  UnsavedChangesNotifier,
} from "@refinedev/nextjs-router";
import type { NextPage } from "next";
import { SessionProvider, signIn, signOut, useSession } from "next-auth/react";
import { AppProps } from "next/app";
import { useRouter } from "next/router";
import React from "react";

import { ThemedLayoutV2 } from "src/components";
import { ThemedHeaderV2 } from "src/components";
import { ThemedSiderV2 } from "src/components";
import { ThemedTitleV2 } from "src/components";

//icons
import DashboardIcon from '@mui/icons-material/Dashboard';
import MoreTimeIcon from '@mui/icons-material/MoreTime';
import ContentPasteSearchIcon from '@mui/icons-material/ContentPasteSearch';
import ConnectWithoutContactIcon from '@mui/icons-material/ConnectWithoutContact';
import RecentActorsIcon from '@mui/icons-material/RecentActors';
import SecurityIcon from '@mui/icons-material/Security';



import { CssBaseline, GlobalStyles, ThemeProvider } from "@mui/material";

import dataProvider from "@refinedev/simple-rest";
import { MuiInferencer } from "@refinedev/inferencer/mui";

const API_URL = "https://api.fake-rest.refine.dev";

// new styles 
const overridedLightTheme = createTheme({
  ...RefineThemes.Blue,
  palette: {
      ...RefineThemes.Blue.palette,
      primary: {
          main: "#02786D",
      },
      secondary: {
          main: "#red",
      },
  },
});




export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  noLayout?: boolean;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

const App = (props: React.PropsWithChildren) => {
  const { data, status } = useSession();
  const router = useRouter();
  const { to } = router.query;

  if (status === "loading") {
    return <span>loading...</span>;
  }

  const authProvider: AuthBindings = {
    login: async () => {
      signIn("google", {
        callbackUrl: to ? to.toString() : "/",
        redirect: true,
      });

      return {
        success: true,
      };
    },
    logout: async () => {
      signOut({
        redirect: true,
        callbackUrl: "/login",
      });

      return {
        success: true,
      };
    },
    onError: async (error) => {
      console.error(error);
      return {
        error,
      };
    },
    check: async () => {
      if (status === "unauthenticated") {
        return {
          authenticated: false,
          redirectTo: "/login",
        };
      }

      return {
        authenticated: true,
      };
    },
    getPermissions: async () => {
      return null;
    },
    getIdentity: async () => {
      if (data?.user) {
        const { user } = data;
        return {
          name: user.name,
          avatar: user.image,
        };
      }

      return null;
    },
  };

  return (
    <>
    <ThemeProvider theme={overridedLightTheme}>
      <RefineKbarProvider>
          <CssBaseline />
          <GlobalStyles styles={{ html: { WebkitFontSmoothing: "auto" } }} />
          <RefineSnackbarProvider>
            <Refine
              routerProvider={routerProvider}
              dataProvider={dataProvider(API_URL)}
              notificationProvider={notificationProvider}
              authProvider={authProvider}
              resources={[
                {
                  name: "Dashboard",
                  list: '/dashboard',
                  options:{label: "Dashboard"},
                  icon: <DashboardIcon/>
                },
                {
                  name: "Log Time",
                  list: '/logtime',
                  options:{label: "Log Time example"},
                  icon: <MoreTimeIcon/>
                },
                {
                  name: "Timesheet",
                  list: '/timesheet',
                  options:{label: "Timesheet"},
                  icon: <MoreTimeIcon/>
                },
                {
                  name: "Reports",
                  list: '/reports',
                  options:{label: "Reports"},
                  icon: <ContentPasteSearchIcon/>
                },
                {
                  name: "Wolfgangers",
                  list: '/wolfgangers',
                  options:{label: "Wolfgangers"},
                  icon: <ConnectWithoutContactIcon/>
                },
                {
                  name: "Clients",
                  list: '/clients',
                  options:{label: "Clients"},
                  icon: <RecentActorsIcon/>
                },
                {
                  name: "Countries",
                  list: '/countries',
                  options:{label: "Countries"},
                  icon: <RecentActorsIcon/>
                },
                {
                  name: "Admin",
                  list: '/admin',
                  options:{label: "Admin"},
                  icon: <SecurityIcon/>
                },
              ]}
              options={{
                syncWithLocation: true,
                warnWhenUnsavedChanges: true,
              }}
            >
              {props.children}
              <RefineKbar />
              <UnsavedChangesNotifier />
            </Refine>
          </RefineSnackbarProvider>
      </RefineKbarProvider>
    </ThemeProvider>
    </>
  );
};

function MyApp({
  Component,
  pageProps: { session, ...pageProps },
}: AppPropsWithLayout): JSX.Element {
  const renderComponent = () => {
    if (Component.noLayout) {
      return <Component {...pageProps} />;
    }

    return (
      <ThemedLayoutV2
      Header={ThemedHeaderV2}
      Sider={ThemedSiderV2}
      Title={ThemedTitleV2}
  >
    <Component {...pageProps} />
  </ThemedLayoutV2>
    );
  };

  return (
    <SessionProvider session={session}>
      <App>{renderComponent()}</App>
    </SessionProvider>
  );
}

export default MyApp;
