import axios from 'axios'
import { apiUrl } from './apiUrls'

const BASE_URL = `${apiUrl}/murid`
const siswaService = {
  create: async (data, token) => {
    try {
      const response = await axios.post(`${BASE_URL}`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      })
      return response.data.data
    } catch (error) {
      throw error.response?.data?.message || 'Siswa Gagal Ditambahkan'
    }
  },

  update: async (token, id, data) => {
    try {
      const response = await axios.put(`${BASE_URL}/${id}`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      })
      return response.data.data
    } catch (error) {
      throw error.response?.data?.message || 'Siswa Gagal Diupdate'
    }
  },

  removeRombel: async (token, id) => {
    try {
      console.log(token)
      const response = await axios.put(`${BASE_URL}/clear-rombel/${id}`, null, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      return response.data
    } catch (error) {
      throw (
        error.response?.data?.message || 'Gagal mengeluarkan siswa dari rombel'
      )
    }
  },

  updateStatusAkun: async (token, id, data) => {
    try {
      const response = await axios.put(`${apiUrl}/${id}`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      return response.data
    } catch (error) {
      throw error.response?.data?.message || 'Siswa Gagal Diupdate'
    }
  },

  delete: async (token, id) => {
    try {
      const response = await axios.delete(`${BASE_URL}/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      return response.data
    } catch (error) {
      throw error.response?.data?.message || 'Siswa Gagal Dihapus'
    }
  },

  getById: async (id, token) => {
    try {
      const response = await axios.get(`${BASE_URL}/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      return response.data
    } catch (error) {
      throw error.response?.data?.message || 'Gagal mengambil data siswa'
    }
  },

  createMany: async (token, data) => {
    try {
      const response = await axios.post(`${BASE_URL}/bulk`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      return response.data.data
    } catch (error) {
      throw error.response?.data?.message || 'Siswa Gagal Ditambahkan'
    }
  },
}

export default siswaService
