export default class RealmDetails {
  public name: string;
  public keycloakUrl: string;
  public backendUrl: string;
  public parsingError: unknown;
  public sucesfullyParsed: boolean;
  private originalPayload: string;

  constructor(payload: string) {
    this.parsePayload(payload);
  }

  private parsePayload = (payload: string): void => {
    this.originalPayload = payload;
    this.sucesfullyParsed = false;
    this.name = "";
    this.keycloakUrl = "";
    this.backendUrl = "";
    
    try {
      const parsedPayload = JSON.parse(payload);
      const isProperlyDefined = parsedPayload.hasOwnProperty("keycloakUrl") &&
      parsedPayload.hasOwnProperty("backendUrl") &&
      parsedPayload.hasOwnProperty("name");

      if (!isProperlyDefined) {
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

  public toString = (): string => {
    return this.originalPayload;
  }
}