import { useContext } from 'react';
import { KeycloakContext } from './KeycloakContext';

export const useKeycloak = () => {
  const {
    isLoggedIn,
    login,
    logout,
    ready = false,
    token = null,
    realm
  } = useContext(KeycloakContext);

  return {
    isLoggedIn,
    login,
    logout,
    ready,
    token: token?.accessToken ?? null,
    realm
  }
}
