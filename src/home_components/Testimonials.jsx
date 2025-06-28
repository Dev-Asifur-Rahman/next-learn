

const Testimonials = () => {
  const testimonials = [
    {
      name: "Sarah Ahmed",
      role: "Student",
      message:
        "NextLearn helped me prepare for my finals with AI quizzes and personalized study plans. Highly recommended!"
    },
    {
      name: "Tanvir Hasan",
      role: "Instructor",
      message:
        "Creating quizzes with AI and managing students has never been easier. NextLearn is an amazing tool."
    },
    {
      name: "Afia Rahman",
      role: "Admin",
      message:
        "Managing courses and user roles is smooth and intuitive with NextLearn’s dashboard features."
    }
  ];

  return (
    <section className="container mx-auto px-4 py-20">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
        What Our Users Say
      </h2>

      <div className="grid md:grid-cols-3 gap-8">
        {testimonials.map((testimonial, index) => (
          <div
            key={index}
            className="border border-current rounded-lg p-6 flex flex-col items-center text-center space-y-4"
          >
            <p className="text-base italic line-clamp-3">“{testimonial.message}”</p>
            <div>
              <h3 className="text-lg font-semibold">{testimonial.name}</h3>
              <span className="text-sm opacity-70">{testimonial.role}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Testimonials;
