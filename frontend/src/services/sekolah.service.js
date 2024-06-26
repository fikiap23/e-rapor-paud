import axios from 'axios'
import { apiUrl } from './apiUrls'

const BASE_URL = `${apiUrl}/sekolah`
const sekolahService = {
  update: async (token, data) => {
    try {
      const response = await axios.put(`${BASE_URL}`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      })
      return response.data.data
    } catch (error) {
      throw error.response?.data?.message || 'Sekolah Gagal Diupdate!'
    }
  },

  create: async (token, data) => {
    try {
      const response = await axios.post(`${BASE_URL}`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      })
      return response.data.data
    } catch (error) {
      throw error.response?.data?.message || 'Sekolah Gagal Ditambahkan'
    }
  },

  getSekolah: async () => {
    try {
      const response = await axios.get(`${BASE_URL}`)
      return response.data.data
    } catch (error) {
      throw error.response?.data?.message || 'Sekolah Gagal Ditampilkan'
    }
  },
}

export default sekolahService
