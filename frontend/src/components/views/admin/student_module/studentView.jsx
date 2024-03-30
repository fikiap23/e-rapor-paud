'use client'
import { useEffect, useState } from 'react'
import Swal from 'sweetalert2'
import TabInputSiswa from './TabInputStudent'
import Link from 'next/link'
import useAuth from '@/hooks/useAuth'
import { useGetAllStudentData } from '@/services/studentService/useStudent'
import Loading from '@/components/shared/Loading'
import siswaService from '@/services/studentService/student.service'
import TabUpdateSiswa from './TabUpdateStudent'

const StudentView = () => {
  const { token } = useAuth();
  const [activeTab, setActiveTab] = useState('view');
  const [searchKeyword, setSearchKeyword] = useState('');
  const [filteredDataStudent, setFilteredDataStudent] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');
  const [refreshTable, setRefreshTable] = useState(false);

  const {
    data: listStudent,
    error: errorStudent,
    isFetching: isFetchingStudent,
    refetch: refetchStudents,
  } = useGetAllStudentData(token)

  useEffect(() => {
    if (listStudent) {
      const sortedStudents = [...listStudent].sort((a, b) => {
        if (a[sortBy] < b[sortBy]) {
          return sortOrder === 'asc' ? -1 : 1
        }
        if (a[sortBy] > b[sortBy]) {
          return sortOrder === 'asc' ? 1 : -1
        }
        return 0
      })
      setFilteredDataStudent(sortedStudents.filter(filterStudent))
    }
  }, [listStudent, searchKeyword, sortBy, sortOrder, refreshTable])

  const filterStudent = (student) => {
    return (
      student.nis.toLowerCase().includes(searchKeyword.toLowerCase()) ||
      student.nisn.toLowerCase().includes(searchKeyword.toLowerCase()) ||
      student.nama.toLowerCase().includes(searchKeyword.toLowerCase())
    )
  }

  const handleTabChange = (tab, id) => {
    setActiveTab(tab)
    localStorage.setItem('@currentStudentId', id);
  }

  const handleDelete = (id) => {
    Swal.fire({
      title: 'Apakah Anda yakin?',
      text: 'Anda akan menghapus siswa!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Ya, hapus!',
      cancelButtonText: 'Tidak, batalkan!',
      reverseButtons: true,
    }).then(async (result) => {
      if (result.isConfirmed) {
        await siswaService.delete(token, id);
        refetchStudents();
        Swal.fire('Data Dihapus!', 'Siswa telah dihapus.', 'success')
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire('Dibatalkan', 'Tidak ada perubahan pada data siswa.', 'error')
      }
    })
  }

  const handleFilterChange = (e) => {
    setSearchKeyword(e.target.value)
    setCurrentPage(1)
  }

  const handleSort = (field) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')
    } else {
      setSortBy(field)
      setSortOrder('asc')
    }
  }

  const maxPaginationData = 10;
  const indexOfLastStudent = currentPage * maxPaginationData
  const indexOfFirstStudent = indexOfLastStudent - maxPaginationData
  const currentStudents = filteredDataStudent.slice(indexOfFirstStudent, indexOfLastStudent)

  const paginate = (pageNumber) => setCurrentPage(pageNumber)

  return (
    <div className="content-wrapper">
      {/* Main content */}
      <section className="content">
        <div className="row">
          <div className="col-md-12">
            <div className="nav-tabs-custom">
              <ul className="nav nav-tabs">
                <li className={activeTab === 'view' ? 'active' : ''}>
                  <Link href="" onClick={() => handleTabChange('view')}>
                    Lihat Siswa
                  </Link>
                </li>
                <li className={activeTab === 'input' ? 'active' : ''}>
                  <Link href="" onClick={() => handleTabChange('input')}>
                    Input Siswa
                  </Link>
                </li>
                {activeTab === 'update' && (
                  <li className={activeTab === 'update' ? 'active' : ''}>
                    <Link href="" onClick={() => handleTabChange('update')}>
                      Edit Siswa
                    </Link>
                  </li>
                )}
              </ul>
              <div className="tab-content">
                {activeTab === 'view' && (
                  <div className="active tab-pane" id="activity">
                    <div className="box-body table-responsive no-padding">
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        {!isFetchingStudent && currentStudents.length === 0 ? (null) : (
                          <div className="form-group" style={{ width: '30%' }}>
                            <input
                              type="text"
                              id="filter"
                              className="form-control"
                              value={searchKeyword}
                              placeholder="Masukan pencarian"
                              onChange={handleFilterChange}
                            />
                          </div>
                        )}
                        <div>
                          <button className="btn btn-primary" onClick={refetchStudents}><i className="fa fa-refresh"></i></button>
                        </div>
                      </div>
                      {isFetchingStudent ? (
                        <Loading></Loading>
                      ) : (!isFetchingStudent && currentStudents.length === 0 ? (
                        <div className='text-center' style={{ opacity: '0.6' }}>
                          <svg xmlns="http://www.w3.org/2000/svg" width="3em" height="3em" viewBox="0 0 24 24"><path fill="#47a6ff" fill-opacity="0" d="M5 3H12.5V8.5H19V21H5V3Z"><animate fill="freeze" attributeName="fill-opacity" begin="2.38s" dur="0.255s" values="0;0.3" /></path><g fill="none" stroke="#47a6ff" stroke-linecap="round" stroke-linejoin="round"><g stroke-width="2"><path stroke-dasharray="64" stroke-dashoffset="64" d="M13 3L19 9V21H5V3H13"><animate fill="freeze" attributeName="stroke-dashoffset" dur="1.02s" values="64;0" /></path><path stroke-dasharray="6" stroke-dashoffset="6" d="M9 13H13"><animate fill="freeze" attributeName="stroke-dashoffset" begin="1.7s" dur="0.34s" values="6;0" /></path><path stroke-dasharray="8" stroke-dashoffset="8" d="M9 16H15"><animate fill="freeze" attributeName="stroke-dashoffset" begin="2.04s" dur="0.34s" values="8;0" /></path></g><path stroke-dasharray="14" stroke-dashoffset="14" d="M12.5 3V8.5H19"><animate fill="freeze" attributeName="stroke-dashoffset" begin="1.19s" dur="0.34s" values="14;0" /></path></g></svg>
                          <div style={{ color: 'gray' }}>
                            <p><b>Data masih kosong</b></p>
                            <small><b>Silahkan input siswa terlebih dahulu</b></small>
                          </div>
                        </div>
                      ) : (
                        <>
                          <table id="siswa" className="table table-hover">
                            <thead>
                              <tr>
                                <th>No.</th>
                                <th onClick={() => handleSort('nis')}>Nis <i className="fa fa-sort"></i></th>
                                <th onClick={() => handleSort('nisn')}>Nisn <i className="fa fa-sort"></i></th>
                                <th onClick={() => handleSort('nama')}>Nama <i className="fa fa-sort"></i></th>
                                <th>Aksi</th>
                              </tr>
                            </thead>
                            <tbody>
                              {!isFetchingStudent &&
                                currentStudents &&
                                currentStudents.map((item, index) => (
                                  <tr key={item.id}>
                                    <td>{indexOfFirstStudent + index + 1}</td>
                                    <td>{item.nis}</td>
                                    <td>{item.nisn}</td>
                                    <td>{item.nama.toUpperCase()}</td>
                                    <td>
                                      <a className="btn btn-success btn-sm" onClick={() => handleTabChange('update', item.id)}>
                                        <i className="icon fa fa-edit"></i>
                                      </a>
                                      <button
                                        style={{
                                          marginRight: '2px',
                                          marginLeft: '2px',
                                        }}
                                        className="btn btn-danger btn-sm"
                                        onClick={() => handleDelete(item.id)}
                                      >
                                        <i className="icon fa fa-trash"></i>
                                      </button>
                                    </td>
                                  </tr>
                                ))}
                            </tbody>
                          </table>
                          {/* Pagination */}
                          <nav aria-label="Page navigation example">
                            <ul className="pagination">
                              {[...Array(Math.ceil(filteredDataStudent.length / maxPaginationData))].map((_, index) => (
                                <li key={index} className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}>
                                  <Link href="" className="page-link" onClick={() => paginate(index + 1)}>
                                    {index + 1}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </nav>
                        </>
                      )
                      )}
                    </div>
                  </div>
                )}
                {activeTab === 'input' && <TabInputSiswa />}
                {activeTab === 'update' && (
                  <div>
                    <button className='btn btn-danger' onClick={() => handleTabChange('view')}>Batal</button>
                    <TabUpdateSiswa />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default StudentView
