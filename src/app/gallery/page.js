export default function GalleryPage() {
  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold mb-6 text-center">Gallery</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {["hero1.jpg", "hero2.jpg", "hero3.jpg", "dish1.jpg", "dish2.jpg"].map((img, i) => (
          <img
            key={i}
             src={`/images/${img}`}
            alt={`Gallery ${i}`}
            className="w-full h-56 object-cover rounded-lg shadow hover:scale-105 transition-transform"
          />
        ))}
      </div>
    </div>
  );
}
