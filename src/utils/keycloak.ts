import { RNKeycloak } from '@react-keycloak/native';

const keycloak = new RNKeycloak({
  url: 'http://localhost:8080/auth',
  realm: 'test',
  clientId: 'sigtree-app',
});

export default keycloak;