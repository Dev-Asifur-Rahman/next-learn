"use client";
import {
  Document,
  Page,
  PDFViewer,
  StyleSheet,
  Text,
  View,
} from "@react-pdf/renderer";

const page = () => {
  const styles = StyleSheet.create({
    page: {
      backgroundColor: "#E4E4E4",
    },
    section: {
      margin: 10,
      padding: 10,
      border: "2px solid black",
    },
  });
  return (
    <section className="w-full flex items-center justify-center overflow-y-scroll">
      <PDFViewer className=" h-[1600px] w-[600px]">
        <Document>
          <Page size="A4" style={styles.page}>
            <View style={styles.section}>
              <Text>Section #1</Text>
            </View>
            <View>
              <Text>Api Key : bb_pr_23672446f91ddbd3de3ec740d4c531</Text>
              <Text>Project Web Hook Key : bb_wh_4881a11acc84e6e380aff89ec0e0fd </Text>
            </View>
          </Page>
        </Document>
      </PDFViewer>
    </section>
  );
};

export default page;
