import AsyncStorage from '@react-native-async-storage/async-storage'
import Logger from '@/Utils/Logger'

class Storage {
  /**
   *
   * @param name name of data to be stored in async storage
   * @param item
   * @returns
   */
  async set(name: string, item: object | string) {
    try {
      await AsyncStorage.setItem(name, JSON.stringify(item))
      return true
    } catch (error) {
      Logger.warn('Utils: asyncStorage: Storage: set: error =', error)
      return false
    }
  }
  /**
   *
   * @param name name of item to get from async storage
   * @returns data that is saved in async storage
   */
  async get(name: string) {
    try {
      const getItem = await AsyncStorage.getItem(name)
      return getItem
    } catch (error) {
      Logger.warn('Utils: asyncStorage: Storage: get: error =', error)
    }
  }
  async getAll() {
    try {
      const getAllKeys = await AsyncStorage.getAllKeys()
      const multiGet = await AsyncStorage.multiGet(getAllKeys)
      let newObj: any = {}
      multiGet.forEach(([key, val]: any) => {
        const value = JSON.parse(val)
        newObj[key] = value
      })
      return newObj
    } catch (error) {
      Logger.warn('Utils: asyncStorage: Storage: set: getAll =', error)
    }
  }
  async removeAll() {
    try {
      const getAllKeys = await AsyncStorage.getAllKeys()
      await AsyncStorage.multiRemove(getAllKeys)
      return true
    } catch (error) {
      Logger.warn('Utils: asyncStorage: Storage: set: removeAll =', error)
      return false
    }
  }
}

export default new Storage()
