export default function AboutPage() {
  return (
    <div className="p-10 max-w-6xl mx-auto">
      <h1 className="text-4xl font-bold text-center mb-10 text-yellow-600">
        About Hotel Delish
      </h1>

      <div className="grid md:grid-cols-2 gap-10 items-center">
        {/* Image */}
        <img
          src="images/hero2.jpg"
          alt="Hotel Interior"
          className="w-full h-[300px] object-cover rounded-lg shadow-lg hover:scale-105 transition-transform duration-300"
        />

        {/* Text Content */}
        <div>
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">
            Serving Taste Since 1990
          </h2>
          <p className="text-gray-700 leading-relaxed">
            Welcome to Hotel Delish — where every dish tells a story. We have been
            serving authentic, mouth-watering Indian cuisine for over 30 years.
            From traditional recipes to modern twists, our chefs craft each dish
            with passion and the finest ingredients.
          </p>

          <p className="mt-4 text-gray-700 leading-relaxed">
            Whether you’re dining in, ordering lunch, or celebrating with family —
            Hotel Delish is your destination for flavor, comfort, and joy. Join us
            for an unforgettable food journey!
          </p>
        </div>
      </div>
    </div>
  );
}
