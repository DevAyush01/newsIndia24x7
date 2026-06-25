'use client';

const stateMapImages = {
  'uttar-pradesh': '/state-maps/uttar-pradesh.png',
  'bihar': '/state-maps/bihar.png',
  'delhi': '/state-maps/delhi.png',
  'uttarakhand': '/state-maps/uttarakhand.png',
  'madhya-pradesh': '/state-maps/madhya-pradesh.png',
  'rajasthan': '/state-maps/rajasthan.png',
  'jharkhand': '/state-maps/jharkhand.png',
  'maharashtra': '/state-maps/maharashtra.png',
  'gujarat': '/state-maps/gujarat.png',
  'punjab': '/state-maps/punjab.png',
  'haryana': '/state-maps/haryana.png',
};

export default function IndiaStateMap({ selectedState }) {
  const image =
    stateMapImages[selectedState] || '/state-maps/default.png';

  return (
    <img
      src={image}
      alt={selectedState}
      className="w-full h-full object-contain"
    />
  );
}