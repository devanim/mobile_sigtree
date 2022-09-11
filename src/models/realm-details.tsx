/* eslint-disable no-prototype-builtins */
export default class RealmDetails {
  public name = "";
  public keycloakUrl = "";
  public backendUrl = "";
  public parsingError: unknown;
  public sucesfullyParsed = false;

  constructor(payload: string) {
    this.parsePayload(payload);
  }

  private parsePayload = (payload: string): void => {
    try {
      const parsedPayload = JSON.parse(payload);

      if (!this.payloadHasProperties(parsedPayload)) {
        this.sucesfullyParsed = false;
        this.parsingError = "QR Code does not contain needed properties";
      }

      this.name = parsedPayload.name;
      this.keycloakUrl = parsedPayload.keycloakUrl;
      this.backendUrl = parsedPayload.backendUrl;
      this.sucesfullyParsed = true;
    } catch (error) {
      this.parsingError = error;
    }
  }

  private payloadHasProperties = (payload: any) => {
    return payload.hasOwnProperty("keycloakUrl") &&
              payload.hasOwnProperty("backendUrl") &&
              payload.hasOwnProperty("name");
  }
}