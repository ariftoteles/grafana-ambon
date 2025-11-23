const fs = require('fs');
const path = require('path');
const { DATABASE_FILENAME } = require('../config/constants');

// Tentukan path database berdasarkan apakah running dari executable atau tidak
let DATABASE_PATH;

if (process.pkg) {
  // Jika running dari executable, gunakan folder yang sama dengan executable
  DATABASE_PATH = path.join(path.dirname(process.execPath), DATABASE_FILENAME);
} else {
  // Jika running dari source code, gunakan folder project
  DATABASE_PATH = path.join(__dirname, '..', DATABASE_FILENAME);
}

/**
 * Membaca database dari file JSON
 * @returns {Object} Data dari database atau struktur default jika error
 */
function readDatabase() {
  try {
    // Pastikan file database ada, jika tidak buat yang baru
    if (!fs.existsSync(DATABASE_PATH)) {
      initializeDatabase();
    }
    
    const data = fs.readFileSync(DATABASE_PATH, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    // Jika file tidak ada atau error, inisialisasi database baru
    console.warn('Database file not found or corrupted, creating new one');
    initializeDatabase();
    return { data: [] };
  }
}

/**
 * Inisialisasi database dengan struktur default
 */
function initializeDatabase() {
  try {
    const defaultData = { data: [] };
    fs.writeFileSync(DATABASE_PATH, JSON.stringify(defaultData, null, 2));
    console.log(`Database initialized at: ${DATABASE_PATH}`);
  } catch (error) {
    console.error('Failed to initialize database:', error);
  }
}

/**
 * Menulis data ke database file
 * @param {Object} data - Data yang akan ditulis ke database
 * @returns {boolean} True jika berhasil, false jika error
 */
function writeDatabase(data) {
  try {
    fs.writeFileSync(DATABASE_PATH, JSON.stringify(data, null, 2));
    return true;
  } catch (error) {
    console.error('Error writing to database:', error);
    return false;
  }
}

/**
 * Mencari item berdasarkan ID
 * @param {number} id - ID yang dicari
 * @returns {Object} { item, index } atau { item: null, index: -1 } jika tidak ditemukan
 */
function findItemById(id) {
  const database = readDatabase();
  const index = database.data.findIndex(item => item.id === parseInt(id));
  
  return {
    item: index !== -1 ? database.data[index] : null,
    index: index
  };
}

/**
 * Generate ID baru berdasarkan ID tertinggi yang ada
 * @returns {number} ID baru
 */
function generateNewId() {
  const database = readDatabase();
  return database.data.length > 0 
    ? Math.max(...database.data.map(item => item.id)) + 1 
    : 1;
}

/**
 * Menambah item baru ke database
 * @param {Object} itemData - Data item yang akan ditambahkan
 * @returns {Object} { success: boolean, data: Object|null }
 */
function insertItem(itemData) {
  try {
    const database = readDatabase();
    const newItem = {
      ...itemData,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    database.data.push(newItem);
    
    const success = writeDatabase(database);
    return {
      success,
      data: success ? newItem : null
    };
  } catch (error) {
    console.error('Error inserting item:', error);
    return { success: false, data: null };
  }
}

/**
 * Update item yang sudah ada di database
 * @param {number} id - ID item yang akan diupdate
 * @param {Object} updateData - Data yang akan diupdate
 * @returns {Object} { success: boolean, data: Object|null }
 */
function updateItem(id, updateData) {
  try {
    const database = readDatabase();
    const itemIndex = database.data.findIndex(item => item.id === parseInt(id));
    
    if (itemIndex === -1) {
      return { success: false, data: null };
    }
    
    // Merge data lama dengan data baru
    database.data[itemIndex] = {
      ...database.data[itemIndex],
      ...updateData,
      id: parseInt(id), // pastikan ID tidak berubah
      updatedAt: new Date().toISOString()
    };
    
    const success = writeDatabase(database);
    return {
      success,
      data: success ? database.data[itemIndex] : null
    };
  } catch (error) {
    console.error('Error updating item:', error);
    return { success: false, data: null };
  }
}

/**
 * Mencari items berdasarkan range ID (dari start_id sampai end_id)
 * @param {number} startId - ID awal range
 * @param {number} endId - ID akhir range
 * @returns {Object} { success: boolean, data: Array, total: number, range: Object }
 */
function findByRangeId(startId, endId) {
  try {
    const database = readDatabase();
    const startIdNum = parseInt(startId);
    const endIdNum = parseInt(endId);
    
    // Validasi range
    if (startIdNum > endIdNum) {
      return {
        success: false,
        data: [],
        total: 0,
        range: { start_id: startIdNum, end_id: endIdNum },
        error: 'Start ID harus lebih kecil atau sama dengan End ID'
      };
    }
    
    // Filter data berdasarkan range ID
    const filteredItems = database.data.filter(item => {
      const itemId = parseInt(item.id);
      return itemId >= startIdNum && itemId <= endIdNum;
    });
    
    return {
      success: true,
      data: filteredItems,
      total: filteredItems.length,
      range: { start_id: startIdNum, end_id: endIdNum }
    };
  } catch (error) {
    console.error('Error finding items by range:', error);
    return {
      success: false,
      data: [],
      total: 0,
      range: { start_id: parseInt(startId), end_id: parseInt(endId) },
      error: error.message
    };
  }
}

module.exports = {
  readDatabase,
  writeDatabase,
  findItemById,
  findByRangeId,
  generateNewId,
  insertItem,
  updateItem,
  initializeDatabase,
  getDatabasePath: () => DATABASE_PATH
};