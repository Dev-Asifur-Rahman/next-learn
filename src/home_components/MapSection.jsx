export default function MapSection() {
  return (
    <section className="w-full flex justify-center flex-col my-10 px-4 lg:px-10 md:px-8">
      <h2 className="text-3xl font-bold mb-6 text-center">
        Our Location
      </h2>

      <div className="w-full h-96 flex justify-center items-center">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3651.05682606354!2d90.42340271094828!3d23.780990690969197!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755c796c76c1a8b%3A0x7ff1d179fba4c47c!2sPRAN%20CENTER!5e0!3m2!1sen!2sbd!4v1751641740730!5m2!1sen!2sbd"
          className="w-full h-full rounded-xl shadow-lg border-0"
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
    </section>
  );
}
