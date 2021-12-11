import Image from "next/image";

const randomRange = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const Loading = () => {
  return (
    <Image
      src={`/loading/loading${randomRange(1, 20)}.gif`}
      height={128}
      width={128}
    />
  );
};

export default Loading;
