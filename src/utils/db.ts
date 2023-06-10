import JSONdb from "simple-json-db";

class DB {
  static db: JSONdb;

  public static init(): void {
    this.db = new JSONdb("./db/database.json");
  }

  public static saveWord(word: string): void {
    const words = this.getWords();

    if (!this.containsWord(word)) {
      words.push(word);
    }

    this.db.set("words", words);

    this.db.sync();
  }

  public static removeWord(word: string): void {
    const words = this.getWords();

    this.db.set(
      "words",
      words.filter((w: string) => w !== word)
    );

    this.db.sync();
  }

  public static getWords(): string[] {
    return this.db.get("words") || [];
  }

  public static containsWord(word: string): boolean {
    const words = this.getWords();

    return words.map((w) => w.toLocaleLowerCase()).includes(word);
  }
}

export default DB;
