const fs =  {
  writeFile: (filename, data, callback) => {
    try {
      localStorage.setItem(filename, data);
      if (callback) callback(null);
    } catch (error) {
      if (callback) callback(error);
    }
  },
  
  writeFileSync: (filename, data) => {
    try {
      localStorage.setItem(filename, data);
    } catch (error) {
      throw error;
    }
  },
  
  readFile: (filename, callback) => {
    try {
      const data = localStorage.getItem(filename);
      if (callback) callback(null, data);
    } catch (error) {
      if (callback) callback(error);
    }
  },
  
  readFileSync: (filename) => {
    try {
      return localStorage.getItem(filename);
    } catch (error) {
      throw error;
    }
  },
  
  unlink: (filename, callback) => {
    try {
      localStorage.removeItem(filename);
      if (callback) callback(null);
    } catch (error) {
      if (callback) callback(error);
    }
  },
  
  unlinkSync: (filename) => {
    try {
      localStorage.removeItem(filename);
    } catch (error) {
      throw error;
    }
  }
};


const { _get } = require('../helpers/utilities');

module.exports = {
  /**
   * Save devices cache file (useful for using zeroconf)
   * @returns {Promise<string|{msg: string, error: number}|*|Device[]|{msg: string, error: number}>}
   */
  async saveDevicesCache(fileName = './devices-cache.json') {
    const devices = await this.getDevices();

    const error = _get(devices, 'error', false);

    if (error || !devices) {
      return devices;
    }

    const jsonContent = JSON.stringify(devices, null, 2);

    try {
      fs.writeFileSync(fileName, jsonContent, 'utf8');
      return { status: 'ok', file: fileName };
    } catch (e) {
      console.log('An error occured while writing JSON Object to File.');
      return { error: e.toString() };
    }
  },
};
