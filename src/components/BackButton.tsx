'use client';

import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function BackButton() {
  return (
    <Link
      href="/"
      className="sticky-back bg-white rounded-full p-3 shadow-lg hover:shadow-xl transition-all duration-300 fixed top-5 left-5 z-50"
    >
      <div className="w-6 h-6 flex items-center justify-center">
        <ArrowLeft className="text-gray-700" />
      </div>
    </Link>
  );
}