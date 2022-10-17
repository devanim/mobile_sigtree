import React, { useCallback, useEffect } from 'react';
import { Platform } from 'react-native'
import * as AuthSession from 'expo-auth-session';
import {
  useAuthRequest,
  useAutoDiscovery,
} from 'expo-auth-session';
import { KeycloakContext } from './KeycloakContext';
import useTokenStorage from './useTokenStorage';
import { handleTokenExchange, getRealmURL } from './helpers';
import {
  NATIVE_REDIRECT_PATH,
} from './const';

export const KeycloakProvider = ({ realm, clientId, url, extraParams, children, ...options }) => {
  const discovery = useAutoDiscovery(getRealmURL({ realm, url }));
  const redirectUri = AuthSession.makeRedirectUri({
    native: `${options.scheme ?? 'exp'}://${options.nativeRedirectPath ?? NATIVE_REDIRECT_PATH}`,
    useProxy: !options.scheme,
  });

  const config = { redirectUri, clientId, realm, url, extraParams }

  const [request, response, promptAsync] = useAuthRequest(
    { usePKCE: true, responseType: AuthSession.ResponseType.Code, ...config },
    discovery,
  );
  const [currentToken, updateToken] = useTokenStorage(options, config, discovery)

  const handleLogin = useCallback((options) => {
    return promptAsync(options);
  }, [request])

  const handleLogout = () => {
    if (!currentToken) throw new Error('Not logged in.');
    try {
      if (discovery.revocationEndpoint) {
        AuthSession.revokeAsync(
          { token: currentToken?.accessToken, ...config }, discovery
        )
      }
      if(discovery.endSessionEndpoint) {
        fetch(`${discovery.endSessionEndpoint}`, {
          method: 'POST',         
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: `client_id=${clientId}&refresh_token=${currentToken.refreshToken}`
        })
      }
      if(Platform.OS === 'ios') {
        AuthSession.dismiss();
      }
    } catch (error) {
      console.log(error)
    }
    updateToken(null)
  }
  useEffect(() => {
    if (response) {
      config.extraParams.code_verifier = request.codeVerifier;
      handleTokenExchange({ response, discovery, config })
        .then(updateToken)
    }
  }, [response])

  return (
    <KeycloakContext.Provider
      value={{
        isLoggedIn: currentToken === undefined ? undefined : !!currentToken,
        login: handleLogin,
        logout: handleLogout,
        ready: discovery !== null && request !== null && currentToken !== undefined,
        token: currentToken,
      }}
    >
      {children}
    </KeycloakContext.Provider>
  );
};
