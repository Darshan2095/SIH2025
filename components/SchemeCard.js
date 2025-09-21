// components/SchemeCard.js
export default function SchemeCard({ scheme }) {
  return (
    <div className="rounded-lg p-4 shadow-md mb-1">
      <h2 className="text-lg font-semibold">{scheme.title}</h2>
      <p className="text-sm text-gray-600">{scheme.description}</p>
      <p className="text-sm mt-2 font-medium">Eligibility: {scheme.eligibility}</p>
    </div>
  );
}
