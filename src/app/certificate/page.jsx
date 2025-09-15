"use client";
import {
  Document,
  Page,
  PDFViewer,
  StyleSheet,
  Text,
  View,
} from "@react-pdf/renderer";
import axios from "axios";

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
  const getCertificate = async () => {
    const response = await axios.post("/api/student/certificates");
    const json = response.data;
    console.log(json);
  };

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
              <Text>
                Project Web Hook Key : bb_wh_4881a11acc84e6e380aff89ec0e0fd{" "}
              </Text>
            </View>
            <View>
              <Text>
                {JSON.stringify({
                  template: "BAQGWyDLvaNMZgmENL",
                  modifications: [
                    {
                      name: "signature",
                      text: "Asifur Rahman",
                      color: null,
                      background: null,
                    },
                    {
                      name: "date",
                      text: "30/8/2025",
                      color: null,
                      background: null,
                    },
                    {
                      name: "subtitle",
                      text: "Hello its completing the course x",
                      color: null,
                      background: null,
                    },
                    {
                      name: "name",
                      text: "KARIM",
                      color: null,
                      background: null,
                    },
                  ],
                  webhook_url: null,
                  transparent: false,
                  metadata: null,
                })}
              </Text>
            </View>
          </Page>
        </Document>
      </PDFViewer>
      <button onClick={getCertificate}>Get Api Response</button>
    </section>
  );
};

export default page;
