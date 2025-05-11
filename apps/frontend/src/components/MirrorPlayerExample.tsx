import MirrorPlayer from './MirrorPlayer';

const MirrorPlayerExample = () => {
  const mirrors = [
    {
      name: "Mirror 1 (Zoro)",
      src: "https://example.com/video1.mp4"
    },
    {
      name: "Mirror 2 (Gogoanime)",
      src: "https://example.com/video2.mp4"
    },
    {
      name: "Mirror 3 (Enime)",
      src: "https://example.com/video3.mp4"
    }
  ];

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold text-[#EDEDED] mb-4">AniVerse Video Player</h1>
      <MirrorPlayer mirrors={mirrors} />
    </div>
  );
};

export default MirrorPlayerExample; 