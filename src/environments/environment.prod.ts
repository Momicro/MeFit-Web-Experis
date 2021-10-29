import { HttpHeaders } from "@angular/common/http";

export const environment = {
  production: true,
  apiBaseUrl: 'https://experis-mefit-springboot.herokuapp.com',
  keycloak: {
    url: 'https://de-mefit-keycloak.herokuapp.com/auth/',
    realm: 'MeFit',
    client: 'MeFit'
  },
  httpOptions: {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
    })
  }
};
