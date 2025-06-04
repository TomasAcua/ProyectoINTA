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
    paddingBottom: 10,
    borderBottomWidth: 2,
    borderBottomColor: '#ced4da',
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
    color: '#212529',
  },
  headerSubtitle: {
    fontSize: 12,
    color: '#495057',
  },
  sectionTitle: {
    fontSize: 14,
    marginBottom: 12,
    marginTop: 25,
    color: '#495057',
    borderBottomWidth: 1,
    borderBottomColor: '#adb5bd',
    paddingBottom: 4,
    textTransform: 'uppercase',
    fontWeight: 'bold',
  },
  planTitle: {
    fontSize: 13,
    fontWeight: 'bold',
    marginTop: 12,
    marginBottom: 8,
    color: '#343a40',
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
  },
  tableRow: {
    flexDirection: 'row',
  },
  tableHeader: {
    backgroundColor: '#f1f3f5',
    fontWeight: 'bold',
    color: '#212529',
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
    color: '#495057',
  },
});

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
            <Text style={styles.headerTitle}>Instituto Nacional de Tecnología Agropecuaria</Text>
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

        {plansToRender.length > 0 ? (
          plansToRender.map((plan, idx) => (
            <View key={idx} wrap={false}>
              <Text style={styles.planTitle}>
                {plan.name} - Total: ${plan.costoTotal?.toLocaleString()}
              </Text>
              {plan.productos.length > 0 ? (
                <View style={styles.table}>
                  <View style={[styles.tableRow, styles.tableHeader]}>
                    {columnasPDF.map(col => (
                      <Text style={styles.tableCell} key={col.key}>{col.label}</Text>
                    ))}
                  </View>
                  {plan.productos.map((prod, i) => (
                    <View style={styles.tableRow} key={i}>
                      {columnasPDF.map(col => (
                        <Text style={styles.tableCell} key={col.key}>
                          {prod[col.key] !== undefined ? prod[col.key] : ""}
                        </Text>
                      ))}
                    </View>
                  ))}
                </View>
              ) : (
                <Text style={{ fontStyle: 'italic', color: '#6c757d' }}>
                  No hay productos en este plan.
                </Text>
              )}
            </View>
          ))
        ) : (
          <Text>No hay planes para mostrar.</Text>
        )}
      </Page>
    </Document>
  );
};

export default PDFDocument;
