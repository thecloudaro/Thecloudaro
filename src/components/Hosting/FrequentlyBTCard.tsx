"use client";

import { ChevronDown, type LucideIcon } from "lucide-react";

type FrequentlyBTCardProps = {
  title: string;
  plan: string;
  bulletOne: string;
  bulletTwo: string;
  price: string;
  oldPrice?: string;
  icon?: LucideIcon;
  gradient: string;
  className?: string;
};

const FrequentlyBTCard = ({
  title,
  plan,
  bulletOne,
  bulletTwo,
  price,
  oldPrice,
  icon: Icon,
  gradient,
  className = ""
}: FrequentlyBTCardProps) => {
  return (
    <div
      data-card
      className={`relative flex h-[340px] w-full max-w-[352px] sm:max-w-[368px] flex-col justify-between overflow-hidden rounded-md px-9 pb-9 pt-9 text-[rgb(var(--hosting-text-white))] transition-transform duration-300 hover:-translate-y-1 ${gradient} ${className}`}
      style={{ 
        scrollSnapAlign: "start",
        boxShadow: '0 18px 40px rgba(var(--hosting-frequently-card-shadow))'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = '0 24px 54px rgba(var(--hosting-frequently-card-shadow-hover))';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = '0 18px 40px rgba(var(--hosting-frequently-card-shadow))';
      }}
    >
      <div className="flex flex-col gap-4">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl backdrop-blur-sm" style={{ backgroundColor: 'rgba(var(--hosting-frequently-icon-bg))' }}>
          {Icon ? <Icon className="h-8 w-8 text-[rgb(var(--hosting-text-white))]" strokeWidth={1.8} /> : null}
        </div>

        <div className="space-y-1">
          <h3 className="text-[1.55rem] font-semibold leading-tight">{title}</h3>
          <p className="text-sm font-medium" style={{ color: 'rgba(var(--hosting-frequently-text-white-80))' }}>{plan}</p>
        </div>

        <div className="space-y-1 text-[0.85rem] font-medium" style={{ color: 'rgba(var(--hosting-frequently-text-white-85))' }}>
          <p className="overflow-hidden text-ellipsis whitespace-nowrap">
            {bulletOne}
          </p>
          <p className="overflow-hidden text-ellipsis whitespace-nowrap">
            {bulletTwo}
          </p>
        </div>
      </div>

      <div className="mt-auto flex items-end justify-between pt-6">
        <div className="space-y-0.5">
          {oldPrice && (
            <span className="block text-sm font-semibold line-through" style={{ color: 'rgba(var(--hosting-frequently-text-white-70))' }}>
              {oldPrice}
            </span>
          )}
          <div className="flex items-baseline gap-1">
            <span className="text-2xl font-bold">{price}</span>
            <span className="text-base font-semibold" style={{ color: 'rgba(var(--hosting-frequently-text-white-80))' }}>/mo</span>
          </div>
        </div>

        <button 
          className="inline-flex items-center gap-1 rounded-full px-5 py-2 text-sm font-semibold transition"
          style={{
            backgroundColor: 'rgb(var(--hosting-frequently-button-bg))',
            color: 'rgb(var(--hosting-frequently-button-text))',
            boxShadow: '0 12px 24px rgba(var(--hosting-frequently-button-shadow))'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = 'rgb(var(--hosting-frequently-button-hover))';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'rgb(var(--hosting-frequently-button-bg))';
          }}
        >
          Buy now
          <ChevronDown className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};

export default FrequentlyBTCard;


