export class Helpers {
  constructor() {}

  /**
   * Formatea un número en español.
   * @param {number} number Número a formatear.
   * @returns {string}
   */
  static FormatNumber(number) {
    return new Intl.NumberFormat("es-ES").format(number);
  }
/**
 * Obtiene la primera letra de una string
 * @param {string} string String a obtener la primera letra.
 * @returns {string}
 */
  static GetInitialLetterUppercase(string) {
    const firstWord = string.split(" ")[0];
    return firstWord.split("")[0].toUpperCase();
  }
}
