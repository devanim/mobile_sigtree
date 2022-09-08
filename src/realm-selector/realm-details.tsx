export default class RealmDetails {
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
    this.keycloakUrl = "";
    this.backendUrl = "";
    
    try {
      const parsedPayload = JSON.parse(payload);

      if (!parsedPayload.hasOwnProperty("keycloakUrl") || !parsedPayload.hasOwnProperty("backendUrl")) {
        this.sucesfullyParsed = false;
        this.parsingError = "QR Code does not contain needed properties";
      }

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