'use client';

import { useMemo } from 'react';
import { Image } from '@heroui/image';
import SectorCard from './SectorCard';
import { CATEGORY_MAP } from './categoryData';
import type { CategoryProps } from './Category.types';

export default function Category({ categoryVal, className }: CategoryProps) {
  // derive instead of state/effect
  const category = useMemo(() => CATEGORY_MAP[categoryVal], [categoryVal]);

  if (!category) return null;

  return (
    <section
      className={`bg-white mb-6 ${className ?? ''}`}
      aria-labelledby={`cat-${category.key}-title`}
    >
      {/* Top Section */}
      <div className="p-8 bg-white">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {/* Visual */}
          <div>
            <Image
              src={category.image}
              alt={category.title}
              width={735}
              height={450}
              className="w-full rounded-lg object-cover"
            />
          </div>

          {/* Copy */}
          <div>
            <h1
              id={`cat-${category.key}-title`}
              className="text-2xl font-bold text-gray-800 mb-2"
            >
              {category.title}
            </h1>
            <p className="border-t border-blue-500 pt-2">
              {category.description}
            </p>
          </div>
        </div>
      </div>

      {/* Middle Section */}
      {category.descriptionDiv && (
        <div>{category.descriptionDiv}</div>
      )}

      {/* Bottom Section */}
      <div className="bg-blue-50 p-8">
        <h2 className="text-xl text-gray-800 mb-4 text-center">
          {category.jobSectorsTitle}
        </h2>
        <h3 className="text-2xl font-bold text-gray-800 mb-8 text-center">
          {category.jobSectorsSubtitle}
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {category.jobSectorsOptions.map((sector, idx) => (
            <SectorCard
              key={`${category.key}-${idx}-${sector.title}`}
              sector={sector}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
