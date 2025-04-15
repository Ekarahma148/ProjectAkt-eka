export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-gray-600 via-gray-300 to-gray-200 text-center py-9 text-sm text-gray-700 shadow-inner">
      © {new Date().getFullYear()} <span className="font-semibold text-blue-600">AkuntansiApp</span> — All rights reserved.
    </footer>
  );
}
