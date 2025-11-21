export class Storage {
  static instance;

  constructor() {
    if (Storage.instance) return Storage.instance;

    Storage.instance = window.localStorage;
  }

  /**
   * Crée ou met à jour un élément dans le stockage interne.
   * @param {string} key - La clé unique sous laquelle la valeur sera enregistrée.
   * @param {any} data - Les données à stocker sous format « JSON.stringify »".
   * @return {void}
   * */
  createOrUpdateItem(key, data) {
    return Storage.instance.setItem(key, data);
  }

  /**
   * Récupère tous les éléments d'une clé unique du stockage interne
   * @param {string} key - La clé unique qui permettra de récupérer l'élément
   * @returns {string | null} Retourne le résultat sous forme de chaîne de caractères si la clé unique existe dans le stackage interne, dans le cas contraire, la valeur null est renvoyée.
   */
  readItem(key) {
    return Storage.instance.getItem(key);
  }

  /**
   * Supprime un élément dans le stockage interne via une clé unique
   * @param {string} key - La clé unique qui permettra de supprimer l'élément dans le stockage interne.
   * @returns {void}
   */
  deleteItem(key) {
    Storage.instance.removeItem(key);
  }

  /**
   * Récupère tous les éléments (désérialisées) d'une clé unique dans le stockage interne.
   * Si la valeur de la clé correspondante n'existe pas, la valeur null est retournée.
   * @param {string} key - La clé unique qui permettra de récupérer l'élément
   * @returns {any | null}
   */
  findAll(key) {
    let data = this.readItem(key);
    if (data !== null) {
      // Désérialisation des données
      data = JSON.parse(data);
      return data;
    }

    return null;
  }

  /**
   * Sauvegarde la donnée dans le stockage interne. La donnée est automatiquement converties en chaîne JSON avant d'être stockée.
   * @param {string} key - La clé unique qui permettra d'identifier l'élément dans le stockage interne.
   * @param {any} value - La donnée à sauvegarder. Elle sera sérialisée en JSON.
   * @returns {void}
   */
  save(key, value) {
    // Récupère l'élément dans le stockage interne
    let db = this.findAll(key);
    db.push(value);

    // Sauvegarde le tableau avec la nouvelle donnée ajoutée
    this.saveAllAndFlush(key, db);
  }

  /**
   * Sauvegarde les données dans le stockage interne.
   * @param {string} key - La clé unique qui permettra d'identifier l'élément dans le stockage interne.
   * @param {any} data - Les données à sauvegarder.
   */
  saveAllAndFlush(key, data) {
    Storage.instance.setItem(key, JSON.stringify(data));
  }

  /**
   * Récupère un élément dans le stockage interne via son «identifiant»
   * @param {string} key - La clé unique qui permettra d'identifier l'élément dans le stockage.
   * @param {string} id - L'identifiant de l'élément associé à la clé unique.
   * @returns {any | null} Retourne l'élément ou null
   */
  findById(key, id) {
    // Récupère l'élément dans le stockage interne
    let db = this.findAll(key);

    // Vérifie si l'élément a été trouvé
    if (db !== null) {
      // Recherche l'élément dans le tableau via l'identifiant
      let data = db.find((dbItem) => dbItem.id === id);
      if (data !== undefined) return data;
    }

    return null;
  }

  /**
   * Met à jour les données du stockage interne
   * @param {string} key - La clé unique qui permettra d'identifier l'élément dans le stockage.
   * @param {string} id - L'identifiant de l'élément associé à la clé unique.
   * @param {any} data - Les données de mises à jour.
   * @returns {boolean} Retourne la valeur {true} si la mise à jour s'est bien passé ou la valeur {false} s'il y a eu un problème.
   */
  updateById(key, id, data) {
    // Récupère l'élément dans le stockage interne
    let db = this.findAll(key);

    // Vérifie si l'élément a été trouvé
    if (db !== null) {
      // Recherche l'index associé à l'élément dans le tableau
      const index = db.findIndex((dbItem) => dbItem.id === id);
      if (index !== -1) {
        // Insertion de l'ID dans la donnée créée
        data.id = db[index].id;
        // Met à jour la nouvelle donnée
        db.splice(index, 1, data);
        // Sauvegarde les données dans le stockage interne
        this.saveAllAndFlush(key, db);

        return true;
      }

      return false;
    }
  }

  /**
   * Supprime les données d'un élément dans le stockage interne
   * @param {string} key - La clé unique qui permettra d'identifier l'élément dans le stockage.
   * @param {string} id - L'identifiant de l'élément associé à la clé unique.
   * @returns {boolean} Retourne la valeur {true} si la suppression s'est bien passé ou la valeur {false} s'il y a eu un problème.
   */
  removeById(key, id) {
    // Récupère l'élément dans le stockage interne
    let db = this.findAll(key);

    // Vérifie si l'élément a été trouvé
    if (db !== null) {
      // Recherche l'index associé à l'élément dans le tableau
      const index = db.findIndex((dbItem) => dbItem.id === id);
      if (index !== -1) {
        db.splice(index, 1); // Supprime l'élément du tableau
        // Sauvegarde les données dans le stockage interne
        this.saveAllAndFlush(key, db);

        return true;
      }

      return false;
    }
  }
}
