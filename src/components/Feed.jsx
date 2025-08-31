export default function Feed() {
    const posts = [
      "https://picsum.photos/300/400",
      "https://picsum.photos/300/350",
      "https://picsum.photos/300/500",
      "https://picsum.photos/300/450",
      "https://picsum.photos/300/300",
      "https://picsum.photos/300/360",
    ];
  
    return (
      <main className="flex-1 p-6 grid grid-cols-3 gap-6 overflow-y-scroll">
        {posts.map((img, idx) => (
          <div
            key={idx}
            className="rounded-2xl overflow-hidden shadow-lg hover:scale-105 transition"
          >
            <img src={img} alt="Post" className="w-full h-auto" />
          </div>
        ))}
      </main>
    );
  }

  