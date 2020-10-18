import React, { createContext, useReducer } from "react";
import { ContextViewportChangeHandler, ViewportProps } from "react-map-gl";
import { IAction } from "types/action";
import { MapStyle } from "types/map";

interface IMapBounds {
  lat: {
    max: number;
    min: number;
  };
  lon: {
    max: number;
    min: number;
  };
}

const base = "MAP/";
const actionTypes = {
  SET_VIEWPORT: `${base}SET_VIEWPORT`,
  ACQUIRE_LOCATION: `${base}ACQUIRE_LOCATION`,
  ACQUIRE_LOCATION_SUCCESS: `${base}ACQUIRE_LOCATION_SUCCESS`,
  ACQUIRE_LOCATION_FAILURE: `${base}ACQUIRE_LOCATION_FAILURE`,
  SET_STYLE: `${base}SET_STYLE`,
};

interface IProps {
  children: React.ReactNode;
  bounds?: IMapBounds;
}

interface IState {
  currentStyle: MapStyle;
  acquiringLocation?: boolean;
  location: unknown;
  viewport: unknown | ViewportProps;
}

export interface IMapContext extends IState {
  actions: {
    setViewport: ContextViewportChangeHandler;
    acquireLocation: () => void;
    setStyle: (style: MapStyle) => void;
  };
}

const INITIAL_STATE: IState = {
  currentStyle: MapStyle.Default,
  acquiringLocation: undefined,
  location: null,
  viewport: {
    latitude: 48.859,
    longitude: 2.336,
    zoom: 11.87,
    bearing: 0,
    pitch: 0,
  },
};

function reducer(state: IState, action: IAction) {
  switch (action.type) {
    case actionTypes.SET_VIEWPORT:
      return {
        ...state,
        viewport: action.payload,
      };
    case actionTypes.ACQUIRE_LOCATION:
      return {
        ...state,
        acquiringLocation: true,
      };
    case actionTypes.ACQUIRE_LOCATION_SUCCESS:
      return {
        ...state,
        acquiringLocation: false,
        location: action.payload,
      };
    case actionTypes.ACQUIRE_LOCATION_FAILURE:
      console.error("Could not get location");
      return {
        ...state,
        acquiringLocation: false,
      };
    case actionTypes.SET_STYLE:
      return {
        ...state,
        currentStyle: action.payload,
      };
    default:
      return state;
  }
}

export const MapContext = createContext({} as IMapContext);

export function MapProvider({ children, bounds }: IProps) {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE as IState);

  const setViewport = (nextViewport: ViewportProps) => {
    if (!bounds) {
      dispatch({
        type: actionTypes.SET_VIEWPORT,
        payload: nextViewport,
      });
      return;
    }

    // set map bounds if defined
    const { latitude, longitude } = nextViewport;
    if (latitude > bounds.lat.max) {
      nextViewport.latitude = bounds.lat.max;
    } else if (latitude < bounds.lat.min) {
      nextViewport.latitude = bounds.lat.min;
    }

    if (longitude > bounds.lon.max) {
      nextViewport.longitude = bounds.lon.max;
    } else if (longitude < bounds.lon.min) {
      nextViewport.longitude = bounds.lon.min;
    }
    dispatch({
      type: actionTypes.SET_VIEWPORT,
      payload: nextViewport,
    });
  };

  const acquireLocationSuccess = (position: any) => {
    const { accuracy, latitude, longitude } = position.coords;
    dispatch({
      type: actionTypes.ACQUIRE_LOCATION_SUCCESS,
      payload: { accuracy, coordinates: [latitude, longitude] },
    });
  };

  const acquireLocationFailure = () => {
    dispatch({ type: actionTypes.ACQUIRE_LOCATION_FAILURE });
  };

  const acquireLocation = () => {
    if (navigator.geolocation) {
      dispatch({ type: actionTypes.ACQUIRE_LOCATION });
      navigator.geolocation.getCurrentPosition(
        acquireLocationSuccess,
        acquireLocationFailure
      );
    }
  };

  const setStyle = (style: MapStyle) => {
    dispatch({ type: actionTypes.SET_STYLE, payload: style });
  };

  console.log(state);

  return (
    <MapContext.Provider
      value={{
        ...state,
        actions: {
          setViewport,
          acquireLocation,
          setStyle,
        },
      }}
    >
      {children}
    </MapContext.Provider>
  );
}
