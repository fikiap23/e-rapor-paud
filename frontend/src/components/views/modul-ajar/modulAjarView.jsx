'use client'
import { useState, useEffect } from 'react'
import { Tabs, Button, Table, Modal, Space } from 'antd'
import Link from 'next/link'
import useAuth from '@/hooks/useAuth'
import InputModulAjar from './component/inputModulAjar'
import ActivitiesView from './component/activitiesView'
import modulAjarService from '@/services/modul-ajar.service'
import EditModulAjar from './component/editModulAjar'
import { useModulAjars } from '@/hooks/useModulAjar'
import { useCpTp } from '@/hooks/useCpTp'
import {
  DeleteOutlined,
  EditOutlined,
  PrinterOutlined,
} from '@ant-design/icons'

const { TabPane } = Tabs

const ModulAjarView = ({ idRombelSemesterGuru }) => {
  const [activeTab, setActiveTab] = useState('moduleTab')
  const [mingguTpUncreated, setMingguTpUncreated] = useState([])
  const [selectedModulAjar, setSelectedModulAjar] = useState(null)
  const { token } = useAuth()
  const {
    data,
    error: errorModulAjars,
    isFetching: isFetchingModulAjars,
    refetch: refetchModulAjars,
  } = useModulAjars(token, idRombelSemesterGuru)

  const {
    data: cpTps,
    error: errorCpTps,
    isFetching: isFetchingCpTps,
    refetch: refetchCpTps,
  } = useCpTp(token)

  useEffect(() => {
    if (!isFetchingCpTps && !isFetchingModulAjars) {
      const mingguModulAjar = data.modulAjars?.map((modulAjar) => {
        return modulAjar?.minggu
      })
      const tp = cpTps?.tujuanPembelajaran.filter(
        (tujuanPembelajaran) =>
          !mingguModulAjar.includes(tujuanPembelajaran?.minggu)
      )
      setMingguTpUncreated(tp)
    }
  }, [isFetchingCpTps, isFetchingModulAjars, cpTps, data.modulAjars])

  const handleTabChange = (tab) => {
    setActiveTab(tab)
  }

  const handleEdit = (data) => {
    setActiveTab('moduleEditTab')
    setSelectedModulAjar(data)
  }

  const handleDelete = (id) => {
    Modal.confirm({
      title: 'Apakah Anda yakin?',
      content: 'Anda akan menghapus data modul!',
      okText: 'Ya, hapus!',
      cancelText: 'Tidak, batalkan!',
      onOk: async () => {
        await modulAjarService.delete(token, id)
        Modal.success({
          content: 'Data modul telah dihapus.',
        })
        refetchModulAjars()
      },
      onCancel: () => {},
    })
  }

  const columns = [
    {
      title: 'Minggu',
      dataIndex: 'minggu',
      key: 'minggu',
    },
    {
      title: 'Topik',
      dataIndex: 'topik',
      key: 'topik',
    },
    {
      title: 'Sub Topik',
      dataIndex: 'subtopik',
      key: 'subtopik',
    },
    {
      title: 'Tujuan Kegiatan',
      dataIndex: 'tujuanKegiatan',
      key: 'tujuanKegiatan',
      render: (text, record, index) => (
        <div>
          {text.map((tujuan, idx) => (
            <p key={idx}>
              {idx + 1}. {tujuan}
            </p>
          ))}
        </div>
      ),
    },
    {
      title: 'Aksi',
      key: 'id',
      render: (text, record, index) => (
        <Space size="middle">
          <Button
            type="primary"
            icon={<EditOutlined />}
            onClick={() => handleEdit(record)}
          >
            Edit
          </Button>
          <Button
            danger
            icon={<DeleteOutlined />}
            onClick={() => handleDelete(record.id)}
          >
            Hapus
          </Button>
          <Link href={`/module_print/${record.id}`} target="_blank">
            <Button
              style={{ backgroundColor: 'green', color: 'white' }}
              icon={<PrinterOutlined />}
            >
              Print
            </Button>
          </Link>
        </Space>
      ),
    },
  ]

  return (
    <div className="content-wrapper" id="guru">
      <section className="content">
        <div className="row">
          <div className="col-md-12">
            <div className="box box-solid box-primary">
              <div className="box-header">
                <h3 className="box-title">
                  <i className="fa fa-book"></i>{' '}
                  <span style={{ marginLeft: '10px' }}>
                    {`Modul Ajar Rombel ${data.rombel} - Semester ${data.semester}`}
                  </span>
                </h3>
              </div>
              <div className="box-body">
                <Tabs activeKey={activeTab} onChange={handleTabChange}>
                  <TabPane tab="Modul Ajar" key="moduleTab">
                    <div className="box-body table-responsive no-padding">
                      <div style={{ margin: '0 20px 20px 20px' }}>
                        <Button
                          type="primary"
                          onClick={() => handleTabChange('learningOutcomesTab')}
                        >
                          Tambah
                        </Button>
                      </div>

                      <Table
                        loading={isFetchingModulAjars}
                        columns={columns}
                        dataSource={data.modulAjars}
                        rowKey="id"
                        pagination={false}
                      />
                    </div>
                  </TabPane>
                  <TabPane tab="Jadwal Ajar" key="activitiesTab">
                    <ActivitiesView
                      idRombelSemesterGuru={idRombelSemesterGuru}
                    />
                  </TabPane>
                </Tabs>
                {activeTab === 'learningOutcomesTab' && (
                  <InputModulAjar
                    refetch={refetchModulAjars}
                    tujuanPembelajarans={mingguTpUncreated}
                    token={token}
                    idRombelSemesterGuru={idRombelSemesterGuru}
                    back={() => handleTabChange('moduleTab')}
                  />
                )}
                {activeTab === 'moduleEditTab' && selectedModulAjar && (
                  <EditModulAjar
                    dataToUpdate={selectedModulAjar}
                    refetch={refetchModulAjars}
                    token={token}
                    tujuanPembelajarans={mingguTpUncreated}
                    idRombelSemesterGuru={idRombelSemesterGuru}
                    back={() => handleTabChange('moduleTab')}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default ModulAjarView
