import React from 'react'
import { Button, Table, Dropdown, Menu, Tag } from 'antd'
import { MoreOutlined } from '@ant-design/icons'
import { useMuridWithPenilaian } from '@/hooks/useMuridWithPenilaian'

const MuridTable = ({ idRombelSemesterGuru, tp }) => {
  const { data: muridWithPenilaian, isFetching: isFetchingMuridWithPenilaian } =
    useMuridWithPenilaian(idRombelSemesterGuru, tp.id)

  const menu = (record) => (
    <Menu>
      <Menu.Item key="edit">Edit Nilai</Menu.Item>
      <Menu.Item key="delete">Hapus Nilai</Menu.Item>
      <Menu.Item key="input">Input Nilai</Menu.Item>
    </Menu>
  )

  const columns = [
    {
      title: 'No',
      dataIndex: 'id',
      key: 'id',
      render: (text, record, index) => index + 1,
    },
    {
      title: 'NIS',
      dataIndex: 'nis',
      key: 'nis',
    },
    {
      title: 'Nama',
      dataIndex: 'nama',
      key: 'nama',
    },
    {
      title: 'Nilai Agama Budipekerti',
      dataIndex: 'penilaianMingguan',
      key: 'nilaiAgamaBudipekerti',
      children: [
        {
          title: tp?.tujuanPembelajaranAgamaBudipekerti,
          dataIndex: 'penilaianMingguan',
          key: 'nilaiAgamaBudipekerti',
          render: (penilaianMingguan) =>
            penilaianMingguan ? (
              <div>
                <b>{penilaianMingguan.nilaiAgamaBudipekerti}</b>
                <br /> {penilaianMingguan.deskripsiAgamaBudipekerti}
              </div>
            ) : (
              <Tag color="warning">Nilai belum diinput</Tag>
            ),
        },
      ],
    },
    {
      title: 'Nilai Jati Diri',
      dataIndex: 'penilaianMingguan',
      key: 'nilaiJatiDiri',
      children: [
        {
          title: tp?.tujuanPembelajaranJatiDiri,
          dataIndex: 'penilaianMingguan',
          key: 'nilaiJatiDiri',
          render: (penilaianMingguan) =>
            penilaianMingguan ? (
              <div>
                <b>{penilaianMingguan.nilaiJatiDiri}</b>
                <br /> {penilaianMingguan.deskripsiJatiDiri}
              </div>
            ) : (
              <Tag color="warning">Nilai belum diinput</Tag>
            ),
        },
      ],
    },
    {
      title: 'Nilai Literasi Sains',
      dataIndex: 'penilaianMingguan',
      key: 'nilaiLiterasiSains',
      children: [
        {
          title: tp?.tujuanPembelajaranLiterasiSains,
          dataIndex: 'penilaianMingguan',
          key: 'nilaiLiterasiSains',
          render: (penilaianMingguan) =>
            penilaianMingguan ? (
              <div>
                <b>{penilaianMingguan.nilaiLiterasiSains}</b>
                <br /> {penilaianMingguan.deskripsiLiterasiSains}
              </div>
            ) : (
              <Tag color="warning">Nilai belum diinput</Tag>
            ),
        },
      ],
    },
    {
      title: 'Aksi',
      key: 'action',
      render: (text, record) => (
        <Dropdown overlay={menu(record)} trigger={['click']}>
          <Button type="primary" icon={<MoreOutlined />} />
        </Dropdown>
      ),
    },
  ]

  return (
    <Table
      columns={columns}
      dataSource={muridWithPenilaian}
      loading={isFetchingMuridWithPenilaian}
      scroll={{ x: 1000 }}
      bordered
    />
  )
}

export default MuridTable
