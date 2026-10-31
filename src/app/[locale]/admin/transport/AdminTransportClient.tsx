'use client';

import React, { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import {
  Bus,
  MapPin,
  Phone,
  Users,
  ShieldCheck,
  Clock,
  Navigation,
  Compass,
  AlertCircle,
  CheckCircle2,
  Printer,
} from 'lucide-react';

interface StopItem {
  id: string;
  stopName: string;
  pickupTime: string;
  dropTime: string;
  order: number;
}

interface VehicleItem {
  id: string;
  vehicleNo: string;
  driverName?: string | null;
  driverPhone?: string | null;
  helperName?: string | null;
  capacity: number;
  status: string;
  route?: {
    id: string;
    routeName: string;
    routeCode: string;
    startPoint: string;
    endPoint: string;
    monthlyFare: number;
  } | null;
}

interface RouteItem {
  id: string;
  routeName: string;
  routeCode: string;
  startPoint: string;
  endPoint: string;
  monthlyFare: number;
  isActive: boolean;
  stops: StopItem[];
  vehicles: VehicleItem[];
}

export default function AdminTransportClient({
  routes,
  vehicles,
}: {
  routes: RouteItem[];
  vehicles: VehicleItem[];
}) {
  const { locale, t } = useLanguage();
  const [selectedRouteId, setSelectedRouteId] = useState<string>('ALL');

  const totalVehicles = vehicles.length;
  const totalCapacity = vehicles.reduce((sum, v) => sum + v.capacity, 0);
  const totalStops = routes.reduce((sum, r) => sum + r.stops.length, 0);

  const filteredVehicles = vehicles.filter((v) => {
    if (selectedRouteId === 'ALL') return true;
    return v.route?.id === selectedRouteId;
  });

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
              {locale === 'bn' ? 'স্কুল ও কলেজ পরিবহন ও বাস সার্ভিস' : 'Campus Fleet & Transport Services'}
            </h1>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-rose-100 text-rose-800">
              {totalVehicles} {locale === 'bn' ? 'টি যানবাহন' : 'Vehicles'}
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            {locale === 'bn'
              ? 'শিক্ষার্থীদের জন্য নিরাপদ বাস রুট, যানবহন বহর, চালকদের তথ্যাদি ও সময়সূচি'
              : 'Institutional transit fleet, student commuter bus routes, vehicle GPS schedules, and driver records'}
          </p>
        </div>

        <button
          type="button"
          onClick={() => window.print()}
          className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-bold transition-all shadow-xs self-start sm:self-auto"
        >
          <Printer className="w-3.5 h-3.5" />
          <span>{locale === 'bn' ? 'রুট শিডিউল প্রিন্ট' : 'Print Schedule'}</span>
        </button>
      </div>

      {/* 4 Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center flex-shrink-0">
            <Bus className="w-6 h-6" />
          </div>
          <div>
            <p className="text-[11px] font-semibold text-slate-500 uppercase">
              {locale === 'bn' ? 'মোট যানবাহন বহর' : 'Total Fleet Buses'}
            </p>
            <h3 className="text-xl font-black text-slate-900 mt-0.5">
              {totalVehicles}
            </h3>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center flex-shrink-0">
            <Navigation className="w-6 h-6" />
          </div>
          <div>
            <p className="text-[11px] font-semibold text-slate-500 uppercase">
              {locale === 'bn' ? 'সক্রিয় যাতায়াত রুট' : 'Active Bus Routes'}
            </p>
            <h3 className="text-xl font-black text-blue-700 mt-0.5">
              {routes.length}
            </h3>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center flex-shrink-0">
            <MapPin className="w-6 h-6" />
          </div>
          <div>
            <p className="text-[11px] font-semibold text-slate-500 uppercase">
              {locale === 'bn' ? 'যাত্রী ওঠানামার স্টপ' : 'Designated Bus Stops'}
            </p>
            <h3 className="text-xl font-black text-amber-600 mt-0.5">
              {totalStops}
            </h3>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center flex-shrink-0">
            <Users className="w-6 h-6" />
          </div>
          <div>
            <p className="text-[11px] font-semibold text-slate-500 uppercase">
              {locale === 'bn' ? 'মোট আসন সংখ্যা' : 'Seating Capacity'}
            </p>
            <h3 className="text-xl font-black text-emerald-600 mt-0.5">
              {totalCapacity} Seats
            </h3>
          </div>
        </div>
      </div>

      {/* Route Filter Tabs */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs space-y-2">
        <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
          {locale === 'bn' ? 'রুট অনুযায়ী ফিল্টার করুন' : 'Filter by Route'}
        </p>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setSelectedRouteId('ALL')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
              selectedRouteId === 'ALL'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            {locale === 'bn' ? 'সকল রুট ও বাস' : 'All Routes & Fleet'}
          </button>
          {routes.map((r) => (
            <button
              key={r.id}
              type="button"
              onClick={() => setSelectedRouteId(r.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                selectedRouteId === r.id
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {r.routeCode}: {r.routeName.split(' - ')[0]}
            </button>
          ))}
        </div>
      </div>

      {/* Fleet Vehicles Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredVehicles.map((vh) => (
          <div
            key={vh.id}
            className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between space-y-4"
          >
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <span className="font-mono text-xs font-bold text-blue-700 bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
                  {vh.vehicleNo}
                </span>
                <span className="text-xs font-extrabold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                  {vh.capacity} Seats
                </span>
              </div>

              <div className="mt-4 space-y-1.5">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  {vh.route?.routeCode || 'CAMPUS SHUTTLE'}
                </span>
                <h3 className="font-extrabold text-navy-900 text-sm">
                  {vh.route ? vh.route.routeName : 'Mirsharai Central Route'}
                </h3>
                <p className="text-xs text-slate-500 flex items-center gap-1.5 pt-0.5">
                  <MapPin className="w-3.5 h-3.5 text-rose-500 flex-shrink-0" />
                  <span className="truncate">{vh.route?.startPoint} → {vh.route?.endPoint}</span>
                </p>
              </div>
            </div>

            <div className="border-t border-slate-100 pt-3 text-xs space-y-2 bg-slate-50/60 p-3 rounded-2xl">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[10px] font-semibold text-slate-400 uppercase">
                    {locale === 'bn' ? 'দায়িত্বপ্রাপ্ত চালক' : 'Designated Driver'}
                  </p>
                  <p className="text-slate-800 font-bold">{vh.driverName || 'Md. Driver'}</p>
                </div>
                {vh.helperName && (
                  <div className="text-right">
                    <p className="text-[10px] font-semibold text-slate-400 uppercase">
                      {locale === 'bn' ? 'সহকারী' : 'Helper'}
                    </p>
                    <p className="text-slate-700 font-medium">{vh.helperName}</p>
                  </div>
                )}
              </div>

              <div className="pt-1.5 border-t border-slate-200/60 flex items-center justify-between">
                <a
                  href={`tel:${vh.driverPhone}`}
                  className="font-mono text-blue-600 font-bold flex items-center gap-1.5 hover:underline"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>{vh.driverPhone || '01812-000000'}</span>
                </a>
                <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                  ACTIVE GPS
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Detailed Routes & Bus Stops Waypoint Overview */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-sm space-y-6">
        <div className="pb-3 border-b border-slate-100">
          <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <Compass className="w-4 h-4 text-blue-600" />
            <span>{locale === 'bn' ? 'রুটভিত্তিক স্টপেজ ও শিক্ষার্থী সময়সূচি' : 'Route Stoppages & Departure Timings'}</span>
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            {locale === 'bn'
              ? 'নির্ধারিত সময়ের ৫ মিনিট পূর্বে শিক্ষার্থীদের স্টপেজে উপস্থিত থাকার অনুরোধ করা হলো'
              : 'Students are advised to arrive at their designated stop 5 minutes prior to scheduled pickup'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {routes.map((r) => (
            <div
              key={r.id}
              className="p-5 rounded-2xl bg-slate-50/70 border border-slate-200/80 space-y-4"
            >
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-bold text-blue-700 bg-blue-100 px-2 py-0.5 rounded-full">
                    {r.routeCode}
                  </span>
                  <h3 className="font-bold text-navy-950 text-sm mt-1">{r.routeName}</h3>
                </div>
                <div className="text-right">
                  <p className="text-[10px] text-slate-400 font-semibold uppercase">Monthly Fare</p>
                  <p className="font-mono font-bold text-blue-700 text-xs">BDT {r.monthlyFare}/-</p>
                </div>
              </div>

              {/* Stoppage Timeline */}
              <div className="space-y-2 border-l-2 border-blue-400/60 pl-3 ml-1.5 text-xs">
                {r.stops.map((stop, sIdx) => (
                  <div key={stop.id} className="relative group">
                    <span className="w-2.5 h-2.5 rounded-full bg-blue-600 absolute -left-[18px] top-1.5 ring-4 ring-white"></span>
                    <div className="bg-white p-2.5 rounded-xl border border-slate-200/70 flex items-center justify-between shadow-2xs">
                      <div>
                        <span className="text-[10px] text-slate-400 font-mono font-bold mr-1">
                          #{sIdx + 1}
                        </span>
                        <span className="font-bold text-slate-800">{stop.stopName}</span>
                      </div>
                      <div className="flex items-center gap-2 text-[11px] font-mono font-semibold text-slate-500">
                        <span className="text-emerald-700">▲ {stop.pickupTime}</span>
                        <span className="text-slate-300">|</span>
                        <span className="text-rose-700">▼ {stop.dropTime}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
