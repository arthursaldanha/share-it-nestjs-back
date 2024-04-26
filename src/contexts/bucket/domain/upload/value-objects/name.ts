export class Name {
  private name: string;

  constructor(name: string) {
    if (!name || name.trim() === '') {
      throw new Error('Nome é obrigatório.');
    }

    this.name = name;
  }

  getValue(): string {
    return this.name;
  }
}
