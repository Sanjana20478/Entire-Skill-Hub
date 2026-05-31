import { useEffect, useState } from "react";
import api from "../api/axios";

const Profile = () => {
  const [options, setOptions] = useState({ skills: [], interests: [] });
  const [profile, setProfile] = useState({ name: "", phone: "", location: "", bio: "", skills: [], interests: [] });
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    Promise.all([api.get("/users/profile-options"), api.get("/auth/me")]).then(([optionsRes, meRes]) => {
      setOptions(optionsRes.data);
      setProfile({
        name: meRes.data.name || "",
        phone: meRes.data.phone || "",
        location: meRes.data.location || "",
        bio: meRes.data.bio || "",
        skills: meRes.data.skills?.map((item) => item._id) || [],
        interests: meRes.data.interests?.map((item) => item._id) || []
      });
    });
  }, []);

  const toggle = (field, id) => {
    setProfile((current) => ({
      ...current,
      [field]: current[field].includes(id)
        ? current[field].filter((item) => item !== id)
        : [...current[field], id]
    }));
  };

  const submit = async (event) => {
    event.preventDefault();
    await api.put("/users/profile", profile);
    setSaved(true);
  };

  return (
    <form onSubmit={submit} className="max-w-4xl">
      <h1 className="text-2xl font-bold text-ink">Skill and Interest Profiling</h1>
      {saved && <p className="mt-4 rounded-md bg-green-50 p-3 text-sm text-green-700">Profile saved. Recommendations are ready.</p>}
      <div className="mt-6 grid gap-4 rounded-lg border border-slate-200 bg-white p-5 md:grid-cols-2">
        <Input label="Name" value={profile.name} onChange={(value) => setProfile({ ...profile, name: value })} />
        <Input label="Phone" value={profile.phone} onChange={(value) => setProfile({ ...profile, phone: value })} />
        <Input label="Location" value={profile.location} onChange={(value) => setProfile({ ...profile, location: value })} />
        <Input label="Bio" value={profile.bio} onChange={(value) => setProfile({ ...profile, bio: value })} />
      </div>
      <ChoiceGroup title="Skills" items={options.skills} selected={profile.skills} onToggle={(id) => toggle("skills", id)} />
      <ChoiceGroup title="Interests" items={options.interests} selected={profile.interests} onToggle={(id) => toggle("interests", id)} />
      <button className="focus-ring mt-6 rounded-md bg-leaf px-5 py-3 font-semibold text-white">Save Profile</button>
    </form>
  );
};

const Input = ({ label, value, onChange }) => (
  <label className="block text-sm font-semibold">
    {label}
    <input className="focus-ring mt-2 w-full rounded-md border border-slate-300 px-3 py-2 font-normal" value={value} onChange={(e) => onChange(e.target.value)} />
  </label>
);

const ChoiceGroup = ({ title, items, selected, onToggle }) => (
  <section className="mt-6 rounded-lg border border-slate-200 bg-white p-5">
    <h2 className="font-bold">{title}</h2>
    <div className="mt-4 flex flex-wrap gap-2">
      {items.map((item) => (
        <button
          type="button"
          key={item._id}
          onClick={() => onToggle(item._id)}
          className={`focus-ring rounded-full border px-4 py-2 text-sm font-semibold ${
            selected.includes(item._id) ? "border-leaf bg-mist text-leaf" : "border-slate-300 text-slate-600"
          }`}
        >
          {item.name}
        </button>
      ))}
    </div>
  </section>
);

export default Profile;
