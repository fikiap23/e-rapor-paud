import { formatDateWithIndonesianMonth } from '@/lib/helperDate'

String.prototype.toCapitalEachWord = function () {
  return this.replace(/\w\S*/g, function (txt) {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
  })
}

function Narrative({ murid, rombel, sekolah, semester, rapor, guru, kapsek }) {
  var catGabunganAgamaBudi = rapor.catatanAgamaBudipekerti?.join("").length;
  var catGabunganJatiDiri = rapor.catatanJatiDiri?.join("").length
  var catGabunganLiterasiSains = rapor.catatanLiterasiSains?.join("").length

  const pointBLogic =
    (catGabunganAgamaBudi > 1500 &&
      catGabunganJatiDiri > 1500) ||
    (catGabunganAgamaBudi <= 1000 &&
      catGabunganJatiDiri > 2000)
  const point_b_logic = `point_b ${pointBLogic ? 'extra-margin' : ''}`

  const pointCLogic =
    (catGabunganAgamaBudi > 1500 &&
      catGabunganLiterasiSains > 1500 &&
      catGabunganJatiDiri > 1500) ||
    (catGabunganAgamaBudi > 1500 &&
      catGabunganLiterasiSains > 1500) ||
    catGabunganLiterasiSains <= 1500 ||
    (catGabunganAgamaBudi <= 1500 &&
      catGabunganLiterasiSains > 1700 &&
      catGabunganJatiDiri <= 1500) ||
    (catGabunganAgamaBudi <= 1500 &&
      catGabunganLiterasiSains > 1700 &&
      catGabunganJatiDiri > 1500)
  const point_c_logic = `point_c ${pointCLogic ? 'extra-margin' : ''}`


  const pointDLogic =
    (catGabunganAgamaBudi <= 1500 &&
      catGabunganLiterasiSains <= 1500 &&
      rapor.catatanJatiDiri.length > 1000) ||
    (catGabunganAgamaBudi <= 3400 &&
      catGabunganLiterasiSains <= 2000 &&
      rapor.catatanJatiDiri.length <= 2900 &&
      rapor.catatanPancasila.length > 2000)
  const point_d_logic = `point_d ${pointDLogic ? 'extra-margin' : ''}`

  const noteGrowthChild =
    (catGabunganAgamaBudi > 1500 &&
      catGabunganLiterasiSains > 1500 &&
      rapor.catatanPancasila.length > 1500 &&
      rapor.catatanPertumbuhan.length > 1500) ||
    (catGabunganAgamaBudi > 1500 &&
      catGabunganLiterasiSains <= 2000 &&
      rapor.catatanPancasila.length <= 2000 &&
      rapor.catatanPertumbuhan.length > 2000)
  const note_growth_child = `note_growth_child ${noteGrowthChild ? 'extra-margin' : ''
    }`

  const noteTeacher =
    catGabunganLiterasiSains > 1500 &&
    rapor.catatanPancasila.length > 200 &&
    rapor.catatanPertumbuhan.length > 200
  const note_teacher = `note_teacher ${noteTeacher ? 'extra-margin' : ''}`

  const comment =
    rapor.catatanPancasila.length > 200 &&
    rapor.catatanPertumbuhan.length > 300 &&
    rapor.catatanGuru.length > 200
  const coment = `comment ${comment ? 'extra-margin' : ''}`

  const totalAlpa = parseInt(rapor.totalAlpa)
  const totalIzin = parseInt(rapor.totalIzin)
  const totalSakit = parseInt(rapor.totalSakit)

  const jumlah_kehadiran = totalAlpa + totalIzin + totalSakit
  return (
    <>
      <div style={{ pageBreakBefore: 'always', marginTop: '8%' }}>
        <h3 style={{ textAlign: 'center' }}>LAPORAN PERKEMBANGAN ANAK DIDIK</h3>
        <table style={{ width: '100%' }}>
          <tr>
            <td width="15%">Nama Peserta Didik</td>
            <td width="1%">:</td>
            <td width="50%" className="tbl">
              {murid.nama.toUpperCase()}
            </td>
          </tr>

          <tr>
            <td>NIS / NISN</td>
            <td>:</td>
            <td className="tbl">{murid.nis}</td>
          </tr>

          <tr>
            <td>Nama Sekolah</td>
            <td>:</td>
            <td className="tbl">{sekolah?.nama.toUpperCase()}</td>
          </tr>

          <tr>
            <td>Kelompok</td>
            <td>:</td>
            <td className="tbl">{`Kelompok Usia ${rombel.kelompokUsia}`}</td>
          </tr>

          <tr>
            <td>Semester</td>
            <td>:</td>
            <td className="tbl">{semester}</td>
          </tr>
        </table>

        <hr style={{ borderTop: '5px solid black', margin: '20px 0' }} />

        <div className="point">
          <div className="pendahuluan">
            <p style={{ fontSize: '20px' }}>
              <b>PENDAHULUAN</b>
            </p>
            <div
              style={{
                padding: '5px',
                border: '2px solid black',
                marginBottom: '10px',
                textAlign: 'justify',
                textIndent: '2em',
              }}
            >
              Perkembangan Ananda {murid.nama.toUpperCase()} pada {semester}{' '}
              ini, sungguh merupakan pengalaman yang menyenangkan. Ananda telah
              terbiasa dengan segala rutinitas yang ada di sekolah, bahkan telah
              tampak kemandirian dalam mengerjakan dan menyelesaikan tugas yang
              diberikan. Tingkat kehadiran ke sekolah cukup, {jumlah_kehadiran}{' '}
              hari pada {semester} ini Ananda tidak masuk sekolah.{' '}
              {rapor.totalSakit} hari sakit, {rapor.totalIzin} hari izin, dan{' '}
              {rapor.totalAlpa} hari tanpa keterangan
            </div>
          </div>

          <div className="point_a">
            <p style={{ fontSize: '20px' }}>
              <b>A. NILAI AGAMA DAN BUDI PEKERTI</b>
            </p>
            <div
              style={{
                padding: '5px',
                border: '2px solid black',
                marginBottom: '10px',
                textAlign: 'justify',
                textIndent: '2em',
              }}
            >
              {rapor.catatanAgamaBudipekerti.map((item, index) => (
                <p key={index}>{item}</p>
              ))}
            </div>
          </div>

          <div
            className={point_b_logic}
            style={{
              pageBreakBefore:
                catGabunganAgamaBudi > 1500 &&
                  catGabunganJatiDiri > 1500
                  ? 'always'
                  : catGabunganAgamaBudi <= 1000 &&
                    catGabunganJatiDiri > 2000
                    ? 'always'
                    : 'auto',
            }}
          >
            <p style={{ fontSize: '20px' }}>
              <b>B. JATI DIRI</b>
            </p>
            <div
              style={{
                padding: '5px',
                border: '2px solid black',
                marginBottom: '10px',
                textAlign: 'justify',
                textIndent: '2em',
              }}
            >
              {rapor.catatanJatiDiri.map((item, index) => (
                <p key={index}>{item}</p>
              ))}
            </div>
          </div>

          <div
            className={point_c_logic}
            style={{
              pageBreakBefore:
                catGabunganAgamaBudi > 1500 &&
                  catGabunganLiterasiSains > 1500 &&
                  catGabunganJatiDiri > 1500
                  ? 'always'
                  : (catGabunganAgamaBudi > 1500 &&
                    catGabunganLiterasiSains > 1500) ||
                    catGabunganLiterasiSains <= 1500
                    ? 'always'
                    : catGabunganAgamaBudi <= 1500 &&
                      catGabunganLiterasiSains > 1700 &&
                      catGabunganJatiDiri <= 1500
                      ? 'always'
                      : catGabunganAgamaBudi <= 1500 &&
                        catGabunganLiterasiSains > 1700 &&
                        catGabunganJatiDiri > 1500
                        ? 'always'
                        : 'auto',
            }}
          >
            <p style={{ fontSize: '20px' }}>
              <b>
                C. DASAR LITERASI, MATEMATIKA, SAINS, TEKNOLOGI, REKAYASA DAN
                SENI
              </b>
            </p>
            <div
              style={{
                padding: '5px',
                border: '2px solid black',
                marginBottom: '10px',
                textAlign: 'justify',
                textIndent: '2em',
              }}
            >
              {rapor.catatanLiterasiSains.map((item, index) => (
                <p key={index}>{item}</p>
              ))}
            </div>
          </div>

          <div
            className={point_d_logic}
            style={{
              pageBreakBefore:
                catGabunganAgamaBudi <= 1500 &&
                  catGabunganLiterasiSains <= 1500 &&
                  rapor.catatanJatiDiri.length > 1000
                  ? 'always'
                  : catGabunganAgamaBudi <= 3400 &&
                    catGabunganLiterasiSains <= 2000 &&
                    rapor.catatanJatiDiri.length <= 2900 &&
                    rapor.catatanPancasila.length > 2000
                    ? 'always'
                    : 'auto',
            }}
          >
            <p style={{ fontSize: '20px' }}>
              <b>D. PROJEK PENGUATAN PROFIL PELAJAR PANCASILA</b>
            </p>
            <div
              style={{
                padding: '5px',
                border: '2px solid black',
                textAlign: 'justify',
                marginBottom: '10px',
                textIndent: '2em',
              }}
              dangerouslySetInnerHTML={{ __html: rapor.catatanPancasila }}
            />
          </div>
        </div>

        <div
          className={note_growth_child}
          style={{
            pageBreakBefore:
              catGabunganAgamaBudi > 1500 &&
                catGabunganLiterasiSains > 1500 &&
                rapor.catatanPancasila.length > 1500 &&
                rapor.catatanPertumbuhan.length > 1500
                ? 'always'
                : catGabunganAgamaBudi > 1500 &&
                  catGabunganLiterasiSains <= 2000 &&
                  rapor.catatanPancasila.length <= 2000 &&
                  rapor.catatanPertumbuhan.length > 2000
                  ? 'always'
                  : 'auto',
          }}
        >
          <p style={{ fontSize: '20px' }}>
            <b>CATATAN PERTUMBUHAN ANAK</b>
          </p>
          <div
            style={{
              padding: '5px',
              border: '2px solid black',
              marginBottom: '10px',
              marginTop: '-10px',
            }}
          >
            <p
              style={{
                textIndent: '2em',
                textAlign: 'justify',
              }}
            >
              <div
                dangerouslySetInnerHTML={{
                  __html: rapor.catatanPertumbuhan,
                }}
              />
            </p>
          </div>
        </div>

        <div
          className={note_teacher}
          style={{
            pageBreakBefore:
              catGabunganLiterasiSains > 1500 &&
                rapor.catatanPancasila.length > 200 &&
                rapor.catatanPertumbuhan.length > 300
                ? 'always'
                : 'auto',
          }}
        >
          <table
            width="100%"
            border={4}
            style={{ borderCollapse: 'collapse', border: '2px solid black' }}
          >
            <tbody>
              <tr style={{ textAlign: 'left' }}>
                <td style={{ padding: '10px', fontSize: '20px' }}>
                  <b>CATATAN TAMBAHAN GURU :</b>
                </td>
              </tr>
              <tr>
                <td style={{ padding: '5px' }}>
                  <p style={{ textIndent: '2em', textAlign: 'justify' }}>
                    <div
                      dangerouslySetInnerHTML={{
                        __html: rapor.catatanGuru,
                      }}
                    />
                  </p>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div
          className={coment}
          style={{
            pageBreakBefore:
              catGabunganLiterasiSains > 1500 &&
                rapor.catatanPancasila.length > 200 &&
                rapor.catatanPertumbuhan.length > 300 &&
                rapor.catatanGuru.length > 2000
                ? 'always'
                : catGabunganLiterasiSains > 1500 &&
                  rapor.catatanPertumbuhan.length > 300 &&
                  rapor.catatanGuru.length <= 200 ? 'always' :
                  'auto',
            marginTop: '5%',
          }}
        >
          <table
            width="100%"
            style={{ borderCollapse: 'collapse', border: '2px solid black' }}
          >
            <tbody>
              <tr style={{ textAlign: 'left' }}>
                <td style={{ padding: '10px', fontSize: '20px' }}>
                  <b>KOMENTAR ORANG TUA:</b>
                </td>
              </tr>
              <tr>
                <td style={{ padding: '5px' }}>
                  <p
                    style={{
                      textIndent: '2em',
                      textAlign: 'justify',
                      color: 'white',
                      marginTop: '20%',
                    }}
                  >
                    {/* Konten dalam paragraf */}
                  </p>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <table className="table_absence">
          <tbody>
            <tr style={{ textAlign: 'center' }}>
              <td style={{ padding: '10px', fontSize: '16px' }} colSpan={2}>
                <b>KETIDAKHADIRAN</b>
              </td>
            </tr>
            <tr>
              <td width="60%">Sakit</td>
              <td width="40%" className="ctr">
                {rapor.totalSakit}
              </td>
            </tr>
            <tr>
              <td>Izin</td>
              <td className="ctr">{rapor.totalIzin}</td>
            </tr>
            <tr>
              <td>Tanpa Keterangan</td>
              <td className="ctr">{rapor.totalAlpa}</td>
            </tr>
          </tbody>
        </table>

        <div>
          <p style={{ textAlign: 'right', fontSize: '16px' }}>
            {`${sekolah.kota.toCapitalEachWord()}, ${formatDateWithIndonesianMonth(
              new Date(rapor.tanggalBagiRapor)
            )}`}
          </p>
        </div>

        <table width="100%" style={{ marginTop: '20px', fontSize: '18px' }}>
          <tr>
            <td width="25%" style={{ textAlign: 'center' }}>
              Mengetahui :
              <p style={{ marginTop: '5px' }}>
                {`Kepala ${sekolah.nama.toUpperCase()},`}
              </p>
              <div style={{ marginTop: '40%' }}>
                <p style={{ margin: '-15px' }}>
                  <b>{kapsek.nama.toUpperCase()}</b>
                </p>
                <hr style={{ color: 'black' }} />
                <p style={{ margin: '-15px' }}>
                  <b>{`NIP. ${kapsek.nip}`}</b>
                </p>
              </div>
            </td>

            <td width="8%"></td>

            <td width="25%" style={{ textAlign: 'center' }}>
              <p style={{ marginTop: '5px' }}>Guru Kelompok,</p>
              <div style={{ marginTop: '50%' }}>
                <p style={{ margin: '-15px' }}>
                  <b>{guru.nama.toUpperCase()}</b>
                </p>
                <hr style={{ color: 'black' }} />
                <p style={{ margin: '-15px' }}>
                  <b>{`NIP/NUPTK ${guru.nip}`}</b>
                </p>
              </div>
            </td>
          </tr>

          <tr>
            <td></td>
            <td width="25%" style={{ textAlign: 'center' }}>
              Mengetahui :
              <p style={{ marginTop: '5px' }}>Orang Tua/Wali Murid,</p>
              <div style={{ marginTop: '25%', marginBottom: '10%' }}>
                <p style={{ margin: '0px' }}></p>
                <hr style={{ color: 'black' }} />
              </div>
            </td>
          </tr>
        </table>
      </div>
    </>
  )
}

export default Narrative
