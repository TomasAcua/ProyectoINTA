import { Page, Text, View, Document, StyleSheet, Image } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: {
    padding: 40,
    backgroundColor: '#ffffff',
    fontSize: 12,
    fontFamily: 'Helvetica',
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
    paddingBottom: 12,
    borderBottomWidth: 3,
    borderBottomColor: '#007a33',
  },
  logo: {
    width: 60,
    height: 60,
    marginRight: 15,
  },
  headerTextContainer: {
    flexDirection: 'column',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#007a33',
  },
  headerSubtitle: {
    fontSize: 12,
    color: '#f26a22',
  },
  sectionTitle: {
    fontSize: 14,
    marginBottom: 12,
    marginTop: 25,
    color: '#f26a22',
    borderBottomWidth: 1,
    borderBottomColor: '#007a33',
    paddingBottom: 4,
    textTransform: 'uppercase',
    fontWeight: 'bold',
  },
  planTitle: {
    fontSize: 13,
    fontWeight: 'bold',
    marginTop: 12,
    marginBottom: 8,
    color: '#212529',
  },
  planContainer: {
    backgroundColor: '#f8f9fa',
    padding: 10,
    borderRadius: 6,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#ced4da',
  },

  treatmentContainer: {
    backgroundColor: '#ffffff',
    padding: 8,
    marginTop: 10,
    marginBottom: 12,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#dee2e6',
  },

  treatmentTitle: {
    fontWeight: 'bold',
    marginBottom: 6,
    color: '#007a33',
    fontSize: 12,
  },

  imageContainer: {
    alignItems: 'center',
    marginBottom: 25,
  },
  image: {
    width: '100%',
    height: 250,
    objectFit: 'contain',
    borderWidth: 1,
    borderColor: '#dee2e6',
    borderRadius: 6,
  },
  table: {
    display: 'table',
    width: 'auto',
    marginTop: 6,
    borderWidth: 1,
    borderColor: '#ced4da',
    borderStyle: 'solid',
    borderRadius: 4,
    overflow: 'hidden',
  },
  tableRow: {
    flexDirection: 'row',
  },
  tableHeader: {
    backgroundColor: '#007a33',
    fontWeight: 'bold',
    color: '#ffffff',
  },
  tableCell: {
    paddingVertical: 6,
    paddingHorizontal: 4,
    borderRightWidth: 1,
    borderRightColor: '#dee2e6',
    borderBottomWidth: 1,
    borderBottomColor: '#dee2e6',
    textAlign: 'center',
    width: '20%',
    color: '#343a40',
  },
  italicText: {
    fontStyle: 'italic',
    color: '#6c757d',
    marginVertical: 4,
  },
})

const PDFDocument = ({ chartImage, plansToRender, columnasPDF }) => {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.headerContainer}>
          <Image
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/81/Logo_INTA.svg/2048px-Logo_INTA.svg.png"
            style={styles.logo}
          />
          <View style={styles.headerTextContainer}>
            <Text style={styles.headerTitle}>SIPAN</Text>
            <Text style={styles.headerSubtitle}>Reporte de planes y productos</Text>
          </View>
        </View>
        {chartImage && (
          <>
            <Text style={styles.sectionTitle}>Gráfico de Costos</Text>
            <View style={styles.imageContainer}>
              <Image src={chartImage} style={styles.image} />
            </View>
          </>
        )}
        <Text style={styles.sectionTitle}>Planes y Productos</Text>

        {plansToRender.map((plan, idx) => (
          <View key={idx} wrap={false} style={styles.planContainer}>
            <Text style={styles.planTitle}>
              {plan.name} — Total: ${plan.costoTotal?.toLocaleString()}
            </Text>
            {Array.isArray(plan.tratamientos) ? (
              plan.tratamientos.length > 0 ? (
                plan.tratamientos.map((tratamiento, i) => (
                  <View key={i} wrap={false} style={styles.treatmentContainer}>
                    <Text style={styles.treatmentTitle}>
                      {tratamiento.name} — Total: ${tratamiento.costoTotal?.toLocaleString()}
                    </Text>

                    {tratamiento.productos?.length > 0 ? (
                      <View style={styles.table}>
                        <View style={[styles.tableRow, styles.tableHeader]}>
                          {columnasPDF.map(col => (
                            <Text style={styles.tableCell} key={col.key}>{col.label}</Text>
                          ))}
                        </View>
                        {tratamiento.productos.map((prod, j) => (
                          <View style={styles.tableRow} key={j}>
                            {columnasPDF.map(col => (
                              <Text style={styles.tableCell} key={col.key}>
                                {prod[col.key] !== undefined ? prod[col.key] : ""}
                              </Text>
                            ))}
                          </View>
                        ))}
                      </View>
                    ) : (
                      <Text style={styles.italicText}>No hay productos en este tratamiento.</Text>
                    )}
                  </View>
                ))
              ) : (
                <Text style={styles.italicText}>No hay tratamientos en este plan.</Text>
              )
            ) : Array.isArray(plan.maquinarias) ? (
              <View style={styles.treatmentContainer}>
                <Text style={styles.treatmentTitle}>Maquinaria</Text>
                <View style={styles.table}>
                  <View style={[styles.tableRow, styles.tableHeader]}>
                    {columnasPDF.map((col) => (
                      <Text key={col.key} style={styles.tableCell}>{col.label}</Text>
                    ))}
                  </View>
                  {plan.maquinarias.map((fila, filaIdx) => (
                    <View style={styles.tableRow} key={filaIdx}>
                      {columnasPDF.map((col) => {
                        let value = "";
                        switch (col.key) {
                          case "tractor":
                            value = `${fila.tractor} - $${Number(fila.tractorPrecio).toLocaleString()}`;
                            break;
                          case "implemento":
                            value = `${fila.implemento} - $${Number(fila.implementoPrecio).toLocaleString()}`;
                            break;
                          case "costo":
                            value = `$${Number(fila.costo).toLocaleString()}`;
                            break;
                          default:
                            value = fila[col.key] || "—";
                        }
                        return (
                          <Text key={col.key} style={styles.tableCell}>
                            {value}
                          </Text>
                        );
                      })}
                    </View>
                  ))}
                </View>
              </View>
            ) : (
              <Text style={styles.italicText}>Formato de plan no reconocido.</Text>
            )}
          </View>
        ))}
      </Page>
    </Document>
  )
}

export default PDFDocument
