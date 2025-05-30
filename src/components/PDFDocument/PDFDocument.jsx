import { Page, Text, View, Document, StyleSheet, Image } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: {
    padding: 40,
    backgroundColor: '#f8f9fa',
    fontSize: 12,
    fontFamily: 'Helvetica',
  },
  header: {
    fontSize: 24,
    backgroundColor: '#343a40',
    color: '#ffffff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    textAlign: 'center',
    borderRadius: 6,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    marginBottom: 10,
    marginTop: 20,
    color: '#333',
    borderBottom: '1 solid #dee2e6',
    paddingBottom: 5,
  },
  planTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 5,
    color: '#212529',
  },
  imageContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  image: {
    width: '100%',
    height: 250,
    objectFit: 'contain',
    border: '1 solid #ccc',
    borderRadius: 4,
  },
  table: {
    display: 'table',
    width: 'auto',
    marginTop: 5,
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#ced4da',
  },
  tableRow: {
    flexDirection: 'row',
  },
  tableHeader: {
    backgroundColor: '#e9ecef',
    fontWeight: 'bold',
  },
  tableCell: {
    padding: 6,
    borderRight: '1 solid #ced4da',
    borderBottom: '1 solid #ced4da',
    textAlign: 'center',
    width: '20%'
  },
});

const PDFDocument = ({ chartImage, plansToRender, columnasPDF }) => {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <Text style={styles.header}>Reporte de Productos</Text>

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
