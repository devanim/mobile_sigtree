export class Building {
  public id!: number;
  public name!: string;
  public image?: string;
  public projectId!: string;
  public floors!: string[];
  public categories?: Category[];
}

class Category {
  public id!: number;
  public name!: string;
  public description?: string;
}