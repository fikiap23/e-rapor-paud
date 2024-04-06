'use client'
import Link from 'next/link'
import UpdateClassModal from './modal/updateClassModal'
import { useState } from 'react'
import rombelService from '@/services/rombel.service'
import useAuth from '@/hooks/useAuth'
import Swal from 'sweetalert2'
import EmptyDataIndicator from '@/components/shared/EmptyDataIndicator'
export default function TabTableClass({ rombels, openModal, setRombels }) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedRombel, setSelectedRombel] = useState(null)
  const { token } = useAuth()

  const handleDelete = (idRombel) => {
    Swal.fire({
      title: 'Apakah Anda yakin?',
      text: 'Data rombel akan dihapus permanen.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Ya, hapus!',
      cancelButtonText: 'Batal',
    }).then((result) => {
      if (result.isConfirmed) {
        rombelService
          .deleteRombel(token, idRombel)
          .then(() => {
            Swal.fire({
              icon: 'success',
              title: 'Data rombel telah dihapus',
              position: 'bottom-center',
            })
            setRombels((prevRombels) =>
              prevRombels.filter((rombel) => rombel.id !== idRombel)
            )
          })
          .catch((error) => {
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: error,
              position: 'bottom-center',
            })
          })
      }
    })
  }

  return (
    <div className="box-body">
      <div style={{ margin: '0 20px 20px 20px' }}>
        <button type="button" className="btn btn-success" onClick={openModal}>
          <span className="glyphicon glyphicon-plus"></span>
          Tambah
        </button>
      </div>
      {rombels.length === 0 && (
        <EmptyDataIndicator message={'Data Rombel Kosong'} />
      )}
      {rombels.length > 0 && (
        <table id="Rombel" className="table table-bordered table-striped">
          <thead>
            <tr>
              <th>No</th>
              <th>Kelompok Usia</th>
              <th>Rombel</th>
              <th>Kuota</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {rombels.map((item, index) => (
              <tr key={item.id}>
                <td>{index + 1}</td>
                <td>{item.kelompokUsia}</td>
                <td>{item.name}</td>
                <td>{`${item.coutMurid}/${item.kuota}`}</td>
                <td style={{ display: 'flex', gap: '5px' }}>
                  <Link
                    className="btn btn-success btn-sm"
                    href={`/admin/class/read_student/${item.id}`}
                    title="Lihat"
                    data-toggle="tooltip"
                  >
                    <i className="icon fa fa-eye"></i>
                  </Link>
                  <button
                    style={{ marginRight: '2px', marginLeft: '2px' }}
                    className="btn btn-primary btn-sm edit"
                    title="Edit"
                    data-toggle="tooltip"
                    onClick={() => {
                      setSelectedRombel(item)
                      setIsModalOpen(true)
                    }}
                  >
                    <i className="icon fa fa-edit"></i>
                  </button>

                  <Link
                    className="btn btn-success btn-sm"
                    href={`/admin/class/add_student/${item.id}`}
                    title="Tambah Siswa"
                    data-toggle="tooltip"
                  >
                    <i className="icon fa fa-plus"></i>
                  </Link>
                  <button
                    className="btn btn-danger btn-sm"
                    title="Hapus"
                    data-toggle="tooltip"
                    onClick={() => handleDelete(item.id)}
                  >
                    <i className="icon fa fa-trash"></i>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <UpdateClassModal
        setRombels={setRombels}
        selectedRombel={selectedRombel}
        isOpen={isModalOpen}
        closeModal={() => setIsModalOpen(false)}
      ></UpdateClassModal>
    </div>
  )
}