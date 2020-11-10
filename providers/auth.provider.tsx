import React, {
  createContext,
  useReducer,
  useEffect,
  useContext,
  useState,
} from "react";
import Router from "next/router";
import useSWR, { responseInterface } from "swr";

import { IAction } from "types/action";
import fetcher from "lib/fetch";
// import { emailLogin, logout as logoutApi } from "lib/api";

import { API_BASE_PATH, LOGIN_ROUTE } from "lib/constants";
import { IUser } from "types/user";
import LoadingScreen from "components/loading-screen";

const base = "AUTH/";

const actionTypes = {
  FETCH_AUTH: `${base}FETCH_AUTH`,
  FETCH_AUTH_SUCCESS: `${base}FETCH_AUTH_SUCCESS`,
  FETCH_AUTH_FAILURE: `${base}FETCH_AUTH_FAILURE`,
};

interface IProps {
  children: React.ReactNode;
}

interface IState {
  isLoading: boolean;
  user: IUser | undefined;
  error: unknown;
}

export interface IAuthContext extends IState {
  actions: {
    loginWithEmail: (email: string, password: string) => Promise<any>;
    logout: () => void;
    mutate: responseInterface<unknown, unknown>["mutate"];
  };
}

const INITIAL_STATE: IState = {
  isLoading: true,
  user: undefined,
  error: undefined,
};

function reducer(state: IState, action: IAction): IState {
  switch (action.type) {
    case actionTypes.FETCH_AUTH:
      return {
        ...state,
        isLoading: true,
        error: undefined,
      };
    case actionTypes.FETCH_AUTH_SUCCESS:
      return {
        ...state,
        isLoading: false,
        user: action.payload,
        error: undefined,
      };
    case actionTypes.FETCH_AUTH_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    default:
      return state;
  }
}

export const AuthContext = createContext({} as IAuthContext);

export function AuthProvider({ children }: IProps) {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE as any);

  const { data: user, error, isValidating, mutate } = useSWR(
    `${API_BASE_PATH}/api/users/me`,
    fetcher
  );

  useEffect(() => {
    async function handleResponse() {
      if (isValidating) {
        dispatch({ type: actionTypes.FETCH_AUTH });
      } else if (user && !error) {
        dispatch({
          type: actionTypes.FETCH_AUTH_SUCCESS,
          payload: user,
        });
      } else if (error) {
        // dispatch general error first
        dispatch({ type: actionTypes.FETCH_AUTH_FAILURE, payload: error });
      }
    }

    handleResponse();
  }, [user, error, isValidating]);

  const loginWithEmail = (email: string, password: string): Promise<any> => {
    // return emailLogin(email, password);
  };

  const logout = async () => {
    try {
      // await logoutApi();
      window.location.href = LOGIN_ROUTE;
    } catch (e) {
      // FIXME: do something about this
      console.error(e);
      alert(
        "An issue occurred while attempting to log you out. Please try again."
      );
    }
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        actions: {
          loginWithEmail,
          logout,
          mutate,
        },
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

interface IAuthRouteParams {
  redirectTo?: string;
  redirectIfFound?: string;
}

/**
 * redirect using next's Router or using the browser location api
 */
function redirect(url: string, replace: boolean = false) {
  if (url.substring(0, 1) === "/") {
    if (replace) {
      Router.replace(url);
    } else {
      Router.push(url);
    }
  } else {
    window.location.href = url;
  }
}

export function authRoute(WrappedComponent: any, params: IAuthRouteParams) {
  return (props) => {
    const { user, isLoading }: IAuthContext = useContext(AuthContext);
    const { redirectTo, redirectIfFound } = params;
    const hasUser = Boolean(user && user.id);
    const [ready, setReady] = useState(hasUser);

    useEffect(() => {
      if (isLoading) return;
      if (
        // If redirectTo is set, redirect if the user was not found.
        (redirectTo && !redirectIfFound && !hasUser) ||
        // If redirectIfFound is also set, redirect if the user was found
        (redirectIfFound && hasUser)
      ) {
        redirect(redirectTo || redirectIfFound);
      } else {
        setReady(true);
      }
    }, [hasUser, isLoading]);

    if (!ready) {
      return <LoadingScreen />;
    }

    return <WrappedComponent {...props} />;
  };
}
