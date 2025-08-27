"use client";
import {
  Document,
  Page,
  PDFViewer,
  StyleSheet,
  Text,
  View,
} from "@react-pdf/renderer";
import React from "react";

const Certificate = () => {
  const styles = StyleSheet.create({
    page: {
      backgroundColor: "#E4E4E4",
      width: '500px'
    },
    section: {
      margin: 10,
      padding: 10,
      border: '2px solid black'
    },
  });
  return (
    <section className="w-full h-screen flex items-center justify-center overflow-y-scroll">
      <PDFViewer className=" h-[600px] w-[600px]">
        <Document>
          <Page size="A4" style={styles.page} >
            <View style={styles.section}>
              <Text>Section #1</Text>
            </View>
          </Page>
        </Document>
      </PDFViewer>
    </section>
  );
};

export default Certificate;
