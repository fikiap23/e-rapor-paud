const SidebarTeacher = () => {
  return (
    <aside className="main-sidebar">
      <section className="sidebar">
        <div className="user-panel">
          <div className="pull-left image">
            <img
              src="https://picsum.photos/200"
              className="img-circle"
              alt="User Image"
            />
          </div>
          <div className="pull-left info">
            <p>User Name</p>
            <a href="#">
              <i className="fa fa-circle text-success"></i> Online
            </a>
          </div>
        </div>

        <ul className="sidebar-menu" data-widget="tree">
          <li>
            <a href="/wali-kelas">
              {' '}
              <i className="fa fa-dashboard"></i> <span>Dashboard</span>
            </a>
          </li>
          <li>
            <a href="/wali-kelas/matpel-diampuh">
              <i className="fa fa-book"></i> <span>Mapel Diampu</span>
            </a>
          </li>
          <li>
            <a href="/wali-kelas/riwayat">
              <i className="fa fa-bookmark"></i> <span>Riwayat Mengajar</span>
            </a>
          </li>
          <li>
            <a href="/wali-kelas/input-absen">
              <i className="fa fa-calendar"></i> <span>Input Absen</span>
            </a>
          </li>
          <li>
            <a href="/wali-kelas/input-nilai-sikap">
              <i className="fa fa-edit"></i> <span>Input Nilai Sikap</span>
            </a>
          </li>
          <li>
            <a href="/wali-kelas/prestasi">
              <i className="fa fa-trophy"></i> <span>Prestasi</span>
            </a>
          </li>
          <li>
            <a href="/wali-kelas/ekstra">
              <i className="fa fa-edit"></i> <span>Ekstrakurikuler</span>
            </a>
          </li>
          <li>
            <a href="/wali-kelas/validasi">
              <i className="fa fa-edit"></i> <span>Validasi Nilai</span>
            </a>
          </li>
          <li className="active">
            <a href="/wali-kelas/raport">
              <i className="fa fa-print"></i> <span>Cetak Raport</span>
            </a>
          </li>
        </ul>
      </section>
    </aside>
  )
}

export default SidebarTeacher
