export class IDGenerator {
  private idCounter: number;
  constructor(startId: number) {
    this.idCounter = startId - 1;
  }

  generateId(): string {
    this.idCounter += 1;
    return `B${this.idCounter}`;
  }
}
