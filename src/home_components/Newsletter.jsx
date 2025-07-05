

export default function Newsletter() {
  return (
    <div
      className="hero min-h-screen"
      style={{
        backgroundImage:
          "url(/images/newsletter.png)",
      }}
    >
      <div className="hero-overlay"></div>
      <div className="hero-content text-neutral-content text-center w-full px-4">
        <div className="max-w-xl w-full">
          <h2 className="mb-5 text-4xl md:text-5xl font-bold">Subscribe to our Newsletter</h2>
          <p className="mb-5">
            Get the latest updates, articles, and resources delivered to your inbox weekly.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 w-full justify-center">
            <input
              type="email"
              placeholder="Enter your email"
              className="input bg-transparent input-bordered w-full sm:w-2/3 "
            />
            <button className="btn btn-dash w-full sm:w-auto">Subscribe</button>
          </div>
        </div>
      </div>
    </div>
  );
}
