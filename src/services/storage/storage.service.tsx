import { StorageKeys } from './storage.constants';

/**
 * This is a wrapper around localStorage with:
 * 1. fallback to in memory storage in case local storage is not available
 * 2. option to add expiration time to  values
 */
export const StorageService = new (class {
  storage = localStorage;

  /** Gets a stored value if exists
   * returns null if not exist or in case of error .
   * @memberof LocalStoreService
   * @method get
   * @param {string} key
   * @return {string | null}
   */
  get(key: string): string | null {
    try {
      return this.storage.getItem(key);
    } catch (error) {}
    return null;
  }

  /** Sets data for a key in storage
   * in case of error accessing localStorage, will change storage mode to in memory
   * @memberof LocalStoreService
   * @method set
   * @param {string} key
   * @param {string} data
   * @return {void}
   */
  set(key: string, data: string): void {
    try {
      this.storage.setItem(key, data);
    } catch (error) {
      console.log(error);
      // this.storage = new TempStorage();
      // this.storage.setItem(key, data);
    }
  }

  /** Sets expiration time for a key.
   * key references a key in the local store
   * @memberof LocalStoreService
   * @method setExpiration
   * @param {string} key
   * @param {number} duration
   * @return {void}
   */
  setExpiration(key: string, duration: number): void {
    const expirationsValue: any = this.get(StorageKeys.KeyDecay);
    const expirations: any = (expirationsValue && JSON.parse(expirationsValue)) || {};
    expirations[key] = Date.now() + duration;
    this.set(StorageKeys.KeyDecay, JSON.stringify(expirations));
  }

  /** Removes expired keys from local store
   * @memberof LocalStoreService
   * @method checkExpiration
   * @return {void}
   */
  checkExpiration(): void {
    let expirations: any;
    if (!(expirations = JSON.parse(this.get(StorageKeys.KeyDecay) || 'null'))) {
      return;
    }
    const now = Date.now();

    Object.entries(expirations).forEach(([key, val]) => {
      if (now <= Number(val)) {
        return;
      }
      this.remove(key);
      delete expirations[key];
    });

    this.set(StorageKeys.KeyDecay, JSON.stringify(expirations));
  }

  /** Removes a key from the store
   * @memberof LocalStoreService
   * @method removeItem
   * @param {string} key
   * @return {void}
   */
  remove(key: string): void {
    try {
      this.storage.removeItem(key);
    } catch (error) {}
  }
})();
