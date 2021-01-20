export class NumberHelper {
  static randomInRange (min: number, max: number) {
    return Math.floor( (Math.random() * (max - min) + min) );
  }
}
