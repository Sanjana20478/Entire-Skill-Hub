const toneClasses = {
  leaf: "bg-leaf/10 text-leaf",
  coral: "bg-coral/10 text-coral",
  amber: "bg-amber/20 text-amber"
};

const StatCard = ({ icon: Icon, label, value, tone = "leaf" }) => (
  <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
    <div className="flex items-center justify-between gap-3">
      <div>
        <p className="text-sm text-slate-500">{label}</p>
        <p className="mt-2 text-2xl font-bold text-ink">{value}</p>
      </div>
      {Icon && (
        <div className={`rounded-lg p-3 ${toneClasses[tone] || toneClasses.leaf}`}>
          <Icon className="h-6 w-6" />
        </div>
      )}
    </div>
  </div>
);

export default StatCard;
