import { createContext, useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
export const useAppContext = () => useContext(AppContext);

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [longitudeState, setLongitudeState] = useState(0);
  const [latitudeState, setLatitudeState] = useState(0);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(function (position) {
      setLatitudeState(position.coords.latitude.toFixed(4));
      setLongitudeState(position.coords.longitude.toFixed(4));
    });
  }, []);

  const value = {
    latitudeState,
    setLatitudeState,
    longitudeState,
    setLongitudeState,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

AppProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
