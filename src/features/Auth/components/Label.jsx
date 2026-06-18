export default function Label({ name, htmlFor }) {
  return (
    <label htmlFor={htmlFor} className="block text-sm font-medium text-gray-700">
      {name}
    </label>
  );
}